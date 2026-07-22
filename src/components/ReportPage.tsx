import type { ReportBlock, TournamentReport } from "../data/reports";
import { formatPublished } from "../data/reports";
import { ArrowLeftIcon } from "./icons";
import { socials } from "../data/content";

function Block({ block }: { block: ReportBlock }) {
  switch (block.kind) {
    case "heading":
      return (
        <h2 className="mt-12 text-xl font-semibold tracking-tight text-zinc-100 sm:text-2xl">
          {block.text}
        </h2>
      );

    case "paragraph":
      return <p className="mt-5 leading-relaxed text-zinc-300">{block.text}</p>;

    case "players":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((player) => (
            <li
              key={player.name}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-semibold text-zinc-100">{player.name}</span>
                {player.stat && (
                  <span className="font-mono text-xs whitespace-nowrap text-accent-bright">
                    {player.stat}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{player.note}</p>
            </li>
          ))}
        </ul>
      );

    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item.slice(0, 32)} className="flex gap-3 text-zinc-300">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div className="mt-10 rounded-lg border border-accent/20 bg-accent/5 p-5">
          <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{block.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">{block.text}</p>
        </div>
      );
  }
}

export default function ReportPage({ report }: { report: TournamentReport }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <a
          href="#reports"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-accent-bright"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          All reports
        </a>

        <header className="mt-8 border-b border-zinc-800 pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-zinc-500">
            <span className="text-accent">{report.event}</span>
            <span className="text-zinc-700">/</span>
            <span>{report.dates}</span>
            <span className="text-zinc-700">/</span>
            <span>
              {report.course}, {report.location}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl">
            {report.headline}
          </h1>

          <p className="mt-4 leading-relaxed text-zinc-400">{report.summary}</p>

          <p className="mt-5 font-mono text-xs text-zinc-600">
            Published {formatPublished(report.published)} · {report.readMinutes} min read
          </p>
        </header>

        {report.stats && report.stats.length > 0 && (
          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {report.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4"
              >
                <dt className="text-2xl font-semibold text-accent-bright tabular-nums">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-zinc-500">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <article>
          {report.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        <footer className="mt-16 border-t border-zinc-800 pt-8">
          <p className="text-sm leading-relaxed text-zinc-500">
            Written by Josh Silverman. Model output from Pinpoint Analytics, built on DataGolf
            baseline projections plus my own strokes-gained work. Nothing here is betting advice.
          </p>
          <div className="mt-5 flex flex-wrap gap-5 text-sm font-medium">
            <a
              href="#reports"
              className="text-accent-bright transition-colors hover:text-zinc-100"
            >
              All reports
            </a>
            <a href="#model" className="text-zinc-400 transition-colors hover:text-accent-bright">
              About the model
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="text-zinc-400 transition-colors hover:text-accent-bright"
            >
              Get in touch
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
