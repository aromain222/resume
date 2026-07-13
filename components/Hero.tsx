"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useResume } from "./ResumeContext";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { setOpen } = useResume();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 0.94]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -24]);

  return (
    <section
      ref={ref}
      className="editorial-grid relative isolate min-h-[calc(100svh-42px)] overflow-hidden border-b border-black/[0.08] pt-20 lg:pt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.22 }}
        className="absolute right-2 top-16 flex h-64 w-48 items-end justify-center lg:hidden"
      >
        <div className="absolute bottom-2 h-44 w-44 rounded-full border border-accent/30 bg-accent/[0.055]" />
        <Image
          src="/images/avatar-quarterzip.png"
          alt=""
          width={210}
          height={320}
          draggable={false}
          className="relative z-10 h-56 w-auto object-contain object-bottom drop-shadow-[0_14px_18px_rgba(29,22,16,0.1)]"
        />
      </motion.div>
      <div className="relative mx-auto flex min-h-[calc(100svh-122px)] max-w-[1440px] items-end px-6 sm:px-10 lg:px-14">
        <div className="grid w-full grid-cols-1 items-end gap-12 lg:grid-cols-[minmax(0,1.22fr)_minmax(330px,0.78fr)] lg:gap-4">
          <motion.div
            style={{ y: copyY }}
            className="relative z-10 pb-12 lg:pb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#756d65]">
                Amherst ’27 · Defensive line · Building software
              </span>
            </motion.div>

            <h1 className="max-w-[960px] font-black leading-[0.78] tracking-[-0.075em] text-[#0a0a0a]">
              <span className="block overflow-hidden pb-[0.08em] text-[clamp(5rem,12vw,11rem)]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.05 }}
                  className="block"
                >
                  Avery
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.1em] text-[clamp(5rem,12vw,11rem)] text-accent">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.13 }}
                  className="block"
                >
                  Romain.
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.42 }}
              className="mt-8 grid max-w-3xl gap-7 border-t border-black/[0.14] pt-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
            >
              <p className="max-w-xl text-[clamp(1.05rem,1.7vw,1.35rem)] font-medium leading-[1.45] tracking-[-0.02em] text-[#302c28]">
                I’m an Amherst student-athlete who likes making useful software for investing, personal finance, and college football.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#building"
                  className="group inline-flex items-center gap-3 bg-[#0a0a0a] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent"
                >
                  Selected work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <button
                  onClick={() => setOpen(true)}
                  className="border-b border-black/25 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5f5851] transition-colors hover:border-accent hover:text-accent"
                >
                  Resume
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, clipPath: "inset(18% 0 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            style={{ y: portraitY, scale: portraitScale }}
            className="relative hidden h-[72vh] min-h-[560px] items-end justify-center lg:flex"
          >
            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[8%] left-1/2 h-[68%] aspect-square -translate-x-1/2 rounded-full border border-accent/30 bg-accent/[0.055]"
            />
            <span className="absolute right-0 top-[22%] origin-top-right rotate-90 font-mono text-[10px] uppercase tracking-[0.25em] text-[#91877e]">
              San Mateo, CA → Amherst, MA
            </span>
            <Image
              src="/images/avatar-quarterzip.png"
              alt="Illustrated portrait of Avery Romain"
              width={520}
              height={760}
              priority
              draggable={false}
              className="relative z-10 h-[78%] w-auto object-contain object-bottom drop-shadow-[0_28px_30px_rgba(29,22,16,0.12)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
