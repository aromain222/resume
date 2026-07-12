"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

const experience = [
  {
    title: "Murj",
    role: "AI Implementation Engineer",
    period: "June 2026 – Present",
    summary: "Finance workflow automation.",
    bullets: [
      "Built internal automations that replace manual finance workflows",
      "Automated AR reporting and monthly rollover from Sage 50 data",
      "Worked with the finance team to map and automate the workflow end-to-end",
    ],
  },
  {
    title: "Sankofa",
    role: "Co-Founder · Lead Engineer",
    period: "May 2026 – Present",
    summary: "Multi-agent investment research and portfolio monitoring.",
    bullets: [
      "Built a 19-agent platform for autonomous investment research and real-time portfolio monitoring",
      "Engineered analyst agents for news, sentiment, quant, and fundamentals",
      "Orchestrated manager-persona agents that debate signals into buy, sell, or hold verdicts",
      "Built monitoring and Slack alerts for material thesis changes",
    ],
  },
  {
    title: "CapitalBase",
    role: "Founder",
    period: "Aug 2025 – May 2026",
    summary: "Agent-based financial research and modeling.",
    bullets: [
      "Built a multi-agent pipeline for SEC filings, earnings reports, and market data",
      "Built valuation and diligence workflows for DCF, LBO, comps, and M&A",
      "Integrated live news and sentiment signals into financial analysis",
      "Cut modeling time from hours to minutes with parallel agents and cached data",
    ],
  },
  {
    title: "Caprae Capital",
    role: "Private Equity Intern",
    period: "June 2025 – Aug 2025",
    summary: "Lower-middle-market M&A.",
    bullets: [
      "Researched 50+ founder-owned firms and built acquisition pipelines",
      "Supported due diligence on $25M+ deals with models and investment materials",
      "Analyzed comparable transactions and screened acquisition targets",
    ],
  },
  {
    title: "SoFi Sophomore Externship",
    role: "Fintech Extern",
    period: "June 2025",
    summary: "1st Place — fintech product design.",
    bullets: [
      "Selected from under 5% of applicants for SoFi's competitive externship focused on fintech product innovation",
      "Researched TAM, market trends, and Gen Z financial behavior to guide product design for a gamified literacy tool",
      "Delivered a winning pitch to SoFi executives, earning 1st Place for strategic insight and execution",
    ],
  },
];

const skills = [
  {
    label: "Technical",
    items: "Python · JavaScript · Next.js · React · Tailwind · SQL · Supabase · API Integration · Git · Prompt Engineering · Figma",
  },
  {
    label: "Finance",
    items: "Multi-agent systems · AI coordination · Algorithmic trading · Quantitative finance · Risk modeling · Market analysis",
  },
  {
    label: "Business",
    items: "CRM · Sales · Lead Research · Outreach · Product Positioning · Pipeline Building · Strategic Execution · AI Agents",
  },
];

export default function ResumeModal() {
  const { open, setOpen } = useResume();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-black/[0.08] overflow-y-auto pointer-events-auto shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" />

              {/* Sticky header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-white/95 backdrop-blur-sm border-b border-black/[0.07]">
                <span className="text-[11px] tracking-[0.22em] uppercase text-[#7a7068] font-semibold">
                  Resume
                </span>
                <div className="flex items-center gap-5">
                  <a
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[#7a7068] hover:text-accent transition-colors duration-200 font-medium"
                  >
                    Full Resume
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover:translate-y-0.5 transition-transform duration-200">
                      <path d="M5 1v5.5M2.5 4.5L5 7l2.5-2.5M1 9h8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-[#b0a898] hover:text-[#0a0a0a] transition-colors duration-200 cursor-pointer p-1"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-10 space-y-12">

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.15 }}
                >
                  <h1 className="text-4xl sm:text-5xl font-black text-[#0a0a0a] tracking-tight mb-3">
                    Avery Romain
                  </h1>
                  <p className="text-base text-accent font-semibold mb-5">
                    Student-athlete building software across finance, data, and college sports.
                  </p>
                  <p className="text-xs text-[#7a7068] mb-3 tracking-wide">
                    Amherst College · Class of 2027 · Political Science & Black Studies
                  </p>
                  <div className="flex items-center gap-4 text-xs text-[#7a7068] flex-wrap">
                    <a href="mailto:averyromain5@gmail.com" className="hover:text-accent transition-colors duration-200">
                      averyromain5@gmail.com
                    </a>
                    <span className="text-[#d6d0c8]">·</span>
                    <span>(650) 430-9759</span>
                    <span className="text-[#d6d0c8]">·</span>
                    <a href="https://linkedin.com/in/avery-romain" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-200">
                      linkedin.com/in/avery-romain
                    </a>
                  </div>
                </motion.div>

                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.2 }}
                >
                  <SectionLabel>Education</SectionLabel>
                  <div className="flex items-start justify-between gap-6 flex-wrap">
                    <div>
                      <h3 className="text-sm font-bold text-[#0a0a0a] mb-1">Amherst College</h3>
                      <p className="text-xs text-[#7a7068] mb-3">B.A. Political Science & Black Studies · Expected May 2027</p>
                      <ul className="space-y-1.5">
                        <BulletPoint>Division III Football — Student Athlete</BulletPoint>
                        <BulletPoint>Alumni Outreach · Amherst Black Business Club</BulletPoint>
                      </ul>
                    </div>
                    <span className="text-xs text-[#b0a898] shrink-0">Amherst, MA</span>
                  </div>
                </motion.div>

                {/* Experience */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.25 }}
                >
                  <SectionLabel>Experience</SectionLabel>
                  <div className="space-y-8">
                    {experience.map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease, delay: 0.3 + i * 0.06 }}
                      >
                        <div className="flex items-start justify-between gap-4 mb-1 flex-wrap">
                          <div className="flex items-baseline gap-3">
                            <h3 className="text-sm font-bold text-[#0a0a0a]">{item.title}</h3>
                            <span className="text-xs text-[#7a7068]">{item.role}</span>
                          </div>
                          <span className="text-xs text-[#b0a898] font-mono shrink-0">{item.period}</span>
                        </div>
                        <p className="text-xs text-accent font-semibold mb-3">{item.summary}</p>
                        <ul className="space-y-1.5">
                          {item.bullets.map((b) => (
                            <BulletPoint key={b}>{b}</BulletPoint>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Volunteer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.5 }}
                >
                  <SectionLabel>Volunteer & Leadership</SectionLabel>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-baseline justify-between gap-4 mb-1 flex-wrap">
                        <h3 className="text-sm font-bold text-[#0a0a0a]">Street Code Academy</h3>
                        <span className="text-xs text-[#b0a898] font-mono shrink-0">East Palo Alto, CA</span>
                      </div>
                      <ul className="space-y-1.5">
                        <BulletPoint>Mentored underserved students in coding, entrepreneurship, and digital skills</BulletPoint>
                        <BulletPoint>Led workshops on software development fundamentals and business pitch creation</BulletPoint>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0a0a0a] mb-1">NCAA Football Student-Athlete</h3>
                      <ul className="space-y-1.5">
                        <BulletPoint>Competing at a high level while managing 20+ hours per week of training, film study, and competition</BulletPoint>
                        <BulletPoint>Demonstrated discipline, resilience, and leadership balancing athletics with a full academic course load</BulletPoint>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.55 }}
                >
                  <SectionLabel>Skills</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {skills.map((s) => (
                      <div key={s.label}>
                        <p className="text-[11px] tracking-[0.18em] uppercase text-[#7a7068] font-semibold mb-2">{s.label}</p>
                        <p className="text-xs text-[#5a5450] leading-relaxed">{s.items}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Footer CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.6 }}
                  className="pt-2 border-t border-black/[0.07] flex items-center justify-between flex-wrap gap-4"
                >
                  <p className="text-xs text-[#b0a898]">Open full resume — print or save as PDF from there.</p>
                  <a
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-2.5 bg-[#0a0a0a] text-white text-xs font-bold tracking-wide hover:bg-accent transition-colors duration-200"
                  >
                    View Full Resume
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="group-hover:translate-y-0.5 transition-transform duration-200">
                      <path d="M5.5 1v6M2.5 5l3 3 3-3M1 10h9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-4 h-[2px] bg-accent rounded-full" />
      <span className="text-[11px] tracking-[0.22em] uppercase text-[#7a7068] font-semibold">
        {children}
      </span>
      <div className="flex-1 h-px bg-black/[0.06]" />
    </div>
  );
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-xs text-[#5a5450] leading-relaxed list-none">
      <span className="text-[#b0a898] mt-1 shrink-0">—</span>
      {children}
    </li>
  );
}
