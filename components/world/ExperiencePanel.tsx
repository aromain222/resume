"use client";

import type { ExperienceStop } from "@/lib/portfolioData";
import { useResume } from "../ResumeContext";
import { useTabNavigation } from "../TabNavigationContext";
import PanelShell from "./PanelShell";
import PipelineDiagram from "./PipelineDiagram";

export default function ExperiencePanel({
  stop,
  onClose,
}: {
  stop: ExperienceStop;
  onClose: () => void;
}) {
  const { setOpen: setResumeOpen } = useResume();
  const { goTo } = useTabNavigation();

  return (
    <PanelShell eyebrow={`${stop.period} · world`} onClose={onClose}>
      <div className="flex items-baseline gap-3">
        <h3 className="type-display text-[clamp(1.6rem,3vw,2.1rem)] text-bone">{stop.company}</h3>
        {stop.now && (
          <span className="type-label shrink-0 bg-maroon px-2 py-1 text-[9px] text-white">Now</span>
        )}
      </div>
      <span className="type-label mt-2 block text-[10px] text-bone-faint">{stop.role}</span>
      <p className="mt-4 text-[14px] leading-[1.6] text-bone-soft">{stop.detail}</p>

      {stop.bullets && (
        <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
          {stop.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-[13.5px] leading-[1.65] text-bone-soft">
              <span aria-hidden className="mt-[9px] h-px w-3 shrink-0 bg-maroon" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {stop.pipeline && <PipelineDiagram stages={stop.pipeline} />}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          onClick={() => setResumeOpen(true)}
          className="type-label pressable inline-block bg-bone px-6 py-3 text-[11px] text-stage hover:bg-maroon"
        >
          Full resume
        </button>
        <button
          onClick={() => {
            onClose();
            goTo("path");
          }}
          className="stage-link type-label cursor-pointer text-[11px] text-bone"
        >
          View on the Path
        </button>
      </div>
    </PanelShell>
  );
}
