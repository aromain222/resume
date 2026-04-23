"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function InProgress() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-16 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="relative bg-[#0a0a0d] border border-white/[0.06] p-8 sm:p-10"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/50 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium">
                  In Progress
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-[-0.02em] mb-4">
                Natural Language → SQL Interface
              </h3>

              <p className="text-sm text-zinc-500 leading-[1.8] max-w-lg">
                Plain English to SQL. Not a chatbot — a structured query
                interface that gives non-technical users direct access to their
                data without writing a single line of code.
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-700 mb-3 font-medium">
                Stack
              </p>
              <div className="flex flex-wrap sm:flex-col gap-1.5 sm:items-end">
                {["TypeScript", "PostgreSQL", "OpenAI API", "Next.js"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="text-[11px] text-zinc-600 border border-white/[0.06] px-2 py-0.5 font-mono"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
