import { site, socials } from "../data/content";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Subtle accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="mx-auto flex max-w-5xl flex-col justify-center px-6 pt-40 pb-24 sm:min-h-screen sm:pt-16 sm:pb-16">
        <p className="font-mono text-sm tracking-[0.25em] text-accent uppercase">
          {site.tagline}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-100 sm:text-6xl">
          {site.name}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          {site.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#model"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-accent-bright"
          >
            View the Model
          </a>
          <a
            href="#contact"
            className="rounded-md border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:border-accent hover:text-accent-bright"
          >
            Get in Touch
          </a>

          <div className="ml-1 flex items-center gap-4 text-zinc-500">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-accent-bright"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-accent-bright"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              aria-label="Email"
              className="transition-colors hover:text-accent-bright"
            >
              <MailIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
