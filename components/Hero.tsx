"use client";

import { motion } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { setOpen } = useResume();

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-36 pb-14 overflow-hidden">
      {/* Subtle radial glow behind headline */}
      <div
        className="absolute -top-20 -left-10 w-[480px] h-[360px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgb(200 169 126 / 0.07) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        className="relative"
      >
        {/* Name label with accent line */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-5"
        >
          <div className="w-5 h-px bg-accent" />
          <p className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-medium">
            Avery Romain
          </p>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-black text-zinc-100 tracking-[-0.03em] leading-[1.1] mb-4 max-w-lg">
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

        <div className="flex items-center gap-3">
          <a
            href="#building"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-[0.06em] uppercase hover:bg-accent transition-colors duration-200"
          >
            View Work
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 border border-white/[0.1] text-zinc-400 hover:border-accent/60 hover:text-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </div>
      </motion.div>
    </section>
  );
}
