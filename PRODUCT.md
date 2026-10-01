# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Hiring managers & recruiters**: Looking to assess technical competence, real problem-solving ability, reliability, and readiness for remote software engineering roles.
- **Engineering peers & tech leads**: Evaluating code quality, architecture choices, real-world project complexity, and craftsmanship.

## Product Purpose

A personal portfolio website showcasing Jem Carlo G. Austria's software engineering capabilities, projects, certifications, and technical depth. The portfolio's purpose is to prove competence, convey reliability, and convert visitors into job interviews, remote contract opportunities, and engineering collaborations.

## Positioning

Versatile junior software engineer ready for general remote backend and frontend roles—backed by practical experience building offline-first systems, civic/municipal tools, and full-stack web applications on lean constraints and real-world environments.

## Operating Context

- Viewed on desktop and mobile web browsers globally (EU afternoons and US mornings overlap, based in UTC+08).
- Evaluators often spend 30–60 seconds scanning before deciding whether to inspect project case studies, GitHub repositories, or reach out.
- Hosted statically on GitHub Pages via automated GitHub Actions deployment.

## Capabilities and Constraints

- **Static export constraint**: Next.js App Router with `output: "export"`. No dynamic server runtimes, server actions, or Node-dependent API routes.
- **Base path handling**: Must support GitHub Pages project site subpath (`/portfolio`) using `asset()` helper for public assets.
- **Interactive features**: Theme toggle (dark/light/calm/bold palettes), sound effects (Web Audio synthesis), command palette, case-study drawer/dialogs, smoke-tested via headless Edge/Chrome CDP scripts.

## Brand Commitments

- **Name**: Jem Carlo G. Austria
- **Tagline / Headline**: "I build small software that works offline, on cheap hardware, in real barangays." / Versatile junior software engineer.
- **Tone & Voice**: Grounded, earnest, technically precise, proud of real-world impact, honest about junior status with outsized practical output.
- **Location & Availability**: Mangatarem, Pangasinan, Philippines (UTC+08). Open to remote work.

## Evidence on Hand

- **11 shipped systems**: Spanning municipal civic tools, AI gateways, offline systems, and academic capstones.
- **Verified credentials**: Certificates in `src/content/portfolio.ts` and `ceerts/` directory.
- **Real project case studies**: Clear problem, approach, and outcome breakdowns for featured projects.
- **Source code**: Public GitHub profile and repositories (`https://github.com/jemhakdog`).

## Product Principles

1. **Proof Over Posturing**: Real shipped code, honest metrics, and clear case studies outrank generic claims or hype.
2. **Accessible & Responsive**: Must load fast, work smoothly across devices, and maintain scannability for fast recruiter passes.
3. **Restrained Playfulness**: Interactive polish (micro-animations, audio cues, theme toggles) enhances rather than distracts from technical credibility.
4. **Resilient & Static-First**: Built cleanly to run without server failures, respecting client-side performance and static hosting constraints.
