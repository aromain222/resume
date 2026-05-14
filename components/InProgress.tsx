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
          className="relative bg-white border border-black/[0.08] p-8 sm:p-10 rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Gradient accent top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-purple to-accent-green rounded-t-2xl" />

          {/* Subtle background blob */}
          <div
            className="absolute -top-10 -right-10 w-48 h-48 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgb(59 130 246 / 0.06) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] tracking-[0.22em] uppercase text-emerald-600 font-bold">
                  Currently Building
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] tracking-[-0.02em] mb-3">
                Natural Language → SQL Interface
              </h3>

              <p className="text-sm text-[#4b5563] leading-[1.8] max-w-lg">
                Plain English to SQL. Not a chatbot. A structured query interface
                that gives non-technical users direct access to their data without
                writing a single line of code.
              </p>
            </div>

            <div className="sm:text-right shrink-0">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#9ca3af] mb-3 font-semibold">
                Stack
              </p>
              <div className="flex flex-wrap sm:flex-col gap-1.5 sm:items-end">
                {[
                  { label: "TypeScript", color: "bg-blue-50 text-blue-600 border-blue-100" },
                  { label: "PostgreSQL", color: "bg-sky-50 text-sky-600 border-sky-100" },
                  { label: "OpenAI API", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                  { label: "Next.js", color: "bg-gray-50 text-gray-700 border-gray-200" },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg border ${color}`}
                  >
                    {label}
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
