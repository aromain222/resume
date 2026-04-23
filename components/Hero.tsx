"use client";

import { motion } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

function AbstractElements() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── 1. Dot matrix — bottom-right ── */}
      {/* 5 × 4 grid of circles; drifts upward very slowly */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.4 }}
        className="absolute bottom-20 right-10 lg:right-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="110" height="88" viewBox="0 0 110 88" fill="none">
            {Array.from({ length: 4 }, (_, row) =>
              Array.from({ length: 5 }, (_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={col * 22 + 11}
                  cy={row * 22 + 11}
                  r="1.5"
                  fill="white"
                  fillOpacity={0.22 - row * 0.04}
                />
              ))
            )}
          </svg>
        </motion.div>
      </motion.div>

      {/* ── 2. Axis bracket — top-right ── */}
      {/* L-shaped coordinate reference with tick marks; slow opacity breath */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.7 }}
        className="absolute top-24 right-8 lg:right-20 hidden md:block"
      >
        <motion.svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M72 1H1V72" stroke="white" strokeWidth="0.75" />
          <line x1="1" y1="22" x2="8" y2="22" stroke="white" strokeWidth="0.75" />
          <line x1="1" y1="44" x2="5" y2="44" stroke="white" strokeWidth="0.75" />
          <line x1="24" y1="72" x2="24" y2="65" stroke="white" strokeWidth="0.75" />
          <line x1="48" y1="72" x2="48" y2="68" stroke="white" strokeWidth="0.75" />
        </motion.svg>
      </motion.div>

      {/* ── 3. Data lines — right edge ── */}
      {/* Four horizontal lines of staggered widths; each breathes independently */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.0 }}
        className="absolute right-0 hidden lg:flex flex-col gap-[14px]"
        style={{ top: "42%" }}
      >
        {(
          [
            { w: 112, dur: 20, delay: 0 },
            { w: 80, dur: 25, delay: 3 },
            { w: 140, dur: 18, delay: 1.5 },
            { w: 56, dur: 23, delay: 5 },
          ] as const
        ).map((line, i) => (
          <motion.div
            key={i}
            animate={{ scaleX: [1, 0.55, 1], opacity: [0.13, 0.22, 0.13] }}
            transition={{
              duration: line.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: line.delay,
            }}
            style={{
              width: line.w,
              height: 1,
              background: "white",
              transformOrigin: "100% 50%",
            }}
          />
        ))}
      </motion.div>

      {/* ── 4. Crosshair — left, mid-height ── */}
      {/* Small target mark; drifts upward independently */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.3 }}
        className="absolute left-10 lg:left-20 hidden lg:block"
        style={{ top: "57%" }}
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          animate={{ y: [0, -10, 0], opacity: [0.16, 0.28, 0.16] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="10" cy="10" r="2.5" stroke="white" strokeWidth="0.75" />
          <line x1="10" y1="0" x2="10" y2="5.5" stroke="white" strokeWidth="0.75" />
          <line x1="10" y1="14.5" x2="10" y2="20" stroke="white" strokeWidth="0.75" />
          <line x1="0" y1="10" x2="5.5" y2="10" stroke="white" strokeWidth="0.75" />
          <line x1="14.5" y1="10" x2="20" y2="10" stroke="white" strokeWidth="0.75" />
        </motion.svg>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const { setOpen } = useResume();

  return (
    <section className="relative min-h-screen flex flex-col justify-center dot-grid overflow-hidden">
      {/* Gradient vignette over dot grid */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-transparent to-[#050507]/80" />

      {/* Thin accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Abstract structural elements */}
      <AbstractElements />

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
          Student athlete. Three products in production. Focused on the
          financial gap that hits hardest between 18 and 22 — and the AI
          tooling that closes it.
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
        <span className="text-xs tracking-[0.2em] uppercase text-zinc-700">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
