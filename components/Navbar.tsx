"use client";

import { useEffect, useState } from "react";
import { useResume } from "./ResumeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useResume();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] backdrop-blur-xl bg-[#050507]/85"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="text-[11px] font-bold tracking-[0.2em] text-zinc-200 uppercase hover:text-accent transition-colors duration-200"
        >
          AR
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Thinking", href: "#thinking" },
            { label: "Building", href: "#building" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[10px] tracking-[0.2em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setOpen(true)}
            className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-white/[0.1] text-zinc-400 hover:border-accent/60 hover:text-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-[10px] tracking-[0.2em] uppercase px-3 py-2 border border-white/[0.1] text-zinc-400 hover:border-accent/60 hover:text-accent transition-all duration-200 cursor-pointer"
        >
          Resume
        </button>
      </nav>
    </header>
  );
}
