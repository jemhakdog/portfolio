## Variant: Signature collage

### Design stance
The design tokens as the structure — the signature palette stops being decoration and becomes the page's grid, with every block a full-bleed colour that carries its own content.

### Key choices
- **Layout:** bento grid on a 6-column track. Coral hero (4 cols) + forest availability (2 cols); then cream CURRENTLY BUILDING / peach TOOLBOX / mint RECORD; then a 3-up work row.
- **Typography:** Inter throughout, white on coral and forest, `--ink` on cream, peach, mint, yellow and mustard. 56px numeral as a graphic element in the RECORD tile.
- **Colour:** the full signature set used at full saturation, each block owning one hue. Radii at `--r-xl` (16px), zero shadows in the resting state.
- **Interaction:** tiles lift and reveal an "Open case study →" affordance on hover; clicking a tile expands a full-width case-study strip beneath the work row (eyebrow, PROBLEM / APPROACH / OUTCOME, HARD PART / USERS / DEPLOY stats). A `Bold / Calm` toggle in the header collapses the whole palette to paper + hairlines with a 6px hue bar per block — proving the colour is structural, not sprayed on.

- **Imagery:** everything drawn inline as SVG — a mock portrait of Jem beside the editor plate in the dark Fig. 01 band, a mock thumbnail on each work tile, a screenshot inside the case-study strip, and a certificate row whose cards click open to a lightbox.

### Trade-offs
- **Strong at:** being memorable and obviously designed. The strongest first impression of the three, and the palette toggle is a one-click demo of the token system.
- **Weak at:** the weakest at long-form reading — the neutral third tile already looks like the odd one out, and saturated blocks at mobile widths will need rework into a single column.

### Best for
- Standing out in a pile of near-identical developer portfolios, especially paired with the visual/3D direction in techstack.md.

### Verified
Rendered at 1440px in Edge. Case-study strip opens correctly with all three columns and stats; Calm mode confirmed readable with no broken blocks. Fig. 01 portrait (264×334) and editor plate (540×405) sit side by side in the 1184px band. Gotcha: the hero figure needs `grid-column:1/-1` in the bento — without it the card collapses to a single 12th column (~190px) and the pair squeezes to nothing.
