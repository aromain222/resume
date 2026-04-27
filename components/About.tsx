"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = [
  "Amherst College",
  "Student Athlete",
  "Political Science",
  "Black Studies",
  "Financial Literacy",
  "Football",
  "Fitness",
  "Bay Area",
  "Builder",
  "R&B",
  "Jazz",
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-white/[0.06] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-5 h-px bg-accent" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-zinc-600 font-medium">
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-[15px] text-zinc-300 leading-[1.8]">
              Student-athlete at Amherst College studying Political Science and
              Black Studies. A lot of my life is shaped by football, fitness,
              and the discipline that comes with both.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              I&apos;m especially passionate about financial literacy. Access to
              financial knowledge is uneven and that has real consequences. It
              affects the decisions people can make, the risks they take, and
              the opportunities they even know exist. I spend a lot of time
              thinking about how to make financial systems easier to understand
              and more accessible, especially for people who were not naturally
              exposed to them. That shows up in the things I build and the
              problems I choose to spend time on.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              I like building and improving systems. I naturally pay attention
              to what feels slow, confusing, or unnecessarily complex and try to
              simplify it. Most of what I work on comes from that instinct to
              take something that feels difficult to navigate and make it more
              intuitive and useful.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              Football and training influence how I approach everything else.
              They have taught me consistency, structure, and how to stay locked
              in even when things are difficult or repetitive. There is a level
              of discipline required to show up every day, improve incrementally,
              and trust the process even when results are not immediate. That
              mindset carries into how I learn, how I build, and how I handle
              challenges.
            </p>
            <p className="text-[15px] text-zinc-500 leading-[1.8]">
              I care about growth, both personally and in the people around me.
              I want to keep putting myself in environments that push me, force
              me to adapt, and raise my standard. At a high level, I am focused
              on getting better, building things that matter, and creating
              access where it does not already exist.
            </p>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="flex flex-wrap gap-2 content-start"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.04 }}
                className="text-[10px] tracking-[0.18em] uppercase text-zinc-500 border border-white/[0.08] px-3 py-1.5 font-medium hover:border-accent/40 hover:text-accent transition-colors duration-200"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
