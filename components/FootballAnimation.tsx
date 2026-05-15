"use client";

import { motion, useReducedMotion } from "framer-motion";

function FootballSVG() {
  return (
    <svg width="88" height="50" viewBox="0 0 88 50" fill="none" aria-hidden="true">
      {/* Body */}
      <ellipse cx="44" cy="25" rx="42" ry="23" fill="#c4521e" />
      {/* Lace panel */}
      <rect x="32" y="14" width="24" height="22" rx="2" fill="white" opacity="0.92" />
      {/* Center seam */}
      <line x1="44" y1="14" x2="44" y2="36" stroke="#c4521e" strokeWidth="1.5" />
      {/* Laces */}
      {[18, 23, 28, 33].map((y) => (
        <line key={y} x1="36" y1={y} x2="52" y2={y} stroke="#c4521e" strokeWidth="1.5" />
      ))}
      {/* Side seam curves */}
      <path d="M5 25 Q24 8 44 25 Q64 42 83 25" stroke="white" strokeWidth="1.2" fill="none" opacity="0.25" />
      <path d="M5 25 Q24 42 44 25 Q64 8 83 25" stroke="white" strokeWidth="1.2" fill="none" opacity="0.25" />
    </svg>
  );
}

export default function FootballAnimation() {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <motion.div
        className="absolute"
        style={{ top: "18%" }}
        initial={{ x: "-10vw", y: 0, rotate: 20, opacity: 0 }}
        animate={{
          x: ["-10vw", "25vw", "65vw", "110vw"],
          y: [0, -90, -45, 50],
          rotate: [20, -100, -280, -420],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.3, 0.72, 1],
          ease: "easeInOut",
          delay: 1.1,
        }}
      >
        <FootballSVG />
      </motion.div>
    </div>
  );
}
