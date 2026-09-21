/*
 * TEMPORARY: design-token smoke test. Replaced by the real hero in build step 3.
 * Every class here must resolve to a design.md token — nothing ad-hoc.
 */
export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <section className="mx-auto w-full max-w-[1280px] px-12 py-section">
        <h1 className="text-display-lg">Jem Carlo G. Austria</h1>
        <p className="mt-6 max-w-prose text-body-md">
          Junior developer — Python, React, Supabase.
        </p>
        <a className="text-link" href="#projects">
          See projects
        </a>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-12 pb-section">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-signature-coral p-12 text-canvas">
            <h2 className="text-display-md text-canvas">Coral</h2>
            <p className="mt-3 text-body-md text-canvas/80">signature</p>
          </div>
          <div className="rounded-lg bg-signature-forest p-12 text-canvas">
            <h2 className="text-display-md text-canvas">Forest</h2>
          </div>
          <div className="rounded-lg bg-signature-cream p-6">
            <h3 className="text-title-lg">Cream</h3>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-12 pb-section">
        <p className="text-caption text-ink-muted">caption / 14px 500</p>
        <p className="text-pricing-display">475</p>
        <p className="text-legal">legal / 600</p>
      </section>
    </main>
  );
}
