"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function InProgress() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-black/[0.07] py-10 lg:py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="relative bg-white border border-black/[0.08] p-8 sm:p-10 overflow-hidden"
        >
          {/* Single accent top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-bold">
                  Currently Building
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0a0a0a] tracking-[-0.02em] mb-3">
                Natural Language → SQL Interface
              </h3>

              <p className="text-sm text-[#5a5450] leading-[1.8] max-w-lg">
                Plain English to SQL. Ask a question and get an answer from your
                own data without
                writing a single line of code.
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#b0a898] mb-3 font-semibold">
                Stack
              </p>
              <div className="flex flex-wrap sm:flex-col gap-1.5 sm:items-end">
                {["TypeScript", "PostgreSQL", "OpenAI API", "Next.js"].map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono font-medium px-2.5 py-1 border border-black/[0.1] text-[#5a5450] bg-[#f4f7fb]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
