"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    title: "Stackr",
    summary: "Personal finance infrastructure for student-athletes.",
    description:
      "A financial tracking and accountability system built for athletes who generate income early and lack access to professional financial support. Covers budgeting, goal-setting, and long-term planning.",
    why: "Athletes face financial decisions at 18 that most people face at 30. The infrastructure to handle those decisions shouldn't require a $300/hour advisor.",
    status: "Active",
  },
  {
    title: "CapitalBase",
    summary: "Investment intelligence for first-time investors.",
    description:
      "A platform that combines portfolio tracking, market education, and investment context in a single interface — built for the 18–22 cohort entering markets without institutional support.",
    why: "First-generation investors don't need another brokerage. They need context, clarity, and a system that explains the logic behind the numbers.",
    status: "Active",
  },
  {
    title: "AI Transfer Portal",
    summary: "Recruiting intelligence for college football's transfer market.",
    description:
      "An AI system that processes transfer portal data, player performance metrics, and program roster needs to surface fit signals that traditional recruiting pipelines miss.",
    why: "The transfer portal is now the primary talent acquisition mechanism in college football. The programs that build intelligence around it will win.",
    status: "Active",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay: index * 0.12 }}
      className="group relative bg-[#0a0a0d] border border-white/5 hover:border-white/10 p-8 transition-all duration-300 hover:-translate-y-1"
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

      {/* Title */}
      <h3 className="text-2xl font-bold text-zinc-100 tracking-tight mb-3">
        {project.title}
      </h3>

      {/* Summary line */}
      <p className="text-sm font-medium text-accent mb-6 leading-relaxed">
        {project.summary}
      </p>

      {/* Description */}
      <p className="text-sm text-zinc-500 leading-[1.8] mb-8">
        {project.description}
      </p>

      {/* Why it matters */}
      <div className="border-t border-white/5 pt-6">
        <p className="text-xs tracking-[0.15em] uppercase text-zinc-700 mb-3 font-medium">
          Why it matters
        </p>
        <p className="text-xs text-zinc-600 leading-[1.8]">{project.why}</p>
      </div>
    </motion.div>
  );
}

export default function WhatImBuilding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="building" className="relative py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
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
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
