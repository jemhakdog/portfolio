"use client";

import { useState } from "react";

import { profile, topNav } from "@/content/portfolio";
import { toggleDark, togglePalette, useUIState } from "@/lib/ui-state";

/**
 * Sticky white bar. Theme and palette are read from lib/ui-state.ts, which owns
 * the `<html>` attributes; this component only renders the switches.
 */
export function TopBar() {
  const { calm, dark } = useUIState();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-hairline bg-canvas/92 backdrop-blur-md">
      <div className="mx-auto flex h-[62px] w-full max-w-[1280px] items-center justify-between gap-3 px-6 md:px-12">
        <a
          href="#"
          className="text-legal uppercase tracking-[0.9px] text-ink no-underline hover:no-underline"
        >
          {profile.mark}
        </a>
        <nav className="flex items-center gap-2 md:gap-4">
          <span className="hidden items-center gap-5 md:flex">
            {topNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-body-md font-medium text-ink-muted hover:text-ink hover:no-underline"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-body-md font-medium text-ink-muted hover:text-ink hover:no-underline"
            >
              GitHub
            </a>
          </span>

          <button
            type="button"
            onClick={togglePalette}
            aria-pressed={calm}
            className="flex min-h-[38px] cursor-pointer items-center gap-2 rounded-full border border-hairline bg-canvas py-1.5 pl-3 pr-1.5 text-[12px] font-semibold text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span className="hidden sm:inline">
              <b className="font-semibold text-ink">{calm ? "Calm" : "Bold"}</b>{" "}
              palette
            </span>
            <span className="sm:hidden font-semibold text-ink">
              {calm ? "Calm" : "Bold"}
            </span>
            <span
              aria-hidden
              className={`relative h-5 w-[38px] rounded-full transition-colors ${
                calm ? "bg-border-strong" : "bg-surface-strong"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 size-4 rounded-full bg-canvas transition-transform ${
                  calm ? "translate-x-[18px]" : ""
                }`}
              />
            </span>
          </button>

          <button
            type="button"
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className="flex size-[38px] cursor-pointer items-center justify-center rounded-full border border-hairline bg-canvas text-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {dark ? (
              <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileNavOpen((prev) => !prev)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex size-11 items-center justify-center rounded-lg text-ink md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <svg
              aria-hidden="true"
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileNavOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 12h16" />
                  <path d="M4 6h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile navigation drop-down */}
      {mobileNavOpen && (
        <div
          id="mobile-nav"
          className="border-b border-hairline bg-canvas px-6 py-4 shadow-lift md:hidden"
        >
          <div className="flex flex-col gap-3">
            {topNav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileNavOpen(false)}
                className="flex min-h-[44px] items-center text-title-sm font-medium text-ink hover:text-link hover:no-underline"
              >
                {item.label}
              </a>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileNavOpen(false)}
              className="flex min-h-[44px] items-center text-title-sm font-medium text-ink-muted hover:text-ink hover:no-underline"
            >
              GitHub <span aria-hidden="true" className="ml-1">↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
