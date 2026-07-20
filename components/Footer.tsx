import LocalTime from "./LocalTime";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-line pt-6 text-[12.5px] text-ink-faint">
      <span>Avery Romain &middot; Amherst &rsquo;27</span>
      <LocalTime />
    </footer>
  );
}
