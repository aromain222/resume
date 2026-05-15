"use client";

import { useState, useMemo, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type BurstData = { id: number; x: number; y: number };

function Burst({ x, y }: { x: number; y: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        angle: (i / 10) * 360 + Math.random() * 36,
        distance: 26 + Math.random() * 20,
      })),
    []
  );

  return (
    <>
      {particles.map(({ id, angle, distance }) => {
        const dx = Math.cos((angle * Math.PI) / 180) * distance;
        const dy = Math.sin((angle * Math.PI) / 180) * distance;
        return (
          <motion.div
            key={id}
            className="fixed w-2 h-2 rounded-full bg-accent pointer-events-none z-[300]"
            style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: dx, y: dy, opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.55, ease: [0.2, 0, 0.8, 1] }}
          />
        );
      })}
    </>
  );
}

export default function ClickBurst({ children }: { children: ReactNode }) {
  const [bursts, setBursts] = useState<BurstData[]>([]);
  const shouldReduce = useReducedMotion();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (shouldReduce) return;
      const id = Date.now();
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), 700);
    },
    [shouldReduce]
  );

  return (
    <div className="inline-block" onClick={handleClick}>
      {children}
      <AnimatePresence>
        {bursts.map((burst) => (
          <Burst key={burst.id} x={burst.x} y={burst.y} />
        ))}
      </AnimatePresence>
    </div>
  );
}
