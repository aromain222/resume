"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const focuses = [
  {
    label: "Money early on",
    body: "A lot of people make their first serious money decisions in college without much help. I’m interested in tools that make those decisions easier to understand.",
  },
  {
    label: "Practical AI",
    body: "I’m most interested in AI when it removes busywork and makes a complicated task easier to finish—not when it is added just to sound impressive.",
  },
  {
    label: "Make it clear",
    body: "My test is simple: can someone understand what to do next? If not, I probably made the product too complicated.",
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
    >
      <p className="text-[10px] tracking-[0.22em] uppercase text-accent font-medium mb-4">
        {focus.label}
      </p>
      <p className="text-sm text-zinc-500 leading-[1.82]">{focus.body}</p>
    </motion.div>
  );
}

export default function Focused() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 lg:py-36 border-t border-white/[0.06]">
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
