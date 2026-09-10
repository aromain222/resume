"use client";

/** Shared chrome for the three world panels (project / experience / plaza).
    Same backdrop + card language as ResumeModal.tsx — dark scrim, light card,
    maroon accent line — just docked to the side instead of centered, so it
    reads as an in-world panel rather than a full takeover. */

import { motion } from "framer-motion";
import { useEffect } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PanelShell({
  eyebrow,
  onClose,
  children,
}: {
  eyebrow: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  /* The panel owns its own Escape handling so it closes on mobile too, where
     there is no canvas listening for keys. */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
      />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease }}
          className="relative flex w-full flex-col overflow-y-auto border border-line bg-stage-raised shadow-xl"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-maroon" />
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-stage-raised/95 px-6 py-4 backdrop-blur-sm">
            <span className="type-label text-[10px] text-bone-faint">{eyebrow}</span>
            <button
              onClick={onClose}
              aria-label="Close"
              className="cursor-pointer p-1 text-bone-faint transition-colors duration-200 hover:text-bone"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-8 sm:px-8">{children}</div>
        </motion.div>
      </div>
    </>
  );
}
