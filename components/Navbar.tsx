"use client";

import { useEffect, useState } from "react";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";

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
          ? "border-b border-black/[0.08] backdrop-blur-xl bg-[#f9f7f4]/90 shadow-sm"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#"
          className="text-[13px] font-black tracking-[0.15em] text-[#0f0f0f] uppercase hover:text-accent transition-colors duration-200"
        >
          AR
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Building", href: "#building" },
            { label: "Ideas", href: "#ideas" },
            { label: "Contact", href: "#contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[11px] tracking-[0.15em] uppercase text-[#7a7068] font-medium hover:text-[#0a0a0a] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="text-[11px] tracking-[0.15em] uppercase px-4 py-2 bg-[#0f0f0f] text-white font-semibold hover:bg-accent transition-all duration-200 cursor-pointer"
            >
              Resume
            </button>
          </Magnetic>
        </div>

        <Magnetic>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[11px] tracking-[0.15em] uppercase px-3 py-2 bg-[#0f0f0f] text-white font-semibold hover:bg-accent transition-all duration-200 cursor-pointer"
          >
            Resume
          </button>
        </Magnetic>
      </nav>
    </header>
  );
}
