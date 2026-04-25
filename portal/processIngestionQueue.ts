// ============================================================
// processIngestionQueue.ts
// Pulls batches of pending players from the ingestion queue,
// enriches them via PFF scraping, persists results to the DB,
// and retries or permanently fails items that error out.
// ============================================================

import { db } from '../db/client.js';
import { logger } from '../shared/logger.js';
import type { QueuedPlayer, EnrichmentResult } from '../types.js';

const BATCH_SIZE = 10;

// ────────────────────────────────────────────────────────────
// QUEUE HELPERS
// ────────────────────────────────────────────────────────────

/**
 * Fetch the next batch of up to BATCH_SIZE pending items from
 * `portal_ingestion_queue`, joined with their player records.
 *
 * Eligibility criteria:
 *   - status = 'pending'
 *   - next_attempt_at IS NULL  OR  next_attempt_at <= NOW()
 *
 * Ordering: priority ASC (lower number = higher priority), then queued_at ASC.
 *
 * Side-effect: atomically marks the fetched rows as status='processing'
 * and stamps last_attempted_at = NOW() so concurrent workers don't
 * pick up the same items.
 */
async function dequeueBatch(): Promise<QueuedPlayer[]> {
  // Fetch eligible queue rows with their player data in one query
  const { data: rows, error: fetchError } = await db
    .from('portal_ingestion_queue')
    .select(
      `
      id,
      player_id,
      attempts,
      max_attempts,
      players (
        id,
        name,
        normalized_name,
        position,
        position_group,
        school_from,
        school_to,
        source,
        source_id,
        source_ids,
        status,
        active_in_portal,
        pff_enrichment_status,
        portal_entry_date,
        committed_date,
        withdrawn_date,
        first_seen_at,
        last_seen_at,
        source_url,
        created_at,
        updated_at
      )
    `,
    )
    .eq('status', 'pending')
    .or('next_attempt_at.is.null,next_attempt_at.lte.' + new Date().toISOString())
    .order('priority', { ascending: true })
    .order('queued_at', { ascending: true })
    .limit(BATCH_SIZE);

  if (fetchError) {
    throw new Error(`dequeueBatch: failed to fetch queue rows: ${fetchError.message}`);
  }

  if (!rows || rows.length === 0) {
    return [];
  }

  const queueIds = rows.map((r) => r.id as string);

  // Mark fetched rows as processing
  const { error: updateError } = await db
    .from('portal_ingestion_queue')
    .update({
      status: 'processing',
      last_attempted_at: new Date().toISOString(),
    })
    .in('id', queueIds);

  if (updateError) {
    // Non-fatal: log but continue — worst case these get picked up again
    logger.warn(
      { error: updateError.message, ids: queueIds },
      'dequeueBatch: failed to mark rows as processing',
    );
  }

  // Shape into QueuedPlayer[]
  const queuedPlayers: QueuedPlayer[] = [];
  for (const row of rows) {
    const player = row.players as Record<string, unknown> | null;
    if (!player) {
      logger.warn({ queueId: row.id }, 'dequeueBatch: queue row has no associated player, skipping');
      continue;
    }
    queuedPlayers.push({
      queueId: row.id as string,
      playerId: row.player_id as string,
      playerData: player as unknown as import('../types.js').Player,
      attempts: row.attempts as number,
    });
  }

  return queuedPlayers;
}

/**
 * Mark a queue item as successfully completed and update the
 * corresponding player's enrichment status to 'done'.
 */
async function markDone(queueId: string, playerId: string): Promise<void> {
  const now = new Date().toISOString();

  const [queueResult, playerResult] = await Promise.allSettled([
    db
      .from('portal_ingestion_queue')
      .update({ status: 'done', completed_at: now, updated_at: now })
      .eq('id', queueId),
    db
      .from('players')
      .update({ pff_enrichment_status: 'done', status: 'enriched', updated_at: now })
      .eq('id', playerId),
  ]);

  if (queueResult.status === 'rejected') {
    logger.warn(
      { queueId, error: (queueResult.reason as Error).message },
      'markDone: failed to update queue row',
    );
  } else if (queueResult.value.error) {
    logger.warn(
      { queueId, error: queueResult.value.error.message },
      'markDone: queue row update returned error',
    );
  }

  if (playerResult.status === 'rejected') {
    logger.warn(
      { playerId, error: (playerResult.reason as Error).message },
      'markDone: failed to update player row',
    );
  } else if (playerResult.value.error) {
    logger.warn(
      { playerId, error: playerResult.value.error.message },
      'markDone: player row update returned error',
    );
  }
}

/**
 * Retry or permanently fail a queue item after an error.
 *
 * Retry logic (exponential back-off):
 *   - If attempts + 1 < max_attempts:
 *       status = 'pending'
 *       attempts += 1
 *       next_attempt_at = NOW() + (5 minutes × 2^currentAttempts)
 *   - If attempts + 1 >= max_attempts:
 *       status = 'failed'
 *       error_message and error_stack recorded
 *       player pff_enrichment_status = 'failed'
 */
async function markFailed(
  queueId: string,
  playerId: string,
  attempts: number,
  error: string,
  errorStack: string,
): Promise<void> {
  const now = new Date().toISOString();
  const nextAttempts = attempts + 1;

  // Fetch max_attempts for this queue item
  const { data: queueRow, error: fetchError } = await db
    .from('portal_ingestion_queue')
    .select('max_attempts')
    .eq('id', queueId)
    .single();

  if (fetchError || !queueRow) {
    logger.warn({ queueId, error: fetchError?.message }, 'markFailed: could not fetch max_attempts, defaulting to 3');
  }

  const maxAttempts: number = (queueRow?.max_attempts as number | undefined) ?? 3;

  if (nextAttempts < maxAttempts) {
    // Exponential back-off: 5 min × 2^attempts
    const backoffMinutes = 5 * Math.pow(2, attempts);
    const nextAttemptAt = new Date(Date.now() + backoffMinutes * 60 * 1000).toISOString();

    const { error: retryError } = await db
      .from('portal_ingestion_queue')
      .update({
        status: 'pending',
        attempts: nextAttempts,
        next_attempt_at: nextAttemptAt,
        error_message: error,
        error_stack: errorStack,
        updated_at: now,
      })
      .eq('id', queueId);

    if (retryError) {
      logger.error(
        { queueId, error: retryError.message },
        'markFailed: failed to schedule retry',
      );
    } else {
      logger.info(
        { queueId, playerId, nextAttempts, nextAttemptAt, backoffMinutes },
        'markFailed: scheduled retry',
      );
    }
  } else {
    // Permanently failed — exhaust all retries
    const [queueResult, playerResult] = await Promise.allSettled([
      db
        .from('portal_ingestion_queue')
        .update({
          status: 'failed',
          attempts: nextAttempts,
          error_message: error,
          error_stack: errorStack,
          updated_at: now,
        })
        .eq('id', queueId),
      db
        .from('players')
        .update({ pff_enrichment_status: 'failed', updated_at: now })
        .eq('id', playerId),
    ]);

    if (queueResult.status === 'rejected') {
      logger.error(
        { queueId, error: (queueResult.reason as Error).message },
        'markFailed: failed to set queue row to failed',
      );
    } else if (queueResult.value.error) {
      logger.error(
        { queueId, error: queueResult.value.error.message },
        'markFailed: queue row failed-update returned error',
      );
    }

    if (playerResult.status === 'rejected') {
      logger.error(
        { playerId, error: (playerResult.reason as Error).message },
        'markFailed: failed to set player pff_enrichment_status=failed',
      );
    } else if (playerResult.value.error) {
      logger.error(
        { playerId, error: playerResult.value.error.message },
        'markFailed: player failed-update returned error',
      );
    }

    logger.warn(
      { queueId, playerId, attempts: nextAttempts, maxAttempts },
      'markFailed: queue item permanently failed (max attempts reached)',
    );
  }
}

/**
 * Check whether any pending (and eligible) items remain in the queue.
 * Used at the end of each loop iteration to decide whether to continue.
 */
async function hasPendingItems(): Promise<boolean> {
  const { count, error } = await db
    .from('portal_ingestion_queue')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')
    .or('next_attempt_at.is.null,next_attempt_at.lte.' + new Date().toISOString());

  if (error) {
    logger.warn({ error: error.message }, 'hasPendingItems: query failed, assuming no items');
    return false;
  }

  return (count ?? 0) > 0;
}

// ────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────

/**
 * Drain the `portal_ingestion_queue` by processing pending items in
 * batches of BATCH_SIZE until no eligible items remain.
 *
 * Per-batch steps:
 *  1. dequeueBatch() — fetch and lock next BATCH_SIZE items.
 *  2. enrichQueuedPlayers() — Playwright scraping (dynamic import).
 *  3. syncEnrichedPlayersToDb() — persist results (dynamic import).
 *  4. For each result: markDone or markFailed.
 *  5. Log batch summary.
 *  6. Check for more pending items; loop or break.
 */
export async function processIngestionQueue(): Promise<void> {
  logger.info('processIngestionQueue: starting queue drain loop');

  let batchNumber = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    batchNumber += 1;

    // ── Step 1: Dequeue ──────────────────────────────────────
    let batch: QueuedPlayer[];
    try {
      batch = await dequeueBatch();
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error({ error: message, batchNumber }, 'processIngestionQueue: dequeueBatch threw, aborting loop');
      break;
    }

    if (batch.length === 0) {
      logger.info({ batchNumber }, 'processIngestionQueue: no eligible items, exiting loop');
      break;
    }

    logger.info(
      { batchNumber, batchSize: batch.length },
      'processIngestionQueue: processing batch',
    );

    // ── Step 2: Enrich ───────────────────────────────────────
    let enrichResults: EnrichmentResult[];
    try {
      const { enrichQueuedPlayers } = await import('./enrichQueuedPlayers.js');
      enrichResults = await enrichQueuedPlayers(batch);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        { error: message, batchNumber },
        'processIngestionQueue: enrichQueuedPlayers threw; marking all items failed',
      );
      // Mark every item in the batch as failed
      await Promise.allSettled(
        batch.map((p) =>
          markFailed(p.queueId, p.playerId, p.attempts, message, new Error(message).stack ?? ''),
        ),
      );
      // Check if there's more work before continuing
      const more = await hasPendingItems();
      if (!more) break;
      continue;
    }

    // ── Step 3: Sync to DB ───────────────────────────────────
    let syncResult: import('../types.js').SyncResult;
    try {
      const { syncEnrichedPlayersToDb } = await import('./syncEnrichedPlayersToDb.js');
      syncResult = await syncEnrichedPlayersToDb(enrichResults);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error(
        { error: message, batchNumber },
        'processIngestionQueue: syncEnrichedPlayersToDb threw; marking all items failed',
      );
      await Promise.allSettled(
        batch.map((p) =>
          markFailed(p.queueId, p.playerId, p.attempts, message, new Error(message).stack ?? ''),
        ),
      );
      const more = await hasPendingItems();
      if (!more) break;
      continue;
    }

    // ── Step 4: Finalise each result ─────────────────────────
    let batchDone = 0;
    let batchFailed = 0;

    for (const enrichResult of enrichResults) {
      if (enrichResult.success) {
        await markDone(enrichResult.queueId, enrichResult.playerId);
        batchDone += 1;
      } else {
        const queuedPlayer = batch.find((p) => p.queueId === enrichResult.queueId);
        const attempts = queuedPlayer?.attempts ?? 0;
        await markFailed(
          enrichResult.queueId,
          enrichResult.playerId,
          attempts,
          enrichResult.error,
          enrichResult.errorStack,
        );
        batchFailed += 1;
      }
    }

    // ── Step 5: Log batch summary ────────────────────────────
    logger.info(
      {
        batchNumber,
        batchSize: batch.length,
        enrichDone: batchDone,
        enrichFailed: batchFailed,
        syncResult,
      },
      'processIngestionQueue: batch complete',
    );

    // ── Step 6: Continue or break ────────────────────────────
    const more = await hasPendingItems();
    if (!more) {
      logger.info({ batchNumber }, 'processIngestionQueue: no more pending items, exiting loop');
      break;
    }
  }

  logger.info({ batches: batchNumber }, 'processIngestionQueue: queue drain complete');
}
