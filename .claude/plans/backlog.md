# Forever Clean — Backlog

## Current Sprint (POC Build Order)

See `Specs/BUILD_ORDER.md` for verification criteria after each step.
See `Specs/BACKLOG.md` for acceptance criteria (POC-001 → POC-008).

- [ ] **Step 1 — Project setup:** `pnpm create next-app`, shadcn init, Tailwind v4 config, `cn()` helper, path alias `@/*`, Lavender Mist `@theme` block in `globals.css`
- [ ] **Step 2 — i18n system:** `[locale]` routing, `getDictionary()` loader, `ro.json` + `ru.json` translation files, locale-switcher component, root redirect
- [ ] **Step 3 — Mock data layer:** TypeScript types (`src/lib/types.ts`), constants (`ServiceType`, `Neighborhood`), 8 fictional providers, `getProviders()` / `getProviderBySlug()` / `getReviewsByProvider()`, pricing functions (`calculateTotalSqm`, `calculatePrice`)
- [ ] **Step 4 — Layout components:** Header (mobile + desktop), footer, mobile bottom navigation, breadcrumbs
- [ ] **Step 5 — Homepage:** Hero section, search form (service + neighborhood + button), "how it works" (3 steps), featured providers section, provider-card component, star-rating component
- [ ] **Step 6 — Provider listing page:** Server component with filter + sort + URL params, filter Sheet drawer (mobile), filter sidebar (desktop), empty state
- [ ] **Step 7 — Provider profile page:** Header with gallery lightbox, bio, services + prices list, coverage area badges, review cards, sticky CTA bar, JSON-LD LocalBusiness structured data
- [ ] **Step 8 — Booking flow:** 6-step wizard (service → rooms → add-ons → date/time → contact → summary), price calculator, form validation, booking confirmation page
- [ ] **Step 9 — PWA setup:** `manifest.json`, app icons (all sizes), Serwist service worker, offline page, `next-pwa` config
- [ ] **Step 10 — SEO foundation:** `sitemap.ts`, `robots.txt`, hreflang alternate links, canonical URLs, per-page meta tags
- [ ] **Step 11 — Testing:** Vitest config, unit tests for pricing + mock-data, component tests (provider-card, star-rating, booking steps), Playwright E2E for critical paths

## Next Sprint (MVP — after POC ships)

- [ ] Supabase project setup + Prisma schema
- [ ] Replace mock data with real Supabase queries
- [ ] User auth (email/password via Supabase Auth)
- [ ] Real-time availability calendar
- [ ] Instant booking confirmation + email notifications (Resend)
- [ ] Provider dashboard (bookings, profile management)
- [ ] Cross-sell engine (complementary services)
- [ ] Review submission + moderation flow
- [ ] Recurring booking support
- [ ] Per-lead billing setup
- [ ] SEO landing pages (service + neighborhood combinations)
- [ ] Admin panel (user + provider management)

## Later (Advanced)

- [ ] Payment processing (MAIB / Paynet integration)
- [ ] Provider subscription tiers (Free / Pro / Premium)
- [ ] Advanced analytics dashboard
- [ ] Smart matching algorithm
- [ ] Trust & safety features
- [ ] Client loyalty program

## Done

<!-- Move completed items here with completion date -->
