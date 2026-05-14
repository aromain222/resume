"use client";

import { motion } from "framer-motion";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

const interests = ["Football", "Fitness", "Coding", "Networking", "Sports", "Gaming"];

const interestColors = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
];

export default function Hero() {
  const { setOpen } = useResume();

  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-36 pb-16 overflow-hidden">
      {/* Background blob */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgb(59 130 246 / 0.08) 0%, rgb(139 92 246 / 0.06) 50%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        className="relative"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-[2px] bg-accent rounded-full" />
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#6b7280] font-semibold">
            Avery Romain
          </p>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f0f0f] tracking-[-0.03em] leading-[1.05] mb-5 max-w-2xl">
          Building financial tools,{" "}
          <span className="gradient-text">AI systems,</span> and sports intelligence.
        </h1>

        <p className="text-base text-[#6b7280] leading-relaxed mb-8 max-w-lg">
          Student-athlete at Amherst. I build the financial tools that should already exist.
        </p>

        {/* Interest tags */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {interests.map((item, i) => (
            <span
              key={item}
              className={`text-[11px] tracking-[0.1em] uppercase font-semibold px-3 py-1.5 rounded-full ${interestColors[i]}`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#building"
            className="group inline-flex items-center gap-2.5 px-6 py-3 bg-[#0f0f0f] text-white text-xs font-bold tracking-[0.06em] uppercase hover:bg-accent transition-colors duration-200 cursor-pointer"
          >
            View Work
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <button
            onClick={() => setOpen(true)}
            className="text-[11px] tracking-[0.15em] uppercase px-6 py-3 border-2 border-[#0f0f0f]/20 text-[#6b7280] font-semibold hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </div>
      </motion.div>
    </section>
  );
}
