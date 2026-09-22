# Portfolio — Jem Carlo G. Austria

Personal site. Next.js 16 (App Router, Turbopack) + Tailwind v4, anime.js for
the DOM motion layer, R3F for one 3D card, a raw WebGL shader for the
background, and Web Audio for the UI sounds.

```bash
npm run dev       # http://localhost:3000
npm run build     # static export → ./out
npm start         # serves ./out (npm start -- -l 3111 for another port)
npm run lint
```

`npm run smoke` drives the built site in headless Edge/Chrome over CDP and
asserts the interactive layer — theme/palette/sound state, the command palette,
the case-study strip, the certificate dialog and the milestone runner. Run it
against a server that was started *after* the last build:

```bash
npm run build && npm start -- -l 3111   # one shell
npm run smoke                           # another
```

## Deploy

GitHub Pages, deployed by `.github/workflows/deploy.yml` on every push to
`master` (and on demand from the Actions tab). The workflow runs `npm ci`,
`npm run build` with `NEXT_PUBLIC_BASE_PATH=portfolio`, then uploads `out/`.

- Target URL: **https://jemhakdog.github.io/portfolio/** — a project site, so the
  build is served from a sub-path. `next.config.ts` turns
  `NEXT_PUBLIC_BASE_PATH` into `basePath` + `assetPrefix`; leave it unset locally
  and the site stays at `/`. On Windows shells the value is slash-less because
  MSYS rewrites `/portfolio` into a drive path.
- `next/image` does **not** prepend `basePath` to string `src` values, so every
  `public/` asset goes through `asset()` from `src/lib/asset.ts`.
- `images.unoptimized` and `output: "export"`: there is no Node server on Pages,
  so the optimizer and every dynamic feature (`route handlers`, `middleware`,
  ISR) are off-limits here. `npm start` serves `out/` through `serve`.
- One-time setup, required before the first successful deploy: **Settings →
  Pages → Source: GitHub Actions**. Until that is set, the workflow fails at
  `actions/configure-pages` (the build itself passes). Nothing else to configure;
  no `gh-pages` branch is involved.

## Layout

| Path | What lives there |
| --- | --- |
| `src/app/globals.css` | Every design token from `design.md`, plus the `calm` / `dark` variants |
| `src/content/portfolio.ts` | All page copy, the section list and every data table |
| `src/components/portfolio/` | One file per page section; `motion.tsx` owns every DOM animation |
| `src/lib/` | `audio-engine.ts` (synthesized SFX), `ui-state.ts` (theme / palette / sound), `asset.ts` (prepends `basePath` to `public/` assets) |
| `scripts/smoke.mjs` | Headless-browser check of the interactive layer (`npm run smoke`) |
| `.github/workflows/deploy.yml` | Static-export build + GitHub Pages deploy (see *Deploy*) |
| `CHANGELOG.md` | What each pass changed and why |
| `public/art/` | Mock screenshots: one static SVG per project, plus the code editor |
| `sketches/`, `design.md`, `techstack.md`, `PLAN.md` | Design source material; the code cites these |
