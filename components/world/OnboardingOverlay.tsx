"use client";

import { motion } from "framer-motion";
import { useTabNavigation } from "../TabNavigationContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function OnboardingOverlay({ onDismiss }: { onDismiss: () => void }) {
  const { goTo } = useTabNavigation();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease }}
        className="relative w-full max-w-md border border-line bg-stage-raised p-8 shadow-xl"
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-maroon" />
        <p className="type-label text-[10px] text-maroon">Welcome to Avery&rsquo;s world</p>
        <h2 className="type-display mt-3 text-[clamp(1.6rem,4vw,2.1rem)] text-bone">
          Explore the systems I&rsquo;ve built
        </h2>
        <p className="mt-3 text-[14px] leading-[1.6] text-bone-soft">
          Across AI, finance, and deployment — walk the plaza and visit each one.
        </p>

        <div className="mt-6 space-y-2 border-t border-line pt-5 text-[13px] text-bone-soft">
          <p><kbd className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px]">WASD</kbd> / <kbd className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px]">Arrows</kbd> to move</p>
          <p><kbd className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px]">E</kbd> or click to interact</p>
          <p><kbd className="rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px]">M</kbd> to open the map</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onDismiss}
            className="type-label pressable cursor-pointer bg-bone px-6 py-3 text-[11px] text-stage hover:bg-maroon"
          >
            Enter world
          </button>
          <button
            onClick={() => goTo("home")}
            className="stage-link type-label cursor-pointer text-[11px] text-bone"
          >
            View portfolio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
