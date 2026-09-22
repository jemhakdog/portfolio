"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { profile, projects } from "@/content/portfolio";
import { sound } from "@/lib/audio-engine";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Projects" | "Links";
  subtitle?: string;
  shortcut?: string;
  icon: string;
  perform: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenTerminal,
  onTogglePalette,
  onToggleDark,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
  onTogglePalette?: () => void;
  onToggleDark?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          sound.playChime();
          // Open handled by parent or custom event
          window.dispatchEvent(new CustomEvent("opencommandpalette"));
        }
      }
      if (e.key === "Escape" && isOpen) {
        sound.playClick();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      sound.playChime();
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const items: CommandItem[] = useMemo(() => {
    const list: CommandItem[] = [
      // Navigation
      {
        id: "nav-top",
        title: "Go to Top / Hero",
        category: "Navigation",
        subtitle: "Return to header & introduction",
        icon: "🏠",
        perform: () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-work",
        title: "Selected Work & Projects",
        category: "Navigation",
        subtitle: "Jump to 3 shipped real-world projects",
        icon: "💼",
        perform: () => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-journey",
        title: "Career Milestones & Journey",
        category: "Navigation",
        subtitle: "Scroll to 2023–2026 timeline",
        icon: "🗺️",
        perform: () => {
          document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-lab",
        title: "The Lab & Version Archive",
        category: "Navigation",
        subtitle: "Explore interactive prototypes & design history",
        icon: "🧪",
        perform: () => {
          document.getElementById("lab")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-guestbook",
        title: "Public Guestbook",
        category: "Navigation",
        subtitle: "Sign the visitor guestbook",
        icon: "✍️",
        perform: () => {
          document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },
      {
        id: "nav-contact",
        title: "Contact Information",
        category: "Navigation",
        subtitle: "Direct email and professional profiles",
        icon: "📬",
        perform: () => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      },

      // Actions
      {
        id: "act-terminal",
        title: "Open Embedded CLI Terminal",
        category: "Actions",
        subtitle: "Interactive developer command line",
        shortcut: ">_",
        icon: "💻",
        perform: () => {
          onClose();
          onOpenTerminal?.();
        },
      },
      {
        id: "act-copy-email",
        title: "Copy Email Address",
        category: "Actions",
        subtitle: profile.email,
        icon: "📋",
        perform: () => {
          navigator.clipboard?.writeText(profile.email);
          alert(`Copied ${profile.email} to clipboard!`);
          onClose();
        },
      },
      {
        id: "act-toggle-sound",
        title: "Toggle Tactical Audio Effects",
        category: "Actions",
        subtitle: "Mechanical switch and synthesized clicks",
        icon: "🔊",
        perform: () => {
          sound.toggle();
          onClose();
        },
      },
      {
        id: "act-toggle-palette",
        title: "Toggle Palette (Bold / Calm)",
        category: "Actions",
        subtitle: "Switch between Philippine terracotta and calm paper grid",
        icon: "🎨",
        perform: () => {
          onTogglePalette?.();
          onClose();
        },
      },
      {
        id: "act-toggle-dark",
        title: "Toggle Dark / Light Theme",
        category: "Actions",
        subtitle: "Flip UI contrast mode",
        icon: "🌓",
        perform: () => {
          onToggleDark?.();
          onClose();
        },
      },

      // Shipped Projects
      ...projects.map((p) => ({
        id: `proj-${p.no}`,
        title: `${p.name} — ${p.kind}`,
        category: "Projects" as const,
        subtitle: `${p.blurb} (${p.meta})`,
        icon: "📦",
        perform: () => {
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          onClose();
        },
      })),

      // External Links
      {
        id: "link-linkedin",
        title: "LinkedIn Profile",
        category: "Links",
        subtitle: "Connect with Jem Carlo Austria",
        icon: "🔗",
        perform: () => {
          window.open(profile.linkedin, "_blank");
          onClose();
        },
      },
      {
        id: "link-github",
        title: "GitHub Profile",
        category: "Links",
        subtitle: "Inspect open-source repositories",
        icon: "🐙",
        perform: () => {
          window.open(profile.github, "_blank");
          onClose();
        },
      },
    ];

    return list;
  }, [onClose, onOpenTerminal, onTogglePalette, onToggleDark]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sound.playKeypress();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sound.playKeypress();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      sound.playClick();
      filtered[selectedIndex].perform();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Menu"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[620px] overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="flex items-center border-b border-hairline px-4 py-3">
          <span className="text-ink-muted text-base mr-3 font-mono">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search (e.g. 'work', 'sound', 'terminal', 'sqlite')..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
          />
          <kbd className="hidden sm:inline-block rounded border border-hairline bg-surface-soft px-1.5 py-0.5 text-[10px] font-mono text-ink-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-ink-muted">
              No results found for <span className="font-semibold text-ink">&ldquo;{query}&rdquo;</span>
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      item.perform();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-surface-strong text-ink font-medium"
                        : "text-body hover:bg-surface-soft"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="text-base flex-none">{item.icon}</span>
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                        <div className="text-ink text-[13px]">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-[11px] text-ink-muted truncate">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-none ml-3">
                      <span className="rounded bg-surface-soft px-1.5 py-0.5 text-[10px] font-mono text-ink-muted border border-hairline/60">
                        {item.category}
                      </span>
                      {item.shortcut && (
                        <kbd className="rounded bg-canvas px-1.5 py-0.5 text-[10px] font-mono font-bold text-signature-coral border border-signature-coral/30">
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="flex items-center justify-between border-t border-hairline bg-surface-soft/60 px-4 py-2 text-[11px] text-ink-muted font-mono">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>·</span>
            <span>↵ Select</span>
          </div>
          <div>
            <span>Paco Coursey Cmd+K Style</span>
          </div>
        </div>
      </div>
    </div>
  );
}
