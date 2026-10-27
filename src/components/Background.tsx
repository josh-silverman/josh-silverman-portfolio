import Section from "./Section";
import { about, education, experience, site, skills } from "../data/content";

/** About and resume in one section: prose on the left, the record on the right. */
export default function Background() {
  return (
    <Section id="background" number="02" title="Background">
      <div className="grid grid-cols-12 gap-x-6 gap-y-14">
        <div className="col-span-12 space-y-5 self-start font-serif text-lg leading-relaxed lg:sticky lg:top-20 lg:col-span-5 lg:col-start-3">
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <p className="pt-2 font-sans">
            <a href={site.resumeFile} download className="link kicker">
              {site.resumeLabel}
            </a>
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <p className="kicker border-b border-ink pb-2 text-ink-3">Experience</p>
          <ol>
            {experience.map((entry) => (
              <li key={`${entry.organization}-${entry.period}`} className="border-b border-rule">
                <details className="group">
                  <summary className="grid cursor-pointer grid-cols-[1fr_auto] gap-x-4 py-3">
                    <span>
                      <span className="font-semibold">{entry.organization}</span>
                      <span className="block text-sm text-ink-2">{entry.role}</span>
                    </span>
                    <span className="num text-right text-xs text-ink-3">
                      {entry.period}
                      <span aria-hidden="true" className="ml-3 inline-block text-ink transition-transform duration-150 group-open:rotate-45">
                        +
                      </span>
                      {entry.location && <span className="block">{entry.location}</span>}
                    </span>
                  </summary>
                  <div className="space-y-4 pb-4">
                    {(entry.groups ?? [{ label: "", bullets: entry.bullets ?? [] }]).map((group) => (
                      <div key={group.label || entry.organization}>
                        {group.label && <p className="mb-2 text-sm font-medium text-ink">{group.label}</p>}
                        <ul className="space-y-2">
                          {group.bullets.map((bullet) => (
                            <li key={bullet.slice(0, 32)} className="grid grid-cols-[0.75rem_1fr] text-sm leading-relaxed text-ink-2">
                              <span aria-hidden="true" className="text-ink-3">·</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </li>
            ))}
          </ol>

          <p className="kicker mt-12 border-b border-ink pb-2 text-ink-3">Education</p>
          <ul>
            {education.map((entry) => (
              <li key={entry.degree} className="grid grid-cols-[1fr_auto] gap-x-4 border-b border-rule py-3">
                <span>
                  <span className="font-semibold">{entry.degree}</span>
                  <span className="block text-sm text-ink-2">{entry.school}</span>
                </span>
                <span className="num text-right text-xs text-ink-3">
                  {entry.period}
                  {entry.detail && <span className="block">{entry.detail}</span>}
                </span>
              </li>
            ))}
          </ul>

          <p className="kicker mt-12 border-b border-ink pb-2 text-ink-3">Skills</p>
          <dl>
            {skills.map((group) => (
              <div key={group.category} className="grid gap-x-4 border-b border-rule py-3 sm:grid-cols-[9rem_1fr]">
                <dt className="text-sm font-semibold">{group.category}</dt>
                <dd className="text-sm leading-relaxed text-ink-2">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}
