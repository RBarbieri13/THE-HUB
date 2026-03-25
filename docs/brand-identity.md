# The Hub — Brand Identity & Visual Theme

> **Purpose:** Visual identity reference for The Hub website (United Spinal Association of Tennessee).

---

## Brand Overview

- **Site Name:** The Hub
- **Organization:** United Spinal Association of Tennessee (USAT)
- **Mission:** Helping Tennesseans with spinal cord injuries and related mobility disabilities access refurbished wheelchairs, adaptive equipment, and supplies at no cost.
- **Location:** 955 Woodland St, Nashville, TN 37206
- **Phone:** (615) 669-1307
- **Email:** usatnthehub@gmail.com

## Color Palette

| Token | Hex | Role |
|---|---|---|
| Primary | `#40D9F1` | Brand blue — headers, nav bar, links, info |
| Primary Dark | `#1E899D` | Hover states, active nav, focus rings |
| Accent | `#EE732F` | Orange — CTAs, donate button, warmth |
| White | `#FFFFFF` | Page background |
| Off-White | `#F4F4F4` | Alternate section backgrounds |
| Dark | `#222222` | Dark backgrounds, footers |
| Black | `#000000` | True black (rare use) |
| Text Primary | `#333333` | Headings |
| Text Body | `#444444` | Body copy |
| Text Light | `#999999` | Muted/placeholder text |
| Donate Red | `#CC0000` | Urgency, donate emphasis |
| Donate Border | `#FFBF00` | Donate button border accent |
| Info | `#40D9F1` | Informational states (same as primary) |
| Success | `#28A745` | Form success, available status |
| Warning | `#F0AD4E` | Pending status, caution |
| Error | `#DC3545` | Form errors, unavailable status |

## Typography

| Role | Font Stack | Weights | Usage |
|---|---|---|---|
| Display | Montserrat, Source Sans Pro, sans-serif | 600, 700 | Hero headlines, impact numbers |
| Heading | Source Sans Pro, Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif | 400, 600, 700 | Section headings, nav items |
| Body | Source Sans Pro, Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif | 400, 600, 700 | Labels, descriptions, form elements |
| Paragraph | Roboto, sans-serif | 300, 400, 500, 700 | Body text, base document font |

### Type Scale (base: 17px body)

| Element | Size | Weight | Line Height |
|---|---|---|---|
| h1 | 2.25rem (36px) | 700 | 1.2 |
| h2 | 1.875rem (30px) | 700 | 1.25 |
| h3 | 1.5rem (24px) | 600 | 1.3 |
| h4 | 1.25rem (20px) | 600 | 1.35 |
| h5 | 1.0625rem (17px) | 600 | 1.4 |
| h6 | 0.875rem (14px) | 700 | 1.4 |
| Body | 17px | 400 | 1.65 |
| Label | 14px | 600 | — |
| Form input | 16px | 400 | — |

## Spacing System

4px base unit. Tokens `--space-1` through `--space-16` (4px to 64px in 4px steps).

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-none` | 0px | Flat/flush elements |
| `--radius-sm` | 3px | Default — inputs, buttons |
| `--radius-md` | 6px | Cards, panels |
| `--radius-lg` | 12px | Larger containers, modals |
| `--radius-full` | 9999px | Pills, badges, circular avatars |

## Shadows

| Token | Usage |
|---|---|
| `--shadow-sm` | Subtle lift — default interactive state |
| `--shadow-md` | Cards at rest |
| `--shadow-lg` | Cards on hover, dropdowns |
| `--shadow-xl` | Modals, overlays |
| `--shadow-focus` | Focus ring (3px, `rgba(30,137,157,0.15)`) |
| `--shadow-card` | Card default (composite) |
| `--shadow-card-hover` | Card hover elevation (composite) |

## Transitions

| Token | Value | Usage |
|---|---|---|
| `--transition-fast` | 0.15s ease | Micro-interactions |
| `--transition-default` | 0.2s ease | Standard hover/focus |
| `--transition-slow` | 0.3s ease | Panel open/close |

## Animation Library

Defined as CSS keyframes in `globals.css` with utility classes:

| Class | Keyframe | Duration | Usage |
|---|---|---|---|
| `.animate-page-enter` | `pageEnter` | 0.4s | Route transition fade |
| `.animate-fade-in` | `fadeIn` | 0.3s | Dropdowns, tooltips |
| `.animate-fade-in-up` | `fadeInUp` | 0.6s | Scroll-revealed sections |
| `.animate-slide-in-left` | `slideInLeft` | 0.6s | Panel/sidebar enter |
| `.animate-slide-in-right` | `slideInRight` | 0.6s | Panel/sidebar enter |
| `.animate-scale-in` | `scaleIn` | 0.5s | Modal/card pop-in |
| `.animate-pulse-glow` | `pulse-glow` | 2s loop | Donate CTA emphasis |
| `.animate-float` | `float` | 3s loop | Hero illustration |

Stagger children with `.stagger-children` — delays child elements 0–500ms in 100ms steps (up to 6 items).

## Special Utilities

- `.glass` — Glassmorphism (`rgba(255,255,255,0.08)` + `backdrop-filter: blur(12px)`). Used on scrolled header state.
- `.gradient-text` — Diagonal gradient text (accent → primary-dark). Used on high-impact headline words.
- `.section-divider` — 60x4px orange bar (`--color-accent`). Used below section headings.

## Design Language

- **Theme:** Light, clean, accessible
- **Tone:** Warm, trustworthy — nonprofit serving people with disabilities
- **Glassmorphism:** Light usage on header scroll state only
- **Animations:** Scroll-triggered fade-in-up, subtle hover transitions, Framer Motion for JS-driven sequences

## Navigation Structure

### Primary Nav
Home / About / Equipment (dropdown: Get Equipment, Donate Equipment) / Inventory / Live Closet / How It Works / FAQ / Partners / Contact

### Footer Link Groups
- **About:** About The Hub, How It Works, Partners & Referrals, FAQ
- **Quick Links:** Request Equipment, Donate Equipment, View Inventory, Live Closet View, Contact Us
- **Legal:** Accessibility, Privacy Policy, Terms & Disclaimer

## Domain Data

### Equipment Categories
Manual Wheelchair, Power Wheelchair, Cushion / Seating, Walker / Rollator, Bath / Shower Equipment, Transfer Equipment, Ramp / Accessibility, Scooter, Standing Frame, Other Adaptive Equipment

### Equipment Conditions
New, Like New, Good, Fair

### Inventory Statuses
Available, Pending, In Refurbishment, Assigned, Unavailable

### Requester Roles
Individual with disability, Family member / Caregiver, Therapist / Clinician, Case manager, Social worker, Other

### Urgency Levels
Low – no rush, Moderate – within a few weeks, High – within days, Urgent – immediate need

### Contact Categories
General question, Donation inquiry, Need equipment, Referral partner, Volunteer / Support, Media inquiry, Other

## Logo System

- `logo-horizontal.png` — Full horizontal logo (header)
- `logo-stacked.png` — Stacked version (footer, about page)
- `logo-badge.png` — Badge/icon mark (favicon, small formats)

## Accessibility Standards

- WCAG 2.1 AA minimum
- Skip-to-content link (`.skip-link` — visible on focus, fixed top-left, `--color-primary-dark` background)
- Focus-visible outlines on all interactive elements (2px solid `--color-primary-dark`, offset 2px)
- Semantic heading hierarchy (h1 through h6 defined)
- Form labels associated with inputs (all labels use `display: block` with `margin-bottom: 6px`)
- All form elements (input, textarea, select) share consistent focus state with focus ring shadow
