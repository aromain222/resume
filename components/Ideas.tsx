"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type Idea = {
  title: string;
  tag: string;
  paragraphs: string[];
};

const ideas: Idea[] = [
  {
    title: "AI as a Platform for Creative Access",
    tag: "AI · Access",
    paragraphs: [
      "A lot of creative people never get the chance to show what they can do. Not because they lack talent, but because they lack access to tools, technical skills, and the networks that put work in front of the right people. That gap has been consistent, and it has been especially visible for young Black and Brown creators.",
      "AI is starting to shift that in a meaningful way. Tools like Cursor and Claude Code make it possible to build without a deep technical background. Someone with an idea can now turn it into something real, whether that is an app, a tool, or a system. The distance between thinking of something and actually creating it is smaller than it has ever been.",
      "That shift changes who gets to participate. More people can experiment, build, and iterate without needing formal training or permission. It opens the door for people with perspective and creativity to express it through things they can actually share and show.",
      "At the same time, the ability to build does not automatically lead to visibility. The gap around who gets seen and recognized still exists. Creating something meaningful is one step, but getting that work in front of the right audience is another layer entirely.",
      "The opportunity now is to close that gap. As more people gain the ability to create, the focus shifts toward making sure their work is visible and taken seriously. The impact of these tools will depend on how well they connect creation to recognition, especially for the people who have historically been left out of those systems.",
    ],
  },
  {
    title: 'AI, Finance, and the End of "Learning by Repetition"',
    tag: "AI · Finance",
    paragraphs: [
      "A lot of early career roles in finance have always been built on repetition. Analysts spend hours building models, cleaning data, updating comps, and formatting decks. The work is not valuable because it is efficient. It is valuable because it forces exposure. Over time, that repetition is supposed to turn into intuition.",
      "AI is breaking that model.",
      "Work that used to take hours in Excel can now be generated in seconds. A DCF, a comps analysis, or even a first pass at an investment memo no longer requires the same level of manual effort. The mechanical layer of finance is being compressed. Fewer people are needed to produce the same output, and the traditional entry point into the industry starts to shrink.",
      "But the more important shift is not about fewer jobs. It is about what the job actually becomes.",
      "The value is no longer in building the model. It is in understanding it. Early career roles are moving away from execution and toward interpretation. The question is no longer whether you can put the model together. The question is whether you know what it is saying, whether the assumptions make sense, and whether you trust the output enough to act on it.",
      "That changes the entire skill curve. The old system allowed people to rely on process. You could get by on effort and repetition, even if your understanding lagged behind. AI removes that layer. It speeds past the part of the job that used to quietly train you.",
      "What is left is the thinking.",
      "Analysts are going to be expected to question assumptions, understand drivers, and explain outcomes much earlier in their careers. The barrier to producing work is lower, but the bar for understanding it is much higher. There is less room to hide behind the work itself.",
      "This creates a split. Some people will struggle because the repetition that once built their skill is gone. Others will accelerate because they can operate at a higher level from the start.",
      "AI does not remove the need for analysts. It removes the version of the analyst whose value came from manual execution. The new version is expected to think like a decision-maker much earlier, whether they are ready or not.",
    ],
  },
];

function IdeaRow({ idea, index }: { idea: Idea; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: index * 0.12 }}
      className="border-t border-black/[0.14] py-8 lg:py-10"
    >
      <div className="grid gap-6 lg:grid-cols-[76px_minmax(230px,0.72fr)_minmax(0,1.28fr)] lg:gap-10">
        <span className="font-mono text-xs tracking-[0.15em] text-[#a0978d]">0{index + 1}</span>
        <div>
          <span className="mb-4 block font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            {idea.tag}
          </span>
          <h3 className="text-balance text-2xl font-black leading-[1.15] tracking-[-0.035em] text-[#0a0a0a] sm:text-3xl">
            {idea.title}
          </h3>
        </div>

        <div>
          <p className="max-w-2xl text-[15px] leading-[1.8] text-[#4e4842]">
            {idea.paragraphs[0]}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease }}
                className="overflow-hidden"
              >
                <div className="space-y-5 pt-5">
                  {idea.paragraphs.slice(1).map((p, i) => (
                    <p key={i} className="max-w-2xl text-[14px] leading-[1.85] text-[#756d65]">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-7 flex cursor-pointer items-center gap-3 border-b border-black/20 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#70675f] transition-colors hover:border-accent hover:text-accent"
          >
            {expanded ? "Close essay" : "Read full essay"}
            <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.25, ease }}>
              +
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Ideas() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ideas" className="border-t border-black/[0.08] bg-[#f3eee6] py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-14 grid gap-5 md:grid-cols-[1fr_0.55fr] md:items-end lg:mb-16"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#756d65]">
              <span className="h-px w-8 bg-accent" />
              Writing
            </p>
            <h2 className="text-5xl font-black tracking-[-0.055em] text-[#0a0a0a] sm:text-6xl">A few things I’ve written.</h2>
          </div>
          <p className="max-w-sm text-sm leading-[1.75] text-[#756d65] md:justify-self-end">
            Essays about AI, finance, access, and how entry-level work is changing.
          </p>
        </motion.div>

        <div>
          {ideas.map((idea, i) => (
            <IdeaRow key={idea.title} idea={idea} index={i} />
          ))}
          <div className="border-t border-black/[0.14]" />
        </div>
      </div>
    </section>
  );
}
