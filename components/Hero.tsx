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
      {/* Dot matrix — bottom-right, slow vertical drift */}
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
                  fillOpacity={0.2 - row * 0.04}
                />
              ))
            )}
          </svg>
        </motion.div>
      </motion.div>

      {/* Axis bracket — top-right, slow opacity breath */}
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
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M72 1H1V72" stroke="white" strokeWidth="0.75" />
          <line x1="1" y1="22" x2="8" y2="22" stroke="white" strokeWidth="0.75" />
          <line x1="1" y1="44" x2="5" y2="44" stroke="white" strokeWidth="0.75" />
          <line x1="24" y1="72" x2="24" y2="65" stroke="white" strokeWidth="0.75" />
          <line x1="48" y1="72" x2="48" y2="68" stroke="white" strokeWidth="0.75" />
        </motion.svg>
      </motion.div>

      {/* Data lines — right edge, staggered scaleX breath */}
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
            animate={{ scaleX: [1, 0.55, 1], opacity: [0.12, 0.2, 0.12] }}
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

      {/* Crosshair — mid-left, slow vertical float */}
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
          animate={{ y: [0, -10, 0], opacity: [0.15, 0.26, 0.15] }}
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/60 via-transparent to-[#050507]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/80 via-transparent to-[#050507]/80" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <AbstractElements />

      <div className="relative max-w-6xl mx-auto px-6 pt-36 pb-28">
        {/* Identity label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-14"
        >
          <div className="w-5 h-px bg-accent" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-500 font-medium">
            Avery Romain
          </span>
        </motion.div>

        {/* Single semantic h1 with two motion spans */}
        <h1 className="mb-14">
          <div className="overflow-hidden mb-4">
            <motion.span
              initial={{ opacity: 0, y: 52 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.08 }}
              className="block text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px] font-black leading-[0.92] tracking-[-0.03em] text-zinc-50"
            >
              Finance is a system.
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 52 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease, delay: 0.18 }}
              className="block text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[96px] font-black leading-[0.92] tracking-[-0.03em] text-zinc-600"
            >
              I build the interface.
            </motion.span>
          </div>
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.32 }}
          className="max-w-md text-[15px] sm:text-base text-zinc-400 leading-[1.75] mb-9"
        >
          Student athlete. Three products in production. Focused on the
          financial gap that hits hardest between 18 and 22 — and the AI
          tooling that closes it.
        </motion.p>

        {/* Identity line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.42 }}
          className="flex items-center gap-2.5 mb-12 flex-wrap"
        >
          {["Amherst", "Football", "Fintech", "Financial Literacy"].map(
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
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.52 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <a
            href="#building"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-[0.06em] uppercase hover:bg-accent transition-colors duration-200"
          >
            View Work
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                d="M1 6h10M7 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-white/[0.1] text-zinc-400 text-xs font-semibold tracking-[0.06em] uppercase hover:border-accent/60 hover:text-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="absolute bottom-10 left-6 flex items-center gap-3"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/12" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-700">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
