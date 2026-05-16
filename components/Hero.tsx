"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";
import ClickBurst from "./ClickBurst";
import NotionAvatar from "./NotionAvatar";

const ease = [0.22, 1, 0.36, 1] as const;

const interests = ["Football", "Fitness", "Coding", "Networking", "Sports", "Gaming"];

const FACTS = [
  "I love cooking. My favorite dishes to make are curry chicken, jerk chicken, and steak.",
  "I'm a quarter-zip enthusiast.",
  "I am the world's biggest LeBron fan.",
  "I'm top 1,000 in the world in CFB26.",
  "I started college planning on pre-law, went down the finance rabbit hole, and somehow ended up in tech.",
  "I was born in Washington, D.C. but grew up in the Bay Area.",
  "I'm big into lifting. My PRs are 315 on bench and 500 on squat.",
  "I like building tools that make opportunities more accessible.",
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

export default function Hero() {
  const { setOpen } = useResume();

  const [factActive, setFactActive] = useState(false);
  const [queue, setQueue] = useState<string[]>([]);
  const [fact, setFact] = useState("");
  const [factKey, setFactKey] = useState(0);

  const advance = useCallback(() => {
    if (!factActive) {
      const q = buildQueue();
      setFact(q[0]);
      setQueue(q.slice(1));
      setFactActive(true);
      setFactKey((k) => k + 1);
      return;
    }
    const nextQueue = queue.length === 0 ? buildQueue() : null;
    if (nextQueue) {
      setFact(nextQueue[0]);
      setQueue(nextQueue.slice(1));
    } else {
      const [next, ...rest] = queue;
      setFact(next);
      setQueue(rest);
    }
    setFactKey((k) => k + 1);
  }, [factActive, queue]);

  const isSocial = fact === SOCIAL_FACT;

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-12 sm:pt-14 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] items-end gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="relative"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0a0a0a] tracking-[-0.03em] leading-[1.05] mb-5 max-w-2xl">
            Building financial tools, AI systems, and sports intelligence.
          </h1>

          <p className="text-[15px] text-[#7a7068] leading-relaxed mb-9 max-w-md">
            Student-athlete at Amherst. I build the financial tools that should already exist.
          </p>

          <div className="flex items-center gap-2 mb-10 flex-wrap">
            {interests.map((item) => (
              <span
                key={item}
                className="text-[11px] tracking-[0.1em] uppercase font-medium px-3 py-1.5 border border-black/20 text-[#3d3730] hover:border-accent hover:text-accent transition-colors duration-200"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Magnetic>
              <ClickBurst>
                <a
                  href="#building"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#0a0a0a] text-white text-xs font-bold tracking-[0.06em] uppercase hover:bg-accent transition-colors duration-200 cursor-pointer"
                >
                  View Work
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
                    <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </ClickBurst>
            </Magnetic>
            <Magnetic>
              <ClickBurst>
                <button
                  onClick={() => setOpen(true)}
                  className="text-[11px] tracking-[0.15em] uppercase px-6 py-3 border border-black/20 text-[#7a7068] font-semibold hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
                >
                  Resume
                </button>
              </ClickBurst>
            </Magnetic>
          </div>
        </motion.div>

        <div className="hidden lg:flex flex-col items-center justify-end gap-4">
          {/* Avatar + speech bubble overlaid at mouth level */}
          <div className="relative flex justify-center w-full">
            <NotionAvatar />

            <AnimatePresence mode="wait">
              {factActive && (
                <motion.div
                  key={factKey}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left center" }}
                  className="absolute top-[12%] left-[52%] w-48 z-20 pointer-events-none"
                >
                  {/* tail pointing left toward mouth */}
                  <div
                    className="absolute left-[-8px] top-4"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: "7px solid transparent",
                      borderBottom: "7px solid transparent",
                      borderRight: "8px solid white",
                    }}
                  />
                  <div className="bg-white border border-black/[0.08] rounded-xl px-3.5 py-3 shadow-md pointer-events-auto">
                    <p className="text-[12px] text-[#3d3730] leading-relaxed">{fact}</p>
                    {isSocial && (
                      <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-black/[0.06] flex-wrap">
                        <a href="https://linkedin.com/in/averyromain" target="_blank" rel="noreferrer" className="text-[10px] tracking-[0.08em] uppercase font-semibold text-[#7a7068] hover:text-[#0a0a0a] transition-colors duration-200">LinkedIn</a>
                        <span className="text-black/20">·</span>
                        <a href="mailto:aromain27@amherst.edu" className="text-[10px] tracking-[0.08em] uppercase font-semibold text-[#7a7068] hover:text-[#0a0a0a] transition-colors duration-200">Email</a>
                        <span className="text-black/20">·</span>
                        <a href="#contact" className="text-[10px] tracking-[0.08em] uppercase font-semibold text-[#7a7068] hover:text-[#0a0a0a] transition-colors duration-200">Contact</a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={advance}
            whileTap={{ scale: 0.96 }}
            className="text-[11px] tracking-[0.15em] uppercase font-semibold px-4 py-2 border border-black/20 text-[#7a7068] hover:border-black/40 hover:text-[#3d3730] transition-all duration-200 cursor-pointer"
          >
            {factActive ? "Next Fact →" : "Fun Fact"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
