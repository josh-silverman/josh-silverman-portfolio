import type { TournamentReport } from "./types";

export const report: TournamentReport = {
  slug: "2026-3m-open",
  event: "3M Open",
  course: "TPC Twin Cities",
  location: "Blaine, MN",
  dates: "July 23-26, 2026",
  published: "2026-07-22",
  readMinutes: 3,
  headline: "The Model Likes Scheffler More Than the Betting Market Does",
  summary:
    "Scottie Scheffler projects more than twice as strong as anyone else in the 3M Open field, and for once the model is higher on the favorite than Vegas is. Plus four second-tier names worth a look and one popular pick to avoid.",
  stats: [
    { value: "23.7%", label: "Scheffler win probability" },
    { value: "+2.78", label: "His projected strokes gained" },
    { value: "144", label: "Players rated in the field" },
  ],
  blocks: [
    {
      kind: "heading",
      text: "Biggest Takeaway",
    },
    {
      kind: "paragraph",
      text:
        "Scottie Scheffler is projected to gain 2.78 strokes per round on this field. The next best player in the field, Maverick McNealy, projects at 1.21. To put that gap in context, the distance from Scheffler down to McNealy is roughly twice the distance from McNealy down to the 20th best player here.",
    },
    {
      kind: "paragraph",
      text:
        "What makes this week unusual is the direction of the disagreement. Normally a model earns its keep by fading the public favorite, because betting markets tend to overprice household names. Here the opposite is happening. Sportsbooks imply Scheffler wins about 18% of the time. My numbers say 23.7%. The model is not telling me the chalk is overpriced. It is telling me the chalk is underpriced.",
    },
    {
      kind: "paragraph",
      text:
        "That is what a genuine field mismatch looks like. This is not a major, the field is not especially deep, and the best player in the world showed up anyway.",
    },
    {
      kind: "heading",
      text: "Best Value Plays",
    },
    {
      kind: "paragraph",
      text:
        "A note on where I actually look for value. When I test this model against past seasons, its edge over the market shows up reliably in the top-20 and make-the-cut markets, and barely at all in picking outright winners. Winners are mostly noise. Roughly 40 guys have a live chance every week and the model cannot separate them well enough to beat the price. So the numbers below are top-20 finishes, comparing what the model says against what the betting market implies after stripping out the sportsbook's built-in margin.",
    },
    {
      kind: "players",
      items: [
        {
          name: "Scottie Scheffler",
          stat: "+13.7% edge",
          note: "The model gives him a 78% chance to finish top-20 against a market price closer to 64%. The single biggest gap on the board, in the market I trust most.",
        },
        {
          name: "Tom Kim",
          stat: "+7.7% edge",
          note: "His iron play is the standout, gaining nearly 0.7 strokes per round on approach, and TPC Twin Cities sets up slightly in his favor. Market has him around 30% for a top-20, model says 38%.",
        },
        {
          name: "Maverick McNealy",
          stat: "+6.8% edge",
          note: "The most complete profile outside Scheffler, and the best putter among the contenders. Nothing flashy, just no weak category.",
        },
        {
          name: "Doug Ghim",
          stat: "+6.0% edge",
          note: "Has the strongest history at this specific course of anyone in the field. Course history is usually a weak signal, so when it shows up this clearly it is worth noting.",
        },
        {
          name: "Ben Kohles",
          stat: "+5.9% edge",
          note: "The most interesting name here. His raw form is ordinary, but this course fits his game better than any other player in the field. He is a fit play, not a form play.",
        },
      ],
    },
    {
      kind: "heading",
      text: "Players I'm Lower On",
    },
    {
      kind: "paragraph",
      text:
        "The pattern in these fades is consistent. The market is paying for reputation or for one loud recent week. The model is paying for how these guys have actually struck the ball across a much longer stretch.",
    },
    {
      kind: "players",
      items: [
        {
          name: "Gordon Sargent",
          stat: "market 11.7%, model 3.5%",
          note: "The biggest disagreement on the board, and it is not close. He projects a full stroke per round below the field average. The market is buying the amateur pedigree and the upside story. The ball striking does not support it yet.",
        },
        {
          name: "Jake Knapp",
          stat: "market 28.9%, model 24.3%",
          note: "One of the longest players in the field, which normally reads as an advantage. See the next section for why that is not helping him this week.",
        },
        {
          name: "Rasmus Hojgaard",
          stat: "market 17.5%, model 12.3%",
          note: "Priced like a mid-tier contender, but the underlying numbers are barely above field average right now.",
        },
        {
          name: "Stephan Jaeger",
          stat: "market 18.1%, model 13.6%",
          note: "Same story. The name carries a price the current form does not earn.",
        },
      ],
    },
    {
      kind: "heading",
      text: "The Course Is Not Rewarding Bombers",
    },
    {
      kind: "paragraph",
      text:
        "This was the finding I did not expect. TPC Twin Cities is a long course, and the standard read is that length is an advantage. The model disagrees. Three of the biggest hitters in the field, Keith Mitchell, Kurt Kitayama, and Jake Knapp, all get a small penalty from their driving distance this week, not a bonus. Distance is not converting into scoring here.",
    },
    {
      kind: "paragraph",
      text:
        "What is converting is course fit, and it is doing real work in the second tier. Ben Kohles, Zac Blair, and Christiaan Bezuidenhout all get meaningful bumps that have nothing to do with how they have been playing lately and everything to do with the specific shots this course asks for. Blair in particular is one of the shortest hitters in the field and grades out as one of the best fits.",
    },
    {
      kind: "heading",
      text: "A Few Caveats",
    },
    {
      kind: "list",
      items: [
        "These are probabilities, not predictions. A 23.7% favorite loses about three weeks out of four. If Scheffler finishes T-15, the number was not wrong.",
        "Player ratings in this report build on DataGolf's baseline projections combined with my own strokes-gained work. The market comparison excludes DataGolf's own book so I am not grading the model against itself.",
        "The win column on the live Pinpoint board is being reworked right now and is not showing these numbers correctly yet. The top-20 and make-cut markets are the ones I would act on anyway.",
        "Course fit and course history are the softest inputs here. They move players a few percent, not tiers. I would not bet a name on fit alone.",
      ],
    },
    {
      kind: "heading",
      text: "Final Thoughts",
    },
    {
      kind: "paragraph",
      text:
        "Most weeks the interesting work is finding the overpriced favorite. This week the model went the other way and told me the best player in the world is a bargain against a field he towers over. The more actionable ideas are further down the board: Tom Kim and Maverick McNealy in the top-20 market, and Ben Kohles as the fit play nobody is talking about.",
    },
    {
      kind: "callout",
      title: "How I grade this",
      text:
        "I publish every weekly report before the first round starts and don't edit it afterward. Once the tournament ends, I compare the results against these exact numbers, wins and misses both.",
    },
  ],
};
