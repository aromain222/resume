"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const focuses = [
  {
    label: "18–22 Cohort",
    body: "Building financial tools for the generation closest to major financial decisions that has historically had the least access to guidance. The gap between what they need and what exists is the opportunity.",
  },
  {
    label: "AI-Native Finance",
    body: "Not AI as a feature bolted onto existing products — AI as the primary interface layer that removes friction from complex processes. The financial products built natively around this will replace everything else.",
  },
  {
    label: "Legibility",
    body: "The goal of every tool I build is the same: reduce the cognitive load required to make a good decision. Complexity is a design failure. Simplicity is earned.",
  },
];

function FocusItem({
  focus,
  index,
}: {
  focus: (typeof focuses)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
    >
      <p className="text-xs tracking-[0.2em] uppercase text-accent font-medium mb-4">
        {focus.label}
      </p>
      <p className="text-sm text-zinc-500 leading-[1.85]">{focus.body}</p>
    </motion.div>
  );
}

export default function Focused() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 border-t border-white/5 line-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050507] via-transparent to-[#050507]" />

      <div className="relative max-w-6xl mx-auto px-6">
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
            What I&apos;m Focused On
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {focuses.map((focus, i) => (
            <FocusItem key={focus.label} focus={focus} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
