import { describe, expect, it } from "vitest";
import { snapshot } from "../data/nfl";
import { HOME_FIELD, pregame, update, winProb } from "./elo";

const data = snapshot;

describe("elo.ts matches nfl_ats/elo.py", () => {
  it("reproduces the site's worked example", () => {
    const ex = data.example;
    const pre = pregame({ homeRating: ex.homeRating, awayRating: ex.awayRating });
    expect(pre.homeField).toBe(ex.homeField);
    expect(Math.round(pre.gap)).toBe(ex.gap);
    expect(pre.pHome).toBeCloseTo(ex.pHome, 2);

    const after = update(ex.homeRating, ex.awayRating, ex.homeScore, ex.awayScore);
    // The example's ratings are rounded to whole points, so allow 1 point.
    expect(Math.abs(after.homeAfter - ex.homeAfter)).toBeLessThanOrEqual(1);
    expect(Math.abs(after.awayAfter - ex.awayAfter)).toBeLessThanOrEqual(1);
  });

  it("gives the published probability for every game from its listed edge", () => {
    for (const week of data.weeks) {
      for (const g of week.games) {
        // edge is rounded to a whole point (at most ~0.0008 of probability).
        expect(Math.abs(winProb(g.why.edge) - g.pHome), g.id).toBeLessThan(0.002);
      }
    }
  });

  it("builds each game's edge from ratings, home field and QB points", () => {
    for (const week of data.weeks) {
      for (const g of week.games) {
        const w = g.why;
        const pre = pregame({
          homeRating: w.homeRating,
          awayRating: w.awayRating,
          neutral: g.neutral,
          homeQbOut: w.qbTeams.includes(g.home),
          awayQbOut: w.qbTeams.includes(g.away),
          qbPts: w.qbPts,
        });
        expect(w.homeField, g.id).toBe(g.neutral ? 0 : HOME_FIELD);
        expect(Math.abs(pre.gap - w.edge), g.id).toBeLessThanOrEqual(1);
      }
    }
  });

  it("replays every played week of the season onto the published rating history", () => {
    const rating = (team: string, week: number) => {
      const point = data.history[team].find(([w]) => w === week);
      if (!point) throw new Error(`no rating for ${team} week ${week}`);
      return point[1];
    };
    for (const week of data.weeks) {
      const played = week.games.filter((g) => g.result);
      if (played.length !== week.games.length) continue; // history only covers finished weeks
      for (const g of played) {
        const r = g.result!;
        const after = update(rating(g.home, week.week - 1), rating(g.away, week.week - 1), r.homeScore, r.awayScore, g.neutral);
        // History is rounded to 0.1, and each week starts from rounded values.
        expect(Math.abs(after.homeAfter - rating(g.home, week.week)), g.id).toBeLessThan(0.2);
        expect(Math.abs(after.awayAfter - rating(g.away, week.week)), g.id).toBeLessThan(0.2);
      }
    }
  });
});
