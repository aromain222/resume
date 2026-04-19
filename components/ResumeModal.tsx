"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ResumeModal() {
  const { open, setOpen } = useResume();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.45, ease }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-2xl bg-[#080809] border-l border-white/6 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between px-8 py-5 border-b border-white/5 bg-[#080809]/95 backdrop-blur-sm z-10">
              <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
                Resume
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-600 hover:text-zinc-300 transition-colors cursor-pointer p-1"
                aria-label="Close"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M1 1l14 14M15 1L1 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Resume content */}
            <div className="px-8 py-10">
              {/* Name block */}
              <div className="mb-12 pb-10 border-b border-white/5">
                <h1 className="text-3xl font-black text-zinc-50 tracking-tight mb-2">
                  Avery Romain
                </h1>
                <p className="text-sm text-zinc-500 mb-4">
                  Amherst College · Class of 2027 · Economics & Computer Science
                </p>
                <div className="flex items-center gap-4 flex-wrap text-xs text-zinc-600">
                  <a
                    href="mailto:aromain22@amherst.edu"
                    className="hover:text-accent transition-colors"
                  >
                    aromain22@amherst.edu
                  </a>
                  <span className="text-zinc-800">·</span>
                  <a
                    href="https://linkedin.com/in/avery-romain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    linkedin.com/in/avery-romain
                  </a>
                </div>
              </div>

              {/* Education */}
              <ResumeSection title="Education">
                <ResumeItem
                  title="Amherst College"
                  subtitle="B.A. Economics & Computer Science · Expected May 2027"
                  location="Amherst, MA"
                >
                  <ul className="space-y-1 mt-2">
                    <BulletPoint>
                      Division III Football — Offensive Line
                    </BulletPoint>
                    <BulletPoint>
                      Relevant coursework: Financial Economics, Data Structures,
                      Algorithms, Statistics
                    </BulletPoint>
                  </ul>
                </ResumeItem>
              </ResumeSection>

              {/* Building */}
              <ResumeSection title="Building">
                <ResumeItem
                  title="Stackr"
                  subtitle="Founder & Builder"
                  location="2024–Present"
                >
                  <p className="text-xs text-zinc-600 mt-1 mb-2">
                    Personal finance infrastructure for student-athletes
                  </p>
                  <ul className="space-y-1">
                    <BulletPoint>
                      Designed and built financial tracking, goal-setting, and
                      accountability system
                    </BulletPoint>
                    <BulletPoint>
                      Focused on accessibility and clarity for users without
                      professional financial support
                    </BulletPoint>
                  </ul>
                </ResumeItem>

                <ResumeItem
                  title="CapitalBase"
                  subtitle="Founder & Builder"
                  location="2024–Present"
                >
                  <p className="text-xs text-zinc-600 mt-1 mb-2">
                    Investment intelligence platform for first-time investors
                  </p>
                  <ul className="space-y-1">
                    <BulletPoint>
                      Portfolio tracking, market education, and investment
                      context in a single interface
                    </BulletPoint>
                    <BulletPoint>
                      Built for the 18–22 demographic entering markets without
                      institutional backing
                    </BulletPoint>
                  </ul>
                </ResumeItem>

                <ResumeItem
                  title="AI Transfer Portal"
                  subtitle="Founder & Builder"
                  location="2024–Present"
                >
                  <p className="text-xs text-zinc-600 mt-1 mb-2">
                    AI-powered recruiting intelligence for college football
                  </p>
                  <ul className="space-y-1">
                    <BulletPoint>
                      Processes transfer portal data and player performance
                      metrics
                    </BulletPoint>
                    <BulletPoint>
                      Surfaces program-player fit signals that traditional
                      pipelines miss
                    </BulletPoint>
                  </ul>
                </ResumeItem>

                <ResumeItem
                  title="Natural Language → SQL Interface"
                  subtitle="In Progress"
                  location="2025–Present"
                >
                  <ul className="space-y-1 mt-2">
                    <BulletPoint>
                      Translates plain English into executable SQL queries
                    </BulletPoint>
                    <BulletPoint>
                      Makes database access intuitive for non-technical users
                    </BulletPoint>
                  </ul>
                </ResumeItem>
              </ResumeSection>

              {/* Skills */}
              <ResumeSection title="Skills">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs tracking-wider uppercase text-zinc-600 mb-2 font-medium">
                      Technical
                    </p>
                    <p className="text-sm text-zinc-400">
                      TypeScript · Python · SQL · React · Next.js · Node.js
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-zinc-600 mb-2 font-medium">
                      Finance
                    </p>
                    <p className="text-sm text-zinc-400">
                      Financial modeling · Portfolio analysis · Investment
                      theory
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-wider uppercase text-zinc-600 mb-2 font-medium">
                      Product
                    </p>
                    <p className="text-sm text-zinc-400">
                      System design · User research · Prototype to production
                    </p>
                  </div>
                </div>
              </ResumeSection>

              {/* Activities */}
              <ResumeSection title="Activities">
                <ul className="space-y-2">
                  <BulletPoint>
                    Amherst College Football — Division III, Offensive Line
                  </BulletPoint>
                  <BulletPoint>Financial literacy advocacy</BulletPoint>
                  <BulletPoint>AI applications in finance</BulletPoint>
                  <BulletPoint>Sports analytics</BulletPoint>
                </ul>
              </ResumeSection>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-xs tracking-[0.2em] uppercase text-zinc-600 font-medium">
          {title}
        </span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function ResumeItem({
  title,
  subtitle,
  location,
  children,
}: {
  title: string;
  subtitle: string;
  location?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-1">
        <h4 className="text-sm font-semibold text-zinc-200">{title}</h4>
        {location && (
          <span className="text-xs text-zinc-600 shrink-0">{location}</span>
        )}
      </div>
      <p className="text-xs text-zinc-500 mb-2">{subtitle}</p>
      {children}
    </div>
  );
}

function BulletPoint({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed">
      <span className="text-zinc-700 mt-1.5 shrink-0">—</span>
      {children}
    </li>
  );
}
