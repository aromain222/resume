"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Project = {
  title: string;
  summary: string;
  description: string;
  why: string;
  built: string[];
  status: string;
};

const projects: Project[] = [
  {
    title: "Stackr",
    summary: "Personal finance infrastructure for athletes who earn before they learn.",
    description:
      "A tracking and accountability system for athletes navigating NIL income, stipends, and early financial decisions without professional support. Built to make the numbers make sense — not to add another app to manage.",
    why: "The average athlete makes consequential financial decisions at 18. There's no infrastructure for that moment. Stackr is that infrastructure.",
    built: [
      "Budget tracking and expense categorization by income type",
      "Goal-setting modules with milestone checkpoints",
      "Income logging for NIL deals, stipends, and part-time work",
      "Financial dashboard designed for users with no finance background",
    ],
    status: "Active",
  },
  {
    title: "CapitalBase",
    summary: "Investment intelligence for people entering markets without a guide.",
    description:
      "Portfolio tracking, market context, and investment education in one interface. Built for the 18–22 cohort that's one click away from buying their first position and has no framework for what they're doing.",
    why: "Most investment apps give you charts. CapitalBase gives you the logic behind the chart — the context that actually helps someone make a better decision.",
    built: [
      "Portfolio tracking with real-time position updates",
      "Market context feed that explains movement — not just data",
      "Investment education modules tied to live portfolio holdings",
      "Onboarding designed for users with zero prior market exposure",
    ],
    status: "Active",
  },
  {
    title: "AI Transfer Portal",
    summary: "Recruiting intelligence built for the speed of the transfer portal.",
    description:
      "An AI system that processes portal entries, performance metrics, and roster gaps to surface fit signals before the competition identifies them.",
    why: "The portal moves in hours. Programs that still recruit by spreadsheet and phone call are already behind. This closes that gap.",
    built: [
      "Data pipeline ingesting portal entries and performance metrics",
      "AI-powered player-to-program fit scoring model",
      "Recruiter dashboard surfacing ranked transfer targets by need",
      "Automated alerts for high-priority portal activity",
    ],
    status: "Active",
  },
];

function ProjectCard({
  project,
  index,
  isFaded,
  onClick,
}: {
  project: Project;
  index: number;
  isFaded: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={
        inView
          ? {
              opacity: isFaded ? 0.07 : 1,
              y: 0,
              scale: isFaded ? 0.97 : 1,
            }
          : { opacity: 0, y: 36 }
      }
      transition={{
        opacity: { duration: 0.35, ease },
        scale: { duration: 0.35, ease },
        y: { duration: 0.7, ease, delay: index * 0.12 },
      }}
      onClick={onClick}
      className="group relative bg-[#0a0a0d] border border-white/5 hover:border-white/10 p-8 cursor-pointer select-none transition-colors duration-300"
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-xs font-mono text-zinc-700 tracking-widest">
          0{index + 1}
        </span>
        <span className="text-xs tracking-wider uppercase text-zinc-700 border border-white/5 px-2 py-0.5">
          {project.status}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-zinc-100 tracking-tight mb-3">
        {project.title}
      </h3>

      <p className="text-sm font-medium text-accent mb-6 leading-relaxed">
        {project.summary}
      </p>

      <p className="text-sm text-zinc-500 leading-[1.8] mb-8">
        {project.description}
      </p>

      <div className="border-t border-white/5 pt-6">
        <p className="text-xs tracking-[0.15em] uppercase text-zinc-700 mb-3 font-medium">
          Why it matters
        </p>
        <p className="text-xs text-zinc-600 leading-[1.8]">{project.why}</p>
      </div>

      {/* Hover reveal */}
      <div className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center gap-1.5 text-xs text-zinc-600">
          <span>Expand</span>
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          >
            <path
              d="M1 8L8 1M8 1H2.5M8 1v5.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

function ExpandedView({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const index = projects.findIndex((p) => p.title === project.title);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-[#050507]/88 backdrop-blur-[2px]"
      />

      {/* Expanded panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.4, ease }}
          className="relative w-full max-w-2xl max-h-[88vh] bg-[#0a0a0d] border border-white/10 overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent line top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

          {/* Sticky header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[#0a0a0d]/95 backdrop-blur-sm border-b border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-zinc-700 tracking-widest">
                0{index + 1}
              </span>
              <span className="text-xs tracking-wider uppercase text-zinc-700 border border-white/5 px-2 py-0.5">
                {project.status}
              </span>
            </div>
            <button
              onClick={onClose}
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

          {/* Body */}
          <div className="px-8 py-8 space-y-8">
            {/* Title + summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.15 }}
            >
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-50 tracking-tight mb-3">
                {project.title}
              </h2>
              <p className="text-base font-medium text-accent leading-relaxed">
                {project.summary}
              </p>
            </motion.div>

            {/* What it is */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.2 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium mb-3">
                What it is
              </p>
              <p className="text-sm text-zinc-400 leading-[1.85]">
                {project.description}
              </p>
            </motion.div>

            {/* Why it matters */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.25 }}
              className="bg-white/[0.025] border border-white/5 p-6"
            >
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium mb-3">
                Why it matters
              </p>
              <p className="text-sm text-zinc-400 leading-[1.85]">
                {project.why}
              </p>
            </motion.div>

            {/* What I built */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.3 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium mb-5">
                What I built
              </p>
              <ul className="space-y-4">
                {project.built.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      ease,
                      delay: 0.35 + i * 0.06,
                    }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-xs font-mono text-accent/70 mt-0.5 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-zinc-400 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function WhatImBuilding() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!selected) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const selectedProject = projects.find((p) => p.title === selected) ?? null;

  return (
    <section id="building" className="relative py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-accent" />
            <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
              What I&apos;m Building
            </span>
          </div>
          <span className="hidden sm:block text-xs text-zinc-700 tracking-wider">
            3 systems
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isFaded={!!selected && selected !== project.title}
              onClick={() => setSelected(project.title)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ExpandedView
            project={selectedProject}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
