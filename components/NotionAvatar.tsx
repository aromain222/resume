"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotionAvatar() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.35 }}
      className="relative flex items-end justify-center select-none pointer-events-none"
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Soft ground shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-5 bg-black/10 blur-xl rounded-full translate-y-3" />
        <Image
          src="/images/avatar-quarterzip.png"
          alt="Avery Romain"
          width={420}
          height={640}
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
