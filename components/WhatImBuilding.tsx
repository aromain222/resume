"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Project = {
  num: string;
  title: string;
  tagline: string;
  description: string;
  url: string;
  thumbnail: "stackwise" | "capitalbase" | "portal";
  status: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Stackwise",
    tagline: "Build your financial stack.",
    description:
      "Personal finance infrastructure. Answer 8 questions, get your exact checking, savings, credit, and investing accounts — each with a specific explanation of why it fits.",
    url: "https://stackr-silk.vercel.app",
    thumbnail: "stackwise",
    status: "Live",
  },
  {
    num: "02",
    title: "CapitalBase",
    tagline: "AI financial modeling in under 10 seconds.",
    description:
      "Generates full financial models (DCF, LBO, Comps) from a simple prompt. Designed for analysts and founders who need structured outputs fast.",
    url: "https://www.capital-base.com/app",
    thumbnail: "capitalbase",
    status: "Live",
  },
  {
    num: "03",
    title: "Transfer Portal",
    tagline: "Find the right player. Close the edge.",
    description:
      "AI-powered search and fit scoring for the college football transfer market. Built for personnel directors who recruit by data, not reputation.",
    url: "https://jal-football.vercel.app",
    thumbnail: "portal",
    status: "Live",
  },
];

function StackwiseThumbnail() {
  return (
    <div className="absolute inset-0 bg-[#0c0c14] flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-1.5 border border-white/15 rounded-full px-3 py-1 mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
        <span className="text-[7px] tracking-widest text-white/40 font-medium">
          CHECKING · SAVINGS · CREDIT · INVESTING
        </span>
      </div>
      <p className="text-xl font-black leading-tight mb-3">
        <span className="text-white">Build your </span>
        <span
          style={{
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          financial stack
        </span>
      </p>
      <p className="text-[8px] text-white/35 max-w-[200px] leading-relaxed mb-5">
        Answer 8 questions. Get your exact checking, savings, credit, and
        investing accounts — each with a specific explanation of why it fits.
      </p>
      <div className="flex gap-2">
        <div className="bg-blue-500 text-white text-[8px] px-4 py-1.5 rounded-full font-semibold">
          View my stack →
        </div>
        <div className="border border-white/20 text-white/50 text-[8px] px-4 py-1.5 rounded-full">
          Update answers
        </div>
      </div>
    </div>
  );
}

function CapitalBaseThumbnail() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#080d08]">
      <div className="w-11 h-11 border border-green-500/25 flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 16L7 9L12 12L18 4"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </div>
      <span className="text-[10px] tracking-[0.32em] uppercase text-white/25 font-medium">
        CapitalBase
      </span>
    </div>
  );
}

function PortalThumbnail() {
  return (
    <div className="absolute inset-0 flex overflow-hidden text-left">
      {/* Left — white marketing panel */}
      <div className="w-[44%] bg-white flex flex-col justify-center px-5 py-4 shrink-0">
        <p className="text-[6px] font-black tracking-[0.18em] text-green-700 mb-2 uppercase">
          Transfer Portal
        </p>
        <p className="text-[11px] font-black text-gray-900 leading-[1.05] tracking-tight mb-2">
          FIND THE
          <br />
          RIGHT PLAYER.
          <br />
          <span className="text-green-700">CLOSE THE EDGE.</span>
        </p>
        <p className="text-[6px] font-bold text-gray-700 mb-4">
          <span className="text-green-700">AI-POWERED</span> SEARCH. DATA-BACKED DECISIONS.
        </p>
        <div className="flex gap-2">
          {["AI SEARCH", "INSIGHTS", "CONFIDENCE"].map((f) => (
            <div
              key={f}
              className="text-[5px] font-black text-gray-600 tracking-wide"
            >
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right — app mockup */}
      <div className="flex-1 bg-[#edf3ed] p-2.5 overflow-hidden">
        <div className="bg-white rounded shadow-sm p-2.5 h-full flex flex-col gap-2">
          {/* Player header */}
          <div>
            <p className="text-[5px] text-gray-400 tracking-widest mb-0.5">DL · 3-TECH</p>
            <p className="text-[8px] font-bold text-gray-900 mb-0.5">Adepoju Adebawore</p>
            <p className="text-[5px] text-gray-400">JR · FBS · Transfer Portal</p>
          </div>
          {/* Measurables */}
          <div className="flex gap-2">
            {[["HEIGHT", "6'4\""], ["WEIGHT", "275 lbs"], ["CLASS", "Junior"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[4px] text-gray-400 uppercase tracking-wider">{l}</p>
                <p className="text-[6px] font-bold text-gray-800">{v}</p>
              </div>
            ))}
          </div>
          {/* Grade cards */}
          <div className="flex gap-1">
            {[
              { l: "PASS RUSH", v: "62.6", c: "#f97316" },
              { l: "RUN DEF", v: "68.7", c: "#f97316" },
              { l: "TACKLING", v: "48.9", c: "#ef4444" },
            ].map(({ l, v, c }) => (
              <div
                key={l}
                className="flex-1 border border-gray-100 rounded-sm p-1"
              >
                <p className="text-[4px] text-gray-400 tracking-wider mb-0.5">{l}</p>
                <p className="text-[9px] font-black" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
          {/* Stats row */}
          <div className="flex gap-2 pt-1 border-t border-gray-50">
            {[["PRESSURES", "10"], ["SACKS", "2"], ["QB HITS", "3"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[4px] text-gray-400 tracking-wider">{l}</p>
                <p className="text-[7px] font-bold text-gray-800">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const thumbnails = {
  stackwise: StackwiseThumbnail,
  capitalbase: CapitalBaseThumbnail,
  portal: PortalThumbnail,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Thumb = thumbnails[project.thumbnail];

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: index * 0.1 }}
      className="group block border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-300 bg-[#0a0a0d]"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-[#0d0d0d]">
        <Thumb />
        <div className="absolute inset-0 bg-[#050507]/0 group-hover:bg-[#050507]/10 transition-colors duration-300" />
      </div>

      <div className="p-6 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-zinc-700 tracking-widest">{project.num}</span>
          <span className="text-[10px] tracking-wider uppercase text-zinc-700 border border-white/5 px-2 py-0.5">
            {project.status}
          </span>
        </div>
        <h3 className="text-base font-bold text-zinc-100 tracking-[-0.01em] mb-1">{project.title}</h3>
        <p className="text-xs font-medium text-accent mb-3">{project.tagline}</p>
        <p className="text-xs text-zinc-600 leading-[1.75]">{project.description}</p>
        <div className="flex items-center gap-1.5 mt-5 text-xs text-zinc-700 group-hover:text-zinc-400 transition-colors duration-200">
          <span>View live</span>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
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
    </motion.a>
  );
}

export default function WhatImBuilding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="building" className="border-t border-white/[0.06] py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-accent" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium">
              What I&apos;m Building
            </span>
          </div>
          <span className="hidden sm:block text-[10px] text-zinc-700 tracking-[0.15em] uppercase">
            3 live products
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
