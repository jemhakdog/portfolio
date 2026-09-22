"use client";

import { useEffect, useRef, useState } from "react";
import { profile, projects, toolbox } from "@/content/portfolio";
import { sound } from "@/lib/audio-engine";

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
}

export function TerminalDrawer({
  isOpen,
  onToggle,
}: {
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1">
          <p className="text-emerald-400 font-bold">
            JemOS v1.0.4 (GNU/Linux x86_64 Pangasinan Station)
          </p>
          <p className="text-canvas/80">
            Type <span className="text-amber-300 font-semibold">help</span> to list available commands, or{" "}
            <span className="text-amber-300 font-semibold">sudo hire</span> for recruiters.
          </p>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    const cmd = raw.toLowerCase();

    if (!raw) return;

    sound.playClick();

    let result: React.ReactNode = null;

    switch (cmd) {
      case "help":
        result = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[12px]">
            <div><span className="text-amber-300 font-bold">about</span> : Developer ethos & location</div>
            <div><span className="text-amber-300 font-bold">projects</span> / <span className="text-amber-300 font-bold">ls</span> : Shipped real-world apps</div>
            <div><span className="text-amber-300 font-bold">skills</span> : Core technical stack</div>
            <div><span className="text-amber-300 font-bold">cat resume</span> : Education & experience</div>
            <div><span className="text-amber-300 font-bold">contact</span> : Email & LinkedIn links</div>
            <div><span className="text-amber-300 font-bold">sudo hire</span> : Technical recruiter fast-track</div>
            <div><span className="text-amber-300 font-bold">clear</span> : Clear screen</div>
            <div><span className="text-amber-300 font-bold">exit</span> : Close terminal drawer</div>
          </div>
        );
        break;

      case "about":
      case "cat about.md":
        result = (
          <div className="space-y-1.5 text-canvas/90">
            <p className="font-semibold text-emerald-400">{profile.name} — {profile.role}</p>
            <p className="text-amber-200 italic">&ldquo;{profile.headline}&rdquo;</p>
            <p className="text-canvas/80">
              Living and engineering in Mangatarem, Pangasinan. Specializing in offline-first client architectures,
              resilient SQLite/PostgreSQL databases, and software designed to execute smoothly on accessible low-cost devices.
            </p>
          </div>
        );
        break;

      case "projects":
      case "ls":
      case "ls projects":
        result = (
          <div className="space-y-2">
            <div className="text-canvas/60 text-[11px] pb-1 border-b border-hairline/20">
              DIRECTORY: /var/www/projects (3 deployed)
            </div>
            {projects.map((p) => (
              <div key={p.no} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[12px]">
                <div>
                  <span className="text-emerald-400 font-bold">[{p.no}] {p.name}</span>
                  <span className="text-canvas/60 ml-2">({p.kind})</span>
                  <p className="text-canvas/80 text-[11px]">{p.blurb}</p>
                </div>
                <span className="text-amber-300 font-mono text-[11px] flex-none">{p.meta}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
      case "tech":
        result = (
          <div className="space-y-2">
            <p className="text-emerald-400 font-semibold">Active Production Stack:</p>
            <div className="flex flex-wrap gap-1.5">
              {toolbox.map((tech) => (
                <span
                  key={tech}
                  className="rounded bg-canvas/10 px-2 py-0.5 font-mono text-[11px] text-amber-200 border border-canvas/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-canvas/60 mt-1">
              Methodologies: Offline-first, Local-first sync, Bluetooth ESC/POS printing, Low-bandwidth optimization.
            </p>
          </div>
        );
        break;

      case "cat resume":
      case "resume":
        result = (
          <div className="space-y-1.5 text-[12px] text-canvas/90">
            <p className="text-emerald-400 font-bold">BS Information Technology (2023–2026)</p>
            <p>Pangasinan State University · Graduating 2026</p>
            <p className="text-canvas/70">
              Certifications: Responsive Web Design (freeCodeCamp), Cybersecurity (Cisco), Python Basic (HackerRank).
            </p>
            <p className="text-amber-300">Target Role: Junior Software Engineer / Full-Stack Developer (Remote)</p>
          </div>
        );
        break;

      case "contact":
      case "email":
        result = (
          <div className="space-y-1 text-[12px]">
            <p>Email: <a href={`mailto:${profile.email}`} className="text-emerald-400 underline">{profile.email}</a></p>
            <p>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{profile.linkedin}</a></p>
            <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{profile.github}</a></p>
          </div>
        );
        break;

      case "sudo hire":
      case "hire":
        result = (
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-950/40 p-3 space-y-1 text-emerald-300">
            <p className="font-bold text-sm">🎉 ACCESS GRANTED: Outstanding hire candidate detected!</p>
            <p className="text-[12px]">
              Jem Carlo is available for remote opportunities starting immediately (UTC+08, overlapping EU & US schedules).
            </p>
            <p className="text-[12px] text-canvas pt-1">
              Click to email: <a href={`mailto:${profile.email}?subject=Interview%20Offer`} className="underline font-bold text-amber-300">{profile.email}</a>
            </p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        onToggle();
        return;

      default:
        result = (
          <p className="text-rose-400 text-[12px]">
            Command not found: &ldquo;{raw}&rdquo;. Type <span className="underline font-semibold">help</span> to view commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: raw, output: result }]);
    setInput("");
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => {
          sound.playChime();
          onToggle();
        }}
        aria-label={isOpen ? "Close developer terminal" : "Open embedded developer terminal"}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-hairline/80 bg-surface-dark px-3.5 py-2 text-xs font-mono font-bold text-canvas shadow-xl hover:bg-black hover:border-canvas/40 transition-transform active:scale-95 focus-visible:outline-2 focus-visible:outline-ring"
      >
        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>[ &gt;_ ] CLI</span>
        {isOpen && <span className="text-[10px] text-canvas/50">✕</span>}
      </button>

      {/* Terminal Drawer Bottom Sheet */}
      {isOpen && (
        <div
          role="region"
          aria-label="Interactive Developer Terminal"
          className="fixed bottom-0 left-0 right-0 z-40 mx-auto max-w-[840px] px-3 pb-3 transition-transform animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="overflow-hidden rounded-2xl border border-hairline/40 bg-surface-dark shadow-2xl">
            {/* Terminal Window Title Bar */}
            <div className="flex items-center justify-between border-b border-hairline/20 bg-surface-dark-elevated px-4 py-2 text-xs font-mono text-canvas/70">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onToggle} />
                <span className="size-3 rounded-full bg-amber-500/80" />
                <span className="size-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-semibold text-canvas/90">bash - jem@pangasinan-workstation: ~</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-canvas/40 hidden sm:inline">Tamal Sen Inspired CLI</span>
                <button
                  type="button"
                  onClick={onToggle}
                  className="text-canvas/60 hover:text-canvas text-sm font-bold"
                  aria-label="Close terminal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Terminal Output Body */}
            <div className="h-[280px] sm:h-[320px] overflow-y-auto p-4 font-mono text-[12px] text-canvas/90 space-y-3">
              {history.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-canvas/60">
                    <span className="text-emerald-400 font-bold">jem@austria:~$</span>
                    <span className="text-canvas font-semibold">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Line */}
            <div className="flex items-center border-t border-hairline/20 bg-surface-dark px-4 py-2.5 font-mono text-[12px]">
              <span className="text-emerald-400 font-bold mr-2 flex-none">jem@austria:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  sound.playKeypress();
                  if (e.key === "Enter") {
                    handleCommand(input);
                  }
                }}
                placeholder="type 'help', 'projects', 'skills', or 'sudo hire'..."
                className="w-full bg-transparent text-canvas placeholder:text-canvas/30 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
