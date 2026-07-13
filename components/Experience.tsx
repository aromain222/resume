"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

const roles = [
  {
    period: "2026 — Now",
    company: "Murj",
    role: "AI Implementation Engineer",
    detail: "Cleaning up finance workflows and building tools the team can use every day.",
  },
  {
    period: "2026 — Now",
    company: "Sankofa",
    role: "Co-Founder · Lead Engineer",
    detail: "Building an investment research and portfolio monitoring product with a small team.",
  },
  {
    period: "2025 — 2026",
    company: "CapitalBase",
    role: "Founder",
    detail: "Built tools for financial research, valuation, and diligence.",
  },
  {
    period: "Summer 2025",
    company: "Caprae Capital",
    role: "Private Equity Intern",
    detail: "Worked on sourcing, diligence, and valuation for lower-middle-market deals.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const { setOpen } = useResume();

  return (
    <section ref={ref} id="experience" className="border-t border-black/[0.08] bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="mb-14 grid gap-7 md:grid-cols-[0.8fr_0.4fr] md:items-end lg:mb-16"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#756d65]">
              <span className="h-px w-8 bg-accent" />
              Experience
            </p>
            <h2 className="text-5xl font-black tracking-[-0.055em] text-[#0a0a0a] sm:text-6xl lg:text-7xl">
              What I’ve been up to.
            </h2>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex w-fit cursor-pointer items-center gap-4 bg-[#0a0a0a] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent md:justify-self-end"
          >
            Open full résumé
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>

        <div>
          {roles.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, ease, delay: 0.12 + index * 0.08 }}
              className="group grid gap-3 border-t border-black/[0.13] py-7 sm:grid-cols-[140px_0.75fr_1fr] sm:gap-8 lg:py-9"
            >
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#9a9086]">
                {item.period}
              </span>
              <div>
                <h3 className="text-2xl font-black tracking-[-0.035em] text-[#0a0a0a] transition-colors group-hover:text-accent">
                  {item.company}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#4f4943]">{item.role}</p>
              </div>
              <p className="max-w-xl text-sm leading-[1.75] text-[#756d65]">{item.detail}</p>
            </motion.div>
          ))}
          <div className="border-t border-black/[0.13]" />
        </div>
      </div>
    </section>
  );
}
