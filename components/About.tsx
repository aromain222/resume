"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const coordinates = [
  {
    number: "01",
    label: "Amherst College",
    detail: "Political Science and Black Studies, class of 2027.",
  },
  {
    number: "02",
    label: "Football",
    detail: "Defensive lineman. I have played since freshman year of high school.",
  },
  {
    number: "03",
    label: "Projects",
        detail: "Four live projects, mostly for finance, data, and college football recruiting.",
  },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} className="border-b border-black/[0.08] bg-[#0d0d0d] py-20 text-white lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-24"
        >
          <div>
            <p className="mb-8 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              <span className="h-px w-8 bg-accent" />
              About
            </p>
            <h2 className="text-balance max-w-3xl text-[clamp(2.75rem,6vw,5.7rem)] font-black leading-[0.98] tracking-[-0.055em]">
              I study politics, play football, and build software.
            </h2>
            <div className="mt-10 grid max-w-2xl gap-6 border-t border-white/15 pt-7 text-sm leading-[1.8] text-white/62 sm:grid-cols-2">
              <p>
                I’m a student at Amherst College and a defensive lineman on the football team. Outside class and football, I build products in finance, data, and recruiting.
              </p>
              <p>
                When I’m not doing that, I’m usually lifting, cooking, listening to R&amp;B or jazz, or arguing about LeBron.
              </p>
            </div>
          </div>

          <div className="self-end">
            {coordinates.map((item, index) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, ease, delay: 0.18 + index * 0.1 }}
                className="grid grid-cols-[44px_1fr] gap-5 border-t border-white/15 py-6 first:border-t-white/35"
              >
                <span className="font-mono text-[11px] tracking-[0.15em] text-accent">{item.number}</span>
                <div>
                  <h3 className="mb-2 text-lg font-semibold tracking-[-0.02em]">{item.label}</h3>
                  <p className="max-w-md text-sm leading-[1.7] text-white/55">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
