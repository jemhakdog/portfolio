"use client";

import { useEffect, useState } from "react";
import { profile, resumeInfo } from "@/content/portfolio";
import { sound } from "@/lib/audio-engine";

export function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae / Resume PDF Viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="flex h-[92vh] w-full max-w-[1000px] flex-col overflow-hidden rounded-2xl border border-hairline bg-surface-dark shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between border-b border-hairline/20 bg-surface-dark-elevated px-4 py-3 text-canvas">
          <div className="flex items-center gap-3">
            <span className="text-base">📄</span>
            <div>
              <h3 className="text-sm font-semibold text-canvas">
                {profile.name} — Resume (PDF)
              </h3>
              <p className="text-[11px] text-canvas/60 font-mono">
                {resumeInfo.headline} · Updated {resumeInfo.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumeInfo.pdfUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-hairline/40 bg-surface-dark px-3 py-1.5 text-xs font-mono text-canvas hover:bg-black transition-colors"
            >
              <span>New Tab</span>
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={resumeInfo.pdfUrl}
              download={resumeInfo.downloadName}
              onClick={() => sound.playChime()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-signature-coral px-3 py-1.5 text-xs font-mono font-bold text-white hover:opacity-90 transition-opacity"
            >
              <span>Download</span>
              <span aria-hidden="true">↓</span>
            </a>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              aria-label="Close resume viewer"
              className="ml-2 flex size-8 items-center justify-center rounded-lg text-canvas/70 hover:bg-white/10 hover:text-canvas"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal PDF Viewer Body */}
        <div className="relative flex-1 bg-surface-dark p-2">
          <iframe
            src={`${resumeInfo.pdfUrl}#toolbar=1&navpanes=0`}
            title="Resume PDF Preview"
            className="size-full rounded-lg border border-hairline/20 bg-white"
          />
        </div>
      </div>
    </div>
  );
}

export function ResumeSection({
  onOpenModal,
}: {
  onOpenModal?: () => void;
}) {
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"summary" | "pdf">("summary");

  const openResume = () => {
    sound.playChime();
    if (onOpenModal) {
      onOpenModal();
    } else {
      setInternalModalOpen(true);
    }
  };

  return (
    <>
      <section
        id="resume"
        data-reveal
        className="mt-section border-t border-hairline pt-12"
      >
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="eyebrow text-signature-coral calm:text-ink-muted">
              Curriculum Vitae
            </span>
            <h2 className="mt-2 text-display-md text-ink">
              Resume & Qualifications
            </h2>
            <p className="mt-1 text-body-md text-ink-muted">
              Detailed technical background, coursework, production deployments, and verifiable credentials.
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={openResume}
              className="inline-flex items-center gap-2 rounded-xl bg-signature-coral px-4 py-2.5 text-xs font-mono font-bold text-white shadow-md hover:opacity-90 active:scale-95 transition-all"
            >
              <span>📄 Open Fullscreen Resume</span>
            </button>
            <a
              href={resumeInfo.pdfUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface-soft px-3.5 py-2.5 text-xs font-mono text-ink hover:bg-canvas transition-colors"
            >
              <span>PDF Tab ↗</span>
            </a>
            <a
              href={resumeInfo.pdfUrl}
              download={resumeInfo.downloadName}
              onClick={() => sound.playChime()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface-soft px-3.5 py-2.5 text-xs font-mono text-ink hover:bg-canvas transition-colors"
            >
              <span>Download ↓</span>
            </a>
          </div>
        </div>

        {/* View mode toggle (Overview vs Live PDF) */}
        <div className="mt-8 flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-1 rounded-xl bg-surface-soft p-1 border border-hairline">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode("summary");
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-colors ${
                viewMode === "summary"
                  ? "bg-canvas text-ink font-bold shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Structured Summary
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setViewMode("pdf");
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-colors ${
                viewMode === "pdf"
                  ? "bg-canvas text-ink font-bold shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              PDF Document View
            </button>
          </div>

          <span className="text-[11px] font-mono text-ink-muted hidden sm:inline">
            Status: Available for Remote Work · UTC+08
          </span>
        </div>

        {/* Content Box */}
        {viewMode === "summary" ? (
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Card: Summary & Highlights */}
            <div className="space-y-6 lg:col-span-7">
              {/* Header Box */}
              <div className="rounded-2xl border border-hairline bg-canvas p-6 shadow-xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-title-lg font-bold text-ink">{profile.name}</h3>
                    <p className="text-body-md font-mono text-signature-coral calm:text-ink-muted mt-0.5">
                      {resumeInfo.headline}
                    </p>
                    <p className="mt-1 text-xs text-ink-muted font-mono">
                      {profile.location} · {profile.email}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-mono font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                    ● Ready for Hire
                  </span>
                </div>

                <p className="mt-4 text-body-md leading-relaxed text-body">
                  {resumeInfo.summary}
                </p>

                <div className="mt-5 border-t border-hairline pt-4">
                  <h4 className="eyebrow text-ink-muted mb-2">Verified Accomplishments</h4>
                  <ul className="space-y-2 text-body-md">
                    {resumeInfo.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-signature-coral calm:text-ink-muted font-bold">✓</span>
                        <span className="text-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Education Block */}
              <div className="rounded-2xl border border-hairline bg-canvas p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-ink-muted">Education</span>
                  <span className="font-mono text-xs text-ink-muted">{resumeInfo.education.period}</span>
                </div>
                <h4 className="mt-2 text-title-md font-semibold text-ink">
                  {resumeInfo.education.school}
                </h4>
                <p className="text-body-md font-medium text-signature-forest calm:text-ink mt-0.5">
                  {resumeInfo.education.degree} ({resumeInfo.education.status})
                </p>
                <p className="mt-2 text-xs text-body leading-relaxed">
                  {resumeInfo.education.details}
                </p>
              </div>
            </div>

            {/* Right Card: Competencies & Quick Actions */}
            <div className="space-y-6 lg:col-span-5">
              {/* Skills breakdown */}
              <div className="rounded-2xl border border-hairline bg-canvas p-6 shadow-xs">
                <span className="eyebrow text-ink-muted">Skill Matrix</span>
                <div className="mt-4 space-y-4">
                  {resumeInfo.skills.map((grp) => (
                    <div key={grp.category} className="space-y-1.5">
                      <span className="font-mono text-xs font-bold text-ink">
                        {grp.category}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {grp.items.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-hairline bg-surface-soft px-2.5 py-1 font-mono text-[11px] text-ink"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Resume Download Card */}
              <div className="rounded-2xl border border-hairline bg-surface-dark p-6 text-canvas shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h4 className="font-bold text-sm text-canvas">Need an offline copy?</h4>
                    <p className="text-xs text-canvas/70 mt-0.5">
                      Download the official standard PDF resume formatted for applicant tracking systems.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={resumeInfo.pdfUrl}
                    download={resumeInfo.downloadName}
                    onClick={() => sound.playChime()}
                    className="flex-1 rounded-xl bg-signature-yellow px-4 py-2.5 text-center text-xs font-mono font-bold text-black hover:opacity-95 transition-opacity"
                  >
                    Download Resume (PDF)
                  </a>
                  <button
                    type="button"
                    onClick={openResume}
                    className="rounded-xl border border-hairline/40 bg-surface-dark-elevated px-3.5 py-2.5 text-xs font-mono text-canvas hover:bg-black transition-colors"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PDF Embedded View */
          <div className="mt-6 h-[720px] w-full overflow-hidden rounded-2xl border border-hairline bg-surface-soft p-2 shadow-sm">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="font-mono text-xs text-ink-muted">
                Document Preview: {resumeInfo.downloadName}
              </span>
              <button
                type="button"
                onClick={openResume}
                className="text-xs font-mono text-link hover:underline"
              >
                Launch Fullscreen ↗
              </button>
            </div>
            <iframe
              src={`${resumeInfo.pdfUrl}#toolbar=1`}
              title="Resume PDF Embed"
              className="size-full rounded-xl border border-hairline bg-white"
            />
          </div>
        )}
      </section>

      {/* Internal Modal */}
      <ResumeModal
        isOpen={internalModalOpen}
        onClose={() => setInternalModalOpen(false)}
      />
    </>
  );
}

