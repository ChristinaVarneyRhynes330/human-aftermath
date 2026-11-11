/**
 * Phase 1 source-surface smoke test. Validates route structure and source-level
 * release gates. It does NOT certify a deployed URL or a real signup transaction.
 */
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(path, 'utf8');
const required = [
  'src/app/page.tsx',
  'src/app/api/waitlist/route.ts',
  'src/app/starter-kit/page.tsx',
  'src/app/privacy/page.tsx',
  'src/components/WaitlistForm.tsx',
  'src/components/PrintGuideButton.tsx',
  'src/app/course-preview/page.tsx',
  'supabase/migrations/20261110171000_phase1_waitlist.sql',
];
required.forEach(p => assert(existsSync(p), 'Missing Phase 1 file: ' + p));
const home = read('src/app/page.tsx');
const middleware = read('src/middleware.ts');
const api = read('src/app/api/waitlist/route.ts');
const sql = read('supabase/migrations/20261110171000_phase1_waitlist.sql');
assert(home.includes('WaitlistForm') && home.includes('/starter-kit'), 'Landing page lacks lead capture/free guide');
assert(home.includes('Humanity Studies') && home.includes('The Wound Concealed'), 'Course identity missing from public page');
assert(home.includes('Trauma Literacy.') && home.includes('Transforming Humanity.'), 'Course tagline missing');
assert(home.includes('academy—whose name has not yet been selected'), 'Academy must not be presented as the course brand');
assert(!home.includes('The Human Aftermath'), 'Old course brand must not appear on Phase 1 landing page');
assert(read('src/components/GlobalHeader.tsx').includes('HUMANITY STUDIES'), 'Public navigation identity missing');
assert(read('src/app/starter-kit/page.tsx').includes('Humanity Studies'), 'Starter guide identity missing');
assert(read('src/app/privacy/page.tsx').includes('Humanity Studies'), 'Privacy notice identity missing');
assert(read('src/components/InnerExperienceArt.tsx').includes('viewBox="0 0 620 710"'), 'Original hero illustration missing');
assert(!home.includes('href="/masterclass.html"'), 'Do not link full masterclass on public Phase 1 page');
assert(middleware.includes("COURSE_ACCESS_OPEN !== 'true'"), 'Learner gate must be closed by default');
assert(middleware.includes("'/masterclass.html'"), 'Full masterclass route must be gated');
assert(middleware.includes("'/How_Trauma_Recalibrates_Your_Nervous_System_web.mp3'"), 'Full podcast URL must be gated');
assert(middleware.includes("'/login'"), 'Self enrollment must be closed in Phase 1');
assert(api.includes("WAITLIST_ENABLED !== 'true'"), 'Signup should be disabled until production configured');
assert(api.includes('marketing_consent_at'), 'Signup must record consent');
assert(sql.includes('enable row level security') && sql.includes('revoke all on table public.launch_waitlist'), 'Waitlist must not be exposed to visitors');
console.log('Phase 1 source checks passed. Still requires actual deployment, signup and access-denial browser QA.');
