import { describe, expect, it } from "vitest";
import { snapshot } from "../data/nfl";
import { generatedKey, parseSiteDataJs } from "./nfl-parse";

describe("parseSiteDataJs", () => {
  it("unwraps the window.SITE_DATA assignment", () => {
    const src = '// Generated. Do not edit.\nwindow.SITE_DATA = {"meta": {"season": 2026}};\n';
    expect(parseSiteDataJs(src)).toEqual({ meta: { season: 2026 } });
  });

  it("rejects a file without the assignment", () => {
    expect(() => parseSiteDataJs("{}")).toThrow(/SITE_DATA/);
  });
});

describe("generatedKey", () => {
  it("orders timestamps, including across noon", () => {
    expect(generatedKey("Oct 26, 2026 9:52 AM ET")).toBeLessThan(generatedKey("Oct 26, 2026 12:05 PM ET"));
    expect(generatedKey("Oct 26, 2026 12:05 PM ET")).toBeLessThan(generatedKey("Oct 26, 2026 1:00 PM ET"));
    expect(generatedKey("Oct 26, 2026 11:59 PM ET")).toBeLessThan(generatedKey("Nov 2, 2026 9:00 AM ET"));
    expect(generatedKey("Oct 26, 2026 12:30 AM ET")).toBeLessThan(generatedKey("Oct 26, 2026 1:00 AM ET"));
  });

  it("returns 0 for unparseable input", () => {
    expect(generatedKey("yesterday")).toBe(0);
  });
});

describe("normalized snapshot", () => {
  it("contains no en or em dashes (WRITING-STYLE rule 1)", () => {
    expect(JSON.stringify(snapshot)).not.toMatch(/[\u2013\u2014]/);
  });

  it("covers all 32 teams", () => {
    expect(snapshot.rankings).toHaveLength(32);
    expect(Object.keys(snapshot.history)).toHaveLength(32);
  });
});
