"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useResume } from "./ResumeContext";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience as timeline, type ExperienceStop as Stop } from "@/lib/portfolioData";

const ease = [0.16, 1, 0.3, 1] as const;

function Row({ item, index }: { item: Stop; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const expandable = !!item.bullets?.length;

  const body = (
    <div className="grid w-full grid-cols-[4.5rem_minmax(0,1fr)] items-baseline gap-x-5 gap-y-2 py-6 sm:grid-cols-[6rem_minmax(0,22ch)_minmax(0,1fr)_auto] sm:gap-x-8 lg:py-7">
      <span
        className={`type-label text-[11px] tabular-nums ${
          item.now ? "text-maroon" : "text-bone-faint"
        }`}
      >
        {item.period}
      </span>

      <span className="col-span-1 flex items-baseline gap-3">
        <span className="text-[19px] font-bold tracking-[-0.01em] text-bone sm:text-[21px]">
          {item.company}
        </span>
        {item.now && (
          <span className="type-label shrink-0 bg-maroon px-2 py-1 text-[9px] text-white">
            Now
          </span>
        )}
      </span>

      <span className="col-start-2 sm:col-start-3">
        <span className="type-label block text-[10px] text-bone-faint">
          {item.role}
        </span>
        <span className="mt-2 block max-w-[54ch] text-[14px] leading-[1.65] text-bone-soft">
          {item.detail}
        </span>
      </span>

      {expandable && (
        <motion.span
          aria-hidden
          animate={{ transform: expanded ? "rotate(45deg)" : "rotate(0deg)" }}
          transition={{ duration: 0.22, ease }}
          className="col-start-2 justify-self-start text-xl leading-none text-maroon sm:col-start-4 sm:justify-self-end"
        >
          +
        </motion.span>
      )}
    </div>
  );

  return (
    <Reveal
      variant="slide"
      delay={Math.min(index * 0.03, 0.12)}
      className="relative"
    >
      {/* The rule draws itself, left to right, as the row arrives. */}
      <Reveal
        variant="rule"
        as="span"
        aria-hidden
        style={{ transformOrigin: "left" }}
        className="absolute inset-x-0 top-0 h-px bg-line"
      />

      {expandable ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="block w-full cursor-pointer text-left transition-colors duration-200 [@media(hover:hover)]:hover:bg-stage-raised"
        >
          {body}
        </button>
      ) : (
        body
      )}

      {expandable && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="bullets"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <ul className="space-y-2.5 pb-8 sm:ml-[6rem] sm:pl-8">
                {item.bullets!.map((b) => (
                  <li
                    key={b}
                    className="flex max-w-[74ch] gap-3 text-[13.5px] leading-[1.65] text-bone-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-[9px] h-px w-3 shrink-0 bg-maroon"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Reveal>
  );
}

export default function Experience() {
  const { setOpen } = useResume();

  return (
    <section
      id="path"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading>The path</SectionHeading>
        <button
          onClick={() => setOpen(true)}
          className="stage-link type-label cursor-pointer pb-2 text-[12px] text-bone"
        >
          Full resume
        </button>
      </div>

      <div className="max-w-[1180px] border-b border-line">
        {timeline.map((item, index) => (
          <Row key={`${item.company}-${item.role}`} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
