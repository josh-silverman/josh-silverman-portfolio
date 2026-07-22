import Section from "./Section";
import { research } from "../data/content";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

export default function Research() {
  return (
    <Section id="research" kicker="04 · Research" title="Research & Analysis">
      <p className="-mt-4 mb-8 max-w-2xl leading-relaxed text-zinc-400">
        Longer-form studies using PGA Tour and DataGolf data. These are questions I wanted a real
        answer to, worked out with enough rigor that the answer holds up.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {research.map((project) => (
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
                      Read the study
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
