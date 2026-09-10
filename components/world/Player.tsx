"use client";

/**
 * The player, drawn as a character standing in the scene rather than a UI chip
 * floating over it. Palette follows the existing illustrated portrait — dark
 * hoodie, light trousers, dark sneakers — so the avatar in the world and the
 * one on the Home tab read as the same person. The portrait itself isn't used
 * here: it ships as an opaque rectangle with no alpha, which can't sit on a
 * night street without a white box around it.
 */
export default function Player({
  x,
  y,
  facing,
  moving,
}: {
  x: number;
  y: number;
  facing: 1 | -1;
  moving: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`} shapeRendering="auto">
      {/* standing light, so the player reads against a dark street */}
      <ellipse cx={0} cy={2} rx={30} ry={11} fill="var(--world-glow)" opacity={0.16} />
      <ellipse cx={1} cy={2} rx={11} ry={4} fill="black" opacity={0.45} />

      <g transform={`scale(${facing} 1)`}>
        <g className={moving ? "animate-[world-step_0.36s_steps(2)_infinite]" : undefined}>
          {/* sneakers */}
          <rect x={-7} y={-4} width={6} height={4} rx={1.5} fill="oklch(24% 0.01 275)" />
          <rect x={1} y={-4} width={6} height={4} rx={1.5} fill="oklch(24% 0.01 275)" />
          {/* trousers */}
          <rect x={-6.5} y={-16} width={5.5} height={12} fill="oklch(78% 0.012 90)" />
          <rect x={1} y={-16} width={5.5} height={12} fill="oklch(74% 0.012 90)" />
          {/* hoodie */}
          <path d="M-8 -32 q8 -4 16 0 l1.5 16 q-9 3 -19 0 Z" fill="oklch(26% 0.012 275)" />
          {/* sleeve catching the streetlight */}
          <path d="M7 -31 l3 1 l1 13 l-3.5 1 Z" fill="oklch(31% 0.012 275)" />
          {/* head */}
          <circle cx={0} cy={-36} r={5.2} fill="oklch(58% 0.06 55)" />
          {/* hair */}
          <path d="M-5.4 -37.5 q5.4 -6 10.8 0 q-5.4 -2.6 -10.8 0 Z" fill="oklch(18% 0.01 60)" />
          <path d="M-5.4 -37 q5.4 -4.5 10.8 0 l0 -1.5 q-5.4 -4 -10.8 0 Z" fill="oklch(18% 0.01 60)" />
        </g>
      </g>

      {/* a quiet marker, so you never lose yourself on a busy street */}
      <path
        d="M-5 -52 L5 -52 L0 -45 Z"
        fill="var(--world-glow)"
        className="animate-[world-idle-bob_2.2s_ease-in-out_infinite]"
      />
    </g>
  );
}
