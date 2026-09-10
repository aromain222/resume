import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import PixelWorld from "./PixelWorld";
import { bio } from "@/lib/portfolioData";

export default function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="mb-10">
        <SectionHeading>About</SectionHeading>
      </div>

      <Reveal variant="fade" className="max-w-[60ch]">
        {bio.map((paragraph) => (
          <p key={paragraph} className="text-base leading-[1.7] text-bone-soft sm:text-lg">
            {paragraph}
          </p>
        ))}
        <p className="mt-6 text-base leading-[1.7] text-bone-soft sm:text-lg">
          Outside of the apps and the film room, this is what I&rsquo;m into.
        </p>
      </Reveal>

      <Reveal variant="fade" delay={0.1} className="mt-10 max-w-[1180px]">
        <PixelWorld />
      </Reveal>
    </section>
  );
}
