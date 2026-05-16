"use client";

import { motion } from "framer-motion";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";
import ClickBurst from "./ClickBurst";
import NotionAvatar from "./NotionAvatar";

const ease = [0.22, 1, 0.36, 1] as const;

const interests = ["Football", "Fitness", "Coding", "Networking", "Sports", "Gaming"];

export default function Hero() {
  const { setOpen } = useResume();

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-36 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] items-end gap-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-[2px] bg-accent rounded-full" />
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#7a7068] font-semibold">
            Avery Romain
          </p>
        </motion.div>

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
      <div className="hidden lg:flex items-end justify-center">
        <NotionAvatar />
      </div>
      </div>
    </section>
  );
}
