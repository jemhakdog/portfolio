/*
 * Mock imagery. Every image on this page is an inline SVG drawing, not a
 * screenshot of real software — the "mock" labels in the captions are literal.
 * Kept as string templates because the art is static, trusted markup.
 */

import type { ArtName, Certificate } from "@/content/portfolio";

const rect = (x: number, y: number, w: number, h: number, rx: number, fill: string, opacity?: number) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"${opacity !== undefined ? ` opacity="${opacity}"` : ""}/>`;

const line = (x: number, y: number, w: number, h: number, fill: string, opacity?: number) =>
  rect(x, y, w, h, h / 2, fill, opacity);

const rows = (x: number, y: number, w: number, n: number, gap: number, h: number, fill: string, shrink = 0) => {
  let out = "";
  for (let i = 0; i < n; i++) out += line(x, y + i * gap, Math.max(22, w - i * shrink), h, fill);
  return out;
};

const chrome = (url: string, inner: string) =>
  `<svg class="shot" viewBox="0 0 400 300" role="img" aria-label="Mock image of ${url}">` +
  rect(0, 0, 400, 300, 0, "#ffffff") +
  rect(0, 0, 400, 26, 0, "#f8fafc") +
  `<circle cx="14" cy="13" r="3.6" fill="#e0e2e6"/><circle cx="26" cy="13" r="3.6" fill="#e0e2e6"/><circle cx="38" cy="13" r="3.6" fill="#e0e2e6"/>` +
  `<rect x="54" y="6" width="214" height="14" rx="7" fill="#ffffff" stroke="#dddddd"/>` +
  `<text x="63" y="16.5" font-family="ui-monospace,monospace" font-size="7.5" fill="#9297a0">${url}</text>` +
  `<g transform="translate(0,26)">${inner}</g></svg>`;

/** 01 · local-first flashcards */
const cards = (h: string) => {
  let grid = "";
  [[104, 78], [202, 78], [300, 78], [104, 168], [202, 168], [300, 168]].forEach(([x, y], i) => {
    grid +=
      rect(x, y, 90, 74, 8, "#f8fafc") +
      rect(x + 10, y + 12, 54, 7, 3.5, "#181d26") +
      rows(x + 10, y + 28, 68, 2, 11, 5, "#e0e2e6", 16) +
      rect(x + 10, y + 56, 28, 7, 3.5, h, i ? 0.4 : 1);
  });
  return chrome(
    "studystack.app/review",
    rect(0, 0, 86, 274, 0, "#f8fafc") +
      rect(14, 18, 50, 9, 4.5, "#181d26") +
      rows(14, 42, 52, 5, 20, 6, "#e0e2e6", 6) +
      rect(104, 20, 130, 12, 6, "#181d26") +
      line(104, 42, 150, 6, "#e0e2e6", 1) +
      rect(292, 16, 92, 22, 11, h) +
      `<text x="338" y="30.5" text-anchor="middle" font-family="ui-monospace,monospace" font-size="9" fill="#ffffff">24 due</text>` +
      rect(104, 60, 286, 5, 2.5, "#e0e2e6") +
      rect(104, 60, 168, 5, 2.5, h) +
      grid,
  );
};

/** 02 · a records desk */
const records = (h: string) => {
  let table = "";
  let form = "";
  for (let i = 0; i < 5; i++) {
    const y = 80 + i * 26;
    table +=
      line(16, y, 12, 6, "#e0e2e6") +
      line(40, y, 92, 6, "#dddddd") +
      line(144, y, 52, 6, "#e0e2e6") +
      rect(208, y - 2, 38, 10, 5, h, i ? 0.28 : 0.95);
  }
  for (let i = 0; i < 3; i++) {
    form +=
      rect(288, 46 + i * 26, 88, 16, 4, "#ffffff") +
      `<rect x="288" y="${46 + i * 26}" width="88" height="16" rx="4" fill="none" stroke="#dddddd"/>`;
  }
  return chrome(
    "barangay-records.local/residents",
    rect(16, 14, 130, 10, 5, "#181d26") +
      rect(296, 12, 88, 18, 9, h) +
      rect(16, 40, 214, 16, 8, "#f8fafc") +
      `<rect x="16" y="40" width="214" height="16" rx="8" fill="none" stroke="#dddddd"/>` +
      line(30, 46, 70, 5, "#c9ccd2") +
      `<circle cx="216" cy="48" r="4" fill="none" stroke="#c9ccd2"/>` +
      rect(16, 68, 246, 1, 0, "#dddddd") +
      table +
      rect(276, 14, 112, 214, 10, "#f8fafc") +
      rect(288, 28, 58, 7, 3.5, "#181d26") +
      form +
      rect(288, 150, 88, 20, 10, h),
  );
};

/** 03 · offline POS */
const pos = (h: string) => {
  let grid = "";
  for (let j = 0; j < 3; j++)
    for (let i = 0; i < 4; i++) {
      const x = 16 + i * 72;
      const y = 44 + j * 62;
      grid +=
        rect(x, y, 64, 52, 8, "#f8fafc") +
        line(x + 8, y + 10, 34, 5, "#dddddd") +
        rect(x + 8, y + 34, 26, 9, 4.5, h, 0.85);
    }
  return chrome(
    "sari-sari-pos.local/sale",
    rect(16, 14, 110, 10, 5, "#181d26") +
      grid +
      rect(312, 14, 80, 238, 10, "#f8fafc") +
      line(322, 30, 56, 6, "#181d26") +
      rows(322, 48, 56, 4, 26, 5, "#e0e2e6", 12) +
      rect(322, 168, 60, 20, 10, h) +
      line(322, 200, 44, 5, "#e0e2e6") +
      line(322, 214, 30, 5, "#e0e2e6"),
  );
};

/** hero · the editor these were written in */
const editor = () => {
  const c = { p: "#fcab79", g: "#5b616e", m: "#a8d8c4", y: "#f4d35e", c: "#f5e9d4" } as const;
  const code: [number, keyof typeof c][] = [
    [0, "p"], [1, "m"], [1, "g"], [0, "p"], [1, "g"], [1, "m"],
    [0, "p"], [1, "y"], [0, "g"], [1, "m"], [0, "g"], [0, "p"],
  ];
  let lines = "";
  code.forEach(([indent, tok], i) => {
    const y = 44 + i * 15;
    let x = 128 + indent * 13;
    for (const ch of tok.split("") as (keyof typeof c)[]) {
      const w = ch === "g" ? 46 : 28;
      lines += line(x, y, w, 5, c[ch]);
      x += w + 7;
    }
    lines += `<text x="104" y="${y + 4.5}" font-family="ui-monospace,monospace" font-size="6.5" fill="#4a4f5a">${i + 1}</text>`;
  });
  return (
    `<svg class="shot" viewBox="0 0 400 300" role="img" aria-label="Mock image of a code editor">` +
    rect(0, 0, 400, 300, 0, "#1d1f25") +
    rect(0, 0, 400, 24, 0, "#181d26") +
    `<circle cx="14" cy="12" r="3.6" fill="#4a4f5a"/><circle cx="26" cy="12" r="3.6" fill="#4a4f5a"/><circle cx="38" cy="12" r="3.6" fill="#4a4f5a"/>` +
    `<text x="56" y="15.5" font-family="ui-monospace,monospace" font-size="8" fill="#9297a0">portfolio/app.py</text>` +
    rect(0, 24, 96, 276, 0, "#181d26") +
    rect(12, 38, 40, 4, 2, "#9297a0") +
    rows(12, 56, 58, 5, 14, 4, "#4a4f5a", 8) +
    rect(12, 132, 58, 4, 2, "#fcab79") +
    rect(0, 232, 400, 1, 0, "#2a2e37") +
    `<text x="104" y="252" font-family="ui-monospace,monospace" font-size="8" fill="#a8d8c4">$ python app.py</text>` +
    `<text x="104" y="268" font-family="ui-monospace,monospace" font-size="8" fill="#9297a0">serving on 127.0.0.1:8000</text>` +
    `<text x="104" y="284" font-family="ui-monospace,monospace" font-size="8" fill="#f4d35e">2 tests passed</text>` +
    lines +
    `</svg>`
  );
};

/** an illustration of Jem — explicitly not a photograph */
const portrait = () =>
  `<svg class="shot" viewBox="0 0 300 380" role="img" aria-label="Mock portrait of Jem Carlo G. Austria — an illustration, not a real photograph">
    <defs><linearGradient id="mpBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfaf8"/><stop offset="1" stop-color="#e9e6df"/></linearGradient></defs>
    <rect x="0" y="0" width="300" height="380" fill="url(#mpBg)"/>
    <circle cx="150" cy="158" r="106" fill="#d9a441" opacity="0.22"/>
    <circle cx="88" cy="158" r="11" fill="#c98a5e"/><circle cx="212" cy="158" r="11" fill="#c98a5e"/>
    <path d="M38 380 C42 302 92 268 150 268 C208 268 258 302 262 380 Z" fill="#1b1f27"/>
    <path d="M126 268 L150 308 L174 268" fill="none" stroke="#d9a441" stroke-width="7" stroke-linecap="round"/>
    <path d="M132 224 h36 v46 a18 18 0 0 1 -36 0 Z" fill="#a86c44"/>
    <ellipse cx="150" cy="152" rx="62" ry="72" fill="#c98a5e"/>
    <path d="M86 148 C82 88 112 58 150 58 C188 58 218 88 214 148 C214 116 200 96 150 96 C100 96 86 116 86 148 Z" fill="#171a20"/>
    <path d="M110 132 h22" stroke="#171a20" stroke-width="5" stroke-linecap="round"/>
    <path d="M168 132 h22" stroke="#171a20" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="122" cy="152" rx="5.5" ry="6.5" fill="#2b2118"/><ellipse cx="178" cy="152" rx="5.5" ry="6.5" fill="#2b2118"/>
    <g fill="none" stroke="#242a33" stroke-width="4">
      <rect x="98" y="136" width="48" height="36" rx="13"/><rect x="154" y="136" width="48" height="36" rx="13"/>
      <path d="M146 152 h8"/><path d="M98 150 h-11"/><path d="M202 150 h11"/>
    </g>
    <path d="M150 160 v12 q0 6 6 7" fill="none" stroke="#a86c44" stroke-width="4" stroke-linecap="round"/>
    <path d="M131 192 q19 16 38 0" fill="none" stroke="#8d4a32" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="124" cy="178" rx="15" ry="9" fill="#ffffff" opacity="0.10"/>
    <rect x="0" y="314" width="300" height="66" fill="#101418" opacity="0.88"/>
    <text x="18" y="341" font-family="Inter,Segoe UI,sans-serif" font-size="15" font-weight="600" fill="#ffffff">Jem Carlo G. Austria</text>
    <text x="18" y="359" font-family="ui-monospace,monospace" font-size="10" fill="#c8ccd4">BS IT 2023–2026 · Pangasinan, PH</text>
    <rect x="12" y="12" width="86" height="20" rx="10" fill="#101418" opacity="0.8"/>
    <text x="55" y="26" text-anchor="middle" font-family="ui-monospace,monospace" font-size="8.5" letter-spacing="1.2" fill="#ffffff">MOCK PHOTO</text>
  </svg>`;

/** a certificate sheet — sample data, mock image */
export const certArt = (c: Certificate) =>
  `<svg class="shot" viewBox="0 0 400 300" role="img" aria-label="Mock certificate sheet for ${c.title}">
    ${rect(0, 0, 400, 300, 0, "#ffffff")}
    <rect x="22" y="22" width="356" height="256" rx="10" fill="#ffffff" stroke="#dddddd"/>
    ${rect(56, 52, 96, 8, 4, c.ink)}
    <text x="56" y="94" font-family="Inter,Segoe UI,sans-serif" font-size="18" font-weight="500" fill="#181d26">${c.title}</text>
    <text x="56" y="118" font-family="Inter,Segoe UI,sans-serif" font-size="11" fill="#41454d">awarded to Jem Carlo G. Austria</text>
    ${rect(56, 134, 288, 1, 0, "#dddddd")}
    <text x="56" y="158" font-family="ui-monospace,monospace" font-size="9" fill="#41454d">${c.issuer.toUpperCase()} · ${c.year}</text>
    <text x="56" y="176" font-family="ui-monospace,monospace" font-size="9" fill="#9297a0">${c.id}</text>
    ${rect(56, 216, 132, 1, 0, "#dddddd")}
    <text x="56" y="234" font-family="ui-monospace,monospace" font-size="8.5" fill="#9297a0">SIGNATURE</text>
    <circle cx="320" cy="218" r="28" fill="none" stroke="${c.ink}" stroke-width="2"/>
    <path d="M307 218 l9 9 l18 -21" fill="none" stroke="${c.ink}" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

const ACCENT: Record<ArtName, string> = {
  cards: "#aa2d00",
  records: "#0a2e0e",
  pos: "#d9a441",
};

const ART: Record<ArtName, string> = {
  cards: cards(ACCENT.cards),
  records: records(ACCENT.records),
  pos: pos(ACCENT.pos),
};

export function MockArt({ name, className }: { name: ArtName; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: ART[name] }} />;
}

export function CertificateArt({ cert, className }: { cert: Certificate; className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: certArt(cert) }} />;
}

export function EditorArt({ className }: { className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: editor() }} />;
}

export function PortraitArt({ className }: { className?: string }) {
  return <div className={className} dangerouslySetInnerHTML={{ __html: portrait() }} />;
}
