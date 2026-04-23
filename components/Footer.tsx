export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-6 flex-wrap">
        <span className="text-[10px] text-zinc-700 tracking-[0.25em] font-medium uppercase">
          AR
        </span>

        <div className="flex items-center gap-6">
          <a
            href="#thinking"
            className="text-[10px] tracking-[0.18em] uppercase text-zinc-700 hover:text-zinc-500 transition-colors duration-200"
          >
            Thinking
          </a>
          <a
            href="#building"
            className="text-[10px] tracking-[0.18em] uppercase text-zinc-700 hover:text-zinc-500 transition-colors duration-200"
          >
            Building
          </a>
          <a
            href="#contact"
            className="text-[10px] tracking-[0.18em] uppercase text-zinc-700 hover:text-zinc-500 transition-colors duration-200"
          >
            Contact
          </a>
        </div>

        <span className="text-[10px] text-zinc-700 tracking-wide">
          Amherst &apos;27
        </span>
      </div>
    </footer>
  );
}
