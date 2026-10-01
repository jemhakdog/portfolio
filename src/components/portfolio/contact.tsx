"use client";

import { useState } from "react";
import { contact, profile, topNav } from "@/content/portfolio";
import { hueVar, HueBar } from "@/components/portfolio/hue";
import { sound } from "@/lib/audio-engine";

const LINK_ROWS = [
  { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
  { label: "Phone", href: `tel:+63${profile.phone.slice(1)}`, value: profile.phone },
  { label: "LinkedIn", href: profile.linkedin, value: "/jemcarlo-austria" },
  { label: "GitHub", href: profile.github, value: "/jemhakdog" },
];

export function ContactBand() {
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: senderEmail,
          message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to dispatch brief. Please try again.");
      }

      sound.playChime();
      setStatus("success");
      setName("");
      setSenderEmail("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Failed to submit contact brief:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to dispatch brief. Please try again or email directly."
      );
    }
  };

  return (
    <section
      id="contact"
      data-reveal-group
      className="mt-13 grid scroll-mt-[86px] grid-cols-1 gap-3.5 lg:grid-cols-12"
    >
      {/* Left side: Interactive message dispatch directly inspired by HORMACHUELOS */}
      <article
        data-reveal-child
        className="flex flex-col justify-between gap-6 rounded-xl border border-transparent bg-surface-dark p-7 sm:p-10 text-white lg:col-span-8 calm:border-hairline"
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-white/80">Contact</span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-300">
              ● Ready to build
            </span>
          </div>
          <h2 className="mt-3.5 max-w-[22ch] text-display-lg text-white">
            {contact.headline}
          </h2>
          <p className="mt-2 text-body-md text-white/70 max-w-[50ch]">
            Have an offline system, municipal platform, API integration, or data pipeline in mind? Send a direct brief below.
          </p>
        </div>

        {/* Quick Message Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="block font-mono text-[11px] font-semibold text-white/70 mb-1">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Juan Dela Cruz"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-white placeholder-white/40 focus:border-signature-coral focus:bg-white/10 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block font-mono text-[11px] font-semibold text-white/70 mb-1">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-white placeholder-white/40 focus:border-signature-coral focus:bg-white/10 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block font-mono text-[11px] font-semibold text-white/70 mb-1">
              What do you want to build?
            </label>
            <textarea
              id="contact-message"
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Offline-ready inventory, civic registration portal, Python automation..."
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 font-sans text-sm text-white placeholder-white/40 focus:border-signature-coral focus:bg-white/10 focus:outline-none transition-colors resize-none"
            />
          </div>

          {status === "error" && errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs text-rose-200"
            >
              <div className="font-semibold mb-0.5">Failed to dispatch brief</div>
              <div>{errorMessage}</div>
            </div>
          )}

          {status === "success" && (
            <div
              role="status"
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200 flex items-start justify-between gap-3"
            >
              <div>
                <div className="font-semibold text-emerald-300 mb-0.5">✓ Brief dispatched directly to Jem&apos;s inbox</div>
                <div>Thank you! I will review your project requirements and reply to your email shortly.</div>
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="shrink-0 text-[11px] underline text-emerald-300 hover:text-white cursor-pointer"
              >
                Send another
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg bg-white px-6 py-3 text-button font-semibold text-slate-950 no-underline hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring transition-all active:scale-[0.98] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <svg
                    className="size-4 animate-spin text-slate-950"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Sending brief...</span>
                </>
              ) : status === "success" ? (
                <>
                  <span>Brief Sent!</span>
                  <svg
                    aria-hidden="true"
                    className="size-4 shrink-0 fill-emerald-600 text-emerald-600"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <span>Send direct brief</span>
                  <svg
                    aria-hidden="true"
                    className="size-4 shrink-0 fill-amber-400 text-amber-400"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    />
                  </svg>
                </>
              )}
            </button>

            <span className="font-mono text-[11px] text-white/60">
              Direct to:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-white underline hover:text-white/80"
              >
                {profile.email}
              </a>
            </span>
          </div>
        </form>
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
          className="inline-flex items-center self-start rounded-lg bg-ink px-6 py-3 text-button font-medium text-canvas no-underline hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
          <ul className="mt-3.5 flex flex-col gap-1 text-body-md">
            {topNav.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex min-h-[44px] items-center text-ink-muted hover:text-ink no-underline py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {section.label}
                </a>
              </li>
            ))}
            <li>
              <a 
                href="#" 
                className="flex min-h-[44px] items-center text-ink-muted hover:text-ink no-underline py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media & Direct Links */}
        <div className="md:col-span-4">
          <span className="eyebrow text-ink-muted">Connect & Social</span>
          <ul className="mt-3.5 flex flex-col gap-1 text-body-md">
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-ink-muted hover:text-ink no-underline py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 text-ink-muted hover:text-ink no-underline py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-ink-muted hover:text-ink no-underline py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
