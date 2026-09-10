"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const ease = [0.16, 1, 0.3, 1] as const;

type Idea = {
  title: string;
  tag: string;
  paragraphs: string[];
};

const ideas: Idea[] = [
  {
    title: "AI and who gets to make things",
    tag: "AI · Access",
    paragraphs: [
      "A lot of creative people never get the chance to show what they can do. Not because they lack talent, but because they lack access to tools, technical skills, and the networks that put work in front of the right people. That gap has been consistent, and it has been especially visible for young Black and Brown creators.",
      "Tools like Cursor and Claude Code make it easier for someone with an idea to build a first version. You do not need to know everything before you start, and the distance between an idea and something you can show people is much shorter.",
      "That shift changes who gets to participate. More people can experiment, build, and iterate without needing formal training or permission. It opens the door for people with perspective and creativity to express it through things they can actually share and show.",
      "At the same time, the ability to build does not automatically lead to visibility. The gap around who gets seen and recognized still exists. Creating something meaningful is one step, but getting that work in front of the right audience is another layer entirely.",
      "The harder part is still getting seen. More people can make things now, but access to an audience, useful feedback, and real opportunity still matters—especially for people who have usually been left out.",
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
      "That changes how people learn the job. Repetition used to hide gaps in understanding; AI moves past the repetitive part quickly. You have to know what the model means, not just how to produce it.",
      "What is left is the thinking.",
      "Analysts are going to be expected to question assumptions, understand drivers, and explain outcomes much earlier in their careers. The barrier to producing work is lower, but the bar for understanding it is much higher. There is less room to hide behind the work itself.",
      "This creates a split. Some people will struggle because the repetition that once built their skill is gone. Others will accelerate because they can operate at a higher level from the start.",
      "AI does not remove the need for analysts. It removes the version of the analyst whose value came from manual execution. The new version is expected to think like a decision-maker much earlier, whether they are ready or not.",
    ],
  },
];

function IdeaRow({ idea, index }: { idea: Idea; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Reveal
      as="article"
      variant="fade"
      delay={Math.min(index * 0.06, 0.18)}
      className="border-t border-line py-10 last:border-b lg:py-12"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(240px,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <span className="type-label mb-4 block text-[10px] text-maroon-bright">{idea.tag}</span>
          <h3 className="text-balance type-display text-[clamp(1.6rem,3.5vw,2.6rem)] text-bone">
            {idea.title}
          </h3>
        </div>

        <div>
          <p className="max-w-[62ch] text-[15px] leading-[1.8] text-bone-soft">
            {idea.paragraphs[0]}
          </p>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="body"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease }}
                className="overflow-hidden"
              >
                <div className="space-y-5 pt-5">
                  {idea.paragraphs.slice(1).map((p, i) => (
                    <p key={i} className="max-w-[62ch] text-[14.5px] leading-[1.8] text-bone-soft">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="stage-link type-label mt-7 cursor-pointer text-[12px] text-bone"
          >
            {expanded ? "Close essay" : "Read full essay"}
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function Ideas() {
  return (
    <section id="writing" className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
      <div className="mb-10">
        <SectionHeading>Writing</SectionHeading>
      </div>
      <div>
        {ideas.map((idea, i) => (
          <IdeaRow key={idea.title} idea={idea} index={i} />
        ))}
      </div>
    </section>
  );
}
