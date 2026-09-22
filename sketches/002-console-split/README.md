## Variant: Console split

### Design stance
The portfolio as a working tool — a persistent index rail on the left, a filterable record on the right, everything addressable and keyboard-reachable.

### Key choices
- **Layout:** fixed 280px sidebar (identity, availability pill, section counters, STACK table, CURRENTLY, contact footer) + scrolling main pane with breadcrumbs (`~/portfolio / index`).
- **Typography:** three-way split — display face for the H1, grotesque for body, monospace for every ID, stack string, breadcrumb, and counter.
- **Colour:** near-greyscale. `--surface-dark` for the single heavy element (the featured case-study card), green for `live`, `--info` blue for `in progress`.
- **Interaction:** segmented filters (All / Web / Python / Data) that really re-render the table and its row count; master/detail selection — clicking a row swaps the dark case-study card below (role, scale, hard part, deploy). Primary actions fire a bottom-right toast. Keyboard: `1–4` jump sections, `f` cycles filters, `esc` closes the toast.

- **Imagery:** everything drawn inline as SVG — a mock portrait of Jem beside the editor plate in Fig. 01, the selected project's app screenshot in the detail panel, and a certificate table whose thumbnails click open to a lightbox.

### Trade-offs
- **Strong at:** proving engineering taste. Density and keyboard support read as "this person ships tools."
- **Weak at:** colder and busier than the other two; the sidebar eats 280px and needs a real mobile collapse.

### Best for
- A technical reviewer who will actually click around, and the variant that scales best as more projects get added.

### Verified
Rendered at 1440px in Edge. Filter → 2 rows with the detail panel correctly re-selecting the first visible row; toast confirmed visible and unclipped; selection state confirmed on the table row. Fig. 01 portrait (264×334) and editor plate (420×316) sit side by side in the 920px figure, and the console is clean. Gotcha: the imagery block must stay at script top level — scoped inside the filter click handler it left the hero blank and threw "MOCKS is not defined" on load.
