"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const details = [
  {
    label: "School",
    value: "Amherst College",
    detail: "Political Science and Black Studies · Class of 2027",
  },
  {
    label: "Football",
    value: "Defensive end",
    detail: "I’ve played since my freshman year of high school.",
  },
  {
    label: "Projects",
    value: "Four live apps",
    detail: "Finance, data, and college football recruiting.",
  },
];

const outside = ["Cooking", "R&B and jazz", "Gaming", "Legos", "Good views and long hikes"];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} className="border-b border-black/[0.08] bg-[#0d0d0d] py-20 text-white lg:py-24">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:gap-24"
        >
          <div>
            <p className="mb-6 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
              <span className="h-px w-8 bg-accent" />
              A little about me
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl">
              I’m a student, a football player, and a builder.
            </h2>
            <div className="mt-7 max-w-xl space-y-5 text-[15px] leading-[1.8] text-white/65">
              <p>
                I’m a Political Science and Black Studies double major at Amherst College, where I play defensive end on the football team. I grew up in the Bay Area and went to Menlo School from middle school through high school. Being around that environment sparked my interest in technology.
              </p>
              <p>
                My experience at SoFi during my sophomore summer showed me how much technology can change finance. That was the point where my interests started to come together. Now I’m exploring fintech and early-stage startups, hoping to break in through a forward-deployed engineering or customer-facing product role.
              </p>
              <p>
                Outside of my professional and academic life, I’m an avid LeBron fan. I love to cook, work out, build Legos, play video games, and find a new place to catch a sunset.
              </p>
            </div>
          </div>

          <div className="lg:pt-9">
            <div className="border-t border-white/20">
              {details.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.12 + index * 0.08 }}
                  className="grid gap-2 border-b border-white/15 py-5 sm:grid-cols-[100px_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">{item.label}</span>
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.value}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/55">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">When I’m not working</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/65">
                {outside.map((item) => <span key={item}>{item}</span>)}
              </div>
              <p className="mt-6 text-sm leading-6 text-white/45">Also: I’m developing my watch game, and I’m probably going to bring up LeBron at some point.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
