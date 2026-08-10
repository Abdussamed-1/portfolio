-- Community tables for Weekly page (Clerk user ids).
-- Run in Supabase SQL Editor after creating a Clerk app and wiring JWT (optional for later).
-- Until Clerk JWT → Supabase third-party auth is connected, writes use the service role from the API.

create extension if not exists "pgcrypto";

create table if not exists public.community_questions (
  id uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  title text not null,
  body text not null,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index if not exists community_questions_created_at_idx
  on public.community_questions (created_at desc);

create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.community_questions (id) on delete cascade,
  clerk_user_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists community_comments_question_id_idx
  on public.community_comments (question_id, created_at);

create table if not exists public.community_tag_prefs (
  clerk_user_id text primary key,
  tags text[] not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.community_questions enable row level security;
alter table public.community_comments enable row level security;
alter table public.community_tag_prefs enable row level security;

drop policy if exists "community_questions_public_read" on public.community_questions;
create policy "community_questions_public_read"
  on public.community_questions for select
  to anon, authenticated
  using (true);

drop policy if exists "community_comments_public_read" on public.community_comments;
create policy "community_comments_public_read"
  on public.community_comments for select
  to anon, authenticated
  using (true);

drop policy if exists "community_tag_prefs_owner_read" on public.community_tag_prefs;
create policy "community_tag_prefs_owner_read"
  on public.community_tag_prefs for select
  to authenticated
  using (clerk_user_id = coalesce(auth.jwt() ->> 'sub', ''));

-- Inserts/updates are performed by the Next.js API with SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
