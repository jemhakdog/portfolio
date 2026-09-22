"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { profile, sections } from "@/content/portfolio";
import { asset } from "@/lib/asset";
import { sound } from "@/lib/audio-engine";

export function StickyProfilePane({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [activeSection, setActiveSection] = useState<string>("work");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="lg:sticky lg:top-14 lg:flex lg:h-[calc(100vh-3.5rem)] lg:w-[420px] lg:flex-none lg:flex-col lg:justify-between lg:py-8">
      {/* Top Section: Photo card + Persona (from image) */}
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-2xl border border-transparent bg-signature-coral p-6 text-canvas shadow-xl calm:bg-canvas calm:border-hairline calm:text-ink">
          {/* Top row with Avatar + online indicator */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow tracking-widest text-canvas/80 calm:text-ink-muted">
                {profile.role}
              </span>
              <h1 className="mt-2 text-title-lg font-bold tracking-tight text-canvas calm:text-ink sm:text-display-md leading-tight">
                {profile.mark}
              </h1>
            </div>

            <div className="relative size-[76px] flex-none overflow-hidden rounded-2xl border-2 border-canvas/40 shadow-md calm:border-hairline">
              <Image
                src={asset("/avatar.jpg")}
                alt={profile.name}
                width={80}
                height={80}
                className="size-full object-cover"
                priority
              />
              <span
                aria-label="Available for remote work"
                title="Available for remote work"
                className="absolute right-1.5 bottom-1.5 size-3 rounded-full bg-emerald-400 ring-2 ring-canvas"
              />
            </div>
          </div>

          <p className="mt-4 text-body-md font-medium text-canvas/90 calm:text-body leading-relaxed">
            &ldquo;{profile.headline}&rdquo;
          </p>

          {/* Quick Credential Grid from image */}
          <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-canvas/20 pt-4 text-[12px] calm:border-hairline sm:grid-cols-3">
            {profile.credits.map((credit) => (
              <div key={credit.k}>
                <dt className="eyebrow text-canvas/70 calm:text-ink-muted">
                  {credit.k}
                </dt>
                <dd className="mt-0.5 font-semibold text-canvas calm:text-ink">
                  {credit.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Sticky Section Navigation */}
        <nav aria-label="Section navigation" className="hidden lg:block">
          <ul className="space-y-1.5 font-mono text-[12px]">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => sound.playClick()}
                    className={`group flex items-center gap-3 py-1.5 transition-all no-underline ${
                      isActive
                        ? "text-ink font-bold translate-x-1"
                        : "text-ink-muted hover:text-ink hover:translate-x-0.5"
                    }`}
                  >
                    <span
                      className={`h-[1px] transition-all ${
                        isActive
                          ? "w-8 bg-signature-coral"
                          : "w-4 bg-hairline group-hover:w-6 group-hover:bg-ink-muted"
                      }`}
                    />
                    <span>{`${section.num} // ${section.label}`}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom Column: Command Palette Button, Resume & Direct Links */}
      <div className="hidden lg:block space-y-4 pt-6 border-t border-hairline/60">
        <button
          type="button"
          onClick={() => {
            sound.playChime();
            onOpenCommandPalette?.();
          }}
          className="flex w-full items-center justify-between rounded-xl border border-hairline bg-surface-soft px-3.5 py-2 text-xs font-mono text-ink hover:border-border-strong hover:bg-canvas transition-colors"
        >
          <span className="flex items-center gap-2">
            <span>⚡ Quick Search</span>
          </span>
          <kbd className="inline-flex items-center gap-0.5 rounded border border-hairline bg-canvas px-1.5 py-0.5 text-[10px] font-mono font-bold text-ink">
            <span className="text-[11px] leading-none">⌘</span>
            <span>K</span>
          </kbd>
        </button>

        <div className="flex items-center justify-between text-legal font-mono">
          <a
            href={`mailto:${profile.email}`}
            className="text-link hover:underline"
          >
            {profile.email}
          </a>
          <div className="flex items-center gap-3 text-ink-muted">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              GH ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              LI ↗
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
