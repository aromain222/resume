"use client";

import { useEffect, useState } from "react";
import { useResume } from "./ResumeContext";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setOpen } = useResume();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled ? "border-b border-line bg-stage/80 backdrop-blur-xl" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <a href="#" className="type-label text-[13px] text-bone transition-colors duration-200 hover:text-purple-bright">
          Avery Romain
        </a>

        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-7 md:flex">
            {[
              { label: "Work", href: "#work" },
              { label: "Path", href: "#path" },
              { label: "Writing", href: "#writing" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="type-label text-[11px] text-bone-soft transition-colors duration-200 hover:text-bone"
              >
                {label}
              </a>
            ))}
          </div>
          <Magnetic>
            <button
              onClick={() => setOpen(true)}
              className="type-label pressable cursor-pointer bg-purple px-4 py-2.5 text-[11px] text-white hover:bg-purple-bright hover:text-stage"
            >
              Resume
            </button>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
