-- ============================================================
-- ATHENS MAIN STREET — SUPABASE DATABASE SETUP SCRIPT
-- 
-- INSTRUCTIONS:
-- 1. Go to your Supabase project dashboard
-- 2. Click "SQL Editor" in the left sidebar
-- 3. Click "New query"
-- 4. Copy and paste ALL of this text into the editor
-- 5. Click "Run" (or press Ctrl+Enter)
-- 6. You should see "Success" — you're done!
-- ============================================================

-- TASKS table
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  status text default 'Backlog',
  priority text default 'Medium',
  assignee text,
  tag text,
  due text
);

-- MEETINGS table
create table if not exists meetings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  date text,
  time text,
  duration text,
  type text
);

-- OUTREACH table
create table if not exists outreach (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  business text,
  date text,
  member text,
  notes text
);

-- CONTACTS table
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  role text,
  org text,
  phone text,
  email text
);

-- VOTES table
create table if not exists votes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  date text,
  result text,
  yes integer default 0,
  no integer default 0,
  abstain integer default 0,
  notes text
);

-- Enable Row Level Security on all tables (keeps your data safe)
alter table tasks enable row level security;
alter table meetings enable row level security;
alter table outreach enable row level security;
alter table contacts enable row level security;
alter table votes enable row level security;

-- Allow anyone with the app link to read and write data
-- (You can tighten this later with user accounts if needed)
create policy "Public access" on tasks for all using (true) with check (true);
create policy "Public access" on meetings for all using (true) with check (true);
create policy "Public access" on outreach for all using (true) with check (true);
create policy "Public access" on contacts for all using (true) with check (true);
create policy "Public access" on votes for all using (true) with check (true);

-- Enable real-time updates so changes sync instantly for everyone
alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table meetings;
alter publication supabase_realtime add table outreach;
alter publication supabase_realtime add table contacts;
alter publication supabase_realtime add table votes;
