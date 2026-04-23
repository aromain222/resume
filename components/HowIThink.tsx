"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    number: "01",
    title: "Discipline",
    body: "Football doesn't run on potential. It runs on reps, under pressure, with consequences. I build the same way — show up, ship, correct. No perfect conditions. No excuses.",
    tag: "Football",
  },
  {
    number: "02",
    title: "Systems Thinking",
    body: "Finance and product are the same problem: a system with inputs, outputs, and failure modes you need to understand before you touch any of it. I map the whole thing first. Code comes after.",
    tag: "Finance · Product",
  },
  {
    number: "03",
    title: "Execution",
    body: "The only metric that matters: does it work when someone actually depends on it? Not in a demo. Not in review. In production, with a real user. That's the bar.",
    tag: "Building",
  },
];

function Pillar({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      className="group relative border-t border-white/6 pt-8 pb-6"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-xs font-mono text-zinc-700 tracking-widest">
          {pillar.number}
        </span>
        <span className="text-xs tracking-wider uppercase text-zinc-700 font-medium">
          {pillar.tag}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-zinc-100 mb-4 tracking-tight">
        {pillar.title}
      </h3>
      <p className="text-sm text-zinc-500 leading-[1.8]">{pillar.body}</p>
    </motion.div>
  );
}

export default function HowIThink() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="thinking" className="relative py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-6 h-px bg-accent" />
          <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
            How I Think
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-12">
          {pillars.map((pillar, i) => (
            <Pillar key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
