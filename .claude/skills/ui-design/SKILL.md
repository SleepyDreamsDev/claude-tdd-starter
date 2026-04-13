---
name: ui-design
description: >
  Design-system-grounded UI implementation for Forever Clean (Lavender Mist).
  Loads relevant component specs and reference screens, applies professional
  placement rules, enforces Tailwind token constraints, and dispatches
  design-reviewer post-check. Use when building pages, components, or
  responsive layouts — instead of the generic /frontend-design plugin.
command: /ui-design
argument-hint: "<component or page description>"
allowed-tools: Read, Glob, Grep, Write, Edit, MultiEdit, Bash, TodoWrite, Agent
---

# UI Design: Lavender Mist — Professional Component Build

You will implement a UI component or page that matches the Forever Clean design
system exactly. Follow every phase in order.

The component or page to build: $ARGUMENTS

---

## PHASE 0 — LOAD DESIGN CONTEXT (silent)

### Step 1: Load token quick-reference

Read `.claude/rules/design-system.md` for the Tailwind token map.

### Step 2: Map arguments to component specs

Parse `$ARGUMENTS` for keywords and read the matching sections from
`Specs/Design/DESIGN_SYSTEM.md`:

| Keywords in $ARGUMENTS                  | Read sections      |
| --------------------------------------- | ------------------ |
| header, nav, navigation, logo           | 6.1 + 6.2          |
| bottom nav, tab bar, tabs               | 6.3                |
| provider card, listing card, card       | 6.4 + 6.5          |
| search, input, field                    | 6.6                |
| button, cta, action                     | 6.7 + 6.8          |
| filter, chip, drawer, sidebar           | 6.9 + 6.15 + 6.16  |
| star, rating, review, testimonial       | 6.10 + 6.14        |
| booking, wizard, progress, rooms, price | 6.11 + 6.12 + 6.13 |

If no keyword matches, read sections 6.1–6.5 as default context.

### Step 3: Map arguments to reference screen

Read only the matching file(s) from `Specs/Design/reference-screens/`:

| Page context in $ARGUMENTS            | Files                                                  |
| ------------------------------------- | ------------------------------------------------------ |
| homepage, hero, landing, services     | `01-mobile-homepage.html` + `07-desktop-homepage.html` |
| listing, providers, search results    | `02-mobile-listing.html` + `08-desktop-listing.html`   |
| profile, provider detail, about, bio  | `03-mobile-profile.html`                               |
| booking, wizard, rooms, steps         | `04-mobile-booking.html` + `05-mobile-summary.html`    |
| confirmation, success, complete, done | `06-mobile-success.html`                               |

If no page context matches, skip reference screen loading.

### Phase banner

Output:

> ── PHASE 0 DESIGN CONTEXT ── Section(s): \<matched> | Ref: \<file(s) or "none">

---

## PHASE 1 — DESIGN AUDIT (conditional)

If the target component already exists (user is restyling or modifying):

1. Read the existing file.
2. Scan for anti-pattern violations (see Phase 3 checklist).
3. Output a "before" list of any violations found.

If creating from scratch, skip directly to Phase 2.

---

## PHASE 2 — SPATIAL COMPOSITION

Before writing any JSX or Tailwind classes, produce a composition plan.
Output it to the user as a compact structured list.

1. **Layout slot** — Which Section 7 pattern applies?
   - Mobile: single column, `px-4`/`px-5` horizontal padding
   - Tablet `md:`: 2-column grid for cards, sidebar filters collapsible
   - Desktop `lg:`: max-width 1200px centered, 240px filter sidebar + card grid,
     or hero-left + listing-right on homepage

2. **Component hierarchy** — Nesting order:
   `page wrapper → section → card/container → content row → action`

3. **Spacing map** — Pull from Section 4. For each element: padding and gap
   values at mobile, `md:`, and `lg:`.

4. **Typography map** — For each text element:
   - Font: `font-heading` (Georgia) for h1–h4 and section titles;
     `font-body` (Segoe UI) for everything else
   - Size: use exact values from Section 3 type scale
   - Weight: `font-normal` (400) or `font-medium` (500) only
   - Color: token from Section 2 (e.g., `text-text-heading`, `text-text-body`)

5. **Border/radius map** — Pull from Section 5. Which `rounded-*` token for
   each bordered element? Cards: `rounded-xl` (12px). Buttons: `rounded-lg`
   (10px). Inputs: `rounded-md` (6px). Tags: `rounded-sm` (4px).

6. **Responsive mutations** — List every property that changes at `md:` or
   `lg:` (layout direction, padding, font size, visibility).

---

## PHASE 2.5 — PROFESSIONAL PLACEMENT RULES

Apply these before writing any code. These encode what a professional service
marketplace designer knows instinctively — where users expect elements to be.

### Page-level conventions

- **Logo:** Always top-left. Brand bar + name. Never centered on desktop.
- **Primary CTA:** Top-right in desktop header. Prominent and above the fold on
  mobile hero. Never buried mid-page.
- **Language switcher:** In header near logo — accessible but visually quiet
  (`text-text-secondary`, not primary color).
- **Search/filters:** Immediately below the hero or at page top. The first
  interactive element after the headline.
- **Navigation:** Bottom-fixed on mobile (4 tabs, PWA pattern). Horizontal in
  header on desktop. Never hidden behind a hamburger on desktop.

### Visual hierarchy — F-pattern reading flow

Users scan left-to-right, then down the left edge. Place high-priority
information along this path:

- **Hero:** Headline (top-left weight) → subtitle → CTA. Desktop: text left,
  supporting content right. Mobile: stacked, CTA directly below subtitle.
- **Trust signals** (ratings, verified badge, review count): Adjacent to the
  decision point — next to the price or CTA on a card, not in a distant section.
- **Prices:** Right-aligned in card rows. Primary color (`text-primary`).
  `font-medium` (500). Always paired with unit label (`lei/m²`).
- **Social proof** (stars + count): Inline with provider name row, not separated
  into a standalone section.

### Card conventions (service marketplace pattern)

- **Avatar/image:** Left on mobile horizontal card. Top (100px photo area) on
  desktop vertical card.
- **Name + rating:** First content row after avatar. Name left (`text-text-heading`,
  `font-medium`). Rating right or inline (`text-rating`, 12px star).
- **Service tags:** Below name row. Horizontal wrap. Overflow: `+N` pill in
  `bg-primary-light text-text-accent`.
- **Price:** Bottom-right of card on mobile. Below tags on desktop. Last thing
  the eye lands on — it anchors the card's value proposition.
- **Tap target:** Entire card is tappable on mobile. `cursor-pointer` on
  desktop. No explicit button needed on list cards.

### Form and booking conventions

- **Progress bar:** Top of the form area, full-width, always visible (Section
  6.11). Shows completed (primary) / current / upcoming (border-light).
- **Form labels:** Above the input, left-aligned, 13px `text-text-secondary`.
  Never floating or inside the input field.
- **Action buttons:** Bottom of each form step. Mobile: full-width primary.
  Desktop: right-aligned pair — secondary (outline) left, primary right,
  1:2 width ratio.
- **Price summary:** Sticky right column on desktop (`lg:sticky lg:top-4`).
  On mobile: collapses into a summary step before the final confirmation.
- **Error states:** Inline below the offending field in `text-error` (12px).
  Never a banner. Never a toast for field-level validation.

### Whitespace — the professional signal

- **Section gaps:** 24–40px between major page sections. Cramped = amateur.
- **Card padding:** 14–16px internal padding. Never below 12px.
- **Rhythm:** All vertical gaps within a section use the same spacing value.
  No random alternation between 8px and 16px.
- **Empty states:** Centered icon (24px, muted) + message (14px body) + CTA
  button. Never leave a blank area unexplained.

---

## PHASE 3 — ANTI-SLOP CHECKLIST

Check before writing any class string. These are the specific violations that
AI-generated UIs introduce into Lavender Mist components.

### Forbidden patterns — never emit these

| Pattern                                    | Reason                                              |
| ------------------------------------------ | --------------------------------------------------- |
| `bg-gradient-*`, `from-*`, `to-*`, `via-*` | No gradients (design philosophy)                    |
| `shadow-*`, `drop-shadow-*`                | No drop shadows (design philosophy)                 |
| `blur-*`, `backdrop-blur-*`                | No blur effects                                     |
| `font-semibold`, `font-bold`               | Two weights only: 400 and 500                       |
| `bg-black`, `bg-white` (raw)               | Use `bg-bg-card` / `bg-bg-page` tokens              |
| `bg-gray-*`, `text-gray-*`                 | Use `text-text-body`, `text-text-muted` etc.        |
| `text-purple-*`, `bg-purple-*`             | Use `bg-primary`, `text-primary` tokens             |
| `rotate-*`, `skew-*` for layout            | No diagonal or asymmetric compositions              |
| `uppercase`                                | Only on overline labels (11px, `tracking-[0.15em]`) |
| Hardcoded hex in JSX                       | Always use Tailwind token class                     |
| `style={{ color: '...' }}`                 | Always a Tailwind class                             |
| `font-inter`, `font-roboto`                | Use `font-heading` / `font-body` only               |

### Required patterns — must be present

| What                     | Requirement                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| Every Lucide icon        | `strokeWidth={1.3}`                                                                            |
| Every card               | `border-[0.5px] border-border-default rounded-xl`                                              |
| Every primary button     | `bg-primary hover:bg-primary-hover rounded-lg active:scale-[0.98] transition-all duration-150` |
| Mobile page padding      | `px-4` or `px-5`                                                                               |
| Desktop page padding     | `px-8` or `px-10`                                                                              |
| Card grid gap            | `gap-2.5` or `gap-3` (10–12px)                                                                 |
| All interactive elements | `min-h-11 min-w-11` (44×44px touch target)                                                     |
| All images               | `alt` attribute                                                                                |
| Icon-only buttons        | `aria-label`                                                                                   |
| Star ratings             | `aria-label="{N} din 5 stele"`                                                                 |

---

## PHASE 4 — IMPLEMENT

Write the component/page following the composition plan (Phase 2), placement
rules (Phase 2.5), and anti-slop constraints (Phase 3).

### Rules

- **Mobile-first:** Write all base classes for 375px. Add `md:` overrides for
  768px. Add `lg:` overrides for 1024px.
- **Conditional classes:** Use `cn()` (clsx + tailwind-merge) from `@/lib/utils`.
- **All visible text:** From translation dictionary — zero hardcoded Romanian or
  Russian strings.
- **Component style:** `function` declarations, named exports, `@/` absolute
  imports, max 200 lines per file — extract sub-components when approaching limit.
- **Data:** Use `getProviders()`, `getProviderBySlug()`, `getReviewsByProvider()`
  from `src/lib/mock-data.ts`. Pricing from `src/lib/pricing.ts`.
- **Server vs client:** Default to server components. Add `"use client"` only
  when browser APIs, event handlers, or hooks are required.

---

## PHASE 5 — DESIGN REVIEW (mandatory)

### Step 1: Design system review

```
Agent(subagent_type: "design-reviewer",
      prompt: "Review these files against the Lavender Mist design system:
        <list all files created or modified>
        Report all violations as [file:line] RULE VIOLATED → fix")
```

If violations found: fix each one, then re-run the design-reviewer. Repeat
until the agent returns `✓ No design system violations found.`

### Step 2: Bilingual check (if user-visible text was added)

Check if `.claude/agents/i18n-checker.md` exists. If yes:

```
Agent(subagent_type: "i18n-checker",
      prompt: "Check bilingual coverage (RO + RU) for: <list of files>")
```

Fix any missing translation keys before proceeding.

### Phase banner

Output:

> ── PHASE 5 DESIGN REVIEW ✓ ── clean | i18n: complete

---

## PHASE 6 — COMPLETION SUMMARY

```
══════════════════════════════════════════════════════
  UI DESIGN COMPLETE: <short description>
══════════════════════════════════════════════════════

  Component(s): <list>
  Design spec:  Section(s) <X.X>
  Reference:    <filename or "none">

  Composition:
    Layout:     <Section 7 pattern>
    Typography: <fonts + size tokens used>
    Colors:     <tokens used>
    Radius:     <tokens used>
    Placement:  <key professional placement decisions>

  Responsive:   mobile ✓  md: ✓  lg: ✓
  Design review: clean (N violations fixed)
  i18n:         <complete | skipped>

  Files:
    <list of created/modified files>
══════════════════════════════════════════════════════
```
