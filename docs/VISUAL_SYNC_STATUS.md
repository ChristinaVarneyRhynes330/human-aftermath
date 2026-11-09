# Visual synchronization — 2026-11-09

The approved ZIP visual-reference application is now uploaded to the review branch
`sync/zip-visual-reference-2026-11-09`.

## Implemented
- Homepage, header, sidebar, dashboard, lesson runner, module-specific route, media
  center, lab view, content fallback and updated action flows all match the ZIP.
- The five-color palette is available, including Blush `#EACBD4`.
- Visible lesson count corrected to 65, matching curriculum JSON.
- The full standalone `public/masterclass.html` from the ZIP is preserved **byte-for-byte**
  in 19 ordered `src/masterclass-parts/*.txt` source files due to connector file-size limits.
  It is served from `/masterclass.html` by `src/app/masterclass.html/route.ts`.
  The build is configured to trace these assets for deployment.
- `scripts/verify-masterclass.mjs` verifies the original Git object SHA
  (`ae2ff2c710e5a27aea261a861fe74ebc643e7ddc`).
- The GitHub Actions PR workflow installs dependencies, verifies the masterclass,
  validates learning scenarios, and builds Next.js.

## Preserved
Existing curriculum, learning-lab datasets, certificate logic, login, Supabase
migrations, and protected routes remain intact.

## Remaining before production
Review the GitHub Actions PR checks, verify rendered pages at desktop/mobile sizes,
confirm Supabase settings and remote Vimeo media, and assess the learning-simulator
scenario reported to lack a passing route. Production deployment is a separate step.
