## Variant: Editorial ledger

### Design stance
The portfolio as a printed studio index — numbered sections, hairline rules, one typeface at extreme scale contrast, and colour used only as evidence (a palette strip, one accent per project).

### Key choices
- **Layout:** single centered column (~1200px), hard left/right axes, no cards or boxes. Sections numbered `01 Selected work`, `02 Record`, `03 Contact`, matching the header nav.
- **Typography:** Inter at 48px/1.1 for the masthead down to 11px uppercase mono metadata. The 48px-to-11px jump is the main visual device.
- **Colour:** `--canvas` paper white, `--ink` for headlines, `--hairline` for every separator. The signature palette (coral, forest, cream, peach, mint, yellow, mustard) appears as a 7-swatch strip in the hero, then as the fill of the open work entry.
- **Interaction:** work rows invert to their own signature colour on hover; clicking a row expands a 3-column PROBLEM / APPROACH / OUTCOME panel inline (coral fill, white text, outline tag pills). Anchors are smooth-scrolled.
- **Imagery:** everything drawn inline as SVG, no external files or photos — a mock portrait of Jem (glasses, dark shirt, name plate, `MOCK PHOTO` tag) sits beside the editor plate in Fig. 01, each expanded work entry reveals its own app screenshot, and three sample certificate sheets click open to a lightbox that marks them as mock.
- **Availability:** a green dot + "Open to remote" in the header, `--success` only.

### Trade-offs
- **Strong at:** credibility, scan-ability, zero visual noise. Reads like a document you trust — good for reviewers who skim for evidence.
- **Weak at:** no imagery or 3D moment, so it leans entirely on type and copy quality. Long headline eats the first viewport.

### Best for
- A hiring manager or senior dev who wants to judge writing and thinking, not visual effects. Also the cheapest variant to make genuinely responsive.

### Verified
Rendered at 1440px in Edge; expanded state, hover fill and anchor scroll checked. No clipping in the open detail panel. Imagery re-verified after the portrait pass: Fig. 01 portrait (280×354) and editor plate (440×331) sit side by side inside the 1080px figure, and the certificate lightbox opens with an enlarged sheet plus the "mock image, not a real credential" note.
