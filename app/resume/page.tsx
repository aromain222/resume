import PrintButton from "./PrintButton";

export const metadata = { title: "Resume — Avery Romain" };

export default function ResumePage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          @page { margin: 0.65in; size: letter; }
        }
      `}</style>

      {/* Screen-only controls */}
      <div className="no-print fixed top-4 right-4 z-50 flex items-center gap-3">
        <a
          href="/"
          className="px-4 py-2 bg-zinc-900 text-zinc-500 text-xs tracking-[0.15em] uppercase border border-white/10 hover:text-zinc-300 transition-colors duration-200"
        >
          ← Back
        </a>
        <PrintButton />
      </div>

      {/* Resume body */}
      <div className="max-w-[780px] mx-auto px-10 py-14 bg-white text-black min-h-screen text-[13px] leading-snug font-sans">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-[22px] font-bold tracking-wide uppercase mb-1">
            Avery Romain
          </h1>
          <p className="text-[12px] text-gray-600">
            421 Heather Ln, San Mateo, CA 94403 &nbsp;|&nbsp; (650) 430-9759 &nbsp;|&nbsp;{" "}
            <a href="mailto:Averyromain5@gmail.com" className="text-black">
              Averyromain5@gmail.com
            </a>
          </p>
        </div>

        <hr className="border-black mb-3" />

        {/* Experience */}
        <Section title="Experience">
          <Job
            org="Murj"
            role="AI Implementation Engineer"
            location="Remote"
            period="June 2026 – Present"
            bullets={[
              "Built internal automations that replace manual finance workflows, freeing the team from repetitive data handling",
              "Automated AR reporting and the monthly rollover by extracting and structuring Sage 50 data into a scheduled Python job",
              "Partnered with the finance team to map the existing AR workflow, then automated the manual steps end-to-end",
            ]}
          />
          <Job
            org="Sankofa"
            role="Co-Founder – Lead Engineer"
            location="Remote"
            period="May 2026 – Present"
            bullets={[
              "Built a 19-agent platform for autonomous investment research and real-time portfolio monitoring",
              "Engineered analyst agents for news, sentiment, quant, and fundamentals, each creating a bullish or bearish signal with reasoning",
              "Orchestrated 13 manager-persona agents that debate analyst signals into a single buy/sell/hold verdict",
              "Designed a monitoring loop that re-scans holdings continuously and re-triggers agent deliberation on material change",
              "Wired Slack alerts that fire only when re-analysis flips a thesis, with a written rationale for the change",
            ]}
          />
          <Job
            org="CapitalBase"
            role="Founder"
            location="Remote"
            period="August 2025 – May 2026"
            bullets={[
              "Architected a multi-agent pipeline ingesting SEC filings, earnings reports, and market data into structured analysis inputs",
              "Built valuation and diligence workflows into a production app, orchestrating agent calls into auditable financial outputs",
              "Integrated live news and sentiment signals into the modeling engine, grounding valuations in current market conditions",
              "Designed an agentic system automating DCF, LBO, comps, and M&A end-to-end, replacing Excel with reproducible models",
              "Cut modeling time from hours to minutes by parallelizing agent tasks and caching data fetches",
            ]}
          />
          <Job
            org="Caprae Capital"
            role="Private Equity Intern"
            location="Remote"
            period="June 2025 – Aug 2025"
            bullets={[
              "Researched 50+ founder-owned firms under $10M in revenue and built acquisition pipelines through market mapping",
              "Supported due diligence on $25M+ deals by preparing models and investment materials used in partner evaluations",
              "Analyzed 30+ comparable transactions to benchmark valuation multiples and refine sourcing strategy",
              "Applied unit economics, cash flow durability, and multiple expansion analysis to screen 80+ acquisition targets",
            ]}
          />
          <Job
            org="SoFi Sophomore Externship"
            role="SoFi Fintech Extern"
            location="San Francisco, CA"
            period="June 2025"
            bullets={[
              "Selected from under 5% of applicants for SoFi's competitive externship focused on fintech product innovation",
              "Researched TAM, market trends, and Gen Z financial behavior to guide product design for a gamified literacy tool",
              "Delivered a winning pitch to SoFi executives, earning 1st Place for strategic insight and execution",
            ]}
          />
        </Section>

        {/* Projects */}
        <Section title="Relevant Coursework / Projects">
          <Project
            title="Transfer Portal + PFF Tool (Data + Workflow System)"
            bullets={[
              "Built a system that ingests, filters, and surfaces player data into actionable decision workflows",
              "Designed interfaces that let users query and refine results based on specific constraints (measurables, usage, fit)",
              "Turned messy datasets into structured outputs that support faster decision-making",
            ]}
          />
          <Project
            title="Financial Stack (AI-Driven Financial Workflow Tool)"
            bullets={[
              "Built a system that helps users set up their financial stack through guided, agent-like workflows",
              "Turned fragmented financial decisions into a structured, interactive process rather than static recommendations",
              "Designed flows that adapt to user inputs, simulating how a financial advisor guides decisions step-by-step",
            ]}
          />
        </Section>

        {/* Volunteer */}
        <Section title="Volunteer Work / Leadership">
          <Job
            org="Street Code Academy"
            role=""
            location="East Palo Alto, CA"
            period=""
            bullets={[
              "Mentored underserved students in coding, entrepreneurship, and digital skills to bridge the tech opportunity gap",
              "Led workshops on software development fundamentals and business pitch creation, fostering practical problem-solving",
            ]}
          />
          <Job
            org="NCAA Football Student-Athlete"
            role=""
            location=""
            period=""
            bullets={[
              "Compete at the NCAA level while managing 20+ hours/week of training and film study alongside a full course load",
            ]}
          />
          <Job
            org="Alumni Outreach – Black Business Club"
            role=""
            location=""
            period=""
            bullets={[
              "Led founder alumni outreach for the Amherst Black Business Club, building a mentorship pipeline connecting students with Black alumni",
            ]}
          />
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="flex justify-between items-start mb-0.5">
            <span className="font-bold">Amherst College – &apos;27</span>
            <span className="text-gray-600">Amherst, MA</span>
          </div>
          <p className="text-gray-600 italic mb-1">
            Bachelor of Arts, Political Science; Black Studies
          </p>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="text-[12.5px] leading-relaxed space-y-1">
            <p>
              <span className="font-bold">Languages &amp; Frameworks:</span>{" "}
              Python | JavaScript | TypeScript | React | Next.js | Tailwind | SQL
            </p>
            <p>
              <span className="font-bold">Tools &amp; Infrastructure:</span>{" "}
              Supabase | Git/GitHub | API Integration | Figma | Excel (Advanced
              Financial Modeling)
            </p>
            <p>
              <span className="font-bold">AI &amp; Automation:</span> AI Agents |
              Multi-Agent Systems | Workflow Automation | Prompt Engineering
            </p>
            <p>
              <span className="font-bold">Finance:</span> Financial Modeling |
              Financial Analysis | Valuation | Due Diligence
            </p>
            <p>
              <span className="font-bold">Client-Facing:</span> Stakeholder
              Discovery | Technical Communication | Cross-Functional Collaboration
              | Client Onboarding
            </p>
          </div>
        </Section>
      </div>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-[13.5px] font-bold uppercase border-b border-black pb-0.5 mb-2 tracking-wide">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Job({
  org,
  role,
  location,
  period,
  bullets,
}: {
  org: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-baseline">
        <span className="font-bold">{org}</span>
        {location && <span className="text-gray-600 text-[12px]">{location}</span>}
      </div>
      {(role || period) && (
        <div className="flex justify-between items-baseline">
          {role && <span className="italic text-[12px]">{role}</span>}
          {period && <span className="text-[12px] text-gray-600">{period}</span>}
        </div>
      )}
      <ul className="mt-1 space-y-0.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[12.5px]">
            <span className="mt-[3px] shrink-0">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Project({
  title,
  note,
  bullets,
}: {
  title: string;
  note?: string;
  bullets: string[];
}) {
  return (
    <div className="mb-3">
      <p className="font-bold text-[12.5px]">
        {title}
        {note && <span className="font-normal italic text-gray-600"> — {note}</span>}
      </p>
      <ul className="mt-1 space-y-0.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[12.5px]">
            <span className="mt-[3px] shrink-0">●</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
