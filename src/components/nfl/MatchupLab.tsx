import { useId, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { NflData } from "../../data/nfl/types";
import { ELO_PER_POINT, K, QB_OUT_ELO, pregame, update } from "../../lib/elo";
import { fixed, pct, signed } from "../../lib/format";
import { latestRatings } from "../../lib/nfl-select";
import { Panel } from "../primitives";

function Line({ label, value, note, strong }: { label: ReactNode; value: ReactNode; note?: ReactNode; strong?: boolean }) {
  return (
    <div className={`grid grid-cols-[1fr_auto] gap-x-4 border-t border-panel-rule py-2 ${strong ? "text-panel-ink" : "text-panel-ink-2"}`}>
      <dt className="text-sm">
        {label}
        {note && <span className="num block text-[11px] text-panel-ink-3">{note}</span>}
      </dt>
      <dd className={`num text-right ${strong ? "text-base text-panel-ink" : "text-sm"}`}>{value}</dd>
    </div>
  );
}

const field =
  "num h-9 w-full border border-panel-rule bg-panel px-2 text-sm text-panel-ink focus-visible:border-panel-ink";

export default function MatchupLab({
  data,
  initialHome,
  initialAway,
  initialNeutral = false,
}: {
  data: NflData;
  initialHome: string;
  initialAway: string;
  initialNeutral?: boolean;
}) {
  const id = useId();
  const ratings = useMemo(() => latestRatings(data), [data]);
  const teams = useMemo(() => Object.keys(data.teams).sort(), [data.teams]);
  const livePts = data.weeks.flatMap((w) => w.games).find((g) => g.why.qbPts > 0)?.why.qbPts;
  const qbPts = livePts ?? QB_OUT_ELO;

  const [home, setHome] = useState(initialHome);
  const [away, setAway] = useState(initialAway);
  const [neutral, setNeutral] = useState(initialNeutral);
  const [homeQb, setHomeQb] = useState(false);
  const [awayQb, setAwayQb] = useState(false);
  const [homeScore, setHomeScore] = useState(24);
  const [awayScore, setAwayScore] = useState(20);

  const pick = (side: "home" | "away", team: string) => {
    if (side === "home") {
      if (team === away) setAway(home);
      setHome(team);
    } else {
      if (team === home) setHome(away);
      setAway(team);
    }
  };

  const hr = ratings[home];
  const ar = ratings[away];
  const pre = pregame({ homeRating: hr, awayRating: ar, neutral, homeQbOut: homeQb, awayQbOut: awayQb, qbPts });
  const post = update(hr, ar, homeScore, awayScore, neutral);
  const ratingP = pregame({ homeRating: hr, awayRating: ar, neutral }).pHome;
  const fav = pre.gap >= 0 ? home : away;
  const winner = homeScore > awayScore ? home : awayScore > homeScore ? away : null;
  const winnerP = winner === home ? ratingP : 1 - ratingP;

  const name = (t: string) => data.teams[t]?.name ?? t;
  const score = (v: string) => Math.max(0, Math.min(99, Math.round(Number(v) || 0)));

  return (
    <Panel label="Matchup lab · live calculation" status={`Ratings after week ${data.meta.currentWeek}`}>
      <div className="grid gap-px bg-panel-rule lg:grid-cols-12">
        {/* Inputs */}
        <fieldset className="space-y-5 bg-panel p-4 lg:col-span-4">
          <legend className="sr-only">Choose a matchup</legend>
          {(["away", "home"] as const).map((side) => (
            <div key={side}>
              <label htmlFor={`${id}-${side}`} className="kicker text-panel-ink-3">
                {side === "home" ? (neutral ? "Team B" : "Home") : neutral ? "Team A" : "Away"}
              </label>
              <select
                id={`${id}-${side}`}
                className={`${field} mt-1.5`}
                value={side === "home" ? home : away}
                onChange={(e) => pick(side, e.target.value)}
              >
                {teams.map((t) => (
                  <option key={t} value={t}>
                    {t} · {name(t)} ({ratings[t]?.toFixed(0)})
                  </option>
                ))}
              </select>
              <label className="mt-2 flex items-center gap-2 text-sm text-panel-ink-2">
                <input
                  type="checkbox"
                  className="accent-[var(--color-signal)]"
                  checked={side === "home" ? homeQb : awayQb}
                  onChange={(e) => (side === "home" ? setHomeQb : setAwayQb)(e.target.checked)}
                />
                Usual starting QB out ({signed(-qbPts)})
              </label>
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm text-panel-ink-2">
            <input
              type="checkbox"
              className="accent-[var(--color-signal)]"
              checked={neutral}
              onChange={(e) => setNeutral(e.target.checked)}
            />
            Neutral site (no home field)
          </label>
        </fieldset>

        {/* Pregame worksheet */}
        <div className="bg-panel p-4 lg:col-span-4">
          <p className="kicker text-panel-ink-3">1 · Before the game</p>
          <dl className="mt-3">
            <Line label={`${home} rating`} value={hr.toFixed(0)} />
            <Line label="Home field" value={signed(pre.homeField)} note={neutral ? "neutral site" : undefined} />
            <Line label={`${away} rating`} value={fixed(-ar, 0)} />
            <Line label="QB adjustment" value={signed(pre.qbAdjust)} />
            <Line label={`Rating gap for ${home}`} value={signed(pre.gap)} strong />
            <Line
              label={`${home} win chance`}
              note={`1 / (1 + 10^(${fixed(-pre.gap, 0)} / 400))`}
              value={pct(pre.pHome, 1)}
              strong
            />
            <Line
              label="Expected margin"
              note={`|gap| / ${ELO_PER_POINT}`}
              value={`${fav} by ${Math.abs(pre.spread).toFixed(1)}`}
              strong
            />
          </dl>
          <div className="mt-4" aria-hidden="true">
            <div className="flex h-2">
              <div className="bg-signal" style={{ width: pct(pre.pHome, 1) }} />
              <div className="flex-1 bg-panel-ink-3" />
            </div>
            <div className="num mt-1 flex justify-between text-[11px] text-panel-ink-2">
              <span>
                {home} {pct(pre.pHome)}
              </span>
              <span>
                {away} {pct(1 - pre.pHome)}
              </span>
            </div>
          </div>
        </div>

        {/* Post-game update */}
        <div className="bg-panel p-4 lg:col-span-4">
          <p className="kicker text-panel-ink-3">2 · Enter a final score</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(
              [
                [away, awayScore, setAwayScore],
                [home, homeScore, setHomeScore],
              ] as const
            ).map(([team, value, set]) => (
              <label key={team} className="text-sm text-panel-ink-2">
                <span className="num">{team}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={99}
                  value={value}
                  onChange={(e) => set(score(e.target.value))}
                  className={`${field} mt-1`}
                />
              </label>
            ))}
          </div>
          <dl className="mt-3">
            <Line
              label="Margin multiplier"
              note="ln(|margin| + 1) × 2.2 / (winner gap × 0.001 + 2.2)"
              value={post.multiplier.toFixed(2)}
            />
            <Line
              label={`Points moved to ${home}`}
              note={`${K} × ${post.multiplier.toFixed(2)} × (${post.result} − ${ratingP.toFixed(3)})`}
              value={signed(post.shift, 1)}
              strong
            />
            <Line label={home} value={`${hr.toFixed(0)} → ${post.homeAfter.toFixed(1)}`} />
            <Line label={away} value={`${ar.toFixed(0)} → ${post.awayAfter.toFixed(1)}`} />
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-panel-ink-2" aria-live="polite">
            {winner == null
              ? "A tie moves neither rating."
              : winnerP < 0.5
                ? `${winner} had a ${pct(winnerP)} chance, so the upset moves the ratings more.`
                : `${winner} was the favorite at ${pct(winnerP)}, so a win moves the ratings less than an upset would.`}{" "}
            QB adjustments change the pick, never the ratings.
          </p>
        </div>
      </div>
    </Panel>
  );
}
