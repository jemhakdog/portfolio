import Image from "next/image";

import { asset } from "@/lib/asset";
import {
  availability,
  currentlyBuilding,
  profile,
  record,
} from "@/content/portfolio";
import { hueVar, HueBar } from "@/components/portfolio/hue";
import Scene3D from "@/components/portfolio/scene-3d";
import { HeroTyping } from "@/components/portfolio/hero-typing";

/*
 * The bento IS the palette: each block owns one signature surface and carries
 * its own copy. Server component — anime.js only reads these nodes after mount.
 */

const TILE =
  "relative overflow-hidden rounded-xl border border-transparent p-[30px] bg-[var(--hue)] calm:bg-canvas calm:border-hairline calm:text-ink";

export function HeroBento() {
  return (
    <section className="grid grid-cols-1 gap-3.5 pt-5.5 lg:grid-cols-12">
      <article
        data-hero
        style={hueVar("coral")}
        className={`${TILE} js-hero-lead flex flex-col justify-between gap-8 text-canvas lg:col-span-8 lg:min-h-[340px]`}
      >
        <HueBar />
        <div className="flex flex-col justify-between gap-6">
          <div className="max-w-[46ch]">
            <span
              data-hero
              className="eyebrow js-hero-eyebrow text-canvas/85 calm:text-ink-muted"
            >
              {profile.role}
            </span>
            <h1
              data-hero
              className="js-hero-title mt-3 text-display-xl tracking-[-0.015em] text-canvas calm:text-ink"
            >
              {profile.headline}
            </h1>
            {/* Live Typing Animation */}
            <div className="mt-4 pt-3 border-t border-canvas/20 calm:border-hairline">
              <HeroTyping />
            </div>
          </div>
        </div>
        <dl className="js-hero-cred flex flex-wrap gap-x-[26px] gap-y-4">
          {profile.credits.map((credit) => (
            <div key={credit.k} data-hero className="max-w-[22ch]">
              <dt className="eyebrow text-canvas/80 calm:text-ink-muted">
                {credit.k}
              </dt>
              <dd className="mt-1.5 text-body-md font-medium text-canvas calm:text-ink">
                {credit.v}
              </dd>
            </div>
          ))}
        </dl>
      </article>

      <article
        data-hero
        data-hero-tile
        style={hueVar("forest")}
        className={`${TILE} flex flex-col justify-between gap-8 text-canvas lg:col-span-4 lg:min-h-[340px]`}
      >
        <HueBar />
        <div>
          <span className="eyebrow text-canvas/80 calm:text-ink-muted">
            Availability
          </span>
          <h2 className="mt-3.5 text-display-md text-canvas calm:text-ink">
            {availability.headline}
          </h2>
          <p className="mt-3.5 max-w-[34ch] text-body-md leading-[1.5] text-canvas/82 calm:text-body">
            {availability.body}
          </p>
        </div>
        <div>
          <div className="mb-3.5 flex items-center gap-2.5">
            <span aria-hidden className="relative size-2 rounded-full bg-canvas calm:bg-success">
              <span className="absolute inset-[-5px] animate-live-pulse rounded-full bg-canvas/25 calm:bg-success/22" />
            </span>
            <span className="text-legal text-canvas calm:text-ink">
              {availability.reply}
            </span>
          </div>
          <a
            className="text-legal underline underline-offset-3 text-background text-canvas calm:text-link"
            href={`mailto:${profile.email}`}
          >
            {profile.email} →
          </a>
        </div>
      </article>

      <article
        data-hero
        data-hero-tile
        style={hueVar("cream")}
        className={`${TILE} flex flex-col justify-between gap-6 lg:col-span-4 lg:min-h-[196px]`}
      >
        <HueBar />
        <span className="eyebrow text-ink/80 calm:text-ink-muted">
          Currently building
        </span>
        <div>
          <h3 className="text-title-lg text-ink">{currentlyBuilding.name}</h3>
          <p className="mt-2 text-body-md leading-[1.5] text-body">
            {currentlyBuilding.body}
          </p>
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {currentlyBuilding.chips.map((chip) => (
              <span
                key={chip}
                className="chip calm:border-hairline calm:bg-surface-soft"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </article>

      <article
        data-hero
        data-hero-tile
        style={hueVar("peach")}
        className={`${TILE} flex flex-col justify-between gap-4 lg:col-span-4 lg:min-h-[196px]`}
      >
        <HueBar />
        <div>
          <span className="eyebrow text-ink/85 calm:text-ink-muted">Specialty</span>
          <h3 className="mt-2 text-title-md font-bold text-ink">Offline & Hardware</h3>
          <p className="mt-1.5 text-body-md leading-[1.4] text-body">
            Local-first software engineered for intermittent signal and thermal receipt printers.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["IndexedDB", "Supabase Sync", "ESC/POS", "PWA"].map((chip) => (
            <span
              key={chip}
              className="chip calm:border-hairline calm:bg-surface-soft"
            >
              {chip}
            </span>
          ))}
        </div>
      </article>

      <article
        data-hero
        data-hero-tile
        style={hueVar("mint")}
        className={`${TILE} lg:col-span-4 lg:min-h-[196px]`}
      >
        <HueBar />
        <span className="eyebrow text-ink/85 calm:text-ink-muted">Record</span>
        <div className="mt-4 flex items-baseline gap-2">
          <span
            data-count={record.count}
            className="text-[44px] leading-none font-medium tracking-[-0.02em] text-ink tabular-nums"
          >
            {record.count}
          </span>
          <span className="text-body-md font-medium text-ink-muted">
            {record.unit}
          </span>
        </div>
        <p className="mt-3.5 max-w-[34ch] text-body-md leading-[1.5] text-body">
          {record.note}
        </p>
      </article>

      <figure
        data-hero
        className="js-hero-fig rounded-[20px] bg-surface-dark p-[26px] lg:col-span-12"
      >
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex h-[250px] w-full flex-col justify-between rounded-[14px] border border-hairline/20 bg-surface-dark-elevated p-4 font-mono text-[11px] shadow-md lg:col-span-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYSTEM // LIVE
              </span>
              <span className="text-white/40">v1.2.0</span>
            </div>
            <div className="space-y-2 text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">Runtime:</span>
                <span className="text-white">Python 3.12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Database:</span>
                <span className="text-white">SQLite + WAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Offline sync:</span>
                <span className="text-emerald-300">IndexedDB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Target HW:</span>
                <span className="text-white">₱3k Tablet</span>
              </div>
            </div>
            <div className="rounded border border-white/10 bg-black/40 px-2.5 py-1.5 text-[10px] text-white/60">
              $ ping localhost:8000 → 0.4ms
            </div>
          </div>
          <div className="h-[250px] w-full lg:col-span-4">
            <Scene3D />
          </div>
          <div className="h-[250px] w-full overflow-hidden rounded-[14px] border border-hairline/20 bg-surface-dark-elevated md:col-span-2 lg:col-span-5">
            <Image
              src={asset("/art/editor.svg")}
              alt="Mock image of a code editor running app.py"
              width={400}
              height={300}
              className="size-full object-cover"
            />
          </div>
        </div>
        <figcaption className="mt-3.5 flex flex-col justify-between gap-2 text-[13px] font-semibold text-canvas sm:flex-row sm:items-center">
          <span>
            Fig. 01 — System telemetry, interactive WebGL 3D wireframe, and app.py running locally: one
            Python service, SQLite on disk, no build step.
          </span>
          <span className="flex-none tracking-[1.1px] uppercase opacity-70">
            Developer Studio
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
