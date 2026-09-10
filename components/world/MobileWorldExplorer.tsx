"use client";

/** Mobile stand-in for the WASD canvas: no game controls, just every location
    as a tappable card, grouped the same way the desktop map groups them.
    Full content parity — nothing here is missing versus the desktop world. */

import { useState } from "react";
import { buildWorld, groupLocations, type WorldLocation } from "@/lib/worldConfig";
import { useLocationAction } from "./useLocationAction";
import WorldPanels from "./WorldPanels";
import SectionHeading from "../SectionHeading";

export default function MobileWorldExplorer() {
  const [locations] = useState(() => buildWorld());
  const [openLocation, setOpenLocation] = useState<WorldLocation | null>(null);
  const runAction = useLocationAction(setOpenLocation);

  const groups = groupLocations(locations);

  return (
    <section className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10">
      <SectionHeading>Explore the world</SectionHeading>
      <p className="mt-4 max-w-[46ch] text-[14px] leading-[1.6] text-bone-soft">
        The full interactive map is a desktop experience. Here&rsquo;s every
        location — tap one to open it.
      </p>

      <div className="mt-10 space-y-10">
        {groups.map(([group, items]) => (
          <div key={group}>
            <p className="type-label mb-4 text-[10px] text-maroon">{group}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {items.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => runAction(loc)}
                  className="group flex items-center justify-between gap-3 border border-line bg-stage-raised px-4 py-4 text-left transition-colors duration-200 hover:border-maroon"
                >
                  <span>
                    <span className="block text-[15px] font-semibold text-bone">{loc.label}</span>
                    {loc.lit && (
                      <span className="type-label mt-1 block text-[9px] text-maroon">Active</span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className="text-lg text-bone-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-maroon"
                  >
                    &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <WorldPanels location={openLocation} onClose={() => setOpenLocation(null)} />
    </section>
  );
}
