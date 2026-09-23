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

/** Art keys map to the mock screenshots in public/art/<key>.svg */
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
  email: "jemcarlo46@gmail.com",
  phone: "09538563123",
  linkedin: "https://www.linkedin.com/in/jemcarlo-austria-45bb77421/",
  github: "https://github.com/jemhakdog",
  location: "Mangatarem, Pangasinan, PH",
  credits: [
    { k: "Stack", v: "Python · React · Supabase" },
    { k: "Studying", v: "BS Information Technology 2024–present" },
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

export const resumeInfo = {
  pdfUrl: "/resume.pdf",
  downloadName: "Jem_Carlo_Austria_Resume.pdf",
  lastUpdated: "June 2026",
  headline: "Junior Full-Stack Developer · Pangasinan, PH",
  summary:
    "Motivated BSIT student with a strong foundation in backend development and web technologies — Python, FastAPI, Supabase, and SQLite. Led database design and system architecture for my capstone digital cultural map, and completed an internship at the Local Civil Registry. Eager to start my career and contribute as a junior developer.",
  education: {
    degree: "Bachelor of Science in Information Technology",
    school: "Binalatongan Community College",
    period: "2024 – Present",
    status: "BSIT Student",
    details: "Secondary: Mangatarem National High School (2022). Primary: Mangatarem I Central School (2016).",
  },
  skills: [
    { category: "Languages & Backend", items: ["Python", "FastAPI", "SQL", "HTML5", "CSS", "Bootstrap"] },
    { category: "Frameworks & Web", items: ["React", "Next.js (learning)", "Tailwind CSS"] },
    { category: "Databases & Data", items: ["Supabase", "SQLite", "MySQL", "Data management & record-keeping"] },
    { category: "Tools & Automation", items: ["Git / GitHub", "VSCode", "n8n (AI automation)"] },
  ],
  highlights: [
    "Led capstone: Interactive Digital Cultural Map & Local Tourism Information System — database design and system architecture.",
    "IT internship at the Local Government Unit (Feb 2026): data management and digital record-keeping for the Civil Registry.",
    "Shipped 3 real-world projects — StudyStack, Barangay Records, and Sari-Sari POS — deployed and serving local users.",
    "Built custom AI agents (n8n) to automate planning, documentation, and coding.",
  ],
} as const;

export const marqueeSkills = [
  "Python",
  "FastAPI",
  "React 19",
  "Next.js 16",
  "TypeScript",
  "PostgreSQL",
  "SQLite",
  "Supabase",
  "Tailwind CSS v4",
  "Three.js",
  "IndexedDB",
  "Offline-First",
  "PWA",
  "Bluetooth ESC/POS",
  "Git & GitHub",
  "Linux",
  "REST APIs",
  "Vercel",
  "Render",
] as const;

/* ---------------------------------------------------------------------------
   Sections — the page's own table of contents. TopBar, StickyProfilePane,
   CommandPalette and SiteFooter all derive from this instead of each keeping
   their own copy of the same six ids.
   --------------------------------------------------------------------------- */
export type Section = {
  id: string;
  num: string;
  label: string;
  /** Command-palette wording, which is longer than the nav wording. */
  title: string;
  subtitle: string;
  icon: string;
  /** Shown in the top bar and footer as well as the rail. */
  topBar?: boolean;
};

export const sections: Section[] = [
  {
    id: "work",
    num: "01",
    label: "Selected Work",
    title: "Selected Work & Projects",
    subtitle: "Jump to 3 shipped real-world projects",
    icon: "💼",
    topBar: true,
  },
  {
    id: "journey",
    num: "02",
    label: "Career Journey",
    title: "Career Milestones & Journey",
    subtitle: "Scroll to 2024–2026 timeline",
    icon: "🗺️",
  },
  {
    id: "certs",
    num: "03",
    label: "Certifications",
    title: "Certificates",
    subtitle: "Three verifiable online certificates",
    icon: "🏅",
    topBar: true,
  },
  {
    id: "resume",
    num: "04",
    label: "Resume",
    title: "Curriculum Vitae / Resume",
    subtitle: "Interactive preview and download verified PDF resume",
    icon: "📄",
    topBar: true,
  },
  {
    id: "lab",
    num: "05",
    label: "The Lab & Archive",
    title: "The Lab & Version Archive",
    subtitle: "Explore interactive prototypes & design history",
    icon: "🧪",
  },
  {
    id: "guestbook",
    num: "06",
    label: "Guestbook",
    title: "Public Guestbook",
    subtitle: "Sign the visitor guestbook",
    icon: "✍️",
  },
  {
    id: "contact",
    num: "07",
    label: "Contact",
    title: "Contact Information",
    subtitle: "Direct email and professional profiles",
    icon: "📬",
    topBar: true,
  },
];

/** The subset the top bar and footer show. */
export const topNav = sections.filter((section) => section.topBar);

/* ---------------------------------------------------------------------------
   The Journey — scroll-driven milestone runner.
   --------------------------------------------------------------------------- */
export type Milestone = {
  year: string;
  role: string;
  title: string;
  desc: string;
  tags: string[];
  icon: string;
};

export const milestones: Milestone[] = [
  {
    year: "2024",
    role: "Foundations",
    title: "Enrolled in BS Information Technology",
    desc: "Started my degree at Binalatongan Community College and earned the freeCodeCamp Responsive Web Design certification. Experimented with IndexedDB, service workers, and offline client-side state that doesn't need a constant connection.",
    tags: ["Python", "React", "IndexedDB", "PWA"],
    icon: "🌱",
  },
  {
    year: "2025",
    role: "Real-World Deployments",
    title: "Shipped Barangay Records & Sari-Sari POS",
    desc: "Built and deployed internal software for local organizations in Pangasinan. Replaced six paper notebooks with a FastAPI search system and built a Bluetooth-enabled POS on an affordable Android tablet.",
    tags: ["FastAPI", "SQLite", "Bluetooth ESC/POS", "Render"],
    icon: "🚀",
  },
  {
    year: "2026",
    role: "On the Job",
    title: "IT Intern, Local Government Unit",
    desc: "Data management at the Local Civil Registry — encoding important records like marriage certificates and keeping the office's digital files organized and accurate.",
    tags: ["Data Management", "Record-Keeping", "Python"],
    icon: "🏛️",
  },
  {
    year: "2026",
    role: "Capstone & Ready for Hire",
    title: "Digital Cultural Map & StudyStack",
    desc: "Led database design and system architecture for an Interactive Digital Cultural Map & Local Tourism Information System capstone, and shipped StudyStack. Ready to contribute to a remote engineering team.",
    tags: ["React", "Supabase", "Capstone", "Remote Ready"],
    icon: "🎯",
  },
];

/* ---------------------------------------------------------------------------
   The Lab — the site's own architecture changelog.
   --------------------------------------------------------------------------- */
export type SiteVersion = {
  version: string;
  codename: string;
  year: string;
  theme: string;
  desc: string;
  highlights: string[];
  status: "Archived" | "Current";
};

export const siteVersions: SiteVersion[] = [
  {
    version: "v3.0",
    codename: "Signature Collage",
    year: "2026",
    theme: "Philippine Terracotta & Reactive Bento",
    desc: "The current architectural evolution. Integrates dual-pane layout, tactile spring physics, R3F 3D workstation, and Web Audio API feedback.",
    highlights: ["React 19 & Next 16", "Three.js / WebGL", "Web Audio API", "Cmd+K Palette"],
    status: "Current",
  },
  {
    version: "v2.0",
    codename: "Console Split",
    year: "2026 (Early)",
    theme: "Terminal Workbench & Index Rail",
    desc: "Fixed 280px navigation rail with real-time table filtering, high information density, and breadcrumb-driven workspace for engineering recruiters.",
    highlights: ["Split layout", "Keyboard filters (1-4)", "Monospace telemetry"],
    status: "Archived",
  },
  {
    version: "v1.0",
    codename: "Editorial Ledger",
    year: "2025",
    theme: "Monochrome Broadside & Paper Tabulation",
    desc: "Minimalist publication style inspired by vintage technical documents. Focused on legibility, strict typographic hierarchies, and zero JavaScript dependencies.",
    highlights: ["Editorial typography", "Paper texture grid", "Zero build bloat"],
    status: "Archived",
  },
];

/* ---------------------------------------------------------------------------
   Guestbook — the three seeded notes. Visitors can only add to these.
   --------------------------------------------------------------------------- */
export type GuestbookEntry = {
  id: string;
  name: string;
  role: string;
  message: string;
  date: string;
  avatarColor: string;
};

export const guestbookEntries: GuestbookEntry[] = [
  {
    id: "g-1",
    name: "Teresa Morales",
    role: "Local Sari-Sari Store Owner, Mangatarem",
    message:
      "Kuya Jem, the Bluetooth POS app on our tablet hasn't lost a single credit record or crashed once in six months. Maraming salamat!",
    date: "Aug 2025",
    avatarColor: "bg-emerald-600",
  },
  {
    id: "g-2",
    name: "Mark Villanueva",
    role: "BS IT Classmate & StudyStack User",
    message:
      "Being able to review reviewer flashcards on the long bus commute with zero signal saved our finals grade. The offline sync is magic.",
    date: "Dec 2025",
    avatarColor: "bg-amber-600",
  },
  {
    id: "g-3",
    name: "Danilo Santos",
    role: "Barangay Admin Staff",
    message:
      "Issuing clearances used to take 15 minutes of paging through handwritten books. With Jem's system, we print in 90 seconds. Solid software!",
    date: "Jan 2026",
    avatarColor: "bg-blue-600",
  },
];

/** `[command, what it prints]` — rendered as the terminal's `help` grid. */
export const terminalHelp: [string, string][] = [
  ["about", "Developer ethos & location"],
  ["projects / ls", "Shipped real-world apps"],
  ["skills", "Core technical stack"],
  ["cat resume", "Education & experience"],
  ["contact", "Email & LinkedIn links"],
  ["sudo hire", "Technical recruiter fast-track"],
  ["clear", "Clear screen"],
  ["exit", "Close terminal drawer"],
];
