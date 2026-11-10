-- Phase 1 launch waitlist: server-only insert; never expose email list to site visitors.
create table if not exists public.launch_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'phase1-landing',
  marketing_consent_at timestamptz not null,
  privacy_version text not null default '2026-11-10',
  created_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  email_verified_at timestamptz,
  check (length(email) between 5 and 254),
  check (email = lower(btrim(email))),
  check (length(source) <= 60)
);
alter table public.launch_waitlist enable row level security;
revoke all on table public.launch_waitlist from anon, authenticated;
grant select, insert, update on table public.launch_waitlist to service_role;
create index if not exists launch_waitlist_created_at_idx
  on public.launch_waitlist (created_at desc);
comment on table public.launch_waitlist is 'Phase 1 consented course launch email signups. Only server-side service-role access; no anonymous API access.';
