# Build Plan — Portfolio

Source of truth: `design.md` (visual system) · `techstack.md` (stack + build order).
This file tracks state and open decisions. Update it as work lands.

## Status: step 3–5 shipped + verified in a browser — sketch 003 (Signature collage)

Last updated 2026-09-21. Clean-from-scratch state: `.next` wiped, `npm run build`
passes, `npm run lint` passes, `next dev` serving on **http://localhost:3000**.
Remaining work is step 7–8 (polish + ship) plus the cleanup backlog below.

**Landed:** `src/content/portfolio.ts` (all copy), `src/components/portfolio/*`
(top-bar, hero-bento, work-gallery, certificate-wall, contact, motion, mock-art),
`src/app/page.tsx`. Chosen variant: **003 Signature collage** — the signature
palette becomes the page grid, plus a `Bold / Calm` palette toggle that flips
surfaces into hairlines.

**Deviations from the sketch, on purpose**
- CTA corners are `{rounded.lg}` (12px), not the sketch's pill — design.md reserves
  `{rounded.pill}` for the pricing sub-system, which this site does not ship.
- The mock portrait + editor plate, work thumbnails and certificate sheets stay as
  inline SVG, kept verbatim from the sketch, still labelled "mock".
- The 3D (R3F) hero is **not** shipped: design 003 is a 2D collage and anime.js is
  the only motion owner. One `Canvas` can be added later without touching it.
- `sketches/003`'s `mCert()` was never defined (certs threw on load); `certArt()` in
  `mock-art.tsx` replaces it.

**Placeholders to replace:** `profile.github` in `src/content/portfolio.ts`, the
certificate sample data, and the mock portrait.

| Layer | Installed | As specified in techstack.md |
|---|---|---|
| Next.js | 16.3.5 | 16.3.5 ✅ |
| React / React DOM | 19.2.8 | 19.3.0 (patch drift, fine) |
| Tailwind CSS | v4 | 4.3.3 ✅ (CSS-first, no `tailwind.config.js`) |
| shadcn CLI | 4.21.0 | 4.21.0 ✅ |
| three | 0.186.0 | 0.186.0 ✅ |
| @react-three/fiber | 9.7.0 | 9.7.0 ✅ |
| @react-three/drei | 10.7.8 | 10.7.8 ✅ |
| anime.js | 4.5.0 | 4.5.0 ✅ |
| next-themes | 0.4.6 | (implied by theme toggle) |
| three / @react-three/fiber / drei | 0.186.0 / 9.7.0 / 10.7.8 | installed, **currently unused** (step 6 skipped) |

Local: Node v26.7.0, npm 11.19.0. `npm run build` passes clean.

**App lives in `src/app/`** (`--src-dir`), not `app/` at root — techstack.md's folder
layout predates that prompt answer. Same tree, one level down.

## Locked decisions

### Token mapping — shadcn slot ← design.md token

| shadcn var | design.md token | Value |
|---|---|---|
| `--background` / `--card` / `--popover` | `{colors.canvas}` | `#ffffff` |
| `--foreground` | `{colors.ink}` | `#181d26` |
| `--primary` | `{colors.primary}` | `#181d26` — **near-black, never `#1b61c9`** |
| `--secondary` | `{component.button-secondary}` | canvas + hairline outline |
| `--muted` / `--accent` | `{colors.surface-soft}` | `#f8fafc` |
| `--muted-foreground` | `{colors.muted}` | `#41454d` |
| `--border` / `--input` | `{colors.hairline}` | `#dddddd` |
| `--ring` | `{colors.info-border}` | `#458fff` |
| `--destructive` | *(none documented)* | `{colors.signature-coral}` `#aa2d00` — no invented hue |

Brand palette is exposed as static utilities: `bg-canvas`, `bg-surface-soft`,
`bg-surface-strong`, `bg-surface-dark`, `bg-surface-dark-elevated`, `border-hairline`,
`text-ink`, `text-body`, `text-ink-muted`, `border-border-strong`,
`bg-signature-{coral,forest,cream,peach,mint,yellow,mustard}`,
`text-link` / `text-link-active`, `text-info` / `border-info-border`,
`text-success` / `border-success-border`.

### Type + space

- Type roles are 1:1 with design.md's hierarchy table — `text-display-xl`,
  `text-display-lg`, `text-display-md`, `text-title-lg/md/sm`, `text-label-md`,
  `text-button`, `text-body-md`, `text-caption`, `text-legal`, plus the pricing
  trio. Each utility carries size + line-height + weight + tracking.
- ⚠️ `text-body` is a **color**. `text-body-md` is a **size**. Different keys.
- Font: **Inter** (variable) via `next/font/google`, exposed as `--font-inter`,
  aliased to `--font-sans` and `--font-display`. This is the substitute design.md
  documents for the licensed Haas Grotesk / Haas Groot Disp pair. Inter's wght axis
  covers the pricing sub-system's 475 / 575 mid-weights.
- Radii pinned exactly: `rounded-xs` 2px · `rounded-sm` 6px · `rounded-md` 10px ·
  `rounded-lg` 12px · `rounded-xl` 16px. `{rounded.pill}` / `{rounded.full}` →
  use `rounded-full`.
- `{spacing.section}` (96px) → `py-section`. Everything else maps to Tailwind's
  default 4px scale (`p-1`=4 … `p-24`=96) — no duplicate spacing tokens.
- Base layer sets `h1`/`h2`/`h3` and `a` so default markup already speaks the
  system. Display type never exceeds weight 500.

### 3D + motion boundaries (techstack.md, "Motion vs 3D")

One owner per element. anime.js owns DOM; R3F owns canvas. Never `useFrame` → DOM,
never anime timeline → mesh. One `Canvas` per page, `dpr={[1, 2]}`, `ssr: false`,
static fallback for `prefers-reduced-motion`.

## Decisions settled (were "open questions" before step 3)

1. **Pricing sub-system — not shipped.** No pricing page exists, so the
   Inter-Display-475 + pill dialect has no surface to live on. The tokens stay in
   `globals.css` unused; pill radii never appear in the UI.
2. **Dark mode — not shipped.** design.md is light-only, so the theme toggle was
   dropped in favour of sketch 003's **Bold / Calm palette** toggle, which switches
   signature surfaces against paper + hairlines instead of inventing a dark theme.
   ⚠️ The derived `.dark` block in `globals.css` is now dead code.
3. **3D hero — not shipped.** Variant 003 is a 2D collage; anime.js is the only
   motion owner. No `Canvas`, no mesh subject to choose.
4. **Contact form — not shipped.** Contact is `mailto:` + LinkedIn/GitHub links, so
   the `shadcn add form` gap and the submission-destination question are moot.
   Reopen only if a real inbox-backed form is wanted (server action + `useActionState`).
5. **Articles / blog section — not in scope.** `article-card`, `topic-filter-rail`
   and the rainbow-stripe hero stay extracted-but-unused.
6. **Projects — the three from the sketch**, each with a problem / approach /
   outcome case study opened inline in the strip (not a dialog).

## Build order

- [x] 1. Scaffold — `create-next-app`, demo page deleted, build passes
- [x] 2. Design tokens — palette + type + radii in `globals.css`, Inter wired
- [x] 3. Static shell — nav, hero (2D only), projects grid, experience, contact → **ship-able here**
- [x] 4. Content — real copy + 3 case studies, card → inline case-study strip
- [x] 5. anime.js pass — entrance timeline + scroll reveals, `prefers-reduced-motion` respected
- [ ] 6. R3F hero — **dropped for this variant**, not deferred (see Decisions settled #3)
- [ ] 7. Polish — Lighthouse ≥ 95, OG image, favicon, 404, `sitemap.ts`, per-route metadata
- [ ] 8. Ship — GitHub → GitHub Pages → LinkedIn. Workflow is in place and the static build is green; blocked on enabling Pages (Settings → Pages → Source: GitHub Actions), then custom domain + LinkedIn.

Steps 1–5 are done and verified in a real browser; 6 is a decision rather than a
deferral; 7–8 are the remaining work.

### Verified how (2026-09-21)

`npm run build` + `npm run lint` clean, then the page was driven in headless Edge
over the DevTools Protocol against `next dev` — probing computed styles/DOM and
capturing screenshots, in both motion modes. Three real defects came out of it:

1. **`prefers-reduced-motion: reduce` blanked the animation layer.** The motion
   pass returned early, so a reduced-motion machine got a fully static page.
   Now `reduce` downgrades to **fade-only** (no translate, no splitText, no scale,
   no height motion) — opacity still animates. Headless Chromium reports `reduce`
   by default, which is why the first round of checks missed it; emulate
   `prefers-reduced-motion: no-preference` in DevTools to see the full pass.
2. **Four signature tokens were tree-shaken out of the CSS.** Tailwind v4 drops
   unused `@theme` variables, and it cannot see a token name that only exists
   inside a runtime string — `style="--hue: var(--color-signature-*)"` +
   `bg-[var(--hue)]`. Peach / mint / yellow / mustard were missing, so those
   tiles rendered transparent. The palette block is now `@theme static`.
3. **The animated headline would have stayed invisible.** With `splitText` the
   words carry the tween, so the `h1` parent must be revealed first; without that
   extra `utils.set` the h1 stayed at the `data-hero` opacity of 0.

Also swapped project 03's surface from `{colors.surface-soft}` to `mint`: at
full-bleed its `calm` hue bar was white on white, and the work row now reads as
yellow / mustard / mint — the documented demo-grid surfaces.

## Cleanup backlog

- **Content placeholders** (owner: Jem) — `profile.github` is still
  `https://github.com/`, the certificate rows are sample data, and the portrait is
  a labelled mock illustration.
- **Dead code from skipped decisions** — the `.dark` block and the pricing trio in
  `globals.css`, plus the `three` / `@react-three/*` / `next-themes` dependencies.
  Delete together when step 6 is officially dropped rather than deferred.
- **Motion has no automated check.** It was verified by driving headless Edge over
  the DevTools Protocol (see below); there is no committed test. If the motion layer
  grows, add one CDP smoke script for `reduce` vs `no-preference`.
- **step 7** — OG image, favicon, 404, `sitemap.ts`, Lighthouse pass.

## Init gaps and deviations

- `shadcn add form` is a silent no-op in this registry (see Open Q4). `label` was
  added instead; `form` will need a hand-rolled wrapper or `react-hook-form`.
- `npx @google/design.md lint design.md` exits 0 with no output on this machine.
  It did **not** actually flag anything — don't treat a clean exit as validation.
  Two real dangling refs exist in design.md prose: `{colors.on-dark}` and
  `{colors.pricing-ink}` are used but never defined (`on-dark` = `{colors.on-primary}`
  `#ffffff`; `pricing-ink` = `{colors.ink}`).
- Next 16 ships its own docs at `node_modules/next/dist/docs/` and `AGENTS.md`
  instructs agents to read them before writing code. Next 16 breaking changes that
  matter here: Turbopack is the default bundler (custom `webpack` config fails the
  build), `params`/`searchParams` are async, `middleware.ts` → `proxy.ts`,
  caching is opt-in via `"use cache"`.
- `src/app/page.tsx` was a temporary token smoke test while the pipeline was
  verified; it is now the real page (step 3).
- **Console warning "Content Security Policy of your site blocks the use of `eval`"
  — not the app's CSP.** Verified 2026-09-21: the document response carries **no**
  `Content-Security-Policy` header, there is no CSP meta tag, and no CSP config in
  `src/` / `next.config.ts` / `proxy.ts`. The `eval(` calls live in Next's dev-only
  chunks (`turbopack-_*.js` HMR loader and React's dev callstack reconstruction,
  which states *"React will never use eval() in production mode"*); the production
  chunks contain **zero** `eval`. So it is injected by a browser extension or an
  enterprise policy. Impact: rendering and animation are unaffected; only dev HMR
  (Fast Refresh) degrades. If a CSP is ever shipped, allow `'unsafe-eval'` in dev only.
