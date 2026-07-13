"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    number: "01",
    title: "Discipline",
    body: "Football has taught me to be consistent. I bring that same habit to building: make a first version, see what breaks, and keep improving it.",
    tag: "Football",
  },
  {
    number: "02",
    title: "Start with the problem",
    body: "I like understanding how a process works before I automate it. The best solutions usually come from asking better questions first.",
    tag: "Finance · Product",
  },
  {
    number: "03",
    title: "Execution",
    body: "A project is not finished because the demo looks good. I care about whether someone can use it without me standing next to them.",
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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      className="border-t border-white/[0.06] pt-8 pb-10 md:pb-6"
    >
      <div className="flex items-start justify-between mb-7">
        <span className="text-[10px] font-mono text-zinc-700 tracking-[0.2em]">
          {pillar.number}
        </span>
        <span className="text-[10px] tracking-[0.15em] uppercase text-zinc-700 font-medium">
          {pillar.tag}
        </span>
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-4 tracking-[-0.02em]">
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
    <section id="thinking" className="relative py-28 lg:py-36 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-5 h-px bg-accent" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium">
            How I Think
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-16">
          {pillars.map((pillar, i) => (
            <Pillar key={pillar.number} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
