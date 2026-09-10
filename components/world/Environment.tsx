"use client";

import { memo } from "react";
import { PLAZA, WORLD_W, type WorldLocation } from "@/lib/worldConfig";

/**
 * The set the buildings stand on: a raised plaza, an avenue running the width
 * of the world, slip roads up to every door, street lighting, planting, and
 * pedestrians. All static markup animated by CSS — it never re-renders on the
 * movement loop, and the global reduced-motion rule stops every moving part.
 */

const AVENUE_Y = PLAZA.y;
const AVENUE_H = 92;

function Streetlight({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  const dir = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y})`}>
      {/* pooled light on the road */}
      <ellipse cx={dir * 18} cy={2} rx={30} ry={10} fill="var(--world-window-lit)" opacity={0.09} />
      <rect x={-2} y={-64} width={4} height={64} fill="var(--world-face-side)" />
      <path d={`M0 -64 q${dir * 18} 0 ${dir * 20} 12`} fill="none" stroke="var(--world-face-side)" strokeWidth={4} />
      <ellipse cx={dir * 20} cy={-50} rx={5} ry={3.5} fill="var(--world-window-lit)" opacity={0.95} />
      {/* a small halo at the lamp itself — a drawn beam reads as a solid cone
          at this scale, which looked like a traffic pylon rather than light */}
      <ellipse cx={dir * 20} cy={-50} rx={13} ry={9} fill="var(--world-window-lit)" opacity={0.12} />
    </g>
  );
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx={2} cy={2} rx={16} ry={6} fill="black" opacity={0.32} />
      <rect x={-2.5} y={-26} width={5} height={26} fill="oklch(30% 0.03 60)" />
      <ellipse cx={0} cy={-34} rx={17} ry={14} fill="oklch(38% 0.07 155)" />
      <ellipse cx={-5} cy={-38} rx={10} ry={8} fill="oklch(45% 0.08 155)" />
    </g>
  );
}

/** A pedestrian pacing a stretch of pavement. */
function Walker({
  x,
  y,
  dx,
  duration,
  delay,
  tint,
}: {
  x: number;
  y: number;
  dx: number;
  duration: number;
  delay: number;
  tint: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        style={
          {
            "--dx": `${dx}px`,
            "--dy": "0px",
            animation: `world-walk ${duration}s linear ${delay}s infinite`,
          } as React.CSSProperties
        }
      >
        <g style={{ animation: `world-step 0.5s steps(2) ${delay}s infinite` }}>
          <ellipse cx={0} cy={1} rx={6} ry={2.5} fill="black" opacity={0.35} />
          <rect x={-3} y={-14} width={6} height={9} fill={tint} />
          <rect x={-2.5} y={-5} width={5} height={5} fill="oklch(28% 0.02 275)" />
          <circle cx={0} cy={-17} r={3.2} fill="oklch(72% 0.05 60)" />
        </g>
      </g>
    </g>
  );
}

function EnvironmentImpl({ locations }: { locations: WorldLocation[] }) {
  const buildings = locations.filter((l) => l.kind !== "plaza-node");

  return (
    <g pointerEvents="none">
      {/* ---- the avenue ---- */}
      <g shapeRendering="auto">
        <rect x={0} y={AVENUE_Y - AVENUE_H / 2} width={WORLD_W} height={AVENUE_H} fill="var(--world-road)" />
        <rect x={0} y={AVENUE_Y - AVENUE_H / 2} width={WORLD_W} height={2} fill="var(--world-plaza-edge)" opacity={0.5} />
        <rect x={0} y={AVENUE_Y + AVENUE_H / 2 - 2} width={WORLD_W} height={2} fill="var(--world-plaza-edge)" opacity={0.5} />
        <line
          x1={0}
          y1={AVENUE_Y}
          x2={WORLD_W}
          y2={AVENUE_Y}
          stroke="var(--world-road-line)"
          strokeWidth={2}
          strokeDasharray="26 22"
        />
      </g>

      {/* ---- side street from the avenue up to each door ---- */}
      <g shapeRendering="auto">
        {buildings.map((b) => {
          const doorY = b.y + 26;
          const fromY = b.y < AVENUE_Y ? AVENUE_Y - AVENUE_H / 2 : AVENUE_Y + AVENUE_H / 2;
          const top = Math.min(doorY, fromY);
          const height = Math.abs(fromY - doorY);
          const w = 46;
          return (
            <g key={`slip-${b.id}`}>
              <rect x={b.x - w / 2} y={top} width={w} height={height} fill="var(--world-road)" />
              {/* kerbs and a centre line, so it reads as a street rather than
                  a grey column standing behind the building */}
              <rect x={b.x - w / 2} y={top} width={2} height={height} fill="var(--world-plaza-edge)" opacity={0.45} />
              <rect x={b.x + w / 2 - 2} y={top} width={2} height={height} fill="var(--world-plaza-edge)" opacity={0.45} />
              <line
                x1={b.x}
                y1={top}
                x2={b.x}
                y2={top + height}
                stroke="var(--world-road-line)"
                strokeWidth={1.5}
                strokeDasharray="16 16"
                opacity={0.7}
              />
            </g>
          );
        })}
      </g>

      {/* ---- the plaza ---- */}
      <g shapeRendering="auto">
        <ellipse cx={PLAZA.x} cy={PLAZA.y} rx={PLAZA.r + 46} ry={(PLAZA.r + 46) * 0.62} fill="var(--world-plaza)" />
        <ellipse
          cx={PLAZA.x}
          cy={PLAZA.y}
          rx={PLAZA.r + 46}
          ry={(PLAZA.r + 46) * 0.62}
          fill="none"
          stroke="var(--world-plaza-edge)"
          strokeWidth={3}
        />
        <ellipse
          cx={PLAZA.x}
          cy={PLAZA.y}
          rx={PLAZA.r - 4}
          ry={(PLAZA.r - 4) * 0.62}
          fill="none"
          stroke="var(--world-glow)"
          strokeWidth={1.5}
          opacity={0.5}
        />
        <ellipse
          cx={PLAZA.x}
          cy={PLAZA.y}
          rx={PLAZA.r - 52}
          ry={(PLAZA.r - 52) * 0.62}
          fill="none"
          stroke="var(--world-plaza-edge)"
          strokeWidth={1.5}
          opacity={0.7}
        />
        {/* paving spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const r1 = PLAZA.r - 50;
          const r2 = PLAZA.r + 44;
          return (
            <line
              key={`spoke-${i}`}
              x1={PLAZA.x + Math.cos(a) * r1}
              y1={PLAZA.y + Math.sin(a) * r1 * 0.62}
              x2={PLAZA.x + Math.cos(a) * r2}
              y2={PLAZA.y + Math.sin(a) * r2 * 0.62}
              stroke="var(--world-plaza-edge)"
              strokeWidth={1}
              opacity={0.4}
            />
          );
        })}
      </g>

      {/* ---- planting and lighting along the avenue ---- */}
      {Array.from({ length: Math.floor(WORLD_W / 300) }).map((_, i) => {
        const x = 160 + i * 300;
        const nearPlaza = Math.abs(x - PLAZA.x) < PLAZA.r + 90;
        if (nearPlaza) return null;
        return (
          <g key={`street-${i}`} shapeRendering="auto">
            <Streetlight x={x} y={AVENUE_Y - AVENUE_H / 2 - 4} />
            <Streetlight x={x + 150} y={AVENUE_Y + AVENUE_H / 2 + 4} flip />
            <Tree x={x + 66} y={AVENUE_Y - AVENUE_H / 2 - 10} s={0.9} />
            <Tree x={x + 214} y={AVENUE_Y + AVENUE_H / 2 + 16} s={1.05} />
          </g>
        );
      })}

      {/* ---- pedestrians ---- */}
      <g shapeRendering="auto">
        <Walker x={PLAZA.x - 190} y={AVENUE_Y - 18} dx={150} duration={13} delay={0} tint="oklch(42% 0.09 25)" />
        <Walker x={PLAZA.x + 120} y={AVENUE_Y + 22} dx={-190} duration={16} delay={2.5} tint="oklch(38% 0.05 250)" />
        <Walker x={PLAZA.x + 430} y={AVENUE_Y - 26} dx={210} duration={18} delay={1.2} tint="oklch(45% 0.06 200)" />
        <Walker x={PLAZA.x - 620} y={AVENUE_Y + 14} dx={180} duration={15} delay={3.4} tint="oklch(40% 0.08 320)" />
        <Walker x={PLAZA.x - 60} y={PLAZA.y + 84} dx={130} duration={12} delay={1.8} tint="oklch(44% 0.07 90)" />
      </g>
    </g>
  );
}

export default memo(EnvironmentImpl);
