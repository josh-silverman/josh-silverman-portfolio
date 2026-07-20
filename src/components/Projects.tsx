import Section from "./Section";
import { projects } from "../data/content";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

export default function Projects() {
  return (
    <Section id="projects" kicker="03 · Projects & Research" title="Projects & Research">
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40 transition-colors hover:border-accent/40"
          >
            {project.image && (
              <div className="flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-zinc-800 bg-[#101012]">
                <img
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} preview`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold text-zinc-100 transition-colors group-hover:text-accent-bright">
              {project.title}
            </h3>

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

            {(project.demo || project.github) && (
              <div className="mt-5 flex items-center gap-5 border-t border-zinc-800/70 pt-4 text-sm font-medium">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-accent-bright transition-colors hover:text-zinc-100"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    Live demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-accent-bright"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    Code
                  </a>
                )}
              </div>
            )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
