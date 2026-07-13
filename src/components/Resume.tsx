import Section from "./Section";
import { education, experience, site, skills } from "../data/content";
import { DownloadIcon } from "./icons";

export default function Resume() {
  return (
    <Section id="resume" kicker="02 · Resume" title="Experience & Education">
      <div className="grid gap-14 lg:grid-cols-[1fr_20rem]">
        {/* Experience timeline */}
        <div>
          <h3 className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
            Experience
          </h3>
          <ol className="mt-6 space-y-10 border-l border-zinc-800 pl-6">
            {experience.map((entry) => (
              <li key={`${entry.organization}-${entry.period}`} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[1.83rem] h-2.5 w-2.5 rounded-full border-2 border-accent bg-zinc-950"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="font-semibold text-zinc-100">
                    {entry.role}{" "}
                    <span className="font-normal text-zinc-400">· {entry.organization}</span>
                  </h4>
                  <p className="font-mono text-xs text-zinc-500">{entry.period}</p>
                </div>
                {entry.location && (
                  <p className="mt-0.5 text-xs text-zinc-500">{entry.location}</p>
                )}
                <ul className="mt-3 space-y-2">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 32)}
                      className="flex gap-2.5 text-sm leading-relaxed text-zinc-400"
                    >
                      <span aria-hidden="true" className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Education + skills sidebar */}
        <div className="space-y-12">
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
              Education
            </h3>
            <ul className="mt-6 space-y-6">
              {education.map((entry) => (
                <li
                  key={entry.degree}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4"
                >
                  <p className="text-sm font-semibold text-zinc-100">{entry.degree}</p>
                  <p className="mt-1 text-sm text-zinc-400">{entry.school}</p>
                  <p className="mt-1 font-mono text-xs text-zinc-500">
                    {entry.period}
                    {entry.detail ? ` · ${entry.detail}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
              Skills
            </h3>
            <div className="mt-6 space-y-5">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="text-xs font-medium text-zinc-400">{group.category}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href={site.resumeFile}
            download
            className="inline-flex items-center gap-2 rounded-md border border-accent/50 px-5 py-2.5 text-sm font-medium text-accent-bright transition-colors hover:bg-accent/10"
          >
            <DownloadIcon className="h-4 w-4" />
            {site.resumeLabel}
          </a>
        </div>
      </div>
    </Section>
  );
}
