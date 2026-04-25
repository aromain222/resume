import crypto from 'crypto'
import type { RawPortalEntry, PositionGroup } from '../types'

const POSITION_TO_GROUP: Record<string, PositionGroup> = {
  QB: 'QB',
  RB: 'SKILL',
  WR: 'SKILL',
  FB: 'SKILL',
  'WR/RB': 'SKILL',
  TE: 'TE',
  OT: 'OL',
  OG: 'OL',
  C: 'OL',
  OL: 'OL',
  DT: 'DL',
  NT: 'DL',
  DL: 'DL',
  DE: 'DL',
  EDGE: 'DL',
  LB: 'LB',
  ILB: 'LB',
  OLB: 'LB',
  MLB: 'LB',
  CB: 'DB',
  S: 'DB',
  SS: 'DB',
  FS: 'DB',
  DB: 'DB',
  SAF: 'DB',
  K: 'ST',
  P: 'ST',
  LS: 'ST',
}

export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(jr\.?|sr\.?|ii|iii|iv)\b/g, '')
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function getPositionGroup(position: string): PositionGroup {
  const upper = position.trim().toUpperCase()
  return POSITION_TO_GROUP[upper] ?? 'SKILL'
}

export function buildDedupeKey(entry: Pick<RawPortalEntry, 'name' | 'school_from' | 'position'>): string {
  const str = `${normalizeName(entry.name)}|${entry.school_from.toLowerCase().trim()}|${getPositionGroup(entry.position)}`
  return crypto.createHash('sha256').update(str).digest('hex')
}
