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

export interface ResumeEntry {
  organization: string;
  role: string;
  location?: string;
  period: string;
  bullets: string[];
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

export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** GitHub repo URL. Leave as "" to hide the link. */
  github?: string;
  /** Live demo URL. Leave as "" to hide the link. */
  demo?: string;
  /** Optional card image (path under /public), screenshot or results graphic. */
  image?: string;
  imageAlt?: string;
}

/** The one flagship build that gets its own section and a full write-up. */
export interface FeaturedProject {
  title: string;
  tagline: string;
  whatItIs: string;
  whyIBuiltIt: string;
  /** High-level pipeline steps, one short line each. */
  howItWorks: { step: string; detail: string }[];
  /** Headline results. Keep to three or four. */
  keyFindings: { value: string; label: string }[];
  findingsNote: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  imageAlt?: string;
}

/* ── Basics ───────────────────────────────────────────────────── */

export const site = {
  name: "Josh Silverman",
  tagline: "Aspiring Sports Analytics Professional",
  intro:
    "I'm a data analytics and AI consultant who works across the whole pipeline, from SQL sourcing and KPI definition to Power BI dashboards and machine learning models. On the side, I build sports analytics projects, including a PGA Tour prediction platform I've tested carefully against real results, and I'm working toward doing this full-time in sports.",
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
    location: "Atlanta, GA",
    period: "Aug 2024 - Present",
    bullets: [
      "Own the KPI Data Availability Matrix for ~55 business KPIs across a national home-services franchise network, partnering with Finance, Revenue Operations, and Engineering to determine which metrics have reliable data and prioritize which need work first.",
      "Write and validate SQL against AWS Redshift to source KPIs for 14 franchise health dashboards in Power BI, and oversee a consumer-financing dashboard tracking loan volume and revenue across six lending partners.",
      "Interviewed 10-15 stakeholders across 12 franchise brands to map each brand's lead-to-retention sales process into standardized funnel diagrams that feed KPI development and brand onboarding.",
      "Won 1st place in NTT DATA's North American AI Hackathon on a 3-person team, building an LLM evaluation framework and pitching it to the company's Global CEO.",
      "Previously (AI Engineer rotation): built BERT-based NLP sentiment models for bank call-center complaint classification and agentic AI proofs-of-concept on Azure, with CI/CD test automation via GitHub Actions.",
    ],
  },
  {
    organization: "PlayOn! Sports",
    role: "Marketing Technology Intern",
    location: "Atlanta, GA",
    period: "Summer 2023",
    bullets: [
      "Built 2 machine learning models in Python and R to predict sporting event outcomes, working alongside marketing technology engineers.",
      "Analyzed millions of rows of customer data across the NFHS Network and GoFan platforms to improve email retention and digital marketing performance.",
    ],
  },
  {
    organization: "Miami Heat",
    role: "Retail Operations Intern",
    location: "Miami, FL",
    period: "Summer 2022",
    bullets: [
      "Pitched a revenue-generating arena renovation proposal to Heat executive staff as part of a 10-intern team.",
      "Supported warehouse and e-commerce fulfillment operations using RetailPro and Excel.",
    ],
  },
  {
    organization: "Pro Sports Outlook",
    role: "Media Coordinator",
    period: "Summer 2021",
    bullets: [
      "Curated daily sports highlight content, selecting from hundreds of posts across sports media to build PSO's daily highlights.",
    ],
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
      "SQL (AWS Redshift)",
      "Python (scikit-learn, pandas, FastAPI)",
      "R",
      "TypeScript / React",
      "Power BI",
      "Tableau",
      "Excel",
    ],
  },
  {
    category: "Analytics & ML",
    items: [
      "Predictive Modeling",
      "Gradient Boosting",
      "Probability Calibration",
      "Backtesting",
      "NLP (BERT)",
      "Regression Analysis",
    ],
  },
  {
    category: "Platforms",
    items: [
      "Azure",
      "Fly.io",
      "Streamlit",
      "GitHub Actions (CI/CD)",
      "Salesforce Marketing Cloud",
      "Google Analytics",
    ],
  },
];

/* ── Section 03: Prediction Model ─────────────────────────────── */

export const predictionModel: FeaturedProject = {
  title: "Pinpoint Analytics: PGA Tour Prediction Platform",
  tagline:
    "Win, top-5, top-10, top-20, and make-cut probabilities for every player in a PGA Tour field, updated each tournament week.",
  whatItIs:
    "A full-stack prediction platform that rates all ~150 players in a given PGA Tour field and outputs a probability for each of five finishing outcomes. It runs end to end on its own: it pulls the field, builds the features, scores the players, and serves the board through a live web app.",
  whyIBuiltIt:
    "Most public golf models either hide their track record or grade themselves on events they were trained on, which makes the numbers look far better than they are. I wanted to build one where the honest version of the results was the version I published, including the markets where the model has no edge at all.",
  howItWorks: [
    {
      step: "Source",
      detail:
        "Pull tournament fields, round-by-round scoring, and strokes-gained data going back to 2017.",
    },
    {
      step: "Engineer",
      detail:
        "Build per-player features from strokes-gained by category, form over varying lookback windows, round-to-round volatility, and course fit.",
    },
    {
      step: "Model",
      detail:
        "Score five nested outcome markets with gradient-boosted models, then force the probabilities to stay logically consistent and sum correctly across the field.",
    },
    {
      step: "Validate",
      detail:
        "Backtest on a rolling basis so the model only ever predicts events that came after its training data, then track live results week to week.",
    },
    {
      step: "Serve",
      detail:
        "Deploy the board as a FastAPI service behind a React front end, with caching so a full field loads instantly.",
    },
  ],
  keyFindings: [
    { value: "35,800", label: "player-tournament results tested, 2018 to 2026" },
    { value: "make-cut", label: "the market with the largest measured edge" },
    { value: "no edge", label: "on picking outright winners, and I say so" },
  ],
  findingsNote:
    "Tested on roughly 35,800 player-tournament results the model never trained on, the edge is real and largest in the make-cut market, still clear for top-20 and top-10, and statistically indistinguishable from zero for outright winners. That last result is the one most models bury. Predicting the winner of a 150-player golf tournament is close to a coin flip dressed up as expertise, so I point the useful part of the model at the markets where it actually beats the field.",
  tags: ["FastAPI", "scikit-learn", "React", "TypeScript", "PostgreSQL", "Redis"],
  github: "https://github.com/josh-silverman/golf-analytics-platform",
  demo: "https://pinpoint-golf-gray.vercel.app",
  image: "/pinpoint-results.svg",
  imageAlt:
    "Interval plot of out-of-sample prediction skill across five outcome markets. Make-cut, top-20, and top-10 show genuine skill while the win market does not.",
};

/* ── Section 04: Research & Analysis ──────────────────────────── */

export const research: Project[] = [
  {
    title: "How Many Rounds Until You Can Trust Strokes Gained?",
    description:
      "A study of 131,847 PGA Tour rounds (2017 to 2026) measuring how quickly each strokes-gained category becomes real skill signal instead of noise. Driving settles in roughly 9 rounds while putting takes around 48, which means a 12-round putting hot streak deserves only about 20% of your trust.",
    tags: ["Python", "pandas", "SciPy", "DataGolf API", "Reliability Analysis"],
    github: "https://github.com/josh-silverman/sg-reliability",
    demo: "https://sg-reliability.vercel.app",
    image: "/sg-stabilization.svg",
    imageAlt:
      "Stabilization curves showing reliability by sample size for each strokes-gained category. Driving reaches the halfway-reliable mark at about 9 rounds, putting at about 48.",
  },
];
