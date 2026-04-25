import type { PositionGroup, StatProfile } from '../types'

const STAT_PROFILES: Record<PositionGroup, StatProfile> = {
  DL: {
    profileId: 'DL_STANDARD',
    fields: [
      'sacks',
      'pressures',
      'hurries',
      'tackles',
      'tfl',
      'forced_fumbles',
      'pass_rush_grade',
      'run_stop_grade',
      'pff_grade',
    ],
    alignmentCategories: [
      '0-tech',
      '1-tech',
      '2i',
      '3-tech',
      '4i',
      '5-tech',
      'wide-9',
      'stand-up',
    ],
  },
  LB: {
    profileId: 'LB_STANDARD',
    fields: [
      'tackles',
      'solo_tackles',
      'assisted_tackles',
      'sacks',
      'tfl',
      'ints',
      'pbu',
      'qb_hits',
      'coverage_grade',
      'run_defense_grade',
      'pff_grade',
    ],
    alignmentCategories: ['box', 'off-ball', 'slot-blitz', 'edge'],
  },
  DB: {
    profileId: 'DB_STANDARD',
    fields: [
      'tackles',
      'ints',
      'pbu',
      'targets_allowed',
      'receptions_allowed',
      'yards_allowed',
      'completion_pct_allowed',
      'coverage_grade',
      'pff_grade',
    ],
    alignmentCategories: [
      'slot',
      'outside-left',
      'outside-right',
      'box',
      'deep-half',
      'deep-third',
    ],
  },
  SKILL: {
    profileId: 'SKILL_STANDARD',
    fields: [
      'receptions',
      'targets',
      'yards',
      'tds',
      'yac',
      'drop_rate',
      'carries',
      'ypc',
      'yards_after_contact',
      'separation_grade',
      'pff_grade',
    ],
    alignmentCategories: ['slot', 'left', 'right', 'backfield', 'inline'],
  },
  OL: {
    profileId: 'OL_STANDARD',
    fields: [
      'pass_block_grade',
      'run_block_grade',
      'pressures_allowed',
      'hurries_allowed',
      'hits_allowed',
      'sacks_allowed',
      'penalties',
      'pff_grade',
    ],
    alignmentCategories: ['LT', 'LG', 'C', 'RG', 'RT'],
  },
  QB: {
    profileId: 'QB_STANDARD',
    fields: [
      'completions',
      'attempts',
      'yards',
      'tds',
      'ints',
      'passer_rating',
      'epa_per_play',
      'completion_pct',
      'adjusted_completion_pct',
      'pff_grade',
    ],
    alignmentCategories: ['under-center', 'shotgun', 'pistol'],
  },
  TE: {
    profileId: 'TE_STANDARD',
    fields: [
      'receptions',
      'targets',
      'yards',
      'tds',
      'yac',
      'drop_rate',
      'run_block_grade',
      'pff_grade',
    ],
    alignmentCategories: ['inline', 'slot', 'wing', 'h-back'],
  },
  ST: {
    profileId: 'ST_STANDARD',
    fields: [
      'fg_pct',
      'xp_pct',
      'punts',
      'punt_avg',
      'gross_avg',
      'net_avg',
      'snaps',
    ],
    alignmentCategories: ['kicker', 'punter', 'snapper'],
  },
}

export function getStatProfile(group: PositionGroup): StatProfile {
  return STAT_PROFILES[group]
}

export function getStatProfileId(group: PositionGroup): string {
  return STAT_PROFILES[group].profileId
}
