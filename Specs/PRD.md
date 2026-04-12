# Forever Clean — Product Requirements Document

**Version:** 1.0 · **Date:** April 12, 2026 · **Status:** Active

---

## Product overview

Forever Clean is a cleaning services marketplace for Chișinău, Moldova. It connects residential cleaning providers with clients through a web platform (PWA for mobile). The platform earns revenue through per-lead fees charged to providers, evolving to transaction commission in later phases.

### Target users

| Persona | Description | Primary goal |
|---------|-------------|-------------|
| **Client** | Chișinău resident, 25–45, tech-savvy, time-poor | Find and book a verified cleaner in under 60 seconds |
| **Provider** | Cleaning company (5–50 employees) or independent cleaner | Receive qualified booking leads without marketing spend |
| **Admin** | Platform operator | Manage providers, moderate reviews, track platform health |

### Languages

Bilingual from day one: Romanian (primary) and Russian (secondary). Every user-facing string, every database content field, every SEO page must exist in both languages. URL structure: `/ro/...` and `/ru/...`.

### Competitive positioning

Forever Clean competes against TopMaster.md (generalist bidding marketplace) and direct provider booking (phone/Viber). Key differentiators: instant booking (vs. bidding), cleaning-specific UX, verified reviews, real-time availability, and recurring subscription support.

---

## Phase 1: POC (Proof of Concept)

**Duration:** 4 weeks · **Goal:** Validate demand — 10+ providers listed, 50+ booking requests in 30 days
**Backend:** Mock data layer (TypeScript files). No database, no auth service. All data is in-memory/static.
**Budget:** $0 (Vercel free tier)

### POC-001: Homepage & search

**As a** client visiting the site for the first time,
**I want to** see what the platform offers and search for cleaning services,
**so that** I can quickly find a provider.

**Acceptance criteria:**
- [ ] Hero section with value proposition in current locale (RO or RU)
- [ ] Search bar: select service type (dropdown) + select neighborhood (dropdown)
- [ ] "Search" button navigates to provider listing with filters applied
- [ ] 3–4 featured providers shown below hero (highest-rated from mock data)
- [ ] "How it works" section: 3 steps (Search → Book → Enjoy)
- [ ] Footer with language switcher, contact info, and placeholder legal links
- [ ] Fully responsive: mobile-first layout
- [ ] Page loads in under 2 seconds on 3G

### POC-002: Provider listing with filters

**As a** client searching for cleaning,
**I want to** browse and filter available providers,
**so that** I can compare options and find the best fit.

**Acceptance criteria:**
- [ ] Grid/list of provider cards showing: photo, company name, rating (stars + count), price per m², services offered (tags), neighborhoods served
- [ ] Filters: service type, neighborhood, price range (slider or min/max), minimum rating
- [ ] Sort by: rating (default), price low→high, price high→low, review count
- [ ] Filter state reflected in URL query params (shareable/bookmarkable)
- [ ] "No results" state with suggestion to broaden filters
- [ ] Provider count shown ("12 providers found")
- [ ] Cards are clickable → navigate to provider profile page
- [ ] Mobile: filters in collapsible drawer/sheet

### POC-003: Provider profile page

**As a** client evaluating a specific provider,
**I want to** see their full profile, photos, services, and reviews,
**so that** I can decide whether to book them.

**Acceptance criteria:**
- [ ] Provider header: company name, rating, review count, verified badge (if applicable), profile photo
- [ ] Photo gallery: up to 6 photos, lightbox on click
- [ ] About section: bio in current locale (RO or RU)
- [ ] Services list with prices (per m² or flat rate)
- [ ] Coverage areas: list of neighborhoods served
- [ ] Availability: general schedule (Mon–Fri 9:00–18:00, etc.) — not real-time slots
- [ ] Reviews section: list of reviews (rating, comment, client name, date), sorted newest first
- [ ] "Book this provider" CTA button → navigates to booking page
- [ ] Breadcrumb navigation: Home > Providers > [Provider Name]
- [ ] SEO: proper meta title/description, Open Graph tags

### POC-004: Booking request flow

**As a** client who has chosen a provider,
**I want to** submit a booking request with my requirements,
**so that** the provider can contact me to confirm.

**Acceptance criteria:**
- [ ] Step 1 — Service selection: choose service type (radio buttons), select apartment size (room-by-room: bedrooms, bathrooms, kitchen, living room — counter inputs)
- [ ] Step 2 — Add-ons: optional extras (window cleaning, carpet cleaning, balcony) with prices shown
- [ ] Step 3 — Scheduling: preferred date (date picker, min: tomorrow), preferred time slot (morning/afternoon/evening)
- [ ] Step 4 — Contact info: name, phone number, email (required), notes (optional textarea)
- [ ] Price calculator: visible throughout, updates as selections change. Formula: `(total_sqm × price_per_sqm) + add_ons - discount`
- [ ] Summary screen before submission: all selections + total price + provider info
- [ ] Submit button → shows success confirmation with booking reference number
- [ ] Mock submission: booking is "saved" to in-memory state (no persistence needed)
- [ ] Validation: required fields enforced, phone format check, date not in past
- [ ] Mobile: step-by-step wizard (one step per screen), desktop: single-page form

### POC-005: Basic review display

**As a** client browsing providers,
**I want to** see authentic reviews from past clients,
**so that** I can trust the provider's quality.

**Acceptance criteria:**
- [ ] Each review shows: client first name + last initial, star rating, comment text, date
- [ ] Average rating calculated and displayed on provider card and profile
- [ ] Review count shown (e.g., "24 reviews")
- [ ] Reviews sorted newest-first on profile page
- [ ] No review submission in POC — reviews are mock data only
- [ ] Star rendering: filled/unfilled stars (not just numbers)

### POC-006: Bilingual support (RO + RU)

**As a** Russian-speaking resident of Chișinău,
**I want to** use the platform in Russian,
**so that** I can understand everything without language barriers.

**Acceptance criteria:**
- [ ] URL-based locale: `/ro/providers` and `/ru/providers`
- [ ] Language switcher in header (flag icons or "RO | RU" toggle)
- [ ] All UI strings translated: buttons, labels, headings, form fields, error messages, placeholder text
- [ ] Provider content (bio, service names) has separate RO and RU versions in mock data
- [ ] Reviews displayed in their original language (no translation)
- [ ] Locale auto-detected from browser `Accept-Language` header on first visit
- [ ] Locale preference persisted in cookie (`NEXT_LOCALE`)
- [ ] Switching language preserves current page (e.g., `/ro/providers/sparkle` → `/ru/providers/sparkle`)

### POC-007: PWA basics

**As a** mobile user,
**I want to** install the app on my home screen,
**so that** it feels like a native app.

**Acceptance criteria:**
- [ ] Valid `manifest.json` with app name, icons (192px, 512px), theme color, background color
- [ ] "Add to Home Screen" prompt appears on Android Chrome after 2nd visit
- [ ] App launches in standalone mode (no browser chrome) when installed
- [ ] Basic service worker: caches app shell for faster subsequent loads
- [ ] Offline fallback page: "You're offline. Please check your connection." with retry button
- [ ] Viewport meta tag configured for mobile: no-zoom, proper scale

### POC-008: SEO foundation

**As a** potential client searching Google for "curățenie Chișinău",
**I want to** find Forever Clean in search results,
**so that** I can discover the platform organically.

**Acceptance criteria:**
- [ ] All public pages server-side rendered (SSR or SSG)
- [ ] Unique meta title and description per page (provider profiles especially)
- [ ] Structured data (JSON-LD): Organization on homepage, LocalBusiness + AggregateRating on provider profiles
- [ ] Sitemap.xml generated from provider slugs
- [ ] robots.txt allowing all crawlers
- [ ] Hreflang tags linking RO and RU versions of each page
- [ ] Canonical URLs set on all pages
- [ ] Open Graph and Twitter Card meta tags on provider profiles

### POC mock data requirements

Create 8 fictional but realistic Chișinău cleaning providers:

| # | Company name | Slug | Price/m² | Rating | Reviews | Neighborhoods | Services |
|---|-------------|------|----------|--------|---------|--------------|----------|
| 1 | Cristal Plus | cristal-plus | 35 MDL | 4.8 | 47 | Centru, Botanica | General, Deep, Windows |
| 2 | AquaFresh Clean | aquafresh-clean | 42 MDL | 4.6 | 31 | Buiucani, Rîșcani | General, Post-renovation, Carpet |
| 3 | ProCurat | procurat | 50 MDL | 4.9 | 62 | Centru, Telecentru, Botanica | General, Deep, Post-renovation, Windows, Carpet |
| 4 | SunShine MD | sunshine-md | 38 MDL | 4.3 | 18 | Ciocana, Botanica | General, Maintenance |
| 5 | EcoClean Moldova | ecoclean-moldova | 45 MDL | 4.7 | 39 | All neighborhoods | General, Deep, Upholstery, Carpet |
| 6 | CasaCurată | casa-curata | 33 MDL | 4.4 | 22 | Sculeni, Buiucani, Poșta Veche | General, Maintenance, Windows |
| 7 | Diamond Cleaning | diamond-cleaning | 55 MDL | 4.9 | 85 | Centru, Botanica, Telecentru | All services |
| 8 | MoldoClean Express | moldoclean-express | 40 MDL | 4.5 | 28 | Ciocana, Rîșcani, Durlești | General, Post-renovation, Move-in/out |

Each provider needs:
- Bio text in RO and RU (2–3 sentences)
- 3–8 mock reviews (rating + comment in RO or RU + client name + date)
- Weekly availability schedule
- Phone number (format: +373 XX XXX XXX)
- Instagram handle
- Coverage areas from: Centru, Botanica, Buiucani, Ciocana, Rîșcani, Telecentru, Durlești, Sculeni, Poșta Veche, Râșcanovca

---

## Phase 2: MVP

**Duration:** 12 weeks · **Goal:** 200+ bookings/month, introduce per-lead fee monetization
**Backend:** Supabase (PostgreSQL + Auth + Realtime + Storage). Prisma ORM.
**Budget:** $0–20/mo

### MVP-001: Real authentication

**As a** client or provider,
**I want to** create an account and log in securely,
**so that** my bookings and profile are persistent.

**Acceptance criteria:**
- [ ] Registration: email + password + name + phone + role (CLIENT or PROVIDER)
- [ ] Login: email + password
- [ ] Magic link: passwordless login via email
- [ ] Password reset flow
- [ ] Session persisted via httpOnly cookies (Supabase SSR helpers)
- [ ] Protected routes: redirect to login if unauthenticated
- [ ] Role-based access: client routes, provider routes, admin routes
- [ ] Profile page: edit name, phone, locale preference
- [ ] Logout from all devices option

### MVP-002: Real-time provider availability

**As a** client booking a cleaning,
**I want to** see which time slots are actually available,
**so that** I can book a confirmed slot instantly.

**Acceptance criteria:**
- [ ] Providers set weekly recurring availability (e.g., Mon–Fri 9:00–18:00)
- [ ] Providers can block specific dates/times (vacation, sick day)
- [ ] Booking flow shows only available slots for selected date
- [ ] Slots that conflict with existing confirmed bookings are hidden
- [ ] Calendar view: client sees next 14 days with available/unavailable indicators
- [ ] Slot duration calculated from apartment size (estimated hours)
- [ ] Real-time update: if another client books a slot, it disappears for other viewers (Supabase Realtime)

### MVP-003: Instant booking with confirmation

**As a** client,
**I want to** book a cleaning and receive instant confirmation,
**so that** I don't have to wait for the provider to call back.

**Acceptance criteria:**
- [ ] Providers who enable "auto-accept": booking is confirmed immediately
- [ ] Providers with manual confirm: booking status is REQUESTED, provider has 2 hours to accept/reject
- [ ] If provider doesn't respond in 2 hours: client notified, suggestion to book alternative
- [ ] Booking confirmation screen: booking reference, provider name, date/time, price, status
- [ ] Email confirmation sent to client (Resend)
- [ ] Booking appears in client's "My Bookings" page
- [ ] Booking status flow: REQUESTED → CONFIRMED → IN_PROGRESS → COMPLETED

### MVP-004: Provider dashboard

**As a** cleaning company owner,
**I want to** manage my bookings, profile, and availability from a dashboard,
**so that** I can run my business through the platform.

**Acceptance criteria:**
- [ ] Overview page: bookings this week, bookings this month, average rating, total revenue estimate
- [ ] Booking list: incoming (pending), upcoming (confirmed), past (completed), with status filters
- [ ] Accept/reject booking: one-click actions with optional message to client
- [ ] Calendar view: weekly calendar showing booked slots, available slots, blocked slots
- [ ] Block time: select date + time range → mark as unavailable
- [ ] Profile editor: update company name, bio (RO + RU), services, pricing, photos, coverage areas
- [ ] Photo management: upload up to 6 photos, reorder, delete
- [ ] Analytics (basic): booking requests received, acceptance rate, average rating, views this month
- [ ] Client history: list of past clients with booking count and last booking date
- [ ] Settings: auto-accept toggle, notification preferences, availability schedule

### MVP-005: Cross-sell and add-on engine

**As a** client booking a general cleaning,
**I want to** see relevant add-on services I might need,
**so that** I can get everything done in one visit.

**Acceptance criteria:**
- [ ] After selecting base service, show add-on suggestions with prices
- [ ] Add-ons: window cleaning (+X MDL/window), carpet cleaning (+X MDL/m²), balcony (+X MDL), oven deep clean (+X MDL), fridge deep clean (+X MDL)
- [ ] Bundle discount: selecting 3+ add-ons triggers 10% bundle discount
- [ ] Post-booking email (sent 2 days after completed cleaning): "Add window cleaning to your next booking?"
- [ ] Seasonal suggestions: banner on homepage for seasonal packages

### MVP-006: Review submission and moderation

**As a** client who received cleaning service,
**I want to** leave a rating and review,
**so that** future clients can make informed decisions.

**Acceptance criteria:**
- [ ] Review request email sent 4 hours after booking marked COMPLETED
- [ ] Review form: 1–5 star rating (required) + text comment (optional, min 10 chars if provided)
- [ ] One review per booking (cannot edit after submission)
- [ ] Review appears as PENDING → admin approves → appears on provider profile
- [ ] Provider's average rating recalculated on each approved review
- [ ] Admin moderation queue: list of pending reviews with approve/reject actions
- [ ] Rejected reviews: client notified with reason (spam, inappropriate language)

### MVP-007: Recurring booking setup

**As a** client who wants weekly cleaning,
**I want to** set up a recurring booking with the same provider,
**so that** I don't have to rebook every week.

**Acceptance criteria:**
- [ ] Option during booking: "Make this recurring" toggle
- [ ] Frequency options: weekly, biweekly
- [ ] Same-cleaner preference: system prioritizes same provider for recurring bookings
- [ ] Auto-create next booking after current one is completed
- [ ] Client can pause or cancel recurring schedule from account page
- [ ] Recurring discount: 10% off for weekly, 5% off for biweekly
- [ ] Minimum 24-hour cancellation notice for individual occurrences

### MVP-008: Notification system

**As a** user (client or provider),
**I want to** receive timely notifications about my bookings,
**so that** I don't miss important updates.

**Acceptance criteria:**
- [ ] Email notifications: booking confirmation, booking accepted/rejected, reminder (24hr before), review request, recurring booking created
- [ ] Push notifications (PWA): new booking request (provider), booking confirmed (client), reminder (24hr)
- [ ] In-app notification bell: unread count badge, dropdown list, mark as read
- [ ] Notification preferences: per-channel toggle (email on/off, push on/off) in settings
- [ ] All notification text in user's preferred locale

### MVP-009: Per-lead billing infrastructure

**As a** platform operator,
**I want to** track and bill providers for qualified leads,
**so that** the platform generates revenue.

**Acceptance criteria:**
- [ ] Lead counted when: booking request is sent to provider AND client provided valid contact info
- [ ] Lead fee: configurable per provider (default 40 MDL/lead)
- [ ] Monthly billing summary: provider sees lead count, fee per lead, total owed
- [ ] Invoice PDF generation: auto-generated at month end with platform details and payment instructions
- [ ] Admin billing dashboard: all providers, current month leads, total revenue, payment status
- [ ] Free tier: first 3 months free for newly onboarded providers
- [ ] Billing is informational only in MVP — no automated payment collection

### MVP-010: SEO landing pages

**As a** potential client searching "curățenie după reparație Botanica",
**I want to** find a relevant Forever Clean page,
**so that** I can book a provider for my specific need and location.

**Acceptance criteria:**
- [ ] Auto-generated pages for service type × neighborhood × language combinations
- [ ] Each page: unique H1, descriptive text, filtered provider list for that service + area
- [ ] Content in both RO and RU
- [ ] Proper meta tags, structured data, hreflang
- [ ] Internal linking between related pages
- [ ] Target: 160 landing pages (8 services × 10 neighborhoods × 2 languages)

### MVP-011: Enhanced PWA

**Acceptance criteria:**
- [ ] Offline: cached provider list (stale-while-revalidate), cached booking history
- [ ] Background Sync: booking requests queued offline, submitted when reconnected
- [ ] Push notification permission prompt after first completed booking
- [ ] App-like bottom navigation on mobile: Home, Search, My Bookings, Account
- [ ] Smooth page transitions (no full-page reloads within the app)

### MVP-012: Admin panel

**Acceptance criteria:**
- [ ] Provider management: list all providers, filter by status, approve/suspend/reject with reason
- [ ] Booking overview: all bookings with date range filter, status filter, search by client/provider
- [ ] Review moderation: pending queue, approve/reject with one click
- [ ] Platform stats: total providers, total bookings (this month/all time), GMV, average rating
- [ ] Content management: CRUD for SEO landing pages
- [ ] Billing overview: per-provider lead counts, total platform revenue this month

---

## Phase 3: Advanced

**Duration:** 16 weeks · **Goal:** Payment processing, subscription tiers, full Chișinău coverage
**Backend:** Add MAIB payment gateway, Paynet integration
**Budget:** $20–100/mo

### ADV-001: Payment processing

**Acceptance criteria:**
- [ ] MAIB e-commerce gateway: accept Moldovan bank cards
- [ ] Paynet e-wallet: accept Paynet payments
- [ ] Payment flow: client pays → platform holds → releases to provider after COMPLETED
- [ ] 15% commission deducted from platform-processed transactions
- [ ] Weekly provider payout to bank account
- [ ] Hybrid model: providers choose per-lead (no platform payment) OR commission (with platform payment)
- [ ] Refund flow for cancelled/disputed bookings
- [ ] Payment receipt sent to client via email

### ADV-002: Provider subscription tiers

**Acceptance criteria:**
- [ ] Free tier: listing + receive bookings + basic calendar
- [ ] Pro (500 MDL/mo): priority search, advanced calendar, analytics dashboard, cross-sell
- [ ] Premium (1,200 MDL/mo): certified badge, campaign inclusion, featured placement, account manager
- [ ] Subscription management: upgrade/downgrade/cancel from provider dashboard
- [ ] Pro/Premium billed through platform payment system (MAIB/Paynet)

### ADV-003: Advanced provider analytics

**Acceptance criteria:**
- [ ] Demand heatmap: bookings by neighborhood and day/time (visual map)
- [ ] Pricing intelligence: anonymized average rates by service type
- [ ] Capacity optimizer: suggest additional available hours based on demand
- [ ] Revenue trends: monthly revenue chart, year-over-year comparison
- [ ] Competition comparison: provider's rating/price vs. market average

### ADV-004: Smart matching algorithm

**Acceptance criteria:**
- [ ] Search results ranked by composite score: proximity × rating × response_speed × availability × client_history
- [ ] Same-cleaner matching for recurring clients (prioritize continuity)
- [ ] "Recommended for you" section based on past bookings
- [ ] Provider quality score (internal): acceptance rate, on-time rate, review score, cancellation rate

### ADV-005: Trust and safety system

**Acceptance criteria:**
- [ ] Satisfaction guarantee: re-clean offered if rating below 3 stars
- [ ] Damage guarantee fund: 1% of platform revenue allocated to claims
- [ ] Dispute resolution flow: client files claim → admin reviews → refund or re-clean
- [ ] Provider insurance: optional group liability insurance for Premium tier
- [ ] Fraud detection: flag suspicious booking patterns, review manipulation

### ADV-006: Client loyalty program

**Acceptance criteria:**
- [ ] Tiered loyalty: Bronze (0+ bookings), Silver (5+), Gold (15+)
- [ ] Benefits: Silver = 5% discount, Gold = 10% discount + priority scheduling + free add-on per quarter
- [ ] Points system: 1 point per 100 MDL spent, redeemable for discounts
- [ ] Referral rewards: invite friend → both get 200 MDL credit after first booking

---

## Future enhancements (backlog)

### FUT-001: Gift vouchers
- Purchase flow: buy voucher (monetary/service/subscription) → unique code + digital card
- Redemption: enter code during booking → applies as credit
- Types: monetary (e.g., 500 MDL), service-specific (1 general cleaning 60m²), subscription (1 month weekly)
- Corporate bulk purchases with custom branding
- Seasonal campaigns: Mother's Day, New Year, housewarming
- Expiration: 12 months, reminders at 30/7 days

### FUT-002: Multi-service marketplace
- Add categories: pest control, window repair, handyman, laundry pickup, gardening
- Category-specific booking flows
- Cross-service recommendations

### FUT-003: B2B / corporate portal
- Office cleaning contracts with recurring invoicing
- Multi-location management
- SLA tracking and compliance reports

### FUT-004: Geographic expansion
- Bălți (Moldova's second city)
- Iași, Romania (cross-border, shared language)
- Multi-city architecture with city-scoped data

### FUT-005: AI features
- Chatbot booking assistant (Claude API)
- Automated review summarization
- Dynamic pricing based on demand patterns
- Photo-based quality scoring (before/after)

### FUT-006: Advanced payments
- Stripe (when available in Moldova)
- Revolut Pay
- SEPA direct debit for recurring subscriptions
- Split payments / installments
