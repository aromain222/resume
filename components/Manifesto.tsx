"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const LINES = [
  "Practice is at seven.",
  "I write code after.",
  "Neither one is optional.",
];

function Word({
  progress,
  range,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = LINES.flatMap((line, li) =>
    line.split(" ").map((w) => ({ word: w, line: li }))
  );
  const step = 1 / words.length;

  return (
    <div ref={ref} className="mx-auto max-w-[1600px] px-6 py-36 sm:px-10 lg:px-16 lg:py-56">
      <p className="type-display max-w-[16ch] text-[clamp(2.5rem,7vw,6rem)] text-bone">
        {reduceMotion
          ? LINES.join(" ")
          : words.map((w, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i * step, Math.min(1, i * step + step * 1.6)]}
              >
                {w.word}
              </Word>
            ))}
      </p>
    </div>
  );
}
