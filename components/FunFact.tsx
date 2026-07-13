"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FACTS = [
  "I love cooking. My favorite dishes to make are curry chicken, jerk chicken, and steak.",
  "I'm a quarter-zip enthusiast.",
  "I am the world's biggest LeBron fan.",
  "I'm top 1,000 in the world in CFB26.",
  "I started college planning on pre-law, went down the finance rabbit hole, and somehow ended up in tech.",
  "I was born in Washington, D.C. but grew up in the Bay Area.",
  "I'm developing my watch game.",
  "I'm a sucker for a good view or a long hike.",
  "I'm an Ohio State, Cleveland Cavaliers, Cleveland Browns, and Washington Commanders fan.",
  "I love building Legos.",
  "I love meeting new people and talking about pretty much anything. Feel free to reach out.",
];

const SOCIAL_FACT = FACTS[FACTS.length - 1];

function buildQueue(): string[] {
  const a = [...FACTS];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  const idx = a.indexOf(SOCIAL_FACT);
  if (idx < 2) {
    const swap = 2 + Math.floor(Math.random() * (a.length - 2));
    [a[idx], a[swap]] = [a[swap], a[idx]];
  }
  return a;
}

export default function FunFact() {
  const [active, setActive] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [fact, setFact] = useState("");
  const [factKey, setFactKey] = useState(0);

  const advance = useCallback(() => {
    if (!active) {
      const q = buildQueue();
      setFact(q[0]);
      setQueue(q.slice(1));
      setActive(true);
      setFactKey((k) => k + 1);
      return;
    }
    const nextFact = queue.length === 0 ? buildQueue() : null;
    if (nextFact) {
      setFact(nextFact[0]);
      setQueue(nextFact.slice(1));
    } else {
      const [next, ...rest] = queue;
      setFact(next);
      setQueue(rest);
    }
    setFactKey((k) => k + 1);
  }, [active, queue]);

  const isSocial = fact === SOCIAL_FACT;

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={factKey}
            initial={{ opacity: 0, scale: 0.88, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 6 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full"
          >
            <div
              className="absolute -top-2 left-[30%] -translate-x-1/2"
              style={{
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderBottom: "8px solid white",
              }}
            />
            <div className="bg-white border border-black/[0.08] rounded-xl px-4 py-3.5 shadow-sm">
              <p className="text-[13px] text-[#3d3730] leading-relaxed">{fact}</p>
              {isSocial && (
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/[0.06]">
                  <a
                    href="https://linkedin.com/in/averyromain"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] tracking-[0.1em] uppercase font-semibold text-[#7a7068] hover:text-[#0a0a0a] transition-colors duration-200"
                  >
                    LinkedIn
                  </a>
                  <span className="text-black/20">·</span>
                  <a
                    href="mailto:aromain27@amherst.edu"
                    className="text-[10px] tracking-[0.1em] uppercase font-semibold text-[#7a7068] hover:text-[#0a0a0a] transition-colors duration-200"
                  >
                    Email
                  </a>
                  <span className="text-black/20">·</span>
                  <a
                    href="#contact"
                    className="text-[10px] tracking-[0.1em] uppercase font-semibold text-[#7a7068] hover:text-[#0a0a0a] transition-colors duration-200"
                  >
                    Contact
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={advance}
        whileTap={{ scale: 0.96 }}
        className="text-[11px] tracking-[0.15em] uppercase font-semibold px-4 py-2 border border-black/20 text-[#7a7068] hover:border-black/40 hover:text-[#3d3730] transition-all duration-200 cursor-pointer"
      >
        {active ? "Next Fact →" : "Fun Fact"}
      </motion.button>
    </div>
  );
}
