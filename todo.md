# TODO — Public Guestbook (make it functional)

**Approach:** Supabase (Option A — recommended, accepted). Static site stays static; anon key + RLS provides the backend. Alternatives considered: Giscus (GitHub login required), email form service (no public list).

**Current state:** `src/components/portfolio/guestbook.tsx` form only writes to `localStorage` — each visitor sees only their own notes. Site is `output: "export"` on GitHub Pages, so no API routes.

## Plan

- [ ] **1. Create the table** — paste into Supabase SQL editor:
  ```sql
  create table guestbook_entries (
    id bigint generated always as identity primary key,
    name text not null check (char_length(name) <= 50),
    role text default 'Portfolio Visitor' check (char_length(role) <= 60),
    message text not null check (char_length(message) <= 500),
    created_at timestamptz not null default now()
  );
  alter table guestbook_entries enable row level security;
  create policy "public read"  on guestbook_entries for select to anon using (true);
  create policy "public write" on guestbook_entries for insert to anon with check (true);
  -- no UPDATE/DELETE for anon: visitors can't tamper; delete via dashboard
  ```
- [ ] **2. Add dependency** — `npm i @supabase/supabase-js`
- [ ] **3. Env vars** — `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `.env.local` for dev (gitignored)
  - [ ] GitHub repo secrets/vars for the Pages build workflow (`.github/workflows/deploy.yml` needs `env:` on the build step)
- [ ] **4. Client helper** — small `src/lib/supabase.ts` (anon client from env)
- [ ] **5. Rework `guestbook.tsx`**
  - [ ] On mount: fetch latest 50 entries, newest first (`order: created_at desc`)
  - [ ] Keep the 3 seeded notes as static fallback when fetch fails
  - [ ] Submit: honeypot field (hidden "website" — reject if filled) → insert → prepend optimistically → keep chime + success state
  - [ ] Drop localStorage logic (DB is source of truth)
  - [ ] Enforce maxLength on inputs: name 50, role 60, message 500 (DB caps are authoritative — trust boundary)
- [ ] **6. Moderation** — delete rows via Supabase dashboard
- [ ] **7. Verify**
  - [ ] `npm run build` still produces clean static export
  - [ ] Sign once locally → row appears in dashboard
  - [ ] Second browser/incognito → entry visible publicly

## Notes

- Anon key in client is safe — RLS is the guard.
- `ponytail:` spam ceiling = honeypot + DB length caps only; add Turnstile/edge function only if spam actually appears.
- Future nicety (skip now): `status` column for approve-before-show moderation.
