"use client";

import { motion } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { setOpen } = useResume();

  return (
    <section className="max-w-6xl mx-auto px-6 pt-36 pb-14">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium mb-5">
          Avery Romain
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-[-0.025em] leading-snug mb-3 max-w-lg">
          Building financial tools, AI systems, and sports intelligence platforms.
        </h1>
        <div className="flex items-center gap-2.5 mb-8 flex-wrap">
          {["Football", "Fitness", "Coding", "Networking", "Sports", "Gaming"].map(
            (item, i, arr) => (
              <span key={item} className="flex items-center gap-2.5">
                <span className="text-[10px] tracking-[0.18em] uppercase text-zinc-600 font-medium">
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <span className="text-zinc-800 text-xs">·</span>
                )}
              </span>
            )
          )}
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-white/[0.1] text-zinc-400 hover:border-accent/60 hover:text-accent transition-all duration-200 cursor-pointer"
        >
          Resume
        </button>
      </motion.div>
    </section>
  );
}
