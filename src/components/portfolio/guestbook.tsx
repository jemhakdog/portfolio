"use client";

import { useState } from "react";
import { sound } from "@/lib/audio-engine";

interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  date: string;
  avatarColor: string;
}

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: "g-1",
    name: "Teresa Morales",
    role: "Local Sari-Sari Store Owner, Mangatarem",
    message:
      "Kuya Jem, the Bluetooth POS app on our tablet hasn't lost a single credit record or crashed once in six months. Maraming salamat!",
    date: "Aug 2025",
    avatarColor: "bg-emerald-600",
  },
  {
    id: "g-2",
    name: "Mark Villanueva",
    role: "BS IT Classmate & StudyStack User",
    message:
      "Being able to review reviewer flashcards on the long bus commute with zero signal saved our finals grade. The offline sync is magic.",
    date: "Dec 2025",
    avatarColor: "bg-amber-600",
  },
  {
    id: "g-3",
    name: "Danilo Santos",
    role: "Barangay Admin Staff",
    message:
      "Issuing clearances used to take 15 minutes of paging through handwritten books. With Jem's system, we print in 90 seconds. Solid software!",
    date: "Jan 2026",
    avatarColor: "bg-blue-600",
  },
];

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_guestbook");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return [...parsed, ...INITIAL_ENTRIES];
          }
        } catch {
          // use initial
        }
      }
    }
    return INITIAL_ENTRIES;
  });
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    sound.playChime();

    const newEntry: GuestbookEntry = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Portfolio Visitor",
      message: message.trim(),
      date: "Just now",
      avatarColor: "bg-signature-coral",
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);

    // Save only user entries to localStorage
    const userEntries = updated.filter((item) => item.id.startsWith("user-"));
    localStorage.setItem("portfolio_guestbook", JSON.stringify(userEntries));

    setName("");
    setRole("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="guestbook" className="mt-16 scroll-mt-20">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-6 pb-6">
        <div>
          <span className="eyebrow text-ink-muted">Community & Feedback</span>
          <h2 className="mt-1 text-display-md text-ink">Public Guestbook</h2>
        </div>
        <div className="text-legal text-ink-muted">
          <span>Inspired by Lee Robinson · Leave a verified note</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Sign Form */}
        <div className="rounded-xl border border-hairline bg-canvas p-6 shadow-xs lg:col-span-5">
          <h3 className="text-title-sm font-semibold text-ink">
            Leave a note in the guestbook
          </h3>
          <p className="mt-1 text-body-md text-ink-muted">
            Whether you&apos;re a recruiter, fellow developer, or classmate — say hello!
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
            <div>
              <label htmlFor="gb-name" className="block text-legal font-medium text-ink">
                Your Name *
              </label>
              <input
                id="gb-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor"
                className="mt-1 w-full rounded-lg border border-hairline bg-surface-soft px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-border-strong focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="gb-role" className="block text-legal font-medium text-ink">
                Title / Company (optional)
              </label>
              <input
                id="gb-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Engineering Lead @ Tech Corp"
                className="mt-1 w-full rounded-lg border border-hairline bg-surface-soft px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-border-strong focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="gb-msg" className="block text-legal font-medium text-ink">
                Message *
              </label>
              <textarea
                id="gb-msg"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your review, greeting, or feedback..."
                className="mt-1 w-full rounded-lg border border-hairline bg-surface-soft px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-border-strong focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-ink py-2.5 text-button font-medium text-canvas hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-ring"
            >
              Sign Guestbook ✍️
            </button>

            {submitted && (
              <p className="text-center text-xs font-semibold text-emerald-600 animate-in fade-in">
                ✓ Thank you! Your signature has been recorded.
              </p>
            )}
          </form>
        </div>

        {/* Entries List */}
        <div className="space-y-3.5 lg:col-span-7">
          <div className="flex items-center justify-between pb-1 text-legal font-semibold text-ink-muted">
            <span>Recent Notes ({entries.length})</span>
            <span>Real-world Impact</span>
          </div>

          <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-hairline bg-canvas p-4 transition-colors hover:border-border-strong"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex size-8 flex-none items-center justify-center rounded-full text-xs font-bold text-white ${entry.avatarColor}`}
                  >
                    {entry.name.charAt(0)}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="text-sm font-semibold text-ink">{entry.name}</h4>
                      <span className="font-mono text-[11px] text-ink-muted">
                        {entry.date}
                      </span>
                    </div>
                    <div className="text-[11px] text-ink-muted">{entry.role}</div>
                    <p className="mt-2 text-body-md text-body leading-relaxed">
                      &ldquo;{entry.message}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
