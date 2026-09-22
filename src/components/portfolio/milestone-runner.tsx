"use client";

import { useEffect, useRef, useState } from "react";
import { sound } from "@/lib/audio-engine";

interface Milestone {
  year: string;
  quarter?: string;
  role: string;
  title: string;
  desc: string;
  tags: string[];
  icon: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2023",
    role: "Foundations",
    title: "Enrolled in BS Information Technology",
    desc: "Started degree at Pangasinan State University. Focused deeply on Python data structures, algorithms, and relational database modeling.",
    tags: ["Python", "SQL", "Linux", "Data Structures"],
    icon: "🌱",
  },
  {
    year: "2024",
    role: "Front-End & Offline Web",
    title: "Responsive Web Design & Web APIs",
    desc: "Completed freeCodeCamp certification. Experimented with IndexedDB, Service Workers, and client-side state architectures that don't depend on constant 5G connection.",
    tags: ["React", "IndexedDB", "PWA", "Tailwind"],
    icon: "⚡",
  },
  {
    year: "2025",
    role: "Real-World Deployments",
    title: "Shipped Barangay Records & Sari-Sari POS",
    desc: "Built and deployed internal software for local organizations in Pangasinan. Replaced six paper notebooks with a FastAPI search system and built a Bluetooth-enabled POS on an affordable Android tablet.",
    tags: ["FastAPI", "SQLite", "Bluetooth ESC/POS", "Render"],
    icon: "🚀",
  },
  {
    year: "2026",
    role: "Production & Ready for Hire",
    title: "StudyStack & Remote Junior Roles",
    desc: "Created StudyStack spaced-repetition offline reviewer. Graduating in 2026 with verified project deployments, ready to contribute to high-standards remote engineering teams.",
    tags: ["React 19", "Supabase", "Next.js", "Remote Ready"],
    icon: "🎯",
  },
];

export function MilestoneRunner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress relative to container viewport position
      const totalHeight = rect.height;
      const visibleY = windowHeight - rect.top;
      const progress = Math.min(Math.max(visibleY / (totalHeight + windowHeight * 0.5), 0), 1);

      setScrollProgress(progress);

      const stepIndex = Math.min(
        Math.floor(progress * MILESTONES.length),
        MILESTONES.length - 1
      );
      setActiveStep(stepIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>

      <div ref={containerRef} className="relative mt-4 pl-6 sm:pl-10">
        {/* Continuous Progress Track Line */}
        <div className="absolute left-[15px] sm:left-[23px] top-4 bottom-8 w-[3px] bg-hairline rounded-full" />
        
        {/* Animated Active Progress Runner Line */}
        <div
          className="absolute left-[15px] sm:left-[23px] top-4 w-[3px] bg-signature-coral rounded-full transition-all duration-300"
          style={{ height: `${Math.max(scrollProgress * 95, 4)}%` }}
        />

        {/* Floating Runner Avatar Indicator */}
        <div
          className="absolute left-[7px] sm:left-[15px] top-4 size-[19px] rounded-full border-2 border-canvas bg-signature-coral text-[10px] flex items-center justify-center text-white shadow-md transition-all duration-300 z-10"
          style={{
            transform: `translateY(${scrollProgress * 420}px)`,
          }}
          title="Milestone Runner"
        >
          <span className="animate-pulse">●</span>
        </div>

        {/* Milestone Steps */}
        <div className="space-y-10">
          {MILESTONES.map((item, idx) => {
            const isPassed = activeStep >= idx;
            return (
              <div
                key={item.year}
                className={`relative rounded-xl border p-5 sm:p-6 transition-all duration-300 ${
                  isPassed
                    ? "border-hairline bg-canvas shadow-xs"
                    : "border-hairline/40 bg-surface-soft/40 opacity-70"
                }`}
                onMouseEnter={() => sound.playPop()}
              >
                {/* Milestone Node Badge */}
                <div
                  className={`absolute -left-[33px] sm:-left-[49px] top-6 flex size-8 sm:size-9 items-center justify-center rounded-full border-2 text-sm shadow-sm transition-colors ${
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
                  {idx === MILESTONES.length - 1 && (
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

