import { nflCriteria, nflExperiments, nflPipeline, nflProject } from "../../data/nfl/content";
import { ExtLink, Pipeline } from "../primitives";

const STATUS = { pass: "Pass", fail: "Fail", open: "In progress" } as const;

/** The technical layer: pipeline, pre-registered criteria, and every experiment tried. */
export default function NflMethod() {
  return (
    <div>
        <Pipeline steps={nflPipeline} />

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className="kicker text-ink-3">Success criteria, written before scoring</p>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {nflCriteria.map((c) => (
                  <tr key={c.id} className="border-t border-rule align-top">
                    <th scope="row" className="num py-2 pr-3 text-left font-normal text-ink-3">
                      {c.id}
                    </th>
                    <td className="py-2 pr-3 text-ink-2">{c.test}</td>
                    <td
                      className={`num py-2 text-right text-xs whitespace-nowrap ${
                        c.status === "fail" ? "text-signal-ink" : c.status === "pass" ? "text-ink" : "text-ink-3"
                      }`}
                    >
                      {STATUS[c.status]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Both Elo models over-predict home wins by 2.4 to 3.0 points pooled, so neither passes S3 on
              2019-2025. The QB version beat raw Elo in 6 of 7 seasons and becomes the live model from 2026
              Week 8.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <p className="kicker text-ink-3">Each idea pre-registered in git, run once, judged by a fixed rule</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[32rem] text-sm">
                <thead>
                  <tr className="kicker text-left text-ink-3">
                    <th scope="col" className="pb-2 pr-3 font-normal">Idea</th>
                    <th scope="col" className="pb-2 pr-3 font-normal">Log loss vs Elo [95% CI]</th>
                    <th scope="col" className="pb-2 font-normal">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {nflExperiments.map((e) => (
                    <tr key={e.idea} className={`border-t border-rule align-top ${e.kept ? "bg-paper-2" : ""}`}>
                      <td className="py-2 pr-3 pl-1 text-ink">{e.idea}</td>
                      <td className="num py-2 pr-3 text-xs text-ink-2">{e.change}</td>
                      <td className={`py-2 pr-1 ${e.kept ? "text-ink" : "text-ink-2"}`}>{e.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              No random splits: scalers, shrinkage and models are fit inside each training fold. Every
              comparison uses paired bootstrap intervals on the same games, plus AUC, so a model cannot win
              by being less confident. 84 unit tests cover the as-of rules. The 2026 ledger is the only clean
              holdout, since 2019-2025 was examined many times during diagnosis.
            </p>
          </div>
        </div>

        <p className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <ExtLink href={nflProject.github}>Code, tests and locked ledger on GitHub</ExtLink>
          <ExtLink href={`${nflProject.github}/blob/main/reports/experiments.md`}>Full experiment log</ExtLink>
                  </p>
    </div>
  );
}
