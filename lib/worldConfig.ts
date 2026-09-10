/**
 * Pure layout for the explorable world. Reads content from portfolioData —
 * no project/experience text is duplicated here, only coordinates and derived
 * visual state, all computed from real fields (`status`, `now`, `bullets`,
 * `pipeline`). No invented statuses.
 */

import { projects, experience, type Project, type ExperienceStop } from "./portfolioData";
import type { TabId } from "@/components/SiteTabs";

/* The world is sized so both districts lay out on a fixed grid with room for
   full labels and the isometric depth of each volume — nothing is clamped
   into a neighbour. */
export const WORLD_W = 3400;
export const WORLD_H = 1500;

export const PLAZA = { x: 1750, y: 780, r: 120 };
/* Beside the plaza rather than below it, so the whole ring and every label sit
   inside the camera window on spawn, clear of any interact radius. */
export const PLAYER_START = { x: 1980, y: 800 };
export const INTERACT_RADIUS = 62;

/**
 * How a location is drawn. Derived, never authored by hand:
 * - `tower`  a system with documented pipeline stages (the big ones)
 * - `block`  a project or a role with substance behind it
 * - `marker` an early stop with no bullets — a milestone, not a system
 * - `node`   a plaza pedestal
 */
export type Archetype = "tower" | "block" | "marker" | "node";

export type PlazaAction =
  | { type: "panel"; panel: "plaza" }
  | { type: "resume" }
  | { type: "external"; href: string }
  | { type: "goto"; tab: TabId };

type Base = {
  id: string;
  label: string;
  x: number;
  y: number;
  lit: boolean;
  archetype: Archetype;
  /** Stage count, used for tower height and ambient traffic. 0 when undocumented. */
  stages: number;
};

export type WorldLocation =
  | (Base & { kind: "plaza-node"; action: PlazaAction })
  | (Base & { kind: "project"; project: Project })
  | (Base & { kind: "experience"; stop: ExperienceStop });

/**
 * Work district: projects east of the plaza in two columns. A grid rather than
 * an arc, because an arc pushed later entries past the world edge, where they
 * clamped on top of each other. Column spacing clears the longest project
 * title; row spacing clears the tallest tower plus its label.
 */
function workDistrict(): WorldLocation[] {
  const columnX = [PLAZA.x + 560, PLAZA.x + 1000];
  const rowStep = 260;
  const top = 380;

  return projects.map((project, i) => {
    const stages = project.pipeline?.length ?? 0;

    return {
      kind: "project" as const,
      id: `project-${project.title}`,
      label: project.title,
      x: columnX[i % 2],
      y: top + i * (rowStep / 2),
      lit: project.status === "Live",
      archetype: stages > 0 ? ("tower" as const) : ("block" as const),
      stages,
      project,
    };
  });
}

/**
 * Path district: experience stops walking west from the plaza in chronological
 * order, alternating between two lanes so neighbouring labels never collide.
 */
function pathDistrict(): WorldLocation[] {
  const startX = PLAZA.x - 260;
  const step = 185;
  /* Alternating sides of the avenue, so the path reads as a street with
     frontage on both sides rather than a row of boxes. */
  const lane = [PLAZA.y - 330, PLAZA.y + 300];

  return experience.map((stop, i) => {
    const stages = stop.pipeline?.length ?? 0;
    const archetype: Archetype = stages > 0 ? "tower" : stop.bullets?.length ? "block" : "marker";

    return {
      kind: "experience" as const,
      id: `experience-${stop.company}`,
      label: stop.company,
      x: startX - i * step,
      y: lane[i % 2],
      lit: !!stop.now,
      archetype,
      stages,
      stop,
    };
  });
}

/** The plaza: you, in the middle. Every top-level destination the site has,
    one step from spawn — a recruiter never has to explore to reach anything. */
function plazaNodes(): WorldLocation[] {
  const ring = 80;
  const spokes: { id: string; label: string; angle: number; action: PlazaAction }[] = [
    { id: "about", label: "About", angle: -90, action: { type: "panel", panel: "plaza" } },
    { id: "projects", label: "Projects", angle: -30, action: { type: "goto", tab: "work" } },
    {
      id: "linkedin",
      label: "LinkedIn",
      angle: 30,
      action: { type: "external", href: "https://linkedin.com/in/avery-romain" },
    },
    { id: "contact", label: "Contact", angle: 90, action: { type: "goto", tab: "contact" } },
    { id: "resume", label: "Resume", angle: 150, action: { type: "resume" } },
    { id: "experience", label: "Experience", angle: -150, action: { type: "goto", tab: "path" } },
  ];

  return spokes.map(({ id, label, angle, action }) => {
    const rad = (angle * Math.PI) / 180;
    return {
      kind: "plaza-node" as const,
      id: `plaza-${id}`,
      label,
      x: PLAZA.x + Math.cos(rad) * ring,
      y: PLAZA.y + Math.sin(rad) * ring,
      lit: true,
      archetype: "node" as const,
      stages: 0,
      action,
    };
  });
}

export function buildWorld(): WorldLocation[] {
  return [...plazaNodes(), ...workDistrict(), ...pathDistrict()];
}

/**
 * Ambient traffic: one packet per documented pipeline stage, running the route
 * between the plaza and that system. Pure decoration derived from real stage
 * counts — the busiest buildings are the ones with the most documented stages.
 */
export type Courier = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  duration: number;
  delay: number;
};

export function buildCouriers(locations: WorldLocation[]): Courier[] {
  const couriers: Courier[] = [];

  for (const loc of locations) {
    if (loc.archetype !== "tower") continue;
    const packets = Math.min(loc.stages, 4);
    const spacing = 1.15;

    for (let i = 0; i < packets; i += 1) {
      couriers.push({
        id: `${loc.id}-packet-${i}`,
        x1: PLAZA.x,
        y1: PLAZA.y,
        x2: loc.x,
        y2: loc.y - 8,
        duration: 5.5 + (i % 3) * 1.4,
        delay: i * spacing,
      });
    }
  }

  return couriers;
}

const GROUP_LABEL: Record<WorldLocation["kind"], string> = {
  "plaza-node": "Plaza",
  project: "Projects",
  experience: "Experience",
};

/** Groups locations for the teleport menu and the mobile list, so both read
    the same ordering and labels from one place. */
export function groupLocations(locations: WorldLocation[]): [string, WorldLocation[]][] {
  const groups = new Map<string, WorldLocation[]>();

  for (const loc of locations) {
    const label = GROUP_LABEL[loc.kind];
    const bucket = groups.get(label);
    if (bucket) bucket.push(loc);
    else groups.set(label, [loc]);
  }

  return [...groups.entries()];
}
