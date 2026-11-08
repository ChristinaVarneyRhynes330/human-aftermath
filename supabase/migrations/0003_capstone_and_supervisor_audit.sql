-- ============================================================================
-- Migration: 0003_capstone_and_supervisor_audit.sql
-- Integrates multi-step simulator attempts, skill rubrics, and CE credentials
-- ============================================================================

-- Skill mastery levels enum for rubric grading
create type skill_level as enum ('novice', 'developing', 'proficient', 'advanced');

-- 1. Table for tracking granular scenario submissions and multi-step decisions
create table if not exists public.scenario_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  scenario_slug text not null,
  track text not null default 'professional',
  path_taken text[] not null,
  respect_level skill_level not null default 'developing',
  agency_level skill_level not null default 'developing',
  boundaries_level skill_level not null default 'developing',
  expectations_level skill_level not null default 'developing',
  passed boolean not null default false,
  gate_passed boolean not null default true,
  feedback_summary jsonb not null default '{}'::jsonb,
  completed_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Link between curriculum completion, scenario attempts, and issued credentials
create table if not exists public.capstone_evaluations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  track text not null default 'professional',
  all_lessons_completed boolean not null default false,
  scenarios_passed_count int not null default 0,
  child_welfare_passed boolean not null default false,
  overall_passed boolean not null default false,
  evaluated_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id, track)
);

-- 3. Enhance issued_credentials with capstone verification link
alter table public.issued_credentials
  add column if not exists capstone_id uuid references public.capstone_evaluations(id),
  add column if not exists verification_status text not null default 'active',
  add column if not exists metadata jsonb not null default '{}'::jsonb;

-- 4. Enable RLS
alter table public.scenario_attempts enable row level security;
alter table public.capstone_evaluations enable row level security;

-- Policies for scenario_attempts
create policy "Users can read own scenario attempts"
  on public.scenario_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own scenario attempts"
  on public.scenario_attempts for insert
  with check (auth.uid() = user_id);

create policy "Supervisors can view org scenario attempts"
  on public.scenario_attempts for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('enterprise_admin', 'super_admin')
        and p.organization_id = (
          select organization_id from public.profiles where id = scenario_attempts.user_id
        )
    )
  );

-- Policies for capstone_evaluations
create policy "Users can view own capstone"
  on public.capstone_evaluations for select
  using (auth.uid() = user_id);

create policy "Supervisors can view org capstones"
  on public.capstone_evaluations for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.role in ('enterprise_admin', 'super_admin')
        and p.organization_id = (
          select organization_id from public.profiles where id = capstone_evaluations.user_id
        )
    )
  );

-- 5. Supervisor Compliance Audit View
create or replace view public.supervisor_audit_view as
select
  p.id as learner_id,
  p.full_name,
  p.organization_id,
  p.license_number,
  p.role as user_role,
  coalesce(c.all_lessons_completed, false) as lessons_completed,
  coalesce(c.child_welfare_passed, false) as child_welfare_scenario_passed,
  coalesce(c.scenarios_passed_count, 0) as scenarios_passed_count,
  coalesce(c.overall_passed, false) as capstone_passed,
  ic.credential_hash,
  ic.ce_hours,
  ic.issued_at as certificate_issued_at
from public.profiles p
left join public.capstone_evaluations c on c.user_id = p.id
left join public.issued_credentials ic on ic.user_id = p.id;