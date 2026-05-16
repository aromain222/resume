"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroIllustration() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 });
  const rotateX = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      rawX.set(dx * 14);
      rawY.set(dy * 10);
      rotateX.set(-dy * 6);
      rotateY.set(dx * 6);
    },
    [reduce, rawX, rawY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }, [rawX, rawY, rotateX, rotateY]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.35 }}
      className="relative flex items-end justify-center select-none"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ x, y, rotateX, rotateY }}
        className="relative"
      >
        {/* Soft drop shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-full translate-y-4" />
        <Image
          src="/avery-character.png"
          alt="Avery Romain"
          width={1086}
          height={1448}
          className="w-72 xl:w-80 object-contain drop-shadow-2xl"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
