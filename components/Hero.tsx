"use client";

import { motion } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const { setOpen } = useResume();

  return (
    <section className="relative min-h-screen flex flex-col justify-center dot-grid overflow-hidden">
      {/* Gradient vignette over dot grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-transparent to-[#050507]/80" />

      {/* Thin accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Identity label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-6 h-px bg-accent" />
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-medium">
            Avery Romain
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-zinc-50"
          >
            Finance is a system.
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-zinc-600"
          >
            I build the interface.
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed mb-10"
        >
          Product builder at the intersection of fintech, AI, and sports
          intelligence. Focused on tools that make complex systems legible for
          the people who need them most.
        </motion.p>

        {/* Identity line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.45 }}
          className="flex items-center gap-3 mb-12 text-xs tracking-[0.15em] uppercase text-zinc-600 font-medium"
        >
          <span>Amherst</span>
          <span className="text-zinc-800">·</span>
          <span>Football</span>
          <span className="text-zinc-800">·</span>
          <span>Fintech</span>
          <span className="text-zinc-800">·</span>
          <span>Financial Literacy</span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.55 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <a
            href="#building"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-zinc-50 text-zinc-950 text-sm font-semibold tracking-wide hover:bg-accent transition-colors duration-200"
          >
            View Work
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M1 7h12M8 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-white/10 text-zinc-300 text-sm font-semibold tracking-wide hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-10 left-6 flex items-center gap-3"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/15" />
        <span className="text-xs tracking-[0.2em] uppercase text-zinc-700 rotate-0">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
