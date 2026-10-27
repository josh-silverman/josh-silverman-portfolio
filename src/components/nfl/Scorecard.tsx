import type { NflData } from "../../data/nfl/types";
import { scorecardCopy as copy } from "../../data/nfl/content";
import { pct } from "../../lib/format";
import { pickRecord, weekSpan } from "../../lib/nfl-select";
import Ruler from "../charts/Ruler";

export default function Scorecard({ data }: { data: NflData }) {
  const live = pickRecord(data, true);
  const season = pickRecord(data, false);
  const bt = data.backtest;

  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 lg:col-span-8">
        <p className="kicker text-ink-3">2019-2025 · share of winners picked · {bt.games.toLocaleString()} games</p>
        <div className="mt-6 px-6">
          <Ruler
            domain={[0.5, 0.7]}
            ticks={[0.5, 0.55, 0.6, 0.65, 0.7]}
            format={(v) => pct(v, 1)}
            label={`Always picking the home team: ${pct(bt.alwaysHome, 1)}. Elo: ${pct(bt.elo, 1)}. Elo with QB adjustment: ${pct(copy.eloQb, 1)}. Vegas: ${pct(bt.vegas, 1)}.`}
            marks={[
              { value: bt.alwaysHome, label: "Always pick the home team" },
              { value: bt.elo, label: "Elo" },
              { value: copy.eloQb, label: "Elo + QB news", emphasis: true },
              { value: bt.vegas, label: "Vegas" },
            ]}
          />
        </div>
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink-2">{copy.backtest}</p>
      </div>

      <aside className="col-span-12 border-t border-ink pt-3 lg:col-span-4">
        <p className="kicker text-ink-3">2026, locked before kickoff</p>
        <table className="mt-3 w-full text-sm">
          <caption className="sr-only">2026 live record</caption>
          <tbody className="num">
            <tr className="border-b border-rule">
              <th scope="row" className="py-2 text-left font-normal text-ink-2">
                Model, {weekSpan(live.weeks)}
              </th>
              <td className="py-2 text-right">
                {live.ours} of {live.games}
              </td>
            </tr>
            <tr className="border-b border-rule">
              <th scope="row" className="py-2 text-left font-normal text-ink-2">
                Vegas, same games
              </th>
              <td className="py-2 text-right">
                {live.vegas} of {live.games}
              </td>
            </tr>
            <tr className="border-b border-rule">
              <th scope="row" className="py-2 text-left font-normal text-ink-3">
                Model incl. backfilled {weekSpan(season.weeks.filter((w) => !live.weeks.includes(w)))}
              </th>
              <td className="py-2 text-right text-ink-3">
                {season.ours} of {season.games}
              </td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">{copy.calibration}</p>
      </aside>
    </div>
  );
}
