-- ============================================================
-- ATHENS MAIN STREET — DATABASE UPDATE SCRIPT
-- Run this in Supabase SQL Editor
-- ============================================================

create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  status text default 'Backlog',
  priority text default 'Medium',
  assignee text,
  project_id uuid,
  due text
);

create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  quarter text default 'Q1',
  status text default 'Planned',
  assignees text,
  notes text,
  progress integer default 0
);

create table if not exists project_tasks (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  assignee text,
  done boolean default false
);

create table if not exists meetings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  date text,
  time text,
  duration text,
  type text,
  attendees text,
  notes text
);

create table if not exists outreach (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  business text,
  date text,
  member text,
  notes text
);

create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  role text,
  org text,
  phone text,
  email text
);

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

create table if not exists board_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  name text not null,
  role text,
  phone text,
  email text,
  status text default 'Active'
);

alter table tasks enable row level security;
alter table projects enable row level security;
alter table project_tasks enable row level security;
alter table meetings enable row level security;
alter table outreach enable row level security;
alter table contacts enable row level security;
alter table votes enable row level security;
alter table board_members enable row level security;

drop policy if exists "Public access" on tasks;
drop policy if exists "Public access" on projects;
drop policy if exists "Public access" on project_tasks;
drop policy if exists "Public access" on meetings;
drop policy if exists "Public access" on outreach;
drop policy if exists "Public access" on contacts;
drop policy if exists "Public access" on votes;
drop policy if exists "Public access" on board_members;

create policy "Public access" on tasks for all using (true) with check (true);
create policy "Public access" on projects for all using (true) with check (true);
create policy "Public access" on project_tasks for all using (true) with check (true);
create policy "Public access" on meetings for all using (true) with check (true);
create policy "Public access" on outreach for all using (true) with check (true);
create policy "Public access" on contacts for all using (true) with check (true);
create policy "Public access" on votes for all using (true) with check (true);
create policy "Public access" on board_members for all using (true) with check (true);

alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table projects;
alter publication supabase_realtime add table project_tasks;
alter publication supabase_realtime add table meetings;
alter publication supabase_realtime add table outreach;
alter publication supabase_realtime add table contacts;
alter publication supabase_realtime add table votes;
alter publication supabase_realtime add table board_members;
