"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, stagger, utils } from "animejs";

import { projects } from "@/content/portfolio";
import { asset } from "@/lib/asset";
import { hueVar, HueBar } from "@/components/portfolio/hue";
import { SpringCard } from "@/components/portfolio/spring-card";

/** Rendered height of an element that is currently sized to `auto`. */
function autoHeight(el: HTMLElement) {
  const previous = el.style.height;
  el.style.height = "auto";
  const height = el.offsetHeight;
  el.style.height = previous;
  return height;
}

export function WorkGallery() {
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);

  const select = (index: number) => {
    setShown(index);
    setOpen(open === index ? null : index);
  };

  useEffect(() => {
    const el = strip.current;
    if (!el) return;

    const isOpen = open !== null;
    const cols = el.querySelectorAll<HTMLElement>("[data-strip-col]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // No height motion — the panel jumps to its size, content still fades in.
      el.style.height = isOpen ? "auto" : "0px";
      el.style.opacity = isOpen ? "1" : "0";
      utils.set(cols, { opacity: 0 });
      animate(cols, { opacity: 1, duration: 300, ease: "out(3)" });
      return;
    }

    // Measure the rendered box first: after an open the inline height is `auto`,
    // which anime.js reads as 0.
    const from = el.getBoundingClientRect().height;
    const to = isOpen ? autoHeight(el) : 0;

    utils.set(el, { height: from });
    utils.set(cols, { opacity: 0, y: 14 });

    const panel = animate(el, {
      height: to,
      opacity: isOpen ? 1 : 0,
      duration: 520,
      ease: "out(4)",
      onComplete: () => utils.set(el, { height: isOpen ? "auto" : 0 }),
    });
    const content = animate(cols, {
      opacity: 1,
      y: 0,
      duration: 560,
      delay: stagger(70, { start: 140 }),
      ease: "out(3)",
    });

    return () => {
      panel.revert();
      content.revert();
    };
  }, [open, shown]);

  useEffect(() => {
    if (open !== null && strip.current) {
      const timer = setTimeout(() => {
        const rect = strip.current?.getBoundingClientRect();
        if (rect && (rect.top < 80 || rect.bottom > window.innerHeight)) {
          strip.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const active = projects[shown];

  return (
    <section>
      <div
        data-reveal
        className="mt-13 mb-4 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-5"
      >
        <h2 className="text-display-md">Selected work</h2>
        <span className="text-legal text-ink-muted">
          Click any tile to open the case study
        </span>
      </div>

      <div id="work" data-reveal-group className="grid scroll-mt-[86px] grid-cols-1 gap-3.5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <SpringCard
            key={project.name}
            intensity={8}
            onClick={() => select(index)}
            className="h-full"
          >
            <article
              data-reveal-child
              style={hueVar(project.hue)}
              className="group relative flex h-full min-h-[280px] flex-col justify-between gap-3.5 overflow-hidden rounded-xl border border-transparent bg-[var(--hue)] p-[26px] transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-lift calm:border-hairline calm:bg-canvas focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring cursor-pointer"
            >
              <HueBar />
              {/* Mock screenshot — an inline SVG illustration, not a real capture */}
              <Image
                src={asset(`/art/${project.art}.svg`)}
                alt={`Mock image of the ${project.name} interface`}
                width={400}
                height={300}
                className="block w-full rounded-md"
              />
              <div>
                <span className="eyebrow text-ink/80">
                  {project.no} · {project.kind}
                </span>
                <h3 className="mt-3.5 max-w-[16ch] text-title-lg text-ink">
                  {project.name}
                </h3>
                <p className="mt-2.5 max-w-[30ch] text-body-md leading-[1.5] text-body">
                  {project.blurb}
                </p>
              </div>
              <div className="mt-6 flex items-end justify-between gap-3.5 text-ink">
                <span className="text-[12px] font-semibold text-ink/75">
                  {project.meta}
                </span>
                <span
                  className={`flex items-center gap-1.5 text-[13.12px] font-semibold text-ink transition-[opacity,translate] duration-300 ${
                    open === index
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {open === index ? "Close case study" : "Open case study"} <span aria-hidden>→</span>
                </span>
              </div>
            </article>
          </SpringCard>
        ))}
      </div>

      {/*
        One panel under the row, re-used for whichever tile is open — anime.js
        owns its height. NOTE: while open the inline height is `auto`, so text
        reflow on resize is handled; a switch re-measures before animating.
      */}
      <div
        ref={strip}
        id="case-strip"
        aria-live="polite"
        aria-hidden={open === null}
        className="mt-3.5 h-0 overflow-hidden rounded-xl bg-surface-dark opacity-0"
      >
        <div className="grid gap-x-[30px] gap-y-6 p-[30px] lg:grid-cols-[1.2fr_1fr_1fr]">
          <div
            data-strip-col
            className="flex items-start justify-between gap-4 lg:col-span-3"
          >
            <div>
              <span className="eyebrow text-canvas/80">{active.cs.cap}</span>
              <h3 className="mt-1.5 text-title-lg text-canvas">{active.name}</h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close case study"
              className="relative grid size-8 flex-none cursor-pointer place-items-center rounded-full border border-canvas/30 text-body-md text-canvas after:absolute after:-inset-2 after:content-[''] focus-visible:outline-2 focus-visible:outline-canvas"
            >
              ✕
            </button>
          </div>

          {(
            [
              ["Problem", active.cs.problem],
              ["Approach", active.cs.approach],
            ] as const
          ).map(([label, body]) => (
            <div key={label} data-strip-col>
              <h4 className="eyebrow mb-2.5 text-canvas/80">{label}</h4>
              <p className="text-body-md leading-[1.6] text-canvas/86">{body}</p>
            </div>
          ))}

          <div data-strip-col>
            <h4 className="eyebrow mb-2.5 text-canvas/80">Outcome</h4>
            <p className="text-body-md leading-[1.6] text-canvas/86">
              {active.cs.outcome}
            </p>
            <dl className="mt-5 flex flex-wrap gap-x-[26px] gap-y-4">
              {active.cs.stats.map(([key, value]) => (
                <div key={key}>
                  <dt className="eyebrow text-canvas/75">{key}</dt>
                  <dd className="mt-1 text-[15px] font-medium text-canvas">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
