"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const shouldReduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useSpring(0, { stiffness: 520, damping: 42 });
  const y = useSpring(0, { stiffness: 520, damping: 42 });

  useEffect(() => {
    if (shouldReduce) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement;
      setHovered(!!el.closest('a, button, [role="button"]'));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [shouldReduce]); // x and y are stable MotionValues

  if (shouldReduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[200] rounded-full bg-accent"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: hovered ? 44 : 8,
        height: hovered ? 44 : 8,
        opacity: visible ? (hovered ? 0.15 : 0.9) : 0,
      }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    />
  );
}
