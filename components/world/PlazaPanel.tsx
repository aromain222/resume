"use client";

import { bio } from "@/lib/portfolioData";
import { useResume } from "../ResumeContext";
import PanelShell from "./PanelShell";

export default function PlazaPanel({ onClose }: { onClose: () => void }) {
  const { setOpen: setResumeOpen } = useResume();

  return (
    <PanelShell eyebrow="The plaza · about" onClose={onClose}>
      <h3 className="type-display text-[clamp(1.6rem,3vw,2.1rem)] text-bone">Avery Romain</h3>
      {bio.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-[14px] leading-[1.65] text-bone-soft">
          {paragraph}
        </p>
      ))}

      <div className="mt-8 flex flex-wrap items-center gap-5 border-t border-line pt-6">
        <a
          href="mailto:averyromain5@gmail.com"
          className="type-label pressable inline-block bg-bone px-6 py-3 text-[11px] text-stage hover:bg-maroon"
        >
          Email
        </a>
        <button
          onClick={() => setResumeOpen(true)}
          className="stage-link type-label cursor-pointer text-[11px] text-bone"
        >
          Resume
        </button>
        <a
          href="https://linkedin.com/in/avery-romain"
          target="_blank"
          rel="noopener noreferrer"
          className="stage-link type-label text-[11px] text-bone"
        >
          LinkedIn
        </a>
      </div>
    </PanelShell>
  );
}
