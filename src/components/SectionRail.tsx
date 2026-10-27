import { useEffect, useState } from "react";
import { site } from "../data/content";

export const sections = [
  { id: "projects", label: "Projects" },
  { id: "background", label: "Background" },
  { id: "contact", label: "Contact" },
];

/**
 * Solid sticky rail with numbered section links. The current section is
 * underlined in signal. On report pages the links jump back to the home view.
 */
export default function SectionRail({ view }: { view: string }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setCurrent(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-56px 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  return (
    <nav aria-label="Sections" className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="wrap flex h-12 items-center gap-6">
        <a href="#top" className="kicker shrink-0 font-medium text-ink">
          {site.name}
        </a>
        <ul className="-mr-4 flex min-w-0 flex-1 items-center gap-5 overflow-x-auto pr-4 sm:mr-0 sm:justify-end sm:pr-0">
          {sections.map((s, i) => (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={current === s.id ? "true" : undefined}
                className={`kicker underline-offset-[6px] transition-colors hover:text-ink ${
                  current === s.id ? "text-ink underline decoration-signal decoration-2" : "text-ink-3"
                }`}
              >
                <span className="num mr-1.5 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
