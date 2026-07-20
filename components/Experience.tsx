"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useResume } from "./ResumeContext";

const ease = [0.16, 1, 0.3, 1] as const;

type Stop = {
  period: string;
  company: string;
  role: string;
  detail: string;
  bullets?: string[];
};

const timeline: Stop[] = [
  {
    period: "2015",
    company: "Menlo School",
    role: "High school",
    detail: "Where I got serious about school, football, and what I wanted to build.",
  },
  {
    period: "2020",
    company: "Basketball camp",
    role: "Founder",
    detail: "Started a basketball camp — my first experience organizing something for other people.",
  },
  {
    period: "2024",
    company: "Clavius Wealth Management",
    role: "Summer analyst",
    detail: "First finance seat. A close look at how advisors think about clients, portfolios, and long-term goals.",
  },
  {
    period: "2025",
    company: "SoFi",
    role: "Fintech extern",
    detail: "1st place in SoFi's fintech product externship.",
    bullets: [
      "Selected from under 5% of applicants for SoFi's competitive externship focused on fintech product innovation",
      "Researched TAM, market trends, and Gen Z financial behavior to guide product design for a gamified literacy tool",
      "Delivered a winning pitch to SoFi executives, earning 1st Place for strategic insight and execution",
    ],
  },
  {
    period: "2025",
    company: "Caprae Capital",
    role: "Private equity intern",
    detail: "Lower-middle-market M&A.",
    bullets: [
      "Researched 50+ founder-owned firms and built acquisition pipelines",
      "Supported due diligence on $25M+ deals with models and investment materials",
      "Analyzed comparable transactions and screened acquisition targets",
    ],
  },
  {
    period: "2025",
    company: "CapitalBase",
    role: "Founder",
    detail: "Financial research and modeling tools.",
    bullets: [
      "Built a pipeline that combines SEC filings, earnings reports, and market data",
      "Built valuation and diligence workflows for DCF, LBO, comps, and M&A",
      "Added live news and sentiment to the research process",
      "Cut modeling time from hours to minutes by running research in parallel and reusing fetched data",
    ],
  },
  {
    period: "2026",
    company: "Sankofa",
    role: "Co-founder · Lead engineer",
    detail: "Investment research and portfolio monitoring.",
    bullets: [
      "Built a 19-agent platform that researches investments and monitors a live portfolio",
      "Connected news, sentiment, quantitative, and fundamental research into one workflow",
      "Built a debate process that turns competing views into a documented buy, sell, or hold recommendation",
      "Added monitoring and Slack alerts when the evidence changes a thesis",
    ],
  },
  {
    period: "Now",
    company: "Murj",
    role: "AI implementation engineer",
    detail: "Making finance work less manual.",
    bullets: [
      "Built internal tools that take repetitive finance work off the team's plate",
      "Automated AR reporting and monthly rollover from Sage 50 data",
      "Worked with the finance team to map and automate the workflow end-to-end",
    ],
  },
];

function TimelineCard({ item, index }: { item: Stop; index: number }) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const expandable = !!item.bullets?.length;

  const card = (
    <div
      className={`mt-3 border border-line bg-stage-raised p-5 text-left transition-colors duration-200 lg:p-6 ${
        index % 2 === 0 ? "lg:ml-auto" : ""
      } lg:max-w-md ${expandable ? "cursor-pointer [@media(hover:hover)]:hover:border-purple-bright/60" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold tracking-[-0.01em] text-bone sm:text-xl">
            {item.company}
          </h3>
          <p className="type-label mt-1.5 text-[10px] text-bone-faint">{item.role}</p>
        </div>
        {expandable && (
          <motion.span
            aria-hidden
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={{ duration: 0.25, ease }}
            className="text-xl leading-none text-purple-bright"
          >
            +
          </motion.span>
        )}
      </div>
      <p className="mt-3 text-[14px] leading-[1.7] text-bone-soft">{item.detail}</p>

      {expandable && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="bullets"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <ul className="space-y-2 border-t border-line pt-4 mt-4">
                {item.bullets!.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[13.5px] leading-[1.6] text-bone-soft">
                    <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-purple-bright" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {expandable && (
        <p className="type-label mt-4 text-[9px] text-bone-faint">
          {expanded ? "Click to close" : "Click for details"}
        </p>
      )}
    </div>
  );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12%" }}
      transition={{ duration: 0.55, ease, delay: 0.05 }}
      className="relative grid grid-cols-[28px_1fr] gap-5 py-4 lg:grid-cols-[1fr_72px_1fr] lg:gap-6 lg:py-5"
    >
      <div
        className={`col-start-2 lg:row-start-1 ${
          index % 2 === 0 ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"
        }`}
      >
        <p className="type-label text-[11px] tabular-nums text-purple-bright">{item.period}</p>
        {expandable ? (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="block w-full cursor-pointer text-left"
          >
            {card}
          </button>
        ) : (
          card
        )}
      </div>
      <div className="col-start-1 row-start-1 flex justify-center pt-1 lg:col-start-2 lg:pt-9">
        <span className="relative z-10 h-3 w-3 rounded-full border-2 border-stage bg-purple-bright shadow-[0_0_12px_oklch(45%_0.16_302/0.4)]" />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { setOpen } = useResume();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.7"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="path" className="mx-auto max-w-[1600px] px-6 py-32 sm:px-10 lg:px-16 lg:py-44">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-8 lg:mb-24">
        <h2 className="type-display text-[clamp(2.75rem,7vw,6rem)] text-bone">
          The life chart
        </h2>
        <button
          onClick={() => setOpen(true)}
          className="stage-link type-label cursor-pointer text-[12px] text-bone"
        >
          Full resume
        </button>
      </div>

      <div ref={ref} className="relative mx-auto max-w-5xl">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-line lg:left-1/2 lg:-translate-x-1/2" />
        <motion.div
          aria-hidden
          style={{ scaleY: reduceMotion ? 1 : spineScale }}
          className="absolute bottom-0 left-3 top-0 w-px origin-top bg-purple-bright lg:left-1/2 lg:-translate-x-1/2"
        />

        {timeline.map((item, index) => (
          <TimelineCard key={`${item.company}-${item.role}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
