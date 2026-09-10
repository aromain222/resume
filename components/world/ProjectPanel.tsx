"use client";

import Image from "next/image";
import type { Project } from "@/lib/portfolioData";
import { useTabNavigation } from "../TabNavigationContext";
import PanelShell from "./PanelShell";
import PipelineDiagram from "./PipelineDiagram";

export default function ProjectPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { goTo } = useTabNavigation();
  const live = project.status === "Live";

  return (
    <PanelShell eyebrow={`${project.category} · world`} onClose={onClose}>
      {project.image && (
        <div className="relative mb-6 aspect-[16/10] overflow-hidden border border-line bg-stage">
          <Image
            src={project.image}
            alt={project.alt ?? ""}
            fill
            sizes="420px"
            className="object-cover object-top"
          />
        </div>
      )}

      <h3 className="type-display text-[clamp(1.6rem,3vw,2.1rem)] text-bone">{project.title}</h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-bone-soft">{project.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        <span className={`type-label text-[10px] ${live ? "text-bone" : "text-bone-faint"}`}>
          {project.status}
        </span>
        <span className="type-label text-[10px] text-maroon">{project.proof}</span>
      </div>

      {project.pipeline && <PipelineDiagram stages={project.pipeline} />}

      <div className="mt-8 flex flex-wrap items-center gap-5">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label pressable inline-block bg-bone px-6 py-3 text-[11px] text-stage hover:bg-maroon"
          >
            Open live &#8599;
          </a>
        )}
        <button
          onClick={() => {
            onClose();
            goTo("work");
          }}
          className="stage-link type-label cursor-pointer text-[11px] text-bone"
        >
          Full case study
        </button>
      </div>
    </PanelShell>
  );
}
