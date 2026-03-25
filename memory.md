# Project Memory: Donation Closet / The Hub

Auto-maintained by Claude. Append key decisions, technical hurdles, and lessons learned after each session.

## Project Overview

- **Site:** The Hub — adaptive equipment resource center
- **Org:** United Spinal Association of Tennessee (USAT)
- **Contact:** (615) 669-1307 | usatnthehub@gmail.com | 955 Woodland St, Nashville, TN 37206
- **Tech:** Next.js 15 (App Router), Tailwind CSS 4, Supabase SSR, Framer Motion 12, Lucide, react-hook-form + Zod, CVA, clsx, tailwind-merge
- **Runtime:** bun
- **Deploy:** Fly.io (Docker standalone build) — scaffolded, pending live deploy
- **Status:** Website built, documentation initialized (2026-03-25)

## Decisions

- DEC-001: Three-file memory system adopted (2026-03-25)
- DEC-002: Tech stack finalized — Next.js 15 + Supabase + Framer Motion + react-hook-form + Zod (2026-03-25)
- DEC-003: Fly.io + Docker deployment target (2026-03-25)
- DEC-004: Tailwind v4 `@theme` block is the single source of truth for all design tokens (2026-03-25)
- DEC-005: Dual-layer animation — CSS keyframe utilities + Framer Motion (2026-03-25)
- DEC-006: All forms use react-hook-form + Zod + server actions (2026-03-25)
- DEC-007: Supabase SSR client uses lazy singleton to avoid Docker build-time crashes (2026-03-25)

See `docs/decisions.md` for full rationale on each decision.

## Technical Notes

- **Design tokens:** All tokens defined in `src/app/globals.css` under `@theme {}`. Available as Tailwind utilities (`bg-primary`, `font-display`) and `var(--color-primary)` in CSS.
- **Supabase:** `@supabase/ssr` for server-side auth. Lazy singleton client pattern guards against build-time env var absence.
- **Auth flow:** login / signup / forgot-password via Supabase SSR.
- **Inventory:** Mock data at `src/data/mock-inventory.ts`. Airtable integration stubbed.
- **Forms:** Server actions in `src/actions/`. Zod schemas colocated or in `src/lib/schemas/`.
- **RLS policies:** Supabase migrations in `supabase/migrations/`. Inventory visible to authenticated users only.
- **Animation layers:** CSS classes (`.animate-fade-in-up`, `.stagger-children`) in globals.css for simple cases; Framer Motion `motion.*` components for scroll-triggered and sequenced animations.
- **Fly.io:** Standalone Next.js build in Docker. Deploy workflow scaffolded at commit `59e8c0cca`.

## Lessons Learned

- Tailwind v4 `@theme` block is a cleaner single-source pattern than a parallel `design-tokens.ts` — skip the TypeScript token file when v4 is in use.
- Lazy Supabase singleton is non-negotiable for Docker builds — bare module-level client initialization crashes at `next build`.

## Sessions

### 2026-03-25
- Initialized three-file documentation system (memory.md, docs/brand-identity.md, docs/decisions.md)
- Read and verified all design tokens, typography, nav structure, domain data from source files
- Brand identity doc includes full domain data (equipment categories, conditions, statuses, urgency levels, requester roles, contact categories)
