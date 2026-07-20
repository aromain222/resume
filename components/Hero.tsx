"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { setOpen } = useResume();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -140]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0]);

  const avatarY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]);

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden">
      {/* The character: mobile top-right, desktop standing bottom-right */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        style={{ y: avatarY }}
        className="absolute right-3 top-20 z-20 sm:hidden"
      >
        <Image
          src="/images/avatar-quarterzip.png"
          alt="Illustrated portrait of Avery Romain in a quarter-zip"
          width={512}
          height={768}
          draggable={false}
          priority
          className="h-60 w-auto object-contain drop-shadow-[0_10px_14px_rgba(29,22,40,0.14)]"
        />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.45 }}
        style={{ y: avatarY }}
        className="absolute bottom-14 right-6 z-20 hidden sm:block lg:right-20"
      >
        <Image
          src="/images/avatar-quarterzip.png"
          alt="Illustrated portrait of Avery Romain in a quarter-zip"
          width={512}
          height={768}
          draggable={false}
          priority
          className="h-[70svh] w-auto object-contain object-bottom drop-shadow-[0_18px_24px_rgba(29,22,40,0.16)]"
        />
      </motion.div>

      <motion.div
        style={{ y: nameY, opacity: nameOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-12 sm:px-10 lg:px-16 lg:pb-16"
      >
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="type-label mb-8 text-[13px] text-purple-bright"
        >
          Amherst College &rsquo;27 &middot; D-line &middot; Four live apps
        </motion.p>

        <h1 className="type-display text-[clamp(4.5rem,12.5vw,13rem)] text-bone">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              initial={reduceMotion ? false : { y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="block"
            >
              Avery
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              initial={reduceMotion ? false : { y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.26 }}
              className="block"
            >
              Romain
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.55 }}
          className="mt-10 flex flex-col items-start gap-8"
        >
          <p className="max-w-[34ch] text-base leading-[1.7] text-bone-soft sm:text-lg">
            I&rsquo;m a senior at Amherst. I&rsquo;ve built four apps and all
            of them are live: personal finance, investing research, football
            recruiting, and a tool that answers questions about spreadsheets.
          </p>
          <div className="flex items-center gap-6">
            <Magnetic>
              <button
                onClick={() => setOpen(true)}
                className="type-label pressable cursor-pointer bg-bone px-7 py-4 text-[12px] text-stage hover:bg-purple-bright"
              >
                View resume
              </button>
            </Magnetic>
            <a href="mailto:averyromain5@gmail.com" className="stage-link type-label text-[12px] text-bone">
              Email
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        aria-hidden
        className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-3 sm:flex lg:right-16"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="type-label text-[10px] text-bone-faint">Scroll</span>
        <span className="h-12 w-px bg-purple-bright/60" />
      </motion.div>
    </section>
  );
}
