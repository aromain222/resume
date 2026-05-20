"use client";

import { motion, useReducedMotion } from "framer-motion";

function FootballSVG() {
  return (
    <svg width="104" height="48" viewBox="0 0 104 48" fill="none" aria-hidden="true">
      {/* Body */}
      <ellipse cx="52" cy="24" rx="50" ry="22" fill="#7B3200" />
      {/* Highlight */}
      <ellipse cx="44" cy="15" rx="24" ry="9" fill="#A0450A" opacity="0.55" />
      {/* Seam curves */}
      <path d="M4 24 Q26 5 52 24 Q78 43 100 24" stroke="#4A1E00" strokeWidth="1.4" fill="none" />
      <path d="M4 24 Q26 43 52 24 Q78 5 100 24" stroke="#4A1E00" strokeWidth="1.4" fill="none" />
      {/* Left tip stripes */}
      <path d="M7 16 Q3 24 7 32" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.88" />
      <path d="M13 12 Q8 24 13 36" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.88" />
      {/* Right tip stripes */}
      <path d="M97 16 Q101 24 97 32" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.88" />
      <path d="M91 12 Q96 24 91 36" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" opacity="0.88" />
      {/* Lace verticals */}
      <line x1="46" y1="15" x2="46" y2="33" stroke="white" strokeWidth="1" opacity="0.6" />
      <line x1="52" y1="15" x2="52" y2="33" stroke="white" strokeWidth="1" opacity="0.6" />
      <line x1="58" y1="15" x2="58" y2="33" stroke="white" strokeWidth="1" opacity="0.6" />
      {/* Laces */}
      <line x1="43" y1="17" x2="61" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="21" x2="61" y2="21" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="25" x2="61" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="29" x2="61" y2="29" stroke="white" strokeWidth="2" strokeLinecap="round" />
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
        style={{
          top: "18%",
          filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.28))",
        }}
        initial={{ x: "-12vw", y: 0, rotate: -16, opacity: 0 }}
        animate={{
          x: ["-12vw", "22vw", "63vw", "112vw"],
          y: [0, -115, -52, 72],
          rotate: [-16, -6, 3, 12],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.8,
          times: [0, 0.32, 0.70, 1],
          ease: [0.22, 1, 0.36, 1],
          delay: 1.0,
          repeat: Infinity,
          repeatDelay: 5,
        }}
      >
        <FootballSVG />
      </motion.div>
    </div>
  );
}
