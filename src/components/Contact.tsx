import Section from "./Section";
import { socials } from "../data/content";
import { ExtLink } from "./primitives";

export default function Contact() {
  return (
    <Section id="contact" number="03" title="Let's Talk">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8 pb-16">
        <p className="col-span-12 font-serif text-xl leading-relaxed lg:col-span-5 lg:col-start-3">
          I'm actively pursuing opportunities in sports analytics. If you're building a data-driven front
          office, betting product, or fan analytics team, I'd love to connect.
        </p>
        <div className="col-span-12 min-w-0 lg:col-span-5">
          <a
            href={`mailto:${socials.email}`}
            className="display link inline-block text-[clamp(1.35rem,2.6vw,2.1rem)] [overflow-wrap:anywhere]"
          >
            {socials.email}
          </a>
          <p className="kicker mt-6 flex gap-6">
            <ExtLink href={socials.linkedin}>LinkedIn</ExtLink>
            <ExtLink href={socials.github}>GitHub</ExtLink>
          </p>
        </div>
      </div>
    </Section>
  );
}
