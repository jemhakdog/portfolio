"use client";

import { useSyncExternalStore } from "react";

import { sound } from "@/lib/audio-engine";

/**
 * The one owner of the three page-wide toggles: dark theme, bold/calm palette,
 * UI sound. `PortfolioShell`, `TopBar`, `TelemetryBar`, `CommandPalette` and
 * `motion.tsx` all read this instead of observing `<html>` or listening for a
 * custom event to find out what a sibling just changed.
 *
 * localStorage and `matchMedia` are only read inside `init()`, which runs from
 * an effect after mount — so the server render and the first client render
 * agree and hydration stays clean.
 */

export type UIState = {
  /** `.dark` on <html>; persisted as `theme` */
  dark: boolean;
  /** `data-palette="calm"` on <html> */
  calm: boolean;
  sound: boolean;
};

const SERVER_STATE: UIState = { dark: false, calm: false, sound: false };

let snapshot: UIState = SERVER_STATE;
const listeners = new Set<() => void>();

function set(next: Partial<UIState>) {
  snapshot = { ...snapshot, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): UIState {
  return snapshot;
}

function getServerSnapshot(): UIState {
  return SERVER_STATE;
}

export function useUIState(): UIState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Reads the stored preference and puts it on <html>. Run once, on mount. */
export function initUIState() {
  const stored = localStorage.getItem("theme");
  set({
    dark: stored
      ? stored === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches,
    calm: document.documentElement.dataset.palette === "calm",
    sound: sound.isEnabled(),
  });
  applyToDocument();
}

function applyToDocument() {
  document.documentElement.classList.toggle("dark", snapshot.dark);
  document.documentElement.dataset.palette = snapshot.calm ? "calm" : "bold";
}

export function toggleDark() {
  localStorage.setItem("theme", snapshot.dark ? "light" : "dark");
  set({ dark: !snapshot.dark });
  applyToDocument();
}

export function togglePalette() {
  set({ calm: !snapshot.calm });
  applyToDocument();
}

export function toggleSound() {
  set({ sound: sound.toggle() });
}
