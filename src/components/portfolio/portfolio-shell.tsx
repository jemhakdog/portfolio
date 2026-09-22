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
import { StickyProfilePane } from "@/components/portfolio/sticky-profile-pane";
import { TelemetryBar } from "@/components/portfolio/telemetry-bar";
import { TerminalDrawer } from "@/components/portfolio/terminal-drawer";
import { TopBar } from "@/components/portfolio/top-bar";
import { WorkGallery } from "@/components/portfolio/work-gallery";

export function PortfolioShell() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleOpenCommandPalette = () => {
      setCommandPaletteOpen(true);
    };

    const handleOpenTerminal = () => {
      setTerminalOpen(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("opencommandpalette", handleOpenCommandPalette);
    window.addEventListener("openterminal", handleOpenTerminal);

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("opencommandpalette", handleOpenCommandPalette);
      window.removeEventListener("openterminal", handleOpenTerminal);
      observer.disconnect();
    };
  }, []);

  const handleTogglePalette = () => {
    const isCalm = document.documentElement.dataset.palette === "calm";
    const next = !isCalm;
    document.documentElement.dataset.palette = next ? "calm" : "bold";
    window.dispatchEvent(new CustomEvent("palettechange", { detail: next }));
  };

  const handleToggleDark = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  return (
    <>
      {/* 1. Fluid Background & Cursor Radial Spotlight Glow [Brittany Chiang Wow Factor] */}
      <FluidBackground />
      <div
        className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, ${
            isDark ? "rgba(252, 171, 121, 0.08)" : "rgba(170, 45, 0, 0.06)"
          }, transparent 80%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Live Telemetry Bar [Lee Robinson Wow Factor] */}
      <TelemetryBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* 3. Navigation Header */}
      <TopBar />

      {/* 4. Dual-Pane Architecture [Brittany Chiang Wow Factor] */}
      <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-8 lg:flex lg:gap-10">
        {/* Left Pane (Sticky on lg+) */}
        <StickyProfilePane onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Right Pane (Fluid Scrollable Feed) */}
        <main
          id="portfolio"
          className="relative min-w-0 flex-1 lg:max-w-[calc(100%-440px)] pb-16"
        >
          {/* Hero & 3D Interactive Workspace [Bruno Simon & Henry Heffernan] */}
          <HeroBento />

          {/* Featured Case Studies with Tactile Spring Physics [Rauno Freiberg] */}
          <WorkGallery />

          {/* Scroll-Driven Career Milestone Runner [Robby Leonardi] */}
          <MilestoneRunner />

          {/* Certificate Wall */}
          <CertificateWall />

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
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onTogglePalette={handleTogglePalette}
        onToggleDark={handleToggleDark}
      />

      {/* 6. Tamal Sen Integrated CLI Terminal Drawer */}
      <TerminalDrawer
        isOpen={terminalOpen}
        onToggle={() => setTerminalOpen(!terminalOpen)}
      />

      {/* 7. anime.js Motion Orchestrator */}
      <PortfolioMotion />
    </>
  );
}

