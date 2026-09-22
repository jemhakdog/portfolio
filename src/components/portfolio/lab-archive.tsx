"use client";

import { useState } from "react";
import { sound } from "@/lib/audio-engine";
import { siteVersions } from "@/content/portfolio";

export function LabArchive() {
  const [online, setOnline] = useState(false);
  const [syncQueue, setSyncQueue] = useState<string[]>([
    "Resident Clearance #104 (IndexedDB)",
    "Store Inventory update: Sugar 1kg",
  ]);
  const [syncedCount, setSyncedCount] = useState(24);

  const toggleNetwork = () => {
    sound.playClick();
    const next = !online;
    setOnline(next);
    if (next && syncQueue.length > 0) {
      setTimeout(() => {
        sound.playChime();
        setSyncedCount((c) => c + syncQueue.length);
        setSyncQueue([]);
      }, 600);
    }
  };

  const addOfflineRecord = () => {
    sound.playPop();
    const id = Math.floor(Math.random() * 900 + 100);
    setSyncQueue((prev) => [...prev, `Local Entry #${id} (IndexedDB offline store)`]);
  };

  return (
    <section id="lab" className="mt-16 scroll-mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-6 pb-6">
        <div>
          <span className="eyebrow text-ink-muted">Experiments & Evolution</span>
          <h2 className="mt-1 text-display-md text-ink">The Lab & Version Archive</h2>
        </div>
        <div className="text-legal text-ink-muted">
          <span>Inspired by Lynn Fisher · Evolution since 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Interactive Lab Toy: Offline Sync Visualizer */}
        <div className="rounded-xl border border-hairline bg-surface-dark p-6 text-canvas lg:col-span-6">
          <div className="flex items-center justify-between border-b border-hairline/20 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🧪</span>
              <h3 className="font-mono text-sm font-semibold text-canvas">
                Interactive Lab: Offline Sync Simulator
              </h3>
            </div>
            <button
              type="button"
              onClick={toggleNetwork}
              className={`rounded-full px-3 py-1 font-mono text-[11px] font-bold transition-colors ${
                online
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  : "bg-rose-500 text-white hover:bg-rose-400"
              }`}
            >
              {online ? "🟢 Online (Signal OK)" : "🔴 Offline (No Signal)"}
            </button>
          </div>

          <p className="mt-3 text-[13px] text-canvas/80 leading-relaxed">
            This demo models how <b className="text-amber-300">StudyStack</b> and <b className="text-amber-300">Sari-Sari POS</b> keep functioning when power or cell signal drops in rural areas.
          </p>

          <div className="mt-4 space-y-3 rounded-lg border border-hairline/20 bg-surface-dark-elevated p-4 font-mono text-[12px]">
            <div className="flex items-center justify-between text-[11px] text-canvas/60 pb-2 border-b border-hairline/10">
              <span>Local Queue: {syncQueue.length} pending writes</span>
              <span>Cloud DB: {syncedCount} synced rows</span>
            </div>

            {syncQueue.length === 0 ? (
              <div className="py-3 text-center text-canvas/40 text-[11px]">
                Queue is empty. Database is in full sync with cloud.
              </div>
            ) : (
              <ul className="space-y-1.5">
                {syncQueue.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between rounded bg-black/40 px-2.5 py-1 text-amber-200 border border-amber-500/20 text-[11px]"
                  >
                    <span>{item}</span>
                    <span className="text-[10px] uppercase text-rose-300">queued</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={addOfflineRecord}
                className="flex-1 rounded border border-hairline/30 bg-canvas/10 py-1.5 text-[11px] text-canvas hover:bg-canvas/20 transition-colors"
              >
                + Write to IndexedDB
              </button>
              <button
                type="button"
                onClick={toggleNetwork}
                className="rounded border border-hairline/30 bg-canvas/10 px-3 py-1.5 text-[11px] text-canvas hover:bg-canvas/20 transition-colors"
              >
                {online ? "Simulate Signal Drop" : "Simulate Signal Return"}
              </button>
            </div>
          </div>
        </div>

        {/* Version Archive History */}
        <div className="space-y-3.5 lg:col-span-6">
          <div className="text-legal font-semibold text-ink-muted pb-1">
            Site Architecture Changelog
          </div>

          <div className="space-y-3">
            {siteVersions.map((v) => (
              <div
                key={v.version}
                className={`rounded-xl border p-4 transition-colors ${
                  v.status === "Current"
                    ? "border-signature-coral/40 bg-canvas shadow-xs"
                    : "border-hairline bg-surface-soft/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-ink">{v.version}</span>
                    <span className="text-ink-muted">·</span>
                    <span className="font-semibold text-sm text-ink">{v.codename}</span>
                  </div>
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                      v.status === "Current"
                        ? "bg-signature-coral text-white"
                        : "bg-surface-strong text-ink-muted"
                    }`}
                  >
                    {v.status}
                  </span>
                </div>

                <div className="mt-1 text-[11px] font-medium text-signature-coral">
                  {v.theme} ({v.year})
                </div>

                <p className="mt-2 text-body-md text-body leading-relaxed">
                  {v.desc}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {v.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded bg-canvas px-2 py-0.5 font-mono text-[10px] text-ink-muted border border-hairline"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

