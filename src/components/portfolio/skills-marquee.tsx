"use client";

import { sound } from "@/lib/audio-engine";

export const SKILLS_LIST = [
  { name: "Python", icon: "🐍", tag: "Backend" },
  { name: "FastAPI", icon: "⚡", tag: "API" },
  { name: "React 19", icon: "⚛️", tag: "Frontend" },
  { name: "Next.js 16", icon: "▲", tag: "Framework" },
  { name: "TypeScript", icon: "📘", tag: "Language" },
  { name: "PostgreSQL", icon: "🐘", tag: "Database" },
  { name: "SQLite", icon: "💾", tag: "Local-First" },
  { name: "Supabase", icon: "🟢", tag: "Cloud/Sync" },
  { name: "Tailwind CSS v4", icon: "🎨", tag: "Styles" },
  { name: "Three.js / WebGL", icon: "🌐", tag: "3D" },
  { name: "IndexedDB", icon: "📦", tag: "Offline Store" },
  { name: "Offline-First Sync", icon: "🔄", tag: "Architecture" },
  { name: "PWA", icon: "📱", tag: "Mobile Web" },
  { name: "Bluetooth ESC/POS", icon: "🖨️", tag: "Hardware" },
  { name: "Git & GitHub", icon: "🐙", tag: "VCS" },
  { name: "Linux / Bash", icon: "🐧", tag: "System" },
  { name: "REST APIs", icon: "🔌", tag: "Integration" },
  { name: "Vercel / Render", icon: "🚀", tag: "Deploy" },
];

/**
 * Dedicated Standalone Skills Marquee Line.
 * Moves all skills smoothly in a single continuous line like a ticker marquee.
 */
export function SkillsLineMarquee({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      data-reveal
      aria-label="Technologies and Skills Marquee"
      className={`relative my-8 overflow-hidden rounded-2xl border border-hairline bg-surface-soft/80 py-3.5 backdrop-blur-xs calm:bg-canvas shadow-xs ${className}`}
    >
      {/* Left/Right Edge Fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-canvas via-canvas/80 to-transparent calm:from-canvas" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-canvas via-canvas/80 to-transparent calm:from-canvas" />

      {/* Ticker Header / Live Badge */}
      <div className="group flex overflow-hidden select-none">
        <div className="flex shrink-0 animate-marquee items-center gap-6 group-hover:[animation-play-state:paused]">
          {[...SKILLS_LIST, ...SKILLS_LIST, ...SKILLS_LIST].map((skill, idx) => (
            <div
              key={`line-${skill.name}-${idx}`}
              onMouseEnter={() => sound.playClick()}
              className="inline-flex items-center gap-3 shrink-0 cursor-pointer transition-transform hover:scale-105"
            >
              <div className="flex items-center gap-2 rounded-xl border border-hairline/80 bg-canvas px-3.5 py-1.5 shadow-xs transition-colors hover:border-signature-coral">
                <span className="text-sm">{skill.icon}</span>
                <span className="font-mono text-xs font-semibold text-ink">{skill.name}</span>
                <span className="rounded bg-surface-soft px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
                  {skill.tag}
                </span>
              </div>
              <span className="text-signature-coral calm:text-ink-muted/40 font-mono text-xs opacity-60">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
