"use client";

import { motion, useReducedMotion } from "framer-motion";

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
          {/* ── GROUND SHADOW ── */}
          <ellipse cx="140" cy="437" rx="78" ry="6" fill="#0a0a0a" opacity="0.07" />

          {/* ── SHOES ── */}
          <path d="M 82 422 C 82 420 86 419 92 419 L 134 419 C 138 419 138 421 136 434 C 134 437 84 437 82 434 Z" fill="#1a1a1a" />
          <path d="M 82 434 L 136 434 L 134 439 L 84 439 Z" fill="#2e2e2e" />
          <path d="M 144 422 C 144 420 148 419 154 419 L 196 419 C 200 419 200 421 198 434 C 196 437 146 437 144 434 Z" fill="#1a1a1a" />
          <path d="M 144 434 L 198 434 L 196 439 L 146 439 Z" fill="#2e2e2e" />

          {/* ── JOGGER ANKLE CUFFS ── */}
          <rect x="84" y="410" width="52" height="13" rx="4" fill="#1e1e1e" />
          <rect x="144" y="410" width="52" height="13" rx="4" fill="#1e1e1e" />

          {/* ── PANT LEGS ── */}
          <path d="M 92 340 C 90 365 86 390 85 410 L 136 410 C 136 390 136 365 134 340 Z" fill="#141414" />
          <path d="M 148 340 C 150 365 150 390 150 410 L 195 410 C 196 390 194 365 188 340 Z" fill="#141414" />

          {/* crotch seam */}
          <path d="M 92 340 C 96 356 116 363 140 363 C 164 363 184 356 188 340 Z" fill="#1c1c1c" />

          {/* ── WAISTBAND ── */}
          <rect x="88" y="326" width="104" height="17" rx="5" fill="#1e1e1e" />
          <rect x="88" y="326" width="104" height="4" rx="2" fill="#282828" />

          {/* ── ARMS ── */}
          {/* Left arm — tapers toward wrist */}
          <path d="M 56 207 C 52 248 44 302 40 358 L 90 358 C 90 302 90 248 90 207 Z" fill="#5B2D8E" />
          <rect x="38" y="352" width="54" height="13" rx="4" fill="#4a2278" />
          {/* Left hand */}
          <ellipse cx="65" cy="374" rx="22" ry="15" fill="#7D4E2D" />

          {/* Right arm */}
          <path d="M 224 207 C 228 248 236 302 240 358 L 190 358 C 190 302 190 248 190 207 Z" fill="#5B2D8E" />
          <rect x="188" y="352" width="54" height="13" rx="4" fill="#4a2278" />
          {/* Right hand */}
          <ellipse cx="215" cy="374" rx="22" ry="15" fill="#7D4E2D" />

          {/* ── TORSO (quarter-zip body) ── */}
          <path d="M 90 207 C 90 256 90 298 90 328 L 190 328 C 190 298 190 256 190 207 Z" fill="#5B2D8E" />
          {/* Side depth */}
          <path d="M 90 207 C 90 255 90 295 90 328 L 102 328 C 103 295 104 255 106 207 Z" fill="#4a2278" opacity="0.55" />
          <path d="M 190 207 C 190 255 190 295 190 328 L 178 328 C 177 295 176 255 174 207 Z" fill="#4a2278" opacity="0.55" />

          {/* ── SHOULDER CURVES ── */}
          <path d="M 56 207 C 58 204 70 202 90 202 L 90 212 C 72 212 62 215 60 218 Z" fill="#5B2D8E" />
          <path d="M 224 207 C 222 204 210 202 190 202 L 190 212 C 208 212 218 215 220 218 Z" fill="#5B2D8E" />

          {/* ── COLLAR / ZIP DETAIL ── */}
          <path d="M 116 207 L 164 207 L 166 215 C 154 220 126 220 114 215 Z" fill="#4a2278" />
          <path d="M 116 207 L 140 207 L 140 216 C 130 216 120 214 116 207 Z" fill="#3d1d6e" />
          <path d="M 164 207 L 140 207 L 140 216 C 150 216 160 214 164 207 Z" fill="#4a2278" />
          {/* Zipper */}
          <line x1="140" y1="207" x2="140" y2="268" stroke="#2a1550" strokeWidth="2.5" />
          <rect x="136" y="264" width="8" height="7" rx="2" fill="#2a1550" />

          {/* ── NECK ── */}
          <path d="M 122 167 C 120 180 120 196 122 208 L 158 208 C 160 196 160 180 158 167 Z" fill="#6B3D1E" />

          {/* ── EARS ── */}
          <ellipse cx="86" cy="118" rx="11" ry="14" fill="#7D4E2D" />
          <ellipse cx="86" cy="118" rx="6" ry="9" fill="#6a3d1b" />
          <ellipse cx="194" cy="118" rx="11" ry="14" fill="#7D4E2D" />
          <ellipse cx="194" cy="118" rx="6" ry="9" fill="#6a3d1b" />

          {/* ── HEAD ── */}
          <ellipse cx="140" cy="112" rx="54" ry="58" fill="#7D4E2D" />
          {/* Jaw shadow */}
          <path d="M 100 155 Q 140 174 180 155 Q 175 168 140 170 Q 105 168 100 155 Z" fill="#6a3d1b" opacity="0.45" />

          {/* ── HAIR BASE CAP ── */}
          <path d="M 88 87 C 90 65 106 55 140 53 C 174 55 190 65 192 87 Z" fill="#141414" />

          {/* ── TWO-STRAND TWISTS ── */}
          {/* Each twist: main shape + darker shade stripe for the "twist" texture */}

          {/* Twist 1 — far left, leans left */}
          <path d="M 101 83 C 98 67 93 46 88 20 L 96 18 C 99 44 104 65 109 81 Z" fill="#1a1a1a" />
          <path d="M 105 81 C 103 65 100 46 96 20 L 98 18 C 101 44 105 64 109 80 Z" fill="#0a0a0a" opacity="0.55" />

          {/* Twist 2 */}
          <path d="M 113 79 C 112 62 112 40 114 14 L 122 14 C 121 40 120 62 120 79 Z" fill="#1a1a1a" />
          <path d="M 117 79 C 117 62 117 40 118 14 L 120 14 C 119 40 119 62 119 79 Z" fill="#0a0a0a" opacity="0.5" />

          {/* Twist 3 */}
          <path d="M 125 76 C 125 58 126 37 128 11 L 136 11 C 134 37 133 58 133 76 Z" fill="#141414" />
          <path d="M 129 76 C 129 58 130 37 131 11 L 133 11 C 132 37 132 57 132 76 Z" fill="#0a0a0a" opacity="0.5" />

          {/* Twist 4 — center */}
          <path d="M 136 74 C 136 55 137 34 139 8 L 147 8 C 145 34 144 55 144 74 Z" fill="#1a1a1a" />
          <path d="M 141 74 C 141 55 142 34 142 8 L 144 8 C 144 34 143 55 143 74 Z" fill="#0a0a0a" opacity="0.5" />

          {/* Twist 5 */}
          <path d="M 148 76 C 148 58 149 37 152 11 L 160 11 C 158 37 156 58 155 76 Z" fill="#141414" />
          <path d="M 152 75 C 152 58 153 37 155 11 L 157 11 C 156 37 155 57 154 75 Z" fill="#0a0a0a" opacity="0.5" />

          {/* Twist 6 */}
          <path d="M 162 79 C 162 62 163 40 166 14 L 174 14 C 172 40 170 62 170 79 Z" fill="#1a1a1a" />
          <path d="M 166 78 C 167 62 167 40 169 14 L 171 14 C 170 40 170 62 169 78 Z" fill="#0a0a0a" opacity="0.5" />

          {/* Twist 7 — far right, leans right */}
          <path d="M 173 83 C 176 67 182 46 188 20 L 196 20 C 190 46 185 67 183 81 Z" fill="#141414" />
          <path d="M 177 82 C 180 66 185 46 190 20 L 192 20 C 187 46 183 65 182 80 Z" fill="#0a0a0a" opacity="0.55" />

          {/* ── FACE FEATURES ── */}

          {/* Eyebrows */}
          <path d="M 108 97 C 112 92 119 91 129 94" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 151 94 C 161 91 168 92 172 97" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Eyes */}
          <ellipse cx="120" cy="107" rx="10" ry="9" fill="#1a1a1a" />
          <ellipse cx="160" cy="107" rx="10" ry="9" fill="#1a1a1a" />
          <ellipse cx="123" cy="105" rx="3.5" ry="3" fill="white" opacity="0.9" />
          <ellipse cx="163" cy="105" rx="3.5" ry="3" fill="white" opacity="0.9" />

          {/* Nose — broader, more defined */}
          <path d="M 136 118 C 131 128 127 132 129 135 L 136 138 C 138 139 142 139 144 138 L 151 135 C 153 132 149 128 144 118" stroke="#5a3520" strokeWidth="2" fill="none" strokeLinecap="round" />
          <ellipse cx="130" cy="135" rx="5" ry="3.5" fill="#5a3520" opacity="0.55" />
          <ellipse cx="150" cy="135" rx="5" ry="3.5" fill="#5a3520" opacity="0.55" />

          {/* Lips — fuller */}
          <path d="M 123 143 C 130 140 134 139 140 140 C 146 139 150 140 157 143" stroke="#3d1808" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 123 143 Q 140 153 157 143" stroke="#3d1808" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* ── GOATEE ── */}
          {/* Mustache */}
          <path d="M 123 141 C 128 136 134 135 140 136 C 146 135 152 136 157 141 C 152 145 146 146 140 146 C 134 146 128 145 123 141 Z" fill="#161616" opacity="0.88" />
          {/* Chin beard */}
          <ellipse cx="140" cy="159" rx="15" ry="11" fill="#161616" opacity="0.85" />
          <ellipse cx="140" cy="162" rx="11" ry="7" fill="#0d0d0d" opacity="0.4" />

          {/* Cheek warmth */}
          <ellipse cx="107" cy="124" rx="15" ry="11" fill="#8B5A35" opacity="0.22" />
          <ellipse cx="173" cy="124" rx="15" ry="11" fill="#8B5A35" opacity="0.22" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
