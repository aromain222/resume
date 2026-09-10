/**
 * Single source of truth for project and experience content. WhatImBuilding.tsx
 * (Work tab), Experience.tsx (Path tab), and the world layer (components/world/*)
 * all read from here — content is authored once and rendered in three places.
 */

/** Bio copy shared by the About tab and the world plaza's About panel. */
export const bio: string[] = [
  "I'm from San Mateo, California, and I've been at Amherst since 2023 studying political science and Black studies. Political science trained me to build an argument. Football trained me to show up on the days I don't feel like it. Software is where both habits actually get used.",
];

export type Project = {
  title: string;
  tagline: string;
  description: string;
  url?: string;
  image?: string;
  alt?: string;
  /** Shown instead of a screenshot when there's no public URL to capture one from. */
  placeholderTag?: string;
  /**
   * The documented stages this system moves work through, in order. Rendered as
   * an architecture diagram — it describes how the thing is wired, not live
   * telemetry, and every stage below is taken from the project's own docs.
   */
  pipeline?: string[];
  category: string;
  status: "Live" | "Private demo";
  proof: string;
};

export const projects: Project[] = [
  {
    title: "Transfer Portal",
    tagline: "A faster way to find transfer targets.",
    description:
      "College staffs use it to work the portal. You set the position needs, it ranks who fits, and the shortlist stays in one place.",
    url: "https://jal-football.vercel.app",
    image: "/work/portal.png",
    alt: "The Transfer Portal dashboard: 638 indexed players, active position needs, and a shortlist of six.",
    category: "College football",
    status: "Live",
    proof: "638 players indexed",
  },
  {
    title: "Stackwise",
    tagline: "A better starting point for your finances.",
    description:
      "Answer eight questions and it returns the checking, savings, credit, and investing accounts that actually fit you, with the reason each one won.",
    url: "https://stackr-silk.vercel.app",
    image: "/work/stackwise.png",
    alt: "Stackwise: an eight-question flow that returns a specific checking, savings, credit, and investing stack.",
    category: "Personal finance",
    status: "Live",
    proof: "No account needed",
  },
  {
    title: "DataChat",
    tagline: "Ask questions about a spreadsheet.",
    description:
      "Upload a CSV and ask a question in plain English. It answers with the table, the chart, and the SQL it ran to get there.",
    url: "https://sql-beta-roan.vercel.app",
    image: "/work/datachat.png",
    alt: "DataChat: a CSV upload panel above four example finance questions in plain English.",
    category: "Data tooling",
    status: "Live",
    proof: "Shows the SQL it ran",
  },
  {
    title: "Financial Modeling Engine",
    tagline: "Full Excel models from one standalone API.",
    description:
      "Builds DCF, LBO, three-statement, comps, and M&A workbooks in Excel with the formulas still linked, so you can change an assumption and watch it flow.",
    placeholderTag: "DCF · LBO · Comps · M&A",
    category: "Financial modeling",
    status: "Private demo",
    proof: "Available on request",
  },
  {
    title: "AML Sentinel",
    tagline: "An investigator and a skeptic argue it out before a human decides.",
    description:
      "Takes a transaction-monitoring alert and walks it from evidence to a human-reviewed disposition. A Context Builder, Pattern Analyst, and Investigator build the case; a Skeptic agent independently argues against escalation; a Reviewer weighs both sides. Every finding cites its evidence, and the final call stays with a person.",
    placeholderTag: "Analyst · Investigator · Skeptic · Reviewer",
    pipeline: [
      "Alert",
      "Context Builder",
      "Pattern Analyst",
      "Investigator",
      "Skeptic",
      "Reviewer",
      "Human approval",
    ],
    category: "AML compliance",
    status: "Private demo",
    proof: "Skeptic agent argues against escalation",
  },
];

export type ExperienceStop = {
  period: string;
  company: string;
  role: string;
  detail: string;
  bullets?: string[];
  now?: boolean;
  /** Same contract as Project["pipeline"] — each stage compresses a bullet above it. */
  pipeline?: string[];
};

export const experience: ExperienceStop[] = [
  {
    period: "2015",
    company: "Menlo School",
    role: "High school",
    detail: "Where I got serious about school, football, and what I wanted to build.",
  },
  {
    period: "2020",
    company: "Basketball camp",
    role: "Founder",
    detail: "My first experience organizing something for other people.",
  },
  {
    period: "2024",
    company: "Clavius Wealth Management",
    role: "Summer analyst",
    detail: "First finance seat — how advisors think about clients, portfolios, and long-term goals.",
  },
  {
    period: "2025",
    company: "SoFi",
    role: "Fintech extern",
    detail: "1st place in SoFi's fintech product externship.",
    bullets: [
      "Selected from under 5% of applicants for SoFi's externship focused on fintech product innovation",
      "Researched TAM, market trends, and Gen Z financial behavior to guide product design for a gamified literacy tool",
      "Delivered a winning pitch to SoFi executives, earning 1st place for strategic insight and execution",
    ],
  },
  {
    period: "2025",
    company: "Caprae Capital",
    role: "Private equity intern",
    detail: "Lower-middle-market M&A.",
    bullets: [
      "Researched 50+ founder-owned firms and built acquisition pipelines",
      "Supported due diligence on $25M+ deals with models and investment materials",
      "Analyzed comparable transactions and screened acquisition targets",
    ],
  },
  {
    period: "2025",
    company: "CapitalBase",
    role: "Founder",
    detail: "Financial research and modeling tools.",
    bullets: [
      "Built a pipeline that combines SEC filings, earnings reports, and market data",
      "Built valuation and diligence workflows for DCF, LBO, comps, and M&A",
      "Added live news and sentiment to the research process",
      "Cut modeling time from hours to minutes by running research in parallel and reusing fetched data",
    ],
    pipeline: ["SEC filings", "Earnings + market data", "Valuation workflow", "News + sentiment"],
  },
  {
    period: "2026",
    company: "Sankofa",
    role: "Co-founder · Lead engineer",
    detail: "Investment research and portfolio monitoring.",
    bullets: [
      "Built a 19-agent platform that researches investments and monitors a live portfolio",
      "Connected news, sentiment, quantitative, and fundamental research into one workflow",
      "Built a debate process that turns competing views into a documented buy, sell, or hold recommendation",
      "Added monitoring and Slack alerts when the evidence changes a thesis",
    ],
    pipeline: ["Research", "Debate", "Buy / sell / hold", "Monitoring", "Slack alert"],
  },
  {
    period: "Now",
    company: "Murj",
    role: "AI implementation engineer",
    detail: "Making finance work less manual.",
    now: true,
    bullets: [
      "Built internal tools that take repetitive finance work off the team's plate",
      "Automated AR reporting and monthly rollover from Sage 50 data",
      "Worked with the finance team to map and automate the workflow end-to-end",
    ],
    pipeline: ["Sage 50 data", "AR reporting", "Monthly rollover"],
  },
];
