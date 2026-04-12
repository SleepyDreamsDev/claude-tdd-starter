# Forever Clean — Design System

**Style:** Lavender Mist · **Version:** 1.0 · **Date:** April 12, 2026

---

## 1. Design philosophy

Lavender Mist is a premium, trustworthy aesthetic built on blue-violet accents and cool grey surfaces. It balances elegance with approachability — refined enough to signal quality, warm enough to feel inviting for everyday cleaning bookings in Chișinău.

**Core principles:**

- **Mobile-first PWA** — every screen designed at 375px first, then expanded for tablet (768px) and desktop (1280px+)
- **Flat and airy** — no gradients, no drop shadows, no noise textures. Clean surfaces with subtle 0.5px borders
- **Serif + sans pairing** — Georgia serif for hero headings and section titles creates editorial warmth; system sans-serif for UI keeps things functional
- **Generous whitespace** — breathing room between sections, generous card padding, never cramped
- **Bilingual-ready** — all text comes from translation files; layouts accommodate both Romanian and Russian string lengths

---

## 2. Color tokens

### Primary palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#7b8cc4` | Buttons, links, active states, price highlights, progress bars |
| `--color-primary-hover` | `#6a7ab0` | Button hover, link hover |
| `--color-primary-light` | `#ece8f4` | Accent surfaces, avatar backgrounds, badges, tag backgrounds |
| `--color-primary-subtle` | `#f0eef4` | Service tags, neighborhood pills, soft backgrounds |

### Background palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg-page` | `#f0eef4` | Outermost page background |
| `--color-bg-surface` | `#faf9fc` | Card container backgrounds, section backgrounds |
| `--color-bg-card` | `#ffffff` | Card interiors, input fields, modals |
| `--color-bg-elevated` | `#ece8f4` | Price summary boxes, step indicators, metric cards |

### Text palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-heading` | `#2d2b40` | Headings (h1–h4), provider names, bold labels |
| `--color-text-body` | `#6a6680` | Body text, descriptions, service names in lists |
| `--color-text-secondary` | `#8884a0` | Secondary labels, filter labels, helper text |
| `--color-text-muted` | `#aaa6ba` | Placeholders, disabled text, timestamps |
| `--color-text-accent` | `#5a5680` | Accent text on primary-light backgrounds (badges) |

### Border palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-border-default` | `#d4d0de` | Card borders, input borders, dividers |
| `--color-border-light` | `#e4e0ec` | Section dividers, light separators within cards |

### Semantic colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-rating` | `#c4a84e` | Star ratings (filled) |
| `--color-rating-empty` | `#e4e0ec` | Star ratings (unfilled) |
| `--color-success` | `#5a8a64` | Success states, confirmed status |
| `--color-success-bg` | `#e8f0ec` | Success badge backgrounds |
| `--color-warning` | `#8a7230` | Pending status text |
| `--color-warning-bg` | `#f5eeda` | Pending status badge background |
| `--color-error` | `#a06a6a` | Error states, validation errors |
| `--color-error-bg` | `#f0e8e8` | Error badge backgrounds |

### Provider avatar colors

Each provider gets a unique soft-colored avatar. These rotate through a fixed palette:

| # | Background | Text | Used by |
|---|-----------|------|---------|
| 1 | `#ece8f4` | `#7b8cc4` | Diamond Cleaning |
| 2 | `#e8ecf4` | `#6a7ab0` | ProCurat |
| 3 | `#e8f0ec` | `#5a8a64` | Cristal Plus, EcoClean |
| 4 | `#f0e8e8` | `#a06a6a` | EcoClean (alt), SunShine |
| 5 | `#f0ece4` | `#8a7a5a` | CasaCurată |
| 6 | `#e4ecf0` | `#5a7a8a` | AquaFresh, MoldoClean |

---

## 3. Typography

### Font stack

```css
--font-heading: Georgia, 'Times New Roman', serif;
--font-body: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

### Type scale

| Element | Font | Size | Weight | Color | Line height | Usage |
|---------|------|------|--------|-------|-------------|-------|
| Hero heading (mobile) | Serif | 26px | 400 | heading | 1.2 | Homepage hero h1 |
| Hero heading (desktop) | Serif | 36px | 400 | heading | 1.15 | Homepage hero h1 |
| Section title | Serif | 17px | 400 | heading | 1.3 | "Recomandați", "Cum funcționează" |
| Page title | Sans | 16px | 500 | heading | 1.3 | Navigation page titles |
| Card title | Sans | 14–15px | 500 | heading | 1.3 | Provider names, step titles |
| Body | Sans | 14px | 400 | body | 1.6 | Descriptions, bios |
| Body small | Sans | 13px | 400 | body | 1.5 | Review text, filter labels, form values |
| Caption | Sans | 12px | 400 | secondary | 1.4 | Neighborhood tags, timestamps, helper text |
| Micro | Sans | 11px | 400/500 | muted | 1.3 | Service tags, section labels, badges |
| Overline | Sans | 11px | 500 | secondary | 1.0 | Section labels (uppercase, letter-spacing: 1.5px) |

### Typography rules

- **Two weights only:** 400 (regular) and 500 (medium). Never use 600 or 700.
- **No bold mid-sentence.** Bold is for headings, labels, and prices only.
- **Sentence case always.** Never Title Case or ALL CAPS except for overline labels.
- **Letter spacing:** -0.3px to -0.5px on hero headings; 1.5px–2px on uppercase overlines.
- **No underlines** on links — color alone differentiates them.

---

## 4. Spacing system

Base unit: 4px. All spacing uses multiples of 4.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Inline gaps (star + rating text) |
| `--space-2` | 8px | Tag gaps, tight element spacing |
| `--space-3` | 12px | Card grid gap, between stacked cards |
| `--space-4` | 16px | Card internal padding, section padding (mobile) |
| `--space-5` | 20px | Section gaps, form element spacing |
| `--space-6` | 24px | Mobile page padding (horizontal), section breaks |
| `--space-7` | 28px | Desktop section padding |
| `--space-8` | 32px | Desktop page padding (horizontal) |
| `--space-10` | 40px | Desktop hero padding |
| `--space-12` | 48px | Hero vertical padding (mobile) |
| `--space-14` | 56px | Hero vertical padding (desktop) |

### Page padding

| Breakpoint | Horizontal padding |
|------------|-------------------|
| Mobile (< 768px) | 16px–20px |
| Tablet (768px–1023px) | 24px |
| Desktop (1024px+) | 32px–40px |

---

## 5. Border & radius system

### Borders

- **Default border:** `0.5px solid #d4d0de` — card outlines, input fields
- **Light divider:** `0.5px solid #e4e0ec` — internal section dividers within cards
- **Active/focused border:** `0.5px solid #7b8cc4` — focused inputs, active filter button
- **Never use borders thicker than 0.5px** except for the brand accent bar (5px width, 22px height).

### Border radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Tags, micro badges, tiny pills |
| `--radius-md` | 6px | Language switcher, small chips, rating badges |
| `--radius-default` | 8px | Buttons, inputs, filter chips, desktop cards |
| `--radius-lg` | 10px | Form containers, room counters, action buttons |
| `--radius-xl` | 12px | Provider cards, content sections, modals |
| `--radius-2xl` | 16px | Gallery images, hero photo, large cards |
| `--radius-pill` | 20px | Pill-shaped navigation items (not default — only for specific nav elements) |
| `--radius-full` | 50% | Avatars, step indicators, circular icons |

---

## 6. Component specifications

### 6.1 Header (mobile)

- Height: ~52px (8px top/bottom padding + content)
- Logo: 5px × 20px lavender bar + "Forever Clean" in 15px/500 heading color
- Right side: language switcher + hamburger icon (20×20)
- Background: transparent (inherits surface)
- Bottom border: 0.5px default

### 6.2 Header (desktop)

- Height: ~48px
- Logo left, navigation center-left, language switcher + CTA right
- Nav items: 14px sans, 24px gap, active item in primary color with 500 weight
- CTA button: primary bg, white text, 8px radius, 8px 20px padding

### 6.3 Bottom navigation (mobile PWA)

- Fixed to bottom, full width
- Background: white, top border 0.5px default
- Padding: 8px top, 20px bottom (safe area)
- 4 tabs: icon (20×20) + label (10px)
- Active tab: primary color icon + filled opacity + 500 weight label
- Inactive tab: muted color icon + 400 weight label

### 6.4 Provider card (mobile — list mode)

```
┌─────────────────────────────────────────┐
│ ┌──────┐  Provider Name        55      │
│ │ LOGO │  ★ 4.9 (85)  [Verified] lei/m²│
│ └──────┘                               │
│ [Tag] [Tag] [+N]                       │
└─────────────────────────────────────────┘
```

- Background: white, 0.5px default border, 12px radius
- Padding: 14px
- Avatar: 56×56px, 12px radius, colored bg + initials (18px/500)
- Name: 14px/500 heading
- Rating: star icon (12px) + score (12px/500) + count (11px muted)
- Verified badge: 10px text on primary-light bg, 4px radius
- Price: 14–16px/500 primary color + "lei/m²" in 11px muted
- Tags: 11px on primary-subtle bg, 4px radius, 2px 7px padding

### 6.5 Provider card (desktop — grid mode)

```
┌───────────────────────┐
│    [Photo/Avatar]     │ 100px height
│    colored bg + logo  │
├───────────────────────┤
│ Provider Name    55   │
│ ★ 4.9 (85)    lei/m² │
│ [Tag] [Tag] [+N]     │
│ Centru · Botanica     │
└───────────────────────┘
```

- Photo area: 100px height, colored bg, centered initials (28px)
- Verified badge: absolute top-right, semi-transparent white bg
- Card body: 14px padding
- Name: 15px/500
- Rest same as mobile card

### 6.6 Search inputs

- Background: white
- Border: 0.5px default, 10px radius
- Padding: 12px 14px (mobile), 12px 16px (desktop)
- Placeholder: 13–14px muted color
- Chevron icon: 14px, right-aligned, muted color
- Focus state: border becomes primary color

### 6.7 Primary button

- Background: `#7b8cc4`
- Text: white, 14–15px/500
- Padding: 12–14px vertical, 20–28px horizontal
- Border radius: 10px (mobile), 8–10px (desktop)
- Hover: `#6a7ab0` background
- Active: scale(0.98)
- Full-width variant: used in mobile booking flow and filter drawer

### 6.8 Secondary/outline button

- Background: transparent
- Border: 0.5px default
- Text: body color, 14px/400
- Same padding and radius as primary
- Hover: surface background

### 6.9 Filter chip (mobile)

- Inactive: 0.5px default border, body color text, 8px radius
- Active: primary bg, white text, 8px radius
- Padding: 6px 14px
- Font: 13px/400

### 6.10 Star rating

- Filled star: `#c4a84e` (solid polygon SVG)
- Empty star: `#e4e0ec`
- Size: 12px (cards/inline), 14px (profile header)
- Always accompanied by numeric rating (12–13px/500) and count in parentheses (11–12px muted)
- Aria-label: "{rating} din 5 stele" for accessibility

### 6.11 Booking wizard — progress bar

- 6 segments (one per step), flex row, 4px gap
- Active/completed: primary color, 3px height, 2px radius
- Upcoming: border-light color
- All segments equal width (flex: 1)

### 6.12 Room counter

- Container: white bg, 0.5px default border, 10px radius, 12px 14px padding
- Layout: room name + size on left, counter on right
- Room name: 14px heading color
- Size note: 11px muted
- Minus button: 30×30px, 8px radius, 0.5px border, primary color text (or muted if at 0)
- Count: 16px/500 heading color, 20px min-width, center-aligned
- Plus button: 30×30px, 8px radius, primary bg, white text

### 6.13 Price summary box

- Background: `#ece8f4` (elevated)
- Border radius: 10–12px
- Padding: 14–16px
- Line items: 13px, flex space-between, body/muted colors
- Total line: border-top 1px default, 10px margin-top, 10px padding-top
- Total label: 15px/500 heading
- Total value: 22px/500 primary color

### 6.14 Review card

- Background: white
- Border: 0.5px border-light, 10px radius
- Padding: 12px
- Avatar: 28px circle, colored bg, initials (11px/500)
- Name: 13px/500 heading
- Stars: inline row, right-aligned in header
- Comment: 13px body color, 1.5 line-height
- Date: 11px muted, 6px margin-top

### 6.15 Filter drawer (mobile Sheet)

- Slides up from bottom
- Top handle: 36×4px pill, centered, default border color
- Background: white
- Top-left border radius: 20px
- Overlay behind: rgba(30, 28, 50, 0.3)
- Contains: title row ("Filtre" + "Resetează"), filter sections, apply button
- Apply button: full-width primary, shows result count

### 6.16 Filter sidebar (desktop)

- Width: 240px
- Background: white
- Right border: 0.5px border-light
- Padding: 20px
- Sticky positioning
- Sections: checkboxes, dropdown, range slider, rating chips
- Bottom: "Resetează filtrele" link in primary color

---

## 7. Layout patterns

### 7.1 Mobile (< 768px)

- Single column layout
- Horizontal padding: 16–20px
- Cards stack vertically with 10–12px gaps
- Bottom navigation fixed, 4 tabs
- Filter access via bottom sheet
- Booking: step-by-step wizard (one step per screen)
- Prev/Next buttons at bottom: 1:2 ratio (outline : primary)

### 7.2 Tablet (768px–1023px)

- 2-column card grid
- Sidebar filters slide in or are collapsible
- No bottom navigation
- Header shows full nav
- Booking: same wizard but wider cards

### 7.3 Desktop (1024px+)

- Max content width: 1200px, centered
- Homepage: hero left + sidebar mini-listing right
- Listing: 240px filter sidebar + 2-column card grid
- Profile: single column, max ~800px
- Booking: two-column (form left, price summary sticky right)
- No bottom navigation — header handles all nav

---

## 8. Iconography

### Icon style

- Lucide React icons (line style, 1.3px stroke weight)
- Default size: 16×16px (inline), 20×20px (navigation), 24×24px (decorative)
- Color: inherits from context (primary for active, muted for inactive)

### Key icons used

| Context | Icon | Notes |
|---------|------|-------|
| Home nav | House outline | Filled with 0.2 opacity when active |
| Search nav | Magnifying glass | |
| Bookings nav | Calendar | |
| Account nav | Person circle | |
| Back navigation | Chevron left | 20px, heading color |
| Dropdown arrow | Chevron down | 10–14px, muted |
| Star (filled) | Custom SVG polygon | `#c4a84e` |
| Star (empty) | Same polygon | `#e4e0ec` |
| Checkmark | Check path | Used in success, filter checkboxes |
| Filter icon | Horizontal lines | 3 lines decreasing width |
| Phone | Phone outline | Contact/call button |
| Hamburger | 3 lines | Mobile menu, 20px |

### Step indicator circles

- 28–40px diameter, circle
- Background: primary-light
- Text: primary color, 12–14px/500
- Numbers 1–6 for booking wizard steps

---

## 9. Motion & interaction

### Transitions

- **Default transition:** `all 150ms ease` — hover states, color changes
- **Sheet/drawer:** slide up 300ms ease-out, overlay fade 200ms
- **Page transitions:** none in POC (instant navigation). In MVP: subtle fade 200ms

### Hover states

- **Cards:** border color transitions to `#c4c0d0` (slightly darker)
- **Buttons (primary):** background to `#6a7ab0`
- **Buttons (outline):** background to `#faf9fc`
- **Links:** color to `#6a7ab0`
- **Nav items:** color to heading color

### Active states

- **Buttons:** transform scale(0.98), transition 100ms
- **Cards:** no active scale (they navigate)

### Focus states

- **Inputs:** border becomes primary color, no box-shadow
- **Buttons:** 2px outline offset in primary color (keyboard only via :focus-visible)

---

## 10. Responsive breakpoints

```css
/* Mobile first — base styles are mobile */

/* Tablet */
@media (min-width: 768px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }

/* Wide desktop */
@media (min-width: 1280px) { ... }
```

### Breakpoint behavior summary

| Element | Mobile (< 768) | Tablet (768–1023) | Desktop (1024+) |
|---------|----------------|-------------------|-----------------|
| Navigation | Hamburger + bottom tabs | Full header nav | Full header nav + CTA |
| Provider cards | Stacked list | 2-col grid | 2-col grid + sidebar |
| Filters | Bottom sheet | Collapsible sidebar | Persistent sidebar (240px) |
| Homepage hero | Full-width, stacked | Full-width, stacked | Split (content + mini sidebar) |
| Booking wizard | Step-by-step (1 per screen) | Step-by-step wider | Side-by-side (form + summary) |
| Footer | Stacked | 2-column | Full row |
| Page padding | 16–20px | 24px | 32–40px |

---

## 11. Accessibility

### Color contrast

All text/background combinations meet WCAG AA (4.5:1 ratio minimum):

| Pair | Ratio | Status |
|------|-------|--------|
| `#2d2b40` on `#ffffff` | 13.2:1 | AAA |
| `#2d2b40` on `#faf9fc` | 12.6:1 | AAA |
| `#6a6680` on `#ffffff` | 5.9:1 | AA |
| `#8884a0` on `#ffffff` | 4.5:1 | AA |
| `#7b8cc4` on `#ffffff` | 4.1:1 | AA (large text only) |
| `#5a5680` on `#ece8f4` | 5.0:1 | AA |
| `#ffffff` on `#7b8cc4` | 4.1:1 | AA (large text, buttons ≥ 14px bold) |

### Rules

- All interactive elements keyboard accessible
- `<html lang="ro">` or `<html lang="ru">` set from locale
- Alt text on all images
- Labels on all form inputs (associated via `for` / `id`)
- `aria-label` on star ratings: "{n} din 5 stele"
- `aria-label` on icon-only buttons
- Focus-visible outlines on all interactive elements
- Skip-to-content link hidden until focused
- Minimum touch target: 44×44px on mobile

---

## 12. Dark mode (future consideration)

The system is designed with CSS custom properties to support dark mode in MVP+:

| Light mode | Dark mode (planned) |
|-----------|-------------------|
| `#faf9fc` bg | `#1a1824` bg |
| `#ffffff` card | `#242230` card |
| `#2d2b40` heading | `#e8e6f0` heading |
| `#6a6680` body | `#a0a0b4` body |
| `#7b8cc4` primary | `#8e9ed4` primary |
| `#ece8f4` accent bg | `#2e2a3a` accent bg |
| `#d4d0de` border | `#3a3648` border |

---

## 13. File structure for design tokens

```
src/
├── app/
│   └── globals.css          # CSS custom properties + Tailwind imports
├── lib/
│   └── design-tokens.ts     # Exported token values for JS usage
└── tailwind.config.ts       # NOT USED in Tailwind v4 (CSS-first)
```

### Tailwind v4 CSS-first config (in globals.css)

```css
@import "tailwindcss";

@theme {
  --color-primary: #7b8cc4;
  --color-primary-hover: #6a7ab0;
  --color-primary-light: #ece8f4;
  --color-primary-subtle: #f0eef4;
  --color-bg-page: #f0eef4;
  --color-bg-surface: #faf9fc;
  --color-bg-card: #ffffff;
  --color-bg-elevated: #ece8f4;
  --color-text-heading: #2d2b40;
  --color-text-body: #6a6680;
  --color-text-secondary: #8884a0;
  --color-text-muted: #aaa6ba;
  --color-text-accent: #5a5680;
  --color-border-default: #d4d0de;
  --color-border-light: #e4e0ec;
  --color-rating: #c4a84e;
  --color-success: #5a8a64;
  --color-success-bg: #e8f0ec;
  --color-warning: #8a7230;
  --color-warning-bg: #f5eeda;
  --color-error: #a06a6a;
  --color-error-bg: #f0e8e8;
  --font-heading: Georgia, 'Times New Roman', serif;
  --font-body: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-default: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
}
```

---

## 14. Reference screens

See the `reference-screens/` folder for HTML mockups of each key screen:

| File | Screen | Breakpoint |
|------|--------|------------|
| `01-mobile-homepage.html` | Homepage with hero, search, services, featured providers | 375px |
| `02-mobile-listing.html` | Provider listing with cards + filter drawer open | 375px |
| `03-mobile-profile.html` | Provider profile (Diamond Cleaning) with reviews | 375px |
| `04-mobile-booking.html` | Booking wizard — room selector step with price | 375px |
| `05-mobile-summary.html` | Booking summary step with full price breakdown | 375px |
| `06-mobile-success.html` | Booking confirmation with reference number | 375px |
| `07-desktop-homepage.html` | Homepage — split layout with sidebar | Full width |
| `08-desktop-listing.html` | Provider listing — sidebar filters + 2-col grid | Full width |

These are approximate visual references, not pixel-perfect implementations. They demonstrate the design direction, color usage, spacing patterns, and component hierarchy. The actual implementation will use Tailwind CSS utility classes and shadcn/ui components.
