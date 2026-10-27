import { useMemo, useState } from "react";
import type { NflData, NflRanking } from "../../data/nfl/types";
import { ELO_PER_POINT, MEAN_RATING } from "../../lib/elo";
import { pct, signed } from "../../lib/format";
import EloChart from "../charts/EloChart";
import Sparkline from "../charts/Sparkline";
import { Panel } from "../primitives";
import TeamTag from "./TeamTag";

type SortKey = "rating" | "playoff";
const MAX_SELECTED = 3;

/**
 * Ratings table and the all-teams chart, linked: hovering a row previews a
 * team on the chart, clicking pins it (up to three).
 */
export default function PowerRatings({ data, initial }: { data: NflData; initial: string[] }) {
  const [sort, setSort] = useState<SortKey>("rating");
  const [selected, setSelected] = useState<string[]>(initial.slice(0, MAX_SELECTED));
  const [hover, setHover] = useState<string | null>(null);

  const domain = useMemo<[number, number]>(() => {
    const all = Object.values(data.history).flat().map(([, r]) => r);
    return [Math.min(...all), Math.max(...all)];
  }, [data.history]);

  const rows = useMemo(() => {
    const out = [...data.rankings];
    if (sort === "playoff") out.sort((a, b) => b.odds.playoff - a.odds.playoff || a.rank - b.rank);
    else out.sort((a, b) => a.rank - b.rank);
    return out;
  }, [data.rankings, sort]);

  const toggle = (team: string) =>
    setSelected((s) =>
      s.includes(team) ? s.filter((t) => t !== team) : [...s, team].slice(-MAX_SELECTED),
    );

  const active = hover && !selected.includes(hover) ? [...selected, hover] : selected;
  const lastWeek = Math.max(...Object.values(data.history).flat().map(([w]) => w));

  const SortButton = ({ k, children }: { k: SortKey; children: string }) => (
    <button
      type="button"
      onClick={() => setSort(k)}
      aria-pressed={sort === k}
      className={`kicker underline-offset-4 ${sort === k ? "text-panel-ink underline decoration-signal decoration-2" : "text-panel-ink-3 hover:text-panel-ink-2"}`}
    >
      {children}
    </button>
  );

  return (
    <div className="grid gap-px bg-panel-rule lg:grid-cols-12">
      <Panel
        label={`Ratings after week ${lastWeek}`}
        className="lg:col-span-7"
      >
        <div className="flex items-center gap-4 px-4 py-2.5">
          <span className="kicker text-panel-ink-3">Sort</span>
          <SortButton k="rating">Rating</SortButton>
          <SortButton k="playoff">Playoff odds</SortButton>
          <span className="kicker ml-auto text-panel-ink-3">
            {selected.length}/{MAX_SELECTED} on chart
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-[13px]">
            <thead>
              <tr className="kicker border-t border-panel-rule text-left text-panel-ink-3">
                <th scope="col" className="py-2 pr-2 pl-4 font-normal">Rk</th>
                <th scope="col" className="py-2 pr-2 font-normal">Team</th>
                <th scope="col" className="py-2 pr-2 font-normal">W-L</th>
                <th scope="col" className="py-2 pr-2 text-right font-normal">Rating</th>
                <th scope="col" className="py-2 pr-2 font-normal">Trend</th>
                <th scope="col" className="py-2 pr-4 font-normal">Playoffs</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r: NflRanking) => {
                const isOn = selected.includes(r.team);
                return (
                  <tr
                    key={r.team}
                    onMouseEnter={() => setHover(r.team)}
                    onMouseLeave={() => setHover(null)}
                    className={`border-t border-panel-rule transition-colors ${isOn ? "bg-panel-2" : "hover:bg-panel-2"}`}
                  >
                    <td className="num py-1.5 pr-2 pl-4 text-panel-ink-2">
                      {r.rank}
                      <span className={`ml-1.5 text-[10px] ${r.rankChange > 0 ? "text-panel-ink" : "text-panel-ink-3"}`}>
                        {r.rankChange > 0 ? `▲${r.rankChange}` : r.rankChange < 0 ? `▼${-r.rankChange}` : ""}
                      </span>
                    </td>
                    <td className="py-1.5 pr-2">
                      <button
                        type="button"
                        onClick={() => toggle(r.team)}
                        onFocus={() => setHover(r.team)}
                        onBlur={() => setHover(null)}
                        aria-pressed={isOn}
                        aria-label={`${data.teams[r.team]?.name ?? r.team}, ${isOn ? "remove from" : "add to"} chart`}
                        className="flex items-center gap-2 text-left"
                      >
                        <span
                          aria-hidden="true"
                          className={`h-2.5 w-2.5 border ${isOn ? (selected[0] === r.team ? "border-signal bg-signal" : "border-panel-ink bg-panel-ink") : "border-panel-ink-3"}`}
                        />
                        <TeamTag abbr={r.team} team={data.teams[r.team]} />
                        <span className="hidden text-panel-ink-2 xl:inline">
                          {data.teams[r.team]?.name.split(" ").slice(-1)[0]}
                        </span>
                      </button>
                    </td>
                    <td className="num py-1.5 pr-2 text-panel-ink-2">{r.record}</td>
                    <td className="num py-1.5 pr-2 text-right text-panel-ink">{r.rating.toFixed(0)}</td>
                    <td className="py-1.5 pr-2 text-panel-ink-2">
                      <Sparkline values={(data.history[r.team] ?? []).map(([, v]) => v)} domain={domain} />
                    </td>
                    <td className="py-1.5 pr-4">
                      <span className="flex items-center gap-2">
                        <span className="relative h-1.5 w-16 bg-panel-rule">
                          <span className="absolute inset-y-0 left-0 bg-panel-ink-2" style={{ width: pct(r.odds.playoff) }} />
                        </span>
                        <span className="num w-9 text-right text-panel-ink">{pct(r.odds.playoff)}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-panel-rule px-4 py-3 text-xs text-panel-ink-3">
          ▲▼ rank change since last week. League average {MEAN_RATING}; {ELO_PER_POINT} rating points is
          about one point of spread, so {data.rankings[0].team} at {data.rankings[0].rating.toFixed(0)}{" "}
          ({signed(data.rankings[0].rating - MEAN_RATING)}) would be favored by about{" "}
          {((data.rankings[0].rating - MEAN_RATING) / ELO_PER_POINT).toFixed(1)} points over an average team on a neutral field.
        </p>
      </Panel>

      <Panel label="Rating by week, all 32 teams" className="lg:col-span-5">
        <div className="lg:sticky lg:top-14">
          <EloChart history={data.history} active={active} />
          <p className="px-4 pt-1 pb-4 text-xs text-panel-ink-3">
            Dotted line: league average. Hover or use the arrow keys on the chart to read a week.
          </p>
        </div>
      </Panel>
    </div>
  );
}
