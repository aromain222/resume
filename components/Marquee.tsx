const items = [
  "Financial Literacy",
  "Football",
  "Amherst '27",
  "Builder",
  "Bay Area",
  "AI",
  "Fintech",
  "Sports Intelligence",
  "Student Athlete",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-black/[0.07] bg-[#0a0a0a] overflow-hidden py-3.5">
      <div
        className="marquee-track flex whitespace-nowrap"
        style={{ animation: "marquee 24s linear infinite" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-5">
            <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-white/70">
              {item}
            </span>
            <span className="text-accent text-base leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
