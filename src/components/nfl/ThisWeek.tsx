import { useState } from "react";
import type { NflData, NflGame } from "../../data/nfl/types";
import { pct } from "../../lib/format";
import { gapVsVegas } from "../../lib/nfl-select";
import Dumbbell from "../charts/Dumbbell";
import { ExtLink, Panel } from "../primitives";
import TeamTag from "./TeamTag";

function GameRow({ g, data }: { g: NflGame; data: NflData }) {
  const r = g.result;
  const label = `${g.away} at ${g.home}: model gives ${g.home} ${pct(g.pHome)}${
    g.pVegasHome != null ? `, Vegas ${pct(g.pVegasHome)}` : ""
  }`;
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-t border-panel-rule px-4 py-3 md:grid-cols-[9.5rem_1fr_minmax(8rem,14rem)_7.5rem_6.5rem]">
      <p className="num col-span-2 text-[11px] text-panel-ink-3 md:col-span-1">{g.kickoff}</p>

      <p className="flex items-center gap-2 text-sm">
        <TeamTag abbr={g.away} team={data.teams[g.away]} />
        <span className="text-panel-ink-3">{g.neutral ? "vs" : "@"}</span>
        <TeamTag abbr={g.home} team={data.teams[g.home]} />
        {g.bigGap && (
          <span className="kicker ml-1 border border-signal px-1 text-signal">Big gap</span>
        )}
        {g.why.qbTeams.length > 0 && (
          <span className="kicker ml-1 border border-panel-ink-3 px-1 text-panel-ink-2">
            QB out: {g.why.qbTeams.join(", ")}
          </span>
        )}
      </p>

      <div className="col-span-2 flex items-center gap-3 md:col-span-1">
        <span className="num w-9 text-right text-xs text-signal">{pct(g.pHome)}</span>
        <Dumbbell ours={g.pHome} vegas={g.pVegasHome} label={label} />
        <span className="num w-9 text-xs text-panel-ink-2">
          {g.pVegasHome != null ? pct(g.pVegasHome) : "n/a"}
        </span>
      </div>

      <p className="num text-xs leading-relaxed">
        <span className="block text-panel-ink">{g.ourLine}</span>
        <span className="block text-panel-ink-3">{g.vegasLine ?? "no line"}</span>
      </p>

      <p className="num text-right text-xs">
        {r ? (
          <>
            <span className="block text-panel-ink">
              {g.away} {r.awayScore}, {g.home} {r.homeScore}
            </span>
            <span className={r.weRight ? "text-panel-ink-2" : "text-signal"}>
              {r.weRight ? "✓ model right" : "✗ model wrong"}
            </span>
          </>
        ) : (
          <span className="text-panel-ink-3">Not played</span>
        )}
      </p>
    </li>
  );
}

export default function ThisWeek({ data }: { data: NflData }) {
  const latest = data.weeks[data.weeks.length - 1]?.week ?? 1;
  const [weekNo, setWeekNo] = useState(latest);
  const week = data.weeks.find((w) => w.week === weekNo) ?? data.weeks[data.weeks.length - 1];
  if (!week) return null;

  const groups: { name: string; games: NflGame[] }[] = [];
  for (const g of week.games) {
    const last = groups[groups.length - 1];
    if (last && last.name === g.dayGroup) last.games.push(g);
    else groups.push({ name: g.dayGroup, games: [g] });
  }
  const done = week.games.filter((g) => g.result);
  const ours = done.filter((g) => g.result!.weRight).length;
  const vegas = done.filter((g) => g.result!.vegasRight).length;
  const biggest = [...week.games].sort((a, b) => Math.abs(gapVsVegas(b)) - Math.abs(gapVsVegas(a)))[0];

  return (
    <Panel
      label={`${data.meta.season} season · week ${week.week} · ${week.games.length} games`}
      status={week.live ? "Locked before kickoff" : "Backfilled"}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3">
        <div role="group" aria-label="Choose a week" className="flex flex-wrap gap-1">
          {data.weeks.map((w) => (
            <button
              key={w.week}
              type="button"
              aria-pressed={w.week === week.week}
              onClick={() => setWeekNo(w.week)}
              className={`num h-8 min-w-10 border px-2 text-xs transition-colors ${
                w.week === week.week
                  ? "border-panel-ink bg-panel-ink text-panel"
                  : "border-panel-rule text-panel-ink-2 hover:border-panel-ink-2"
              }`}
            >
              W{w.week}
              {w.live && <span aria-label=" (live)" className="ml-1 text-signal">•</span>}
            </button>
          ))}
        </div>
        <p className="num text-xs text-panel-ink-2">
          {done.length > 0 ? (
            <>
              Model <span className="text-panel-ink">{ours}</span> of {done.length} · Vegas{" "}
              <span className="text-panel-ink">{vegas}</span> of {done.length}
            </>
          ) : (
            "No games played yet"
          )}
        </p>
      </div>

      <div className="kicker hidden grid-cols-[9.5rem_1fr_minmax(8rem,14rem)_7.5rem_6.5rem] gap-x-4 border-t border-panel-rule px-4 py-2 text-panel-ink-3 md:grid">
        <span>Kickoff</span>
        <span>Away @ home</span>
        <span className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 bg-signal" /> Model
          <span className="inline-block h-2 w-2 rounded-full border-2 border-panel-ink" /> Vegas
          <span className="text-panel-ink-3">home win %</span>
        </span>
        <span>Line: ours / Vegas</span>
        <span className="text-right">Result</span>
      </div>

      {groups.map((group) => (
        <section key={group.name} aria-label={group.name}>
          <h4 className="kicker border-t border-panel-rule bg-panel-2 px-4 py-1.5 text-panel-ink-2">
            {group.name}
          </h4>
          <ul>
            {group.games.map((g) => (
              <GameRow key={g.id} g={g} data={data} />
            ))}
          </ul>
        </section>
      ))}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-panel-rule px-4 py-3 text-xs text-panel-ink-2">
        <p>
          Biggest disagreement:{" "}
          <span className="num text-panel-ink">
            {biggest.away} @ {biggest.home}
          </span>
          , model {pct(biggest.pHome)} vs Vegas{" "}
          {biggest.pVegasHome != null ? pct(biggest.pVegasHome) : "n/a"} for {biggest.home}.
        </p>
        {week.lockUrl ? (
          <ExtLink href={week.lockUrl} className="hover:text-signal">
            {week.lockText ?? "Locked commit"}
          </ExtLink>
        ) : (
          <p className="text-panel-ink-3">Backfilled after the games, not locked live.</p>
        )}
      </div>
    </Panel>
  );
}
