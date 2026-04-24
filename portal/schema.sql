-- ============================================================
-- Transfer Portal Pipeline — Postgres Schema
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- ENUMS
-- ────────────────────────────────────────────────────────────

CREATE TYPE player_status AS ENUM (
  'pending',
  'queued',
  'enriching',
  'enriched',
  'committed',
  'withdrawn'
);

CREATE TYPE pff_enrichment_status AS ENUM (
  'pending',
  'queued',
  'processing',
  'done',
  'failed',
  'skipped'
);

CREATE TYPE queue_status AS ENUM (
  'pending',
  'processing',
  'done',
  'failed',
  'skipped'
);

CREATE TYPE position_group AS ENUM (
  'QB',
  'SKILL',
  'TE',
  'OL',
  'DL',
  'LB',
  'DB',
  'ST'
);

-- ────────────────────────────────────────────────────────────
-- UPDATED_AT TRIGGER FUNCTION
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ────────────────────────────────────────────────────────────
-- TABLE: players
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS players (
  id                    UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
  name                  TEXT                  NOT NULL,
  normalized_name       TEXT                  NOT NULL,
  position              TEXT                  NOT NULL,
  position_group        position_group        NOT NULL,
  school_from           TEXT                  NOT NULL,
  school_to             TEXT,
  source                TEXT                  NOT NULL,
  source_id             TEXT                  NOT NULL,
  source_ids            JSONB                 NOT NULL DEFAULT '{}',
  status                player_status         NOT NULL DEFAULT 'pending',
  active_in_portal      BOOLEAN               NOT NULL DEFAULT TRUE,
  pff_enrichment_status pff_enrichment_status NOT NULL DEFAULT 'pending',
  portal_entry_date     DATE,
  committed_date        TIMESTAMPTZ,
  withdrawn_date        TIMESTAMPTZ,
  first_seen_at         TIMESTAMPTZ           NOT NULL DEFAULT NOW(),
  last_seen_at          TIMESTAMPTZ           NOT NULL DEFAULT NOW(),
  source_url            TEXT,
  created_at            TIMESTAMPTZ           NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ           NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_players_name_school_position
    UNIQUE (normalized_name, school_from, position)
);

CREATE TRIGGER trg_players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ────────────────────────────────────────────────────────────
-- TABLE: player_stats
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS player_stats (
  id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id           UUID        NOT NULL REFERENCES players (id) ON DELETE CASCADE,
  season              INTEGER     NOT NULL,
  week                INTEGER,
  source              TEXT        NOT NULL,
  position            TEXT        NOT NULL,
  position_group      TEXT        NOT NULL,
  stat_profile_used   TEXT        NOT NULL,
  raw_stats_json      JSONB       NOT NULL DEFAULT '{}',
  alignment_data      JSONB       NOT NULL DEFAULT '{}',
  total_snaps         INTEGER,
  snap_share          FLOAT,
  scraped_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT uq_player_stats_player_season_source
    UNIQUE (player_id, season, source)
);

CREATE TRIGGER trg_player_stats_updated_at
  BEFORE UPDATE ON player_stats
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ────────────────────────────────────────────────────────────
-- TABLE: portal_ingestion_queue
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS portal_ingestion_queue (
  id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id         UUID        NOT NULL UNIQUE REFERENCES players (id) ON DELETE CASCADE,
  status            queue_status NOT NULL DEFAULT 'pending',
  priority          INTEGER     NOT NULL DEFAULT 5,
  attempts          INTEGER     NOT NULL DEFAULT 0,
  max_attempts      INTEGER     NOT NULL DEFAULT 3,
  queued_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_attempted_at TIMESTAMPTZ,
  completed_at      TIMESTAMPTZ,
  next_attempt_at   TIMESTAMPTZ,
  error_message     TEXT,
  error_stack       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_portal_ingestion_queue_updated_at
  BEFORE UPDATE ON portal_ingestion_queue
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ────────────────────────────────────────────────────────────
-- INDEXES
-- ────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_players_status
  ON players (status);

CREATE INDEX IF NOT EXISTS idx_players_active_in_portal
  ON players (active_in_portal);

CREATE INDEX IF NOT EXISTS idx_players_position_group
  ON players (position_group);

CREATE INDEX IF NOT EXISTS idx_players_normalized_name
  ON players (normalized_name);

CREATE INDEX IF NOT EXISTS idx_queue_status_priority
  ON portal_ingestion_queue (status, priority);

CREATE INDEX IF NOT EXISTS idx_queue_next_attempt_at
  ON portal_ingestion_queue (next_attempt_at);

CREATE INDEX IF NOT EXISTS idx_player_stats_player_season
  ON player_stats (player_id, season);

-- ────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_ingestion_queue ENABLE ROW LEVEL SECURITY;

-- Service role bypass: the service role key bypasses RLS automatically in
-- Supabase, but we add explicit policies for clarity and future-proofing.

CREATE POLICY "service_role_bypass_players"
  ON players
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_bypass_player_stats"
  ON player_stats
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_bypass_portal_ingestion_queue"
  ON portal_ingestion_queue
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
