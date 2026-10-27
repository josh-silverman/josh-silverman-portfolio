# Adding a weekly tournament report

Three steps, no component changes.

1. **Copy the last report file** in this folder and rename it by event,
   e.g. `2026-wyndham-championship.ts`.

2. **Fill it in.** The schema is in `types.ts`. Required: `slug`, `event`,
   `course`, `location`, `dates`, `published`, `readMinutes`, `headline`,
   `summary`, `blocks`. Optional: a three-item `stats` strip.

3. **Register it** in `index.ts`:

   ```ts
   import { report as wyndham2026 } from "./2026-wyndham-championship";

   export const reports: TournamentReport[] = [wyndham2026, threeMOpen2026].sort(...)
   ```

The card, the page, and the URL (`/#/reports/<slug>`) are generated from
the object. Reports sort newest first by `published`.

## Block types

| Block | Use it for |
|---|---|
| `heading` | Section break. Suggested flow: Biggest Takeaway, Best Value Plays, Players I'm Lower On, one insight section, A Few Caveats, Final Thoughts. |
| `paragraph` | Body copy. |
| `players` | Named players with a one-line reason and a stat chip. Use this instead of a table. |
| `list` | Caveats and short enumerations. |
| `callout` | One boxed note, usually the grading promise at the end. |

## House style

**Prose rules live in [`WRITING-STYLE.md`](../../../WRITING-STYLE.md) at the
repo root. Read that before drafting.** It is the single source of truth for
voice, and it is kept up to date as Josh flags new lines.

Rules specific to reports, on top of that:

- **Lead with the single most interesting finding**, not a summary of the
  field. Build the post around that story.
- **Two to three minute read.** Roughly 600 to 800 words.
- **Prefer player cards over tables.** Readers skim names, not grids.
- **Publish before the first round and do not edit afterward.** The track
  record only means something if the numbers are timestamped.
- **Source picks from top-20 and make-cut**, the markets with measured
  edge, not the win market.
