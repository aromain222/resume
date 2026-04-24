"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

const experience = [
  {
    title: "CapitalBase",
    role: "Founder · Lead Developer",
    period: "Aug 2025 – Present",
    summary: "AI platform for financial modeling.",
    bullets: [
      "Built an AI platform that generates full financial models (DCF, LBO, Comps) in under 10 seconds, reducing modeling time by 20×",
      "Conducted product demos and outreach with early users to validate product-market fit and refine enterprise messaging",
      "Researched potential enterprise customers and built targeted messaging around financial workflow automation",
      "Designed a web interface enabling users to generate and export financial models from a simple prompt",
    ],
  },
  {
    title: "Caprae Capital",
    role: "Private Equity Intern",
    period: "June 2025 – Aug 2025",
    summary: "Lower-middle market M&A.",
    bullets: [
      "Researched 50+ founder-owned firms under $10M in revenue and built acquisition pipelines through market mapping",
      "Supported due diligence on $25M+ deals by preparing models and investment materials used in partner evaluations",
      "Analyzed 30+ comparable transactions to benchmark valuation multiples and refine sourcing strategy",
      "Applied unit economics, cash flow durability, and multiple expansion analysis to screen 80+ acquisition targets",
    ],
  },
  {
    title: "Weel (YC S24)",
    role: "Marketing Intern",
    period: "June 2025 – July 2025",
    summary: "Gen-Z fintech user acquisition.",
    bullets: [
      "Executed campus marketing campaigns for a YC-backed fintech startup to drive Gen-Z user acquisition",
      "Produced video and social content that increased product awareness and downloads",
      "Collaborated with founders to refine growth messaging using user feedback and engagement metrics",
    ],
  },
  {
    title: "Robertson Stephens",
    role: "Private Wealth Management Intern",
    period: "July 2025",
    summary: "$500M+ AUM wealth management.",
    bullets: [
      "Supported advisors managing $500M+ in AUM through portfolio reports and client deliverables",
      "Researched 50+ securities to inform allocation changes for high-net-worth portfolios",
      "Built Excel tools, reducing report preparation time by 25%",
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
    items:
      "Python · JavaScript · Next.js · React · Tailwind · SQL · Supabase · API Integration · Git · Prompt Engineering · Figma",
  },
  {
    label: "Finance",
    items:
      "Financial modeling · DCF · LBO · Comps · Portfolio analysis · Excel · Financial Analysis",
  },
  {
    label: "Business",
    items:
      "CRM · Sales · Lead Research · Outreach · Product Positioning · Pipeline Building · Strategic Execution · AI Agents",
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
    return () => {
      document.body.style.overflow = "";
    };
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
            className="fixed inset-0 z-40 bg-[#050507]/88 backdrop-blur-[2px]"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#0a0a0d] border border-white/10 overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

              {/* Sticky header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[#0a0a0d]/95 backdrop-blur-sm border-b border-white/5">
                <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
                  Resume
                </span>
                <div className="flex items-center gap-5">
                  <a
                    href="/resume" target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-xs tracking-wider uppercase text-zinc-500 hover:text-accent transition-colors duration-200"
                  >
                    View Resume
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="group-hover:translate-y-0.5 transition-transform duration-200"
                    >
                      <path
                        d="M5 1v5.5M2.5 4.5L5 7l2.5-2.5M1 9h8"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200 cursor-pointer p-1"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 1l12 12M13 1L1 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
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
                  <h1 className="text-4xl sm:text-5xl font-black text-zinc-50 tracking-tight mb-3">
                    Avery Romain
                  </h1>
                  <p className="text-base text-accent font-medium mb-5">
                    Founder building financial infrastructure, AI tooling, and sports intelligence.
                  </p>
                  <p className="text-xs text-zinc-600 mb-3 tracking-wide">
                    Amherst College · Class of 2027 · Political Science & Black Studies
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-600 flex-wrap">
                    <a
                      href="mailto:averyromain5@gmail.com"
                      className="hover:text-accent transition-colors duration-200"
                    >
                      averyromain5@gmail.com
                    </a>
                    <span className="text-zinc-800">·</span>
                    <span className="text-zinc-600">(650) 430-9759</span>
                    <span className="text-zinc-800">·</span>
                    <a
                      href="https://linkedin.com/in/avery-romain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors duration-200"
                    >
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
                      <h3 className="text-sm font-semibold text-zinc-200 mb-1">
                        Amherst College
                      </h3>
                      <p className="text-xs text-zinc-500 mb-3">
                        B.A. Political Science & Black Studies · Expected May 2027
                      </p>
                      <ul className="space-y-1.5">
                        <BulletPoint>Division III Football — Student Athlete</BulletPoint>
                        <BulletPoint>Alumni Outreach · Amherst Black Business Club</BulletPoint>
                      </ul>
                    </div>
                    <span className="text-xs text-zinc-700 shrink-0">Amherst, MA</span>
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
                            <h3 className="text-sm font-semibold text-zinc-200">
                              {item.title}
                            </h3>
                            <span className="text-xs text-zinc-600">{item.role}</span>
                          </div>
                          <span className="text-xs text-zinc-700 font-mono shrink-0">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-xs text-accent mb-3">{item.summary}</p>
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
                        <h3 className="text-sm font-semibold text-zinc-200">Street Code Academy</h3>
                        <span className="text-xs text-zinc-700 font-mono shrink-0">East Palo Alto, CA</span>
                      </div>
                      <ul className="space-y-1.5">
                        <BulletPoint>Mentored underserved students in coding, entrepreneurship, and digital skills</BulletPoint>
                        <BulletPoint>Led workshops on software development fundamentals and business pitch creation</BulletPoint>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-zinc-200 mb-1">NCAA Football Student-Athlete</h3>
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
                        <p className="text-xs tracking-[0.15em] uppercase text-zinc-600 font-medium mb-2">
                          {s.label}
                        </p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{s.items}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Download CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease, delay: 0.6 }}
                  className="pt-2 border-t border-white/5 flex items-center justify-between flex-wrap gap-4"
                >
                  <p className="text-xs text-zinc-700">Open full resume — print or save as PDF from there.</p>
                  <a
                    href="/resume" target="_blank" rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-50 text-zinc-950 text-xs font-semibold tracking-wide hover:bg-accent transition-colors duration-200"
                  >
                    View Full Resume
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      className="group-hover:translate-y-0.5 transition-transform duration-200"
                    >
                      <path
                        d="M5.5 1v6M2.5 5l3 3 3-3M1 10h9"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
      <div className="w-4 h-px bg-accent/60" />
      <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-xs text-zinc-500 leading-relaxed list-none">
      <span className="text-zinc-700 mt-1 shrink-0">—</span>
      {children}
    </li>
  );
}
