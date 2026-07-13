"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const facts = [
  "I’m a quarter-zip enthusiast.",
  "I’m probably LeBron’s biggest fan.",
  "I’m top 1,000 in the world in CFB26.",
  "I'm developing my watch game.",
  "I'm a sucker for a good view or a long hike.",
  "My best dishes are curry chicken, jerk chicken, and steak.",
  "I was born in D.C. and grew up in the Bay Area.",
];

const interests = ["Football", "Lifting", "Cooking", "R&B", "Jazz", "Gaming", "Legos"];

export default function FunFacts() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  function nextFact() {
    setActive((current) => (current + 1) % facts.length);
  }

  return (
    <section ref={ref} className="overflow-hidden bg-accent text-[#160b06]">
      <div className="mx-auto max-w-[1320px] px-6 py-16 sm:px-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="grid gap-12 lg:grid-cols-[0.34fr_1fr] lg:items-end"
        >
          <div>
            <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black/55">
              Not on the résumé
            </p>
            <button
              onClick={nextFact}
              className="group inline-flex cursor-pointer items-center gap-3 border-b border-black/35 pb-1 text-[11px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-black"
            >
              Another one
              <motion.span
                key={active}
                initial={reduceMotion ? undefined : { rotate: -90 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.35, ease }}
                className="text-base transition-transform group-hover:rotate-45"
              >
                ↻
              </motion.span>
            </button>
          </div>

          <div className="relative min-h-[180px] sm:min-h-[220px]">
            <span className="absolute -left-3 -top-12 select-none font-mono text-[7rem] font-black leading-none text-black/[0.08] sm:text-[10rem]">
              {(active + 1).toString().padStart(2, "0")}
            </span>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 38, rotate: 1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24, rotate: -1 }}
                transition={{ duration: 0.48, ease }}
                className="text-balance relative z-10 max-w-5xl text-[clamp(2.8rem,7vw,7rem)] font-black leading-[0.92] tracking-[-0.065em]"
              >
                {facts[active]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/25 pt-5">
          {interests.map((interest) => (
            <span key={interest} className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black/55">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
