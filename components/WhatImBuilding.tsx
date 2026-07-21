"use client";

import { motion, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  tagline: string;
  description: string;
  url: string;
  thumbnail: "stackwise" | "financialModeling" | "portal" | "datachat";
  category: string;
  destination: "Live" | "Source";
};

const projects: Project[] = [
  {
    title: "Stackwise",
    tagline: "A better starting point for your finances.",
    description:
      "Answer eight questions and get a short list of checking, savings, credit, and investing accounts that fit.",
    url: "https://stackr-silk.vercel.app",
    thumbnail: "stackwise",
    category: "Personal finance",
    destination: "Live",
  },
  {
    title: "Financial Modeling Engine",
    tagline: "Full Excel models from a standalone modeling engine.",
    description:
      "Generates finance-native DCF, LBO, three-statement, comps, M&A, and other linked Excel workbooks through one standalone API.",
    url: "https://financial-modeling-engine-7nui27p1a-aromain222s-projects.vercel.app",
    thumbnail: "financialModeling",
    category: "Financial modeling",
    destination: "Live",
  },
  {
    title: "Transfer Portal",
    tagline: "A faster way to find transfer targets.",
    description:
      "A search and fit tool for college football staffs evaluating players in the transfer portal.",
    url: "https://jal-football.vercel.app",
    thumbnail: "portal",
    category: "College football",
    destination: "Live",
  },
  {
    title: "DataChat",
    tagline: "Ask questions about a spreadsheet.",
    description:
      "Upload a CSV, ask a question, and get back an answer with the table and chart to support it.",
    url: "https://sql-beta-roan.vercel.app",
    thumbnail: "datachat",
    category: "Data tooling",
    destination: "Live",
  },
];

function StackwiseThumbnail() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e7edf7] px-6 text-center">
      <div className="mb-5 flex items-center gap-1.5 border border-black/15 bg-white px-3 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-[#4b2e7d]" />
        <span className="text-[7px] font-bold uppercase tracking-widest text-[#7a7068]">
          Checking · Savings · Credit · Investing
        </span>
      </div>
      <p className="mb-3 text-xl font-black leading-tight text-[#0a0a0a]">
        Build your financial stack
      </p>
      <p className="mb-5 max-w-[200px] text-[8px] leading-relaxed text-[#7a7068]">
        Answer 8 questions. Get your exact checking, savings, credit, and
        investing accounts — each with a specific explanation of why it fits.
      </p>
      <div className="flex gap-2">
        <div className="bg-[#0a0a0a] px-4 py-1.5 text-[8px] font-semibold text-white">
          View my stack →
        </div>
        <div className="border border-black/20 px-4 py-1.5 text-[8px] text-[#7a7068]">
          Update answers
        </div>
      </div>
    </div>
  );
}

function FinancialModelingThumbnail() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-7 bg-[#e7edf7] px-8">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-black/15 bg-white">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 16L7 11L11 13L18 4"
            stroke="#4b2e7d"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">Modeling Engine</p>
        <p className="mt-1 text-[8px] uppercase tracking-widest text-[#7a7068]">DCF · LBO · Comps · M&amp;A</p>
        <div className="mt-3 flex gap-1">
          <span className="h-1.5 w-12 bg-[#4b2e7d]" />
          <span className="h-1.5 w-7 bg-[#aa9ac8]" />
          <span className="h-1.5 w-4 bg-[#d1c7df]" />
        </div>
      </div>
    </div>
  );
}

function PortalThumbnail() {
  return (
    <div className="absolute inset-0 flex overflow-hidden text-left">
      <div className="flex w-[44%] shrink-0 flex-col justify-center border-r border-black/[0.06] bg-white px-5 py-4">
        <p className="mb-2 text-[6px] font-black uppercase tracking-[0.18em] text-[#4b2e7d]">
          Transfer Portal
        </p>
        <p className="mb-2 text-[11px] font-black leading-[1.05] tracking-tight text-[#0a0a0a]">
          FIND THE
          <br />
          RIGHT PLAYER.
          <br />
          <span className="text-[#4b2e7d]">CLOSE THE EDGE.</span>
        </p>
        <p className="mb-4 text-[6px] font-bold uppercase text-[#7a7068]">
          <span className="text-[#4b2e7d]">AI-Powered</span> search.
        </p>
      </div>

      <div className="flex-1 overflow-hidden bg-[#e7edf7] p-2.5">
        <div className="flex h-full flex-col gap-2 bg-white p-2.5">
          <div>
            <p className="mb-0.5 text-[5px] uppercase tracking-widest text-[#9ca3af]">DL · 3-Tech</p>
            <p className="mb-0.5 text-[8px] font-bold text-[#0a0a0a]">Adepoju Adebawore</p>
            <p className="text-[5px] uppercase text-[#9ca3af]">JR · FBS · Transfer Portal</p>
          </div>
          <div className="flex gap-2">
            {[["HEIGHT", "6'4\""], ["WEIGHT", "275 lbs"], ["CLASS", "Junior"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[4px] uppercase tracking-wider text-[#9ca3af]">{l}</p>
                <p className="text-[6px] font-bold text-[#0a0a0a]">{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-1">
            {[
              { l: "PASS RUSH", v: "62.6", c: "#4b2e7d" },
              { l: "RUN DEF", v: "68.7", c: "#4b2e7d" },
              { l: "TACKLING", v: "48.9", c: "#7a7068" },
            ].map(({ l, v, c }) => (
              <div key={l} className="flex-1 border border-black/[0.08] p-1">
                <p className="mb-0.5 text-[4px] uppercase tracking-wider text-[#9ca3af]">{l}</p>
                <p className="text-[9px] font-black" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-black/[0.06] pt-1">
            {[["PRESSURES", "10"], ["SACKS", "2"], ["QB HITS", "3"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[4px] uppercase tracking-wider text-[#9ca3af]">{l}</p>
                <p className="text-[7px] font-bold text-[#0a0a0a]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DataChatThumbnail() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-[#e7edf7] px-5 py-4">
      <div className="flex items-center gap-2 border border-black/[0.08] bg-white px-3 py-2">
        <span className="flex-1 truncate text-[7px] text-[#7a7068]">
          What is the total revenue by region?
        </span>
        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm bg-[#4b2e7d]">
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <path d="M1 6L6 1M6 1H2.5M6 1v3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="overflow-hidden border border-black/[0.08] bg-white">
        <div className="grid grid-cols-2 border-b border-black/[0.06]">
          <div className="border-r border-black/[0.06] px-3 py-1.5 text-[5px] font-bold uppercase tracking-wider text-[#7a7068]">Region</div>
          <div className="px-3 py-1.5 text-[5px] font-bold uppercase tracking-wider text-[#7a7068]">Revenue</div>
        </div>
        {[["West", "$482,310"], ["Northeast", "$371,640"], ["South", "$298,900"], ["Midwest", "$214,780"]].map(([region, rev]) => (
          <div key={region} className="grid grid-cols-2 border-b border-black/[0.04] last:border-0">
            <div className="border-r border-black/[0.04] px-3 py-1 text-[6px] font-medium text-[#0a0a0a]">{region}</div>
            <div className="px-3 py-1 text-[6px] font-bold text-[#4b2e7d]">{rev}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-[#4b2e7d]" />
        <span className="text-[6px] text-[#7a7068]">West leads by 30% — driven by Q3 product launch</span>
      </div>
    </div>
  );
}

const thumbnails = {
  stackwise: StackwiseThumbnail,
  financialModeling: FinancialModelingThumbnail,
  portal: PortalThumbnail,
  datachat: DataChatThumbnail,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduceMotion = useReducedMotion();
  const Thumb = thumbnails[project.thumbnail];

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.07, 0.21) }}
      className="group block"
    >
      <div className="relative aspect-[7/3] overflow-hidden border border-line bg-stage-raised transition-colors duration-200 group-hover:border-purple/50">
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.025]">
          <Thumb />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="type-display text-2xl text-bone transition-colors duration-200 group-hover:text-purple sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1.5 text-[14px] font-medium text-bone-soft">{project.tagline}</p>
          <p className="type-label mt-2 text-[10px] text-purple-bright">{`${project.category} · ${project.destination}`}</p>
        </div>
        <span
          aria-hidden
          className="mt-1 text-lg text-bone-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple"
        >
          ↗
        </span>
      </div>
    </motion.a>
  );
}

export default function WhatImBuilding() {
  return (
    <section
      id="work"
      aria-label="Selected work"
      className="mx-auto max-w-[1280px] px-6 py-24 sm:px-10 lg:py-24"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <h2 className="type-display text-[clamp(2.25rem,4.5vw,3.5rem)] text-bone">The work</h2>
        <p className="max-w-xs pb-1 text-[13.5px] leading-[1.6] text-bone-soft">
          Four apps, all live. Click any of them and try it.
        </p>
      </div>
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
