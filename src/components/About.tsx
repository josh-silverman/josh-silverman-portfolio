import Section from "./Section";
import { about } from "../data/content";

export default function About() {
  return (
    <Section id="about" kicker="01 · About" title="Background">
      <div className="max-w-3xl space-y-5">
        {about.map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="leading-relaxed text-zinc-400">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
