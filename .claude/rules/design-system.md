# Design System Rules (Lavender Mist)

> Project-specific rule for Forever Clean.
> Full specification: `Specs/Design/DESIGN_SYSTEM.md`
> Reference screens: `Specs/Design/reference-screens/*.html`

---

## Before building any UI component

1. Read `Specs/Design/DESIGN_SYSTEM.md` Section 9 for the relevant component spec
2. Check `Specs/Design/reference-screens/` for the matching HTML mockup
3. Use the `@theme` tokens from Section 13 — never hardcode values

---

## Colors

Use Tailwind utility classes that map to CSS custom properties. Never hardcode hex values in component files.

| Purpose | Tailwind class | Token | Hex |
|---------|---------------|-------|-----|
| Primary buttons, links, active states | `bg-primary` / `text-primary` | `--color-primary` | `#7b8cc4` |
| Primary hover | `bg-primary-hover` | `--color-primary-hover` | `#6a7ab0` |
| Badge backgrounds, avatar fills | `bg-primary-light` | `--color-primary-light` | `#ece8f4` |
| Service tag backgrounds, soft areas | `bg-primary-subtle` | `--color-primary-subtle` | `#f0eef4` |
| Page background | `bg-bg-page` | `--color-bg-page` | `#f0eef4` |
| Section / card container backgrounds | `bg-bg-surface` | `--color-bg-surface` | `#faf9fc` |
| Card interiors, input fields | `bg-bg-card` | `--color-bg-card` | `#ffffff` |
| Price summary boxes, step indicators | `bg-bg-elevated` | `--color-bg-elevated` | `#ece8f4` |
| Headings, provider names | `text-text-heading` | `--color-text-heading` | `#2d2b40` |
| Body text, descriptions | `text-text-body` | `--color-text-body` | `#6a6680` |
| Secondary labels, helper text | `text-text-secondary` | `--color-text-secondary` | `#8884a0` |
| Placeholders, disabled text | `text-text-muted` | `--color-text-muted` | `#aaa6ba` |
| Accent text on light backgrounds | `text-text-accent` | `--color-text-accent` | `#5a5680` |
| Default borders | `border-border-default` | `--color-border-default` | `#d4d0de` |
| Light borders | `border-border-light` | `--color-border-light` | `#e4e0ec` |
| Star ratings | `text-rating` | `--color-rating` | `#c4a84e` |

### Semantic colors

| State | Background class | Text class |
|-------|-----------------|------------|
| Success | `bg-success-bg` | `text-success` |
| Warning | `bg-warning-bg` | `text-warning` |
| Error | `bg-error-bg` | `text-error` |

---

## Typography

- **Headings (h1–h4, section titles):** `font-heading` → Georgia, 'Times New Roman', serif
- **All other UI text:** `font-body` → 'Segoe UI', system-ui, -apple-system, sans-serif
- **Two weights only:** `font-normal` (400) and `font-medium` (500)
- **Never use** `font-semibold` (600) or `font-bold` (700)
- **Always sentence case** — never ALL CAPS or Title Case For Every Word
- Hero heading: `text-[26px] md:text-[36px]`

---

## Spacing

- Base unit: 4px (Tailwind's default `1` = 4px)
- Use standard Tailwind spacing utilities: `p-4`, `gap-3`, `mb-6`, etc.
- **No arbitrary values** like `p-[18px]` — round to the nearest 4px unit
- Mobile horizontal padding: `px-4` (16px) to `px-5` (20px)
- Desktop horizontal padding: `px-8` (32px) to `px-10` (40px)

---

## Borders

- **Thickness:** Always `border` with custom `border-[0.5px]` — never thicker
- **Color:** `border-border-default` (`#d4d0de`) as default
- **Radius tokens:**

| Class | Token | Value | Use |
|-------|-------|-------|-----|
| `rounded-sm` | `--radius-sm` | 4px | Tags, chips, badges |
| `rounded-md` | `--radius-md` | 6px | Inputs |
| `rounded` | `--radius-default` | 8px | Cards |
| `rounded-lg` | `--radius-lg` | 10px | Buttons |
| `rounded-xl` | `--radius-xl` | 12px | Sheets, modals |
| `rounded-2xl` | `--radius-2xl` | 16px | Hero sections |
| `rounded-full` | — | 50% | Avatars |

---

## Icons

- Library: **Lucide React** only
- Stroke width: **1.3px** — set `strokeWidth={1.3}` on every icon
- Sizes: `size={16}` (small inline), `size={20}` (default), `size={24}` (nav, hero)

---

## Motion

- Standard transitions: `transition-all duration-150 ease-in-out`
- Sheet / drawer slide: `duration-300`
- Active button press: `active:scale-[0.98]`
- No gradients, no drop shadows, no blur effects

---

## Breakpoints

| Name | Width | Tailwind prefix |
|------|-------|----------------|
| Mobile (default) | 375px | (no prefix) |
| Tablet | 768px | `md:` |
| Desktop | 1024px | `lg:` |
| Wide desktop | 1280px | `xl:` |

---

## Accessibility

- Minimum touch target: 44×44px (`min-h-11 min-w-11`)
- WCAG AA contrast verified for all color pairs in the design system
- Include `skip-to-content` link in root layout
- All interactive elements keyboard accessible

---

## Component Specifications

Before implementing any of these 16 components, read the corresponding section in `Specs/Design/DESIGN_SYSTEM.md`:

1. Header (mobile) — Section 9.1
2. Header (desktop) — Section 9.2
3. Bottom navigation — Section 9.3
4. Provider card (mobile list) — Section 9.4
5. Provider card (desktop grid) — Section 9.5
6. Search inputs — Section 9.6
7. Primary button — Section 9.7
8. Secondary button — Section 9.8
9. Filter chip — Section 9.9
10. Star rating — Section 9.10
11. Booking wizard progress bar — Section 9.11
12. Room counter — Section 9.12
13. Price summary box — Section 9.13
14. Review card — Section 9.14
15. Filter drawer (mobile Sheet) — Section 9.15
16. Filter sidebar (desktop) — Section 9.16
