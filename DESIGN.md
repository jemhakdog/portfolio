---
name: Portfolio — Jem Carlo G. Austria
description: Personal portfolio showcasing resilient full-stack systems, municipal civic tools, and offline-first software.
colors:
  primary: "#181d26"
  primary-active: "#0d1218"
  canvas: "#ffffff"
  surface-soft: "#f8fafc"
  surface-strong: "#e0e2e6"
  surface-dark: "#181d26"
  surface-dark-elevated: "#1d1f25"
  hairline: "#dddddd"
  ink: "#181d26"
  body: "#333840"
  ink-muted: "#41454d"
  border-strong: "#9297a0"
  signature-coral: "#aa2d00"
  signature-forest: "#0a2e0e"
  signature-cream: "#f5e9d4"
  signature-peach: "#fcab79"
  signature-mint: "#a8d8c4"
  signature-yellow: "#f4d35e"
  signature-mustard: "#d9a441"
  link: "#1b61c9"
  success: "#006400"
  success-border: "#39bf45"
  ring: "#458fff"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "48px"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.12px"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "1.2px"
rounded:
  xs: "2px"
  sm: "6px"
  md: "10px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px 24px"
  chip-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  card-bento:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "30px"
---

# Design System: Portfolio — Jem Carlo G. Austria

## Overview

**Creative North Star: "The Civic Atelier"**

The visual world balances high-craft editorial structure with the grounded, tactile reality of practical engineering. At rest, the system is an uncluttered, high-contrast white canvas grounded by crisp hairlines, deep ink typography, and generous whitespace. Brand voltage does not rely on decorative atmospheric gradients or generic SaaS tropes; instead, it erupts deliberately through full-bleed **signature card surfaces** (`{colors.signature-coral}`, `{colors.signature-forest}`, `{colors.signature-cream}`, `{colors.signature-peach}`, `{colors.signature-mint}`) that punctuate the bento hero and project showcases.

Every interactive touchpoint provides palpable physical feedback: synthesized Web Audio clicks, subtle spring-physics 3D tilt, and collapsible case-study drawers. The dual-mode palette system allows visitors to toggle between **Bold** (full saturated chromatic collage) and **Calm** (hairline-bordered architectural paper grids), respecting user cognitive context without sacrificing identity.

**Key Characteristics:**
- **Signature Collage Surfaces:** Chromatic saturation lives within distinct structural cards rather than page-wide background washes.
- **Hairline Precision:** Clean 1px hairlines (`#dddddd` in light mode, `#262d38` in dark mode) demarcate boundaries and structural containers.
- **Tactile Feedback:** Micro-interactions are physically tangible through synthesized audio feedback, spring card tilt, and kinetic easing.
- **Dual Personality:** Seamless runtime switching between rich chromatic collage (`Bold`) and understated architectural grid (`Calm`).
- **Scannable Density:** 12px uppercase tracking labels (`.eyebrow`) and pill chips establish rapid visual hierarchy for quick recruiter passes.

## Colors

The palette pairs high-contrast monochrome foundation with warm, vibrant editorial signature blocks.

### Primary
- **Primary Ink** (`#181d26` / `{colors.primary}`): The dominant text color and primary CTA button fill. Near-black ink, never royal blue.
- **Primary Active** (`#0d1218` / `{colors.primary-active}`): Darkened press/active state for primary actions.

### Secondary
- **Signature Coral** (`#aa2d00` / `{colors.signature-coral}`): Hero anchor surface for the lead bento block; carries white typography.
- **Signature Forest** (`#0a2e0e` / `{colors.signature-forest}`): Deep evergreen block used for secondary anchor tiles; carries white typography.

### Tertiary
- **Signature Cream** (`#f5e9d4` / `{colors.signature-cream}`): Warm sand surface framing dark ink copy and stats.
- **Signature Peach** (`#fcab79` / `{colors.signature-peach}`): Warm pastel surface for interactive work cards.
- **Signature Mint** (`#a8d8c4` / `{colors.signature-mint}`): Fresh pastel surface for tools and secondary tiles.
- **Signature Yellow** (`#f4d35e` / `{colors.signature-yellow}`): Luminous accent card.
- **Signature Mustard** (`#d9a441` / `{colors.signature-mustard}`): Earthy golden tone for milestone and certificate badges.

### Neutral
- **Canvas** (`#ffffff` / `{colors.canvas}`): The default page surface and background floor.
- **Surface Soft** (`#f8fafc` / `{colors.surface-soft}`): Muted background for secondary trays and search command palette.
- **Surface Strong** (`#e0e2e6` / `{colors.surface-strong}`): Tertiary surface fill and subtle divider blocks.
- **Hairline** (`#dddddd` / `{colors.hairline}`): 1px borders, card outlines, and dividers.
- **Body Text** (`#333840` / `{colors.body}`): Running body copy for sustained reading comfort.
- **Ink Muted** (`#41454d` / `{colors.ink-muted}`): Secondary labels, timestamps, and captions.

### Named Rules
**The Rarity of Ink Rule.** The primary button is near-black ink (`#181d26`). Saturated hues belong exclusively to container surfaces and badges, never button backgrounds.
**The Calm Palette Invariant.** In `calm` mode (`data-palette="calm"`), all saturated tile backgrounds drop back to canvas white with hairline borders, and text switches cleanly to ink.

## Typography

**Display Font:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
**Body Font:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
**Mono Font:** ui-monospace, SFMono-Regular, Menlo, Consolas, monospace

**Character:** Modern, clean, objective Grotesk hierarchy. Display sizes prioritize medium weights (400–500) rather than heavy black styles, conveying thoughtful architectural clarity.

### Hierarchy
- **Display** (weight: 500, size: 48px, line-height: 1.1, tracking: -0.015em): Hero headline and primary statements.
- **Headline** (weight: 400, size: 32px, line-height: 1.2): Section titles (Projects, Case Studies, Credentials).
- **Title** (weight: 400, size: 20px, line-height: 1.5): Bento card headings and project titles.
- **Body** (weight: 400, size: 14px, line-height: 1.25): Running project descriptions and case study narrative.
- **Label / Eyebrow** (weight: 700, size: 12px, line-height: 1.2, tracking: 1.2px, uppercase): Section tags, credit keys, and category chips.

### Named Rules
**The Modest Weight Rule.** Display headlines never exceed font-weight 500. Emphasis is achieved via size contrast and colored card backings rather than heavy black typography.

## Layout

The spatial model employs an adaptive 12-column bento grid bounded by a max container width of 1280px with 24px–48px horizontal padding.

- **Vertical Rhythm:** Major section bands anchor to `{spacing.section}` (96px) vertical separation.
- **Card Spacing:** 14px (`gap-3.5`) inside the hero bento and gallery grids to maintain visual cohesion across chromatic blocks.
- **Internal Card Padding:** Standardized to 30px (`p-[30px]`) inside primary bento tiles, relaxing to 16px–24px on compact mobile viewports.
- **Density:** High scannability with dedicated quick-info chips and right-aligned action rails.

## Elevation & Depth

The system adheres to a **Color-Block First, Shadow Second** philosophy. Elevation is communicated primarily through crisp tonal contrast between white canvas and signature hue surfaces.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 22px 44px -26px color-mix(in oklab, var(--color-ink) 45%, transparent)`): Applied on interactive work cards upon hover to indicate affordance.
- **Overlay Dialog** (`box-shadow: 0 24px 64px -16px rgba(0, 0, 0, 0.28)`): Used for modal dialogues, command palette (⌘K), and certificate inspection.

### Named Rules
**The Flat-At-Rest Rule.** All surfaces sit flat at rest with zero box-shadow. Shadows only manifest as kinetic responses to hover or modal focus.

## Shapes

- **Base Radius Scale:**
  - `{rounded.xs}` (2px): Micro badges and system tags.
  - `{rounded.sm}` (6px): Text input fields and inline controls.
  - `{rounded.md}` (10px): Interactive list rows and secondary cards.
  - `{rounded.lg}` (12px): Primary action buttons and secondary CTA buttons.
  - `{rounded.xl}` (16px): Bento cards, showcase tiles, and dialog panels.
  - `{rounded.full}` (9999px): Tag chips, audio toggle, and circular icon controls.
- **Borders:** Consistent 1px solid hairlines (`#dddddd`) separating components and framing calm-mode blocks.

## Components

### Buttons
- **Primary Button (`button-primary`)**:
  - Background: `{colors.primary}` (#181d26), Text: `{colors.canvas}` (#ffffff).
  - Radius: `{rounded.lg}` (12px), Padding: 16px × 24px, Font: 16px weight 500.
  - Hover/Active: Transitions background to `{colors.primary-active}` (#0d1218) with a -1px transform.
- **Secondary Button (`button-secondary`)**:
  - Background: `{colors.canvas}` (#ffffff), Text: `{colors.ink}` (#181d26).
  - Border: 1px hairline (`#dddddd`), Radius: `{rounded.lg}` (12px).
- **Search Pill Button (`button-search-pill`)**:
  - Pill radius (`{rounded.full}`), hairline border, monospace shortcut hint (`⌘K`), subtle click sound on trigger.

### Chips & Badges
- **Pill Chip (`chip-pill`)**:
  - Font: 12px weight 600, letter-spacing 0.16px.
  - Border: 1px solid `color-mix(in oklab, var(--color-ink) 16%, transparent)`.
  - Background: `color-mix(in oklab, #ffffff 50%, transparent)`.
  - Radius: 9999px.

### Bento & Showcase Cards
- **Signature Bento Tile**:
  - Dynamic background `--hue: var(--color-signature-*)`.
  - 16px corner radius (`{rounded.xl}`), 30px internal padding.
  - Text contrast automatically inverts based on lightness (white text on coral/forest; dark ink on cream/peach/mint).

### Navigation
- **Sticky Top Bar**:
  - 62px height, pinned top, frosted glass blur (`backdrop-blur-md`, `bg-canvas/92`).
  - Contains signature name mark, section links, search trigger, sound toggle, and bold/calm & dark theme switches.

## Do's and Don'ts

### Do
- **Do** keep primary action buttons near-black (`#181d26`).
- **Do** reserve saturated signature hues for full card surfaces and structured bento containers.
- **Do** ensure all text on coral and forest signature blocks renders in white (`#ffffff`).
- **Do** support both Bold (chromatic collage) and Calm (hairline paper) presentation modes cleanly.
- **Do** provide subtle kinetic and audio feedback on discrete user actions.

### Don't
- **Don't** use royal blue (`#1b61c9`) as a primary button background; it is strictly an inline text link accent.
- **Don't** apply decorative atmospheric background gradients to the body canvas.
- **Don't** exceed font-weight 500 on display headers.
- **Don't** allow pill radius (`rounded-full`) on rectangular bento cards; reserve pill exclusively for chips, toggles, and search shortcuts.
