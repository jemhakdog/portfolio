-- Create guestbook table
create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  role text default 'Portfolio Visitor' check (role is null or char_length(role) <= 100),
  message text not null check (char_length(trim(message)) between 1 and 1000),
  avatar_color text default 'bg-signature-coral',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.guestbook enable row level security;

-- Policy: Allow public read access to guestbook entries
create policy "Allow public read access"
  on public.guestbook
  for select
  to anon, authenticated
  using (true);

-- Policy: Allow public to insert guestbook entries with validation checks
create policy "Allow public insert access"
  on public.guestbook
  for insert
  to anon, authenticated
  with check (
    char_length(trim(name)) between 1 and 80 and
    char_length(trim(message)) between 1 and 1000 and
    (role is null or char_length(role) <= 100)
  );

-- Index for ordering by creation time
create index if not exists guestbook_created_at_idx on public.guestbook (created_at desc);
