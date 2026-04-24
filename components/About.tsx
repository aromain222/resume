"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = [
  "Bay Area",
  "Financial Literacy",
  "Football",
  "Fitness",
  "Pro Black",
  "Basketball",
  "Baseball",
  "Pickleball",
  "R&B",
  "Jazz",
  "Builder",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-white/[0.06] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-px bg-accent" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium">
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-[15px] text-zinc-300 leading-[1.8]">
              Grew up in the Bay Area. Been obsessed with sports and figuring
              out how things work for as long as I can remember. That curiosity
              is what pushed me into building products.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              Financial literacy is something I genuinely care about. A lot of
              people, especially young people, are out here making real money
              decisions without the tools or context they need. That&apos;s the
              gap I&apos;m trying to close.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              I&apos;m passionate about pro Black activism. The intersection of
              technology, ownership, and financial education is one of the most
              important places anyone can be building right now.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              Outside of building I&apos;m usually watching film, in the gym,
              at a basketball court, or catching a baseball game. Big fan of all
              sports. Pickleball has been climbing the list. R&B and jazz always
              on.
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="flex flex-wrap gap-2 content-start"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.04 }}
                className="text-[10px] tracking-[0.18em] uppercase text-zinc-500 border border-white/[0.08] px-3 py-1.5 font-medium hover:border-accent/40 hover:text-accent transition-colors duration-200"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
