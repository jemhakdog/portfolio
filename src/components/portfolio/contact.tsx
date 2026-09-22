import { contact, profile } from "@/content/portfolio";
import { hueVar, HueBar } from "@/components/portfolio/hue";

const LINK_ROWS = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "LinkedIn", href: profile.linkedin, value: "/jemcarlo-austria" },
  { label: "GitHub", href: profile.github, value: "/jemcarlo" },
];

export function ContactBand() {
  return (
    <section
      id="contact"
      data-reveal-group
      className="mt-13 grid scroll-mt-[86px] grid-cols-1 gap-3.5 lg:grid-cols-12"
    >
      <article
        data-reveal-child
        className="flex flex-col justify-between gap-8 rounded-xl border border-transparent bg-surface-dark p-10 text-white lg:col-span-8 lg:min-h-[300px] calm:border-hairline"
      >
        <div>
          <span className="eyebrow text-white/80">Contact</span>
          <h2 className="mt-3.5 max-w-[22ch] text-display-lg text-white">
            {contact.headline}
          </h2>
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2.5 self-start rounded-lg bg-white px-6 py-3 text-button font-medium text-slate-950 no-underline hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {contact.cta} <span aria-hidden>→</span>
        </a>
      </article>

      <article
        data-reveal-child
        style={hueVar("cream")}
        className="relative flex flex-col justify-between gap-8 overflow-hidden rounded-xl border border-transparent bg-[var(--hue)] p-[30px] lg:col-span-4 calm:border-hairline calm:bg-canvas calm:text-ink"
      >
        <HueBar />
        <div>
          <span className="eyebrow text-ink/80 calm:text-ink-muted">Direct</span>
          <div className="mt-5 border-t border-ink/20">
            {LINK_ROWS.map((row) => (
              <a
                key={row.label}
                href={row.href}
                target={row.href.startsWith("http") ? "_blank" : undefined}
                rel={row.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex min-h-[44px] items-center justify-between gap-3 border-b border-ink/20 py-2.5 text-legal text-ink no-underline hover:no-underline hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {row.label} <span>{row.value}</span>
              </a>
            ))}
          </div>
        </div>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center self-start rounded-lg bg-ink px-6 py-3 text-button font-medium text-background no-underline hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Connect on LinkedIn
        </a>
      </article>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      data-reveal
      className="mt-16 border-t border-hairline pt-10 pb-12"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
        {/* Brand & positioning */}
        <div className="md:col-span-5">
          <span className="text-legal font-bold uppercase tracking-[1px] text-ink">
            {profile.mark}
          </span>
          <p className="mt-2.5 max-w-[34ch] text-body-md leading-[1.5] text-ink-muted">
            Junior developer building small software that works offline, on cheap
            hardware, in real barangays.
          </p>
          <div className="mt-3.5 flex items-center gap-2 text-[12px] text-ink-muted">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Based in {profile.location} · UTC+08</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="md:col-span-3">
          <span className="eyebrow text-ink-muted">Navigation</span>
          <ul className="mt-3.5 flex flex-col gap-2.5 text-body-md">
            <li>
              <a href="#work" className="text-ink-muted hover:text-ink no-underline">
                Selected Work
              </a>
            </li>
            <li>
              <a href="#certs" className="text-ink-muted hover:text-ink no-underline">
                Certificates
              </a>
            </li>
            <li>
              <a href="#contact" className="text-ink-muted hover:text-ink no-underline">
                Contact & Direct
              </a>
            </li>
            <li>
              <a href="#" className="text-ink-muted hover:text-ink no-underline">
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & Direct Links */}
        <div className="md:col-span-4">
          <span className="eyebrow text-ink-muted">Connect & Social</span>
          <ul className="mt-3.5 flex flex-col gap-2.5 text-body-md">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink no-underline"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink no-underline"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink no-underline"
              >
                Email ({profile.email}) <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-hairline/60 pt-6 text-legal text-ink-muted">
        <span>
          © {new Date().getFullYear()} {profile.mark}. All rights reserved.
        </span>
        <span>
          Built with Next.js 16 · Tailwind v4 · Three.js · anime.js
        </span>
      </div>
    </footer>
  );
}
