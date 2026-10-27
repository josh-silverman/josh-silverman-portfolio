/**
 * ─────────────────────────────────────────────────────────────────
 *  WEEKLY TOURNAMENT REPORT SCHEMA
 *
 *  To publish a new report:
 *    1. Copy an existing file in this folder, rename it by event.
 *    2. Fill in the metadata and blocks below.
 *    3. Add one import line to ./index.ts.
 *  Nothing else needs to change. The card, the page, and the URL
 *  are all generated from this object.
 * ─────────────────────────────────────────────────────────────────
 */

/** A named player with a one-line reason and an optional stat chip. */
export interface PlayerNote {
  name: string;
  /** Plain-English reason. One or two sentences, no jargon. */
  note: string;
  /** Short stat shown on the right, e.g. "+7.7% edge" or "38% top-20". */
  stat?: string;
}

/** Body content. Keep posts to a 2-3 minute read. */
export type ReportBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "players"; items: PlayerNote[] }
  | { kind: "list"; items: string[] }
  | { kind: "callout"; title: string; text: string };

/** A single headline number shown in the strip under the title. */
export interface ReportStat {
  value: string;
  label: string;
}

export interface TournamentReport {
  /** URL segment. Lives at /#/reports/<slug>, so keep it stable once shared. */
  slug: string;
  event: string;
  course: string;
  location: string;
  /** Human-readable playing dates, e.g. "July 23-26, 2026". */
  dates: string;
  /** ISO date used for sorting newest first. */
  published: string;
  readMinutes: number;
  /** The lead story. This is the card title and the page headline. */
  headline: string;
  /** One or two sentence teaser shown on the card. */
  summary: string;
  /** Optional stat strip under the headline. Three reads best. */
  stats?: ReportStat[];
  blocks: ReportBlock[];
}
