# Portfolio — Jem Carlo G. Austria

Personal site. Next.js 16 (App Router, Turbopack) + Tailwind v4, anime.js for
the DOM motion layer, R3F for one 3D card, a raw WebGL shader for the
background, and Web Audio for the UI sounds.

```bash
npm run dev     # http://localhost:3000
npm run build
npm start
npm run lint
```

`npm run smoke` drives the built site in headless Edge/Chrome over CDP and
asserts the interactive layer — theme/palette/sound state, the command palette,
the case-study strip, the certificate dialog and the milestone runner. Run it
against a server that was started *after* the last build:

```bash
npm run build && npx next start -p 3111   # one shell
npm run smoke                             # another
```

## Layout

| Path | What lives there |
| --- | --- |
| `src/app/globals.css` | Every design token from `design.md`, plus the `calm` / `dark` variants |
| `src/content/portfolio.ts` | All page copy, the section list and every data table |
| `src/components/portfolio/` | One file per page section; `motion.tsx` owns every DOM animation |
| `src/lib/` | `audio-engine.ts` (synthesized SFX), `ui-state.ts` (theme / palette / sound) |
| `scripts/smoke.mjs` | Headless-browser check of the interactive layer (`npm run smoke`) |
| `CHANGELOG.md` | What the 2026-09-22 over-engineering pass removed and why |
| `public/art/` | Mock screenshots: one static SVG per project, plus the code editor |
| `sketches/`, `design.md`, `techstack.md`, `PLAN.md` | Design source material; the code cites these |
