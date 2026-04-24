"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-28 lg:py-36 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-5 h-px bg-accent" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium">
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-zinc-100 tracking-[-0.025em] leading-[1.1] mb-10"
          >
            Football, fitness, gaming, and everything in between.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <a
              href="https://linkedin.com/in/avery-romain"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-[0.06em] uppercase hover:bg-accent transition-colors duration-200"
            >
              LinkedIn
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <path
                  d="M1 9L9 1M9 1H3.5M9 1v5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="mailto:averyromain5@gmail.com"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-white/[0.1] text-zinc-400 text-xs font-semibold tracking-[0.06em] uppercase hover:border-accent/60 hover:text-accent transition-all duration-200"
            >
              Email
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path
                  d="M1 9L9 1M9 1H3.5M9 1v5.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
