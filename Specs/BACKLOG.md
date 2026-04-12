# BACKLOG.md — Feature Backlog

All user stories organized by delivery phase. Each story has acceptance criteria expressed as checkboxes. A story is done when all boxes are checked.

---

## Phase 1: POC

**Goal:** Validate demand — 10+ providers listed, 50+ booking requests in 30 days
**Constraints:** Frontend only, mock data, no backend/auth/database

---

### POC-001: Homepage & search

**As a** client visiting the site for the first time,
**I want to** see what the platform offers and search for cleaning services,
**so that** I can quickly find a provider.

- [ ] Hero section with value proposition in current locale (RO or RU)
- [ ] Search bar: select service type (dropdown) + select neighborhood (dropdown)
- [ ] "Search" button navigates to provider listing with filters applied
- [ ] 3–4 featured providers shown below hero (highest-rated from mock data)
- [ ] "How it works" section: 3 steps (Search → Book → Enjoy)
- [ ] Footer with language switcher, contact info, placeholder legal links
- [ ] Fully responsive: mobile-first layout
- [ ] Page loads in under 2 seconds on 3G

---

### POC-002: Provider listing with filters

**As a** client searching for cleaning,
**I want to** browse and filter available providers,
**so that** I can compare options and find the best fit.

- [ ] Grid/list of provider cards: photo, company name, rating (stars + count), price/m², service tags, neighborhoods
- [ ] Filters: service type, neighborhood, price range (slider or min/max), minimum rating
- [ ] Sort: rating (default), price low→high, price high→low, review count
- [ ] Filter state reflected in URL query params (shareable/bookmarkable)
- [ ] "No results" state with suggestion to broaden filters
- [ ] Provider count shown ("12 providers found")
- [ ] Cards clickable → navigate to provider profile
- [ ] Mobile: filters in collapsible drawer/sheet

---

### POC-003: Provider profile page

**As a** client evaluating a specific provider,
**I want to** see their full profile, photos, services, and reviews,
**so that** I can decide whether to book them.

- [ ] Header: company name, rating, review count, verified badge, profile photo
- [ ] Photo gallery: up to 6 photos, lightbox on click
- [ ] About section: bio in current locale
- [ ] Services list with prices (per m² or flat rate)
- [ ] Coverage areas: list of neighborhoods served
- [ ] Availability: general weekly schedule (not real-time slots)
- [ ] Reviews section: list sorted newest first (rating, comment, client name, date)
- [ ] "Book this provider" CTA button → navigates to booking page
- [ ] Breadcrumb: Home > Providers > [Provider Name]
- [ ] SEO: meta title/description, Open Graph tags, JSON-LD structured data

---

### POC-004: Booking request flow

**As a** client who has chosen a provider,
**I want to** submit a booking request with my requirements,
**so that** the provider can contact me to confirm.

- [ ] Step 1 — Service: choose service type (radio buttons)
- [ ] Step 2 — Rooms: room-by-room counters (bedrooms, bathrooms, kitchen, living room, balcony)
- [ ] Step 3 — Add-ons: optional extras with prices (window cleaning, carpet, balcony, oven, fridge)
- [ ] Step 4 — Schedule: preferred date (date picker, min: tomorrow) + time slot (morning/afternoon/evening)
- [ ] Step 5 — Contact: name, phone, email (required), notes (optional)
- [ ] Step 6 — Summary: all selections + total price + provider info + confirm button
- [ ] Price calculator visible throughout, updates reactively
- [ ] Formula: `(total_sqm × price_per_sqm) + add_ons - discount`
- [ ] Submit → success confirmation with booking reference number (e.g., FC-2026-00042)
- [ ] Mock submission: in-memory only, no persistence
- [ ] Validation: required fields, phone format, date not in past
- [ ] Mobile: step-by-step wizard (one step per screen)

---

### POC-005: Review display

**As a** client browsing providers,
**I want to** see authentic reviews from past clients,
**so that** I can trust the provider's quality.

- [ ] Each review: client first name + last initial, star rating, comment, date
- [ ] Average rating on provider card and profile
- [ ] Review count shown (e.g., "24 reviews")
- [ ] Reviews sorted newest-first on profile
- [ ] No review submission in POC — mock data only
- [ ] Star rendering: filled/unfilled stars (not just numbers)

---

### POC-006: Bilingual support (RO + RU)

**As a** Russian-speaking resident of Chișinău,
**I want to** use the platform in Russian,
**so that** I can understand everything without language barriers.

- [ ] URL-based locale: `/ro/...` and `/ru/...`
- [ ] Language switcher in header (RO | RU toggle)
- [ ] All UI strings translated: buttons, labels, headings, form fields, errors, placeholders
- [ ] Provider content (bio, service names) in both RO and RU from mock data
- [ ] Reviews in original language (no translation)
- [ ] Auto-detect browser `Accept-Language` on first visit
- [ ] Locale persisted in cookie (`NEXT_LOCALE`)
- [ ] Switching language preserves current page and scroll position

---

### POC-007: PWA basics

**As a** mobile user,
**I want to** install the app on my home screen,
**so that** it feels like a native app.

- [ ] Valid `manifest.json` with name, icons (192px, 512px), theme color
- [ ] "Add to Home Screen" prompt on Android Chrome
- [ ] Standalone mode (no browser chrome) when installed
- [ ] Service worker: cache app shell for faster loads
- [ ] Offline fallback page: "You're offline" with retry button
- [ ] Viewport meta tag: mobile-optimized, no-zoom

---

### POC-008: SEO foundation

**As a** potential client searching Google for "curățenie Chișinău",
**I want to** find Forever Clean in search results,
**so that** I can discover the platform organically.

- [ ] All public pages server-side rendered (SSR or SSG)
- [ ] Unique meta title and description per page
- [ ] JSON-LD structured data: Organization (homepage), LocalBusiness + AggregateRating (provider profiles)
- [ ] sitemap.xml generated from provider slugs
- [ ] robots.txt allowing all crawlers
- [ ] Hreflang tags linking RO ↔ RU versions
- [ ] Canonical URLs on all pages
- [ ] Open Graph + Twitter Card meta tags on provider profiles

---

### POC mock data specification

**8 fictional providers.** Generate realistic data matching this table:

| # | Company | Slug | Price/m² | Rating | Reviews | Areas | Services |
|---|---------|------|----------|--------|---------|-------|----------|
| 1 | Cristal Plus | cristal-plus | 35 | 4.8 | 47 | Centru, Botanica | General, Deep, Windows |
| 2 | AquaFresh Clean | aquafresh-clean | 42 | 4.6 | 31 | Buiucani, Rîșcani | General, Post-renovation, Carpet |
| 3 | ProCurat | procurat | 50 | 4.9 | 62 | Centru, Telecentru, Botanica | General, Deep, Post-renovation, Windows, Carpet |
| 4 | SunShine MD | sunshine-md | 38 | 4.3 | 18 | Ciocana, Botanica | General, Maintenance |
| 5 | EcoClean Moldova | ecoclean-moldova | 45 | 4.7 | 39 | All neighborhoods | General, Deep, Upholstery, Carpet |
| 6 | CasaCurată | casa-curata | 33 | 4.4 | 22 | Sculeni, Buiucani, Poșta Veche | General, Maintenance, Windows |
| 7 | Diamond Cleaning | diamond-cleaning | 55 | 4.9 | 85 | Centru, Botanica, Telecentru | All services |
| 8 | MoldoClean Express | moldoclean-express | 40 | 4.5 | 28 | Ciocana, Rîșcani, Durlești | General, Post-renovation, Move-in/out |

**Per provider, generate:**
- Bio: 2–3 sentences in RO and RU
- Phone: +373 XX XXX XXX format
- Instagram handle
- Photo URLs: use placeholder images (e.g., `/images/providers/[slug]-[1-6].jpg` — actual images not needed for POC, use colored placeholder divs or Unsplash cleaning photos via URL)
- Weekly availability: realistic schedule (most Mon–Sat 8:00–19:00, some with Sunday)
- 3–8 reviews each: mix of RO and RU comments, ratings 3–5, dates within past 6 months, client names like "Maria T.", "Andrei B.", "Ольга К."

**Add-ons (global, not per-provider):**

| Add-on | Price (MDL) |
|--------|-------------|
| Window cleaning (per window) | 50 |
| Carpet deep clean (per m²) | 25 |
| Balcony cleaning | 150 |
| Oven deep clean | 200 |
| Fridge deep clean | 150 |
| Upholstery cleaning (per item) | 300 |

**Bundle discount:** 10% off when selecting 3+ add-ons.

---

## Phase 2: MVP

**Goal:** 200+ bookings/month, per-lead fee monetization
**Backend:** Supabase (PostgreSQL + Auth + Realtime + Storage), Prisma ORM

---

### MVP-001: Authentication
- Registration: email + password + name + phone + role (CLIENT | PROVIDER)
- Login: email + password, magic link (passwordless)
- Password reset flow
- Session via httpOnly cookies (Supabase SSR)
- Protected routes with role-based redirects
- Profile page: edit name, phone, locale

### MVP-002: Real-time availability
- Providers set weekly recurring schedule (day + start/end time)
- Providers block specific dates/times
- Booking flow shows only available slots for selected date
- Slots with existing confirmed bookings hidden
- Calendar: client sees next 14 days with available/unavailable
- Real-time: Supabase Realtime removes booked slots for other viewers

### MVP-003: Instant booking
- Auto-accept providers: confirmed immediately on booking
- Manual providers: REQUESTED status, 2hr response window
- No response in 2hr: client notified, suggest alternatives
- Confirmation screen + email (Resend)
- Status flow: REQUESTED → CONFIRMED → IN_PROGRESS → COMPLETED

### MVP-004: Provider dashboard
- Overview: bookings this week/month, avg rating, revenue estimate
- Booking list: pending/upcoming/past with status filters
- Accept/reject with optional message
- Calendar: weekly view with booked/available/blocked slots
- Block time: select date + time range
- Profile editor: company name, bio RO/RU, services, pricing, photos, coverage
- Photo management: upload 6, reorder, delete
- Analytics: requests received, acceptance rate, avg rating, views
- Client history: past clients, booking count, last booking date
- Settings: auto-accept toggle, notification preferences

### MVP-005: Cross-sell engine
- Post-service-selection add-on suggestions with prices
- Bundle discount: 3+ add-ons = 10% off
- Post-booking email (2 days after): suggest next service
- Seasonal banners on homepage for packages

### MVP-006: Review submission & moderation
- Review request email 4hr after COMPLETED status
- Form: 1–5 stars (required) + comment (optional, min 10 chars)
- One review per booking, no editing
- Status: PENDING → admin approve → visible
- Provider avg rating recalculated on approval
- Admin queue: approve/reject with reason
- Client notified if rejected

### MVP-007: Recurring bookings
- "Make recurring" toggle during booking
- Frequency: weekly, biweekly
- Same-cleaner preference (prioritize same provider)
- Auto-create next booking after current completed
- Pause/cancel from account page
- Discount: 10% weekly, 5% biweekly
- 24hr cancellation notice for individual occurrences

### MVP-008: Notifications
- Email: confirmation, accepted/rejected, reminder 24hr, review request, recurring created
- Push (PWA): new request (provider), confirmed (client), reminder 24hr
- In-app bell: unread count, dropdown list, mark as read
- Preferences: per-channel toggle (email/push) in settings
- All text in user's locale

### MVP-009: Per-lead billing
- Lead counted on: booking request sent + valid client contact info
- Fee: configurable per provider (default 40 MDL/lead)
- Monthly summary in provider dashboard: count, fee, total
- Invoice PDF: auto-generated at month end
- Admin: all providers, monthly leads, total revenue, payment status
- Free tier: first 3 months free for new providers
- Billing is informational (no automated collection in MVP)

### MVP-010: SEO landing pages
- Auto-generated: service type × neighborhood × language
- Each page: unique H1, descriptive text, filtered provider list
- Both RO and RU content
- Proper meta, structured data, hreflang
- Internal linking between related pages
- Target: 160 pages (8 services × 10 neighborhoods × 2 languages)

### MVP-011: Enhanced PWA
- Offline: cached provider list (stale-while-revalidate), cached booking history
- Background Sync: queue bookings offline, submit on reconnect
- Push permission prompt after first completed booking
- Bottom tab bar: Home, Search, My Bookings, Account
- Smooth transitions (no full-page reloads)

### MVP-012: Admin panel
- Provider management: list, filter by status, approve/suspend/reject
- Booking overview: all bookings with date/status filters, search
- Review moderation: pending queue, one-click approve/reject
- Platform stats: providers, bookings (month/all-time), GMV, avg rating
- Content management: CRUD for SEO pages
- Billing: per-provider lead counts, total revenue

---

## Phase 3: Advanced

**Goal:** Payment processing, subscription tiers, full Chișinău coverage
**Backend:** Add MAIB payment gateway, Paynet integration

---

### ADV-001: Payment processing
- MAIB e-commerce gateway (Moldovan bank cards)
- Paynet e-wallet integration
- Client pays → platform holds → release after COMPLETED
- 15% commission on platform-processed transactions
- Weekly provider payout to bank account
- Hybrid: provider chooses per-lead OR commission
- Refund flow for cancellations/disputes
- Payment receipts via email

### ADV-002: Provider subscription tiers
- Free: listing + bookings + basic calendar
- Pro (500 MDL/mo): priority search, advanced calendar, analytics, cross-sell
- Premium (1,200 MDL/mo): certified badge, campaigns, featured placement, account manager
- Manage: upgrade/downgrade/cancel from dashboard
- Billing via MAIB/Paynet

### ADV-003: Advanced analytics
- Demand heatmap: bookings by neighborhood + day/time
- Pricing intelligence: anonymized market averages
- Capacity optimizer: suggest hours based on demand
- Revenue trends: monthly chart, year-over-year
- Competition: rating/price vs. market average

### ADV-004: Smart matching
- Composite score: proximity × rating × response_speed × availability × history
- Same-cleaner priority for recurring clients
- "Recommended for you" based on past bookings
- Quality score (internal): acceptance rate, on-time, reviews, cancellations

### ADV-005: Trust & safety
- Satisfaction guarantee: re-clean if rating below 3
- Damage guarantee fund: 1% of revenue
- Dispute flow: client claim → admin review → refund or re-clean
- Group insurance for Premium providers
- Fraud detection: suspicious patterns, review manipulation

### ADV-006: Client loyalty
- Tiers: Bronze (0+), Silver (5+ bookings), Gold (15+)
- Benefits: Silver 5% off, Gold 10% off + priority + free quarterly add-on
- Points: 1 per 100 MDL, redeemable for discounts
- Referrals: invite → both get 200 MDL credit after first booking

---

## Future backlog

### FUT-001: Gift vouchers
- Purchase: monetary (e.g., 500 MDL) / service-specific (1 cleaning for 60m²) / subscription (1 month weekly)
- Delivery: unique code + printable/digital card
- Redemption: enter code during booking → applies as credit
- Corporate: bulk purchase with custom branding
- Seasonal: Mother's Day, New Year, housewarming
- Expiration: 12 months, reminders at 30/7 days
- Tracking: buyer sees redemption status

### FUT-002: Multi-service marketplace
- Categories: pest control, window repair, handyman, laundry, gardening
- Category-specific booking flows
- Cross-service recommendations

### FUT-003: B2B / corporate portal
- Office cleaning contracts, recurring invoicing
- Multi-location management
- SLA tracking

### FUT-004: Geographic expansion
- Bălți (Moldova second city)
- Iași, Romania (cross-border)
- Multi-city scoped data

### FUT-005: AI features
- Chatbot booking assistant (Claude API)
- Review summarization
- Dynamic pricing
- Photo-based quality scoring

### FUT-006: Advanced payments
- Stripe (when Moldova-supported)
- Revolut Pay
- SEPA direct debit
- Split payments / installments

### FUT-007: White-label SaaS
- License platform to other cities/countries
- Per-tenant branding and config
- Revenue share model
