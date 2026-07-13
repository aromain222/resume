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
  thumbnail: "stackwise" | "capitalbase" | "portal" | "datachat";
  status: string;
  category: string;
};

const projects: Project[] = [
  {
    num: "01",
    title: "Stackwise",
    tagline: "A better starting point for your finances.",
    description:
      "Answer eight questions and get a short list of checking, savings, credit, and investing accounts that fit.",
    url: "https://stackr-silk.vercel.app",
    thumbnail: "stackwise",
    status: "Live",
    category: "Personal finance",
  },
  {
    num: "02",
    title: "CapitalBase",
    tagline: "Research and portfolio monitoring in one place.",
    description:
      "The app pulls together market research, competing views, and portfolio updates so an investor can see what changed and why.",
    url: "https://www.capital-base.com/app",
    thumbnail: "capitalbase",
    status: "Live",
    category: "Multi-agent investing",
  },
  {
    num: "03",
    title: "Transfer Portal",
    tagline: "A faster way to find transfer targets.",
    description:
      "A search and fit tool for college football staffs evaluating players in the transfer portal.",
    url: "https://jal-football.vercel.app",
    thumbnail: "portal",
    status: "Live",
    category: "College football",
  },
  {
    num: "04",
    title: "DataChat",
    tagline: "Ask questions about a spreadsheet.",
    description:
      "Upload a CSV, ask a question, and get back an answer with the table and chart to support it.",
    url: "https://sql-oxm5mfre5-aromain222s-projects.vercel.app",
    thumbnail: "datachat",
    status: "Live",
    category: "Data tooling",
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

function DataChatThumbnail() {
  return (
    <div className="absolute inset-0 bg-[#F5F0E8] flex flex-col justify-center px-5 py-4 gap-3">
      <div className="bg-white border border-black/[0.08] px-3 py-2 flex items-center gap-2">
        <span className="text-[7px] text-[#7a7068] flex-1 truncate">What is the total revenue by region?</span>
        <div className="w-4 h-4 rounded-sm bg-[#d4562a] flex items-center justify-center shrink-0">
          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
            <path d="M1 6L6 1M6 1H2.5M6 1v3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="bg-white border border-black/[0.08] overflow-hidden">
        <div className="grid grid-cols-2 border-b border-black/[0.06]">
          <div className="px-3 py-1.5 text-[5px] font-bold text-[#7a7068] uppercase tracking-wider border-r border-black/[0.06]">Region</div>
          <div className="px-3 py-1.5 text-[5px] font-bold text-[#7a7068] uppercase tracking-wider">Revenue</div>
        </div>
        {[["West", "$482,310"], ["Northeast", "$371,640"], ["South", "$298,900"], ["Midwest", "$214,780"]].map(([region, rev]) => (
          <div key={region} className="grid grid-cols-2 border-b border-black/[0.04] last:border-0">
            <div className="px-3 py-1 text-[6px] text-[#0a0a0a] font-medium border-r border-black/[0.04]">{region}</div>
            <div className="px-3 py-1 text-[6px] text-[#d4562a] font-bold">{rev}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-[#d4562a]" />
        <span className="text-[6px] text-[#7a7068]">West leads by 30% — driven by Q3 product launch</span>
      </div>
    </div>
  );
}

const thumbnails = {
  stackwise: StackwiseThumbnail,
  capitalbase: CapitalBaseThumbnail,
  portal: PortalThumbnail,
  datachat: DataChatThumbnail,
};

function ProjectFeature({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });

  const Thumb = thumbnails[project.thumbnail];

  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease, delay: Math.min(index * 0.06, 0.18) }}
      className="group grid cursor-pointer border-t border-black/[0.13] py-9 lg:grid-cols-[88px_minmax(250px,0.72fr)_minmax(0,1.28fr)] lg:items-center lg:gap-10 lg:py-12"
    >
      <div className="mb-5 flex items-center justify-between lg:mb-0 lg:h-full lg:flex-col lg:items-start">
        <span className="font-mono text-xs tracking-[0.18em] text-[#a0978d]">{project.num}</span>
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#70675f]">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {project.status}
        </span>
      </div>

      <div className="mb-8 pr-4 lg:mb-0">
        <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          {project.category}
        </p>
        <h3 className="mb-3 text-3xl font-black tracking-[-0.04em] text-[#0a0a0a] sm:text-4xl">
          {project.title}
        </h3>
        <p className="mb-5 text-[15px] font-semibold leading-snug text-[#302c28]">{project.tagline}</p>
        <p className="max-w-md text-sm leading-[1.75] text-[#756d65]">{project.description}</p>
        <div className="mt-7 inline-flex items-center gap-3 border-b border-black/20 pb-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#26221f] transition-colors group-hover:border-accent group-hover:text-accent">
          Open product
          <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
        </div>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden bg-[#efe9df]">
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 0.9, ease, delay: 0.12 }}
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        >
          <Thumb />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.07]" />
      </div>
    </motion.a>
  );
}

export default function WhatImBuilding() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="building" className="bg-[#f9f7f4] py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease }}
          className="mb-16 grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.45fr)] md:items-end md:justify-between lg:mb-20"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#756d65]">
              <span className="h-px w-8 bg-accent" />
              Selected work
            </p>
            <h2 className="max-w-3xl text-balance text-5xl font-black leading-[0.95] tracking-[-0.055em] text-[#0a0a0a] sm:text-6xl lg:text-7xl">
              Things I’ve built.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.75] text-[#756d65] md:justify-self-end">
            Four live products covering personal finance, investment research, college football recruiting, and data analysis.
          </p>
        </motion.div>

        <div>
          {projects.map((project, i) => (
            <ProjectFeature key={project.title} project={project} index={i} />
          ))}
          <div className="border-t border-black/[0.13]" />
        </div>
      </div>
    </section>
  );
}
