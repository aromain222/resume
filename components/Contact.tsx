"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { setOpen } = useResume();

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden border-t border-line"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="type-display max-w-[10ch] text-balance text-[clamp(3.5rem,11vw,11rem)] text-bone">
            Open to chatting
          </h2>
          <p className="mt-8 max-w-[46ch] text-base leading-[1.7] text-bone-soft sm:text-lg">
            If you&rsquo;re hiring, or you just want to talk markets or
            football, email me. I answer fast.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Magnetic>
              <a
                href="mailto:averyromain5@gmail.com"
                className="type-label pressable inline-block bg-bone px-8 py-5 text-[12px] text-stage hover:bg-purple hover:text-white"
              >
                averyromain5@gmail.com
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="stage-link type-label cursor-pointer text-[12px] text-bone"
            >
              Resume
            </button>
            <a
              href="https://linkedin.com/in/avery-romain"
              target="_blank"
              rel="noopener noreferrer"
              className="stage-link type-label text-[12px] text-bone"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 border-t border-line px-6 py-6 text-[12px] text-bone-faint sm:px-10 lg:px-16">
          <span className="type-label text-[11px]">Avery Romain &middot; Amherst &rsquo;27</span>
          <span className="type-label text-[11px]">San Mateo, CA &rarr; Amherst, MA</span>
        </div>
      </div>
    </section>
  );
}
