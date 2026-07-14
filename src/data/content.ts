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
    "I'm a data analytics & AI consultant who builds and validates the full pipeline — from SQL sourcing and KPI definition to Power BI dashboards and machine learning models. I create sports analytics projects, including a PGA Tour prediction platform with rigorously backtested accuracy, and I'm working toward doing it full-time in sports.",
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
  "I got my start at the intersection of sports and data — building event-outcome prediction models as a marketing technology intern at PlayOn! Sports and pitching arena revenue concepts to Miami Heat executives — before earning an M.S. in Business Analytics from the University of Georgia's Terry College of Business.",
  "Today I work as a data analytics & AI consultant at NTT DATA, where I own KPI frameworks, validate enterprise SQL pipelines, and took 1st place in the company's North American AI Hackathon — pitching an LLM evaluation framework to the Global CEO. On nights and weekends, I run an end-to-end PGA Tour prediction platform — from strokes-gained feature engineering and calibrated gradient-boosted models through rigorous backtesting to a deployed full-stack product.",
  "My goal: bring that same rigor — honest validation, reproducible pipelines, and clear communication with decision-makers — to a sports analytics organization.",
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
    school: "University of Georgia — Terry College of Business",
    degree: "M.S. Business Analytics",
    detail: "GPA: 3.9",
    period: "2024",
  },
  {
    school: "University of Georgia — Terry College of Business",
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
    title: "Pinpoint Analytics — PGA Tour Prediction Platform",
    description:
      "An end-to-end machine learning platform generating calibrated probabilities for every player in a PGA Tour field across five outcome markets (win / top-5 / top-10 / top-20 / make-cut) — validated through rigorous backtesting, 18 pre-registered feature experiments, and a forward track record graded only on events the model never trained on.",
    tags: ["FastAPI", "scikit-learn", "React", "TypeScript", "PostgreSQL", "Redis"],
    github: "https://github.com/josh-silverman/golf-analytics-platform",
    demo: "https://pinpoint-golf-gray.vercel.app",
    image: "/pinpoint-results.svg",
    imageAlt:
      "Interval plot of out-of-sample Brier skill scores with 90% confidence intervals across five outcome markets — make-cut, top-20, and top-10 show genuine skill.",
  },
];
