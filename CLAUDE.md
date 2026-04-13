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

## Commands

```bash
pnpm dev              # Dev server (Turbopack)
pnpm build            # Production build
pnpm type-check       # tsc --noEmit
pnpm lint             # ESLint
pnpm test             # Vitest (always use `run` flag — never bare `pnpm vitest`)
pnpm test:e2e         # Playwright
```

**CRITICAL:** Never run `pnpm vitest` without `run` — it starts watch mode and hangs.

## Architecture

```
src/app/[locale]/      # ALL pages (ro | ru routing)
src/components/        # ui/ layout/ providers/ booking/ shared/
src/lib/               # mock-data.ts, types.ts, constants.ts, utils.ts, pricing.ts, i18n/
src/hooks/             # use-locale + custom hooks
```

## Coding Rules

Full rules: `@.claude/rules/technical.md`

### Core principles

- `function` declarations for components, not arrow functions
- Named exports (except `page.tsx` / `layout.tsx`)
- Absolute imports: `@/components/...`, `@/lib/...`, `@/hooks/...`
- Components under 200 lines — extract when exceeding
- No `any` — use `unknown` and narrow, or define types
- All user-facing strings from translation files, never hardcoded
- **Never hardcode hex values** — use Tailwind design system tokens

### i18n

- Every visible string from translation dictionary — zero hardcoded RO/RU text
- Server components: `getDictionary(locale)` · Client components: receive translations as props
- Provider content: `provider.bio[locale]` pattern

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

## Before Claiming Any Task Complete

Run these before saying "done":

1. `pnpm type-check` — zero errors
2. `pnpm vitest run` — all relevant tests pass
3. For UI changes: check dev server visually or take screenshot

## Session Discipline

- `/fast` for implementation work (2.5x faster output, same model quality)
- `/model haiku` for quick questions, exploration, and file lookups
- `/compact` after each completed phase (RED / GREEN / REFACTOR) — don't wait for the warning
- When stuck after 2 correction attempts: `/clear` and rephrase with better context
- When compacting, preserve: current build step, design token names in use, list of modified files, any failing test names

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

Follow [Conventional Commits](https://www.conventionalcommits.org/):

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

---

## Rules

Detailed rules live in dedicated files — read them for the full constraints:

- **TDD workflow:** `.claude/rules/tdd-workflow.md`
- **Session reporting:** `.claude/rules/session-reporting.md`
- **Technical conventions:** `.claude/rules/technical.md`
- **Design system:** `.claude/rules/design-system.md` ← **Read this file before ANY UI work** (components, pages, styling)
- **Plugin gate:** `.claude/rules/plugin-gate.md`

## Available Skills

- `/feature [--careful] <description>` — Orchestrated TDD cycle: Gherkin spec → tests → implement → refactor → ship.
  Default: FAST_MODE — combined RED+GREEN, auto-approve Gherkin, parallel validation.
  `--careful`: forces PAUSE for Gherkin approval and separate RED/GREEN steps.

- `/security [files or git ref]` — Deep security review with threat modeling.
  OWASP Top 10 + platform-specific checks. Defaults to reviewing unstaged changes.

---

## References

> Read the relevant document before starting any feature. These are the source of truth.

| Document          | Path                                    | Read when                                                                                              |
| ----------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Design System** | `Specs/Design/DESIGN_SYSTEM.md`         | **MANDATORY for ALL UI work** — primary color `#7b8cc4` (`bg-primary`), all tokens, 16 component specs |
| Reference Screens | `Specs/Design/reference-screens/*.html` | Building any page — layout, hierarchy, component appearance                                            |
| Technical Spec    | `Specs/TECHNICAL_SPEC.md`               | Writing code, creating types, building components                                                      |
| Build Order       | `Specs/BUILD_ORDER.md`                  | Starting a new implementation step — 11-step POC sequence                                              |
| Backlog           | `Specs/BACKLOG.md`                      | Checking acceptance criteria — POC-001 through POC-008                                                 |
| PRD               | `Specs/PRD.md`                          | Product or business context — personas, monetization, market                                           |
