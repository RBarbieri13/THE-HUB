# Decision Log

## DEC-001: Memory System
- **Date:** 2026-03-25
- **Decision:** Adopt three-file memory system (memory.md, decisions.md, brand-identity.md)
- **Rationale:** Mirrors FuelWell pattern for consistent project documentation across Robert's projects
- **Status:** ACTIVE

## DEC-002: Tech Stack
- **Date:** 2026-03-25
- **Decision:** Next.js 15 (App Router) + Tailwind CSS 4 + Supabase + Framer Motion + Lucide + react-hook-form + Zod
- **Rationale:** Consistent with FuelWell stack. Supabase for auth + DB. Framer Motion added for scroll animations and polish. CVA + clsx + tailwind-merge for utility-first component variants.
- **Status:** ACTIVE

## DEC-003: Deployment Target
- **Date:** 2026-03-25
- **Decision:** Docker + Fly.io (matching FuelWell pattern)
- **Rationale:** Standalone Next.js build in Docker, deployed to Fly.io for simplicity and cost. Fly.io deploy workflow and config already scaffolded (commit 59e8c0cca).
- **Status:** ACTIVE — deploy pending

## DEC-004: Design System Architecture
- **Date:** 2026-03-25
- **Decision:** CSS custom properties via Tailwind v4 `@theme` block as the single source of truth for all design tokens
- **Rationale:** Tailwind v4 `@theme` exposes tokens both as utility classes (e.g., `bg-primary`) and `var()` references. No separate design-tokens.ts needed — CSS is the token file.
- **Status:** ACTIVE

## DEC-005: Animation Strategy
- **Date:** 2026-03-25
- **Decision:** Dual-layer animation — CSS keyframe utilities in globals.css for simple transitions, Framer Motion for scroll-triggered and sequenced animations
- **Rationale:** CSS animations for lightweight hover/enter states; Framer Motion (`framer-motion@^12`) for `AnimatePresence`, scroll-based triggers, and stagger sequences
- **Status:** ACTIVE

## DEC-006: Form Handling
- **Date:** 2026-03-25
- **Decision:** react-hook-form + Zod + @hookform/resolvers for all forms, submitted via Next.js server actions
- **Rationale:** Type-safe validation at the boundary, minimal re-renders, server actions remove the need for a dedicated API layer for form submissions
- **Status:** ACTIVE

## DEC-007: Database Access Pattern
- **Date:** 2026-03-25
- **Decision:** Supabase SSR client with lazy singleton pattern to avoid build-time crashes in Docker
- **Rationale:** Docker standalone builds execute server code at build time; lazy initialization prevents crashes when env vars are not present at build
- **Status:** ACTIVE
