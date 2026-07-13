"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

const timeline = [
  {
    period: "2015 — Before Amherst",
    company: "Menlo School",
    role: "High school",
    detail: "Where I started getting serious about school, football, and what I wanted to build.",
  },
  {
    period: "2020",
    company: "Basketball camp",
    role: "Founder",
    detail: "Started a basketball camp and got my first experience organizing something for other people.",
  },
  {
    period: "Summer 2024",
    company: "Clavius Wealth Management",
    role: "Summer analyst",
    detail: "My first experience in finance. I got a close look at how advisors think about clients, portfolios, and long-term goals.",
  },
  {
    period: "June 2025",
    company: "SoFi",
    role: "Fintech Extern",
    detail: "Researched Gen Z financial habits and helped pitch a financial-literacy product to SoFi executives.",
  },
  {
    period: "Summer 2025",
    company: "Caprae Capital",
    role: "Private Equity Intern",
    detail: "Worked on sourcing, diligence, and valuation for lower-middle-market deals.",
  },
  {
    period: "Aug 2025 — May 2026",
    company: "CapitalBase",
    role: "Founder",
    detail: "Built tools for financial research, valuation, and diligence.",
  },
  {
    period: "May 2026 — Now",
    company: "Sankofa",
    role: "Co-Founder · Lead Engineer",
    detail: "Building an investment research and portfolio monitoring product with a small team.",
  },
  {
    period: "June 2026 — Now",
    company: "Murj",
    role: "AI Implementation Engineer",
    detail: "Cleaning up finance workflows and building tools the team can use every day.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const { setOpen } = useResume();

  return (
    <section ref={ref} id="experience" className="border-t border-black/[0.08] bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="mb-10 grid gap-7 md:grid-cols-[0.8fr_0.4fr] md:items-end lg:mb-12"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#756d65]">
              <span className="h-px w-8 bg-accent" />
              The path so far
            </p>
            <h2 className="text-5xl font-black tracking-[-0.055em] text-[#0a0a0a] sm:text-6xl lg:text-5xl">
              From Menlo to now.
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

        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-black/[0.14] lg:left-1/2 lg:-translate-x-1/2" />
          {timeline.map((item, index) => (
            <motion.div
              key={`${item.company}-${item.role}`}
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-12% 0px -12%" }}
              transition={{ duration: 0.55, ease, delay: index * 0.04 }}
              className="group relative grid grid-cols-[28px_1fr] gap-5 py-3 lg:grid-cols-[1fr_64px_1fr] lg:gap-7 lg:py-4"
            >
              <div className={`col-start-2 lg:row-start-1 ${index % 2 === 0 ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"}`}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">{item.period}</p>
                <div className="mt-2 border border-black/[0.1] bg-[#f4f7fb] p-4 transition-colors group-hover:border-accent/50">
                  <h3 className="text-lg font-black tracking-[-0.035em] text-[#0a0a0a] transition-colors group-hover:text-accent sm:text-lg">
                    {item.company}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#4f4943]">{item.role}</p>
                  <p className={`mt-3 text-sm leading-[1.7] text-[#756d65] ${index % 2 === 0 ? "lg:ml-auto lg:max-w-sm" : "lg:max-w-sm"}`}>{item.detail}</p>
                </div>
              </div>
              <div className="col-start-1 row-start-1 flex justify-center pt-1 lg:col-start-2 lg:pt-7">
                <span className="relative z-10 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-accent shadow-[0_0_0_1px_rgba(66,103,213,0.35)]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
