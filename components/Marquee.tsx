const items = [
  "CapitalBase — multi-agent investing",
  "Stackwise — personal finance",
  "Transfer Portal — sports intelligence",
  "DataChat — natural-language analytics",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden bg-[#0a0a0a] py-4">
      <div
        className="marquee-track flex whitespace-nowrap"
        style={{ animation: "marquee 34s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="mx-7 inline-flex items-center gap-7">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/64">
              {item}
            </span>
            <span className="h-px w-10 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
