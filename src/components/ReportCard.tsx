import type { TournamentReport } from "../data/reports";
import { formatPublished } from "../data/reports";
import { reportHref } from "../lib/router";
import { ArrowRightIcon } from "./icons";

export default function ReportCard({ report }: { report: TournamentReport }) {
  return (
    <a
      href={reportHref(report.slug)}
      className="group block rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-colors hover:border-accent/40"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
        <span className="text-accent">{report.event}</span>
        <span className="text-zinc-700">/</span>
        <span>{report.course}</span>
        <span className="text-zinc-700">/</span>
        <span>{formatPublished(report.published)}</span>
        <span className="text-zinc-700">/</span>
        <span>{report.readMinutes} min read</span>
      </div>

      <h4 className="mt-3 text-lg font-semibold text-zinc-100 transition-colors group-hover:text-accent-bright">
        {report.headline}
      </h4>

      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">{report.summary}</p>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-bright">
        Read the report
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
