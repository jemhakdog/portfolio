"use client";

import { useEffect, useRef, useState } from "react";
import { animate, utils } from "animejs";

import { certificates } from "@/content/portfolio";
import { hueVar } from "@/components/portfolio/hue";
import { CertificateArt } from "@/components/portfolio/mock-art";

export function CertificateWall() {
  const [shown, setShown] = useState(0);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  const cert = certificates[shown];

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;

    if (!open) {
      if (el.open) el.close();
      return;
    }
    if (!el.open) el.showModal();

    const art = el.querySelector<HTMLElement>("[data-cert-art]");
    if (!art) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fade-only when motion is reduced: no scale.
    utils.set(art, { opacity: 0, scale: reduced ? 1 : 0.94 });
    animate(art, {
      opacity: 1,
      scale: 1,
      duration: reduced ? 260 : 420,
      ease: "out(3)",
    });
  }, [open, shown]);

  return (
    <section>
      <div
        data-reveal
        className="mt-[70px] mb-4 flex flex-wrap items-baseline justify-between gap-4 border-t border-ink pt-5"
      >
        <h2 className="text-display-md">Certificates</h2>
        <span className="text-legal text-ink-muted">
          Sample data · replace with your own
        </span>
      </div>

      <div
        id="certs"
        data-reveal-group
        className="grid scroll-mt-[86px] grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {certificates.map((item, index) => (
          <figure
            key={item.id}
            data-reveal-child
            style={hueVar(item.hue)}
            className="group relative rounded-[18px] bg-[var(--hue)] p-4 transition-[translate] duration-500 ease-[cubic-bezier(.16,.84,.24,1)] hover:-translate-y-1.5 calm:bg-canvas calm:border calm:border-hairline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring [&_svg]:rounded-lg"
          >
            <CertificateArt cert={item} />
            <h3 className="mt-4 text-[19px] leading-[1.35] font-medium text-ink">
              {item.title}
            </h3>
            <span className="mt-1.5 block text-[12px] font-semibold uppercase tracking-[1px] opacity-60">
              {item.issuer}
            </span>
            <span className="mt-2.5 block font-mono text-[11.5px] opacity-55">
              {item.id} · {item.year}
            </span>
            <button
              type="button"
              onClick={() => {
                setShown(index);
                setOpen(true);
              }}
              className="absolute inset-0 cursor-pointer rounded-[18px]"
            >
              <span className="sr-only">
                Open the {item.title} certificate
              </span>
            </button>
          </figure>
        ))}
      </div>

      {/* Native <dialog>: Esc, focus trap and the top layer come for free. */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto w-[min(720px,94vw)] rounded-xl border border-hairline bg-canvas p-4 backdrop:bg-surface-dark/88"
      >
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close certificate"
          className="absolute -top-3 -right-3 grid size-8 cursor-pointer place-items-center rounded-full bg-surface-dark text-body-md text-white"
        >
          ✕
        </button>
        <div data-cert-art>
          <CertificateArt cert={cert} />
        </div>
        <p className="mt-3 text-[12px] text-ink-muted">
          Sample certificate · mock image, not a real credential —{" "}
          {cert.issuer} {cert.year}
        </p>
      </dialog>
    </section>
  );
}
