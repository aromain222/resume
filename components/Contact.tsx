"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      className="relative py-32 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          {/* Section label */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-zinc-100 tracking-tight leading-tight mb-6"
          >
            I build with people who have a real problem.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="text-base text-zinc-500 leading-relaxed mb-12"
          >
            If you&apos;re working on finance infrastructure, AI tooling, or
            sports intelligence — reach out. I&apos;m interested in the
            problem before the pitch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.3 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <a
              href="https://linkedin.com/in/avery-romain"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 bg-zinc-50 text-zinc-950 text-sm font-semibold tracking-wide hover:bg-accent transition-colors duration-200"
            >
              LinkedIn
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              >
                <path
                  d="M1 11L11 1M11 1H4M11 1v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="mailto:aromain22@amherst.edu"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-white/10 text-zinc-300 text-sm font-semibold tracking-wide hover:border-accent hover:text-accent transition-all duration-200"
            >
              Email
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              >
                <path
                  d="M1 11L11 1M11 1H4M11 1v7"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
