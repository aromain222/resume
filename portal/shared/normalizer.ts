// ============================================================
// Normalisation utilities
// ============================================================
//
// Used by ingestion adapters and deduplication logic to produce
// consistent, source-agnostic keys for players.
// ============================================================

import { createHash } from 'crypto';
import type { PositionGroup, RawPortalEntry } from '../types.js';

// ────────────────────────────────────────────────────────────
// NAME NORMALISATION
// ────────────────────────────────────────────────────────────

/**
 * Normalise a player name for deduplication purposes.
 *
 * Steps (applied in order):
 *  1. Lowercase
 *  2. Remove common generational suffixes (Jr, Sr, II, III, IV)
 *  3. Strip all punctuation (apostrophes, hyphens, periods, etc.)
 *  4. Collapse internal whitespace to a single space
 *  5. Trim leading/trailing whitespace
 *
 * Examples:
 *   "Caleb Williams Jr."  → "caleb williams"
 *   "O'Cyrus Torrence II" → "ocyrus torrence"
 *   "De'Von Achane"       → "devon achane"
 */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    // Remove generational suffixes (standalone word boundaries)
    .replace(/\b(jr\.?|sr\.?|ii|iii|iv)\b/g, '')
    // Strip punctuation characters
    .replace(/[^\w\s]/g, '')
    // Collapse multiple whitespace characters into one
    .replace(/\s+/g, ' ')
    .trim();
}

// ────────────────────────────────────────────────────────────
// POSITION GROUP MAPPING
// ────────────────────────────────────────────────────────────

/**
 * Map from every known position abbreviation to its canonical PositionGroup.
 * Covers all positions listed in types.ts plus common variants seen in the wild.
 */
const POSITION_TO_GROUP: Record<string, PositionGroup> = {
  // Quarterback
  QB: 'QB',

  // Skill positions (RB, WR, FB)
  RB: 'SKILL',
  WR: 'SKILL',
  FB: 'SKILL',
  HB: 'SKILL',
  SB: 'SKILL',
  FL: 'SKILL',  // flanker
  SE: 'SKILL',  // split end

  // Tight end
  TE: 'TE',
  H:  'TE',     // H-back often maps to TE for profiling purposes

  // Offensive line
  OT:  'OL',
  OG:  'OG' in {} ? 'OL' : 'OL', // OG is never its own group
  C:   'OL',
  OL:  'OL',
  LT:  'OL',
  RT:  'OL',
  LG:  'OL',
  RG:  'OL',

  // Defensive line
  DT:   'DL',
  NT:   'DL',
  DL:   'DL',
  DE:   'DL',
  EDGE: 'DL',
  '3T': 'DL',  // 3-technique shorthand sometimes appears in source data

  // Linebackers
  LB:  'LB',
  ILB: 'LB',
  OLB: 'LB',
  MLB: 'LB',
  WLB: 'LB',
  SLB: 'LB',
  SAM: 'LB',
  MIKE:'LB',
  WILL:'LB',

  // Defensive backs
  CB:  'DB',
  S:   'DB',
  SS:  'DB',
  FS:  'DB',
  DB:  'DB',
  SAF: 'DB',
  NB:  'DB',   // nickelback
  NCB: 'DB',   // nickel corner

  // Special teams
  K:  'ST',
  P:  'ST',
  LS: 'ST',
  KR: 'ST',   // kick returner sometimes listed separately
  PR: 'ST',   // punt returner
};

/**
 * Map a raw position string (e.g. "EDGE", "ILB", "SS") to its
 * canonical PositionGroup enum value.
 *
 * Unknown positions default to 'SKILL' with a warning-friendly return
 * so the pipeline never hard-crashes on a new/unusual position label.
 */
export function getPositionGroup(position: string): PositionGroup {
  const normalised = position.trim().toUpperCase();
  return POSITION_TO_GROUP[normalised] ?? 'SKILL';
}

// ────────────────────────────────────────────────────────────
// DEDUPLICATION KEY
// ────────────────────────────────────────────────────────────

/**
 * Build a stable deduplication key from a raw portal entry.
 *
 * The key is a SHA-256 hex digest of:
 *   "<normalizedName>|<schoolFrom_lowercase>|<positionGroup>"
 *
 * This allows the same player to be reported by multiple sources
 * (On3, 247Sports, ESPN) and still resolve to a single canonical row.
 */
export function buildDedupeKey(entry: RawPortalEntry): string {
  const normalized = normalizeName(entry.name);
  const school = entry.school_from.trim().toLowerCase();
  const posGroup = getPositionGroup(entry.position);

  const payload = `${normalized}|${school}|${posGroup}`;
  return createHash('sha256').update(payload).digest('hex');
}

/**
 * Build the same hash used as the DB conflict key.
 *
 * Used when you already have the individual components (e.g. after
 * reading from the database) rather than a full RawPortalEntry.
 *
 * Parameters must match how the data is stored:
 *   normalized_name — output of normalizeName()
 *   school_from     — raw school string (will be lowercased here)
 *   position        — raw position string (position group is derived)
 */
export function buildPlayerHash(
  normalized_name: string,
  school_from: string,
  position: string,
): string {
  const school = school_from.trim().toLowerCase();
  const posGroup = getPositionGroup(position);

  const payload = `${normalized_name}|${school}|${posGroup}`;
  return createHash('sha256').update(payload).digest('hex');
}
