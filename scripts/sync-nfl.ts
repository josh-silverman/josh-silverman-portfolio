/**
 * Prebuild: fetch the NFL model's latest site-data.js and write a normalized
 * snapshot to src/data/nfl/snapshot.json. The page renders this snapshot
 * first, then swaps in /api/nfl if that is newer.
 *
 * Never fails the build on a network error: it keeps the committed snapshot.
 * Run directly with `npm run sync:nfl` (Node >= 22.18 strips the types).
 */
import { readFile, writeFile } from "node:fs/promises";
import { generatedKey, normalizeNfl, parseSiteDataJs } from "../src/lib/nfl-parse.ts";

const SOURCE =
  process.env.NFL_DATA_URL ??
  "https://raw.githubusercontent.com/josh-silverman/nfl-ats-predictor/main/site/data/site-data.js";
const OUT = new URL("../src/data/nfl/snapshot.json", import.meta.url);

async function existingKey(): Promise<number | null> {
  try {
    const current = JSON.parse(await readFile(OUT, "utf8"));
    return generatedKey(current.meta.generated);
  } catch {
    return null;
  }
}

async function main() {
  const before = await existingKey();
  try {
    const res = await fetch(SOURCE, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = normalizeNfl(parseSiteDataJs(await res.text()));
    if (before !== null && generatedKey(data.meta.generated) < before) {
      console.log(`sync-nfl: source (${data.meta.generated}) is older than the snapshot, keeping it`);
      return;
    }
    await writeFile(OUT, JSON.stringify(data) + "\n");
    console.log(`sync-nfl: wrote week ${data.meta.currentWeek}, generated ${data.meta.generated}`);
  } catch (err) {
    if (before === null) {
      console.error(`sync-nfl: fetch failed and no snapshot exists: ${String(err)}`);
      process.exit(1);
    }
    console.warn(`sync-nfl: fetch failed (${String(err)}), keeping the committed snapshot`);
  }
}

main();
