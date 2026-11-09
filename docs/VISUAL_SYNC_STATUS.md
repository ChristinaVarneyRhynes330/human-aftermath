# ZIP visual-reference synchronization

## Purpose

Bring the GitHub repository into alignment with the supplied `human-aftermath-fixed (2).zip` without overwriting `main` before review. The ZIP is the source of truth for the current interface implementation. The accompanying five-color image is the current palette reference.

## Reference design tokens

- Blush: `#EACBD4`
- Peach: `#EDAE9D`
- Slate: `#617B8A`
- Mint/Sage: `#BBD4C5`
- Blue: `#3E6892`

Preserve the ZIP's dark editorial glass interface, navigation, module media center, complete HTML masterclass, interactive lessons, and Supabase-backed features.

## Key files that do not exist on current main

- `public/masterclass.html`
- `content/media_registry.json`
- `src/components/GlobalHeader.tsx`
- `src/components/CourseSidebar.tsx`
- `src/components/ModuleMediaCenter.tsx`
- `src/lib/content-fallback.ts`
- `src/app/courses/layout.tsx`
- `src/app/courses/[moduleNum]/page.tsx`

Other existing UI files, including `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/dashboard/page.tsx`, and `src/components/LessonRunner.tsx`, need replacement from the reference ZIP. Most curriculum JSON and Supabase migrations are unchanged and should be preserved.

## Integration workflow

1. Keep the archive's relative folder structure unchanged. Extract the ZIP before uploading; uploading the ZIP itself as a single file will not update the app.
2. Add the extracted contents to this `sync/zip-visual-reference-2026-11-09` branch, replacing matching paths.
3. Run `npm ci`, `npm run validate:lab`, `npm run typecheck`, `npm run build`.
4. Check home, dashboard, first/last lessons, recaps, /lab, /masterclass.html, mobile navigation and videos. Vimeo requires connectivity and playable permissions.
5. Open a PR against `main`; review the build and visual output before merging. Production deployment is separate from the GitHub commit.

## Content/source priority

For this visual sync, use the ZIP and five-color image as the visual authority. Older evergreen/bone/gold style-guide material is retained as project background, not imposed over the newer ZIP. Keep curriculum, pedagogy, and learner protections intact.

## Known nonblocking review items

- The reference's visible course label said 61 lessons; `content/curriculum.json` currently contains **65** (6+6+7+9+10+10+7+10). Correct the visible label.
- Add Blush `#EACBD4` as a named token, without recoloring the other reference screens.
- Existing course accreditation and certificate claims require independent review before commercial release.
- External media embedding and Supabase environment variables must be verified in the deployed environment.

This document records the process; its presence alone does not mean the ZIP has been uploaded to GitHub.
