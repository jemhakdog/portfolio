"use client";

import { useEffect } from "react";
import type { TargetsParam } from "animejs";
import {
  animate,
  createScope,
  createTimeline,
  splitText,
  stagger,
  utils,
} from "animejs";

/**
 * The single owner of every DOM animation on the page (anime.js only — the 3D
 * canvas from techstack.md is not in this design).
 *
 * Contract with the markup:
 *   [data-hero]          above-the-fold elements, revealed by the entrance timeline
 *   [data-reveal]        single element revealed on scroll
 *   [data-reveal-group]  container; its [data-reveal-child] nodes stagger in
 *   [data-count]         number that counts up once the hero lands
 *
 * `prefers-reduced-motion` downgrades this to **fade-only**: no translate, no
 * split, no scale — opacity still animates, so the layer stays alive for people
 * who ask for less motion instead of the whole page going static.
 *
 * `scope.revert()` on unmount is required — React 19 StrictMode mounts twice in
 * dev, and splitText would otherwise leave ghost spans behind.
 */
export function PortfolioMotion() {
  useEffect(() => {
    const root = document.getElementById("portfolio");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /** 1 = full motion, 0 = fade-only */
    const shift = reduced ? 0 : 1;
    /** overlap the previous step, or sit right after it in fade-only mode */
    const at = (overlap: string) => (reduced ? "<" : overlap);

    const scope = createScope({ root }).add(() => {
      /* ---------------- hero entrance ---------------- */
      utils.set(".js-hero-lead", { opacity: 0, y: 14 * shift });
      utils.set(".js-hero-eyebrow", { opacity: 0, y: 12 * shift });
      utils.set(".js-hero-cred > *", { opacity: 0, y: 14 * shift });
      utils.set("[data-hero-tile]", { opacity: 0, y: 26 * shift });
      utils.set(".js-hero-fig", { opacity: 0, y: 22 * shift });

      // The headline is hidden by CSS as [data-hero]. With motion we reveal the
      // parent and let the split words carry the animation; without it the heading
      // fades in as one block (no split, so no layout mutation either).
      const title = root.querySelector<HTMLElement>(".js-hero-title");
      let titleTargets: TargetsParam = title ? [title] : [];
      if (!reduced && title) {
        utils.set(title, { opacity: 1 });
        const { words } = splitText(title, { words: true });
        titleTargets = words;
        utils.set(words, { opacity: 0, y: 26 });
      } else {
        utils.set(titleTargets, { opacity: 0 });
      }

      const hero = createTimeline({
        defaults: { ease: "out(3)", duration: reduced ? 340 : 720 },
      });
      hero
        .add(".js-hero-lead", { opacity: 1, y: 0, duration: reduced ? 260 : 560 })
        .add(".js-hero-eyebrow", { opacity: 1, y: 0 }, at("-=320"))
        .add(
          titleTargets,
          { opacity: 1, y: 0, delay: reduced ? 0 : stagger(70) },
          at("-=380"),
        )
        .add(
          ".js-hero-cred > *",
          { opacity: 1, y: 0, delay: reduced ? 0 : stagger(70) },
          at("-=460"),
        )
        .add(
          "[data-hero-tile]",
          { opacity: 1, y: 0, delay: reduced ? 0 : stagger(80) },
          at("-=420"),
        )
        .add(".js-hero-fig", { opacity: 1, y: 0 }, at("-=520"));

      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const value = Number(el.dataset.count ?? 0);
        const counter = { value: 0 };
        el.textContent = "0";
        hero.add(
          counter,
          {
            value,
            duration: reduced ? 400 : 900,
            ease: "out(3)",
            onUpdate: () => {
              el.textContent = String(Math.round(counter.value));
            },
          },
          at("-=700"),
        );
      });

      /* ---------------- scroll reveals ---------------- */
      const reveal = (target: HTMLElement) => {
        const nodes = target.hasAttribute("data-reveal-group")
          ? [...target.querySelectorAll<HTMLElement>("[data-reveal-child]")]
          : [target];
        if (!nodes.length) return;
        utils.set(nodes, { opacity: 0, y: 24 * shift });
        animate(nodes, {
          opacity: 1,
          y: 0,
          duration: reduced ? 300 : 720,
          delay: reduced ? 0 : stagger(80),
          ease: "out(3)",
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            reveal(entry.target as HTMLElement);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
      );
      root
        .querySelectorAll<HTMLElement>("[data-reveal],[data-reveal-group]")
        .forEach((el) => observer.observe(el));

      /* ---------------- palette mode ---------------- */
      const onPalette = (event: Event) => {
        if (!(event as CustomEvent<boolean>).detail) return;
        const bars = [...root.querySelectorAll<HTMLElement>("[data-hue-bar]")];
        if (!bars.length) return;
        // scale is motion: in fade-only mode the bar appears through CSS opacity.
        if (reduced) return;
        utils.set(bars, { scaleY: 0 });
        animate(bars, {
          scaleY: 1,
          duration: 520,
          delay: stagger(45),
          ease: "out(3)",
        });
      };
      window.addEventListener("palettechange", onPalette);

      return () => {
        observer.disconnect();
        window.removeEventListener("palettechange", onPalette);
      };
    });

    return () => scope.revert();
  }, []);

  return null;
}
