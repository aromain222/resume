"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-28 lg:py-36 border-t border-black/[0.07]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="w-6 h-[2px] bg-accent rounded-full" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#7a7068] font-semibold">
              Contact
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black text-[#0a0a0a] tracking-[-0.025em] leading-[1.1] mb-10"
          >
            Football, fitness, gaming, and everything in between.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.26 }}
            className="flex items-center gap-3 flex-wrap"
          >
            <Magnetic>
              <a
                href="https://linkedin.com/in/avery-romain"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0a0a0a] text-white text-xs font-bold tracking-[0.06em] uppercase hover:bg-accent transition-colors duration-200 cursor-pointer"
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="mailto:averyromain5@gmail.com"
                className="group inline-flex items-center gap-3 px-6 py-3 border border-black/20 text-[#5a5450] text-xs font-bold tracking-[0.06em] uppercase hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
