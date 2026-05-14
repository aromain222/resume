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
    <div className="absolute inset-0 bg-[#F5F0E8] flex flex-col items-center justify-center px-6 text-center">
      <div className="flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1 mb-5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#d4562a]" />
        <span className="text-[7px] tracking-widest text-[#7a7068] font-bold uppercase">
          Checking · Savings · Credit · Investing
        </span>
      </div>
      <p className="text-xl font-black leading-tight mb-3 text-[#0a0a0a]">
        Build your financial stack
      </p>
      <p className="text-[8px] text-[#7a7068] max-w-[200px] leading-relaxed mb-5">
        Answer 8 questions. Get your exact checking, savings, credit, and
        investing accounts — each with a specific explanation of why it fits.
      </p>
      <div className="flex gap-2">
        <div className="bg-[#0a0a0a] text-white text-[8px] px-4 py-1.5 font-semibold">
          View my stack →
        </div>
        <div className="border border-black/20 text-[#7a7068] text-[8px] px-4 py-1.5">
          Update answers
        </div>
      </div>
    </div>
  );
}

function CapitalBaseThumbnail() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#F5F0E8]">
      <div className="w-12 h-12 border border-black/15 bg-white flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 16L7 9L12 12L18 4"
            stroke="#d4562a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-[11px] tracking-[0.3em] uppercase text-[#0a0a0a] font-bold">
        CapitalBase
      </span>
      <span className="text-[8px] text-[#7a7068] tracking-widest uppercase">
        DCF · LBO · Comps
      </span>
    </div>
  );
}

function PortalThumbnail() {
  return (
    <div className="absolute inset-0 flex overflow-hidden text-left">
      <div className="w-[44%] bg-white flex flex-col justify-center px-5 py-4 shrink-0 border-r border-black/[0.06]">
        <p className="text-[6px] font-black tracking-[0.18em] text-[#d4562a] mb-2 uppercase">
          Transfer Portal
        </p>
        <p className="text-[11px] font-black text-[#0a0a0a] leading-[1.05] tracking-tight mb-2">
          FIND THE
          <br />
          RIGHT PLAYER.
          <br />
          <span className="text-[#d4562a]">CLOSE THE EDGE.</span>
        </p>
        <p className="text-[6px] font-bold text-[#7a7068] mb-4 uppercase">
          <span className="text-[#d4562a]">AI-Powered</span> search.
        </p>
      </div>

      <div className="flex-1 bg-[#F5F0E8] p-2.5 overflow-hidden">
        <div className="bg-white p-2.5 h-full flex flex-col gap-2">
          <div>
            <p className="text-[5px] text-[#9ca3af] tracking-widest mb-0.5 uppercase">DL · 3-Tech</p>
            <p className="text-[8px] font-bold text-[#0a0a0a] mb-0.5">Adepoju Adebawore</p>
            <p className="text-[5px] text-[#9ca3af] uppercase">JR · FBS · Transfer Portal</p>
          </div>
          <div className="flex gap-2">
            {[["HEIGHT", "6'4\""], ["WEIGHT", "275 lbs"], ["CLASS", "Junior"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[4px] text-[#9ca3af] uppercase tracking-wider">{l}</p>
                <p className="text-[6px] font-bold text-[#0a0a0a]">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {[
              { l: "PASS RUSH", v: "62.6", c: "#d4562a" },
              { l: "RUN DEF", v: "68.7", c: "#d4562a" },
              { l: "TACKLING", v: "48.9", c: "#7a7068" },
            ].map(({ l, v, c }) => (
              <div key={l} className="flex-1 border border-black/[0.08] p-1">
                <p className="text-[4px] text-[#9ca3af] tracking-wider mb-0.5 uppercase">{l}</p>
                <p className="text-[9px] font-black" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-1 border-t border-black/[0.06]">
            {[["PRESSURES", "10"], ["SACKS", "2"], ["QB HITS", "3"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[4px] text-[#9ca3af] tracking-wider uppercase">{l}</p>
                <p className="text-[7px] font-bold text-[#0a0a0a]">{v}</p>
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
      className="group block border border-black/[0.08] hover:border-black/[0.2] hover:shadow-md transition-all duration-300 bg-white cursor-pointer"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-[#f5f0e8]">
        <Thumb />
      </div>

      <div className="p-6 border-t border-black/[0.06]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-[#b0a898] tracking-widest">{project.num}</span>
          <span className="text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 bg-[#f5f0e8] text-[#d4562a]">
            {project.status}
          </span>
        </div>
        <h3 className="text-base font-bold text-[#0a0a0a] tracking-[-0.01em] mb-1">{project.title}</h3>
        <p className="text-xs font-semibold text-[#d4562a] mb-3">{project.tagline}</p>
        <p className="text-xs text-[#7a7068] leading-[1.75]">{project.description}</p>
        <div className="flex items-center gap-1.5 mt-5 text-xs text-[#b0a898] group-hover:text-[#0a0a0a] transition-colors duration-200 font-medium">
          <span>View live</span>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path
              d="M1 8L8 1M8 1H2.5M8 1v5.5"
              stroke="currentColor"
              strokeWidth="1.5"
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
    <section id="building" className="border-t border-black/[0.07] py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-[2px] bg-accent rounded-full" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#7a7068] font-semibold">
              What I&apos;m Building
            </span>
          </div>
          <span className="hidden sm:block text-[11px] text-[#b0a898] tracking-[0.12em] uppercase font-medium">
            3 live products
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
