# Portfolio Tech Stack

**Project:** Personal portfolio site
**Location:** `C:\Users\jemcarlo\Desktop\projects\portfolio`
**Updated:** 2026-09-21
**Author:** Jem Carlo G. Austria

---

## TL;DR

| Layer | Tool | Version (2026-09-21) | Job it does |
|---|---|---|---|
| Framework | **Next.js** | 16.3.5 | Routing, rendering, SEO, API routes, deploy |
| UI kit | **shadcn/ui** | CLI 4.21.0 | Accessible components copied into the repo |
| Styling | **Tailwind CSS** | 4.3.3 | Utility CSS + design tokens |
| 3D / WebGL | **React Three Fiber** | 9.7.0 | Declarative three.js scene on the hero |
| 3D helpers | **@react-three/drei** | 10.7.8 | Prebuilt controls, loaders, materials |
| 3D engine | **three** | 0.186.0 | The actual WebGL renderer under R3F |
| Motion (DOM) | **anime.js** | 4.5.0 | Timelines, text splits, SVG, scroll reveals |
| Runtime | React / React DOM | 19.3.0 | Component model |
| Deploy | Vercel | — | Zero-config Next.js hosting |

Local environment check: Node **v22.23.2**, npm **10.9.8**, git **2.54.0** — all meet requirements (Next 16 needs Node ≥ 20.9).

---

## How the layers stack

```
┌──────────────────────────────────────────────────────┐
│  Next.js 16 (App Router, Turbopack, React 19.2)      │  ← shell, routing, SEO, data
├──────────────────────────────────────────────────────┤
│  shadcn/ui  +  Tailwind v4 tokens                    │  ← layout, cards, forms, buttons
├──────────────────────────────────────────────────────┤
│  anime.js  (timelines on DOM + SVG + text)           │  ← entrance/hover/scroll motion
├──────────────────────────────────────────────────────┤
│  React Three Fiber  →  drei  →  three.js             │  ← isolated 3D sections only
└──────────────────────────────────────────────────────┘
```

Rule of thumb: **Next.js renders it, shadcn shapes it, anime.js moves it, R3F makes one section 3D.**
Don't tangle the last two — see "Motion vs 3D" below.

---

## 1. Next.js 16 — the shell

**Why:** file-based routing, React Server Components, metadata API for SEO, API routes for the contact form, deploys to Vercel with no config.

**What's new in 16 that changes how I write code:**

| Change | What it means for me |
|---|---|
| Turbopack is the default bundler | No `--turbopack` flag. Custom `webpack` config now **fails the build** |
| Cache Components + `"use cache"` | Caching is explicit opt-in; everything is dynamic by default |
| `params` / `searchParams` are **async** | `const { slug } = await params` — non-negotiable in 16 |
| `middleware.ts` → **`proxy.ts`** | Better named for the network boundary |
| React 19.2 inside | View Transitions, `useEffectEvent()`, `<Activity/>` |
| Node ≥ 20.9 | Already satisfied locally |

**Scaffold:**

```bash
cd ~/Desktop/projects && npx create-next-app@latest portfolio
# prompts: TypeScript yes · ESLint yes · Tailwind yes · src/ dir yes · App Router yes · Turbopack yes · import alias @/*
```

**Conventions I'll keep:**
- App Router only. No `pages/`.
- Server Components by default; add `"use client"` only to the leaf that needs it.
- Route segments: `app/page.tsx`, `app/projects/page.tsx`, `app/projects/[slug]/page.tsx`.
- Data: hardcoded `content/` files first. Supabase later if the projects list needs a CMS.
- Metadata in each route's `export const metadata` or `generateMetadata()`.

---

## 2. shadcn/ui — components I own

**Why:** it is *not* a dependency. The CLI copies real component source into `components/ui/`, so I can edit it, read it, and learn from it — which beats a black-box library for a portfolio I have to explain in interviews.

**Setup (inside the project):**

```bash
npx shadcn@latest init -t next
npx shadcn@latest add button card badge dialog form input textarea sonner dropdown-menu separator sheet tabs
```

You can also build a themed preset at `shadcn/create` and run `npx shadcn@latest init --preset [CODE] --template next`.

**What lands in the repo:**
- `components/ui/*.tsx` — the components
- `lib/utils.ts` — the `cn()` class merger
- `components.json` — CLI config (style, aliases, icon set)
- design tokens injected into `app/globals.css`

**Planned component usage:**

| Section | Components |
|---|---|
| Nav | `navigation-menu` or custom + `sheet` (mobile) |
| Hero | `button`, `badge` |
| Projects | `card`, `badge`, `dialog` (case-study modal) |
| Experience / timeline | `card`, `separator` |
| Contact | `form` + `input` + `textarea` + `sonner` for toasts |
| Theme toggle | `dropdown-menu` + `next-themes` |

**Gotchas:**
- Import from `@/components/ui/card`, never from a package name.
- The 3D canvas stays **out** of shadcn components — keep it a sibling section, not a child, so Radix portals and the R3F render loop don't fight.
- Tailwind v4 is CSS-first: tokens live in `globals.css` under `@theme`, not in a `tailwind.config.js`.

---

## 3. React Three Fiber — the 3D hero

**Why:** exactly one section (the hero) gets a WebGL scene. That's the "wow" that makes a dev portfolio memorable without turning the whole site into a video game.

**Install:**

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

**Three required steps in Next.js — all three, or it breaks:**

1. **Transpile `three`** — `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
};

export default nextConfig;
```

2. **`"use client"` on the Canvas component** — three.js touches browser APIs at import time.

3. **Load it dynamically with SSR off**, from the Server Component page:

```tsx
// app/page.tsx  (Server Component — no "use client")
import dynamic from "next/dynamic";
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <div className="h-[60vh]" />,
});

export default function Home() {
  return (
    <main>
      <HeroScene />
    </main>
  );
}
```

```tsx
// components/three/hero-scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.6} />
      <Environment preset="city" />
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.4, 4]} />
          <meshStandardMaterial color="#7c3aed" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
```

**Performance rules I'll hold to:**
- `dpr={[1, 2]}` cap — never render at 3x on phones.
- One `Canvas` per page. Two canvases = two WebGL contexts = jank.
- Animate inside `useFrame`, never with `setState` in a render loop.
- GLTF models: compress with Draco/Meshopt, keep them in `public/models/`, load with drei's `useGLTF`.
- Every scene needs a **static fallback** (a poster image or plain gradient) for `prefers-reduced-motion` and low-end devices.

**drei pieces worth knowing:** `OrbitControls`, `Environment`, `Float`, `Text`, `Html`, `useGLTF`, `useTexture`, `MeshTransmissionMaterial`, `AdaptiveDpr`.

---

## 4. anime.js v4 — DOM motion

**Why:** the animation work here is timeline-shaped: a hero headline that splits into words, staggered project cards, scroll-triggered reveals. anime.js v4 does that with a tiny footprint and doesn't require React to re-render.

**Install:**

```bash
npm install animejs
```

**v4 API — this is a rewrite, old v3 tutorials are wrong:**

```ts
import {
  animate,          // single animation
  createTimeline,   // sequenced animation
  stagger,          // offset across many targets
  splitText,        // split text into lines/words/chars
  createAnimatable, // per-property animate handle (mouse-follow etc.)
  createScope,      // scoped selectors + cleanup for React
  utils, easings,
} from "animejs";
```

**Example — headline split + staggered entrance, scoped to a component:**

```tsx
"use client";

import { useEffect } from "react";
import { createScope, createTimeline, splitText, stagger } from "animejs";

export default function PageIntro() {
  useEffect(() => {
    const scope = createScope({
      root: document.querySelector("#intro") as HTMLElement,
    }).add(() => {
      const { words } = splitText("#intro h1", { words: true });
      const tl = createTimeline({ defaults: { ease: "out(3)", duration: 700 } });
      tl.add(words, { opacity: [0, 1], y: [24, 0], delay: stagger(70) })
        .add("#intro p", { opacity: [0, 1], y: [16, 0] }, "-=400")
        .add(".card", { opacity: [0, 1], y: [32, 0], delay: stagger(90) }, "-=300");
    });

    return () => scope.revert(); // REQUIRED in React, or StrictMode double-runs leave ghosts
  }, []);

  return (
    <section id="intro">
      <h1>Hi, I'm Jem Carlo</h1>
      <p>Junior developer — Python, React, Supabase.</p>
    </section>
  );
}
```

**Non-obvious things that will bite me:**
- `scope.revert()` in the effect cleanup is not optional — React 19 StrictMode mounts twice in dev.
- Set the CSS **initial state** (`opacity-0 translate-y-6` in Tailwind) on the element so there's no flash before JS runs.
- Build scoped animation in a client component and let Server Components render the markup; anime.js only ever touches the DOM after mount.
- `waapi.animate()` from `animejs` is the 3KB alternative when a `<WAAPIAnimation>`-style tween is enough — cheaper for simple hover/fade.
- Subpath imports (`animejs/timeline`, `animejs/text`) keep the bundle down if tree-shaking is weak.

---

## Motion vs 3D — which tool for what

| Effect | Use |
|---|---|
| Page-load headline, card stagger, SVG line draw, counters | **anime.js** |
| Scroll-position-driven reveal | anime.js + IntersectionObserver (or anime's scroll watchers) |
| Hover/focus micro-interactions, modal open, layout shift | **anime.js** or CSS transitions |
| Camera move, mesh morph, particles, shader effect | **React Three Fiber** |
| Route transition | Next 16 View Transitions first; anime.js only if it's not enough |

Do not animate DOM elements from inside `useFrame`, and do not drive a 3D mesh with an anime.js timeline. One owner per element.

---

## Build order

1. **Scaffold** — `create-next-app`, delete the demo page, confirm `npm run dev` on `localhost:3000`.
2. **Design tokens** — `shadcn init`, pick a preset, set the palette + fonts in `globals.css`.
3. **Static shell** — nav, hero (2D text only), projects grid, experience, contact. Ship-able at this point.
4. **Content** — write the real copy and 3 project case studies. Card → dialog detail view.
5. **anime.js pass** — entrance timeline + scroll reveals. Respect `prefers-reduced-motion`.
6. **R3F hero** — swap the 2D hero visual for the Canvas, keep the static fallback.
7. **Polish** — Lighthouse ≥ 95, OG image, favicon, 404, `sitemap.ts`, metadata per route.
8. **Ship** — push to GitHub, import to Vercel, custom domain, then link it from LinkedIn.

---

## Folder layout

```
portfolio/
├─ app/
│  ├─ layout.tsx            # fonts, metadata, <html> shell
│  ├─ page.tsx              # home — Server Component
│  ├─ projects/[slug]/page.tsx
│  ├─ globals.css           # Tailwind v4 tokens live here
│  └─ sitemap.ts
├─ components/
│  ├─ ui/                   # shadcn — generated, editable
│  ├─ sections/             # hero, projects, experience, contact
│  └─ three/                # "use client" Canvas components only
├─ content/                 # projects.ts, experience.ts — typed data
├─ lib/utils.ts
├─ public/{models,images}
├─ components.json
└─ next.config.ts           # transpilePackages: ["three"]
```

---

## Pre-ship checklist

- [ ] `npm run build` clean — no TypeScript errors, no webpack config left behind
- [ ] `"use client"` only where required; Server Components stay the default
- [ ] Canvas loads dynamically with `ssr: false` and has a static fallback
- [ ] All anime.js effects revert on unmount; `prefers-reduced-motion` respected
- [ ] Mobile: one column, no horizontal scroll, 3D hero degrades gracefully
- [ ] Lighthouse mobile ≥ 95 performance, ≥ 95 accessibility
- [ ] Real projects, real links, real contact method — no Lorem ipsum, no broken `#` hrefs
- [ ] OG image + title/description per route
- [ ] README explains the stack and what I built myself
- [ ] Deployed on Vercel and the live URL is on LinkedIn

---

## Reference

- Next.js 16 — https://nextjs.org/docs
- shadcn/ui — https://ui.shadcn.com/docs
- Tailwind v4 — https://tailwindcss.com/docs
- React Three Fiber — https://r3f.docs.pmnd.rs
- drei — https://github.com/pmndrs/drei
- anime.js v4 — https://animejs.com/documentation
