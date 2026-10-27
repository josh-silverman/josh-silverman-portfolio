/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONTENT: edit everything about the site from this file.
 *  No component code changes needed to update bio, resume, projects.
 * ─────────────────────────────────────────────────────────────────
 */

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface ResumeGroup {
  /** e.g. "Client Engagement: National Home Services Franchise Network, Atlanta, GA (Jan 2026 - Present)" */
  label: string;
  bullets: string[];
}

export interface ResumeEntry {
  organization: string;
  role: string;
  location?: string;
  period: string;
  /** Flat bullets, or `groups` when one job has several engagements. */
  bullets?: string[];
  groups?: ResumeGroup[];
}

export interface EducationEntry {
  school: string;
  degree: string;
  detail?: string;
  period: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

/**
 * One entry in the Projects section. Every project uses the same shape and
 * gets the same layout, so none is presented as the headline.
 */
export interface ProjectSummary {
  /** Anchor id, e.g. "pga" for /#pga. Keep stable once shared. */
  id: string;
  /** Sport and type, e.g. "Golf · Research". */
  kicker: string;
  title: string;
  /** Two or three sentences. */
  summary: string;
  /** Two or three short facts. */
  facts: string[];
  links: ProjectLink[];
  /** Optional figure under /public, shown in the "More detail" drawer. */
  image?: string;
  imageAlt?: string;
}

/** Detail for the PGA Tour entry's "More detail" drawer. */
export interface PgaDetail {
  whyIBuiltIt: string;
  /** Pipeline steps, one short line each. `tech` shows in mono under the step. */
  howItWorks: { step: string; detail: string; tech?: string }[];
  /**
   * Out-of-sample Brier skill vs. the field base rate, by market, with a
   * 90% block-bootstrap CI. Source: Pinpoint docs/project-summary.md.
   * The project's own aggregates only: never DataGolf per-player values.
   */
  marketSkill: { market: string; skill: number; lo: number; hi: number }[];
  /** Where marketSkill came from, shown under the chart. */
  marketSkillSource: string;
  findingsNote: string;
}

/** A strokes-gained category and its stabilization point k (rounds to reliability 0.5). */
export interface SgCategory {
  category: string;
  k: number;
}

/* ── Basics ───────────────────────────────────────────────────── */

export const site = {
  name: "Josh Silverman",
  tagline: "Aspiring Sports Analytics Professional",
  intro:
    "I'm a data analytics and AI consultant who works across the whole pipeline, from SQL sourcing and KPI definition to Power BI dashboards and machine learning models. On the side, I build sports analytics projects, including an NFL rating model and a PGA Tour prediction platform, both tested carefully against real results, and I'm working toward doing this full-time in sports.",
  location: "Atlanta, GA",
  /** Resume download served from /public. */
  resumeFile: "/Josh-Silverman-Resume.pdf",
  resumeLabel: "Download Resume (PDF)",
};

export const socials: SocialLinks = {
  github: "https://github.com/josh-silverman",
  linkedin: "https://www.linkedin.com/in/joshsilverman1",
  email: "jjsilverman99@gmail.com",
};

/* ── About ────────────────────────────────────────────────────── */

export const about: string[] = [
  "I got my start at the intersection of sports and data, building event-outcome prediction models as a marketing technology intern at PlayOn! Sports and pitching arena revenue ideas to Miami Heat executives. After that, I earned an M.S. in Business Analytics from the University of Georgia's Terry College of Business.",
  "Today I work as a data analytics and AI consultant at NTT DATA, where I manage KPI frameworks and validate enterprise SQL pipelines. I also took 1st place in the company's North American AI Hackathon, pitching an LLM evaluation framework to the Global CEO. Nights and weekends, I run a PGA Tour prediction platform on my own: strokes-gained feature engineering, calibrated gradient-boosted models, backtesting, and a deployed full-stack product.",
  "My goal is to bring that same approach, careful validation, reproducible work, and clear communication with decision-makers, to a sports analytics organization.",
];

/* ── Resume ───────────────────────────────────────────────────── */

export const experience: ResumeEntry[] = [
  {
    organization: "NTT DATA",
    role: "Data Analytics & AI Consultant",
    period: "Aug 2024 - Present",
    groups: [
      {
        label: "Client Engagement: National Home Services Franchise Network, Atlanta, GA (Jan 2026 - Present)",
        bullets: [
          "Enabled brand presidents and client leadership to track franchise performance across 14 Power BI health dashboards by writing and validating the SQL behind 55 KPIs per franchise in AWS Redshift, testing every metric against known-good franchise data before release",
          "Took over monthly financing revenue reporting across six lending partners on short notice and re-engineered it from a hard-coded Python script into a config-driven pipeline with validated, reusable parsing; output feeds a 6-8 person finance team and 14 franchise brands",
          "Built and maintained a data availability matrix covering 55 KPIs across 14 franchise brands, assessing readiness through brand interviews and API investigation to sequence the client's AWS Redshift to Databricks migration",
          "Built a subagent that keeps Claude Code restricted to live production tables when generating SQL validation queries in AWS Redshift, working around inconsistent table naming across 14 brands",
        ],
      },
      {
        label: "Prior Rotations/Engagements: AI Engineer / Digital Transformation Consultant (Aug 2024 - Jan 2026)",
        bullets: [
          "Won 1st place at NTT DATA's Global AI Hackathon on a 3-person team, building an LLM evaluation framework that scored model outputs against defined criteria using an LLM-as-judge design, and my team pitched it to the company's Global CEO",
          "Earned senior leadership buy-in for a call-center automation solution by building BERT-based sentiment models that classified bank customer complaints",
          "Cut RFP response drafting from hours to minutes by building internal Streamlit AI tools, while supporting agentic AI proof-of-concepts on Azure for public-sector clients",
        ],
      },
    ],
  },
  {
    organization: "PlayOn! Sports",
    role: "Marketing Technology Intern",
    period: "Summer 2023",
    bullets: [
      "Analyzed millions of rows of customer data across PlayOn! platforms using Salesforce Marketing Cloud to improve email retention and digital marketing performance",
      "Built 2 machine learning models in Python and R predicting whether new products would perform correctly in the field across a range of high school sports, with engineered features adopted by PlayOn!'s marketing technology engineers",
    ],
  },
  {
    organization: "Miami Heat",
    role: "Retail Operations Intern",
    period: "Summer 2022",
    bullets: [
      "Pitched a revenue-generating arena renovation proposal to Heat executive staff as part of a 10-intern team",
      "Supported warehouse and e-commerce fulfillment operations using RetailPro and Excel",
    ],
  },
  {
    organization: "Pro Sports Outlook",
    role: "Media Coordinator",
    period: "Summer 2021",
    bullets: ["Curated PSO's daily highlights by selecting from hundreds of posts across sports media"],
  },
];

export const education: EducationEntry[] = [
  {
    school: "University of Georgia, Terry College of Business",
    degree: "M.S. Business Analytics",
    detail: "GPA: 3.9",
    period: "2024",
  },
  {
    school: "University of Georgia, Terry College of Business",
    degree: "B.B.A. Marketing, Sports Management Minor, Business Analytics Emphasis",
    detail: "GPA: 3.6, cum laude",
    period: "2023",
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Languages & Tools",
    items: [
      "SQL (AWS Redshift, PostgreSQL)",
      "Python (pandas, scikit-learn, FastAPI)",
      "R",
      "TypeScript/React",
      "Power BI",
      "Tableau",
      "Excel",
      "PowerPoint",
    ],
  },
  {
    category: "Analytics & ML",
    items: [
      "KPI Development",
      "Dashboard Design",
      "Data Validation",
      "Hypothesis-Driven Experimentation",
      "Predictive Modeling",
      "Regression Analysis",
      "Backtesting",
      "Gradient Boosting",
      "Probability Calibration",
      "NLP (BERT)",
    ],
  },
  {
    category: "Platforms",
    items: ["AWS Redshift", "Salesforce Marketing Cloud", "Azure", "Git/GitHub", "Streamlit", "Vercel"],
  },
  {
    category: "AI & LLM",
    items: [
      "AI-Assisted Development (Claude Code, Claude, ChatGPT)",
      "Prompt Engineering",
      "LLM Evaluation",
      "Agentic Workflows",
    ],
  },
];

/* ── Projects ─────────────────────────────────────────────────── */

export const projects: ProjectSummary[] = [
  {
    id: "nfl",
    kicker: "NFL · Rating model",
    title: "NFL Elo Model",
    summary:
      "Win chances for every NFL game from a rating model built on final scores and starting-quarterback news. Each week's picks are committed to GitHub before Thursday's kickoff, then graded against the results and against Vegas.",
    facts: [
      "Picks about 64% of winners on 2019 to 2025 games. Vegas picks about 66%.",
      "Tested one week at a time on 1,865 games",
      "2026 picks locked before every kickoff",
    ],
    links: [
      { label: "Weekly site", href: "https://josh-silverman.github.io/nfl-ats-predictor/" },
      { label: "Code", href: "https://github.com/josh-silverman/nfl-ats-predictor" },
    ],
  },
  {
    id: "pga",
    kicker: "Golf · Prediction platform",
    title: "PGA Tour Prediction Platform",
    summary:
      "Win, top-5, top-10, top-20, and make-cut probabilities for every player in a PGA Tour field, updated each tournament week. It pulls the field, builds the features, scores the players, and serves the board through a live web app.",
    facts: [
      "Graded on 1,147 player results it never trained on",
      "Clear edge on make-cut, top-20 and top-10",
      "Close to zero edge on outright winners",
    ],
    links: [
      { label: "Live board", href: "https://pinpoint-golf-gray.vercel.app" },
      { label: "Code", href: "https://github.com/josh-silverman/golf-analytics-platform" },
    ],
  },
  {
    id: "sg-reliability",
    kicker: "Golf · Research",
    title: "How Many Rounds Until You Can Trust Strokes Gained?",
    summary:
      "A study of how quickly each strokes-gained category becomes real skill signal instead of noise.",
    facts: [
      "131,847 PGA Tour rounds, 2017 to 2026",
      "Driving settles in roughly 9 rounds, putting in around 48",
      "A 12-round putting hot streak deserves only about 20% of your trust",
    ],
    links: [
      { label: "Read the study", href: "https://sg-reliability.vercel.app" },
      { label: "Code", href: "https://github.com/josh-silverman/sg-reliability" },
    ],
    image: "/sg-stabilization.svg",
    imageAlt:
      "Stabilization curves showing reliability by sample size for each strokes-gained category. Driving reaches the halfway-reliable mark at about 9 rounds, putting at about 48.",
  },
  {
    id: "afternoon-tax",
    kicker: "Golf · Research",
    title: "The Afternoon Tax Isn't Where You Think It Is",
    summary:
      "A paired, within-player analysis isolating what an afternoon tee time actually costs, comparing each player's afternoon round with their own morning round.",
    facts: [
      "35,000+ PGA Tour rounds, 2017 to 2026",
      "Putting takes the biggest hit and approach is close behind",
      "Driving improves, in line with warm afternoon air producing longer, harder-to-control shots",
    ],
    links: [
      { label: "Read the study", href: "https://draw-tax.vercel.app" },
      { label: "Code", href: "https://github.com/josh-silverman/sg-reliability/tree/main/draw-tax" },
    ],
    image: "/draw-tax-decomposition.svg",
    imageAlt:
      "Afternoon minus morning strokes gained by category. Putting and approach are clearly negative, off the tee is positive, and around the green sits near zero.",
  },
];

export const pgaDetail: PgaDetail = {
  whyIBuiltIt:
    "Most public golf models either hide their track record or grade themselves on events they were trained on, which makes the numbers look far better than they are. I wanted to build one where the honest version of the results was the version I published, including the markets where the model has no edge at all.",
  howItWorks: [
    {
      step: "Source",
      detail:
        "Pull tournament fields, round-by-round scoring, and strokes-gained data going back to 2017.",
      tech: "DataGolf API: rounds, fields, schedules; rate-limited fetches",
    },
    {
      step: "Engineer",
      detail:
        "Build per-player features from strokes-gained by category, form over varying lookback windows, round-to-round volatility, and course fit.",
      tech: "every feature computed as of the prediction date; training and serving share one code path",
    },
    {
      step: "Model",
      detail:
        "Score five nested outcome markets with gradient-boosted models, then force the probabilities to stay logically consistent and sum correctly across the field.",
      tech: "per-market GBMs, isotonic calibration, nested-market coherence, field-sum normalization",
    },
    {
      step: "Validate",
      detail:
        "Backtest on a rolling basis so the model only ever predicts events that came after its training data, then track live results week to week.",
      tech: "rolling-origin backtest; skill claimed only when the 90% block-bootstrap lower bound clears 0",
    },
    {
      step: "Serve",
      detail:
        "Deploy the board as a FastAPI service behind a React front end, with caching so a full field loads instantly.",
      tech: "FastAPI + React; each board cached 6h",
    },
  ],
  marketSkill: [
    { market: "Win", skill: 0.002, lo: -0.005, hi: 0.009 },
    { market: "Top 5", skill: 0.022, lo: -0.06, hi: 0.1 },
    { market: "Top 10", skill: 0.078, lo: 0.035, hi: 0.109 },
    { market: "Top 20", skill: 0.141, lo: 0.115, hi: 0.166 },
    { market: "Make cut", skill: 0.246, lo: 0.153, hi: 0.35 },
  ],
  marketSkillSource:
    "Out-of-sample, 1,147 player predictions across the 10 most recent completed events. Model trained on about 35,800 player-tournament results, 2018 to 2026. Bars: 90% block-bootstrap interval, resampled by event.",
  findingsNote:
    "I graded the model on 1,147 player results from the 10 most recent events, none of which it trained on. The edge is largest on make-cut, still clear on top-20 and top-10, and close to zero on outright winners. Picking the winner from a 150-player field is mostly luck, so I focus on the markets where the model actually beats the field.",
};

/** Stabilization points from the strokes-gained reliability study (rounds to R = 0.5). */
export const sgStabilization: SgCategory[] = [
  { category: "Off the tee", k: 9 },
  { category: "Approach", k: 30 },
  { category: "Around the green", k: 39 },
  { category: "Putting", k: 48 },
];
