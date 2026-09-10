"use client";

import Image from "next/image";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { projects, type Project } from "@/lib/portfolioData";

function StatusMark({ status }: { status: Project["status"] }) {
  const live = status === "Live";
  return (
    <span className={`type-label text-[10px] ${live ? "text-bone" : "text-bone-faint"}`}>
      {status}
    </span>
  );
}

function Shot({ project, priority }: { project: Project; priority?: boolean }) {
  if (!project.image) {
    /* No public URL to screenshot: the panel states that plainly instead of faking a preview. */
    return (
      <div className="relative flex aspect-[16/10] items-end overflow-hidden border border-line bg-stage-raised p-8">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="grid h-full grid-cols-6 grid-rows-4">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="border-b border-r border-bone" />
            ))}
          </div>
        </div>
        <p className="type-display relative max-w-[16ch] text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[0.95] text-bone-faint">
          {project.placeholderTag ?? project.category}
        </p>
      </div>
    );
  }

  return (
    <Reveal
      variant="wipe"
      className="relative aspect-[16/10] overflow-hidden border border-line bg-stage-raised"
    >
      <Image
        src={project.image}
        alt={project.alt ?? ""}
        fill
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority={priority}
        className="object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
      />
    </Reveal>
  );
}

function ProjectMeta({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div className={large ? "" : "mt-5"}>
      <div className="flex items-start justify-between gap-6">
        <h3
          className={`type-display text-bone transition-colors duration-200 group-hover:text-maroon ${
            large ? "text-[clamp(2rem,4vw,3.25rem)]" : "text-[clamp(1.6rem,2.4vw,2.1rem)]"
          }`}
        >
          {project.title}
        </h3>
        {project.url && (
          <span
            aria-hidden
            className="mt-1 shrink-0 text-lg text-bone-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-maroon"
          >
            ↗
          </span>
        )}
      </div>
      <p
        className={`mt-2 font-medium text-bone-soft ${
          large ? "max-w-[46ch] text-[15px] leading-[1.7]" : "text-[14px] leading-[1.6]"
        }`}
      >
        {large ? project.description : project.tagline}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-3">
        <StatusMark status={project.status} />
        <span className="type-label text-[10px] text-bone-faint">{project.category}</span>
        <span className="type-label text-[10px] text-maroon">{project.proof}</span>
      </div>
    </div>
  );
}

function ProjectBlock({
  project,
  large,
  priority,
}: {
  project: Project;
  large?: boolean;
  priority?: boolean;
}) {
  const inner = large ? (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
      <Shot project={project} priority={priority} />
      <ProjectMeta project={project} large />
    </div>
  ) : (
    <div>
      <Shot project={project} />
      <ProjectMeta project={project} />
    </div>
  );

  if (!project.url) {
    return <div className="group block">{inner}</div>;
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      {inner}
    </a>
  );
}

export default function WhatImBuilding() {
  const [lead, ...rest] = projects;

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading>The work</SectionHeading>
        <p className="max-w-[34ch] pb-2 text-[14px] leading-[1.6] text-bone-soft">
          Three of the four are open to anyone. Click a screenshot and try it.
        </p>
      </div>

      <ProjectBlock project={lead} large priority />

      <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
        {rest.map((project) => (
          <ProjectBlock key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
