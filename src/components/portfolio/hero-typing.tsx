"use client";

import { useEffect, useState } from "react";
import { sound } from "@/lib/audio-engine";

const PHRASES = [
  "Junior developer · Pangasinan, PH",
  "Building offline-first web apps for real communities",
  "Python · FastAPI · React 19 · Next.js · Supabase",
  "SQLite on disk · Bluetooth ESC/POS thermal printing",
  "Resilient software engineered for low-cost hardware",
  "Open for remote junior engineering roles worldwide",
];

export function HeroTyping({
  className = "",
  prefix = ">",
}: {
  className?: string;
  prefix?: string;
}) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, show the first phrase statically
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(PHRASES[0]);
      return;
    }

    const currentPhrase = PHRASES[phraseIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2200);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        return;
      }
      const deleteTimer = setTimeout(() => {
        setText(currentPhrase.substring(0, text.length - 1));
      }, 24);
      return () => clearTimeout(deleteTimer);
    }

    // Typing forward
    if (text.length === currentPhrase.length) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setText(currentPhrase.substring(0, text.length + 1));
      // Subtle audio feedback only every 4th char to avoid overwhelming sound
      if (text.length % 4 === 0) {
        sound.playKeypress();
      }
    }, 48 + Math.random() * 25);

    return () => clearTimeout(typeTimer);
  }, [text, phraseIndex, isDeleting, isPaused]);

  return (
    <div
      aria-label={`Current focus: ${PHRASES[phraseIndex]}`}
      className={`inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-tight ${className}`}
    >
      {prefix && <span className="text-canvas/60 calm:text-ink-muted select-none font-bold">{prefix}</span>}
      <span className="min-h-[1.5em] font-medium text-canvas calm:text-ink">
        {text}
        <span
          aria-hidden="true"
          className="ml-0.5 inline-block h-[13px] w-[6px] translate-y-[1px] bg-signature-yellow calm:bg-signature-coral animate-pulse"
        />
      </span>
    </div>
  );
}

