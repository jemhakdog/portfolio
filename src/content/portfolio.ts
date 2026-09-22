/*
 * All page copy lives here so the sections stay markup-only.
 * Content is taken verbatim from sketches/003-signature-collage.
 */

export type Hue =
  | "coral"
  | "forest"
  | "cream"
  | "peach"
  | "mint"
  | "yellow"
  | "mustard"
  | "soft";

/** Art keys map to the inline SVG mockups in components/portfolio/mock-art.tsx */
export type ArtName = "cards" | "records" | "pos";

export type CaseStudy = {
  cap: string;
  problem: string;
  approach: string;
  outcome: string;
  stats: [string, string][];
};

export type Project = {
  no: string;
  kind: string;
  name: string;
  blurb: string;
  meta: string;
  hue: Hue;
  art: ArtName;
  cs: CaseStudy;
};

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  id: string;
  hue: Hue;
  /** signature-palette hex, used to draw the mock sheet */
  ink: string;
};

export const profile = {
  name: "Jem Carlo G. Austria",
  mark: "Jem Carlo G. Austria",
  role: "Junior developer · Pangasinan, PH",
  headline:
    "I build small software that works offline, on cheap hardware, in real barangays.",
  email: "zani31349@gmail.com",
  linkedin: "https://linkedin.com/in/jemcarlo-austria-45bb77421/",
  /* TODO: replace with your GitHub profile URL */
  github: "https://github.com/",
  location: "Mangatarem, Pangasinan, PH",
  credits: [
    { k: "Stack", v: "Python · React · Supabase" },
    { k: "Studying", v: "BS Information Technology 2023–2026" },
    { k: "Ships to", v: "Vercel · Render" },
  ],
} as const;

export const availability = {
  headline: "Open to remote work — starting now.",
  body: "UTC+08, so I overlap EU afternoons and US mornings. Happy on a team that reviews code and writes things down.",
  reply: "Replying within a day",
} as const;

export const currentlyBuilding = {
  name: "StudyStack",
  body: "An offline-first reviewer for our BS IT coursework. IndexedDB locally, Supabase sync when there's signal.",
  chips: ["React", "PWA", "Supabase"],
} as const;

export const toolbox = [
  "Python",
  "FastAPI",
  "SQL / Postgres",
  "React 19",
  "Next.js",
  "Tailwind",
  "Supabase",
  "Git / GitHub",
  "Vercel",
] as const;

export const record = {
  count: 3,
  unit: "projects shipped, all with a live URL",
  note: "Plus freelance work for local businesses since 2025. Three online certificates, all verifiable.",
} as const;

export const projects: Project[] = [
  {
    no: "01",
    kind: "Web app",
    name: "StudyStack",
    blurb: "Offline-first spaced-repetition reviewer for BS IT coursework.",
    meta: "React · Supabase · 2026",
    hue: "yellow",
    art: "cards",
    cs: {
      cap: "Case study · Web app",
      problem:
        "Classmates studied from screenshots and group-chat photos. Nothing was searchable, and nothing survived the bus ride home with no signal.",
      approach:
        "A local-first card store in IndexedDB, synced to Supabase whenever a connection exists. Spaced-repetition intervals are computed on the client, so the app never blocks on the network.",
      outcome:
        "Works fully offline after the first load. Conflicts resolve last-write-wins per card. Deployed on Vercel and used by my review group.",
      stats: [
        ["Hard part", "Offline sync"],
        ["Users", "~40"],
        ["Deploy", "Vercel"],
      ],
    },
  },
  {
    no: "02",
    kind: "Internal tool",
    name: "Barangay Records",
    blurb: "Resident registry and certificate requests, replacing six notebooks.",
    meta: "Python · FastAPI · 2025",
    hue: "mustard",
    art: "records",
    cs: {
      cap: "Case study · Internal tool",
      problem:
        "Records lived in six notebooks. Issuing a barangay clearance meant reading handwriting and re-copying details by hand — slow and easy to get wrong.",
      approach:
        "Typed resident records with search-as-you-type, then a request workflow that fills certificate templates from stored fields and produces a printable PDF.",
      outcome:
        "Certificate issuance dropped from roughly 15 minutes to under two. Built as school work, then rebuilt as a deployable service with role-based staff access.",
      stats: [
        ["Hard part", "Legacy data entry"],
        ["Users", "4 staff"],
        ["Deploy", "Render"],
      ],
    },
  },
  {
    no: "03",
    kind: "Desktop tool",
    name: "Sari-Sari POS",
    blurb: "Receipt printing and credit tracking on a ₱3k Android tablet.",
    meta: "Python · SQLite · 2025",
    hue: "mint",
    art: "pos",
    cs: {
      cap: "Case study · Desktop tool",
      problem:
        "A neighbourhood store tracked credit in a notebook, so balances were guessed at and often lost. Existing POS apps assumed a desktop and a fast connection.",
      approach:
        "One SQLite file, a touch grid of products, and Bluetooth ESC/POS printing. Customer credit is tracked per person with a running ledger.",
      outcome:
        "Runs on a low-end Android tablet, prints paper receipts and needs no internet. The database backs up to a shared drive nightly.",
      stats: [
        ["Hard type", "Bluetooth on Android"],
        ["Pilot", "1 store"],
        ["Needs", "No internet"],
      ],
    },
  },
];

export const certificates: Certificate[] = [
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2024",
    id: "fcc-rwd-2024-8842",
    hue: "cream",
    ink: "#aa2d00",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2025",
    id: "cisco-cyber-2025-3310",
    hue: "mint",
    ink: "#0a2e0e",
  },
  {
    title: "Python (Basic) Certificate",
    issuer: "HackerRank",
    year: "2025",
    id: "hr-py-2025-7719",
    hue: "peach",
    ink: "#d9a441",
  },
];

export const contact = {
  headline:
    "Looking for a remote junior role where the work is real software.",
  cta: "Send an email",
} as const;
