# The Human Aftermath — Media and Development Audit (November 9, 2026)

**Scope:** Code and supplied archive, public GitHub main commit `a39fdfec`, and source registries. The user supplied a Vimeo shared-folder URL for live verification, but Vimeo prevented programmatic access to the folder and player pages; therefore **no videos are certified as playable** by this audit. Do not confuse registered IDs with playback verification.

## Inventory
- Course content: 8 modules, **65** lessons and 65 lesson-level quiz definitions in `content/curriculum.json`.
- Video registry: **19 Vimeo IDs**: 8 module masterclasses, 8 default recaps + 1 additional Module 6 recap, 1 Module 7 bonus cut, 1 home-page trailer.
- Audio podcast: **restored to the GitHub source (Nov. 9 addendum)**. The verified 39:19.6 recording is now available as a 28.3 MB web MP3, reassembled automatically from 19 tracked segments before dev/build. The `/masterclass.html` response points to the generated static MP3. Audio assembly/checksum and CI build passed; actual playback on the deployment still needs browser QA. See `docs/AUDIO_ASSET.md`.
- Download resources: `The_Human_Aftermath.pdf`, `The_Human_Aftermath_Course_eBook.pdf`, and `The_Human_Aftermath_Infographic_Atlas.pdf` are linked but absent from the project. The standalone MP4 trailer fallback is absent too; the trailer has a Vimeo iframe.
- The 15-slide image display is embedded in the HTML; absence of PDF downloads does not mean the slides are absent.
- Original course HTML is reconstructed byte-for-byte from 19 source segments at `/masterclass.html` and GitHub verifies the assembled integrity.

## Vimeo ID audit

| Module | Video | ID | Status |
|---|---|---|---|
| 1 | Masterclass | `1244519972` | Registered; playback not independently verified |
| 1 | Recap | `1244519651` | Registered; playback not independently verified |
| 2 | Masterclass | `1244519928` | Registered; playback not independently verified |
| 2 | Recap | `1244519650` | Registered; playback not independently verified |
| 3 | Masterclass | `1244519918` | Registered; playback not independently verified |
| 3 | Recap | `1244519603` | Registered; playback not independently verified |
| 4 | Masterclass | `1244519860` | Registered; playback not independently verified |
| 4 | Recap | `1244519618` | Registered; playback not independently verified |
| 5 | Masterclass | `1244519709` | Registered; playback not independently verified |
| 5 | Recap | `1244519617` | Registered; playback not independently verified |
| 6 | Masterclass | `1244519839` | Registered; playback not independently verified |
| 6 | Recap | `1244519605` | Registered; playback not independently verified |
| 6 | Additional recap | `1244519601` | Registered; playback not independently verified |
| 7 | Masterclass | `1244519700` | Registered; playback not independently verified |
| 7 | Recap | `1244519604` | Registered; playback not independently verified |
| 7 | Bonus | `1244519699` | Registered; playback not independently verified |
| 8 | Masterclass | `1244519697` | Registered; playback not independently verified |
| 8 | Recap | `1244527908` | Registered; playback not independently verified |
| Course | Trailer | `1244519666` | Registered in homepage/masterclass; playback not independently verified |

**Results:** 19 entries; 19 unique IDs. The ID format and registry connections are confirmed in source, but title/duration matching and actual stream accessibility could not be checked. The source `ModuleMediaCenter` constructs URLs using only `https://player.vimeo.com/video/<id>`. Vimeo **unlisted videos** require a privacy `h=` parameter in the iframe URL. Vimeo domain-specific embed rules can also block playback even if a shared folder is viewable. Exact embed code must come from each video's Share → Embed option. Confirm per-video: title, duration, content, captions, embed privacy and the `?h=` value (if applicable).

## Playback QA checklist (not yet verified)

- [ ] Shared Vimeo folder contains the expected 19 videos (or an approved mapping explaining differences)
- [ ] Videos play from the real deployed site while signed out (where permitted) and signed in
- [ ] Masterclasses 1–8 load, can be paused, scrubbed, seeked, and replayed
- [ ] Recaps 1–8 load, with both 6A and 6B available
- [ ] Bonus Evidence Compass video (Module 7) loads
- [ ] Trailer loads
- [ ] Vimeo video titles/content and durations match registry
- [ ] Vimeo privacy hashes and allowed embed domains are configured correctly
- [ ] Captions and full transcripts exist for required videos
- [ ] Keyboard, screen-reader, mobile and reduced-motion checks completed
- [x] 39:20 podcast restored to application build as verified MP3 (live browser playback remains unverified)
- [ ] The three missing PDF downloads exist and are clickable

## Engineering readiness

| Area | Status | Evidence / risk |
|---|---|---|
| Build | **Pass** | GitHub Actions `Verify Build & Simulation Lab`, run 42620531860, commit `a39fdfec`, succeeded |
| Visual source sync | Implemented | ZIP design transferred to main, including navigation, dashboard, lesson runner and all-in-one HTML |
| Curriculum | Implemented as source content | 8 modules / 65 lessons present in JSON; instructional accuracy and end-to-end learner QA not independently certified |
| Quizzes and labs | Implemented, needs scenario QA | Scenario validator checks graphs, not every instructional or user-experience outcome; earlier QA identified a scenario with zero passing routes |
| Videos | Integrated in code, **unverified live** | 19 ID references; no proof of user playback; possible unlisted hash/domain restrictions |
| Audio | **Implemented; live QA required** | Verified MP3 assembled and served as static build asset; source M4A archived separately |
| Downloads | **Blocked** | Three referenced PDF files absent |
| Transcripts | Incomplete | Module media center originally labeled chapter summaries as "Verified Synthesis Transcript"; this branch clarifies it is a summary, not a transcript |
| Account/progress | Partly implemented | Supabase auth and progress are present, but `completeLesson` reports `ok: true` even when storage fails; live persistence unverified |
| Certificates | **Not release-ready** | `issueCredential` can issue a code without verifying course completion; issuance fields and verification lookup/signature code are not aligned. Do not market as independently verifiable until corrected |
| Accessibility | Partly designed | Some skip controls and ARIA; full keyboard, captions, screen reader and mobile QA outstanding |
| Production environment | Not verified | No matching project was found through the connected Vercel account; cannot claim deployed website works |
| Commerce and learner support | Not verified/unfinished | No demonstrated checkout, sales funnel, refund/admin support workflow or production monitoring |

## Priority order

1. **P0 playback integrity:** Confirm the 39:20 podcast loads and seeks on the real deployed domain; obtain exact Vimeo iframe embed codes (including privacy hashes when present) and verify every video in a browser.
2. **P0 course integrity:** Make certificates conditional on verified learner completion, reconcile issuance/verification schema, and ensure server-side writes return truthful success/failure.
3. **P1 deliverables:** Upload/rebuild the three named PDF files, expose accessible transcripts/captions, and ensure video chapters work or are clearly labeled as chapter guides.
4. **P1 learner QA:** Test mobile and desktop, signed-in/out flows, persistence, all 65 lesson links, 19 video selectors, lab outcomes, and fallback routes.
5. **P2 commercialization:** Connect verified production hosting, checkout/payment, email/onboarding, analytics, security/access rules and operational monitoring.

This is an engineering/media **audit**, not a clinical fact-check, accreditation audit, or proof of live platform functionality.
