"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/audio-engine";

export function TelemetryBar({
  onOpenCommandPalette,
}: {
  onOpenCommandPalette?: () => void;
}) {
  const [time, setTime] = useState<string>("");
  const [soundActive, setSoundActive] = useState<boolean>(() => sound.isEnabled());

  useEffect(() => {
    const handleSoundToggle = (e: Event) => {
      setSoundActive((e as CustomEvent<boolean>).detail);
    };
    window.addEventListener("soundtoggle", handleSoundToggle);

    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        };
        setTime(now.toLocaleTimeString("en-GB", options));
      } catch {
        setTime("PH (UTC+08)");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener("soundtoggle", handleSoundToggle);
    };
  }, []);

  const handleSoundClick = () => {
    const next = sound.toggle();
    setSoundActive(next);
  };

  return (
    <aside
      aria-label="Personal telemetry and status"
      className="border-b border-hairline/70 bg-surface-soft/80 backdrop-blur-sm text-[11px] text-ink-muted transition-colors"
    >
      <div className="mx-auto flex h-9 w-full max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-8">
        {/* Left Telemetry: Location, Local Time, and Spotify / Coding status */}
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="flex items-center gap-1.5 font-mono">
            <span
              className="size-2 rounded-full bg-emerald-500 animate-pulse"
              aria-hidden="true"
            />
            <span className="font-semibold text-ink hidden sm:inline">PANGASINAN, PH:</span>
            <span className="tabular-nums font-mono text-ink">{time || "UTC+08"}</span>
          </div>

          <span className="hidden md:inline text-hairline">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-body">
            <span aria-hidden="true" className="text-[12px]">🎧</span>
            <span>Focus:</span>
            <span className="font-medium text-ink">StudyStack v1.2 (IndexedDB sync)</span>
          </div>
        </div>

        {/* Right Telemetry Controls: Sound, Cmd+K trigger */}
        <div className="flex items-center gap-2 sm:gap-3 flex-none">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleSoundClick}
            aria-pressed={soundActive}
            title={soundActive ? "Mute UI sounds" : "Enable tactile UI sounds"}
            className="flex items-center gap-1.5 rounded-full border border-hairline bg-canvas px-2.5 py-0.5 text-[11px] font-medium text-ink transition-colors hover:bg-surface-strong/40 focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span className="flex items-end gap-[2px] h-2.5" aria-hidden="true">
              <span
                className={`w-[2px] rounded-full bg-current transition-all ${
                  soundActive ? "h-2.5 animate-pulse" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-[2px] rounded-full bg-current transition-all ${
                  soundActive ? "h-1.5 animate-pulse delay-75" : "h-1 opacity-40"
                }`}
              />
              <span
                className={`w-[2px] rounded-full bg-current transition-all ${
                  soundActive ? "h-3 animate-pulse delay-150" : "h-1 opacity-40"
                }`}
              />
            </span>
            <span className="hidden xs:inline">Sound: {soundActive ? "ON" : "OFF"}</span>
          </button>

          {/* Cmd + K Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette?.();
            }}
            aria-label="Open Command Palette (Cmd + K)"
            className="hidden sm:flex items-center gap-1.5 rounded-md border border-hairline bg-canvas px-2 py-0.5 text-[11px] font-mono text-ink-muted hover:text-ink hover:border-border-strong transition-colors focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span>Search</span>
            <kbd className="rounded border border-hairline bg-surface-soft px-1 text-[10px] font-sans font-semibold text-ink">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </aside>
  );
}
