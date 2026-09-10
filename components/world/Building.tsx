"use client";

import { memo } from "react";
import type { WorldLocation } from "@/lib/worldConfig";

/**
 * A world object drawn as an isometric volume: a lit front face, a shaded
 * right face, and a top face, so it reads as a building rather than a
 * rectangle. Shape and height come from real data — a tower for a system with
 * documented pipeline stages, a block for a project or substantive role, a
 * kiosk for an early milestone — so a new entry in portfolioData gets a
 * correct building without anyone drawing one.
 */

/** Depth of the isometric offset, as a fraction of footprint. */
const ISO_X = 0.42;
const ISO_Y = 0.26;

/** Stable per-building pseudo-randomness, so window patterns never reshuffle. */
function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function BuildingImpl({
  location,
  active,
  onSelect,
}: {
  location: WorldLocation;
  active: boolean;
  onSelect: (location: WorldLocation) => void;
}) {
  /* Stop the click bubbling to the ground's click-to-move handler on the
     parent <svg>, which would otherwise overwrite the walk-to-door target. */
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(location);
  };

  const lit = location.lit;
  const face = lit ? "var(--world-face)" : "var(--world-face-dim)";
  const side = lit ? "var(--world-face-side)" : "var(--world-face-dim-side)";
  const top = lit ? "var(--world-face-top)" : "var(--world-face-dim-top)";
  const windowFill = lit ? "var(--world-window-lit)" : "var(--world-window-idle)";

  const label = (y: number) => (
    <g shapeRendering="auto">
      <text
        y={y}
        textAnchor="middle"
        fill="var(--world-text)"
        fontSize={13}
        fontWeight={700}
        letterSpacing={0.2}
        opacity={active ? 1 : 0.85}
        style={{ paintOrder: "stroke", stroke: "var(--world-ground-deep)", strokeWidth: 4 }}
      >
        {location.label}
      </text>
    </g>
  );

  const groundShadow = (rx: number) => (
    <ellipse cx={rx * 0.2} cy={4} rx={rx} ry={rx * 0.34} fill="black" opacity={0.38} shapeRendering="auto" />
  );

  const lightPool = lit ? (
    <ellipse
      cx={0}
      cy={2}
      rx={95}
      ry={34}
      fill="url(#world-lightpool)"
      shapeRendering="auto"
      pointerEvents="none"
    />
  ) : null;

  const activeRing = active ? (
    <ellipse
      cx={0}
      cy={4}
      rx={78}
      ry={26}
      fill="none"
      stroke="var(--world-glow)"
      strokeWidth={2}
      shapeRendering="auto"
    />
  ) : null;

  /* ---- plaza pedestal: a holo-kiosk, not a building ---- */
  if (location.kind === "plaza-node") {
    return (
      <g transform={`translate(${location.x} ${location.y})`} onClick={handleClick} className="cursor-pointer">
        {lightPool}
        {groundShadow(20)}
        <g shapeRendering="auto">
          {/* paving base */}
          <ellipse cx={0} cy={0} rx={19} ry={7} fill="var(--world-plaza-edge)" />
          {/* post */}
          <rect x={-3} y={-30} width={6} height={30} fill="var(--world-face-side)" />
          {/* screen: a flat panel on the post, angled with the isometric */}
          <path d="M-19 -62 L13 -68 L13 -34 L-19 -28 Z" fill="var(--world-face)" />
          <path
            d="M-16 -60 L10 -65 L10 -37 L-16 -32 Z"
            fill="var(--world-glow)"
            opacity={active ? 0.85 : 0.6}
          />
          <path
            d="M-19 -62 L13 -68 L13 -34 L-19 -28 Z"
            fill="none"
            stroke="var(--world-glow)"
            strokeWidth={1.5}
            opacity={0.95}
          />
          {/* scan bars on the screen */}
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M-13 ${-55 + i * 8} L7 ${-59 + i * 8}`}
              stroke="var(--world-ground-deep)"
              strokeWidth={2}
              opacity={0.5}
            />
          ))}
          <circle
            cx={-3}
            cy={-70}
            r={3}
            fill="var(--world-glow)"
            className="animate-[world-glow-pulse_2.4s_ease-in-out_infinite]"
          />
        </g>
        {label(-82)}
      </g>
    );
  }

  /* ---- early milestone: a small street kiosk ---- */
  if (location.archetype === "marker") {
    return (
      <g transform={`translate(${location.x} ${location.y})`} onClick={handleClick} className="cursor-pointer">
        {activeRing}
        {groundShadow(20)}
        <g shapeRendering="auto">
          <path d={`M-16 0 L-16 -30 L16 -30 L16 0 Z`} fill={face} />
          <path d={`M16 0 L16 -30 L${16 + 14} ${-30 - 9} L${16 + 14} -9 Z`} fill={side} />
          <path d={`M-16 -30 L${-16 + 14} ${-30 - 9} L${16 + 14} ${-30 - 9} L16 -30 Z`} fill={top} />
          <rect x={-10} y={-24} width={20} height={11} fill={windowFill} opacity={lit ? 0.9 : 0.5} />
          {/* awning */}
          <path d={`M-19 -30 L${-19 + 14} ${-30 - 9} L${19 + 14} ${-30 - 9} L19 -30 Z`} fill="var(--world-glow)" opacity={0.5} />
        </g>
        {label(-52)}
      </g>
    );
  }

  /* ---- towers and blocks ---- */
  const tower = location.archetype === "tower";
  const floors = tower ? Math.max(location.stages, 4) : 3;
  const w = tower ? 92 : 116;
  const depth = tower ? 62 : 74;
  const floorH = 18;
  const h = 30 + floors * floorH;

  const dx = depth * ISO_X;
  const dy = depth * ISO_Y;

  const cols = tower ? 4 : 5;
  const rand = hash(location.id);
  /* Which windows are on. A lit building is mostly awake, a dark one keeps a
     few night-shift lights so it still reads as built. */
  const onChance = lit ? 0.72 : 0.16;

  return (
    <g transform={`translate(${location.x} ${location.y})`} onClick={handleClick} className="cursor-pointer">
      {lightPool}
      {activeRing}
      {groundShadow(w * 0.62)}

      <g shapeRendering="auto">
        {/* right face */}
        <path d={`M${w / 2} 0 L${w / 2} ${-h} L${w / 2 + dx} ${-h - dy} L${w / 2 + dx} ${-dy} Z`} fill={side} />
        {/* top face */}
        <path d={`M${-w / 2} ${-h} L${-w / 2 + dx} ${-h - dy} L${w / 2 + dx} ${-h - dy} L${w / 2} ${-h} Z`} fill={top} />
        {/* front face */}
        <rect x={-w / 2} y={-h} width={w} height={h} fill={face} />
        {/* front/top seam catches the light */}
        <rect x={-w / 2} y={-h} width={w} height={3} fill={top} opacity={0.9} />

        {/* window grid on the front face */}
        {Array.from({ length: floors }).map((_, row) =>
          Array.from({ length: cols }).map((__, col) => {
            const on = rand() < onChance;
            const cellW = (w - 16) / cols;
            return (
              <rect
                key={`${row}-${col}`}
                x={-w / 2 + 8 + col * cellW + cellW * 0.16}
                y={-h + 12 + row * floorH}
                width={cellW * 0.68}
                height={floorH * 0.55}
                fill={on ? windowFill : "var(--world-ground-deep)"}
                opacity={on ? (lit ? 0.92 : 0.55) : 0.75}
              />
            );
          })
        )}

        {/* windows wrapping onto the shaded face */}
        {Array.from({ length: floors }).map((_, row) => (
          <path
            key={`side-${row}`}
            d={`M${w / 2 + dx * 0.24} ${-h + 14 + row * floorH - dy * 0.24}
                l${dx * 0.5} ${-dy * 0.5}
                l0 ${floorH * 0.5}
                l${-dx * 0.5} ${dy * 0.5} Z`}
            fill={windowFill}
            opacity={lit ? 0.4 : 0.22}
          />
        ))}

        {/* entrance, with a lit canopy */}
        <rect x={-15} y={-30} width={30} height={30} fill="var(--world-ground-deep)" />
        <rect x={-15} y={-30} width={30} height={3} fill="var(--world-glow)" opacity={0.85} />
        <rect x={-11} y={-24} width={22} height={20} fill={windowFill} opacity={lit ? 0.5 : 0.2} />

        {/* facade sign */}
        <rect x={-w / 2 + 6} y={-h + 6} width={w - 12} height={4} rx={2} fill="var(--world-glow)" opacity={lit ? 0.9 : 0.35} />

        {/* rooftop: plant boxes, and a mast on towers */}
        <rect x={-w / 2 + 12 + dx * 0.4} y={-h - dy * 0.4 - 7} width={16} height={7} fill={side} />
        <rect x={w / 2 - 30 + dx * 0.6} y={-h - dy * 0.6 - 5} width={12} height={5} fill={side} />
        {tower && (
          <>
            <rect x={dx * 0.5 - 1.5} y={-h - dy * 0.5 - 30} width={3} height={30} fill={side} />
            <circle
              cx={dx * 0.5}
              cy={-h - dy * 0.5 - 32}
              r={3.5}
              fill={lit ? "var(--world-glow)" : "var(--world-window-idle)"}
              className={lit ? "animate-[world-glow-pulse_1.6s_ease-in-out_infinite]" : undefined}
            />
          </>
        )}
      </g>

      {label(-h - dy - (tower ? 46 : 20))}
    </g>
  );
}

export default memo(BuildingImpl);
