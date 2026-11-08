The Human Aftermath™ — Multi-Track Platform

An evidence-informed learning platform that moves beyond trauma pathologization toward practical literacy, relational stewardship, and workforce resilience.

Status & Accreditation Notice

IMPORTANT NOTICE:

The curriculum and simulator scenarios are current prototypes and drafts. They have not yet received formal Continuing Education (CE) provider approval from accreditation bodies (such as ASWB ACE or APA). A formal review by licensed mental health clinicians, HR professionals, and legal counsel is required prior to public or institutional deployment.

Tech Stack

Framework: Next.js 15 (App Router, Server Actions)

Database: Supabase (PostgreSQL with Row Level Security)

Language: TypeScript

Styling: Tailwind CSS

Architecture & Features

Multi-Track System:

Public / Community Track: Accessible trauma literacy and peer witnessing tools.

Professional Track: Frontline workforce competencies (e.g., child welfare, healthcare).

Multi-Step Simulator Scenarios:

Evaluates trade-offs across 4 skills: respect, offering choices/agency, boundaries, and clear expectations.

Built-in fatal safety gates for confidentiality violations or unfulfillable promises.

Programmatic path validation (npm run validate:lab).

Enterprise & Supervisor Compliance Export:

CSV export for organization supervisors at /api/employer/audit-export.

Formula-injection sanitized and scoped strictly to organization members.

Local Setup

Copy .env.example to .env.local:

cp .env.example .env.local


Install dependencies:

npm install


Run lab validator and build:

npm run validate:lab
npm run build


Run locally:

npm run dev
