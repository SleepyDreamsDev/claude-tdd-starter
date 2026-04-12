# Technical Conventions (Forever Clean)

> Project-specific coding rules for the POC phase.
> Full context in `Specs/TECHNICAL_SPEC.md` and `Specs/CLAUDE.md`.

---

## Component rules

- Use `function` declarations, not arrow function assignments

  ```tsx
  // ✅ correct
  export function ProviderCard({ provider }: Props) { ... }

  // ✗ avoid
  export const ProviderCard = ({ provider }: Props) => { ... }
  ```

- **Named exports** for all components, hooks, and utilities
- Exception: `page.tsx` and `layout.tsx` use default exports (Next.js requirement)
- Maximum **200 lines** per component — extract sub-components when exceeding

---

## TypeScript

- Strict mode (`strict: true` in tsconfig) — no bypasses
- No `any` — use `unknown` and narrow with type guards, or define explicit types
- All shared interfaces live in `src/lib/types.ts`
- Colocated types allowed for component-specific props (same file, above the component)

---

## Imports

Always use absolute imports with the `@/` alias:

```tsx
// ✅ correct
import { ProviderCard } from '@/components/providers/provider-card'
import { cn } from '@/lib/utils'

// ✗ avoid
import { ProviderCard } from '../../../components/providers/provider-card'
```

**Import order** (enforced by ESLint):

1. React / Next.js (`react`, `next/*`)
2. Third-party packages (`lucide-react`, `date-fns`, etc.)
3. Internal paths (`@/components/...`, `@/lib/...`, `@/hooks/...`)
4. Colocated types (defined in same file, imported inline)

---

## File naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | `kebab-case.tsx` | `provider-card.tsx` |
| Utilities / lib | `kebab-case.ts` | `mock-data.ts` |
| Hooks | `use-kebab-case.ts` | `use-locale.ts` |
| Tests | `*.test.ts` / `*.test.tsx` | `pricing.test.ts` |
| Pages | `page.tsx` (Next.js) | `page.tsx` |
| Layouts | `layout.tsx` (Next.js) | `layout.tsx` |

---

## i18n

- **Every** user-visible string must come from the translation dictionary
- Zero hardcoded Romanian or Russian text in component files
- Locale comes from the `[locale]` route segment (`ro` | `ru`)
- Server components: call `getDictionary(locale)` and destructure needed keys
- Client components: receive translation strings as **props** (not the whole dictionary)
- Provider content pattern: `provider.bio[locale]`, `provider.name` (locale-neutral)
- Reviews: display in original language as stored

```tsx
// Server component ✅
const dict = await getDictionary(locale)
return <Hero title={dict.home.hero.title} />

// Client component ✅
export function BookingStep({ labels }: { labels: BookingLabels }) { ... }
```

---

## Styling rules

- Tailwind utility classes **only** — no `<style>` blocks, no CSS modules per component
- Use `cn()` (clsx + tailwind-merge) for conditional class merging
- Mobile-first: write base styles for 375px, then `md:` / `lg:` overrides
- Never hardcode hex values in JSX — see `.claude/rules/design-system.md`
- No inline `style={{ color: '#...' }}` — always a Tailwind class

---

## POC data layer

All data lives in `src/lib/mock-data.ts`. Use these functions:

| Function | Returns |
|----------|---------|
| `getProviders(filters?)` | `Provider[]` — filterable by service, neighborhood, rating |
| `getProviderBySlug(slug)` | `Provider \| undefined` |
| `getReviewsByProvider(providerId)` | `Review[]` |
| `submitBookingRequest(data)` | `BookingConfirmation` (in-memory, no persistence) |

Pricing logic lives in `src/lib/pricing.ts`:

| Function | Purpose |
|----------|---------|
| `calculateTotalSqm(rooms)` | Sum room areas using default sqm per room type |
| `calculatePrice(sqm, addOns, baseRate)` | Base + addOns - bundle discount |

---

## DO NOT (POC phase)

- Add **backend infrastructure**: no Supabase, Prisma, API routes (`src/app/api/`), or server actions that persist data
- Add **auth**: no NextAuth, Better Auth, or session handling
- Add **email**: no Resend or SMTP configuration
- Hardcode text in **Romanian or Russian** anywhere in source files
- Use **`"use client"`** on a component that doesn't need browser APIs or event handlers
- Create **pages outside `[locale]`** route group (only exception: root redirect `src/app/page.tsx`)
- Use **default exports** for non-page/non-layout components
- Install **heavy dependencies** not listed in `Specs/TECHNICAL_SPEC.md`
- **Skip bilingual implementation** — if a page works in `/ro`, it must also work in `/ru`

---

## Working Style

See `CLAUDE.md § Working Style` for the full version. In short:

1. **Simplicity First** — minimum code, no speculative abstractions
2. **Surgical Changes** — touch only what the task requires, match existing style
3. **Clarify Before Implementing** — state assumptions for non-trivial requests without a plan file
