# The Human Aftermath™ — Next.js + Supabase MVP

Your interactive HTML course, rebuilt on the stack in the engineering brief (Next.js App Router, Supabase Postgres/Auth, Tailwind). All 8 modules, 65 lessons, 65 lesson checks, 16 field guides, 28 glossary terms and 6 claim labs were extracted from your HTML into `content/`.

## Setup (about 15 minutes, $0)
1. `npm install`
2. Create a free Supabase project. In the SQL editor, run `supabase/migrations/0001_init.sql`.
3. Copy `.env.example` to `.env.local` and fill it in. Generate the signing secret with `openssl rand -hex 32`.
4. `npm run seed` loads the curriculum. It prints the lesson count and minutes the database computed.
5. `npm run dev`, then sign up. To make yourself an admin, edit your row in `profiles` from the Supabase dashboard (the app blocks users from promoting themselves).
6. In Supabase > Authentication > Providers, enable Google and Azure (Microsoft) if you want those logins.
7. Push to GitHub, import into Vercel (Hobby), add the same four environment variables, deploy.

## What is built (brief Phases 1, 2, 3)
- Schema, roles, RLS on every table, seat-limit trigger, domain matching (`0001_init.sql`).
- Content graph: courses > modules > lessons, with answer keys in a table learners can never read.
- Course player with server-graded lesson checks, engaged-time logging, and progress that syncs across devices.
- Journals encrypted in the browser (AES-GCM, key from a passphrase only the learner knows).
- Credentials: random unambiguous IDs, HMAC-signed immutable records, one per learner, issued only after every lesson is complete, public `/verify/[code]` that re-checks the signature.

## Not built yet
- Phase 4 enterprise dashboard UI (the `org_roster` view, invites table and seat trigger exist; no pages or CSV import yet).
- Capstone scenario rubric engine. The prototype's scenario simulator is not ported; credentials currently require all lessons complete, with `capstone_score` left null.
- Field guides, glossary and claim labs pages (data is loaded and readable; no UI yet).
- Professional tier content split (all content is seeded as `public` until you decide which modules are professional).
- CE accreditation (ASWB ACE) needs an approved provider relationship; the platform only logs the timestamps and time-on-task.
- shadcn/ui is not installed; components use plain Tailwind. Add it later with `npx shadcn@latest init`.

## P0 checklist from the brief
| P0 item | Status |
|---|---|
| Lesson counts and durations | The prototype computes counts from its own data (65 lessons, 1,745 min, about 29 hours), and I found no hard-coded totals in the UI. The app now reads them from the `course_stats` view. Check any marketing copy elsewhere against 65 / 29 hours. |
| Quiz data integrity | Module 7, lessons 4 to 7 used a different quiz format than the rest. All 65 are now parsed into structured questions. |
| Certificate security | The prototype used `Math.random()` for the ID at render time (changes on every refresh) and had no completion check. Replaced with server-side issuance as described above. |
| WCAG contrast | New palette pairs are chosen for 4.5:1 or better and focus rings are visible. I did not render the old HTML, so I have not confirmed the specific dark-on-dark spots; run the new build through axe or Lighthouse. |
| Mobile overflow at 390px | Layouts use max-width and wrapping, with `overflow-x: hidden` as a backstop. Not yet tested on a device. |

## Known caveats
- I typechecked the code (`npm run typecheck` passes) but could not run it against a live Supabase project or run `next build` in my sandbox (no access to Google Fonts). Expect to fix small things on first run.
- A forgotten journal passphrase cannot be recovered. That is the point of the encryption, so the UI says so.

## Learning Lab (added)
Run `supabase/migrations/0002_learning_lab.sql`, then `npm run seed`. Activities live in `content/lab/*.json` and render at `/lab`.

| Type | What it is | Content loaded |
|---|---|---|
| Claim Lab | Accept, reject, or ask what research shows, then a more precise rewrite | Your 6 existing claims, ported verbatim |
| Sorting | Observation / interpretation / diagnosis / assumption | 1 new activity (8 statements) |
| What else could explain this? | Multi-select plausible explanations | 1 new activity |
| Scenario | Multi-step branching, scored on a rubric with a safety gate | 1 new child-welfare scenario, **draft, unpublished** |

Scenario scoring is rubric-based, not "pick the 10/10 answer": each choice has trade-offs across several skills, a safety gate fails the scenario regardless of other scores, and the server recomputes results from the choice path, so scores cannot be forged.

**Redesigned:** your 4 original simulator scenarios (workplace, public distress, explanation vs. excuse, classroom) are now 3-step scenarios in `content/lab/sim_scenarios.json`, with plausible-but-imperfect options, rubric trade-offs, and no polyvagal claims stated as fact. All are DRAFT and unpublished until reviewed by a licensed clinician plus an HR or education professional. `npm run validate:lab` checks graph integrity and that no more than 25% of random paths pass (currently 8 to 14%). Best answers are not always in the same position.
**Also not built:** Context Matrix, System Map, Lifespan timeline, Treatment Explorer, Full Circle, Evidence Compass challenges and "Build the fuller picture" in the new engine.
