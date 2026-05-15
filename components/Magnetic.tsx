"use client";

import { useRef, type ReactNode } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const x = useSpring(0, { stiffness: 260, damping: 22 });
  const y = useSpring(0, { stiffness: 260, damping: 22 });

  if (shouldReduce) return <>{children}</>;

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.32);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.32);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
