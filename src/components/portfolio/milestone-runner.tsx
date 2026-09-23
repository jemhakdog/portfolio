"use client";

import { useEffect, useRef, useState } from "react";
import { milestones } from "@/content/portfolio";
import { sound } from "@/lib/audio-engine";

/**
 * Scroll-driven career timeline. `progress` is the only state: the highlighted
 * step and the runner's position are both derived from it, and the runner sits
 * inside a wrapper that spans exactly the track, so it needs no measured height.
 */
export function MilestoneRunner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // One measurement per paint — scroll fires faster than React renders.
    let frame = 0;
    const measure = () => {
      frame = 0;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const visible = window.innerHeight - rect.top;
      setProgress(
        Math.min(Math.max(visible / (rect.height + window.innerHeight * 0.5), 0), 1),
      );
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeStep = Math.min(
    Math.floor(progress * milestones.length),
    milestones.length - 1,
  );
  const pct = progress * 100;

  return (
    <section id="journey" className="mt-16 scroll-mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-6 pb-6">
        <div>
          <span className="eyebrow text-ink-muted">Career & Milestones</span>
          <h2 className="mt-1 text-display-md text-ink">The Journey</h2>
        </div>
        <div className="flex items-center gap-2 font-mono text-[12px] text-ink-muted">
          <span>Track progress:</span>
          <span className="font-semibold text-ink tabular-nums">
            {Math.round(pct)}%
          </span>
        </div>
      </div>

      <div ref={containerRef} className="relative mt-4 pl-12 sm:pl-16">
        {/* Progress track — the runner rides inside it, so it can use percentages. */}
        <div className="absolute left-5 sm:left-7 -translate-x-1/2 top-4 bottom-8 w-[3px]">
          <div className="absolute inset-0 rounded-full bg-hairline" />
          {/* Scroll-driven values render 1:1 — no transition, or the bar trails the scroll. */}
          <div
            className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-signature-peach to-signature-coral shadow-[0_0_10px_var(--color-signature-coral)]"
            style={{ height: `${pct}%` }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex size-[19px] items-center justify-center rounded-full border-2 border-canvas bg-signature-coral text-[10px] text-white shadow-[0_0_0_4px_var(--color-signature-cream),0_0_14px_var(--color-signature-peach)]"
            style={{ top: `${pct}%` }}
            title="Milestone Runner"
          >
            <span className="animate-pulse">●</span>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="space-y-10">
          {milestones.map((item, idx) => {
            const isPassed = activeStep >= idx;
            return (
              <div
                key={`${item.year}-${idx}`}
                className={`relative rounded-xl border p-5 sm:p-6 transition-all duration-300 ${
                  isPassed
                    ? "border-hairline bg-canvas shadow-xs"
                    : "border-hairline/40 bg-surface-soft/40 opacity-70"
                }`}
                onMouseEnter={() => sound.playPop()}
              >
                {/* Milestone Node Badge */}
                <div
                  className={`absolute -left-7 sm:-left-9 -translate-x-1/2 top-6 flex size-8 sm:size-9 items-center justify-center rounded-full border-2 text-sm shadow-sm transition-colors ${
                    isPassed
                      ? "border-signature-coral bg-signature-cream text-ink scale-105"
                      : "border-hairline bg-canvas text-ink-muted"
                  }`}
                >
                  <span>{item.icon}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-signature-coral">
                      {item.year}
                    </span>
                    <span className="text-ink-muted">·</span>
                    <span className="eyebrow text-ink-muted">{item.role}</span>
                  </div>
                  {idx === milestones.length - 1 && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ACTIVE MILESTONE
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-title-md font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-[65ch] text-body-md leading-relaxed text-body">
                  {item.desc}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-hairline bg-surface-soft px-2.5 py-1 text-[11px] font-mono text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
