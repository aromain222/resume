"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTextScramble } from "@/lib/animations";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = [
  {
    label: "Amherst College",
    bio: "Class of '27. ~1,900 students. #2 liberal arts in the US.",
  },
  {
    label: "Student Athlete",
    bio: "Defensive lineman. Playing since freshman year of high school.",
  },
  {
    label: "Political Science",
    bio: "I love seeing how systems are formed and changed. Interested in neocolonialism and neofeminism.",
  },
  {
    label: "Black Studies",
    bio: "Marcus Garvey, CLR James, Malcolm X.",
  },
  {
    label: "Financial Literacy",
    bio: "Most people were never taught how money actually works. That matters.",
  },
  {
    label: "Football",
    bio: "Defensive lineman. The game teaches you how to compete.",
  },
  {
    label: "Fitness",
    bio: "Bench 315, squat 500. In the gym before most people are up.",
  },
  {
    label: "Bay Area",
    bio: "From San Mateo. Lived there for 21 years.",
  },
  {
    label: "Builder",
    bio: "3 live products. More in progress.",
  },
  {
    label: "R&B",
    bio: "Frank Ocean, SZA, Brent Faiyaz, Summer Walker.",
  },
  {
    label: "Jazz",
    bio: "Miles Davis, John Coltrane, Thelonious Monk.",
  },
];

function Tag({ tag, index, inView }: { tag: typeof tags[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, ease, delay: 0.25 + index * 0.04 }}
    >
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="block text-[11px] tracking-[0.12em] uppercase font-medium px-3 py-1.5 border border-black/20 text-[#3d3730] hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
      >
        {tag.label}
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-44 bg-white border border-black/[0.1] px-3 py-2.5 shadow-md z-50 pointer-events-none"
          >
            <p className="text-[12px] text-[#3d3730] leading-relaxed">
              {tag.bio}
            </p>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-white" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-black/10 -mt-px" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [labelHover, setLabelHover] = useState(false);
  const sectionLabel = useTextScramble("About", labelHover);

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
          <span
            className="text-[11px] tracking-[0.22em] uppercase text-[#7a7068] font-semibold cursor-default select-none"
            onMouseEnter={() => { setLabelHover(false); setTimeout(() => setLabelHover(true), 0); }}
            onMouseLeave={() => setLabelHover(false)}
          >
            {sectionLabel}
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
            <p className="text-[15px] text-[#0a0a0a] leading-[1.8] font-medium">
              Student-athlete at Amherst College studying Political Science and
              Black Studies. A lot of my life is shaped by football, fitness,
              and the discipline that comes with both.
            </p>
            <p className="text-[15px] text-[#5a5450] leading-[1.8]">
              I&apos;m especially passionate about financial literacy. Access to
              financial knowledge is uneven and that has real consequences. It
              affects the decisions people can make, the risks they take, and
              the opportunities they even know exist. I spend a lot of time
              thinking about how to make financial systems easier to understand
              and more accessible, especially for people who were not naturally
              exposed to them.
            </p>
            <p className="text-[15px] text-[#5a5450] leading-[1.8]">
              I like building and improving systems. I naturally pay attention
              to what feels slow, confusing, or unnecessarily complex and try to
              simplify it. Most of what I work on comes from that instinct to
              take something that feels difficult to navigate and make it more
              intuitive and useful.
            </p>
            <p className="text-[15px] text-[#5a5450] leading-[1.8]">
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
              <Tag key={tag.label} tag={tag} index={i} inView={inView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
