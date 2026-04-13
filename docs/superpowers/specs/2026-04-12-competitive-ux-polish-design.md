# Step 10.5: Competitive UX Polish Pass

> Focused improvements from competitive research (booking.com, kayak.com, skymonde.com). Only items that directly improve UX quality for the POC. Trust signals, testimonials, FAQ, and other content-heavy sections deferred to MVP.

## Motivation

The current homepage is missing sections the mockup already designed (Popular Services grid), the header/footer feel incomplete vs. any professional site, and card interactions lack basic hover polish. This step closes those gaps with minimal scope.

## Scope

- 1 new component
- 5 modified files
- ~10 new i18n keys per locale
- No new dependencies
- No new routes

## Implementation Order

1. i18n keys (new keys up front)
2. Area A: Layout fixes (header, footer, mobile menu)
3. Area B: Homepage addition (Popular Services grid)
4. Area C: Card hover polish

---

## Area A: Layout Fixes

### A1. Header Nav Completion

**File:** `src/components/layout/header.tsx`
**Also:** `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`

Expand nav from 2 to 4 items matching the desktop mockup:

| Nav item         | Link target                               |
| ---------------- | ----------------------------------------- |
| Acasa            | `/${locale}`                              |
| Specialisti      | `/${locale}/providers`                    |
| Cum functioneaza | `/${locale}#how-it-works` (anchor scroll) |
| Despre noi       | `#` (placeholder)                         |

Add `id="how-it-works"` to the how-it-works section on the homepage.

Expand `HeaderLabels` type:

```typescript
export type HeaderLabels = {
  home: string;
  providers: string;
  how_it_works: string;
  about: string;
  book_now: string;
  open_menu: string;
  close_menu: string;
};
```

### A2. Footer Restructuring

**File:** `src/components/layout/footer.tsx`
**Also:** `src/app/[locale]/layout.tsx`

Restructure from single flat row to organized layout:

- Column 1: Logo repeat (accent bar + "Forever Clean") + copyright
- Column 2: Navigation links (Home, Providers)
- Column 3: Legal links (Termeni, Confidentialitate, Contact) — `href="#"` placeholders

Mobile: stacked columns. Desktop: 3-column flex row.

Expand `FooterLabels` type:

```typescript
export type FooterLabels = {
  home: string;
  providers: string;
  terms: string;
  privacy: string;
  contact_label: string;
  footer_copyright: string;
  footer_contact: string;
};
```

### A3. Mobile Menu Animation

**File:** `src/components/layout/header.tsx`

Replace instant `{isMenuOpen && <nav>}` with always-rendered nav using CSS transitions:

- Menu: `max-h-0 overflow-hidden` -> `max-h-[300px]` with `transition-all duration-300 ease-in-out`
- Backdrop: fixed overlay with `bg-black/30`, `transition-opacity duration-300`
- Backdrop click closes the menu

---

## Area B: Homepage Addition

### B1. Popular Services Grid

**New file:** `src/components/home/popular-services.tsx` (server component)

```typescript
interface PopularServicesProps {
  services: {
    value: string;
    label: string;
    icon: string;
    startingPrice: number;
  }[];
  title: string;
  priceLabel: string; // template: "de la {{price}} lei/m2"
}
```

- 2x2 grid mobile (`grid-cols-2 gap-2.5`), 4-col desktop (`md:grid-cols-4`)
- Each card: Lucide icon (static map lookup) + service name + starting price
- Starting prices computed from mock data (min `pricePerSqm` per service type)
- Top 4 services by provider count
- Section placed between Featured Providers and How It Works on homepage

---

## Area C: Card Polish

### C1. Hover Effects

**File:** `src/components/providers/provider-card.tsx`

- List/grid variants: `hover:border-[#c4c0d0] hover:shadow-sm transition-colors duration-150`
- Mini variant: `hover:bg-bg-surface rounded-lg transition-colors duration-150`
- The `#c4c0d0` value is from the design system spec (card hover border), used as Tailwind arbitrary value

---

## New i18n Keys

### `nav` namespace

| Key            | RO                  | RU                    |
| -------------- | ------------------- | --------------------- |
| `how_it_works` | Cum functioneaza    | Как это работает      |
| `about`        | Despre noi          | О нас                 |
| `terms`        | Termeni si conditii | Условия использования |
| `privacy`      | Confidentialitate   | Конфиденциальность    |
| `contact`      | Contact             | Контакт               |

### `home` namespace

| Key                      | RO                     | RU                  |
| ------------------------ | ---------------------- | ------------------- |
| `popular_services_title` | Servicii populare      | Популярные услуги   |
| `starting_from`          | de la {{price}} lei/m2 | от {{price}} лей/м2 |

---

## Files Summary

### New files (1)

1. `src/components/home/popular-services.tsx` — server component, services grid

### Modified files (5)

1. `src/lib/i18n/messages/ro.json` — ~10 new keys
2. `src/lib/i18n/messages/ru.json` — ~10 new keys
3. `src/components/layout/header.tsx` — 4 nav items, animated mobile menu + backdrop
4. `src/components/layout/footer.tsx` — 3-column restructure, legal links, logo repeat
5. `src/components/providers/provider-card.tsx` — hover effects

### Also touched

- `src/app/[locale]/page.tsx` — add `id="how-it-works"`, integrate Popular Services
- `src/app/[locale]/layout.tsx` — pass new header/footer label props

---

## Verification

- A1: 4 nav links visible on desktop, "Cum functioneaza" anchor-scrolls on homepage
- A2: Footer shows logo + nav + legal links in organized columns
- A3: Mobile menu slides down smoothly with backdrop, backdrop click closes
- B1: 2x2 mobile / 4-col desktop grid with correct icons and starting prices
- C1: Provider card border darkens on hover with smooth transition
- `pnpm type-check` — zero errors
- `pnpm build` — succeeds
- `pnpm vitest run` — all existing tests pass
- Both `/ro` and `/ru` render all new content correctly
- Zero hardcoded RO/RU text
- Responsive: check at 375px, 768px, 1200px

---

## Deferred to MVP: UX Polish Phase 2

These items from the competitive research are valuable but not essential for POC validation:

| Item                                                 | Inspiration           | Why deferred                                        |
| ---------------------------------------------------- | --------------------- | --------------------------------------------------- |
| Stats row (provider count, avg rating, review total) | Booking.com           | Mock data stats feel hollow — better with real data |
| "Why Forever Clean?" trust signals section           | Booking.com, SkyMonde | No real trust to signal yet in POC                  |
| Testimonial highlights on homepage                   | Booking.com           | Mock testimonials don't build real trust            |
| Rating labels ("Excelent", "Foarte bun")             | Booking.com           | Polish, not core UX                                 |
| Quick-filter chips below hero search                 | Kayak                 | Search form already handles this                    |
| FAQ accordion with JSON-LD                           | Kayak, SkyMonde       | SEO play, not needed until real launch              |
| Mobile nav filled active icon                        | Mockup                | Cosmetic, current color-change works                |
