# Humanity Studies: The Wound Concealed — Phase 1 launch kit
**Prepared:** November 10, 2026  
**Release:** Public introduction + free educational guide + voluntary email waitlist. **NOT** paid enrollment or access to the unfinished learner course.

## Course identity and academy distinction
**Signature course:** Humanity Studies: The Wound Concealed. **Tagline:** Trauma Literacy. Transforming Humanity. **Guiding philosophy:** Understand More. Assume Less.

The concealed wound refers to psychological pain that forms within experience and cannot be treated with conventional physical wound care. This is **not** a claim that every human behavior stems from trauma. The academy is a separate future vision whose name has not been finalized.

## Product promise (approved source-aligned language)
**Headline:** Understand More. Assume Less.  
**Short positioning:** A multidisciplinary educational experience exploring trauma, adaptation, connection and recovery across the human experience.  
**Supporting statement:** No single lens tells the whole story. Explore neuroscience, psychology, development, context, relationships and lived experience with evidence-aware curiosity rather than quick diagnoses.

**Ethical scope:** Educational material, not psychotherapy, crisis service, individual diagnosis, professional licensure, or accredited continuing education. Do not imply that the course is already complete, approved, accredited or open for purchase. No personal trauma disclosure is needed.

## What Phase 1 visitors receive
- A redesigned public course landing page at \`/\`.
- A free, printable 5-section **Human Literacy Starter Guide** at \`/starter-kit\`; users can Print / Save as PDF without giving their email.
- A course architecture preview (8 modules and planned 65 lessons), clearly marked as in development.
- Voluntary, explicit-consent early-access waitlist.
- Transparent privacy notice at \`/privacy\`.
- Learner routes, full masterclass and full podcast closed by default via \`COURSE_ACCESS_OPEN=false\`.

**Do not describe a signup as email-verified**: address ownership is not verified by the current endpoint.

## Production deployment and waitlist setup (MUST finish before public advertising)
1. Select and verify the intended deployment account, project and launch domain. Vercel was not visible in the currently connected account at preparation time. Connecting a production host is an outstanding external step.
2. Configure **secrets in host settings, never in GitHub**:
   - \`NEXT_PUBLIC_SUPABASE_URL\` = actual connected project URL
   - \`NEXT_PUBLIC_SUPABASE_ANON_KEY\` = public publishable/anon key compatible with current code
   - \`SUPABASE_SERVICE_ROLE_KEY\` = server-only restricted secret, not exposed to browsers or printed in logs
   - \`COURSE_ACCESS_OPEN=false\`
   - \`WAITLIST_ENABLED=false\` while preparing
   - \`PUBLIC_CONTACT_EMAIL\` = dedicated business contact that receives privacy/deletion requests
3. Verify the \`launch_waitlist\` migration exists in the target Supabase project, RLS is enabled, and \`anon\` / \`authenticated\` have no table privileges. Check that only the backend service client can insert.
4. Configure Cloudflare Turnstile (required in the current signup endpoint) and allow the verified launch domain in its settings. The browser renders the widget and the server validates the response with the secret key. Consider additional hosting-layer rate limiting for sustained public traffic; the current endpoint also uses validation and a honeypot but does not independently rate-limit by IP.
5. Configure newsletter/email sending (e.g. dedicated email platform with verified sender and unsubscribe links). The repository does **not** yet contain an automated email campaign or double opt-in. Do not promise an automated confirmation email until one is delivered and tested.
6. Test with a disposable email on a real deployment: valid signup, invalid email, missing consent, duplicate signup, failure response, mobile keyboard, screen readers, privacy link, insert verification via Supabase.
7. Confirm \`/masterclass.html\`, \`/How_Trauma_Recalibrates_Your_Nervous_System_web.mp3\`, \`/login\`, \`/courses/1/m1_l1\`, \`/lab\` all redirect away while \`COURSE_ACCESS_OPEN=false\`.
8. Verify the actual domain has HTTPS, proper SEO metadata, correct contact address, and a working \`/starter-kit\` with Print / Save as PDF.
9. After all checks, set \`WAITLIST_ENABLED=true\` and redeploy. Confirm a new signup is persisted and doesn't expose other people's email addresses.
10. Keep **\`COURSE_ACCESS_OPEN=false\`** during the entire Phase 1 public period. Learner accounts/entitlements/certificates are a separate launch gate.

## Launch publication copy (ready to adapt)

**Announcement — short**
> **Understand more. Assume less.**  
> Humanity Studies: The Wound Concealed is taking shape: a new educational experience about trauma, adaptation, connection and what it means to meet human complexity with care.  
> The free Human Literacy Starter Guide is available now. Explore the guide and join the early-access list for future learning invitations.  
> [Insert verified public URL]  
> This is education, not therapy or diagnosis. No personal story required.

**Announcement — long**
> What if we stopped assuming we knew the reason behind every human response?  
> Humanity Studies: The Wound Concealed explores a different way of learning—one that considers biology, memory, development, relationships, culture, environment, and the limits of any single explanation.  
> While the full interactive course is being completed, we're opening the first chapter of the experience: a free, printable Human Literacy Starter Guide.  
> You can explore it without an account and without sharing anything personal. If you'd like updates on the foundational course, join our voluntary invitation list.  
> [Insert verified public URL]

**Landing-page meta summary**
> Humanity Studies: The Wound Concealed — Understand More. Assume Less. Explore the free Human Literacy Starter Guide and join the early-access list for our forthcoming multidisciplinary foundational course.

## Suggested email sequence (COPY ONLY — not activated)

**Email 1: Welcome (after your email provider is configured and consent confirmed)**  
**Subject:** Your first step toward human literacy  
Thank you for your interest in Humanity Studies: The Wound Concealed. We're building an educational space devoted to better questions, richer context, and more responsible ways of understanding human experience.  
Your free starter guide is available here: [verified starter-guide link]. You can use it privately, print it, or simply read and reflect. No disclosure is required.  
We'll share thoughtful updates as the course takes shape. You can unsubscribe using the link in any email.

**Email 2: What makes this different (several days later)**  
**Subject:** What do we actually know about a person's response?  
A behavior can be real and observable without revealing its cause. We can know that someone withdrew from a conversation without knowing whether they were exhausted, distracted, worried, overwhelmed, or simply taking time to think.  
Humanity Studies: The Wound Concealed uses the Event–Experience–Response distinction to help learners practice curiosity without making unsupported assumptions.  
If you haven't explored the free guide yet: [verified starter-guide link].

**Email 3: Future learning invitation (only when beta readiness is independently verified)**  
**Subject:** An invitation to help shape Humanity Studies: The Wound Concealed  
We're preparing a limited private learning pilot. Participants will help us test clarity, navigation, educational activities and overall learner experience.  
If you're interested, review the pilot details and voluntary participation requirements here: [verified application link]. No personal trauma history or diagnostic information is required.  
Please note that pilot learning is distinct from a completed commercial course and credentials are not issued until verified systems are ready.

Before any marketing email is sent, ensure sender identification, a functioning opt-out method, suppression of unsubscribed addresses, accurate subject lines, and the other required policies of the intended sending platform and jurisdictions.

## Phase 1 marketing measurement
- Public site is accessible and readable on mobile.
- Starter guide is usable online and printable.
- Genuine signups are saved in the restricted database.
- Visitors can unsubscribe or request deletion through a published business contact/mailing system.
- Instrument privacy-conscious events only after a consent / analytics decision: page view, starter-guide use and successful signup (do **not** log email as an analytics event).
- Weekly review: landing visits, guide opens, valid waitlist signups, unsubscribes, bounce rate, support reports.
- Never fabricate testimonials, enrollment numbers, outcomes, accreditations or endorsements.

## Out-of-scope by design
- Paid enrollment and checkout.
- Full-course access for the public.
- Course certificates, CE/CPD accreditation claims or professional authorization.
- Public access to clinical/child-welfare draft scenarios.
- Automatic marketing email campaigns until an approved email provider is connected.
- Claims that Vimeo content has been live playback-tested.

## Signoff checklist
- [ ] GitHub Phase 1 PR merged after successful build.
- [x] Source-level public marketing page / free guide / privacy notice / waitlist backend implemented on a review branch.
- [x] Supabase launch waitlist table created with RLS and no direct client role permissions.
- [ ] Production hosting and domain verified.
- [ ] Public contact email and privacy notice finalized.
- [ ] Anti-spam mitigation evaluated and configured.
- [ ] Email provider, unsubscribe workflow and consent records verified.
- [ ] Production waitlist enabled; real signup, duplicate, errors and deletion tested.
- [ ] Protected course and podcast blocked on deployed site.
- [ ] Desktop, phone, keyboard, print and accessibility spot checks passed.
- [ ] Public release explicitly approved.

**Definition of Phase 1 Done:** The public site and free guide are live, the consented waitlist works, privacy and opt-out channels are real, and unreleased learner features remain inaccessible.
