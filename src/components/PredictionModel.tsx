import Section from "./Section";
import ReportCard from "./ReportCard";
import { predictionModel as model } from "../data/content";
import { reports } from "../data/reports";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

export default function PredictionModel() {
  return (
    <Section id="model" kicker="03 · Prediction Model" title="PGA Tour Prediction Model">
      {/* ── Project overview ─────────────────────────────────────── */}
      <article className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/40">
        {model.image && (
          <div className="flex aspect-[16/9] items-center justify-center overflow-hidden border-b border-zinc-800 bg-[#101012]">
            <img
              src={model.image}
              alt={model.imageAlt ?? `${model.title} results`}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-zinc-100 sm:text-2xl">{model.title}</h3>
          <p className="mt-2 max-w-2xl leading-relaxed text-zinc-400">{model.tagline}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm font-medium">
            {model.demo && (
              <a
                href={model.demo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-accent-bright transition-colors hover:text-zinc-100"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                View the live board
              </a>
            )}
            {model.github && (
              <a
                href={model.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-accent-bright"
              >
                <GitHubIcon className="h-4 w-4" />
                Source on GitHub
              </a>
            )}
          </div>

          {/* What it is / why I built it */}
          <div className="mt-8 grid gap-8 border-t border-zinc-800/70 pt-8 sm:grid-cols-2">
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                What it is
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{model.whatItIs}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
                Why I built it
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{model.whyIBuiltIt}</p>
            </div>
          </div>

          {/* How it works */}
          <div className="mt-8 border-t border-zinc-800/70 pt-8">
            <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              How it works
            </h4>
            <ol className="mt-4 space-y-3">
              {model.howItWorks.map((item, i) => (
                <li key={item.step} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-zinc-600 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    <span className="font-semibold text-zinc-200">{item.step}.</span>{" "}
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Key findings */}
          <div className="mt-8 border-t border-zinc-800/70 pt-8">
            <h4 className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
              Key findings
            </h4>
            <dl className="mt-4 grid gap-4 sm:grid-cols-3">
              {model.keyFindings.map((f) => (
                <div key={f.label} className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4">
                  <dt className="text-lg font-semibold text-accent-bright">{f.value}</dt>
                  <dd className="mt-1 text-xs leading-relaxed text-zinc-500">{f.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{model.findingsNote}</p>
          </div>
        </div>
      </article>

      {/* ── Weekly reports ───────────────────────────────────────── */}
      <div id="reports" className="mt-16 scroll-mt-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-zinc-100">Weekly Tournament Reports</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
              A short post each tournament week covering who the model likes, where it disagrees
              with the betting market, and anything surprising in the numbers. I publish before
              the first round starts and don't edit afterward.
            </p>
          </div>
          <span className="font-mono text-xs text-zinc-600">
            {reports.length} {reports.length === 1 ? "report" : "reports"}
          </span>
        </div>

        <div className="mt-8 space-y-4">
          {reports.map((report) => (
            <ReportCard key={report.slug} report={report} />
          ))}
        </div>
      </div>
    </Section>
  );
}
