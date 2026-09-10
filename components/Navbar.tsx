"use client";

import { useEffect, useState } from "react";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";
import { TABS, type TabId } from "./SiteTabs";

export default function Navbar({
  active,
  onSelect,
  onKeyDown,
  tabRefs,
}: {
  active: TabId;
  onSelect: (id: TabId) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  tabRefs: React.RefObject<Record<string, HTMLButtonElement | null>>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useResume();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-line bg-stage/80 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-6 px-6 py-3 sm:flex-nowrap sm:py-4 sm:px-10 lg:px-16">
        <button
          onClick={() => onSelect("home")}
          className="type-label order-1 shrink-0 cursor-pointer py-1 text-[13px] text-bone transition-colors duration-200 hover:text-maroon"
        >
          Avery Romain
        </button>

        {/* Phone: the strip takes its own row so five tabs stay readable. */}
        <div
          role="tablist"
          aria-label="Sections"
          onKeyDown={onKeyDown}
          className="order-3 -mx-6 mt-2 flex w-[calc(100%+3rem)] min-w-0 items-center overflow-x-auto [scrollbar-width:none] border-t border-line px-4 sm:order-2 sm:mx-0 sm:mt-0 sm:w-auto sm:border-0 sm:px-0"
        >
            {TABS.map((tab) => {
              const current = tab.id === active;
              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[tab.id] = node;
                  }}
                  id={`tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={current}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={current ? 0 : -1}
                  onClick={() => onSelect(tab.id)}
                  className={`type-label shrink-0 cursor-pointer whitespace-nowrap border-b-2 px-3 py-3 text-center text-[10px] transition-colors duration-200 sm:px-2 sm:py-2 sm:text-[11px] ${
                    current
                      ? "border-bone text-bone"
                      : "border-transparent text-bone-soft hover:text-bone"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
        </div>

        <Magnetic className="order-2 shrink-0 sm:order-3">
          <button
            onClick={() => setOpen(true)}
            className="type-label pressable cursor-pointer bg-bone px-4 py-2.5 text-[11px] text-stage hover:bg-maroon"
          >
            Resume
          </button>
        </Magnetic>
      </nav>
    </header>
  );
}
