/**
 * TypeScript port of nfl_ats/elo.py from github.com/josh-silverman/nfl-ats-predictor.
 * FiveThirtyEight-style parameters, fixed up front and never tuned on the data.
 * Parity with the Python output is checked in elo.test.ts.
 */

export const K = 20;
export const HOME_FIELD = 48;
export const MEAN_RATING = 1505;
export const SEASON_REGRESSION = 1 / 3;
/** 25 Elo points is about 1 point of spread. */
export const ELO_PER_POINT = 25;
/**
 * Elo points taken off a team whose usual starting QB is out. The live model
 * fits this per season (win_model.fit_qb_points); the repo README reports
 * "a missing No. 1 QB is about 90 Elo" on 2019-2025. Live games carry their
 * own value in why.qbPts, which callers should prefer when it is set.
 */
export const QB_OUT_ELO = 90;

/** P(home wins) from the rating gap (home + home field - away). */
export function winProb(gap: number): number {
  return 1 / (1 + 10 ** (-gap / 400));
}

/** Bigger wins move ratings more, damped when the favorite wins. */
export function movMultiplier(margin: number, winnerGap: number): number {
  return (Math.log(Math.abs(margin) + 1) * 2.2) / (winnerGap * 0.001 + 2.2);
}

export interface PregameInput {
  homeRating: number;
  awayRating: number;
  neutral?: boolean;
  homeQbOut?: boolean;
  awayQbOut?: boolean;
  qbPts?: number;
}

export interface Pregame {
  homeField: number;
  qbAdjust: number;
  /** Rating gap from the home side, including home field and any QB adjustment. */
  gap: number;
  pHome: number;
  /** Expected home margin in points. */
  spread: number;
}

export function pregame({
  homeRating,
  awayRating,
  neutral = false,
  homeQbOut = false,
  awayQbOut = false,
  qbPts = QB_OUT_ELO,
}: PregameInput): Pregame {
  const homeField = neutral ? 0 : HOME_FIELD;
  const qbAdjust = (awayQbOut ? qbPts : 0) - (homeQbOut ? qbPts : 0);
  const gap = homeRating + homeField - awayRating + qbAdjust;
  return { homeField, qbAdjust, gap, pHome: winProb(gap), spread: gap / ELO_PER_POINT };
}

export interface RatingUpdate {
  result: number;
  multiplier: number;
  /** Points added to home (and taken from away). */
  shift: number;
  homeAfter: number;
  awayAfter: number;
}

/**
 * Post-game update, as in elo._elo_pass. The probability that drives the
 * update uses ratings plus home field only: QB adjustments affect the
 * prediction, never the ratings.
 */
export function update(
  homeRating: number,
  awayRating: number,
  homeScore: number,
  awayScore: number,
  neutral = false,
): RatingUpdate {
  const gap = homeRating + (neutral ? 0 : HOME_FIELD) - awayRating;
  const p = winProb(gap);
  const margin = homeScore - awayScore;
  const result = margin > 0 ? 1 : margin === 0 ? 0.5 : 0;
  const winnerGap = margin > 0 ? gap : -gap;
  const multiplier = movMultiplier(margin, winnerGap);
  const shift = K * multiplier * (result - p);
  return { result, multiplier, shift, homeAfter: homeRating + shift, awayAfter: awayRating - shift };
}

/** Preseason regression: one third of the way back to the league mean. */
export function regress(rating: number): number {
  return MEAN_RATING * SEASON_REGRESSION + rating * (1 - SEASON_REGRESSION);
}
