// ============================================================
// syncEnrichedPlayersToDb.ts
// Persists enrichment results produced by enrichQueuedPlayers
// into the player_stats and players tables via Supabase upserts.
// ============================================================

import { db } from '../db/client.js';
import { logger } from '../shared/logger.js';
import type {
  EnrichmentResult,
  EnrichedPlayerData,
  PffEnrichmentStatus,
  SyncResult,
} from '../types.js';

// ────────────────────────────────────────────────────────────
// DATABASE HELPERS
// ────────────────────────────────────────────────────────────

/**
 * Upsert a row into `player_stats`.
 *
 * Conflict target: (player_id, season, source)
 *   — matches the UNIQUE constraint uq_player_stats_player_season_source.
 *
 * On conflict all mutable fields are overwritten so re-running
 * enrichment for the same player/season always reflects the latest
 * scraped values.
 */
async function upsertPlayerStats(data: EnrichedPlayerData): Promise<void> {
  const now = new Date().toISOString();

  const row = {
    player_id: data.player_id,
    season: data.season,
    source: data.source,
    position: data.position,
    position_group: data.position_group,
    stat_profile_used: data.stat_profile_used,
    raw_stats_json: data.raw_stats_json,
    alignment_data: data.alignment_data,
    total_snaps: data.total_snaps ?? null,
    snap_share: data.snap_share ?? null,
    scraped_at: now,
    updated_at: now,
  };

  const { error } = await db
    .from('player_stats')
    .upsert(row, {
      onConflict: 'player_id,season,source',
      ignoreDuplicates: false,
    });

  if (error) {
    throw new Error(
      `upsertPlayerStats failed for player ${data.player_id} ` +
        `(season ${data.season}, source ${data.source}): ${error.message}`,
    );
  }

  logger.debug(
    {
      playerId: data.player_id,
      season: data.season,
      source: data.source,
      statProfile: data.stat_profile_used,
    },
    'upsertPlayerStats: success',
  );
}

/**
 * Update the enrichment-related columns on the `players` row.
 *
 * Always sets:
 *   pff_enrichment_status = status
 *   updated_at            = NOW()
 *
 * When status === 'done':
 *   status               = 'enriched'
 *   active_in_portal     is left untouched (player stays visible)
 *
 * When status === 'failed':
 *   Only the pff_enrichment_status column is flipped; the player's
 *   portal status is not changed so operators can investigate and
 *   manually re-queue if desired.
 */
async function updatePlayerEnrichmentStatus(
  playerId: string,
  status: PffEnrichmentStatus,
): Promise<void> {
  const now = new Date().toISOString();

  const update: Record<string, unknown> = {
    pff_enrichment_status: status,
    updated_at: now,
  };

  if (status === 'done') {
    update['status'] = 'enriched';
  }

  const { error } = await db.from('players').update(update).eq('id', playerId);

  if (error) {
    throw new Error(
      `updatePlayerEnrichmentStatus failed for player ${playerId} ` +
        `(status=${status}): ${error.message}`,
    );
  }

  logger.debug({ playerId, status }, 'updatePlayerEnrichmentStatus: success');
}

// ────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────

/**
 * Persist an array of EnrichmentResults to the database.
 *
 * For each result:
 *   success === true  → upsert player_stats, set enrichment status = 'done'
 *   success === false → set enrichment status = 'failed', record the error
 *
 * Per-player errors are caught individually so one failure does not
 * prevent the rest of the batch from being persisted.
 *
 * Returns a SyncResult summary.
 */
export async function syncEnrichedPlayersToDb(
  results: EnrichmentResult[],
): Promise<SyncResult> {
  logger.info({ count: results.length }, 'syncEnrichedPlayersToDb: starting sync');

  const syncResult: SyncResult = {
    synced: 0,
    failed: 0,
    errors: [],
  };

  for (const result of results) {
    if (result.success) {
      // ── Successful enrichment ──────────────────────────────
      try {
        await upsertPlayerStats(result.data);
        await updatePlayerEnrichmentStatus(result.playerId, 'done');
        syncResult.synced += 1;

        logger.info(
          { playerId: result.playerId, season: result.data.season },
          'syncEnrichedPlayersToDb: player synced',
        );
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        const errorEntry = `player ${result.playerId}: ${message}`;

        logger.error(
          { playerId: result.playerId, error: message },
          'syncEnrichedPlayersToDb: failed to persist enriched data',
        );

        // Best-effort: try to at least flip the enrichment status to failed
        try {
          await updatePlayerEnrichmentStatus(result.playerId, 'failed');
        } catch (statusErr) {
          const statusMessage =
            statusErr instanceof Error ? statusErr.message : String(statusErr);
          logger.error(
            { playerId: result.playerId, error: statusMessage },
            'syncEnrichedPlayersToDb: also failed to set pff_enrichment_status=failed',
          );
        }

        syncResult.failed += 1;
        syncResult.errors.push(errorEntry);
      }
    } else {
      // ── Failed enrichment ──────────────────────────────────
      try {
        await updatePlayerEnrichmentStatus(result.playerId, 'failed');
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        logger.error(
          { playerId: result.playerId, error: message },
          'syncEnrichedPlayersToDb: failed to set pff_enrichment_status=failed',
        );
        // Record this secondary failure too
        syncResult.errors.push(`player ${result.playerId} status update: ${message}`);
      }

      const errorEntry = `player ${result.playerId}: ${result.error}`;
      syncResult.failed += 1;
      syncResult.errors.push(errorEntry);

      logger.warn(
        { playerId: result.playerId, error: result.error },
        'syncEnrichedPlayersToDb: enrichment failure recorded',
      );
    }
  }

  logger.info(
    { synced: syncResult.synced, failed: syncResult.failed, errors: syncResult.errors.length },
    'syncEnrichedPlayersToDb: complete',
  );

  return syncResult;
}
