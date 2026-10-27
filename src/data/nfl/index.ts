import raw from "./snapshot.json";
import type { NflData } from "./types";

/**
 * Build-time snapshot written by scripts/sync-nfl.ts (already normalized).
 * JSON imports widen [week, rating] tuples to number[], hence the cast.
 */
export const snapshot = raw as unknown as NflData;
