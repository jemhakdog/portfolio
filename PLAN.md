# Build Plan — Portfolio

Source of truth: `design.md` (visual system) · `techstack.md` (stack + build order).
This file tracks state and open decisions. Update it as work lands.

## Status: scaffolded, ready to plan

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

## Open questions — answer these before step 3

1. **Does the pricing sub-system ship?** design.md documents a second dialect
   (Inter Display 475, pill buttons) that exists to signal *commercial precision*
   on a pricing page. A portfolio has no pricing page. Options: (a) drop the trio
   entirely, (b) keep the 475 weight for one "rates/availability" surface, (c) use
   it for a skills/tooling table. **Recommend (b) at most** — adopting it sitewide
   would erase the contrast that makes it a dialect.
2. **Does dark mode ship?** design.md is a light-only system; its dark surfaces are
   signature *cards* inside the light page. The `.dark` block in `globals.css` is
   derived from documented tokens only (no new hues) but is not in the source doc.
   Ship the toggle or delete the block?
3. **3D hero subject.** An icosahedron is the techstack.md placeholder, not a
   concept. What does the mesh represent (a wireframe of a project, an abstract
   knot, particles reacting to cursor)? Affects asset pipeline and perf budget.
4. **Contact form delivery.** shadcn's `form` component is **not in the
   `radix-nova` registry** — `shadcn add form` silently no-ops. Lazy path: server
   action + `useActionState` + `input`/`textarea`, no react-hook-form. Confirm.
   Where do submissions go — email API, Formspree, Supabase table?
5. **Articles/topic-filter components.** `article-card`, `topic-filter-rail`, and
   the rainbow-stripe hero are articles-page patterns. Is there a writing/blog
   section in scope, or are those extracted-but-unused?
6. **Content: 3 projects** — which three, and what's the case-study structure
   (problem → approach → stack → outcome)? Card → dialog per techstack.md.

## Build order

- [x] 1. Scaffold — `create-next-app`, demo page deleted, build passes
- [x] 2. Design tokens — palette + type + radii in `globals.css`, Inter wired
- [ ] 3. Static shell — nav, hero (2D only), projects grid, experience, contact → **ship-able here**
- [ ] 4. Content — real copy + 3 case studies, card → dialog detail
- [ ] 5. anime.js pass — entrance timeline + scroll reveals, `prefers-reduced-motion` respected
- [ ] 6. R3F hero — swap 2D visual for `Canvas`, keep static fallback
- [ ] 7. Polish — Lighthouse ≥ 95, OG image, favicon, 404, `sitemap.ts`, per-route metadata
- [ ] 8. Ship — GitHub → Vercel → custom domain → LinkedIn

Step 3 is the first real section work; steps 1–2 are done.

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
- `src/app/page.tsx` is currently a **temporary token smoke test** (palette + type
  roles) so the token pipeline is verifiable in the browser. Delete it in step 3.
