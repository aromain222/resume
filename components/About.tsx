"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const bio = [
  "I’m a Political Science and Black Studies double major at Amherst College, where I play on the defensive line. I grew up in the Bay Area and went to Menlo School from middle school through high school — that environment is what sparked my interest in technology.",
  "My summer at SoFi showed me how much technology can change finance, and that’s where my interests came together. Now I’m exploring fintech and early-stage startups, aiming to break in through forward-deployed engineering or a customer-facing product role.",
  "Off the field and away from the editor: avid LeBron fan, cook, Lego builder, gamer, and always hunting a new place to catch a sunset.",
];

const programCard = [
  { label: "Hometown", value: "San Mateo, CA" },
  { label: "High school", value: "Menlo School" },
  { label: "Major", value: "Political Science & Black Studies" },
  { label: "Team", value: "Amherst Football — #93, DL" },
  { label: "Apps shipped", value: "4 live products" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} className="bg-paper py-24 text-ink lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-14 lg:px-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-24"
        >
          <div>
            <h2 className="type-display text-[clamp(2.75rem,6vw,4.75rem)] text-ink">
              Student.
              <br />
              Lineman.
              <br />
              <span className="text-purple">Builder.</span>
            </h2>
            <div className="mt-10 max-w-[62ch] space-y-6 text-[16px] leading-[1.75] text-ink-soft">
              {bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>

          {/* Program card: the printed-roster panel */}
          <div className="lg:pt-3">
            <div className="border-2 border-ink bg-paper-raised">
              <div className="flex items-center justify-between border-b-2 border-ink px-6 py-4">
                <span className="type-label text-[11px] text-ink">At a glance</span>
                <span className="type-stat text-xl text-purple">#93</span>
              </div>
              <div className="relative flex justify-center border-b border-ink/15 bg-paper px-6 pt-6">
                <Image
                  src="/images/avatar-quarterzip.png"
                  alt="Illustrated portrait of Avery Romain in a quarter-zip"
                  width={210}
                  height={320}
                  draggable={false}
                  className="h-64 w-auto object-contain object-bottom"
                />
              </div>
              <dl>
                {programCard.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, ease, delay: 0.15 + index * 0.06 }}
                    className="grid grid-cols-[110px_1fr] gap-4 border-b border-ink/15 px-6 py-3.5 last:border-b-0"
                  >
                    <dt className="type-label self-center text-[10px] text-ink-soft">
                      {item.label}
                    </dt>
                    <dd className="text-[14px] font-semibold leading-snug text-ink">
                      {item.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
            <p className="mt-5 text-[13px] leading-relaxed text-ink-soft">
              Also: developing my watch game, and LeBron will come up at some point.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
