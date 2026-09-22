import Image from "next/image";

import {
  availability,
  currentlyBuilding,
  profile,
  record,
  toolbox,
} from "@/content/portfolio";
import { hueVar, HueBar } from "@/components/portfolio/hue";
import { EditorArt } from "@/components/portfolio/mock-art";
import Scene3D from "@/components/portfolio/scene-3d";

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
        <div className="flex flex-col-reverse justify-between gap-6 sm:flex-row sm:items-start">
          <div className="max-w-[36ch] flex-1">
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
          </div>
          <div className="relative size-[104px] sm:size-[136px] lg:size-[160px] flex-none overflow-hidden rounded-2xl lg:rounded-3xl border-2 border-canvas/40 shadow-lift calm:border-hairline">
            <Image
              src="/avatar.jpg"
              alt={profile.name}
              width={160}
              height={160}
              className="size-full object-cover"
              priority
            />
            <span
              aria-label="Available for work"
              title="Available for work"
              className="absolute right-2 bottom-2 sm:right-2.5 sm:bottom-2.5 size-3.5 sm:size-4 rounded-full bg-emerald-400 ring-2 sm:ring-[2.5px] ring-canvas"
            />
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
            className="text-legal underline underline-offset-3 text-canvas calm:text-link"
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
        className={`${TILE} lg:col-span-4 lg:min-h-[196px]`}
      >
        <HueBar />
        <span className="eyebrow text-ink/85 calm:text-ink-muted">Toolbox</span>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {toolbox.map((chip) => (
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
          <div className="relative h-[250px] w-full overflow-hidden rounded-[14px] border border-hairline/20 bg-surface-dark-elevated shadow-md lg:col-span-3">
            <Image
              src="/avatar.jpg"
              alt={profile.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3.5 pt-8 text-[12px] font-semibold text-white">
              {profile.mark}
              <span className="block text-[10px] font-normal text-white/70">
                Developer · Pangasinan, PH
              </span>
            </div>
          </div>
          <div className="h-[250px] w-full lg:col-span-4">
            <Scene3D />
          </div>
          <div className="h-[250px] w-full overflow-hidden rounded-[14px] border border-hairline/20 bg-surface-dark-elevated md:col-span-2 lg:col-span-5 [&_svg]:h-full [&_svg]:w-full [&_svg]:object-cover">
            <EditorArt />
          </div>
        </div>
        <figcaption className="mt-3.5 flex flex-col justify-between gap-2 text-[13px] font-semibold text-canvas sm:flex-row sm:items-center">
          <span>
            Fig. 01 — Jem Carlo, interactive WebGL 3D wireframe, and app.py running locally: one
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
