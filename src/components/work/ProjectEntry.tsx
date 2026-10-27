import type { ReactNode } from "react";
import type { ProjectSummary } from "../../data/content";
import { Drawer, ExtLink } from "../primitives";

/**
 * One project, laid out the same way for every project: kicker, title,
 * summary, links and a few facts up front; everything else in a closed
 * "More detail" drawer.
 */
export default function ProjectEntry({
  project,
  index,
  extra,
  detail,
}: {
  project: ProjectSummary;
  index: number;
  /** Small always-visible addition under the links (e.g. the reports list). */
  extra?: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <article id={project.id} className="grid scroll-mt-16 grid-cols-12 gap-x-6 border-t border-ink pt-4">
      <p className="kicker col-span-12 text-ink-3 lg:col-span-2">
        <span className="num">{String(index + 1).padStart(2, "0")}</span>
        <span className="mt-1 block">{project.kicker}</span>
      </p>

      <div className="col-span-12 mt-3 lg:col-span-6 lg:mt-0">
        <h3 className="display text-3xl text-ink sm:text-[2.4rem]">{project.title}</h3>
        <p className="mt-4 max-w-[58ch] leading-relaxed text-ink-2">{project.summary}</p>
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {project.links.map((l) => (
            <ExtLink key={l.href} href={l.href}>
              {l.label}
            </ExtLink>
          ))}
        </p>
        {extra}
      </div>

      <ul className="col-span-12 mt-6 self-start border-b border-rule lg:col-span-4 lg:mt-1">
        {project.facts.map((fact) => (
          <li key={fact} className="border-t border-rule py-2 text-sm leading-snug text-ink-2">
            {fact}
          </li>
        ))}
      </ul>

      {detail && (
        <div className="col-span-12 mt-8 lg:col-span-10 lg:col-start-3">
          <Drawer title="More detail">{detail}</Drawer>
        </div>
      )}
    </article>
  );
}
