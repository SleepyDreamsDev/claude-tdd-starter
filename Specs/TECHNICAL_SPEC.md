# Forever Clean — Technical Specification

**Version:** 1.0 · **Date:** April 12, 2026

---

## 1. Tech stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| Framework | Next.js (App Router) | 15.x | SSR + API routes in one codebase |
| Language | TypeScript | 5.x | strict mode enabled |
| Styling | Tailwind CSS | v4 | CSS-first config (no tailwind.config.ts) |
| UI components | shadcn/ui | latest | Copy-paste components, fully customizable |
| State management | TanStack Query | v5 | Server state, caching, optimistic updates |
| ORM | Prisma | 6.x | Type-safe DB access (MVP+) |
| Database | Supabase PostgreSQL | — | Free tier (MVP+) |
| Auth | Supabase Auth | — | Email/password + magic link (MVP+) |
| Realtime | Supabase Realtime | — | Booking status updates (MVP+) |
| Storage | Supabase Storage | — | Provider photos (MVP+) |
| Email | Resend | — | Free tier 100/day (MVP+) |
| Analytics | PostHog | — | Free tier 1M events/mo (MVP+) |
| Testing | Vitest + RTL + Playwright | — | Unit + component + E2E |
| Package manager | pnpm | 9.x | — |
| Deployment | Vercel | Free tier | Auto-deploy from GitHub |
| PWA | Serwist (next-pwa successor) | — | Service worker, manifest, push |

### POC-specific stack notes

In the POC phase there is no backend. All data comes from TypeScript mock files. No Supabase, no Prisma, no auth, no email. The app is a statically-generated Next.js site with in-memory state for the booking form.

The mock data layer (`src/lib/mock-data.ts`) exports functions that mimic future API calls:
```typescript
// These will be replaced with real Prisma/Supabase calls in MVP
export function getProviders(filters?: ProviderFilters): Provider[]
export function getProviderBySlug(slug: string): Provider | null
export function getReviewsByProvider(providerId: string): Review[]
export function submitBookingRequest(data: BookingFormData): BookingConfirmation
```

---

## 2. Project structure

```
forever-clean/
├── public/
│   ├── manifest.json                    # PWA manifest
│   ├── icons/                           # PWA icons (192, 512, maskable)
│   ├── og-image.jpg                     # Default Open Graph image
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── [locale]/                    # Dynamic locale segment (ro | ru)
│   │   │   ├── layout.tsx               # Locale-scoped layout (sets lang, dir)
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── providers/
│   │   │   │   ├── page.tsx             # Provider listing + search/filter
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Provider profile + reviews
│   │   │   ├── booking/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx         # Booking flow for specific provider
│   │   │   ├── account/                 # Client account pages (MVP+)
│   │   │   │   ├── page.tsx             # My bookings
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx         # Profile settings
│   │   │   └── [...slug]/
│   │   │       └── page.tsx             # Catch-all for SEO landing pages (MVP+)
│   │   ├── (provider)/                  # Provider dashboard group (MVP+)
│   │   │   └── dashboard/
│   │   │       ├── layout.tsx           # Dashboard layout (sidebar nav)
│   │   │       ├── page.tsx             # Overview
│   │   │       ├── bookings/page.tsx    # Manage bookings
│   │   │       ├── calendar/page.tsx    # Availability calendar
│   │   │       ├── profile/page.tsx     # Edit profile
│   │   │       ├── analytics/page.tsx   # Performance stats
│   │   │       └── billing/page.tsx     # Lead billing (MVP+)
│   │   ├── (admin)/                     # Admin panel group (MVP+)
│   │   │   └── admin/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx             # Admin overview
│   │   │       ├── providers/page.tsx   # Manage providers
│   │   │       ├── reviews/page.tsx     # Moderate reviews
│   │   │       └── analytics/page.tsx   # Platform analytics
│   │   ├── api/                         # API routes (MVP+)
│   │   │   ├── providers/route.ts
│   │   │   ├── bookings/route.ts
│   │   │   ├── reviews/route.ts
│   │   │   └── webhooks/route.ts
│   │   ├── layout.tsx                   # Root layout (fonts, metadata)
│   │   ├── globals.css                  # Tailwind imports + CSS variables
│   │   ├── not-found.tsx                # 404 page
│   │   └── sitemap.ts                   # Dynamic sitemap generation
│   ├── components/
│   │   ├── ui/                          # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx               # Mobile filter drawer
│   │   │   ├── slider.tsx
│   │   │   ├── star-rating.tsx         # Custom: filled/unfilled stars
│   │   │   └── ...                     # Other shadcn components as needed
│   │   ├── layout/
│   │   │   ├── header.tsx              # Site header with nav + language switcher
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx          # Bottom tab bar (PWA)
│   │   │   ├── locale-switcher.tsx     # RO/RU toggle
│   │   │   └── breadcrumbs.tsx
│   │   ├── providers/
│   │   │   ├── provider-card.tsx       # Card for listing grid
│   │   │   ├── provider-filters.tsx    # Filter sidebar/drawer
│   │   │   ├── provider-gallery.tsx    # Photo gallery with lightbox
│   │   │   ├── provider-services.tsx   # Service list with prices
│   │   │   └── provider-reviews.tsx    # Review list
│   │   ├── booking/
│   │   │   ├── booking-wizard.tsx      # Multi-step booking form
│   │   │   ├── room-selector.tsx       # Room count inputs
│   │   │   ├── addon-selector.tsx      # Add-on checkboxes with prices
│   │   │   ├── date-picker.tsx         # Date selection
│   │   │   ├── time-slot-picker.tsx    # Time slot selection
│   │   │   ├── price-calculator.tsx    # Live price display
│   │   │   └── booking-summary.tsx     # Pre-submit summary
│   │   └── shared/
│   │       ├── seo-head.tsx            # Reusable meta/OG tags
│   │       └── empty-state.tsx         # "No results" component
│   ├── lib/
│   │   ├── mock-data.ts               # POC: all mock providers, reviews, bookings
│   │   ├── types.ts                   # Shared TypeScript interfaces
│   │   ├── constants.ts               # Service types, neighborhoods, pricing
│   │   ├── utils.ts                   # cn() helper, formatPrice(), etc.
│   │   ├── pricing.ts                 # Price calculation logic
│   │   ├── i18n/
│   │   │   ├── config.ts              # Supported locales, default locale
│   │   │   ├── get-dictionary.ts      # Load translations by locale
│   │   │   └── messages/
│   │   │       ├── ro.json            # Romanian translations
│   │   │       └── ru.json            # Russian translations
│   │   └── supabase/                  # MVP+: Supabase client config
│   │       ├── client.ts              # Browser client
│   │       ├── server.ts              # Server client (cookies)
│   │       └── middleware.ts           # Auth middleware
│   ├── hooks/
│   │   ├── use-locale.ts             # Current locale hook
│   │   ├── use-dictionary.ts         # Translation hook
│   │   └── use-providers.ts          # Provider data hook (wraps mock/real)
│   └── types/
│       └── index.ts                   # Re-export all types
├── prisma/                            # MVP+
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
│   ├── unit/
│   │   ├── pricing.test.ts
│   │   └── utils.test.ts
│   ├── components/
│   │   ├── provider-card.test.tsx
│   │   └── booking-wizard.test.tsx
│   └── e2e/
│       ├── booking-flow.spec.ts
│       └── provider-browse.spec.ts
├── next.config.ts
├── postcss.config.js
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
├── .env.example
├── .gitignore
├── CLAUDE.md                          # Instructions for Claude Code
├── PRD.md                             # This PRD
└── README.md
```

---

## 3. Data model

### TypeScript types (used across all phases — mock and real)

```typescript
// src/lib/types.ts

export type Locale = "ro" | "ru";

export type ServiceType =
  | "GENERAL_CLEANING"
  | "DEEP_CLEANING"
  | "POST_RENOVATION"
  | "MAINTENANCE"
  | "WINDOW_CLEANING"
  | "CARPET_CLEANING"
  | "UPHOLSTERY_CLEANING"
  | "MOVE_IN_OUT";

export type Neighborhood =
  | "centru"
  | "botanica"
  | "buiucani"
  | "ciocana"
  | "riscani"
  | "telecentru"
  | "durlesti"
  | "sculeni"
  | "posta-veche"
  | "rascanovca";

export type BookingStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED_CLIENT"
  | "CANCELLED_PROVIDER";

export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

// --- Provider ---

export interface Provider {
  id: string;
  slug: string;
  companyName: string;
  bio: { ro: string; ru: string };
  phone: string;
  email: string;
  instagramHandle?: string;
  website?: string;
  photoUrls: string[];
  services: ServiceType[];
  pricePerSqm: number; // MDL
  minBooking?: number; // MDL
  coverageAreas: Neighborhood[];
  availability: AvailabilitySlot[];
  ratingAvg: number;
  reviewCount: number;
  verified: boolean;
  createdAt: string; // ISO date
}

export interface AvailabilitySlot {
  dayOfWeek: DayOfWeek;
  startTime: string; // "09:00"
  endTime: string;   // "18:00"
}

// --- Review ---

export interface Review {
  id: string;
  providerId: string;
  clientName: string; // "Maria T."
  rating: number; // 1-5
  comment: string;
  locale: Locale; // original language of review
  createdAt: string; // ISO date
}

// --- Booking ---

export interface RoomConfig {
  bedrooms: number;
  bathrooms: number;
  kitchen: number;
  livingRoom: number;
  balcony: number;
}

export interface AddOn {
  type: string;
  label: { ro: string; ru: string };
  priceMdl: number;
}

export interface BookingFormData {
  providerId: string;
  serviceType: ServiceType;
  rooms: RoomConfig;
  totalSqm: number;
  addOns: string[]; // add-on type keys
  preferredDate: string; // ISO date
  preferredTime: "morning" | "afternoon" | "evening";
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  notes?: string;
}

export interface BookingConfirmation {
  id: string;
  referenceNumber: string; // "FC-2026-00042"
  provider: Pick<Provider, "companyName" | "phone" | "slug">;
  serviceType: ServiceType;
  scheduledDate: string;
  scheduledTime: string;
  totalPriceMdl: number;
  status: BookingStatus;
}

// --- Filters ---

export interface ProviderFilters {
  serviceType?: ServiceType;
  neighborhood?: Neighborhood;
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  sortBy?: "rating" | "price_asc" | "price_desc" | "reviews";
  search?: string;
}

// --- i18n ---

export type Dictionary = Record<string, string | Record<string, string>>;
```

### Prisma schema (MVP+ — see PRD.md Appendix or TECHNICAL_SPEC for the full schema)

The full Prisma schema is defined in the PRD document Section 8. During MVP migration from mock data to Supabase:

1. Initialize Prisma: `pnpm prisma init`
2. Copy schema from PRD Section 8 into `prisma/schema.prisma`
3. Set `DATABASE_URL` to Supabase pooled connection string
4. Set `DIRECT_URL` to Supabase direct connection string
5. Run `pnpm prisma migrate dev --name init`
6. Run `pnpm prisma db seed` with seed data

---

## 4. API contracts

### POC: Mock data functions

No API routes in POC. Components call mock functions directly:

```typescript
// src/lib/mock-data.ts — exported functions

getProviders(filters?: ProviderFilters): Provider[]
// Returns filtered, sorted array. Applies all filter criteria in-memory.

getProviderBySlug(slug: string): Provider | null
// Returns single provider or null.

getReviewsByProvider(providerId: string): Review[]
// Returns reviews sorted by date descending.

submitBookingRequest(data: BookingFormData): BookingConfirmation
// Generates a confirmation with random reference number. In-memory only.

getFeaturedProviders(): Provider[]
// Returns top 4 providers by rating.

getNeighborhoods(): { value: Neighborhood; label: { ro: string; ru: string } }[]
// Returns list of all neighborhoods with localized names.

getServiceTypes(): { value: ServiceType; label: { ro: string; ru: string }; icon: string }[]
// Returns list of all service types with localized names and Lucide icon names.

getAddOns(): AddOn[]
// Returns available add-on services with prices.
```

### MVP+: REST API routes

See PRD.md Section 9 for the full API route specification. Key patterns:

**Request format:** JSON body for POST/PATCH, query params for GET filters
**Response format:**
```typescript
// Success
{ data: T, meta?: { page: number; limit: number; total: number } }

// Error
{ error: { code: string; message: string; details?: unknown } }
```

**Authentication:** Supabase JWT in httpOnly cookie, validated in middleware
**Authorization:** Role check (CLIENT, PROVIDER, ADMIN) per route group

---

## 5. Pricing logic

Pricing is deterministic and calculated client-side (validated server-side in MVP+):

```typescript
// src/lib/pricing.ts

export const DEFAULT_SQM_PER_ROOM: Record<string, number> = {
  bedrooms: 14,    // m² per bedroom
  bathrooms: 5,    // m² per bathroom
  kitchen: 10,     // m² per kitchen
  livingRoom: 20,  // m² per living room
  balcony: 4,      // m² per balcony
};

export function calculateTotalSqm(rooms: RoomConfig): number {
  return (
    rooms.bedrooms * DEFAULT_SQM_PER_ROOM.bedrooms +
    rooms.bathrooms * DEFAULT_SQM_PER_ROOM.bathrooms +
    rooms.kitchen * DEFAULT_SQM_PER_ROOM.kitchen +
    rooms.livingRoom * DEFAULT_SQM_PER_ROOM.livingRoom +
    rooms.balcony * DEFAULT_SQM_PER_ROOM.balcony
  );
}

export function calculatePrice(
  totalSqm: number,
  pricePerSqm: number,
  addOns: AddOn[],
  discountPercent: number = 0
): { base: number; addOnsTotal: number; discount: number; total: number } {
  const base = totalSqm * pricePerSqm;
  const addOnsTotal = addOns.reduce((sum, a) => sum + a.priceMdl, 0);
  const subtotal = base + addOnsTotal;
  const discount = Math.round(subtotal * (discountPercent / 100));
  const total = subtotal - discount;
  return { base, addOnsTotal, discount, total };
}
```

---

## 6. i18n implementation

### Approach: Server-side dictionary loading with `[locale]` route segment

```typescript
// src/lib/i18n/config.ts
export const locales = ["ro", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ro";

// src/lib/i18n/get-dictionary.ts
import type { Locale } from "./config";

const dictionaries = {
  ro: () => import("./messages/ro.json").then((m) => m.default),
  ru: () => import("./messages/ru.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
```

### Translation file structure

```json
// src/lib/i18n/messages/ro.json
{
  "common": {
    "search": "Caută",
    "book_now": "Rezervă acum",
    "view_profile": "Vezi profilul",
    "filters": "Filtre",
    "sort_by": "Sortează după",
    "no_results": "Nu s-au găsit rezultate",
    "loading": "Se încarcă...",
    "back": "Înapoi",
    "next": "Următorul",
    "submit": "Trimite",
    "cancel": "Anulează",
    "close": "Închide",
    "reviews": "recenzii",
    "per_sqm": "lei/m²",
    "mdl": "lei"
  },
  "home": {
    "hero_title": "Curățenie profesională în Chișinău",
    "hero_subtitle": "Găsește și rezervă specialiști verificați în 60 de secunde",
    "search_service": "Tip de serviciu",
    "search_area": "Cartier",
    "how_it_works": "Cum funcționează",
    "step1_title": "Caută",
    "step1_desc": "Alege serviciul și cartierul tău",
    "step2_title": "Compară",
    "step2_desc": "Vezi prețuri, recenzii și disponibilitate",
    "step3_title": "Rezervă",
    "step3_desc": "Confirmă rezervarea în câteva secunde",
    "featured_title": "Specialiști de top"
  },
  "providers": {
    "title": "Servicii de curățenie",
    "found_count": "{{count}} specialiști găsiți",
    "min_rating": "Rating minim",
    "price_range": "Interval preț",
    "all_services": "Toate serviciile",
    "all_areas": "Toate cartierele",
    "verified": "Verificat",
    "sort_rating": "Rating",
    "sort_price_asc": "Preț: mic → mare",
    "sort_price_desc": "Preț: mare → mic",
    "sort_reviews": "Nr. recenzii"
  },
  "booking": {
    "title": "Rezervare",
    "step_service": "Serviciu",
    "step_rooms": "Camere",
    "step_addons": "Extra",
    "step_schedule": "Programare",
    "step_contact": "Contact",
    "step_summary": "Sumar",
    "service_type": "Tipul serviciului",
    "bedrooms": "Dormitoare",
    "bathrooms": "Băi",
    "kitchen": "Bucătărie",
    "living_room": "Living",
    "balcony": "Balcon",
    "preferred_date": "Data preferată",
    "preferred_time": "Ora preferată",
    "morning": "Dimineața (8:00–12:00)",
    "afternoon": "După-amiaza (12:00–17:00)",
    "evening": "Seara (17:00–20:00)",
    "your_name": "Numele dvs.",
    "your_phone": "Telefon",
    "your_email": "Email",
    "notes": "Note adiționale",
    "estimated_price": "Preț estimat",
    "base_price": "Preț de bază",
    "add_ons_price": "Servicii extra",
    "total": "Total",
    "confirm_booking": "Confirmă rezervarea",
    "success_title": "Rezervare trimisă!",
    "success_message": "Furnizorul vă va contacta în cel mai scurt timp pentru confirmare.",
    "reference": "Referință"
  },
  "services": {
    "GENERAL_CLEANING": "Curățenie generală",
    "DEEP_CLEANING": "Curățenie profundă",
    "POST_RENOVATION": "Curățenie după reparație",
    "MAINTENANCE": "Curățenie de întreținere",
    "WINDOW_CLEANING": "Spălarea geamurilor",
    "CARPET_CLEANING": "Curățarea covoarelor",
    "UPHOLSTERY_CLEANING": "Curățare mobilier moale",
    "MOVE_IN_OUT": "Curățenie la mutare"
  },
  "neighborhoods": {
    "centru": "Centru",
    "botanica": "Botanica",
    "buiucani": "Buiucani",
    "ciocana": "Ciocana",
    "riscani": "Rîșcani",
    "telecentru": "Telecentru",
    "durlesti": "Durlești",
    "sculeni": "Sculeni",
    "posta-veche": "Poșta Veche",
    "rascanovca": "Râșcanovca"
  }
}
```

Russian (`ru.json`) follows the identical key structure with Russian translations.

---

## 7. PWA specification

### manifest.json

```json
{
  "name": "Forever Clean — Servicii de Curățenie",
  "short_name": "Forever Clean",
  "description": "Rezervă specialiști de curățenie verificați în Chișinău",
  "start_url": "/ro",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#16a34a",
  "orientation": "portrait-primary",
  "scope": "/",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "categories": ["lifestyle", "utilities"]
}
```

### Service worker caching (POC)

| Resource | Strategy |
|----------|----------|
| App shell (HTML pages) | Network-first, fallback to cache |
| Static assets (JS, CSS, fonts) | Cache-first |
| Images | Cache-first, 7-day expiry |
| API calls | Network-only (POC has no API) |
| Offline | Show `/offline` fallback page |

### Service worker caching (MVP+)

| Resource | Strategy | TTL |
|----------|----------|-----|
| App shell | Network-first | 24hr |
| Static assets | Cache-first | 30 days |
| Provider list API | Stale-while-revalidate | 5min |
| Provider profile API | Stale-while-revalidate | 10min |
| Booking data | Network-only | — |
| Images | Cache-first | 7 days |

---

## 8. SEO implementation

### Per-page meta tags

| Page | Title pattern | Description pattern |
|------|--------------|-------------------|
| Homepage | Forever Clean — Curățenie profesională în Chișinău | Găsește și rezervă specialiști de curățenie verificați... |
| Provider listing | Servicii de curățenie Chișinău — Forever Clean | Compară prețuri, recenzii și disponibilitate... |
| Provider profile | {companyName} — Curățenie în Chișinău | {bio excerpt}... Rating: {rating}/5 ({reviewCount} recenzii) |
| Booking | Rezervare — {companyName} | Rezervă curățenie profesională cu {companyName}... |
| SEO landing | Curățenie {serviceType} {neighborhood} | Specialiști de curățenie {serviceType} în {neighborhood}... |

### Structured data (JSON-LD)

Provider profile pages include:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "ProCurat",
  "description": "...",
  "telephone": "+373 69 123 456",
  "address": { "@type": "PostalAddress", "addressLocality": "Chișinău", "addressCountry": "MD" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "62"
  },
  "priceRange": "$$"
}
```

---

## 9. Performance budgets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥90 |
| Lighthouse Accessibility | ≥95 |
| Lighthouse SEO | ≥95 |
| First Contentful Paint | <1.5s |
| Largest Contentful Paint | <2.5s |
| Cumulative Layout Shift | <0.1 |
| First Load JS (gzipped) | <100KB |
| Per-route JS (gzipped) | <50KB |
| Total CSS (gzipped) | <30KB |

---

## 10. Environment variables

```bash
# .env.example

# === POC (no backend) ===
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=ro

# === MVP+ (Supabase) ===
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=

# === MVP+ (Email) ===
RESEND_API_KEY=

# === MVP+ (Analytics) ===
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# === Advanced (Payments) ===
MAIB_MERCHANT_ID=
MAIB_SECRET_KEY=
PAYNET_API_KEY=
```
