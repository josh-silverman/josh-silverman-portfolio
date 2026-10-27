/**
 * GET /api/nfl: cached proxy for the NFL model's site data.
 *
 * Fetches site-data.js from the nfl-ats-predictor repo, unwraps the JSON and
 * returns it raw; the client normalizes it with src/lib/nfl-parse.ts. The
 * unwrap below mirrors parseSiteDataJs and is inlined so this function has
 * no imports outside api/.
 *
 * Vercel's CDN caches the response for an hour and serves a stale copy for
 * up to a day while it refreshes, so a weekly lock pushed to GitHub shows up
 * within the hour with no redeploy.
 */
const SOURCE =
  "https://raw.githubusercontent.com/josh-silverman/nfl-ats-predictor/main/site/data/site-data.js";

export async function GET(): Promise<Response> {
  try {
    const res = await fetch(SOURCE, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`upstream HTTP ${res.status}`);
    const src = await res.text();
    const start = src.indexOf("{", src.indexOf("SITE_DATA"));
    const end = src.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("upstream: no JSON object");
    const body = src.slice(start, end + 1);
    JSON.parse(body); // reject malformed upstream data instead of caching it
    return new Response(body, {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err) {
    return Response.json(
      { error: "NFL data unavailable", detail: String(err) },
      { status: 502, headers: { "cache-control": "no-store" } },
    );
  }
}
