"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";

const ease = [0.16, 1, 0.3, 1] as const;

export type RevealVariant = "wipe" | "fade" | "slide" | "rule";

/**
 * Scroll reveal with a guaranteed end state.
 *
 * Framer's `whileInView` leaves content in its hidden `initial` state if the
 * observer never fires — full-page screenshots, print, a background tab, or a
 * scroll that jumps past the trigger — which ships the section blank. This
 * wrapper reveals on intersection or on a timer, whichever lands first.
 */
const variants: Record<
  RevealVariant,
  { hidden: Record<string, string | number>; shown: Record<string, string | number>; duration: number }
> = {
  wipe: {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    shown: { clipPath: "inset(0 0 0% 0)" },
    duration: 0.7,
  },
  fade: { hidden: { opacity: 0 }, shown: { opacity: 1 }, duration: 0.5 },
  slide: {
    hidden: { opacity: 0, transform: "translateX(-12px)" },
    shown: { opacity: 1, transform: "translateX(0px)" },
    duration: 0.45,
  },
  rule: {
    hidden: { transform: "scaleX(0)" },
    shown: { transform: "scaleX(1)" },
    duration: 0.6,
  },
};

export default function Reveal({
  children,
  variant = "fade",
  delay = 0,
  className = "",
  as = "div",
  style,
  ...rest
}: {
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "article";
  style?: React.CSSProperties;
} & Record<string, unknown>) {
  const reduceMotion = useReducedMotion();
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const shown = reduceMotion || revealed;
  const config = variants[variant];
  const Tag = motion[as];

  return (
    <Tag
      ref={ref}
      initial={false}
      animate={shown ? config.shown : config.hidden}
      transition={{
        duration: reduceMotion ? 0 : config.duration,
        ease,
        delay: shown && !reduceMotion ? delay : 0,
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
