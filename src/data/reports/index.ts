/**
 * Report registry. Add one import + one array entry per new report.
 * Everything downstream (cards, pages, URLs) reads from here.
 */
import type { TournamentReport } from "./types";
import { report as threeMOpen2026 } from "./2026-3m-open";

export type { TournamentReport, ReportBlock, PlayerNote, ReportStat } from "./types";

/** Newest first. */
export const reports: TournamentReport[] = [threeMOpen2026].sort((a, b) =>
  b.published.localeCompare(a.published),
);

export function getReport(slug: string): TournamentReport | undefined {
  return reports.find((r) => r.slug === slug);
}

/** e.g. "July 22, 2026" */
export function formatPublished(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
