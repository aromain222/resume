import { experience, projects } from "./portfolioData";

// Spread the grounds, not the buildings: footprints and doorway offsets stay life-size.
export const CAMPUS_SPACING = 1.6;

export type CampusGroup =
  "About me" | "Education" | "Entrepreneurship" | "Projects" | "Experience" | "Hobbies";

// Area signs sit beside paths, separate from the clickable destination signs.
export const campusDistricts: {
  label: CampusGroup;
  position: [number, number, number];
  rotation: number;
  width: number;
  style: "broad" | "framed" | "formal" | "trail";
}[] = [
  {
    label: "Entrepreneurship",
    position: [-12, 0, 1.5], rotation: Math.PI / 4, width: 8.8, style: "broad",
  },
  {
    label: "Projects",
    position: [17.6, 0, 7.7], rotation: 0, width: 5.4, style: "framed",
  },
  { label: "Experience", position: [20, 0, -23], rotation: Math.PI / 4, width: 6.8, style: "formal" },
  {
    label: "Hobbies",
    position: [-25, 0, 23], rotation: Math.PI / 4, width: 5, style: "trail",
  },
  { label: "Education", position: [11.8, 0, -8.6], rotation: Math.PI / 4, width: 5.8, style: "formal" },
];
export type CampusVisual =
  | "courtyard"
  | "college"
  | "committee"
  | "modeling"
  | "evidence"
  | "scouting"
  | "finance-kiosk"
  | "data-lab"
  | "office"
  | "milestone"
  | "powerwashing"
  | "anime"
  | "pokemon"
  | "basketball"
  | "lifting"
  | "lego"
  | "gaming"
  | "cooking"
  | "hiking";
export type CampusStop = {
  id: string;
  title: string;
  signTitle?: string;
  description: string;
  kind: "about" | "project" | "experience" | "hobby";
  group: CampusGroup;
  visual: CampusVisual;
  position: [number, number];
  entrance: [number, number];
  footprint: [number, number];
  obstacles?: { offset: [number, number]; size: [number, number] }[];
  color: string;
  height: number;
  bullets: string[];
  technologies: string[];
  links: { label: string; href: string }[];
  role?: string;
  period?: string;
  logo?: string;
  discoveryOnly?: boolean;
  image?: string;
  imageAlt?: string;
  workflow?: string[];
  game?: "basketball" | "pokemon" | "lego" | "cooking";
};
const role = (company: string) => {
  const stop = experience.find((item) => item.company === company);
  if (!stop) throw new Error("Missing portfolio experience: " + company);
  return stop;
};
const project = (title: string) => {
  const item = projects.find((item) => item.title === title);
  if (!item) throw new Error("Missing portfolio project: " + title);
  return item;
};

const featured: CampusStop[] = [
  {
    id: "about",
    title: "Avery Romain",
    description:
      "I’m an Amherst student and football player who builds software.",
    kind: "about",
    group: "About me",
    visual: "courtyard",
    position: [0, 3],
    entrance: [0, 6.5],
    footprint: [0, 0],
    obstacles: [
      { offset: [-2.5, -1], size: [2.2, 0.8] },
      { offset: [2.5, -1], size: [2.2, 0.8] },
    ],
    color: "#864a51",
    height: 1.5,
    bullets: [
      "I study political science and Black studies at Amherst.",
      "I play defensive line, wearing #93.",
      "I love fashion, especially a good quarter-zip.",
    ],
    technologies: [],
    links: [
      { label: "Resume", href: "/resume" },
      { label: "LinkedIn", href: "https://linkedin.com/in/avery-romain" },
      { label: "GitHub", href: "https://github.com/aromain222" },
      { label: "Contact", href: "mailto:averyromain5@gmail.com" },
    ],
  },
  {
    id: "amherst",
    title: "Amherst College",
    description: "Political science, Black studies, and Amherst football.",
    kind: "about",
    group: "Education",
    visual: "college",
    position: [4, -8],
    entrance: [4, -4.8],
    footprint: [6, 4.4],
    logo: "/world/logos/amherst-a.png",
    color: "#744a54",
    height: 5.2,
    role: "Student · Football",
    period: "Class of ’27",
    bullets: ["I study political science and Black studies.", "I play defensive line for Amherst, wearing #93.", "Amherst has been home since 2023."],
    technologies: [],
    links: [{ label: "About me", href: "#about" }, { label: "Resume", href: "/resume" }],
  },
  {
    id: "investment",
    title: "Sankofa",
    description:
      "I’m building an AI investment committee that researches investments and debates decisions.",
    kind: "project",
    group: "Entrepreneurship",
    visual: "committee",
    position: [-7, -5],
    entrance: [-7, -1.3],
    footprint: [6.2, 6.2],
    color: "#397d78",
    height: 3.7,
    role: role("Sankofa").role,
    period: role("Sankofa").period,
    bullets: role("Sankofa").bullets!,
    technologies: ["Multi-agent research", "Portfolio monitoring", "Slack"],
    links: [{ label: "View experience", href: "#path" }],
    workflow: ["Research", "Debate", "Decision"],
  },
  {
    id: "finance",
    title: "CapitalBase",
    description:
      "I built CapitalBase to turn company research into financial models in Excel.",
    kind: "project",
    group: "Entrepreneurship",
    visual: "modeling",
    position: [-16, -6],
    entrance: [-16, -2.7],
    footprint: [6.4, 4.4],
    color: "#b78743",
    height: 4.4,
    role: role("CapitalBase").role,
    period: role("CapitalBase").period,
    bullets: [
      "Automated DCF, LBO, three-statement, comps, and M&A models.",
      "Linked Excel formulas carry assumption changes through the workbook.",
      "Research combines SEC filings, earnings reports, and market data.",
      "Parallel research and reusable data accelerate valuation workflows.",
    ],
    technologies: ["Excel", "Financial modeling", "SEC filings", "Market data"],
    links: [{ label: "View project details", href: "#work" }],
    workflow: ["Inputs", "Linked model", "Workbook"],
  },
];

const projectExhibits: CampusStop[] = [
  {
    id: "aml",
    title: "AML Sentinel",
    description:
      "Agents investigate suspicious transactions, and a person makes the final call.",
    visual: "evidence",
    position: [8, 2],
    entrance: [8, 4],
    color: "#697caf",
    bullets: [
      "Five agents build, challenge, and review an investigation.",
      "Findings link back to the evidence behind them.",
      "A human reviews the recommendation and makes the final decision.",
    ],
    technologies: ["TypeScript", "Anthropic", "Postgres", "Stripe"],
    links: [
      { label: "View project", href: "https://aml-sentinel-delta.vercel.app" },
    ],
  },
  {
    id: "portal",
    title: "Transfer Portal",
    description:
      "Find college football players who fit a team’s transfer needs.",
    visual: "scouting",
    position: [14, 2],
    entrance: [14, 4],
    color: "#a26b4c",
    bullets: [
      "Rank transfer targets against a college team's position needs.",
      "Keep player research and the shortlist in one place.",
      project("Transfer Portal").proof,
    ],
    technologies: ["Player data", "Scouting workflows"],
    links: [{ label: "View project", href: project("Transfer Portal").url! }],
    image: project("Transfer Portal").image,
    imageAlt: project("Transfer Portal").alt,
  },
  {
    id: "stackr",
    title: "Stackr",
    description: "Find the bank accounts and cards that fit your finances.",
    visual: "finance-kiosk",
    position: [8, 8],
    entrance: [8, 10],
    color: "#73a071",
    bullets: [
      "Answer eight questions about your financial needs.",
      "Get a personalized checking, savings, credit, and investing stack.",
      "See the reason each recommendation fits.",
    ],
    technologies: ["Personal finance", "Recommendation workflows"],
    links: [{ label: "View project", href: project("Stackwise").url! }],
    image: project("Stackwise").image,
    imageAlt: "Stackr personal-finance questionnaire",
  },
  {
    id: "data",
    title: "DataChat",
    description: "Upload a spreadsheet and ask questions in plain English.",
    visual: "data-lab",
    position: [14, 8],
    entrance: [14, 10],
    color: "#8c72aa",
    bullets: [
      "Upload a CSV and ask questions in plain English.",
      "Explore answers as tables and charts.",
      "Inspect the SQL behind the answer.",
    ],
    technologies: ["SQL", "CSV", "Natural language analysis"],
    links: [{ label: "View project", href: project("DataChat").url! }],
    image: project("DataChat").image,
    imageAlt: project("DataChat").alt,
  },
].map(
  (item) =>
    ({
      ...item,
      kind: "project",
      group: "Projects",
      height: 2.2,
      footprint: [3.8, 2.6],
    }) as CampusStop,
);

const employers = [
  {
    id: "clavius",
    company: "Clavius Wealth Management",
    position: [-20, -18],
    color: "#607d95",
    height: 3.3,
  },
  {
    id: "sofi",
    company: "SoFi",
    position: [-7, -18],
    color: "#338f99",
    height: 3.6,
  },
  {
    id: "caprae",
    company: "Caprae Capital",
    position: [6, -18],
    color: "#737f56",
    height: 3.1,
  },
  {
    id: "murj",
    company: "Murj",
    position: [19, -18],
    color: "#b65a55",
    height: 3.5,
  },
].map(({ company, ...layout }) => {
  const item = role(company);
  return {
    ...layout,
    position: [layout.position[0], layout.position[1]],
    title: company,
    signTitle: layout.id === "clavius" ? "Clavius" : undefined,
    description: item.detail,
    role: item.role,
    period: item.period,
    kind: "experience",
    group: "Experience",
    visual: "office",
    logo:
      "/world/logos/" +
          layout.id +
          (layout.id === "sofi" ? ".svg" : ".png"),
    footprint: [4, 3],
    entrance: [layout.position[0], layout.position[1] + 2.4],
    bullets: item.bullets ?? [item.role, item.detail, item.period],
    technologies: [],
    links: [{ label: "Full experience", href: "#path" }],
  } as CampusStop;
});
const milestones = [
  { company: "Menlo School", id: "menlo", position: [6.5, -2] },
  { company: "Basketball camp", id: "camp", position: [-22, 1] },
].map(({ company, ...layout }) => {
  const item = role(company);
  return {
    ...layout,
    position: [layout.position[0], layout.position[1]],
    title: company,
    description: item.detail,
    role: item.role,
    period: item.period,
    kind: "experience",
    group: layout.id === "camp" ? "Entrepreneurship" : "Education",
    visual: layout.id === "menlo" ? "college" : "milestone",
    logo: layout.id === "menlo" ? "/world/logos/menlo.png" : undefined,
    footprint: layout.id === "menlo" ? [6, 4.4] : [1.4, 0.8],
    entrance: [layout.position[0], layout.position[1] + (layout.id === "menlo" ? 3.2 : 1.3)],
    color: "#ad986e",
    height: layout.id === "menlo" ? 4 : 1.5,
    bullets: [item.detail],
    technologies: [],
    links: [{ label: "Full experience", href: "#path" }],
  } as CampusStop;
});

// The user supplied this experience; dates and business details are not yet supplied.
const powerwashing: CampusStop = {
  id: "powerwashing",
  title: "Powerwashing",
  description: "My hands-on work in powerwashing.",
  kind: "experience",
  group: "Entrepreneurship",
  visual: "powerwashing",
  position: [-17, 4],
  entrance: [-17, 6],
  footprint: [2.2, 1.8],
  color: "#607d95",
  height: 0.8,
  bullets: ["Powerwashing is part of my entrepreneurship experience."],
  technologies: [],
  links: [],
};

const hobbies = [
  {
    id: "anime",
    title: "Anime",
    visual: "anime",
    position: [-4, 14],
    description: "My favorite Naruto characters are Itachi and Killer Bee.",
    color: "#b56b50",
    footprint: [2, 1],
  },
  {
    id: "pokemon",
    title: "Pokémon",
    visual: "pokemon",
    position: [2, 15],
    description: "I’m a Pokémon fan. Infernape is a favorite.",
    color: "#c1914c",
    footprint: [1.8, 1.4],
  },
  {
    id: "basketball",
    title: "Basketball",
    visual: "basketball",
    position: [18, -9],
    description: "I’m a huge LeBron fan. Want to shoot a few hoops?",
    color: "#b27c56",
    footprint: [0, 0],
  },
  {
    id: "lifting",
    title: "Lifting",
    visual: "lifting",
    position: [18, -2],
    description: "Lifting is a big part of my life outside class.",
    color: "#68727e",
    footprint: [3.1, 2.3],
  },
  {
    id: "lego",
    title: "LEGO",
    visual: "lego",
    position: [-15, 10],
    description:
      "I love building LEGO sets: a bonsai, a Porsche 911, and lucky bamboo.",
    color: "#789776",
    footprint: [3, 1.4],
  },
  {
    id: "gaming",
    title: "Gaming",
    visual: "gaming",
    position: [-8, 12],
    description: "You’ll usually find me playing College Football.",
    color: "#7e7396",
    footprint: [2.8, 2],
  },
  {
    id: "cooking",
    title: "Cooking",
    visual: "cooking",
    position: [-19, 7],
    description:
      "My favorite things to cook are curry chicken, jerk chicken, and steak.",
    color: "#ae7950",
    footprint: [3, 1.6],
  },
  {
    id: "hiking",
    title: "Hiking",
    visual: "hiking",
    position: [17, 15],
    description: "I’m always up for a good view or a long hike.",
    color: "#80977c",
    footprint: [0, 0],
  },
].map(
  (item) =>
    ({
      ...item,
      kind: "hobby",
      game: ["basketball", "pokemon", "lego", "cooking"].includes(item.id)
        ? (item.id as "basketball" | "pokemon" | "lego" | "cooking")
        : undefined,
      position: [item.position[0], item.position[1]],
      footprint: [item.footprint[0], item.footprint[1]],
      obstacles:
        item.id === "basketball"
          ? [{ offset: [0, -2.25], size: [1.6, 0.3] }]
          : item.id === "hiking"
            ? [{ offset: [0, -0.4], size: [2.2, 0.8] }]
            : undefined,
      group: "Hobbies",
      height: 1.4,
      entrance: [item.position[0], item.position[1] + 2],
      bullets: [item.description],
      technologies: [],
      links: [],
    }) as CampusStop,
);

const authoredCampus: CampusStop[] = [
  ...featured,
  ...projectExhibits,
  ...employers,
  ...milestones,
  powerwashing,
  ...hobbies,
];
export const campus: CampusStop[] = authoredCampus.map((stop) => ({
  ...stop,
  discoveryOnly: !["investment", "finance"].includes(stop.id) && ["Education", "Entrepreneurship", "Hobbies"].includes(stop.group),
  position: [
    stop.position[0] * CAMPUS_SPACING,
    stop.position[1] * CAMPUS_SPACING,
  ],
  entrance: [
    stop.position[0] * CAMPUS_SPACING + stop.entrance[0] - stop.position[0],
    stop.position[1] * CAMPUS_SPACING + stop.entrance[1] - stop.position[1],
  ],
}));
export const campusGroups: CampusGroup[] = [
  "About me",
  "Education",
  "Entrepreneurship",
  "Projects",
  "Experience",
  "Hobbies",
];
export const CAMPUS_BOUNDS = { x: 24 * CAMPUS_SPACING, z: 21 * CAMPUS_SPACING };
export const PLAYER_START: [number, number] = [0, 7 * CAMPUS_SPACING];

export type CampusPath = {
  from: [number, number];
  to: [number, number];
  width: number;
};
const s = CAMPUS_SPACING;
export const campusStartPath: CampusPath[] = [
  { from: [0, 8.3], to: [4.8, 8.3], width: 1.6 },
  { from: [4.8, 8.3], to: [4.8, 0], width: 1.6 },
  { from: [4.8, 0], to: [0, 0], width: 1.6 },
  { from: [0, 0], to: [0, -9.6], width: 1.6 },
  { from: [0, -9.6], to: [6.4, -9.6], width: 1.6 },
];
export const campusPaths: CampusPath[] = [
  ...campusStartPath,
  { from: [0, -19 * s], to: [0, 19 * s], width: 3.4 },
  { from: [-23 * s, -11 * s], to: [23 * s, -11 * s], width: 2.8 },
  { from: [-12 * s, -11 * s], to: [-12 * s, 19 * s], width: 2.6 },
  { from: [-23 * s, 6 * s], to: [22 * s, 6 * s], width: 2.8 },
  { from: [11 * s, -11 * s], to: [11 * s, 5.6], width: 2.6 },
  { from: [11 * s, 5.6], to: [21.6, 5.6], width: 1.6 },
  { from: [21.6, 5.6], to: [21.6, 9.6], width: 1.6 },
  { from: [11 * s, 9.6], to: [11 * s, 19 * s], width: 2.6 },
  ...campus
    .filter((stop) => stop.kind !== "about")
    .map((stop): CampusPath => ({
      from: stop.entrance,
      to:
        stop.visual === "office"
          ? [stop.entrance[0], -11 * s]
          : [
              stop.group === "Education" ? 0 : stop.group === "Projects" ||
              (stop.kind === "hobby" && stop.position[0] > 0)
                ? 11 * s
                : -12 * s,
              stop.entrance[1],
            ],
      width: 1.6,
    })),
];

export type CampusZone = {
  group: CampusGroup;
  color: string;
  polygon: [number, number][];
};
// Ground treatments define districts without moving destinations or closing the campus.
export const campusZones: CampusZone[] = [
  { group: "Education", color: "#89977d", polygon: [[2, -16.5], [14.8, -16.5], [14.8, 1.4], [2, 1.4]] },
  {
    group: "Experience",
    color: "#788b7c",
    polygon: [
      [-38, -34],
      [38, -34],
      [38, -20],
      [-28, -20],
      [-28, -12],
      [-38, -12],
    ],
  },
  {
    group: "Entrepreneurship",
    color: "#858767",
    polygon: [
      [-38, -10],
      [-28, -10],
      [-28, -17],
      [-5, -17],
      [-5, -7],
      [-5, 8.5],
      [-38, 8.5],
    ],
  },
  {
    group: "Projects",
    color: "#789781",
    polygon: [
      [7, 1.6],
      [26, 1.6],
      [26, 20],
      [7, 20],
    ],
  },
  {
    group: "Hobbies",
    color: "#526f53",
    polygon: [
      [-36, 10.8],
      [5, 10.8],
      [5, 31.5],
      [-36, 31.5],
    ],
  },
  {
    group: "Hobbies",
    color: "#526f53",
    polygon: [
      [26.7, -18],
      [35, -18],
      [35, 2],
      [26.7, 2],
    ],
  },
  {
    group: "Hobbies",
    color: "#526f53",
    polygon: [
      [24, 21],
      [33, 21],
      [33, 30],
      [24, 30],
    ],
  },
];

type GardenBorder = { position: [number, number]; size: [number, number] };
const borderRuns: [number, number, number, number][] = [
  [2.3, -16.3, 14.5, -16.3],
  [14.5, -16.3, 14.5, 1.2],
  [2.3, 1.2, 14.5, 1.2], // education green, split around school entrances
  [-37, -20.6, 37, -20.6], // rear street
  [-37, 6.8, -6, 6.8], // entrepreneurship lawn
  [-36, 12.8, 0, 12.8], // hobby garden entrance
  [7, 0, 7, 20],
  [26, 0, 26, 20],
  [7, 20, 26, 20], // project court
];
// Split borders around every crossing and landmark; no hedge covers an entrance.
export const campusGardenBorders: GardenBorder[] = borderRuns.flatMap(
  ([x1, z1, x2, z2]) => {
    const horizontal = z1 === z2;
    const length = Math.abs(x2 - x1) + Math.abs(z2 - z1);
    const sections: GardenBorder[] = [];
    let start: number | null = null;
    const flush = (end: number) => {
      if (start === null) return;
      const center = (start + end) / 2;
      sections.push({
        position: [
          x1 + (horizontal ? center : 0),
          z1 + (horizontal ? 0 : center),
        ],
        size: horizontal ? [end - start, 0.65] : [0.65, end - start],
      });
      start = null;
    };
    for (let step = 0; step < length; step++) {
      const x = x1 + (horizontal ? step + 0.5 : 0),
        z = z1 + (horizontal ? 0 : step + 0.5);
      const blocksPath = campusPaths.some(
        (path) =>
          x >= Math.min(path.from[0], path.to[0]) - path.width / 2 - 1 &&
          x <= Math.max(path.from[0], path.to[0]) + path.width / 2 + 1 &&
          z >= Math.min(path.from[1], path.to[1]) - path.width / 2 - 1 &&
          z <= Math.max(path.from[1], path.to[1]) + path.width / 2 + 1,
      );
      const blocksPlace = campus.some(
        (stop) =>
          Math.abs(x - stop.position[0]) <
            Math.max(stop.footprint[0] / 2, 2) + 1.2 &&
          Math.abs(z - stop.position[1]) <
            Math.max(stop.footprint[1] / 2, 2) + 1.2,
      );
      if (blocksPath || blocksPlace) flush(step);
      else if (start === null) start = step;
    }
    flush(length);
    return sections;
  },
);

/** Footprints include only solid landmarks; courts and the arrival plaza stay walkable. */
export function canWalk(x: number, z: number) {
  return (
    Math.abs(x) < CAMPUS_BOUNDS.x &&
    Math.abs(z) < CAMPUS_BOUNDS.z &&
    campusDistricts.every((sign) => {
      const dx = x - sign.position[0], dz = z - sign.position[2];
      const localX = dx * Math.cos(sign.rotation) - dz * Math.sin(sign.rotation);
      const localZ = dx * Math.sin(sign.rotation) + dz * Math.cos(sign.rotation);
      return Math.abs(localX) > sign.width / 2 + 0.35 || Math.abs(localZ) > 0.55;
    }) &&
    campusGardenBorders.every(
      (border) =>
        Math.abs(x - border.position[0]) > border.size[0] / 2 + 0.3 ||
        Math.abs(z - border.position[1]) > border.size[1] / 2 + 0.3,
    ) &&
    campus.every((stop) => {
      const [width, depth] = stop.footprint;
      const outsideFootprint =
        !width ||
        !depth ||
        Math.abs(x - stop.position[0]) > width / 2 + 0.3 ||
        Math.abs(z - stop.position[1]) > depth / 2 + 0.3;
      return (
        outsideFootprint &&
        (stop.obstacles ?? []).every(
          ({ offset, size }) =>
            Math.abs(x - stop.position[0] - offset[0]) > size[0] / 2 + 0.3 ||
            Math.abs(z - stop.position[1] - offset[1]) > size[1] / 2 + 0.3,
        )
      );
    })
  );
}
