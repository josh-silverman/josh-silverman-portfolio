# Portfolio site

React + Vite + TypeScript + Tailwind. Static deploy on Vercel from `main`.

## Before writing or editing ANY copy on this site

Read [WRITING-STYLE.md](WRITING-STYLE.md) first. It is a running record of
Josh's corrections to AI-drafted writing, with before/after examples. The
rules are not optional and not stylistic suggestions: they came from
specific edits he made.

Highest-frequency mistakes, in order:

1. Em-dashes and en-dashes. Never. Check with `grep -rn '—\|–' src/`.
2. "Not X, it's Y" constructions.
3. Metaphors and color where a literal statement works.
4. Sentences that narrate the significance of a point instead of making it.
5. Anything that reads as claiming superiority over other people's work.

When Josh flags a new line, add a Log entry to WRITING-STYLE.md and, if it
is a new pattern, a numbered rule with the before/after.

## Structure

- `src/data/content.ts` drives the bio, resume, prediction model section,
  and research cards. Editing copy should not require touching components.
- `src/data/reports/` holds the weekly tournament reports. See the README
  in that folder for how to add one.
- `src/lib/router.ts` is a small hash router so each report gets a
  shareable URL at `/#/reports/<slug>`. No routing dependency.

## Section order

01 About, 02 Resume, 03 Prediction Model (with the Weekly Tournament
Reports subsection), 04 Research, 05 Contact. If you add or reorder a
section, update the kicker numbers and `src/components/Nav.tsx`.

## Verifying changes

`npm run build` runs `tsc --noEmit` then builds. For visual changes, run
`npx vite preview --port 4173` and actually look at the page before
saying it works.
