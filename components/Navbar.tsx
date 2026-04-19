"use client";

import { useEffect, useState } from "react";
import { useResume } from "./ResumeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useResume();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 backdrop-blur-xl bg-[#050507]/80"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-widest text-zinc-100 uppercase hover:text-accent transition-colors duration-200"
        >
          AR
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#thinking"
            className="text-xs tracking-wider uppercase text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            Thinking
          </a>
          <a
            href="#building"
            className="text-xs tracking-wider uppercase text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            Building
          </a>
          <a
            href="#contact"
            className="text-xs tracking-wider uppercase text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
          >
            Contact
          </a>
          <button
            onClick={() => setOpen(true)}
            className="text-xs tracking-wider uppercase px-4 py-2 border border-white/10 text-zinc-300 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-xs tracking-wider uppercase px-3 py-1.5 border border-white/10 text-zinc-300 hover:border-accent hover:text-accent transition-all duration-200 cursor-pointer"
        >
          Resume
        </button>
      </nav>
    </header>
  );
}
