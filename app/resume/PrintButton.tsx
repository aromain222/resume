"use client";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="px-4 py-2 bg-zinc-900 text-zinc-300 text-xs tracking-[0.15em] uppercase border border-white/10 hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
    >
      Print / Save as PDF
    </button>
  );
}
