-- META Lab Supabase Schema
-- Run this in the Supabase SQL Editor after creating a project.

-- Sessions table: stores chat conversations
create table if not exists sessions (
  id text primary key,
  device_id text not null,
  experiment_id text not null,
  messages jsonb not null default '[]',
  style text not null default 'iris',
  constraint_level text not null default 'guided',
  created_at bigint not null,
  updated_at bigint not null
);

create index if not exists idx_sessions_device on sessions(device_id);
create index if not exists idx_sessions_experiment on sessions(device_id, experiment_id);

-- User stats table: tracks streaks and usage
create table if not exists user_stats (
  device_id text primary key,
  total_sessions int not null default 0,
  total_messages int not null default 0,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_active_date text not null default '',
  experiments_used text[] not null default '{}'
);

-- Disable RLS for prototype (no auth)
alter table sessions enable row level security;
create policy "Allow all access" on sessions for all using (true) with check (true);

alter table user_stats enable row level security;
create policy "Allow all access" on user_stats for all using (true) with check (true);
