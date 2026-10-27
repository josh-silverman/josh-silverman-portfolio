/**
 * Parse and normalize the NFL model's site-data.js.
 *
 * Shared by three callers, so it has no browser or Node dependencies:
 *   - scripts/sync-nfl.ts (prebuild snapshot)
 *   - src/lib/useNflData.ts (normalizes what /api/nfl returns)
 *   - src/lib/nfl-parse.test.ts
 */
import type { NflData, NflGame, NflSide, NflWeek } from "../data/nfl/types.ts";

/** site-data.js is `window.SITE_DATA = {...};`. Pull out the JSON object. */
export function parseSiteDataJs(src: string): unknown {
  const marker = src.indexOf("SITE_DATA");
  if (marker === -1) throw new Error("site-data.js: SITE_DATA assignment not found");
  const start = src.indexOf("{", marker);
  const end = src.lastIndexOf("}");
  if (start === -1 || end <= start) throw new Error("site-data.js: no JSON object found");
  return JSON.parse(src.slice(start, end + 1));
}

type Raw = any;

/** The site's style rules ban en and em dashes; the source data uses them in scores. */
const clean = (s: unknown): string => String(s ?? "").replace(/[\u2013\u2014]/g, "-");

function need(obj: Raw, key: string, where: string): Raw {
  if (obj == null || obj[key] === undefined) throw new Error(`site-data: missing ${where}.${key}`);
  return obj[key];
}

function side(raw: Raw): NflSide {
  return { team: raw.team, rank: raw.rank, record: clean(raw.record), last: clean(raw.last) };
}

function game(g: Raw): NflGame {
  const why = need(g, "why", "game");
  return {
    id: g.game_id,
    home: g.home,
    away: g.away,
    neutral: Boolean(g.neutral),
    kickoff: clean(g.kickoff),
    dayGroup: clean(g.day_group),
    pHome: need(g, "p_home", "game"),
    pVegasHome: g.p_vegas_home ?? null,
    favorite: g.favorite,
    confidence: clean(g.confidence),
    ourLine: clean(g.our_line),
    vegasLine: g.vegas_line_at_lock == null ? null : clean(g.vegas_line_at_lock),
    bigGap: Boolean(g.big_gap),
    homeSide: side(g.home_side),
    awaySide: side(g.away_side),
    why: {
      homeRating: why.home_rating,
      awayRating: why.away_rating,
      homeField: why.home_field,
      qbPts: why.qb_pts ?? 0,
      qbTeams: why.qb_teams ?? [],
      edge: why.edge,
    },
    result: g.result
      ? {
          homeScore: g.result.home_score,
          awayScore: g.result.away_score,
          winner: g.result.winner,
          weRight: Boolean(g.result.we_were_right),
          vegasRight: g.result.vegas_was_right ?? null,
        }
      : null,
    qbOut: (g.qb_out ?? []).map((q: Raw) => ({
      team: q.team,
      player: clean(q.player),
      reason: clean(q.reason),
    })),
  };
}

export function normalizeNfl(raw: Raw): NflData {
  const meta = need(raw, "meta", "root");
  const weeks: NflWeek[] = need(raw, "weeks", "root").map((w: Raw) => ({
    week: w.week,
    live: w.mode === "live",
    lockText: w.lock?.text ? clean(w.lock.text) : null,
    lockUrl: w.lock?.url ?? null,
    games: w.games.map(game),
  }));
  const teams: NflData["teams"] = {};
  for (const [abbr, t] of Object.entries<Raw>(need(raw, "teams", "root"))) {
    teams[abbr] = { name: clean(t.name), color: t.color };
  }
  const bt = need(raw, "backtest", "root");
  const ex = need(raw, "example", "root");
  return {
    meta: {
      season: meta.season,
      currentWeek: meta.current_week,
      generated: clean(meta.generated),
      repo: meta.repo,
    },
    teams,
    weeks,
    rankings: need(raw, "rankings", "root").map((r: Raw) => ({
      rank: r.rank,
      team: r.team,
      rating: r.rating,
      rankChange: r.rank_change ?? 0,
      record: clean(r.record),
      bye: Boolean(r.bye),
      next: r.next ? { opp: r.next.opp, home: Boolean(r.next.home), pWin: r.next.p_win } : null,
      odds: {
        wins: r.odds.wins,
        losses: r.odds.losses,
        playoff: r.odds.playoff,
        division: r.odds.division,
        topSeed: r.odds.top_seed,
      },
    })),
    history: need(raw, "elo_history", "root"),
    backtest: { games: bt.games, elo: bt.elo, vegas: bt.vegas, alwaysHome: bt.always_home },
    example: {
      week: ex.week,
      home: ex.home,
      away: ex.away,
      homeRating: ex.home_rating,
      awayRating: ex.away_rating,
      homeField: ex.home_field,
      gap: ex.gap,
      pHome: ex.p_home,
      homeScore: ex.home_score,
      awayScore: ex.away_score,
      homeAfter: ex.home_after,
      awayAfter: ex.away_after,
    },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Sortable key for meta.generated ("Oct 26, 2026 9:52 AM ET"), so a stale
 * CDN copy never replaces a newer build snapshot. Returns 0 if unparseable.
 */
export function generatedKey(generated: string): number {
  const m = generated.match(/^(\w{3}) (\d{1,2}), (\d{4}) (\d{1,2}):(\d{2}) (AM|PM)/);
  if (!m) return 0;
  const month = MONTHS.indexOf(m[1]);
  if (month === -1) return 0;
  const hour = (Number(m[4]) % 12) + (m[6] === "PM" ? 12 : 0);
  return Number(m[3]) * 1e8 + (month + 1) * 1e6 + Number(m[2]) * 1e4 + hour * 100 + Number(m[5]);
}
