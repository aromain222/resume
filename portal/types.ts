// ============================================================
// Transfer Portal Pipeline — Shared TypeScript Types
// ============================================================

// ────────────────────────────────────────────────────────────
// POSITION LITERALS
// ────────────────────────────────────────────────────────────

export type Position =
  | 'QB'
  | 'RB'
  | 'WR'
  | 'TE'
  | 'OT'
  | 'OG'
  | 'C'
  | 'OL'
  | 'DT'
  | 'NT'
  | 'DL'
  | 'DE'
  | 'EDGE'
  | 'LB'
  | 'ILB'
  | 'OLB'
  | 'MLB'
  | 'CB'
  | 'S'
  | 'SS'
  | 'FS'
  | 'DB'
  | 'K'
  | 'P'
  | 'LS';

// ────────────────────────────────────────────────────────────
// ENUMS (string union mirrors Postgres enums)
// ────────────────────────────────────────────────────────────

export type PositionGroup = 'QB' | 'SKILL' | 'TE' | 'OL' | 'DL' | 'LB' | 'DB' | 'ST';

export type PlayerStatus =
  | 'pending'
  | 'queued'
  | 'enriching'
  | 'enriched'
  | 'committed'
  | 'withdrawn';

export type PffEnrichmentStatus =
  | 'pending'
  | 'queued'
  | 'processing'
  | 'done'
  | 'failed'
  | 'skipped';

export type QueueStatus = 'pending' | 'processing' | 'done' | 'failed' | 'skipped';

// ────────────────────────────────────────────────────────────
// DATABASE ROW INTERFACES
// ────────────────────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  normalized_name: string;
  position: string;
  position_group: PositionGroup;
  school_from: string;
  school_to: string | null;
  source: string;
  source_id: string | null;
  /** Cross-source IDs stored as { on3: string, "247sports": string, espn: string } */
  source_ids: Record<string, string>;
  status: PlayerStatus;
  active_in_portal: boolean;
  pff_enrichment_status: PffEnrichmentStatus;
  portal_entry_date: string | null; // ISO date string (DATE column)
  committed_date: string | null;    // ISO timestamptz string
  withdrawn_date: string | null;    // ISO timestamptz string
  first_seen_at: string;            // ISO timestamptz string
  last_seen_at: string;             // ISO timestamptz string
  source_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerStats {
  id: string;
  player_id: string;
  season: number;
  week: number | null;
  source: string;
  position: string;
  position_group: string;
  /**
   * Which position template was used, e.g. "DL_STANDARD", "WR_SLOT".
   * Corresponds to StatProfile.profileId.
   */
  stat_profile_used: string;
  /** Raw scraped stat values keyed by field name */
  raw_stats_json: Record<string, unknown>;
  /** Alignment usage percentages, e.g. { "3-tech": 0.42, "5-tech": 0.31 } */
  alignment_data: Record<string, unknown>;
  total_snaps: number | null;
  snap_share: number | null;
  scraped_at: string;
  created_at: string;
  updated_at: string;
}

export interface PortalIngestionQueue {
  id: string;
  player_id: string;
  status: QueueStatus;
  priority: number;
  attempts: number;
  max_attempts: number;
  queued_at: string;
  last_attempted_at: string | null;
  completed_at: string | null;
  next_attempt_at: string | null;
  error_message: string | null;
  error_stack: string | null;
  created_at: string;
  updated_at: string;
}

// ────────────────────────────────────────────────────────────
// INGESTION PIPELINE TYPES
// ────────────────────────────────────────────────────────────

/** Raw data from a source adapter before normalization */
export interface RawPortalEntry {
  name: string;
  position: string;
  school_from: string;
  school_to?: string;
  source: 'on3' | '247sports' | 'espn';
  source_id: string;
  source_url?: string;
  portal_entry_date?: string; // ISO date string
}

/** What the enrichment scraper returns for a single player */
export interface EnrichedPlayerData {
  player_id: string;
  season: number;
  source: string;
  position: string;
  position_group: PositionGroup;
  /** Corresponds to StatProfile.profileId */
  stat_profile_used: string;
  /** Raw stat values keyed by field name from the position's StatProfile.fields */
  raw_stats_json: Record<string, unknown>;
  alignment_data: AlignmentData;
  total_snaps?: number;
  snap_share?: number;
}

/** Structured alignment/snap-distribution data from PFF */
export interface AlignmentData {
  /** The dominant alignment this player lines up in */
  primary_alignment?: string;
  /** Map of alignment label → percentage of snaps (0–1) */
  alignments: Record<string, number>;
  /** Optional breakdown of snap counts by alignment */
  snap_distribution?: Record<string, number>;
}

// ────────────────────────────────────────────────────────────
// POSITION CONFIG TYPES
// ────────────────────────────────────────────────────────────

/** Shape definition for a position group's expected stat fields */
export interface StatProfile {
  /** Unique identifier for this profile template, e.g. "DL_STANDARD" */
  profileId: string;
  /** Ordered list of expected stat field names to scrape */
  fields: string[];
  /** Valid alignment category labels for this position group */
  alignmentCategories: string[];
}

// ────────────────────────────────────────────────────────────
// QUEUE / ENRICHMENT TYPES
// ────────────────────────────────────────────────────────────

/** A player pulled from the queue, ready for enrichment */
export interface QueuedPlayer {
  queueId: string;
  playerId: string;
  player: Player;
  attempts: number;
}

/** Result from enriching a single player */
export type EnrichmentResult =
  | {
      playerId: string;
      queueId: string;
      success: true;
      data: EnrichedPlayerData;
    }
  | {
      playerId: string;
      queueId: string;
      success: false;
      error: string;
      errorStack: string;
    };

/** Summary returned from syncEnrichedPlayersToDb */
export interface SyncResult {
  synced: number;
  failed: number;
  errors: string[];
}

// ────────────────────────────────────────────────────────────
// INGESTION RUN SUMMARY
// ────────────────────────────────────────────────────────────

/** Summary returned from a full checkNewPortalEntrants() run */
export interface IngestionRunResult {
  /** Players newly inserted into the DB */
  added: number;
  /** Existing players whose record was updated (e.g. last_seen_at refreshed) */
  updated: number;
  /** Players detected as committed to a new school */
  committed: number;
  /** Players detected as withdrawn from the portal */
  withdrawn: number;
  /** Count of errors encountered during this run */
  errors: number;
  /** Number of items in the queue after this run */
  queue_size: number;
}
