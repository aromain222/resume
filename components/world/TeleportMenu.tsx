"use client";

import { motion } from "framer-motion";
import { groupLocations, type WorldLocation } from "@/lib/worldConfig";

const ease = [0.22, 1, 0.36, 1] as const;

export default function TeleportMenu({
  locations,
  onSelect,
  onClose,
}: {
  locations: WorldLocation[];
  onSelect: (location: WorldLocation) => void;
  onClose: () => void;
}) {
  const groups = groupLocations(locations);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.25, ease }}
          className="relative w-full max-w-lg border border-line bg-stage-raised p-6 shadow-xl sm:p-8"
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="type-label text-[10px] text-bone-faint">Map · teleport</span>
            <button
              onClick={onClose}
              aria-label="Close map"
              className="cursor-pointer p-1 text-bone-faint transition-colors duration-200 hover:text-bone"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="max-h-[60vh] space-y-6 overflow-y-auto">
            {groups.map(([group, items]) => (
              <div key={group}>
                <p className="type-label mb-3 text-[10px] text-maroon">{group}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {items.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => onSelect(loc)}
                      className="type-label cursor-pointer border border-line px-3 py-2.5 text-left text-[11px] text-bone transition-colors duration-200 hover:border-maroon hover:text-maroon"
                    >
                      {loc.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
