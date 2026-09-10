"use client";

import { memo } from "react";
import type { Courier } from "@/lib/worldConfig";

/**
 * The world's signs of life: packets running between the plaza and each system
 * that documents pipeline stages. Purely decorative — it visualizes the shape
 * of the architecture, not live traffic — and it is static markup animated by
 * CSS, so the global reduced-motion rule stops all of it and nothing here
 * re-renders on the movement loop.
 */
function AmbientLayerImpl({ couriers }: { couriers: Courier[] }) {
  return (
    <g pointerEvents="none" shapeRendering="auto">
      {/* Routes, drawn faintly so the traffic has a visible track to run on. */}
      {couriers.map((c) => (
        <line
          key={`route-${c.id}`}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="var(--world-route)"
          strokeWidth={1}
          strokeDasharray="3 9"
        />
      ))}

      {couriers.map((c) => (
        <g
          key={c.id}
          transform={`translate(${c.x1} ${c.y1})`}
        >
          <circle
            r={2.5}
            fill="var(--world-glow)"
            style={
              {
                "--dx": `${c.x2 - c.x1}px`,
                "--dy": `${c.y2 - c.y1}px`,
                /* Inline rather than a Tailwind arbitrary class so the per-courier
                   duration stays a plain value; the global reduced-motion rule
                   uses !important, so this still collapses to nothing. */
                animation: `world-courier ${c.duration}s linear ${c.delay}s infinite`,
              } as React.CSSProperties
            }
          />
        </g>
      ))}
    </g>
  );
}

export default memo(AmbientLayerImpl);
