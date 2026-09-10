"use client";

import { useResume } from "../ResumeContext";
import { useTabNavigation } from "../TabNavigationContext";

/** The persistent quick-nav strip inside world mode. The site Navbar above it
    already covers "traditional nav stays visible" — this adds the map/teleport
    entry point plus a one-click way out to the tab that actually holds the
    full content, so a recruiter never has to explore to reach anything. */
export default function WorldHUD({ onOpenMap }: { onOpenMap: () => void }) {
  const { goTo } = useTabNavigation();
  const { setOpen: setResumeOpen } = useResume();

  const links: { label: string; onClick: () => void }[] = [
    { label: "Projects", onClick: () => goTo("work") },
    { label: "Experience", onClick: () => goTo("path") },
    { label: "Resume", onClick: () => setResumeOpen(true) },
    { label: "Contact", onClick: () => goTo("contact") },
  ];

  return (
    <div className="mx-auto mb-4 flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-1">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        {links.map((l) => (
          <button
            key={l.label}
            onClick={l.onClick}
            className="type-label cursor-pointer text-[11px] text-bone-faint transition-colors duration-200 hover:text-bone"
          >
            {l.label}
          </button>
        ))}
      </div>
      <button
        onClick={onOpenMap}
        className="type-label pressable flex cursor-pointer items-center gap-2 border border-line px-3 py-2 text-[10px] text-bone hover:border-maroon hover:text-maroon"
      >
        <kbd className="rounded-[3px] border border-line px-1 font-mono text-[9px]">M</kbd>
        Map
      </button>
    </div>
  );
}
