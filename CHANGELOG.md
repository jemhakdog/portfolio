# Changelog

## 2026-09-22 — over-engineering pass

A repo-wide audit (ponytail-audit) of the whole tree rather than a diff, then the
findings implemented. It removes code that was never reachable, collapses state
that was written in three places, and moves every table of copy into
`content/portfolio.ts`. Nothing was meant to change how the site looks — the four
copy deltas and the milestone runner's position are the only visible effects, and
both are listed below.

Scope: over-engineering and complexity only. Bugs and behaviour are called out
where they were deliberately left alone.

### Result at a glance

| | Before | After |
| --- | --- | --- |
| `src` files | 38 | 25 |
| `src` lines | 5,480 | 4,047 |
| Runtime dependencies | 15 | 8 |
| Vendored CSS imported | +629 lines (`shadcn/tailwind.css`) | 0 |
| Config files | `next.config.ts`, `components.json` | 0 |
| Committed assets | 632 KB of unused files | 0 |
| Automated checks | none | `npm run smoke` (24 assertions) |

`package.json` deps removed: `radix-ui`, `class-variance-authority`,
`next-themes`, `sonner`, `lucide-react`, `cn`, `shadcn`.
`npm install` pruned 304 packages and 4,882 lines from `package-lock.json`.

### Finding by finding

| # | Finding | Action |
| --- | --- | --- |
| 1 | 12 unused `components/ui/*.tsx` (1,022 lines) | Removed; nothing outside the folder imported them |
| 2 | `@import "shadcn/tailwind.css"` | Removed; its variants/utilities had no consumers left |
| 3 | 7 unused dependencies | Removed from `package.json` |
| 4 | `src/lib/utils.ts` (1-line re-export) | Removed |
| 5 | Shell cursor glow + duplicate `pointermove` | Removed; `fluid-background.tsx` already tracks the pointer |
| 6 | Shell `isDark` + `MutationObserver` on `<html>` | Removed; it existed only to read the glow's own state |
| 7 | `MagneticButton` (43 lines) | Removed; never rendered |
| 8 | `PortraitArt` / `portrait()` (28 lines) | Removed; never rendered |
| 9 | `console.warn` monkeypatch in `scene-3d` | **Kept** — see *Retracted findings* |
| 10 | `openterminal` listener | Removed; dispatched nowhere |
| 11 | `avatar_orig.jpg`, `probe-v1-*.png.html` | Removed; unreferenced |
| 12 | `next.config.ts` | Removed; verified the build passes without it |
| 13 | `scene-3d` lite mode + localStorage flag | Removed; a whole second render path nobody enabled |
| 14 | `useSyncExternalStore` mount probe | **Kept** — see *Retracted findings* |
| 15 | Dead `useMemo` in `command-palette` | Removed; deps were fresh callbacks every render |
| 16 | `opencommandpalette` window event | Replaced with an `onOpen` prop |
| 17 | Theme/palette state in three places | Replaced with `src/lib/ui-state.ts` |
| 18 | Section list written four times | One `sections` + `topNav` in `content/portfolio.ts` |
| 19 | `profile.credits` re-hardcoded in the sticky pane | Now `.map(profile.credits)` |
| 20 | Four near-identical Web Audio effects | One private `blip()`, four one-liners |
| 21 | `activeStep` state; runner pinned to `420px` | Derived from progress; runner positioned off its track |
| 22 | `mock-art.tsx` SVG string templates | 4 static SVGs in `public/art/` + `next/image` |
| 23 | Page copy scattered across components | Moved to `content/portfolio.ts` |
| 24 | 265-line raw WebGL background | **Kept** — see *Retracted findings* |
| 25 | Stale `README.md`, contradictory comment | README rewritten; comment corrected |

### Added

- `src/lib/ui-state.ts` — one `useSyncExternalStore` store for dark theme,
  bold/calm palette and UI sound. Reads `localStorage`/`matchMedia` in
  `initUIState()`, which the shell runs from a mount effect, so the server render
  and first client render agree. `dark` is still persisted as `theme`; `calm` is
  still session-only, as before.
- `public/art/{cards,records,pos,editor}.svg` — the project mock screenshots and
  the editor figure, moved out of string templates. Emitted by running the
  original builders, so the geometry is byte-identical apart from the unused
  `class="shot"` on the root element. Served as-is (`next/image` leaves `.svg`
  unoptimized), so they are plain `<img src="/art/*.svg">`.
- `scripts/smoke.mjs` + `npm run smoke` — drives the **built** site in headless
  Edge/Chrome over CDP. Usage is in the README.

### Changed

- `globals.css` — dropped the dead shadcn semantic slots (`--color-card`,
  `--color-popover`, `--color-primary`, `--color-secondary`, `--color-muted`,
  `--color-accent`, `--color-destructive`, `--color-input`, `--color-chart-*`,
  `--color-info*`, `--color-link-active`, `--color-primary-active`, `--radius`).
  What survives is what the remaining markup actually uses: `--color-background`,
  `--color-border`, `--color-ring`. The `--radius-*` scale stayed — it overrides
  Tailwind's defaults, so removing it would have changed every `rounded-lg/xl`.
- `audio-engine.ts` — 154 → 109 lines, and it no longer dispatches `soundtoggle`;
  `ui-state.ts` mirrors `isEnabled()` instead.
- `motion.tsx` — the palette animation moved out of the `createScope` block and
  now keys off `calm` from the store instead of a `palettechange` event.
- `milestone-runner.tsx` — the runner lives inside a wrapper spanning exactly the
  progress track, so it positions with percentages of its own container instead
  of the previous hardcoded `scrollProgress * 420px`.
- `certificate-wall.tsx` — the credential sheet is a small local `CertSheet` JSX
  component (was a string template fed to `dangerouslySetInnerHTML`).
- `hero-bento.tsx`, `work-gallery.tsx` — mock art via `next/image`, not
  `dangerouslySetInnerHTML`.
- `top-bar.tsx`, `telemetry-bar.tsx`, `command-palette.tsx`,
  `portfolio-shell.tsx`, `sticky-profile-pane.tsx`, `contact.tsx`,
  `lab-archive.tsx`, `guestbook.tsx`, `terminal-drawer.tsx` — read the store, and
  take their lists and tables from `content/portfolio.ts`.
- `content/portfolio.ts` — gained `sections`, `topNav`, `milestones`,
  `siteVersions`, `guestbookEntries`, `terminalHelp` and their types. The header
  comment about "all page copy lives here" is now true.
- `README.md` — was still create-next-app boilerplate (it claimed a Geist font
  the project does not load). Now documents the real stack, layout and checks.

### Retracted findings

Three audit findings were wrong once tested; each is recorded here so nobody
re-applies them:

- **#9 — the `console.warn` filter had to stay.** Removing it makes the smoke
  test fail on `THREE.Clock: This module has been deprecated. Please use
  THREE.Timer instead.` R3F 9.7 still constructs one, so this is an upstream
  warning the app cannot fix. Restored at module scope (the `Clock` is built while
  the `Canvas` mounts, which is too early for a parent effect), narrowed to that
  one message and marked `ponytail:` with the deletion condition.
- **#14 — `next/dynamic` with `ssr: false` is not available here.** The component
  is rendered by a server component, and the repo's ESLint config enables React
  19's `react-hooks/set-state-in-effect`, which rejects the `useState` +
  `useEffect` alternative. The original `useSyncExternalStore` probe was already
  the idiomatic form; it is back, with a comment saying why.
- **#24 — R3F for a single fullscreen quad is not smaller.** It would drag the
  three.js scene graph and renderer into the background layer to save ~70 lines of
  bootstrap. The raw WebGL shader stayed. What was fixed is the duplication it was
  really about: it is now the page's only pointer tracker.

### Deliberately not changed

- `guestbook.tsx` still reads `localStorage` inside a `useState` initialiser, so a
  visitor with saved signatures hydrates a different list than the server sent.
  Pre-existing, out of scope for a complexity pass. The clean fix (load in an
  effect) trips `react-hooks/set-state-in-effect`, so it needs a considered
  decision, not a drive-by.
- `sound.playKeypress()` still fires on every key in the terminal, including
  modifiers and backspace.
- The `Offline Sync Simulator` in `lab-archive.tsx` is still seeded fake data.
- `sketches/`, `design.md`, `techstack.md` and `PLAN.md` are kept: the code cites
  them as its design source. Only the two `probe-v1-*.png.html` scratch files were
  deleted.

### Copy deltas

Unavoidable side effects of single-sourcing. Everything else is verbatim.

| Where | Before | After |
| --- | --- | --- |
| Top bar nav | Work / Certificates / Contact | Selected Work / Certifications / Contact |
| Footer nav | Contact & Direct | Contact |
| Sticky pane labels | Stack / Studying / Ships To | profile.credits: Stack / Studying / Ships to |
| Sticky pane values | BS IT 2023–2026 | BS Information Technology 2023–2026 |

### Verification

```
npx tsc --noEmit      clean
npx eslint .          clean
npx next build        4/4 pages generated
npm run smoke         24/24 checks, 3 consecutive runs
```

The smoke run covers: hydration, the three design tokens the base layer still
depends on, the hue-bar sweep measured frame-by-frame, theme persistence across a
reload, OS colour-scheme fallback, `prefers-reduced-motion` keeping the bar
without the sweep, the sound toggle, Ctrl+K + filtering + Escape, the terminal and
its help table, the case-study strip, the native `<dialog>`, the milestone runner,
and a console that stays free of errors and warnings.

Two caveats worth remembering: the smoke test only ever saw headless Edge, and
nobody has looked at the three palettes with human eyes since the CSS token trim.
The safest visual sanity check is a pass over light/dark in both bold and calm.
