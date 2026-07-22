import Section from "./Section";
import { socials } from "../data/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export default function Contact() {
  return (
    <Section id="contact" kicker="05 · Contact" title="Let's Talk">
      <div className="max-w-2xl">
        <p className="leading-relaxed text-zinc-400">
          I'm actively pursuing opportunities in sports analytics. If you're building a
          data-driven front office, betting product, or fan analytics team, I'd love to
          connect.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${socials.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-accent-bright"
          >
            <MailIcon className="h-4 w-4" />
            {socials.email}
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-accent hover:text-accent-bright"
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-accent hover:text-accent-bright"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
