import type { ReportBlock, TournamentReport } from "../data/reports";
import { formatPublished } from "../data/reports";
import { socials } from "../data/content";

function Block({ block }: { block: ReportBlock }) {
  switch (block.kind) {
    case "heading":
      return <h2 className="display mt-14 border-t border-ink pt-3 text-3xl text-ink">{block.text}</h2>;

    case "paragraph":
      return <p className="mt-5 font-serif text-[1.2rem] leading-[1.6] text-ink">{block.text}</p>;

    case "players":
      return (
        <ul className="mt-6 border-b border-rule">
          {block.items.map((player) => (
            <li key={player.name} className="border-t border-rule py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="font-semibold text-ink">{player.name}</span>
                {player.stat && <span className="num text-xs whitespace-nowrap text-signal-ink">{player.stat}</span>}
              </div>
              <p className="mt-1.5 leading-relaxed text-ink-2">{player.note}</p>
            </li>
          ))}
        </ul>
      );

    case "list":
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item) => (
            <li key={item.slice(0, 32)} className="grid grid-cols-[1.25rem_1fr] font-serif text-[1.1rem] leading-relaxed text-ink">
              <span aria-hidden="true" className="text-signal-ink">·</span>
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <aside className="mt-10 border-l-4 border-signal bg-paper-2 px-5 py-4">
          <p className="kicker text-ink-2">{block.title}</p>
          <p className="mt-2 leading-relaxed text-ink">{block.text}</p>
        </aside>
      );
  }
}

export default function ReportPage({ report }: { report: TournamentReport }) {
  return (
    <article className="wrap pt-10 pb-24">
      <a href="#pga" className="kicker link text-ink-2">
        ← All reports
      </a>

      <header className="mt-8 grid grid-cols-12 gap-x-6 border-t-[3px] border-ink pt-4">
        <p className="kicker col-span-12 text-signal-ink lg:col-span-2">
          {report.event}
          <span className="block text-ink-3">{report.dates}</span>
        </p>
        <div className="col-span-12 mt-3 lg:col-span-8 lg:mt-0">
          <h1 className="display text-[clamp(2.5rem,6vw,4.75rem)] text-ink">{report.headline}</h1>
          <p className="mt-5 font-serif text-xl leading-snug text-ink-2">{report.summary}</p>
          <p className="kicker mt-5 text-ink-3">
            {report.course}, {report.location} · Published {formatPublished(report.published)} ·{" "}
            {report.readMinutes} min read
          </p>
        </div>
      </header>

      <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
        {report.stats && report.stats.length > 0 && (
          <aside className="col-span-12 lg:order-2 lg:col-span-3 lg:col-start-10">
            <div className="bg-panel text-panel-ink lg:sticky lg:top-16">
              <p className="kicker border-b border-panel-rule px-4 py-2.5 text-panel-ink-2">Box score</p>
              <dl>
                {report.stats.map((stat) => (
                  <div key={stat.label} className="border-b border-panel-rule px-4 py-3 last:border-b-0">
                    <dt className="num text-2xl text-panel-ink">{stat.value}</dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-panel-ink-2">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        )}

        <div className="col-span-12 max-w-[66ch] lg:order-1 lg:col-span-7 lg:col-start-3">
          {report.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <footer className="mt-16 border-t border-ink pt-4">
            <p className="text-sm leading-relaxed text-ink-2">
              Written by Josh Silverman. Model output from Pinpoint Analytics, built on DataGolf baseline
              projections plus my own strokes-gained work. Nothing here is betting advice.
            </p>
            <p className="kicker mt-5 flex flex-wrap gap-x-6 gap-y-2">
              <a href="#pga" className="link">All reports</a>
              <a href={`mailto:${socials.email}`} className="link">Get in touch</a>
            </p>
          </footer>
        </div>
      </div>
    </article>
  );
}
