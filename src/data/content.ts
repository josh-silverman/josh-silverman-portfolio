/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the site from this file.
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
  /** GitHub repo URL — leave as "" to hide the link */
  github?: string;
  /** Live demo URL — leave as "" to hide the link */
  demo?: string;
  /** Optional card image (path under /public) — screenshot or results graphic */
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
    period: "Aug 2024 – Present",
    bullets: [
      "Own the KPI Data Availability Matrix for ~55 business KPIs across a national home-services franchise network, partnering with Finance, Revenue Operations, and Engineering to determine which metrics have reliable data and prioritize which need work first.",
      "Write and validate SQL against AWS Redshift to source KPIs for 14 franchise health dashboards in Power BI, and oversee a consumer-financing dashboard tracking loan volume and revenue across six lending partners.",
      "Interviewed 10–15 stakeholders across 12 franchise brands to map each brand's lead-to-retention sales process into standardized funnel diagrams that feed KPI development and brand onboarding.",
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

/* ── Projects ─────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    title: "Pinpoint Analytics: PGA Tour Prediction Platform",
    description:
      "A machine learning platform that generates calibrated probabilities for every player in a PGA Tour field across five outcome markets (win / top-5 / top-10 / top-20 / make-cut). Validated through backtesting, 18 pre-registered feature experiments, and a forward track record graded only on events the model never trained on.",
    tags: ["FastAPI", "scikit-learn", "React", "TypeScript", "PostgreSQL", "Redis"],
    github: "https://github.com/josh-silverman/golf-analytics-platform",
    demo: "https://pinpoint-golf-gray.vercel.app",
    image: "/pinpoint-results.svg",
    imageAlt:
      "Interval plot of out-of-sample Brier skill scores with 90% confidence intervals across five outcome markets. Make-cut, top-20, and top-10 show genuine skill.",
  },
  {
    title: "How Many Rounds Until You Can Trust Strokes Gained?",
    description:
      "A pre-registered reliability study of 131,847 PGA Tour rounds (2017–2026) measuring how quickly each strokes-gained category becomes skill signal instead of noise. Driving stabilizes in roughly 9 rounds while putting takes around 48, which means a 12-round putting hot streak deserves only about 20% of your trust.",
    tags: ["Python", "pandas", "SciPy", "DataGolf API", "Bootstrap CIs"],
    github: "https://github.com/josh-silverman/sg-reliability",
    demo: "https://sg-reliability.vercel.app",
    image: "/sg-stabilization.svg",
    imageAlt:
      "Stabilization curves showing split-half reliability by sample size for each strokes-gained category. Driving reaches R = 0.5 at about 9 rounds, putting at about 48.",
  },
];
