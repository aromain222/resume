"use client";

/** Floats above whichever location the player is currently near, positioned
    in screen-percent space derived from the camera window so it tracks the
    SVG without its own coordinate system. */
export default function InteractionPrompt({
  label,
  x,
  y,
  camX,
  camY,
  viewW,
  viewH,
}: {
  label: string;
  x: number;
  y: number;
  camX: number;
  camY: number;
  viewW: number;
  viewH: number;
}) {
  const left = ((x - camX) / viewW) * 100;
  const top = ((y - camY) / viewH) * 100;

  return (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%]"
      style={{ left: `${left}%`, top: `${top}%` }}
    >
      <div className="flex items-center gap-2 whitespace-nowrap border border-line bg-stage-raised/95 px-3 py-1.5 text-[11px] text-bone shadow-lg backdrop-blur-sm">
        <kbd className="rounded-[3px] border border-line bg-stage px-1.5 py-0.5 font-mono text-[10px]">E</kbd>
        <span className="type-label text-[10px] text-bone-faint">or click</span>
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}
