-- ============================================================
-- IGINFULL — Supabase Schema
-- Run this in your Supabase SQL Editor (supabase.com → your project → SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text,
  name        text,
  role        text not null default 'editor' check (role in ('admin', 'editor', 'model')),
  avatar_url  text,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ============================================================
-- MODELS (the talent)
-- ============================================================
create table public.models (
  id               uuid default uuid_generate_v4() primary key,
  name             text not null,
  niche            text,
  instagram_handle text,
  avatar_url       text,
  status           text not null default 'active' check (status in ('active', 'inactive')),
  created_at       timestamptz default now()
);

-- ============================================================
-- IDEAS (AI-generated content briefs)
-- ============================================================
create table public.ideas (
  id               uuid default uuid_generate_v4() primary key,
  model_id         uuid references public.models(id) on delete set null,
  niche            text,
  campaign         text,
  prompt_inputs    jsonb,
  generated_brief  jsonb,
  status           text not null default 'draft'
    check (status in ('draft', 'sent', 'in_progress', 'clips_received', 'complete')),
  created_by       uuid references public.profiles(id) on delete set null,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ============================================================
-- CLIPS (uploaded raw clips)
-- ============================================================
create table public.clips (
  id           uuid default uuid_generate_v4() primary key,
  idea_id      uuid references public.ideas(id) on delete cascade,
  model_id     uuid references public.models(id) on delete set null,
  filename     text,
  storage_path text,
  status       text not null default 'uploading'
    check (status in ('uploading', 'enhancing', 'enhanced', 'pipeline')),
  enhanced_path      text,
  mime_type    text,
  file_size    integer,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ============================================================
-- PIPELINE (clips ready for editing)
-- ============================================================
create table public.pipeline (
  id                  uuid default uuid_generate_v4() primary key,
  clip_id             uuid references public.clips(id) on delete cascade,
  idea_id             uuid references public.ideas(id) on delete set null,
  status              text not null default 'pending'
    check (status in ('pending', 'editing', 'review', 'approved', 'published')),
  sent_to_editing_at  timestamptz,
  edited_at           timestamptz,
  approved_at         timestamptz,
  posted_at           timestamptz,
  created_at          timestamptz default now()
);

-- ============================================================
-- SEED DATA — models
-- ============================================================
insert into public.models (name, niche, instagram_handle, status) values
  ('Ella',   'GFE',      '@ella',   'active'),
  ('Amam',   'GFE',      '@amam',   'active'),
  ('Ren',    'Fitness',  '@ren',    'active'),
  ('Tyler',  'Fitness',  '@tyler',  'active');

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles  enable row level security;
alter table public.models    enable row level security;
alter table public.ideas    enable row level security;
alter table public.clips     enable row level security;
alter table public.pipeline  enable row level security;

-- profiles: users can read their own profile
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- models: readable by all authenticated users
create policy "models_select_all" on public.models
  for select using (auth.role() = 'authenticated');

-- ideas: admins can do everything; models see only their own
create policy "ideas_select_own_or_admin" on public.ideas
  for select using (
    auth.uid() = created_by
    or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "ideas_insert_admin" on public.ideas
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "ideas_update_admin" on public.ideas
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- clips: readable by admin and the creating model
create policy "clips_select" on public.clips
  for select using (
    auth.role() = 'authenticated'
  );

create policy "clips_insert" on public.clips
  for insert with check (auth.role() = 'authenticated');

create policy "clips_update" on public.clips
  for update using (auth.role() = 'authenticated');

-- pipeline: readable by authenticated users
create policy "pipeline_select" on public.pipeline
  for select using (auth.role() = 'authenticated');

create policy "pipeline_insert" on public.pipeline
  for insert with check (auth.role() = 'authenticated');

create policy "pipeline_update" on public.pipeline
  for update using (auth.role() = 'authenticated');

-- ============================================================
-- HELPER FUNCTIONS
-- ============================================================

-- Auto-create profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
