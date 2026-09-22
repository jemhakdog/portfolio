"use client";

import { useEffect, useState } from "react";
import { CertificateWall } from "@/components/portfolio/certificate-wall";
import { CommandPalette } from "@/components/portfolio/command-palette";
import { ContactBand, SiteFooter } from "@/components/portfolio/contact";
import { FluidBackground } from "@/components/portfolio/fluid-background";
import { Guestbook } from "@/components/portfolio/guestbook";
import { HeroBento } from "@/components/portfolio/hero-bento";
import { LabArchive } from "@/components/portfolio/lab-archive";
import { MilestoneRunner } from "@/components/portfolio/milestone-runner";
import { PortfolioMotion } from "@/components/portfolio/motion";
import { ResumeModal, ResumeSection } from "@/components/portfolio/resume-section";
import { SkillsLineMarquee } from "@/components/portfolio/skills-marquee";
import { StickyProfilePane } from "@/components/portfolio/sticky-profile-pane";
import { TelemetryBar } from "@/components/portfolio/telemetry-bar";
import { TerminalDrawer } from "@/components/portfolio/terminal-drawer";
import { TopBar } from "@/components/portfolio/top-bar";
import { WorkGallery } from "@/components/portfolio/work-gallery";
import { initUIState } from "@/lib/ui-state";

export function PortfolioShell() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Theme, palette and sound live in lib/ui-state.ts; this just loads them.
  useEffect(initUIState, []);

  return (
    <>
      {/* 1. Fluid Background — the only pointer tracker on the page */}
      <FluidBackground />

      {/* 2. Live Telemetry Bar [Lee Robinson Wow Factor] */}
      <TelemetryBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* 3. Navigation Header */}
      <TopBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* 4. Dual-Pane Architecture [Brittany Chiang Wow Factor] */}
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:flex lg:gap-10">
        {/* Left Pane (Sticky on lg+) */}
        <StickyProfilePane
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenResume={() => setResumeModalOpen(true)}
        />

        {/* Right Pane (Fluid Scrollable Feed) */}
        <main
          id="portfolio"
          className="relative min-w-0 flex-1 lg:max-w-[calc(100%-440px)] pb-16"
        >
          {/* Hero & 3D Interactive Workspace [Bruno Simon & Henry Heffernan] */}
          <HeroBento />

          {/* Standalone Single-Line Skills Marquee */}
          <SkillsLineMarquee />

          {/* Featured Case Studies with Tactile Spring Physics [Rauno Freiberg] */}
          <WorkGallery />

          {/* Scroll-Driven Career Milestone Runner [Robby Leonardi] */}
          <MilestoneRunner />

          {/* Certificate Wall */}
          <CertificateWall />

          {/* Resume & Curriculum Vitae Section */}
          <ResumeSection onOpenModal={() => setResumeModalOpen(true)} />

          {/* The Lab & Version Archive with Offline Sync Visualizer [Lynn Fisher] */}
          <LabArchive />

          {/* Public Verified Guestbook [Lee Robinson] */}
          <Guestbook />

          {/* Direct Contact & Footer */}
          <ContactBand />
          <SiteFooter />
        </main>
      </div>

      {/* 5. Paco Coursey Keyboard-First Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onOpen={() => setCommandPaletteOpen(true)}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* 6. Tamal Sen Integrated CLI Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onToggle={() => setTerminalOpen(!terminalOpen)}
      />

      {/* 7. Curriculum Vitae Fullscreen Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* 8. anime.js Motion Orchestrator */}
      <PortfolioMotion />
    </>
  );
}
