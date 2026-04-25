// ============================================================
// checkNewPortalEntrants.ts
// Polls all source adapters, deduplicates entries, upserts
// players into the DB, queues new entrants for enrichment,
// and optionally triggers the ingestion queue processor.
// ============================================================

import { db } from '../db/client.js';
import { logger } from '../shared/logger.js';
import { buildDedupeKey, normalizeName, getPositionGroup } from '../shared/normalizer.js';
import type {
  RawPortalEntry,
  IngestionRunResult,
} from '../types.js';

// ────────────────────────────────────────────────────────────
// SOURCE ADAPTERS
// ────────────────────────────────────────────────────────────

/**
 * Fetch portal entrants from On3.
 * TODO: Replace stub with real HTTP / scraping logic.
 */
async function fetchOn3Entries(): Promise<RawPortalEntry[]> {
  // TODO: Implement real On3 scraping / API call.
  // Expected endpoint: https://www.on3.com/transfer-portal/
  logger.debug('fetchOn3Entries called (stub)');
  return [];
}

/**
 * Fetch portal entrants from 247Sports.
 * TODO: Replace stub with real HTTP / scraping logic.
 */
async function fetch247Entries(): Promise<RawPortalEntry[]> {
  // TODO: Implement real 247Sports scraping / API call.
  // Expected endpoint: https://247sports.com/Season/2025-Football/TransferPortal/
  logger.debug('fetch247Entries called (stub)');
  return [];
}

/**
 * Fetch portal entrants from ESPN.
 * TODO: Replace stub with real HTTP / scraping logic.
 */
async function fetchEspnEntries(): Promise<RawPortalEntry[]> {
  // TODO: Implement real ESPN scraping / API call.
  // Expected endpoint: https://www.espn.com/college-football/transfer-portal
  logger.debug('fetchEspnEntries called (stub)');
  return [];
}

// ────────────────────────────────────────────────────────────
// DEDUPLICATION / MERGE
// ────────────────────────────────────────────────────────────

/**
 * Merge raw entries from all sources into a deduplicated list.
 *
 * Deduplication key: SHA-256 of normalizedName|schoolFrom|positionGroup
 * Source priority:   on3 > 247sports > espn
 *   - The first time we see a key the canonical record is created from
 *     that entry's fields.
 *   - Subsequent occurrences of the same key only contribute their
 *     source_id to the merged source_ids map.
 */
async function mergeEntries(entries: RawPortalEntry[]): Promise<RawPortalEntry[]> {
  // Priority order: lower index = higher priority
  const SOURCE_PRIORITY: RawPortalEntry['source'][] = ['on3', '247sports', 'espn'];

  // Sort so higher-priority sources are processed first
  const sorted = [...entries].sort((a, b) => {
    return SOURCE_PRIORITY.indexOf(a.source) - SOURCE_PRIORITY.indexOf(b.source);
  });

  const seen = new Map<string, RawPortalEntry & { _sourceIds: Record<string, string> }>();

  for (const entry of sorted) {
    const key = buildDedupeKey(entry);

    if (!seen.has(key)) {
      // First time we see this player — establish canonical record
      seen.set(key, {
        ...entry,
        _sourceIds: { [entry.source]: entry.source_id },
      });
    } else {
      // Already have a canonical record — merge source_id only
      const existing = seen.get(key)!;
      existing._sourceIds[entry.source] = entry.source_id;
      // Also capture source_url from higher-priority source if missing
      if (!existing.source_url && entry.source_url) {
        existing.source_url = entry.source_url;
      }
      // Prefer the earliest portal_entry_date across sources
      if (entry.portal_entry_date && existing.portal_entry_date) {
        if (entry.portal_entry_date < existing.portal_entry_date) {
          existing.portal_entry_date = entry.portal_entry_date;
        }
      } else if (entry.portal_entry_date && !existing.portal_entry_date) {
        existing.portal_entry_date = entry.portal_entry_date;
      }
    }
  }

  // Strip the internal _sourceIds helper and return canonical entries
  return Array.from(seen.values()).map(({ _sourceIds, ...entry }) => {
    // We carry _sourceIds through so upsertPlayer can persist them.
    // Re-attach as a plain object property the caller can access.
    return { ...entry, _mergedSourceIds: _sourceIds } as RawPortalEntry & {
      _mergedSourceIds: Record<string, string>;
    };
  });
}

// ────────────────────────────────────────────────────────────
// DATABASE HELPERS
// ────────────────────────────────────────────────────────────

/**
 * Upsert a portal entry into the `players` table.
 *
 * Conflict target: (normalized_name, school_from, position)
 *
 * On INSERT  — first_seen_at is set to NOW() by the DB default.
 * On UPDATE  — first_seen_at is preserved (COALESCE keeps existing value);
 *              last_seen_at is always refreshed.
 *
 * If the entry has school_to set the player is marked as committed:
 *   status = 'committed', active_in_portal = false, committed_date = NOW()
 *
 * Returns the player id and whether this was a new insertion.
 */
async function upsertPlayer(
  entry: RawPortalEntry & { _mergedSourceIds?: Record<string, string> },
): Promise<{ id: string; isNew: boolean }> {
  const normalizedName = normalizeName(entry.name);
  const positionGroup = getPositionGroup(entry.position);
  const sourceIds = entry._mergedSourceIds ?? { [entry.source]: entry.source_id };
  const isCommitted = Boolean(entry.school_to);

  const upsertRow = {
    name: entry.name,
    normalized_name: normalizedName,
    position: entry.position,
    position_group: positionGroup,
    school_from: entry.school_from,
    school_to: entry.school_to ?? null,
    source: entry.source,
    source_id: entry.source_id,
    source_ids: sourceIds,
    source_url: entry.source_url ?? null,
    portal_entry_date: entry.portal_entry_date ?? null,
    last_seen_at: new Date().toISOString(),
    // Committed-specific fields
    ...(isCommitted
      ? {
          status: 'committed' as const,
          active_in_portal: false,
          committed_date: new Date().toISOString(),
        }
      : {
          status: 'pending' as const,
          active_in_portal: true,
        }),
  };

  const { data, error } = await db
    .from('players')
    .upsert(upsertRow, {
      onConflict: 'normalized_name,school_from,position',
      ignoreDuplicates: false,
    })
    .select('id, created_at, updated_at')
    .single();

  if (error) {
    throw new Error(`upsertPlayer failed for "${entry.name}": ${error.message}`);
  }

  if (!data) {
    throw new Error(`upsertPlayer returned no data for "${entry.name}"`);
  }

  // Determine if this was a net-new row by comparing created_at ≈ updated_at.
  // Supabase/Postgres sets updated_at via trigger on every UPDATE, so if they
  // differ by more than 1 second the row pre-existed.
  const createdMs = new Date(data.created_at as string).getTime();
  const updatedMs = new Date(data.updated_at as string).getTime();
  const isNew = Math.abs(updatedMs - createdMs) < 1000;

  return { id: data.id as string, isNew };
}

/**
 * When a player has committed:
 *  1. Flip their `active_in_portal` flag to false on the players table.
 *  2. Cancel any pending queue entry (set status = 'skipped') so we don't
 *     waste an enrichment slot on a player who has already committed.
 */
async function handleCommitted(playerId: string): Promise<void> {
  // 1. Mark player inactive in portal
  const { error: playerError } = await db
    .from('players')
    .update({ active_in_portal: false, updated_at: new Date().toISOString() })
    .eq('id', playerId);

  if (playerError) {
    logger.warn(
      { playerId, error: playerError.message },
      'handleCommitted: failed to set active_in_portal=false',
    );
  }

  // 2. Skip any pending queue entry for this player
  const { error: queueError } = await db
    .from('portal_ingestion_queue')
    .update({ status: 'skipped', updated_at: new Date().toISOString() })
    .eq('player_id', playerId)
    .eq('status', 'pending');

  if (queueError) {
    logger.warn(
      { playerId, error: queueError.message },
      'handleCommitted: failed to skip pending queue entry',
    );
  }
}

/**
 * Insert a new row into `portal_ingestion_queue` for the given player.
 * Uses ignoreDuplicates: true because player_id has a UNIQUE constraint —
 * if the player is already queued we simply leave the existing row intact.
 */
async function queueNewPlayer(playerId: string): Promise<void> {
  const { error } = await db.from('portal_ingestion_queue').upsert(
    {
      player_id: playerId,
      status: 'pending',
      priority: 5,
      attempts: 0,
      max_attempts: 3,
      queued_at: new Date().toISOString(),
    },
    {
      onConflict: 'player_id',
      ignoreDuplicates: true,
    },
  );

  if (error) {
    throw new Error(`queueNewPlayer failed for player ${playerId}: ${error.message}`);
  }
}

/**
 * Count how many items in `portal_ingestion_queue` are currently pending.
 */
async function getPendingQueueCount(): Promise<number> {
  const { count, error } = await db
    .from('portal_ingestion_queue')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  if (error) {
    logger.warn({ error: error.message }, 'getPendingQueueCount: query failed, returning 0');
    return 0;
  }

  return count ?? 0;
}

// ────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────

/**
 * Full portal-check run:
 *  1. Fetch from all three sources in parallel (failures are logged and
 *     skipped; we continue with whatever succeeded).
 *  2. Merge and deduplicate entries across sources.
 *  3. For each entry: upsert the player, handle committed status, queue
 *     new players for enrichment.
 *  4. After processing all entries, if the pending queue has ≥ 10 items
 *     the ingestion queue processor is dynamically imported and called.
 *  5. Return a summary IngestionRunResult.
 */
export async function checkNewPortalEntrants(): Promise<IngestionRunResult> {
  logger.info('checkNewPortalEntrants: starting portal check run');

  const result: IngestionRunResult = {
    added: 0,
    updated: 0,
    committed: 0,
    withdrawn: 0,
    errors: [],
    queue_size: 0,
  };

  // ── Step 1: Fetch from all sources in parallel ──────────────
  const [on3Result, result247, espnResult] = await Promise.allSettled([
    fetchOn3Entries(),
    fetch247Entries(),
    fetchEspnEntries(),
  ]);

  const allEntries: RawPortalEntry[] = [];

  if (on3Result.status === 'fulfilled') {
    allEntries.push(...on3Result.value);
    logger.info({ count: on3Result.value.length }, 'fetchOn3Entries: success');
  } else {
    const msg = `fetchOn3Entries failed: ${(on3Result.reason as Error).message}`;
    logger.error({ error: msg }, 'Source fetch failure');
    result.errors.push(msg);
  }

  if (result247.status === 'fulfilled') {
    allEntries.push(...result247.value);
    logger.info({ count: result247.value.length }, 'fetch247Entries: success');
  } else {
    const msg = `fetch247Entries failed: ${(result247.reason as Error).message}`;
    logger.error({ error: msg }, 'Source fetch failure');
    result.errors.push(msg);
  }

  if (espnResult.status === 'fulfilled') {
    allEntries.push(...espnResult.value);
    logger.info({ count: espnResult.value.length }, 'fetchEspnEntries: success');
  } else {
    const msg = `fetchEspnEntries failed: ${(espnResult.reason as Error).message}`;
    logger.error({ error: msg }, 'Source fetch failure');
    result.errors.push(msg);
  }

  logger.info({ total_raw: allEntries.length }, 'checkNewPortalEntrants: entries fetched');

  // ── Step 2: Merge and deduplicate ───────────────────────────
  const mergedEntries = await mergeEntries(allEntries);
  logger.info(
    { raw: allEntries.length, merged: mergedEntries.length },
    'checkNewPortalEntrants: deduplication complete',
  );

  // ── Step 3: Upsert each entry ───────────────────────────────
  for (const entry of mergedEntries) {
    try {
      const { id: playerId, isNew } = await upsertPlayer(
        entry as RawPortalEntry & { _mergedSourceIds?: Record<string, string> },
      );
      const isCommitted = Boolean(entry.school_to);

      if (isCommitted) {
        await handleCommitted(playerId);
        result.committed += 1;
        logger.debug(
          { playerId, name: entry.name, school_to: entry.school_to },
          'Player marked committed',
        );
      } else if (isNew) {
        await queueNewPlayer(playerId);
        result.added += 1;
        logger.debug({ playerId, name: entry.name }, 'New player queued for enrichment');
      } else {
        result.updated += 1;
        logger.debug({ playerId, name: entry.name }, 'Existing player record updated');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const errorMsg = `Entry "${entry.name}" (${entry.source}): ${message}`;
      logger.error({ name: entry.name, source: entry.source, error: message }, 'Per-entry error');
      result.errors.push(errorMsg);
    }
  }

  // ── Step 4: Get pending queue count ─────────────────────────
  result.queue_size = await getPendingQueueCount();

  logger.info(
    {
      added: result.added,
      updated: result.updated,
      committed: result.committed,
      queue_size: result.queue_size,
      errors: result.errors.length,
    },
    'checkNewPortalEntrants: run summary',
  );

  // ── Step 5: Trigger queue processing if threshold reached ───
  if (result.queue_size >= 10) {
    logger.info(
      { queue_size: result.queue_size },
      'checkNewPortalEntrants: queue threshold reached, triggering processIngestionQueue',
    );
    try {
      const { processIngestionQueue } = await import('./processIngestionQueue.js');
      await processIngestionQueue();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error({ error: message }, 'checkNewPortalEntrants: processIngestionQueue failed');
      result.errors.push(`processIngestionQueue: ${message}`);
    }
  }

  return result;
}
