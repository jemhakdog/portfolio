import type { CSSProperties } from "react";
import type { Hue } from "@/content/portfolio";

/**
 * Every tile carries its own signature-palette surface through a single local
 * custom property, so the `calm:` variant can restyle the same markup without
 * a second class per tile.
 */
export function hueVar(hue: Hue): CSSProperties {
  return {
    "--hue":
      hue === "soft"
        ? "var(--color-surface-soft)"
        : `var(--color-signature-${hue})`,
  } as CSSProperties;
}

/**
 * In `calm` mode the hue stops being the surface and becomes the 10px bar along
 * the tile's top edge — the token is structural either way. anime.js staggers
 * these in when the palette toggle flips (see motion.tsx).
 */
export function HueBar() {
  return (
    <span
      aria-hidden
      data-hue-bar
      className="pointer-events-none absolute inset-x-0 top-0 h-2.5 origin-top bg-[var(--hue)] opacity-0 calm:opacity-100"
    />
  );
}
