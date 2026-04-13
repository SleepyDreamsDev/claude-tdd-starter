# BUILD_ORDER.md — Implementation Sequence

Complete steps in order within each phase. Each step ends in a verifiable state. Do not skip ahead.

---

## POC build order (11 steps)

### Step 1: Project setup

**Do:**

1. `pnpm create next-app@latest forever-clean` — App Router, TypeScript, Tailwind, no src/ prompt (we want src/)
2. Restructure to use `src/` directory if not already
3. Configure `tsconfig.json`: strict mode, path alias `@/*` → `./src/*`
4. Install: `pnpm add lucide-react clsx tailwind-merge class-variance-authority date-fns`
5. Init shadcn/ui: `pnpm dlx shadcn@latest init`
6. Add shadcn components: `pnpm dlx shadcn@latest add button card input select badge dialog sheet slider`
7. Create `src/lib/utils.ts` with `cn()` helper (clsx + twMerge)
8. Create `src/app/globals.css` with Tailwind v4 imports
9. Create minimal root `layout.tsx` with font loading
10. Create `src/app/page.tsx` that redirects to `/ro`

**Verify:**

- `pnpm dev` runs at localhost:3000
- `/` redirects to `/ro`
- shadcn Button renders correctly

---

### Step 2: i18n system

**Do:**

1. Create `src/lib/i18n/config.ts` — export locales, defaultLocale
2. Create `src/lib/i18n/messages/ro.json` — all keys from TECHNICAL_SPEC.md section 6
3. Create `src/lib/i18n/messages/ru.json` — Russian translations (same key structure)
4. Create `src/lib/i18n/get-dictionary.ts` — async dictionary loader
5. Create `src/app/[locale]/layout.tsx` — sets `<html lang={locale}>`, loads dictionary, provides to children
6. Create `src/app/[locale]/page.tsx` — homepage stub showing translated text
7. Create `src/components/layout/locale-switcher.tsx` — RO/RU toggle, preserves current path
8. Update `next.config.ts` — redirect `/` → `/ro`

**Verify:**

- `/ro` shows Romanian text
- `/ru` shows Russian text
- Locale switcher toggles between them
- URL updates when switching
- Browser back button works after switching

---

### Step 3: Mock data layer

**Do:**

1. Create `src/lib/types.ts` — all interfaces from TECHNICAL_SPEC.md section 3
2. Create `src/lib/constants.ts` — service types, neighborhoods, add-ons (with RO+RU labels, Lucide icon names)
3. Create `src/lib/mock-data.ts` — 8 providers (from BACKLOG.md mock data table), 3–8 reviews per provider, all with RO+RU content
4. Export functions: `getProviders(filters?)`, `getProviderBySlug(slug)`, `getReviewsByProvider(id)`, `submitBookingRequest(data)`, `getFeaturedProviders()`, `getNeighborhoods()`, `getServiceTypes()`, `getAddOns()`
5. Create `src/lib/pricing.ts` — `calculateTotalSqm()`, `calculatePrice()` from TECHNICAL_SPEC.md section 5

**Verify:**

- Import `getProviders()` in homepage, render one provider name
- `getProviders({ serviceType: "GENERAL_CLEANING" })` returns filtered results
- `calculatePrice(60, 50, [])` returns `{ base: 3000, addOnsTotal: 0, discount: 0, total: 3000 }`

---

### Step 4: Layout components

**Do:**

1. Create `src/components/layout/header.tsx` — logo, nav (Home, Providers), locale switcher, mobile hamburger menu
2. Create `src/components/layout/footer.tsx` — nav links, language toggle, copyright, contact placeholder
3. Create `src/components/layout/mobile-nav.tsx` — bottom tab bar (Home, Search, Bookings placeholder, Account placeholder) — visible on mobile only
4. Create `src/components/layout/breadcrumbs.tsx` — dynamic from URL path segments
5. Wire all into `[locale]/layout.tsx`

**Verify:**

- Header visible with working nav links
- Footer visible
- Mobile (375px): hamburger menu works, bottom tab bar visible
- Desktop: full nav, no bottom bar
- All text from translations

---

### Step 5: Homepage

**Do:**

1. Hero section: translated headline + subtitle + search form
2. Search form: service type Select + neighborhood Select + Search button
3. Search submits to `/[locale]/providers?service=X&area=Y`
4. "How it works" section: 3 cards with Lucide icons + translated text
5. Featured providers: call `getFeaturedProviders()`, render 4 provider cards
6. Create `src/components/providers/provider-card.tsx` — reusable card (photo, name, stars, price, services, neighborhoods)
7. Create `src/components/ui/star-rating.tsx` — renders filled/unfilled stars

**Verify:**

- Homepage renders fully in both /ro and /ru
- Search navigates to provider listing with query params
- Provider cards show correct data
- Mobile layout: single column, cards stack vertically
- Desktop: cards in grid

---

### Step 6: Provider listing page

**Do:**

1. Create `src/app/[locale]/providers/page.tsx` — server component, reads query params, calls `getProviders(filters)`
2. Create `src/components/providers/provider-filters.tsx` — service type, neighborhood, price range, min rating
3. Implement filter logic in `getProviders()` if not already
4. Sort controls: rating, price asc, price desc, review count
5. Reflect filters in URL query params (use `useSearchParams` + `router.push`)
6. Mobile: filters in Sheet (shadcn) drawer
7. Empty state component when no results
8. Provider count display: "{count} providers found"

**Verify:**

- All filters narrow results correctly
- Sorting works in all 4 modes
- URL params update on filter change
- Refreshing page preserves filters from URL
- Mobile drawer opens/closes, applies filters
- Empty state shows when filters match nothing

---

### Step 7: Provider profile page

**Do:**

1. Create `src/app/[locale]/providers/[slug]/page.tsx` — server component, calls `getProviderBySlug(slug)`
2. Provider header: name, rating, review count, verified badge, main photo
3. Photo gallery: grid of photos, click for lightbox (Dialog component)
4. Bio section: `provider.bio[locale]`
5. Services list with prices
6. Coverage areas: Badge components per neighborhood
7. Availability table: weekly schedule
8. Reviews: call `getReviewsByProvider(id)`, render list
9. "Book this provider" CTA → links to `/[locale]/booking/[slug]`
10. Breadcrumbs: Home > Providers > {companyName}
11. Meta tags: title, description, OG image
12. JSON-LD: LocalBusiness + AggregateRating

**Verify:**

- Profile renders all sections for each of 8 providers
- Both RO and RU bios display correctly
- Gallery lightbox opens/closes
- Reviews sorted newest first
- CTA navigates to booking page
- View source: JSON-LD present, meta tags correct

---

### Step 7.5: Layout & homepage polish

**Do:**

1. Add i18n keys to both `ro.json` and `ru.json`: nav (`how_it_works`, `about`, `terms`, `privacy`, `contact`), home (`popular_services_title`, `starting_from`)
2. Header: expand nav from 2 to 4 items (Acasa, Specialisti, Cum functioneaza → `#how-it-works`, Despre noi → `#`); animate mobile menu with CSS `max-height` transition + `bg-black/30` backdrop overlay
3. Footer: restructure to 3-column layout — col 1: logo + copyright, col 2: nav links, col 3: legal links (Termeni, Confidentialitate, Contact as `#` placeholders)
4. Create `src/components/home/popular-services.tsx` — server component, 2×2 grid mobile / 4-col desktop, Lucide icons via static map, starting prices from mock data
5. Integrate Popular Services into `src/app/[locale]/page.tsx` between featured providers and how-it-works; add `id="how-it-works"` to existing section
6. Add hover effects to provider cards: `hover:border-[#c4c0d0] hover:shadow-sm transition-colors duration-150`
7. Update `HeaderLabels` / `FooterLabels` types and wire new label props through `src/app/[locale]/layout.tsx`

**Verify:**

- 4 nav links visible on desktop; "Cum functioneaza" anchor-scrolls to section
- Footer shows logo + nav + legal links in 3-column layout
- Mobile menu slides down smoothly with backdrop overlay; backdrop click closes
- Popular Services: 2×2 mobile / 4-col desktop, correct icons and starting prices
- Provider cards: border darkens on hover with smooth transition
- Both `/ro` and `/ru` render correctly with zero hardcoded text
- `pnpm type-check` and `pnpm build` succeed

---

### Step 8: Booking flow

**Do:**

1. Create `src/app/[locale]/booking/[slug]/page.tsx` — loads provider data
2. Create `src/components/booking/booking-wizard.tsx` — multi-step container with step indicator
3. Step 1: Service type — radio group with icons + descriptions
4. Step 2: Room selector — counter inputs (-, count, +) per room type, live sqm display
5. Step 3: Add-ons — checkboxes with prices, bundle discount note
6. Step 4: Date/time — date picker (min tomorrow) + time slot radios
7. Step 5: Contact — name, phone (pattern validation), email, notes textarea
8. Step 6: Summary — all selections + price breakdown + provider info + confirm button
9. Create `src/components/booking/price-calculator.tsx` — sticky/visible across steps, live calculation
10. Submit: call `submitBookingRequest()`, show success with reference number
11. Mobile: one step per screen, prev/next buttons, progress indicator
12. Desktop: single scrollable page or side-by-side (provider info + form)

**Verify:**

- Full flow completes: select service → rooms → add-ons → date → contact → confirm
- Price updates correctly at each step
- Validation prevents: empty required fields, past dates, invalid phone/email
- Bundle discount applies with 3+ add-ons
- Confirmation shows reference number and all details
- Back button navigates to previous step (not browser back)

---

### Step 9: PWA setup

**Do:**

1. Create `public/manifest.json` from TECHNICAL_SPEC.md section 7
2. Create placeholder icons: 192px + 512px + maskable variants (use any green/white icon placeholder)
3. Install Serwist: `pnpm add @serwist/next` and configure in `next.config.ts`
4. Create service worker config: cache app shell (network-first), static assets (cache-first)
5. Create `src/app/offline/page.tsx` — offline fallback with retry button
6. Add manifest link and viewport meta in root layout

**Verify:**

- Chrome DevTools > Application > Manifest shows valid manifest
- Service worker registered (check DevTools > Application > Service Workers)
- Install prompt appears (may need HTTPS — test on deployed Vercel preview)
- Disable network in DevTools → offline page appears
- Re-enable → app recovers

---

### Step 10: SEO foundation

**Do:**

1. Create `src/app/sitemap.ts` — dynamic sitemap from mock provider slugs (both locales)
2. Create `public/robots.txt` — allow all
3. Add hreflang tags in `[locale]/layout.tsx` (link current page's RO ↔ RU version)
4. Add canonical URL to all pages
5. Ensure all pages have unique `<title>` and `<meta name="description">`

**Verify:**

- `/sitemap.xml` lists all provider URLs in both /ro and /ru
- `/robots.txt` accessible
- View source on any page: hreflang, canonical present
- Each page has unique title (check by navigating to 3+ pages)

---

### Step 11: Testing

**Do:**

1. Configure Vitest: `vitest.config.ts` with React support and path aliases
2. Unit tests for `pricing.ts`: at least 5 cases (basic, with add-ons, with discount, edge cases)
3. Unit tests for `mock-data.ts`: filter by service type, filter by neighborhood, sort by price, empty results
4. Component test for `provider-card.tsx`: renders name, rating stars, price
5. Component test for `booking-wizard.tsx`: complete flow, show confirmation
6. Configure Playwright
7. E2E test: `/ro` → click provider → view profile → click Book → complete form → see confirmation
8. E2E test: switch language RO → RU, verify content changes

**Verify:**

- `pnpm test` — all pass
- `pnpm test:e2e` — all pass
- `pnpm build` — succeeds with no errors
- `pnpm type-check` — zero TypeScript errors

---

## MVP build order (overview)

After POC is deployed and validated, transition to MVP. Detailed steps will be expanded when this phase begins.

### Migration steps (do first):

1. Create Supabase project, copy connection strings to `.env.local`
2. Init Prisma, paste schema from PRD.md section 8
3. Run migrations + seed from mock data
4. Create Supabase client helpers (server + browser)
5. Replace each mock data function with Prisma query (one at a time, test after each)

### Feature build order:

1. MVP-001: Auth (registration, login, protected routes)
2. MVP-004: Provider dashboard (depends on auth)
3. MVP-002: Real-time availability (depends on dashboard)
4. MVP-003: Instant booking (depends on availability)
5. MVP-006: Review submission (depends on auth + completed bookings)
6. MVP-008: Notifications (email + push + in-app)
7. MVP-005: Cross-sell engine
8. MVP-007: Recurring bookings
9. MVP-009: Per-lead billing
10. MVP-010: SEO landing pages
11. MVP-011: Enhanced PWA
12. MVP-012: Admin panel

---

## Advanced build order (overview)

1. ADV-001: Payment processing (MAIB + Paynet)
2. ADV-002: Subscription tiers
3. ADV-004: Smart matching
4. ADV-003: Advanced analytics
5. ADV-005: Trust & safety
6. ADV-006: Client loyalty
