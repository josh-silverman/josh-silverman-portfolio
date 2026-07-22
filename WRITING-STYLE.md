# Writing Style

A running record of how I want writing on this site to sound, built from
actual edits I've made to AI-drafted copy. Every rule below comes from a
real correction, with the before and after kept so the reasoning is clear.

**If you are Claude and you are about to write or edit any copy on this
site, read this file first.**

---

## The short version

Write like a competent college grad explaining their own work to a smart
person who is not in the field. Direct, specific, informative. No
performance.

Keep the analytical detail and structure. That part is not the problem.
The problem is ornamental prose layered on top of it. When in doubt, cut
the sentence that is doing rhetoric and keep the sentence that is doing
information.

---

## Rules

### 1. No em-dashes or en-dashes

Use a comma, a colon, or a new sentence. This includes ranges: write
"Aug 2024 - Present" and "10-15 stakeholders" with plain hyphens.

Check before shipping: `grep -rn '—\|–' src/`

### 2. No "not X, it's Y" constructions

This is the single most recognizable AI tell. If a sentence sets up a
contrast just to knock it down, rewrite it as a plain statement.

> ❌ "The model is not telling me the chalk is overpriced. It is telling me the chalk is underpriced."
> ✅ "That is the unusual part. Models are normally lower than the market on big favorites. Here it is higher."

> ❌ "He is a fit play, not a form play."
> ✅ "The edge here comes from fit rather than form."

### 3. No metaphors or color

Say the literal thing.

> ❌ "close to a coin flip dressed up as expertise"
> ✅ "mostly luck"

> ❌ "a bargain against a field he towers over"
> ✅ "still good value against this field"

> ❌ "the fit play nobody is talking about"
> ✅ "the course-fit play"

> ❌ "one loud recent week"
> ✅ "one strong recent week"

### 4. No self-referential framing

Do not announce what the writing is about to do, and do not narrate the
significance of a point. Make the point and move on.

> ❌ "That is what a genuine field mismatch looks like."
> ✅ (cut, the following sentence already makes the point)

> ❌ "A note on where I actually look for value. When I test the model..."
> ✅ "When I test the model..."

> ❌ "The biggest disagreement on the board, and it is not close."
> ✅ "The biggest disagreement on the board."

### 5. No claiming superiority over others, no self-congratulation

State what I did and what the result was. Let the reader draw the
comparison. Anything that reads as "unlike everyone else, I am honest"
comes out.

> ❌ "That last result is the one most models bury."
> ✅ (cut entirely)

> ❌ "no edge on picking outright winners, and I say so"
> ✅ "no edge on picking outright winners"

Stating an unflattering result plainly is the point. Congratulating
myself for stating it undoes it.

### 6. No modeling jargon in audience-facing copy

Never use calibration, isotonic regression, confidence intervals, model
architecture, or anything about the serving layer (wrapper classes,
caching providers) in writing aimed at recruiters, golf fans, or
bettors. Translate to what it means for a golfer.

> ❌ "The model compresses probabilities."
> ✅ "The model is more conservative than the market on outright winners."

> ❌ "statistically indistinguishable from zero"
> ✅ "close to zero"

Some technical vocabulary is fine and expected: strokes gained, backtest,
field average, implied odds. The test is whether a golf fan who has never
read a stats paper follows it.

### 7. No decorative tech tags

Do not put rows of framework/library pills under project cards
(FastAPI, scikit-learn, React, and so on). The stack belongs in the
resume skills section, not as decoration on written work.

---

## What not to over-correct

These edits are about prose, not substance. Do not respond to this
document by making the writing vaguer or shorter on facts. Specifically,
keep:

- Every number, player name, and comparison. Detail is the value.
- The section structure of reports (Biggest Takeaway, Best Value Plays,
  Players I'm Lower On, an insight section, A Few Caveats, Final
  Thoughts).
- Caveats and honest negative results, stated plainly.
- Leading with the single most interesting finding instead of summarizing
  the field.

---

## Log

Append new entries here as they come up. Date, what I flagged, what the
rule is.

**2026-07-22** Asked to strip AI-sounding jargon and all em-dashes from
the live site. Established rules 1 and 6.

**2026-07-22** Flagged the key-findings note ("most models bury", "coin
flip dressed up as expertise", "I point the useful part of the model at")
and the weekly reports blurb ("what it found that the narrative missed",
"Published before the first tee shot, never edited after"). Asked for
plain, direct, informative, "like a college grad wrote it." Established
rules 3, 4, and 5. Also removed the tech tag pills, rule 7.

**2026-07-22** On the first full tournament report: liked the detail and
the structure of the analysis, but said there were too many extra lines
that were too creative and sounded like AI or a genius wrote them.
Established rule 2 and reinforced 3 and 4. This is the clearest statement
of the overall preference: the analysis is right, the ornamentation is
the problem.
