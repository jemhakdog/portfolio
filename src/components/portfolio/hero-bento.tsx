import {
  availability,
  currentlyBuilding,
  profile,
  record,
} from "@/content/portfolio";
import { hueVar, HueBar } from "@/components/portfolio/hue";
import { HeroTyping } from "@/components/portfolio/hero-typing";

/*
 * The bento IS the palette: each block owns one signature surface and carries
 * its own copy. Server component — anime.js only reads these nodes after mount.
 */

const TILE =
  "relative overflow-hidden rounded-xl border border-transparent p-[30px] bg-[var(--hue)] calm:bg-canvas calm:border-hairline calm:text-ink";

export function HeroBento() {
  return (
    <section className="grid grid-cols-1 gap-3.5 pt-4 lg:pt-5.5 lg:grid-cols-12">
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
        <div className="flex items-end justify-between gap-3">
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

          {/* Rotating Stamp inspired by HORMACHUELOS */}
          <div
            aria-hidden="true"
            className="hidden sm:flex size-16 flex-none items-center justify-center rounded-full border border-canvas/40 bg-canvas/10 text-center font-mono text-[9px] font-bold tracking-wider text-canvas uppercase shadow-xs transition-transform duration-700 hover:rotate-45 calm:border-hairline calm:bg-surface-soft calm:text-ink"
            style={{ animation: "spin-slow 16s linear infinite" }}
          >
            ★ OPEN ★<br />FOR WORK
          </div>
        </div>
      </article>

      <article
        data-hero
        data-hero-tile
        style={hueVar("cream")}
        className={`${TILE} flex flex-col justify-between gap-4 lg:col-span-4 lg:min-h-[196px]`}
      >
        <HueBar />
        <div>
          <span className="eyebrow text-ink/80 calm:text-ink-muted">
            Currently building
          </span>
          <h3 className="mt-2 text-title-lg text-ink">{currentlyBuilding.name}</h3>
          <p className="mt-2 text-body-md leading-[1.5] text-body">
            {currentlyBuilding.body}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {currentlyBuilding.chips.map((chip) => (
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

    </section>
  );
}
