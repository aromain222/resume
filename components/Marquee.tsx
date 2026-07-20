const items = [
  "CapitalBase — investment research",
  "Stackwise — personal finance",
  "Transfer Portal — recruiting tools",
  "DataChat — ask your data questions",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-purple-deep bg-purple py-3.5">
      <div className="ticker-track flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-8">
            <span className="type-label text-[11px] text-white">{item}</span>
            <span className="type-label text-[10px] text-white/60">Live</span>
          </span>
        ))}
      </div>
    </div>
  );
}
