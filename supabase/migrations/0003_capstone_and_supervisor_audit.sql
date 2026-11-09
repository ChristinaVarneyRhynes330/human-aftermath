-- ============================================================================
-- Migration: 0003_capstone_and_supervisor_audit.sql
-- Strictly reconciled against 0001_init.sql:
-- - Uses exact user_role enum: 'public_learner', 'professional_learner', 'enterprise_admin', 'platform_admin'
-- - Safely adds license_number to profiles and ce_hours to credentials if not present
-- - Uses security_invoker = on for supervisor_audit_view so RLS is enforced at the database level
-- ============================================================================

-- 1. Ensure required columns exist on baseline tables from 0001_init.sql
alter table public.profiles
  add column if not exists license_number text;

alter table public.credentials
  add column if not exists ce_hours numeric(5,2) not null default 0.00,
  add column if not exists verification_status text not null default 'active',
  add column if not exists metadata jsonb not null default '{}'::jsonb;

-- 2. Rubric mastery levels enum
do $$ begin
  create type skill_level as enum ('needs_attention', 'developing', 'strong');
exception
  when duplicate_object then null;
end $$;

-- 3. Table for tracking scenario attempts and graph path traversal
create table if not exists public.scenario_attempts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  scenario_slug text not null,
  path_taken text[] not null default '{}',
  scores jsonb not null default '{}'::jsonb,
  passed boolean not null default false,
  gate_passed boolean not null default true,
  reasons text[] not null default '{}',
  completed_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. Capstone evaluation tracker
create table if not exists public.capstone_evaluations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  all_lessons_completed boolean not null default false,
  scenarios_passed_count int not null default 0,
  overall_passed boolean not null default false,
  evaluated_at timestamptz default timezone('utc'::text, now()) not null,
  unique (user_id)
);

-- Link capstone to credentials
alter table public.credentials
  add column if not exists capstone_id uuid references public.capstone_evaluations(id);

-- 5. Row Level Security
alter table public.scenario_attempts enable row level security;
alter table public.capstone_evaluations enable row level security;

-- scenario_attempts RLS policies (using exact 0001_init roles)
drop policy if exists "Users can read own scenario attempts" on public.scenario_attempts;
create policy "Users can read own scenario attempts"
  on public.scenario_attempts for select
  using (auth.uid() = user_id);

drop policy if exists "Supervisors can view org scenario attempts" on public.scenario_attempts;
create policy "Supervisors can view org scenario attempts"
  on public.scenario_attempts for select
  using (
    exists (
      select 1 from public.profiles supervisor
      join public.profiles learner on learner.org_id = supervisor.org_id
      where supervisor.id = auth.uid()
        and supervisor.role in ('enterprise_admin', 'platform_admin')
        and learner.id = scenario_attempts.user_id
    )
  );

-- capstone_evaluations RLS policies
drop policy if exists "Users can view own capstone" on public.capstone_evaluations;
create policy "Users can view own capstone"
  on public.capstone_evaluations for select
  using (auth.uid() = user_id);

drop policy if exists "Supervisors can view org capstones" on public.capstone_evaluations;
create policy "Supervisors can view org capstones"
  on public.capstone_evaluations for select
  using (
    exists (
      select 1 from public.profiles supervisor
      join public.profiles learner on learner.org_id = supervisor.org_id
      where supervisor.id = auth.uid()
        and supervisor.role in ('enterprise_admin', 'platform_admin')
        and learner.id = capstone_evaluations.user_id
    )
  );

-- 6. Reconciled Supervisor Audit View with security_invoker = on
-- This ensures the view cannot be queried across organizations even with direct table exposure.
create or replace view public.supervisor_audit_view
with (security_invoker = on) as
select
  p.id as learner_id,
  p.full_name,
  p.org_id,
  coalesce(p.license_number, 'N/A') as license_number,
  p.role as user_role,
  coalesce(c.all_lessons_completed, false) as lessons_completed,
  coalesce(c.scenarios_passed_count, 0) as scenarios_passed_count,
  coalesce(c.overall_passed, false) as capstone_passed,
  cr.credential_code,
  coalesce(cr.ce_hours, 0.00) as ce_hours,
  cr.issued_at as certificate_issued_at
from public.profiles p
left join public.capstone_evaluations c on c.user_id = p.id
left join public.credentials cr on cr.user_id = p.id;