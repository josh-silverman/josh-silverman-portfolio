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
    "Scheffler projects more than twice as strong as anyone else in the 3M Open field, and the model has him higher than the betting market does. Plus four second-tier names worth a look and one popular pick to avoid.",
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
        "Scheffler is projected to gain 2.78 strokes per round on this field. The next best player, Maverick McNealy, is at 1.21. The gap between those two is about twice the gap between McNealy and the 20th best player in the field.",
    },
    {
      kind: "paragraph",
      text:
        "The betting market has Scheffler winning about 18% of the time. My model has him at 23.7%. That is the unusual part. Models are normally lower than the market on big favorites, because the public tends to overprice well-known players. Here it is higher.",
    },
    {
      kind: "paragraph",
      text:
        "The field explains most of it. This is not a major, the field is not especially deep, and the best player in the world showed up anyway.",
    },
    {
      kind: "heading",
      text: "Best Value Plays",
    },
    {
      kind: "paragraph",
      text:
        "When I test the model against past seasons, its edge shows up in the top-20 and make-the-cut markets and almost not at all in picking winners. About 40 players have a real chance to win each week and the model cannot separate them well enough to beat the price. So the numbers below are for top-20 finishes, compared against the betting market's implied odds with the sportsbook margin removed.",
    },
    {
      kind: "players",
      items: [
        {
          name: "Scottie Scheffler",
          stat: "+13.7% edge",
          note: "78% to finish top-20 against a market price closer to 64%. The biggest gap on the board, in the market I trust most.",
        },
        {
          name: "Tom Kim",
          stat: "+7.7% edge",
          note: "His approach play is the strength, gaining close to 0.7 strokes per round on the field, and the course sets up slightly in his favor. Market has him near 30% for a top-20, model says 38%.",
        },
        {
          name: "Maverick McNealy",
          stat: "+6.8% edge",
          note: "The most complete profile outside Scheffler and the best putter of the contenders. No weak category.",
        },
        {
          name: "Doug Ghim",
          stat: "+6.0% edge",
          note: "Has the best history at this course of anyone in the field. Course history is usually a weak signal, so it is worth noting when it is this clear.",
        },
        {
          name: "Ben Kohles",
          stat: "+5.9% edge",
          note: "His current form is ordinary, but the course fits his game better than any other player in the field. The edge here comes from fit rather than form.",
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
        "In each of these the market is pricing reputation or one strong recent week. The model is pricing a longer stretch of ball striking.",
    },
    {
      kind: "players",
      items: [
        {
          name: "Gordon Sargent",
          stat: "market 11.7%, model 3.5%",
          note: "The biggest disagreement on the board. He projects a full stroke per round below the field average. The market is paying for the amateur record and the upside. The ball striking does not support it yet.",
        },
        {
          name: "Jake Knapp",
          stat: "market 28.9%, model 24.3%",
          note: "One of the longest players in the field, which usually helps. The next section covers why it is not helping this week.",
        },
        {
          name: "Rasmus Hojgaard",
          stat: "market 17.5%, model 12.3%",
          note: "Priced like a mid-tier contender, but his numbers are barely above field average right now.",
        },
        {
          name: "Stephan Jaeger",
          stat: "market 18.1%, model 13.6%",
          note: "Same as Hojgaard. The price is based on the name more than the current form.",
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
        "TPC Twin Cities is a long course and the usual read is that length helps. The model does not agree. Keith Mitchell, Kurt Kitayama, and Jake Knapp are three of the longest hitters in the field, and all three get a small penalty for driving distance this week rather than a bonus.",
    },
    {
      kind: "paragraph",
      text:
        "Course fit matters more here. Ben Kohles, Zac Blair, and Christiaan Bezuidenhout all get a meaningful bump that has nothing to do with recent form and everything to do with the shots this course asks for. Blair is one of the shortest hitters in the field and grades as one of the best fits.",
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
        "Course fit and course history are the softest inputs here. They move a player a few percent, not a full tier. I would not back a player on fit alone.",
      ],
    },
    {
      kind: "heading",
      text: "Final Thoughts",
    },
    {
      kind: "paragraph",
      text:
        "Most weeks the model's job is finding a favorite the market has overpriced. This week it did the opposite and said the best player in the world is still good value against this field. The more useful plays are further down the board: Tom Kim and Maverick McNealy for top-20, and Ben Kohles as the course-fit play.",
    },
    {
      kind: "callout",
      title: "How I grade this",
      text:
        "I publish every weekly report before the first round starts and don't edit it afterward. Once the tournament ends, I compare the results against these exact numbers, wins and misses both.",
    },
  ],
};
