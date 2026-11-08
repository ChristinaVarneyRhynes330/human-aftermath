-- Learning Lab: typed interactive activities and attempt records.
create type public.lab_type as enum ('scenario','claim_lab','classify','explain_options');

create table public.lab_activities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  type public.lab_type not null,
  title text not null,
  audience public.audience not null default 'public',
  published boolean not null default false,   -- keep drafts hidden from learners
  definition jsonb not null,
  version int not null default 1
);

create table public.lab_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_id uuid not null references public.lab_activities(id),
  activity_version int not null,
  response jsonb not null,                    -- the learner's path / selections
  result jsonb not null,                      -- server-computed rubric result
  passed boolean,
  created_at timestamptz not null default now()
);

alter table public.lab_activities enable row level security;
alter table public.lab_attempts   enable row level security;

create policy "read published lab activities" on public.lab_activities for select to authenticated using (
  published and (audience = 'public' or public.current_role_name() in ('professional_learner','enterprise_admin','platform_admin')));
create policy "own lab attempts read" on public.lab_attempts for select using (user_id = auth.uid());
-- Attempts are written only by server code (service role), so results cannot be forged.
