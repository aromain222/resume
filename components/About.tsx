"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = [
  { label: "Amherst College", color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Student Athlete", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  { label: "Political Science", color: "bg-violet-100 text-violet-700 border-violet-200" },
  { label: "Black Studies", color: "bg-rose-100 text-rose-700 border-rose-200" },
  { label: "Financial Literacy", color: "bg-amber-100 text-amber-700 border-amber-200" },
  { label: "Football", color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Fitness", color: "bg-cyan-100 text-cyan-700 border-cyan-200" },
  { label: "Bay Area", color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Builder", color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
  { label: "R&B", color: "bg-pink-100 text-pink-700 border-pink-200" },
  { label: "Jazz", color: "bg-purple-100 text-purple-700 border-purple-200" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="border-t border-black/[0.07] py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-6 h-[2px] bg-accent rounded-full" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-[#6b7280] font-semibold">
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
            <p className="text-[15px] text-[#0f0f0f] leading-[1.8] font-medium">
              Student-athlete at Amherst College studying Political Science and
              Black Studies. A lot of my life is shaped by football, fitness,
              and the discipline that comes with both.
            </p>
            <p className="text-[15px] text-[#4b5563] leading-[1.8]">
              I&apos;m especially passionate about financial literacy. Access to
              financial knowledge is uneven and that has real consequences. It
              affects the decisions people can make, the risks they take, and
              the opportunities they even know exist. I spend a lot of time
              thinking about how to make financial systems easier to understand
              and more accessible, especially for people who were not naturally
              exposed to them. That shows up in the things I build and the
              problems I choose to spend time on.
            </p>
            <p className="text-[15px] text-[#4b5563] leading-[1.8]">
              I like building and improving systems. I naturally pay attention
              to what feels slow, confusing, or unnecessarily complex and try to
              simplify it. Most of what I work on comes from that instinct to
              take something that feels difficult to navigate and make it more
              intuitive and useful.
            </p>
            <p className="text-[15px] text-[#4b5563] leading-[1.8]">
              Football and training influence how I approach everything else.
              They have taught me consistency, structure, and how to stay locked
              in even when things are difficult or repetitive. That mindset
              carries into how I learn, how I build, and how I handle challenges.
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
                key={tag.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, ease, delay: 0.25 + i * 0.04 }}
                className={`text-[11px] tracking-[0.12em] uppercase font-semibold px-3 py-1.5 rounded-full border ${tag.color}`}
              >
                {tag.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
