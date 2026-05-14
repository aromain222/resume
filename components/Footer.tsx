export default function Footer() {
  return (
    <footer className="border-t border-black/[0.07] py-8 bg-white">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6 flex-wrap">
        <span className="text-[12px] text-[#0f0f0f] tracking-[0.2em] font-black uppercase">
          AR
        </span>

        <div className="flex items-center gap-6">
          <a
            href="#building"
            className="text-[11px] tracking-[0.15em] uppercase text-[#9ca3af] font-medium hover:text-[#0f0f0f] transition-colors duration-200"
          >
            Building
          </a>
          <a
            href="#contact"
            className="text-[11px] tracking-[0.15em] uppercase text-[#9ca3af] font-medium hover:text-[#0f0f0f] transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        <span className="text-[11px] text-[#9ca3af] tracking-wide font-medium">
          Amherst &apos;27
        </span>
      </div>
    </footer>
  );
}
