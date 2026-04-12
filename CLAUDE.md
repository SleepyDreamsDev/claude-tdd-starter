# Forever Clean — Claude Code Reference

## Project

Forever Clean — cleaning services marketplace for Chișinău, Moldova. Bilingual (Romanian + Russian). PWA for mobile.

**Current phase: POC** — Frontend only, mock data, no backend/auth/database.

## Tech Stack

- **Framework:** Next.js 15+ (App Router) · **Language:** TypeScript strict
- **Styling:** Tailwind CSS v4 (CSS-first) + shadcn/ui
- **Package manager:** pnpm · **Testing:** Vitest + RTL + Playwright
- **Deployment:** Vercel free tier · **PWA:** Serwist
- **Icons:** Lucide React · **Date utilities:** date-fns
- **Class utilities:** clsx + tailwind-merge (via `cn()`)

### POC constraints (current phase)

No backend. No Supabase, Prisma, API routes, auth, or email. All data from `src/lib/mock-data.ts`. Booking form "submits" to in-memory state only.

## Quick Start

```bash
pnpm install && pnpm dev
```

## Commands

```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm type-check       # tsc --noEmit
pnpm lint             # ESLint
pnpm test             # Vitest
pnpm test:e2e         # Playwright
```

## Architecture

```
src/
  app/
    [locale]/          # i18n routing (ro | ru) — ALL pages live here
      page.tsx         # Homepage
      providers/       # Provider listing + [slug] profile
      booking/         # [slug] booking wizard
    layout.tsx         # Root layout (fonts, metadata)
    globals.css        # Tailwind v4 @theme + all CSS custom properties
    not-found.tsx      # 404
    sitemap.ts         # Dynamic sitemap
  components/
    ui/                # shadcn/ui primitives
    layout/            # Header, footer, mobile-nav, locale-switcher, breadcrumbs
    providers/         # Provider card, filters, gallery, services, reviews
    booking/           # Wizard steps, room-selector, addon-selector, price-calculator
    shared/            # seo-head, star-rating, empty-state
  lib/
    mock-data.ts       # POC: all provider/review data + query functions
    types.ts           # TypeScript interfaces (Provider, Review, BookingFormData, etc.)
    constants.ts       # ServiceType, Neighborhood, pricing constants
    utils.ts           # cn() helper, formatPrice()
    pricing.ts         # calculateTotalSqm(), calculatePrice()
    i18n/
      config.ts        # Locale config + type
      get-dictionary.ts
      messages/        # ro.json, ru.json
  hooks/               # use-locale, custom React hooks
```

## Coding Rules

### General

- `function` declarations for components, not arrow functions
- Named exports (except `page.tsx` / `layout.tsx` which need default)
- Absolute imports: `@/components/...`, `@/lib/...`, `@/hooks/...`
- Components under 200 lines — extract when exceeding
- No `any` — use `unknown` and narrow, or define types
- All user-facing strings from translation files, never hardcoded
- Run `pnpm type-check` before committing — zero errors
- Prefer the simplest solution — no speculative abstractions, no error handling for impossible states
- Touch only what the task requires — match surrounding style, don't clean up adjacent code

### Files

- Components: `kebab-case.tsx` (e.g., `provider-card.tsx`)
- Utilities: `kebab-case.ts` (e.g., `mock-data.ts`)
- Types: `src/lib/types.ts` or colocated with component
- Tests: `*.test.ts` / `*.test.tsx`

### Styling

- Tailwind utility classes only — no custom CSS files per component
- `cn()` utility (clsx + tailwind-merge) for conditional classes
- Mobile-first responsive: `text-sm md:text-base lg:text-lg`
- Use Tailwind tokens that map to CSS custom properties (e.g. `bg-primary`, `text-text-heading`, `border-border-default`)
- **Never hardcode hex values** — see `.claude/rules/design-system.md` and `Specs/Design/DESIGN_SYSTEM.md`

### i18n

- Every visible string from translation dictionary — zero hardcoded RO/RU text
- Locale from `[locale]` route param
- Server components: `getDictionary(locale)`
- Client components: receive translations as props (not entire dictionary)
- Provider content: `provider.bio[locale]` pattern
- Reviews: display in original language

### Accessibility

- Keyboard accessible interactive elements
- Alt text on all images
- Labels on all form inputs
- WCAG AA color contrast (4.5:1)
- `aria-label` on star ratings, icon-only buttons
- `<html lang="ro">` or `<html lang="ru">` set from locale

### Component structure

```tsx
// 1. React/Next imports
// 2. Third-party imports
// 3. Internal imports (@/...)
// 4. Colocated types

interface Props { /* ... */ }

export function ComponentName({ ... }: Props) {
  // hooks → derived state → handlers → return JSX
}
```

## DO NOT

- Add backend infrastructure in POC (no Supabase, Prisma, API routes)
- Hardcode text in Romanian or Russian
- Use `"use client"` on components that can be server components
- Create pages outside `[locale]` route group (except root redirect)
- Use default exports for non-page components
- Install heavy dependencies beyond what's in `Specs/TECHNICAL_SPEC.md`
- Skip bilingual implementation on any page
- Hardcode hex color values — always use Tailwind design system tokens
- Refactor, reformat, or "improve" code outside the scope of the current task
- Change Tailwind class strings or design tokens on lines you weren't asked to modify
- Add or modify translation keys beyond what the current feature requires

## Working Style

Three behavioral principles — in priority order:

1. **Simplicity First** — Write the minimum code that solves the problem. No speculative features, no abstractions until a pattern repeats, no error handling for impossible scenarios.
2. **Surgical Changes** — Touch only what the request requires. Don't improve adjacent code, comments, or formatting. Match the existing style. Only remove things YOUR changes orphaned.
3. **Clarify Before Implementing** — For non-trivial requests with no plan file, state your assumptions and interpretation before writing code. When a plan file exists or the task is covered by `/feature`, proceed directly.

## Phase Checklist

### POC done when:
- [ ] All stories POC-001 → POC-008 pass acceptance criteria (see `Specs/BACKLOG.md`)
- [ ] Both `/ro` and `/ru` routes work fully
- [ ] Lighthouse: Performance ≥90, Accessibility ≥95, SEO ≥95
- [ ] PWA installable on Android Chrome
- [ ] All tests pass
- [ ] `pnpm build` succeeds
- [ ] Deployed to Vercel

---

## Conventions

### Commits

Follow Conventional Commits (enforced by commitlint):

- `feat(scope): add new feature`
- `fix(scope): fix a bug`
- `chore(scope): tooling, deps, config`
- `docs: documentation changes`
- `test(scope): add or fix tests`
- `refactor(scope): restructure code`

Scopes: `app, components, lib, i18n, booking, providers, layout`

### Branching

- Feature: `feature/short-description`
- Fix: `fix/issue-description`
- Squash merge to main, delete after merge

### Code Style

- TypeScript strict mode
- ESLint + Prettier (auto-formatted by hooks)
- Import order: React/Next → third-party → `@/` internal → colocated types

### Test Runner Reference

| Runner | Run single file | File pattern | Location |
|--------|----------------|--------------|----------|
| Vitest | `pnpm vitest run <file>` | `*.test.ts(x)` | `__tests__/` subdirs |

**CRITICAL:** Never run `pnpm vitest` without `run` flag — it starts watch mode and hangs.

### Testing Conventions

- Single Vitest runner for all tests
- Globals enabled (no need to import `describe`/`it`/`expect`)
- `pnpm vitest run <file>` for single file
- Tests in `__tests__/` subdirectories or co-located as `*.test.ts(x)`
- Component tests: `@testing-library/react` + `@testing-library/user-event`
- Lib/util tests: Direct function calls, no HTTP layer

### Gherkin Specs

- Feature specs live in `specs/*.feature`
- Written BEFORE tests as human-readable acceptance criteria
- Not executable — documentation that maps to test `describe`/`it` blocks
- One `.feature` file per feature/PR
- Created automatically by `/feature` skill in PHASE 1.5 (SPECIFY)

---

## Rules

Detailed rules live in dedicated files — read them for the full constraints:

- **TDD workflow:** `.claude/rules/tdd-workflow.md`
- **Session reporting:** `.claude/rules/session-reporting.md`
- **Technical conventions:** `.claude/rules/technical.md`
- **Design system:** `.claude/rules/design-system.md` ← **Read before any UI work**
- **Plugin gate:** `.claude/rules/plugin-gate.md`

## Available Skills

- `/feature [--careful] <description>` — Orchestrated TDD cycle: Gherkin spec → tests → implement → refactor → ship.
  Writes Gherkin acceptance criteria first, then derives tests from scenarios.
  Default: FAST_MODE — combined RED+GREEN, auto-approve Gherkin, parallel validation.
  `--careful`: forces PAUSE for Gherkin approval and separate RED/GREEN steps.

- `/security [files or git ref]` — Deep security review with threat modeling.
  OWASP Top 10 + platform-specific checks.
  Pauses on critical/high findings for approval before fixing.
  Use before PRs or after completing features. Defaults to reviewing unstaged changes.

---

## References

> Read the relevant document before starting any feature. These are the source of truth.

| Document | Path | Read when |
|----------|------|-----------|
| **Design System** | `Specs/Design/DESIGN_SYSTEM.md` | **MANDATORY for ALL UI work** — colors, typography, spacing, 16 component specs, Tailwind v4 `@theme` block |
| Reference Screens | `Specs/Design/reference-screens/*.html` | Building any page — visual reference for layout, hierarchy, and component appearance |
| Technical Spec | `Specs/TECHNICAL_SPEC.md` | Writing code, creating types, building components — TypeScript interfaces, pricing logic, i18n spec, PWA spec |
| Build Order | `Specs/BUILD_ORDER.md` | Starting a new implementation step — 11-step POC sequence with verification criteria |
| Backlog | `Specs/BACKLOG.md` | Checking acceptance criteria for current story — POC-001 through POC-008 |
| PRD | `Specs/PRD.md` | Needing product or business context — personas, monetization, market |

### Design System Override Notice

`Specs/Design/DESIGN_SYSTEM.md` is the authoritative source for all visual decisions.

- **Primary color: `#7b8cc4`** (blue-violet) — defined as `--color-primary` in the `@theme` block
- All colors, spacing, radius, and typography values are defined as CSS custom properties
- The complete `@theme` block for `globals.css` is in Section 13 of the design system
- Reference screens in `Specs/Design/reference-screens/` demonstrate the intended visual direction
