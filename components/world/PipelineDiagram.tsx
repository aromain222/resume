"use client";

/**
 * The documented stages a system moves work through. This is an architecture
 * diagram drawn from the project's own docs — it is labelled as such, and
 * deliberately shows no counts, confidence scores, or live state, because
 * none of that is being read from a running system.
 */
export default function PipelineDiagram({ stages }: { stages: string[] }) {
  return (
    <div className="mt-8 border-t border-line pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <p className="type-label text-[10px] text-maroon">Documented architecture</p>
        <p className="type-label text-[9px] text-bone-faint">Not live data</p>
      </div>

      <ol className="mt-4 space-y-0">
        {stages.map((stage, i) => (
          <li key={stage} className="flex items-stretch gap-3">
            <div className="flex w-4 shrink-0 flex-col items-center">
              <span
                aria-hidden
                className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${
                  i === stages.length - 1 ? "bg-maroon" : "bg-bone-faint"
                }`}
              />
              {i < stages.length - 1 && (
                <span aria-hidden className="w-px flex-1 bg-line" />
              )}
            </div>
            <span
              className={`pb-3 text-[13.5px] leading-[1.5] ${
                i === stages.length - 1 ? "font-semibold text-bone" : "text-bone-soft"
              }`}
            >
              {stage}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
