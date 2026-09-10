"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

const ease = [0.16, 1, 0.3, 1] as const;

/* The hero's mask-slide, reused for every section heading so the page has one
   reveal vocabulary instead of a generic fade on everything. The reveal is
   failsafe-backed: a mask that never lifts would ship the heading blank. */
export default function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { ref, revealed } = useReveal<HTMLHeadingElement>();
  const shown = reduceMotion || revealed;

  return (
    <h2
      ref={ref}
      className={`type-display text-[clamp(2rem,4.2vw,3.25rem)] text-bone ${className}`}
    >
      <span className="block overflow-hidden">
        <motion.span
          initial={false}
          animate={{ transform: shown ? "translateY(0%)" : "translateY(108%)" }}
          transition={{ duration: reduceMotion ? 0 : 0.75, ease }}
          className="block"
        >
          {children}
        </motion.span>
      </span>
    </h2>
  );
}
