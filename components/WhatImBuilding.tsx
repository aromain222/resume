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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://image.thum.io/get/width/1200/crop/800/https://stackr-silk.vercel.app"
      alt="Stackwise"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      loading="lazy"
    />
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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="https://image.thum.io/get/width/1200/crop/800/https://jal-football.vercel.app"
      alt="Transfer Portal"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      loading="lazy"
    />
  );
}

const thumbnails = { stackwise: StackwiseThumbnail, capitalbase: CapitalBaseThumbnail, portal: PortalThumbnail };

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
            <path d="M1 8L8 1M8 1H2.5M8 1v5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
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
