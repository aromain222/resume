"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useResume } from "./ResumeContext";
import { useTabNavigation } from "./TabNavigationContext";
import Magnetic from "./Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { setOpen } = useResume();
  const { goTo } = useTabNavigation();

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-28">
      {/* Portrait: mobile top-right, desktop standing bottom-right */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(24px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.6, ease, delay: 0.22 }}
        className="pointer-events-none absolute right-2 top-24 z-0 sm:hidden"
      >
        <Image
          src="/images/avatar-quarterzip.png"
          alt="Illustrated portrait of Avery Romain in a quarter-zip"
          width={512}
          height={768}
          draggable={false}
          priority
          className="h-44 w-auto object-contain opacity-90"
        />
      </motion.div>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, transform: "translateY(32px)" }}
        animate={{ opacity: 1, transform: "translateY(0px)" }}
        transition={{ duration: 0.6, ease, delay: 0.22 }}
        className="pointer-events-none absolute bottom-0 right-[max(1.5rem,6vw)] z-0 hidden sm:block"
      >
        <Image
          src="/images/avatar-quarterzip.png"
          alt="Illustrated portrait of Avery Romain in a quarter-zip"
          width={512}
          height={768}
          draggable={false}
          priority
          className="h-[64svh] w-auto object-contain object-bottom drop-shadow-[0_18px_24px_rgba(29,22,40,0.14)]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-10 sm:px-10 lg:px-16 lg:pb-14">
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.4, ease, delay: 0.04 }}
          className="type-label mb-7 max-w-[16rem] text-[13px] text-maroon sm:max-w-none"
        >
          Amherst College &rsquo;27 &middot; D-line &middot; Four live apps
        </motion.p>

        <h1 className="type-display text-[clamp(3rem,7.5vw,7rem)] text-bone">
          <span className="block overflow-hidden">
            <motion.span
              initial={reduceMotion ? false : { transform: "translateY(108%)" }}
              animate={{ transform: "translateY(0%)" }}
              transition={{ duration: 0.62, ease, delay: 0.06 }}
              className="block"
            >
              Avery
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={reduceMotion ? false : { transform: "translateY(108%)" }}
              animate={{ transform: "translateY(0%)" }}
              transition={{ duration: 0.62, ease, delay: 0.14 }}
              className="block"
            >
              Romain
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, transform: "translateY(14px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.45, ease, delay: 0.3 }}
          className="mt-9"
        >
          <div className="flex max-w-[46ch] flex-col items-start gap-7">
            <p className="text-base leading-[1.7] text-bone-soft sm:text-lg">
              I study political science at Amherst and play on the defensive
              line. I also build software. Four apps so far, all of them live.
              Open the Work tab and use one right now.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Magnetic>
                <button
                  onClick={() => setOpen(true)}
                  className="type-label pressable cursor-pointer bg-bone px-7 py-4 text-[12px] text-stage hover:bg-maroon"
                >
                  View resume
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => goTo("world")}
                  className="type-label pressable cursor-pointer border border-line px-7 py-4 text-[12px] text-bone hover:border-maroon hover:text-maroon"
                >
                  Enter world &rarr;
                </button>
              </Magnetic>
              <a
                href="mailto:averyromain5@gmail.com"
                className="stage-link type-label text-[12px] text-bone"
              >
                Email
              </a>
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
