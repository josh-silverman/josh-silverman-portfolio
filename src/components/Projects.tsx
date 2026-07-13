import Section from "./Section";
import { projects } from "../data/content";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" kicker="03 · Projects" title="Data & Analytics Projects">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-colors hover:border-accent/40"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.imageAlt ?? `${project.title} preview`}
                loading="lazy"
                className="w-full border-b border-zinc-800"
              />
            )}
            <div className="flex flex-1 flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-accent-bright">
                {project.title}
              </h3>
              <div className="flex shrink-0 items-center gap-3 text-zinc-500">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="transition-colors hover:text-accent-bright"
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} live demo`}
                    className="transition-colors hover:text-accent-bright"
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
              {project.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent-bright"
                >
                  {tag}
                </li>
              ))}
            </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
