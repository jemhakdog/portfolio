"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/audio-engine";
import { type GuestbookEntry } from "@/content/portfolio";
import {
  supabase,
  sanitizeInput,
  formatGuestbookDate,
  type DbGuestbookEntry,
} from "@/lib/supabase";

const AVATAR_COLORS = [
  "bg-signature-coral",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-rose-600",
  "bg-teal-600",
];

export function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [tableError, setTableError] = useState<string | null>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function loadEntries() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("guestbook")
          .select("id, name, role, message, avatar_color, created_at")
          .order("created_at", { ascending: false });

        if (ignore) return;

        if (error) {
          console.warn("Could not load guestbook notes from Supabase:", error.message);
          if (error.message.includes("schema cache") || error.code === "PGRST205") {
            setTableError(
              "Table 'guestbook' has not been created in Supabase yet. Run the provided SQL migration in your Supabase Dashboard SQL Editor."
            );
          } else {
            setTableError(error.message);
          }
        } else if (data) {
          setTableError(null);
          setEntries(
            data.map((item: DbGuestbookEntry) => ({
              id: String(item.id),
              name: item.name,
              role: item.role || "Portfolio Visitor",
              message: item.message,
              date: formatGuestbookDate(item.created_at),
              avatarColor: item.avatar_color || "bg-signature-coral",
            }))
          );
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error fetching guestbook:", err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadEntries();

    return () => {
      ignore = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Defense-in-depth sanitization:
    // Strips dangerous tags, control characters, trims whitespace, and bounds length
    const cleanName = sanitizeInput(name, 80);
    const cleanRole = sanitizeInput(role, 100);
    const cleanMessage = sanitizeInput(message, 1000);

    if (!cleanName) {
      setSubmitError("Please enter a valid name.");
      return;
    }
    if (!cleanMessage) {
      setSubmitError("Please enter a message.");
      return;
    }

    if (!supabase) {
      setSubmitError("Supabase is not configured. Please check your environment variables.");
      return;
    }

    setSubmitting(true);

    try {
      const avatarColor =
        AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

      const { data, error } = await supabase
        .from("guestbook")
        .insert([
          {
            name: cleanName,
            role: cleanRole || "Portfolio Visitor",
            message: cleanMessage,
            avatar_color: avatarColor,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error saving note:", error);
        if (error.message.includes("schema cache") || error.code === "PGRST205") {
          setSubmitError(
            "The 'guestbook' table hasn't been created in Supabase yet. Please run the SQL schema in your Supabase dashboard."
          );
        } else {
          setSubmitError(error.message || "Failed to record note. Please try again.");
        }
        setSubmitting(false);
        return;
      }

      sound.playChime();

      const newEntry: GuestbookEntry = {
        id: String(data.id),
        name: data.name,
        role: data.role || "Portfolio Visitor",
        message: data.message,
        date: "Just now",
        avatarColor: data.avatar_color || avatarColor,
      };

      setEntries((prev) => [newEntry, ...prev]);
      setTableError(null);
      setName("");
      setRole("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
                maxLength={80}
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
                maxLength={100}
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
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your review, greeting, or feedback..."
                className="mt-1 w-full rounded-lg border border-hairline bg-surface-soft px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-border-strong focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-ink py-2.5 text-button font-medium text-canvas hover:opacity-90 disabled:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-ring cursor-pointer disabled:cursor-not-allowed"
            >
              {submitting ? "Signing..." : "Sign Guestbook ✍️"}
            </button>

            <div aria-live="polite" className="min-h-[20px] text-center">
              {submitted && (
                <p className="text-xs font-semibold text-emerald-600 animate-in fade-in">
                  ✓ Thank you! Your signature has been recorded.
                </p>
              )}
              {submitError && (
                <p className="text-xs font-semibold text-rose-600 animate-in fade-in">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Entries List */}
        <div className="space-y-3.5 lg:col-span-7">
          <div className="flex items-center justify-between pb-1 text-legal font-semibold text-ink-muted">
            <span>Recent Notes ({entries.length})</span>
            <span>Real-world Impact</span>
          </div>

          <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1">
            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-hairline bg-canvas p-4 animate-pulse"
                  >
                    <div className="flex items-start gap-3">
                      <div className="size-8 rounded-full bg-surface-soft" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-1/3 rounded bg-surface-soft" />
                        <div className="h-3 w-1/4 rounded bg-surface-soft" />
                        <div className="h-4 w-full rounded bg-surface-soft" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tableError ? (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm">
                <div className="font-semibold text-amber-700 dark:text-amber-400">
                  Database Table Setup Needed
                </div>
                <p className="mt-1 text-xs text-ink-muted leading-relaxed">
                  {tableError}
                </p>
              </div>
            ) : entries.length === 0 ? (
              <div className="rounded-xl border border-dashed border-hairline bg-surface-soft/40 p-8 text-center">
                <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-surface-soft text-ink-muted text-base">
                  ✍️
                </div>
                <p className="mt-2 text-sm font-medium text-ink">No notes yet</p>
                <p className="mt-1 text-xs text-ink-muted">
                  Be the first to leave a note or feedback in the guestbook!
                </p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-xl border border-hairline bg-canvas p-4 transition-colors hover:border-border-strong"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex size-8 flex-none items-center justify-center rounded-full text-xs font-bold text-white ${entry.avatarColor}`}
                    >
                      {entry.name.trim().charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <h4 className="text-sm font-semibold text-ink">{entry.name}</h4>
                        <span className="font-mono text-[11px] text-ink-muted">
                          {entry.date}
                        </span>
                      </div>
                      <div className="text-[11px] text-ink-muted">{entry.role}</div>
                      <p className="mt-2 text-body-md text-body leading-relaxed break-words">
                        &ldquo;{entry.message}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
