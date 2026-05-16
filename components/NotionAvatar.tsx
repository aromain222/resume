"use client";

import Image from "next/image";
import { useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotionAvatar() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 20, mass: 0.6 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduce) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rawRotateX.set(-dy * 8);
      rawRotateY.set(dx * 8);
    },
    [reduce, rawRotateX, rawRotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  }, [rawRotateX, rawRotateY]);

  const handleClick = useCallback(() => {
    if (reduce) return;
    setClicking(true);
    setTimeout(() => setClicking(false), 600);
  }, [reduce]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.35 }}
      className="relative flex items-end justify-center"
      style={{ perspective: 900 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        animate={
          reduce
            ? {}
            : clicking
            ? { y: [0, -32, -18, -28, 0], scaleX: [1, 0.94, 1.04, 0.97, 1] }
            : { y: [0, -10, 0] }
        }
        transition={
          clicking
            ? { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ rotateX, rotateY, cursor: "pointer" }}
        className="relative"
      >
        {/* Shadow — squishes on click */}
        <motion.div
          animate={clicking ? { scaleX: 0.7, opacity: 0.05 } : { scaleX: 1, opacity: 0.1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-5 bg-black blur-xl rounded-full translate-y-3"
        />
        <Image
          src="/images/avatar-quarterzip.png"
          alt="Avery Romain"
          width={420}
          height={640}
          className="object-contain"
          priority
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}
