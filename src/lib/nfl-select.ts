import type { NflData, NflGame, NflWeek } from "../data/nfl/types";

/** Model minus Vegas, in home win probability. */
export const gapVsVegas = (g: NflGame) => (g.pVegasHome == null ? 0 : g.pHome - g.pVegasHome);

/**
 * The game the model disagrees with Vegas on most in the latest week,
 * preferring games that have not been played yet.
 */
export function featuredGame(data: NflData): { week: NflWeek; game: NflGame } | null {
  const week = data.weeks[data.weeks.length - 1];
  if (!week || week.games.length === 0) return null;
  const withLine = week.games.filter((g) => g.pVegasHome != null);
  const pool = withLine.filter((g) => !g.result).length > 0 ? withLine.filter((g) => !g.result) : withLine;
  const pick = [...(pool.length ? pool : week.games)].sort(
    (a, b) => Math.abs(gapVsVegas(b)) - Math.abs(gapVsVegas(a)),
  )[0];
  return { week, game: pick };
}

export interface PickRecord {
  games: number;
  ours: number;
  vegas: number;
  weeks: number[];
}

/** Winners picked in finished games. `live` limits it to weeks locked before kickoff. */
export function pickRecord(data: NflData, live: boolean): PickRecord {
  const out: PickRecord = { games: 0, ours: 0, vegas: 0, weeks: [] };
  for (const w of data.weeks) {
    if (live && !w.live) continue;
    const done = w.games.filter((g) => g.result);
    if (done.length === 0) continue;
    out.weeks.push(w.week);
    for (const g of done) {
      out.games += 1;
      if (g.result!.weRight) out.ours += 1;
      if (g.result!.vegasRight) out.vegas += 1;
    }
  }
  return out;
}

/** "Weeks 6-7" or "Week 6". */
export function weekSpan(weeks: number[]): string {
  if (weeks.length === 0) return "";
  if (weeks.length === 1) return `Week ${weeks[0]}`;
  return `Weeks ${weeks[0]}-${weeks[weeks.length - 1]}`;
}

/** Latest rating for every team. */
export function latestRatings(data: NflData): Record<string, number> {
  return Object.fromEntries(data.rankings.map((r) => [r.team, r.rating]));
}
