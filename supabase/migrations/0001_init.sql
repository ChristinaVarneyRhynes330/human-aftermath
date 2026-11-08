-- The Human Aftermath: core schema (Phase 1) + credentialing (Phase 3) + enterprise (Phase 4)
-- Run in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists pgcrypto;

-- ───────── Roles & profiles ─────────
create type public.app_role as enum
  ('public_learner','professional_learner','enterprise_admin','platform_admin');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email_domain text,                       -- for domain matching on signup
  seat_limit int not null default 0 check (seat_limit >= 0),
  created_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'public_learner',
  org_id uuid references public.organizations(id) on delete set null,
  created_at timestamptz not null default now()
);

-- Helper functions used by RLS (security definer avoids recursive policy checks)
create or replace function public.current_role_name() returns public.app_role
language sql stable security definer set search_path = public as
$$ select role from public.profiles where id = auth.uid() $$;

create or replace function public.current_org() returns uuid
language sql stable security definer set search_path = public as
$$ select org_id from public.profiles where id = auth.uid() $$;

-- Profiles: users cannot promote themselves. Role/org changes go through the service role.
create or replace function public.protect_profile_columns() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is not null and public.current_role_name() <> 'platform_admin' then
    new.role := old.role;
    new.org_id := old.org_id;
  end if;
  return new;
end $$;
create trigger trg_protect_profile before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- Auto-create profile on signup (+ domain matching to an organization)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
declare matched uuid;
begin
  select id into matched from public.organizations
   where email_domain is not null
     and lower(split_part(new.email,'@',2)) = lower(email_domain)
     and (select count(*) from public.profiles p where p.org_id = organizations.id) < seat_limit
   limit 1;
  insert into public.profiles (id, full_name, org_id, role)
  values (new.id, new.raw_user_meta_data->>'full_name', matched,
          case when matched is null then 'public_learner'::public.app_role
               else 'professional_learner'::public.app_role end);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────── Curriculum content graph ─────────
create type public.audience as enum ('public','professional');

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  audience public.audience not null default 'public',
  published boolean not null default false
);

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  num int not null,
  title text not null,
  intro text,
  audience public.audience not null default 'public',
  unique (course_id, num)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  slug text unique not null,               -- e.g. m1_l1 (stable ID from the prototype)
  position int not null,
  title text not null,
  minutes int not null check (minutes > 0),
  body jsonb not null,                     -- objectives, hook, script, evidence, terms, example, misconception, reflection, takeaways
  unique (module_id, position)
);

-- Correct answers live in a separate table that learners can NEVER select directly.
create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  position int not null default 1,
  prompt text not null,
  options jsonb not null                   -- {"A": "...", "B": "..."}
);
create table public.quiz_answer_keys (
  question_id uuid primary key references public.quiz_questions(id) on delete cascade,
  correct text not null check (correct in ('A','B','C','D')),
  explanation text
);

create table public.field_guides (id text primary key, num text, title text, subtitle text, module text, summary text, content text);
create table public.glossary_terms (term text primary key, category text, definition text);
create table public.claim_labs (id text primary key, claim text, myth text, right_view text, overreach text, evidence text, rewrite text, tier text);

-- Live count view: the single source of truth for "N lessons / N hours" (P0 #1)
create view public.course_stats with (security_invoker = true) as
select c.id as course_id,
       count(l.id)::int as lesson_count,
       coalesce(sum(l.minutes),0)::int as total_minutes
from public.courses c
left join public.modules m on m.course_id = c.id
left join public.lessons l on l.module_id = m.id
group by c.id;

-- ───────── Learner state ─────────
create table public.user_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  completed_at timestamptz,
  active_seconds int not null default 0,   -- CE evidence: engaged time
  first_opened_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Journal entries are encrypted in the browser; the server only stores ciphertext.
create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete set null,
  ciphertext text not null,
  iv text not null,
  updated_at timestamptz not null default now()
);

create table public.user_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  theme text not null default 'bone',
  font_size text not null default 'normal',
  reduced_motion boolean not null default false
);

-- ───────── Assessment & credentialing (Phase 3) ─────────
create table public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id),
  kind text not null check (kind in ('lesson_quiz','capstone_scenario')),
  responses jsonb not null,
  score numeric(5,2) not null check (score between 0 and 100),
  passed boolean not null,
  created_at timestamptz not null default now()
);

create table public.credentials (
  id uuid primary key default gen_random_uuid(),
  credential_code text unique not null,    -- public, human-readable: HA-XXXX-XXXX-XXXX
  signature text not null,                 -- HMAC-SHA256 over the immutable record
  user_id uuid not null references auth.users(id),
  course_id uuid not null references public.courses(id),
  learner_name text not null,
  total_minutes int not null,
  capstone_score numeric(5,2),
  issued_at timestamptz not null default now(),
  revoked_at timestamptz,
  unique (user_id, course_id)              -- one credential per learner per course
);

-- Immutability: issued credentials cannot be edited (only revoked via service role)
create or replace function public.credentials_immutable() returns trigger
language plpgsql as $$
begin
  if (new.credential_code, new.signature, new.user_id, new.course_id, new.learner_name,
      new.total_minutes, new.capstone_score, new.issued_at)
     is distinct from
     (old.credential_code, old.signature, old.user_id, old.course_id, old.learner_name,
      old.total_minutes, old.capstone_score, old.issued_at) then
    raise exception 'credentials are immutable';
  end if;
  return new;
end $$;
create trigger trg_credentials_immutable before update on public.credentials
  for each row execute function public.credentials_immutable();

-- Public verification: returns only non-sensitive fields, by code only.
create or replace function public.verify_credential(code text)
returns table (credential_code text, learner_name text, course_title text,
               issued_at timestamptz, total_minutes int, revoked boolean)
language sql stable security definer set search_path = public as $$
  select c.credential_code, c.learner_name, co.title, c.issued_at, c.total_minutes,
         c.revoked_at is not null
  from public.credentials c join public.courses co on co.id = c.course_id
  where c.credential_code = upper(trim(code))
$$;
grant execute on function public.verify_credential(text) to anon, authenticated;

-- ───────── Enterprise (Phase 4) ─────────
create table public.org_invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  status text not null default 'pending' check (status in ('pending','accepted','revoked')),
  created_at timestamptz not null default now(),
  unique (org_id, email)
);

create view public.org_roster with (security_invoker = false) as
select p.id as user_id, p.full_name, p.org_id,
       count(up.completed_at)::int as lessons_completed,
       max(cr.issued_at) as credential_issued_at
from public.profiles p
left join public.user_progress up on up.user_id = p.id
left join public.credentials cr on cr.user_id = p.id and cr.revoked_at is null
where p.org_id = public.current_org()
  and public.current_role_name() in ('enterprise_admin','platform_admin')
group by p.id, p.full_name, p.org_id;

-- ───────── Row Level Security ─────────
alter table public.organizations      enable row level security;
alter table public.profiles           enable row level security;
alter table public.courses            enable row level security;
alter table public.modules            enable row level security;
alter table public.lessons            enable row level security;
alter table public.quiz_questions     enable row level security;
alter table public.quiz_answer_keys   enable row level security;  -- no policies = no client access
alter table public.field_guides       enable row level security;
alter table public.glossary_terms     enable row level security;
alter table public.claim_labs         enable row level security;
alter table public.user_progress      enable row level security;
alter table public.journal_entries    enable row level security;
alter table public.user_preferences   enable row level security;
alter table public.assessment_attempts enable row level security;
alter table public.credentials        enable row level security;
alter table public.org_invites        enable row level security;

create policy "own profile read"   on public.profiles for select using (id = auth.uid());
create policy "own profile update" on public.profiles for update using (id = auth.uid());
create policy "org admins read org profiles" on public.profiles for select
  using (org_id = public.current_org() and public.current_role_name() in ('enterprise_admin','platform_admin'));

create policy "org members read own org" on public.organizations for select using (id = public.current_org());

-- Content: public-audience content is readable by any signed-in learner; professional needs the role.
create policy "read published courses" on public.courses for select to authenticated using (published);
create policy "read modules by tier" on public.modules for select to authenticated using (
  audience = 'public' or public.current_role_name() in ('professional_learner','enterprise_admin','platform_admin'));
create policy "read lessons by tier" on public.lessons for select to authenticated using (
  exists (select 1 from public.modules m where m.id = module_id and (
    m.audience = 'public' or public.current_role_name() in ('professional_learner','enterprise_admin','platform_admin'))));
create policy "read quiz prompts" on public.quiz_questions for select to authenticated using (
  exists (select 1 from public.lessons l where l.id = lesson_id));
create policy "read field guides" on public.field_guides for select to authenticated using (true);
create policy "read glossary"     on public.glossary_terms for select to authenticated using (true);
create policy "read claim labs"   on public.claim_labs for select to authenticated using (true);

create policy "own progress"    on public.user_progress     for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own journal"     on public.journal_entries   for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own prefs"       on public.user_preferences  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own attempts read" on public.assessment_attempts for select using (user_id = auth.uid());
-- Attempts and credentials are INSERTED only by server code using the service role.
create policy "own credentials read" on public.credentials for select using (user_id = auth.uid());
create policy "org admins read org credentials" on public.credentials for select using (
  public.current_role_name() in ('enterprise_admin','platform_admin')
  and exists (select 1 from public.profiles p where p.id = user_id and p.org_id = public.current_org()));
create policy "org admins manage invites" on public.org_invites for all
  using (org_id = public.current_org() and public.current_role_name() in ('enterprise_admin','platform_admin'))
  with check (org_id = public.current_org() and public.current_role_name() in ('enterprise_admin','platform_admin'));

-- Seat limit enforcement
create or replace function public.enforce_seat_limit() returns trigger
language plpgsql security definer set search_path = public as $$
declare used int; lim int;
begin
  if new.org_id is not null and (old.org_id is distinct from new.org_id) then
    select seat_limit into lim from public.organizations where id = new.org_id;
    select count(*) into used from public.profiles where org_id = new.org_id and id <> new.id;
    if used >= lim then raise exception 'No seats available for this organization'; end if;
  end if;
  return new;
end $$;
create trigger trg_seat_limit before update on public.profiles
  for each row execute function public.enforce_seat_limit();
