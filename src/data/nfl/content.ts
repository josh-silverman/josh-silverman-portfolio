/**
 * Copy for the NFL section. Read WRITING-STYLE.md before editing.
 * Every number here traces to github.com/josh-silverman/nfl-ats-predictor
 * (README.md, docs/project-rules.md, reports/experiments.md). Live numbers
 * come from the data, not from this file.
 */
import type { PipelineStep } from "../../components/primitives";

export const nflProject = {
  title: "NFL Elo Model",
  intro: [
    "Every team has a rating. After each game the winner takes points from the loser, and a bigger or more surprising win moves more points. The gap between two ratings, plus a fixed bonus for the home team, becomes a win chance and an expected margin.",
    "The project started as an attempt to beat the point spread with play-by-play stats. Testing showed those stats add nothing the spread does not already account for, so I switched to the question they can answer: who wins. On 2019 to 2025 the model picks about 64% of winners. Vegas picks about 66%.",
  ],
  live: "https://josh-silverman.github.io/nfl-ats-predictor/",
  github: "https://github.com/josh-silverman/nfl-ats-predictor",
};

export const thisWeekCopy = {
  title: "This week's board",
  note: "Each row shows the home team's win chance from the model and from Vegas at the time the picks were locked. Weeks 1 to 5 were filled in after the fact and are marked as backfilled.",
};

export const ratingsCopy = {
  title: "Power ratings",
  note: "Ratings after the latest finished week. The league average is 1505. Playoff odds come from 10,000 simulated seasons. Select up to three teams to compare them on the chart.",
};

export const labCopy = {
  title: "How a pick is made",
  note: "Pick any two teams to see the full calculation with current ratings, then enter a final score to see how the result would move both ratings.",
};

export const scorecardCopy = {
  title: "How good is it",
  backtest:
    "Picks graded one week at a time on 1,865 games from 2019 to 2025, using only games played before each kickoff.",
  /** README headline table. The other three marks come from the site data. */
  eloQb: 0.643,
  calibration:
    "The model gives home teams about 2 to 3 points too much win chance. That failed one of the pass/fail tests I wrote down before scoring it.",
};

export const nflPipeline: PipelineStep[] = [
  {
    label: "Source",
    detail: "Schedules, final scores, weekly rosters and injury reports from nflverse.",
    tech: "nflreadpy: load_schedules, load_rosters_weekly, load_injuries, load_pbp",
  },
  {
    label: "As-of guard",
    detail: "Every input is limited to what was known before kickoff.",
    tech: "perturbation tests corrupt a game and assert nothing at or before it changes",
  },
  {
    label: "Rate",
    detail: "Update both teams' ratings after every game from the final score.",
    tech: "K=20, home field 48, margin-of-victory multiplier, 1/3 preseason regression",
  },
  {
    label: "Adjust",
    detail: "Take about 90 rating points off a team whose usual starting QB is out.",
    tech: "QB points fit each season on earlier seasons only",
  },
  {
    label: "Validate",
    detail: "Predict 2019 to 2025 one week at a time using only earlier games.",
    tech: "walk-forward, paired bootstrap 95% CIs, 1,865 games",
  },
  {
    label: "Lock",
    detail: "Commit each week's picks to git before Thursday's kickoff.",
    tech: "predict_week.py refuses overwrites, stale data and started games",
  },
];

/** Pre-registered success criteria (docs/project-rules.md). */
export const nflCriteria: { id: string; test: string; status: "pass" | "fail" | "open" }[] = [
  { id: "S1", test: "More useful than knowing nothing (log loss CI below the base rate)", status: "pass" },
  { id: "S2", test: "At least as good as raw Elo (non-inferiority, CI upper bound < +0.005)", status: "pass" },
  { id: "S3", test: "Calibrated (Brier reliability ≤ 0.002 and recalibration slope 0.8 to 1.2)", status: "fail" },
  { id: "S4", test: "8+ weeks of 2026 picks locked before kickoff and scored", status: "open" },
  { id: "S5", test: "Professional build: tests pass, notebooks run, case study written", status: "open" },
];

/** Every idea tried against Elo, each pre-registered and run once (README section 3). */
export const nflExperiments: { idea: string; change: string; verdict: string; kept?: boolean }[] = [
  {
    idea: "ATS model: EPA, pace and rest features",
    change: "51.3% ATS [48.9, 53.5]; 52.4% needed to profit",
    verdict: "Rejected, no signal beyond the spread",
  },
  {
    idea: "H1 Home field from recent seasons",
    change: "+0.0004 [-0.0021, +0.0029]",
    verdict: "Rejected, chases year-to-year noise",
  },
  {
    idea: "H2 Starting QB ruled out on the injury report",
    change: "-0.0006 [-0.0032, +0.0020]",
    verdict: "Rejected, right sign but too rare (about 4% of games)",
  },
  {
    idea: "H3 Play-by-play EPA on top of Elo",
    change: "-0.0013 [-0.0059, +0.0034]",
    verdict: "Rejected, within noise",
  },
  {
    idea: "H4 Usual starting QB out, including injured reserve",
    change: "-0.0041 [-0.0076, -0.0004]",
    verdict: "Kept: better in 6 of 7 seasons, AUC 0.692 to 0.698",
    kept: true,
  },
  {
    idea: "H5 Rest and bye-week edge on the QB model",
    change: "+0.0004 [-0.0008, +0.0016]",
    verdict: "Rejected, held in only 3 of 7 seasons",
  },
];
