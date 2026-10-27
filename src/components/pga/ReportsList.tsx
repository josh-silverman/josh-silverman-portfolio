import { formatPublished, reports } from "../../data/reports";
import { reportHref } from "../../lib/router";

/** Weekly reports as compact dateline rows, newest first. */
export default function ReportsList() {
  return (
    <div className="mt-8">
      <p className="kicker text-ink-3">Weekly tournament reports</p>
      <ol className="mt-2 border-b border-rule">
        {reports.map((r) => (
          <li key={r.slug} className="border-t border-rule">
            <a
              href={reportHref(r.slug)}
              className="group grid gap-x-4 gap-y-0.5 py-2.5 text-sm sm:grid-cols-[7.5rem_1fr]"
            >
              <span className="kicker pt-0.5 text-ink-3">{formatPublished(r.published)}</span>
              <span className="text-ink group-hover:underline group-hover:decoration-signal group-hover:decoration-2 group-hover:underline-offset-4">
                {r.event}: {r.headline}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
