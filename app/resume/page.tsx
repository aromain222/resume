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
            org="CapitalBase"
            role="Founder – Lead Developer"
            location="Remote"
            period="August 2025 – Present"
            bullets={[
              "Built an AI platform that generates full financial models (DCF, LBO, Comps) in under 10 seconds, reducing modeling time by 20×",
              "Conducted product demos and outreach with early users to validate product-market fit and refine enterprise messaging",
              "Researched potential enterprise customers and built targeted messaging around financial workflow automation",
              "Designed a web interface enabling users to generate and export financial models from a simple prompt",
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
            org="Weel (YC S24)"
            role="Marketing Intern"
            location="Remote"
            period="June 2025 – July 2025"
            bullets={[
              "Executed campus marketing campaigns for a YC-backed fintech startup to drive Gen-Z user acquisition",
              "Produced video and social content that increased product awareness and downloads",
              "Collaborated with founders to refine growth messaging using user feedback and engagement metrics",
            ]}
          />
          <Job
            org="Robertson Stephens"
            role="Private Wealth Management Intern"
            location="San Francisco, CA"
            period="July 2025"
            bullets={[
              "Supported advisors managing $500M+ in AUM through portfolio reports and client deliverables",
              "Researched 50+ securities to inform allocation changes for high-net-worth portfolios",
              "Built Excel tools, reducing report preparation time by 25%, improving operational efficiency",
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
            note="In Progress"
            bullets={[
              "Building a system to ingest, filter, and surface player data into actionable decision workflows",
              "Designing interfaces that allow users to query and refine results based on specific constraints (measurables, usage, fit)",
              "Focused on turning messy datasets into structured outputs that support faster decision-making",
            ]}
          />
          <Project
            title="Financial Stack (AI-Driven Financial Workflow Tool)"
            bullets={[
              "Building a system that helps users understand and set up their financial stack through guided, agent-like workflows",
              "Focused on turning fragmented financial decisions into a structured, interactive process rather than static recommendations",
              "Designing flows that adapt based on user inputs, simulating how a financial advisor would guide decisions step-by-step",
              "Exploring how automation and AI can simplify onboarding into financial tools and improve long-term engagement",
            ]}
          />
          <Project
            title="Bitcoin VC & Grant Tracker"
            bullets={[
              "Cataloged 20+ Bitcoin VC firms and 500+ grants by creating and using a custom web crawler to automate data collection",
              "Created a searchable database of startup deals and developer grants by round size, sector, and funder",
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
              "NCAA Football Student-Athlete competing at a high level while managing 20+ hours per week of training, film study, and competition",
              "Demonstrated discipline, resilience, and leadership by balancing athletics with a full academic course load and campus commitments",
            ]}
          />
          <Job
            org="Alumni Outreach – Black Business Club"
            role=""
            location=""
            period=""
            bullets={[
              "Led Black alumni business outreach for the Amherst Black Business Club, focused on entrepreneurship and mentorship",
              "Developed a Black alumni founder outreach strategy for the Amherst Black Business Club",
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
          <p className="text-[12.5px] leading-relaxed">
            Python | JavaScript | Next.js | React | Tailwind | API Integration
            | Excel (Advanced Financial Modeling) | Financial Analysis | Figma |
            Supabase | SQL | Version Control (Git/GitHub) | Prompt Engineering |
            CRM Systems | Leadership | Collaboration | Strategic Execution |
            Pipeline Building | Lead Research | Outreach Strategy | Product
            Positioning | CRM | Sales | AI Agents
          </p>
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
