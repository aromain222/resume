"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.35 }}
      className="relative flex items-end justify-center select-none pointer-events-none"
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 280 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-72"
          aria-hidden="true"
        >
          <defs>
            <clipPath id="face-opening">
              <path d="M 96 108 Q 140 98 184 108 L 180 172 Q 140 182 100 172 Z" />
            </clipPath>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="140" cy="435" rx="90" ry="7" fill="#0a0a0a" opacity="0.07" />

          {/* Pants */}
          <rect x="91" y="307" width="42" height="80" rx="7" fill="#141414" />
          <rect x="147" y="307" width="42" height="80" rx="7" fill="#141414" />

          {/* Cleats */}
          <rect x="82" y="378" width="56" height="22" rx="6" fill="#0a0a0a" />
          <rect x="142" y="378" width="56" height="22" rx="6" fill="#0a0a0a" />
          <rect x="88" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="100" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="112" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="124" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="148" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="160" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="172" y="400" width="4" height="7" rx="2" fill="#222" />
          <rect x="184" y="400" width="4" height="7" rx="2" fill="#222" />

          {/* Arms / sleeves */}
          <rect x="22" y="222" width="69" height="78" rx="15" fill="#5B2D8E" />
          <rect x="189" y="222" width="69" height="78" rx="15" fill="#5B2D8E" />

          {/* Jersey body */}
          <rect x="91" y="215" width="98" height="98" rx="4" fill="#5B2D8E" />

          {/* Jersey number */}
          <text
            x="140"
            y="296"
            textAnchor="middle"
            fontSize="34"
            fontWeight="900"
            fill="white"
            opacity="0.8"
            fontFamily="Arial Black, Arial, sans-serif"
          >
            55
          </text>

          {/* Gloves */}
          <rect x="14" y="288" width="79" height="26" rx="9" fill="#141414" />
          <rect x="187" y="288" width="79" height="26" rx="9" fill="#141414" />
          <rect x="14" y="292" width="79" height="3" rx="1.5" fill="#5B2D8E" />
          <rect x="187" y="292" width="79" height="3" rx="1.5" fill="#5B2D8E" />

          {/* Shoulder pad extensions */}
          <path d="M 4 215 L 91 211 L 91 249 Q 50 261 4 246 Z" fill="#0d0d0d" />
          <path d="M 276 215 L 189 211 L 189 249 Q 230 261 276 246 Z" fill="#0d0d0d" />

          {/* Chest plate */}
          <rect x="91" y="200" width="98" height="53" fill="#0d0d0d" />

          {/* Neck */}
          <rect x="124" y="166" width="32" height="50" rx="5" fill="#7D4E2D" />

          {/* Helmet shell */}
          <ellipse cx="140" cy="92" rx="80" ry="84" fill="#0a0a0a" />

          {/* Side air vents */}
          <ellipse cx="62" cy="106" rx="11" ry="22" fill="#141414" />
          <ellipse cx="218" cy="106" rx="11" ry="22" fill="#141414" />
          <ellipse cx="62" cy="97" rx="5" ry="4" fill="#0a0a0a" />
          <ellipse cx="62" cy="108" rx="5" ry="4" fill="#0a0a0a" />
          <ellipse cx="62" cy="119" rx="5" ry="4" fill="#0a0a0a" />
          <ellipse cx="218" cy="97" rx="5" ry="4" fill="#0a0a0a" />
          <ellipse cx="218" cy="108" rx="5" ry="4" fill="#0a0a0a" />
          <ellipse cx="218" cy="119" rx="5" ry="4" fill="#0a0a0a" />

          {/* Purple center stripe */}
          <rect x="131" y="10" width="18" height="96" rx="5" fill="#5B2D8E" />

          {/* Face opening background */}
          <path d="M 96 108 Q 140 98 184 108 L 180 172 Q 140 182 100 172 Z" fill="#5a3018" />

          {/* Face (clipped) */}
          <g clipPath="url(#face-opening)">
            <ellipse cx="140" cy="136" rx="48" ry="44" fill="#7D4E2D" />

            {/* Eyebrows */}
            <path d="M 111 115 L 132 119" stroke="#3D1F08" strokeWidth="4" strokeLinecap="round" />
            <path d="M 148 119 L 169 115" stroke="#3D1F08" strokeWidth="4" strokeLinecap="round" />

            {/* Eyes */}
            <ellipse cx="122" cy="126" rx="7.5" ry="7.5" fill="#1a1a1a" />
            <ellipse cx="158" cy="126" rx="7.5" ry="7.5" fill="#1a1a1a" />
            <ellipse cx="125" cy="124" rx="2.5" ry="2.5" fill="white" opacity="0.9" />
            <ellipse cx="161" cy="124" rx="2.5" ry="2.5" fill="white" opacity="0.9" />

            {/* Nose */}
            <path d="M 136 136 Q 130 147 137 152 Q 140 154 143 152 Q 150 147 144 136" stroke="#5a3520" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Mouth */}
            <path d="M 126 158 Q 140 166 154 158" stroke="#5a3520" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>

          {/* Face mask — vertical bars */}
          <rect x="128" y="107" width="5.5" height="72" rx="2.75" fill="#282828" />
          <rect x="146.5" y="107" width="5.5" height="72" rx="2.75" fill="#282828" />

          {/* Face mask — horizontal bars */}
          <rect x="90" y="114" width="100" height="5.5" rx="2.75" fill="#282828" />
          <rect x="92" y="136" width="96" height="5.5" rx="2.75" fill="#282828" />
          <rect x="98" y="158" width="84" height="5.5" rx="2.75" fill="#282828" />

          {/* Chin strap */}
          <path d="M 87 173 Q 140 194 193 173" stroke="#1a1a1a" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* Helmet top highlight */}
          <ellipse cx="140" cy="48" rx="35" ry="16" fill="white" opacity="0.04" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
