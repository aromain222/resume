"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} id="contact" className="bg-[#f9f7f4] py-24 lg:py-36">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease }}
        className="mx-auto max-w-[1320px] px-6 sm:px-10"
      >
        <p className="mb-8 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#756d65]">
          <span className="h-px w-8 bg-accent" />
          Say hello
        </p>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <h2 className="text-balance max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.88] tracking-[-0.065em] text-[#0a0a0a]">
            Want to work together?
          </h2>
          <div className="flex items-center gap-5 pb-2">
            <a
              href="mailto:averyromain5@gmail.com"
              className="group inline-flex items-center gap-4 bg-[#0a0a0a] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent"
            >
              Email me
              <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
            <a
              href="https://linkedin.com/in/avery-romain"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-black/25 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f5851] transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
