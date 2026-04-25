// ============================================================
// enrichQueuedPlayers.ts
// Playwright-based PFF scraper. Launches a headless Chromium
// browser, visits each player's PFF search result, extracts
// grades, snap counts and alignment data, and returns typed
// EnrichmentResult objects for downstream DB sync.
// ============================================================

import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { db } from '../db/client.js';
import { logger } from '../shared/logger.js';
import { getPositionGroup } from '../shared/normalizer.js';
import { getStatProfile, getStatProfileId } from '../shared/position-config.js';
import type {
  QueuedPlayer,
  EnrichedPlayerData,
  EnrichmentResult,
  AlignmentData,
  PositionGroup,
} from '../types.js';

// ────────────────────────────────────────────────────────────
// CONSTANTS
// ────────────────────────────────────────────────────────────

/** Per-page operation timeout in milliseconds */
const SCRAPE_TIMEOUT = 30_000;

/** Total allowed time for scraping a single player in milliseconds */
const PLAYER_TIMEOUT = 300_000;

/** Current CFB season — used when storing stats */
const CURRENT_SEASON = new Date().getFullYear();

/** PFF stats source label stored in player_stats.source */
const PFF_SOURCE = 'pff';

// ────────────────────────────────────────────────────────────
// UTILITIES
// ────────────────────────────────────────────────────────────

/**
 * Wait a random number of milliseconds between minMs and maxMs.
 * Used to add human-like jitter between requests.
 */
async function jitter(minMs: number, maxMs: number): Promise<void> {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  await new Promise<void>((resolve) => setTimeout(resolve, delay));
}

// ────────────────────────────────────────────────────────────
// BROWSER MANAGEMENT
// ────────────────────────────────────────────────────────────

/**
 * Launch a headless Chromium browser with settings appropriate
 * for scraping: no GPU, sandbox disabled, and a realistic UA.
 */
async function launchBrowser(): Promise<Browser> {
  return chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });
}

// ────────────────────────────────────────────────────────────
// URL BUILDING
// ────────────────────────────────────────────────────────────

/**
 * Build the PFF player search URL for a given name and school.
 *
 * // TODO: Update with actual PFF search endpoint and params.
 * The query string keys below are placeholders — replace them
 * with whatever PFF's search API actually expects.
 */
function buildPffSearchUrl(name: string, school: string): string {
  const params = new URLSearchParams({
    q: name,
    team: school,
    league: 'ncaa',
  });
  // TODO: Update with actual PFF search endpoint and params
  return `https://www.pff.com/search?${params.toString()}`;
}

// ────────────────────────────────────────────────────────────
// SCRAPE LOG
// ────────────────────────────────────────────────────────────

/**
 * Persist a raw HTML snapshot to the scrape_log table so we have
 * an audit trail and can replay parsing logic without re-scraping.
 *
 * Failures here are non-fatal — we warn and continue.
 */
async function logScrapeSnapshot(
  playerId: string,
  url: string,
  rawHtml: string,
  success: boolean,
  errorMessage?: string,
): Promise<void> {
  const { error } = await db.from('scrape_log').insert({
    player_id: playerId,
    url,
    raw_html: rawHtml,
    success,
    error_message: errorMessage ?? null,
    scraped_at: new Date().toISOString(),
  });

  if (error) {
    logger.warn(
      { playerId, error: error.message },
      'logScrapeSnapshot: failed to write to scrape_log (non-fatal)',
    );
  }
}

// ────────────────────────────────────────────────────────────
// SINGLE-PLAYER SCRAPER
// ────────────────────────────────────────────────────────────

/**
 * Scrape a single player's PFF page and return raw field values.
 *
 * Steps:
 *  1. Navigate to the PFF search URL for this player.
 *  2. Wait for search results to load.
 *  3. Find the matching result by name comparison and click through.
 *  4. Scrape the overall PFF grade.
 *  5. Scrape position-specific grade fields defined in the StatProfile.
 *  6. Scrape snap count and snap share percentage.
 *  7. Scrape alignment / snap-distribution data.
 *  8. Save a raw HTML snapshot to scrape_log.
 *
 * Throws on navigation timeout or when a required element is not found.
 */
async function scrapePffPlayer(
  page: Page,
  player: QueuedPlayer,
): Promise<Record<string, unknown>> {
  const { name, school_from, position } = player.playerData;
  const positionGroup = getPositionGroup(position);
  const statProfile = getStatProfile(positionGroup);
  const searchUrl = buildPffSearchUrl(name, school_from);

  logger.debug({ playerId: player.playerId, url: searchUrl }, 'scrapePffPlayer: navigating');

  await page.goto(searchUrl, { timeout: SCRAPE_TIMEOUT, waitUntil: 'networkidle' });

  // TODO: Update selector to match actual PFF search results container
  await page.waitForSelector('[data-testid="search-results"]', { timeout: SCRAPE_TIMEOUT });

  // ── Find matching player result ──────────────────────────
  // TODO: Update selectors to match actual PFF search result items
  const resultItems = await page.$$('[data-testid="player-result-item"]');
  let clicked = false;

  for (const item of resultItems) {
    // TODO: Update text selector to match PFF's player name element
    const resultName = await item.$eval(
      '[data-testid="player-result-name"]',
      (el) => el.textContent?.trim() ?? '',
    );

    // Case-insensitive name comparison
    if (resultName.toLowerCase() === name.toLowerCase()) {
      await item.click();
      clicked = true;
      break;
    }
  }

  if (!clicked) {
    throw new Error(`scrapePffPlayer: no matching result found for "${name}" (${school_from})`);
  }

  // TODO: Update selector to match actual PFF player profile container
  await page.waitForSelector('[data-testid="player-profile"]', { timeout: SCRAPE_TIMEOUT });

  const rawValues: Record<string, unknown> = {};

  // ── Overall PFF grade ────────────────────────────────────
  // TODO: Update selector to match PFF's overall grade element
  const overallGradeEl = await page.$('[data-testid="overall-grade"]');
  if (overallGradeEl) {
    const overallGradeText = await overallGradeEl.textContent();
    rawValues['overall_grade'] = overallGradeText?.trim() ?? null;
  } else {
    logger.warn({ playerId: player.playerId }, 'scrapePffPlayer: overall grade element not found');
    rawValues['overall_grade'] = null;
  }

  // ── Position-specific grade fields ──────────────────────
  for (const field of statProfile.fields) {
    // TODO: Update attribute selector to match PFF's stat field elements
    const fieldEl = await page.$(`[data-stat="${field}"]`);
    if (fieldEl) {
      const fieldText = await fieldEl.textContent();
      rawValues[field] = fieldText?.trim() ?? null;
    } else {
      logger.debug(
        { playerId: player.playerId, field },
        'scrapePffPlayer: stat field element not found',
      );
      rawValues[field] = null;
    }
  }

  // ── Snap count ───────────────────────────────────────────
  // TODO: Update selector to match PFF's snap count element
  const snapCountEl = await page.$('[data-testid="snap-count"]');
  if (snapCountEl) {
    const snapCountText = await snapCountEl.textContent();
    const parsed = Number(snapCountText?.replace(/,/g, '').trim());
    rawValues['total_snaps'] = isNaN(parsed) ? null : parsed;
  } else {
    rawValues['total_snaps'] = null;
  }

  // ── Snap share ───────────────────────────────────────────
  // TODO: Update selector to match PFF's snap share / snap% element
  const snapShareEl = await page.$('[data-testid="snap-share"]');
  if (snapShareEl) {
    const snapShareText = await snapShareEl.textContent();
    // Expect a value like "72.4%" — convert to 0–1 decimal
    const pctStr = snapShareText?.replace('%', '').trim();
    const pct = pctStr ? Number(pctStr) / 100 : null;
    rawValues['snap_share'] = pct !== null && !isNaN(pct) ? pct : null;
  } else {
    rawValues['snap_share'] = null;
  }

  // ── Alignment / snap distribution ────────────────────────
  // TODO: Update selectors to match PFF's alignment distribution table/chart
  const alignmentData: Record<string, unknown> = {};
  for (const category of statProfile.alignmentCategories) {
    // TODO: Update attribute selector to match PFF's alignment row elements
    const catEl = await page.$(`[data-alignment="${category}"]`);
    if (catEl) {
      const catText = await catEl.textContent();
      const pctStr = catText?.replace('%', '').trim();
      const pct = pctStr ? Number(pctStr) / 100 : null;
      alignmentData[category] = pct !== null && !isNaN(pct) ? pct : null;
    } else {
      alignmentData[category] = null;
    }
  }
  rawValues['alignment'] = alignmentData;

  // ── Log raw HTML snapshot ─────────────────────────────────
  const pageContent = await page.content();
  await logScrapeSnapshot(player.playerId, page.url(), pageContent, true);

  logger.debug(
    { playerId: player.playerId, fields: Object.keys(rawValues) },
    'scrapePffPlayer: raw values scraped',
  );

  return rawValues;
}

// ────────────────────────────────────────────────────────────
// DATA PARSING
// ────────────────────────────────────────────────────────────

/**
 * Parse the raw scraped alignment map into a typed AlignmentData object.
 *
 * Valid alignment categories are taken from the StatProfile for the
 * given positionGroup (via getStatProfile).  Entries whose value is
 * null or not a number are dropped.  The primary_alignment is the
 * category with the highest snap percentage.
 */
function parseAlignmentData(raw: Record<string, unknown>, positionGroup: string): AlignmentData {
  const statProfile = getStatProfile(positionGroup as PositionGroup);
  const rawAlignment = (raw['alignment'] as Record<string, unknown> | undefined) ?? {};

  const alignments: Record<string, number> = {};
  const snapDistribution: Record<string, number> = {};
  const totalSnaps = typeof raw['total_snaps'] === 'number' ? raw['total_snaps'] : null;

  for (const category of statProfile.alignmentCategories) {
    const value = rawAlignment[category];
    if (typeof value === 'number' && !isNaN(value)) {
      alignments[category] = value;
      if (totalSnaps !== null) {
        snapDistribution[category] = Math.round(value * totalSnaps);
      }
    }
  }

  // Determine primary alignment: highest percentage
  let primaryAlignment: string | undefined;
  let maxPct = -1;
  for (const [category, pct] of Object.entries(alignments)) {
    if (pct > maxPct) {
      maxPct = pct;
      primaryAlignment = category;
    }
  }

  return {
    primary_alignment: primaryAlignment,
    alignments,
    ...(Object.keys(snapDistribution).length > 0 ? { snap_distribution: snapDistribution } : {}),
  };
}

// ────────────────────────────────────────────────────────────
// SINGLE-PLAYER ENRICHMENT
// ────────────────────────────────────────────────────────────

/**
 * Enrich a single player: open a fresh browser context, scrape PFF,
 * parse the raw values, and shape them into an EnrichedPlayerData object.
 *
 * A fresh context is used per player so cookies/session state do not
 * bleed between players.
 *
 * Returns an EnrichmentResult; failures are caught and returned with
 * success: false rather than propagated, so one bad player does not
 * abort the whole batch.
 */
async function enrichSinglePlayer(
  context: BrowserContext,
  player: QueuedPlayer,
): Promise<EnrichmentResult> {
  const { playerId, queueId } = player;
  const { position } = player.playerData;
  const positionGroup = getPositionGroup(position);
  const statProfile = getStatProfile(positionGroup);
  const statProfileId = getStatProfileId(positionGroup);

  let page: Page | null = null;

  try {
    page = await context.newPage();

    // Set a realistic viewport and user-agent
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    // Apply a per-player total timeout
    page.setDefaultTimeout(PLAYER_TIMEOUT);

    const raw = await scrapePffPlayer(page, player);

    // Parse numeric fields
    const totalSnaps =
      typeof raw['total_snaps'] === 'number' ? raw['total_snaps'] : undefined;
    const snapShare =
      typeof raw['snap_share'] === 'number' ? raw['snap_share'] : undefined;

    // Build raw_stats_json from position-specific fields + overall grade
    const rawStatsJson: Record<string, unknown> = { overall_grade: raw['overall_grade'] };
    for (const field of statProfile.fields) {
      rawStatsJson[field] = raw[field] ?? null;
    }

    const alignmentData = parseAlignmentData(raw, positionGroup);

    const enrichedData: EnrichedPlayerData = {
      player_id: playerId,
      season: CURRENT_SEASON,
      source: PFF_SOURCE,
      position,
      position_group: positionGroup,
      stat_profile_used: statProfileId,
      raw_stats_json: rawStatsJson,
      alignment_data: alignmentData,
      ...(totalSnaps !== undefined ? { total_snaps: totalSnaps } : {}),
      ...(snapShare !== undefined ? { snap_share: snapShare } : {}),
    };

    logger.info(
      { playerId, positionGroup, totalSnaps, snapShare },
      'enrichSinglePlayer: success',
    );

    return { playerId, queueId, success: true, data: enrichedData };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    const errorStack = err instanceof Error ? (err.stack ?? '') : '';

    logger.error(
      { playerId, error: errorMessage },
      'enrichSinglePlayer: failed',
    );

    // Log failed HTML snapshot if page is available
    if (page) {
      try {
        const html = await page.content();
        const url = page.url();
        await logScrapeSnapshot(playerId, url, html, false, errorMessage);
      } catch {
        // Best-effort — do not mask the original error
      }
    }

    return { playerId, queueId, success: false, error: errorMessage, errorStack };
  } finally {
    if (page) {
      await page.close().catch(() => {
        // Ignore errors on cleanup
      });
    }
  }
}

// ────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────

/**
 * Enrich a batch of QueuedPlayers by scraping PFF with Playwright.
 *
 * One browser is shared across the entire batch; each player gets its
 * own BrowserContext for isolation.  A random jitter delay is inserted
 * between players to reduce the chance of rate-limiting.
 *
 * The browser is always closed in a finally block to prevent resource
 * leaks even when individual players fail.
 */
export async function enrichQueuedPlayers(
  players: QueuedPlayer[],
): Promise<EnrichmentResult[]> {
  if (players.length === 0) {
    return [];
  }

  logger.info({ count: players.length }, 'enrichQueuedPlayers: starting batch');

  const results: EnrichmentResult[] = [];
  let browser: Browser | null = null;

  try {
    browser = await launchBrowser();
    logger.debug('enrichQueuedPlayers: browser launched');

    for (let i = 0; i < players.length; i++) {
      const player = players[i]!;

      logger.debug(
        { playerId: player.playerId, index: i + 1, total: players.length },
        'enrichQueuedPlayers: enriching player',
      );

      const context = await browser.newContext({
        userAgent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) ' +
          'Chrome/120.0.0.0 Safari/537.36',
        ignoreHTTPSErrors: false,
      });

      try {
        const result = await enrichSinglePlayer(context, player);
        results.push(result);
      } finally {
        await context.close().catch((err: unknown) => {
          logger.warn(
            { playerId: player.playerId, error: (err as Error).message },
            'enrichQueuedPlayers: failed to close context (non-fatal)',
          );
        });
      }

      // Add jitter between players (but not after the last one)
      if (i < players.length - 1) {
        await jitter(2000, 5000);
      }
    }
  } finally {
    if (browser) {
      await browser.close().catch((err: unknown) => {
        logger.warn(
          { error: (err as Error).message },
          'enrichQueuedPlayers: failed to close browser (non-fatal)',
        );
      });
      logger.debug('enrichQueuedPlayers: browser closed');
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  logger.info(
    { total: results.length, success: successCount, failed: failCount },
    'enrichQueuedPlayers: batch complete',
  );

  return results;
}
