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
export type ArtName = "cards" | "records" | "pos" | "editor";

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
  pdfUrl?: string;
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
  count: 11,
  unit: "production & prototype systems shipped",
  note: "Consolidated platforms spanning municipal civic tools, AI gateways, offline systems, and academic capstones.",
} as const;

export const projects: Project[] = [
  {
    no: "01",
    kind: "Capstone Platform",
    name: "Mangatarem Cultural Map",
    blurb: "Interactive digital cultural map & local tourism information system.",
    meta: "React · Python · GIS · 2026",
    hue: "coral",
    art: "records",
    cs: {
      cap: "Case study · Capstone Platform",
      problem:
        "Local cultural landmarks and tourism registries lacked an accessible digital platform, making heritage data and travel information difficult for visitors and municipal officers to discover.",
      approach:
        "Designed comprehensive system architecture and relational schemas connecting geotagged landmarks, historical archives, and tourism submission workflows with interactive map layers.",
      outcome:
        "Served as capstone flagship project for Mangatarem, Pangasinan. Unified tourism data collection, municipal verification, and public engagement in one portal.",
      stats: [
        ["Role", "Lead Architect"],
        ["Domain", "GIS & Heritage"],
        ["Location", "Mangatarem, PH"],
      ],
    },
  },
  {
    no: "02",
    kind: "EdTech & Offline",
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
    no: "03",
    kind: "Internship & Tracking",
    name: "MapMyOJT & Placement Suite",
    blurb: "OJT opportunity mapping, supervisor appointments, and work logs.",
    meta: "Flask · Leaflet · Gemini AI · 2025",
    hue: "forest",
    art: "records",
    cs: {
      cap: "Case study · Placement Suite",
      problem:
        "Students struggled to discover accredited OJT partner companies, while coordinators managed appointments, company slot quotas, and paper work-logs manually across multiple sheets.",
      approach:
        "Unified student application portals and coordinator dashboards with an interactive geospatial map to locate verified employers, submit digital attendance logs, and generate career insights via Gemini AI.",
      outcome:
        "Streamlined end-to-end college internship lifecycle—from appointment booking and slot approval to real-time progress reviews and verified completion tracking.",
      stats: [
        ["Features", "Map + Logs + AI"],
        ["Audience", "College OJT"],
        ["Stack", "Flask & Maps"],
      ],
    },
  },
  {
    no: "04",
    kind: "AI Infrastructure",
    name: "Multi-Model AI Gateway & MCP",
    blurb: "OpenAI-compatible AI proxy with Playwright browser bridge and FastAPI MCP server.",
    meta: "FastAPI · Playwright · MCP · 2026",
    hue: "peach",
    art: "editor",
    cs: {
      cap: "Case study · AI Infrastructure",
      problem:
        "AI agents and client applications required a unified interface to coordinate across disparate providers (Gemini, Qwen, Z.ai) while generating backend system scaffolds automatically.",
      approach:
        "Engineered an OpenAI-compatible API gateway managing browser sessions via Playwright alongside an MCP toolchain implementing a strict Plan → Prompt → Write workflow for FastAPI/Supabase.",
      outcome:
        "Enabled seamless dynamic model switching, deep reasoning routing, bridge caching, and autonomous code generation workflows through standard AI agent protocols.",
      stats: [
        ["Protocol", "MCP & OpenAI API"],
        ["Engines", "Gemini / Qwen"],
        ["Automation", "Playwright"],
      ],
    },
  },
  {
    no: "05",
    kind: "AI Web Studio",
    name: "AI Learning & Media Studio",
    blurb: "Suite of AI-powered applications: image editor, language tutor, flashcards & quiz simulator.",
    meta: "React · TypeScript · Gemini API · 2026",
    hue: "mustard",
    art: "cards",
    cs: {
      cap: "Case study · AI Applications",
      problem:
        "Learners needed focused, interactive tools for image editing, conversational language retention, and automated study assessments without navigating complex standalone software.",
      approach:
        "Consolidated modular AI applications (ID_Genius, LingoLoop, FlashcardAI, ExamSimulatorAI) into a cohesive suite of typed React components powered by prompt-engineered Gemini API services.",
      outcome:
        "Delivered responsive study tools with instant dynamic card generation, simulated exams with instant feedback, conversational drills, and studio-grade image transformations.",
      stats: [
        ["Modules", "4 Integrated Tools"],
        ["Frontend", "React 19 & TS"],
        ["AI Service", "Gemini 2.5/Flash"],
      ],
    },
  },
  {
    no: "06",
    kind: "Civic Internal Tool",
    name: "Barangay Records",
    blurb: "Resident registry and certificate requests, replacing six notebooks.",
    meta: "Python · FastAPI · 2025",
    hue: "mint",
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
    no: "07",
    kind: "Offline POS & Hardware",
    name: "Sari-Sari POS",
    blurb: "Receipt printing and credit tracking on a ₱3k Android tablet.",
    meta: "Python · SQLite · 2025",
    hue: "cream",
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
  {
    no: "08",
    kind: "Hospitality Backend",
    name: "Hotel Management System",
    blurb: "Full operations backend for reservations, room inventory, housekeeping, and billing.",
    meta: "FastAPI · PostgreSQL · 2025",
    hue: "soft",
    art: "editor",
    cs: {
      cap: "Case study · Hospitality Backend",
      problem:
        "Hotel front desk operations suffered bottlenecks coordinating real-time room availability, guest check-in/out states, housekeeping logs, and reconciled billing statements.",
      approach:
        "Developed a robust FastAPI backend with role-based permissions, transactional booking endpoints, automated invoice and tax calculations, and status queues for room cleaning teams.",
      outcome:
        "Provided front desk staff and administrators with low-latency API services for instant room allocation, payment records, and operational audit reports.",
      stats: [
        ["Architecture", "Clean API"],
        ["Security", "Role-Based RBAC"],
        ["Core", "Billing & Booking"],
      ],
    },
  },
  {
    no: "09",
    kind: "Full-Stack Portal",
    name: "Enterprise Job Search Platform",
    blurb: "Recruitment portal with jobseeker profiles, employer management, and listing APIs.",
    meta: "Python · SQLite · JavaScript · 2025",
    hue: "coral",
    art: "records",
    cs: {
      cap: "Case study · Job Recruitment Platform",
      problem:
        "Job seekers and local employers lacked a unified board that bridged lightweight browser access with structured candidate management and local SQLite database fallbacks.",
      approach:
        "Combined backend listing services (jobs-backend) and responsive role-based frontend portals (job_search, jobportal-v3.1) supporting employer postings, resume screening, and applicant tracking.",
      outcome:
        "Delivered a complete recruitment ecosystem with separate employer, candidate, and administrative moderation panels, operational offline and online.",
      stats: [
        ["Modules", "API + Multi-Role Portal"],
        ["Database", "SQLite Fallback"],
        ["Stack", "Python / Web"],
      ],
    },
  },
  {
    no: "10",
    kind: "Machine Learning & CV",
    name: "Document Layout & DOCX Parser",
    blurb: "Deep learning document layout detection, OCR extraction, and DOCX reconstruction.",
    meta: "PyTorch · Transformers · YOLO · 2025",
    hue: "forest",
    art: "editor",
    cs: {
      cap: "Case study · Document AI",
      problem:
        "Digitizing complex document scans frequently destroys formatting, tables, columns, and embedded headers when converting scanned images back to editable documents.",
      approach:
        "Implemented YOLO-based bounding box detection for layout regions (paragraphs, tables, figures) paired with OCR pipelines and AST-based DOCX document rebuilding.",
      outcome:
        "Accurately reconstructed scanned papers and multi-column documents into structured Word (.docx) files preserving layout and typography fidelity.",
      stats: [
        ["Models", "YOLO + Transformers"],
        ["Pipeline", "OCR to DOCX"],
        ["Framework", "PyTorch"],
      ],
    },
  },
  {
    no: "11",
    kind: "Data Engineering",
    name: "Dorapac Data Intelligence",
    blurb: "Automated data harvesting, deduplication, image verification, and catalog dashboard.",
    meta: "Flask · Python ETL · 2025",
    hue: "mustard",
    art: "editor",
    cs: {
      cap: "Case study · Data Engineering",
      problem:
        "Aggregating large inventories from external catalogs led to corrupted image references, redundant entries, misclassified categories, and broken database schemas.",
      approach:
        "Built automated crawling scripts, image integrity validators, and fuzzy deduplication algorithms orchestrated through a Flask administrative monitoring dashboard.",
      outcome:
        "Cleaned, normalized, and validated thousands of catalog items with automated health checks, reducing catalog maintenance overhead to zero.",
      stats: [
        ["Pipeline", "Scrape & Dedupe"],
        ["Validation", "Image & Schema"],
        ["Interface", "Flask Admin"],
      ],
    },
  },
];

export const certificates: Certificate[] = [
  {
    title: "Developing Designs for a Logo",
    issuer: "TESDA",
    year: "2024",
    id: "7Da6onsA6G",
    hue: "cream",
    ink: "#aa2d00",
    pdfUrl: "/certs/Certificate_of_Completion.pdf",
  },
  {
    title: "Developing Designs for Print Media",
    issuer: "TESDA",
    year: "2024",
    id: "V3hqPakF2c",
    hue: "mint",
    ink: "#0a2e0e",
    pdfUrl: "/certs/Certificate_of_Completion_2.pdf",
  },
  {
    title: "Developing Designs for User Experience",
    issuer: "TESDA",
    year: "2024",
    id: "M5bHio68HY",
    hue: "peach",
    ink: "#d9a441",
    pdfUrl: "/certs/Certificate_of_Completion_3.pdf",
  },
  {
    title: "Developing Designs for User Interface",
    issuer: "TESDA",
    year: "2024",
    id: "mubr7yttk0",
    hue: "coral",
    ink: "#b83b14",
    pdfUrl: "/certs/Certificate_of_Completion_4.pdf",
  },
  {
    title: "Introduction to CSS",
    issuer: "TESDA",
    year: "2025",
    id: "xPMAVaQ1yg",
    hue: "yellow",
    ink: "#b58900",
    pdfUrl: "/certs/Certificate_of_Completion_5.pdf",
  },
  {
    title: "Introduction to Visual Graphic Design",
    issuer: "TESDA",
    year: "2024",
    id: "xuITMLrUxz",
    hue: "forest",
    ink: "#1b4d3e",
    pdfUrl: "/certs/Certificate_of_Completion_6.pdf",
  },
  {
    title: "Setting Up Computer Networks",
    issuer: "TESDA",
    year: "2025",
    id: "NWCAzGwmAa",
    hue: "mustard",
    ink: "#9b5e08",
    pdfUrl: "/certs/Certificate_of_Completion_7.pdf",
  },
  {
    title: "Installing and Configuring Computer Systems",
    issuer: "TESDA",
    year: "2025",
    id: "LtE5Q6sVhD",
    hue: "soft",
    ink: "#385072",
    pdfUrl: "/certs/Certificate_of_Completion_NEW.pdf",
  },
  {
    title: "Maintaining Computer Systems and Networks",
    issuer: "TESDA",
    year: "2025",
    id: "Eel2jcSO09",
    hue: "cream",
    ink: "#aa2d00",
    pdfUrl: "/certs/Certificate_of_Completion_NEW_2.pdf",
  },
  {
    title: "Setting Up Computer Servers",
    issuer: "TESDA",
    year: "2025",
    id: "Y9AnXMrarG",
    hue: "mint",
    ink: "#0a2e0e",
    pdfUrl: "/certs/Certificate_of_Completion_NEW_4.pdf",
  },
  {
    title: "Performing Solid Waste Management in the Workplace",
    issuer: "TESDA",
    year: "2024",
    id: "fjLGOpzjFF",
    hue: "forest",
    ink: "#1b4d3e",
    pdfUrl: "/certs/Certificate_of_Completion_new_3.pdf",
  },
  {
    title: "Designing Booth and Product/Window Display",
    issuer: "TESDA",
    year: "2024",
    id: "JV3NQtYyr3",
    hue: "peach",
    ink: "#d9a441",
    pdfUrl: "/certs/desingi%7Fbooth.pdf",
  },
  {
    title: "Blockchain is not just Crypto",
    issuer: "ICpEP",
    year: "2025",
    id: "icpep-blockchain-2025",
    hue: "yellow",
    ink: "#b58900",
    pdfUrl: "/certs/Jem%20Carlo%20Austria_Certificate%20of%20Participation_June%2014%2C%202025.pdf",
  },
  {
    title: "Formulating Competitive Marketing Strategies in the Digital Age",
    issuer: "ICpEP",
    year: "2025",
    id: "icpep-marketing-2025",
    hue: "coral",
    ink: "#b83b14",
    pdfUrl: "/certs/Jemcarlo%20Austria_Certificate%20of%20Participation_June%2028%2C%202025.pdf",
  },
  {
    title: "Formulating Competitive Marketing Strategies in the Digital Age (Session 2)",
    issuer: "ICpEP",
    year: "2025",
    id: "icpep-marketing-2025-2",
    hue: "mustard",
    ink: "#9b5e08",
    pdfUrl: "/certs/Jemcarlo%20Austria_Certificate%20of%20Participation_June%2028%2C%202025_2.pdf",
  },
  {
    title: "Next-Gen Tech Talks: IoT Applications and Data-Driven Governance",
    issuer: "ICpEP",
    year: "2025",
    id: "icpep-iot-2025",
    hue: "soft",
    ink: "#385072",
    pdfUrl: "/certs/Jemcarlo%20Austria_Certificate%20of%20Participation_August%202%2C%202025.pdf",
  },
  {
    title: "All About Cybersecurity",
    issuer: "We Learn Solutions by J&J",
    year: "2025",
    id: "WL-CYBER-00127",
    hue: "forest",
    ink: "#1b4d3e",
    pdfUrl: "/certs/PDFMailer10115026.pdf",
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
    "Shipped 11 full-stack & prototype systems — across civic records, AI tooling, GIS maps, and local POS systems.",
    "Built custom AI agents (n8n, MCP, Playwright) to automate planning, documentation, and model orchestration.",
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
    subtitle: "Jump to 11 shipped production & prototype systems",
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
    id: "guestbook",
    num: "05",
    label: "Guestbook",
    title: "Public Guestbook",
    subtitle: "Sign the visitor guestbook",
    icon: "✍️",
  },
  {
    id: "contact",
    num: "06",
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
   Guestbook — live entries are loaded from Supabase database.
   --------------------------------------------------------------------------- */
export type GuestbookEntry = {
  id: string;
  name: string;
  role: string;
  message: string;
  date: string;
  avatarColor: string;
};

export const guestbookEntries: GuestbookEntry[] = [];

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
