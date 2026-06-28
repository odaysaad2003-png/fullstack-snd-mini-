# UI/UX Direction — SND Mini

This document defines the visual and interaction design direction for SND Mini.
Read this before starting any frontend sprint.

---

## Design Personality

SND Mini should feel like a **modern, trustworthy, community marketplace** — not a generic admin panel or a basic CRUD app.

Keywords to embody:
- **Clean** — generous whitespace, no visual noise
- **Trustworthy** — professional typography, consistent spacing, no visual bugs
- **Community** — warm but not childish, approachable but not unprofessional
- **Product-ready** — polished enough to show to a client or a job interviewer

Keywords to avoid:
- Generic (looks like every other Bootstrap or shadcn template)
- Cluttered (too many elements, unclear hierarchy)
- Dated (flat colors everywhere, no depth, no spatial cues)
- Over-animated (distracting, feels performative)

---

## Color System

### Philosophy
Use a neutral base with one primary accent color. Reserve color for meaning, not decoration.

### Planned Palette
```
Background:       zinc-50 / dark: zinc-950
Surface:          white / dark: zinc-900
Border:           zinc-200 / dark: zinc-800
Text primary:     zinc-900 / dark: zinc-50
Text secondary:   zinc-500 / dark: zinc-400
Primary accent:   indigo-600 (or sky-600 — decide during Sprint 8)
Danger:           red-500
Success:          emerald-500
Warning:          amber-500
```

### Rules
- Use semantic color names, not hardcoded hex values
- Never use pure black (`#000`) — use zinc-900 or zinc-950
- Hover states darken the background slightly, they do not change color radically
- Status badges use subtle tinted backgrounds: `bg-emerald-50 text-emerald-700`

---

## Typography

### Font
- **Display / Headings:** Inter (system sans-serif fallback) — clean, modern, neutral
- **Arabic:** The system Arabic font is acceptable for v1, but Noto Sans Arabic is preferred
- **Mono:** For code or IDs only

### Scale
```
xs:   12px
sm:   14px
base: 16px
lg:   18px
xl:   20px
2xl:  24px
3xl:  30px
4xl:  36px
```

### Rules
- Headings use `font-semibold` or `font-bold`, not `font-black`
- Body text is always `text-base` minimum
- Secondary/helper text uses `text-sm text-zinc-500`
- Line height: `leading-relaxed` for body, `leading-tight` for headings
- Never use more than 3 font sizes in a single card or section

---

## Spacing System

Follow Tailwind's 4px grid:
- Internal card padding: `p-4` or `p-6`
- Between sections: `gap-6` or `gap-8`
- Between cards in a grid: `gap-4`
- Page horizontal padding: `px-4` (mobile), `px-6` (tablet), `px-8` (desktop)
- Maximum content width: `max-w-5xl mx-auto` or `max-w-7xl mx-auto` for wide pages

---

## Layout Patterns

### Listing Feed (Home / Browse)
- Card grid: 1 column mobile → 2 columns tablet → 3 or 4 columns desktop
- Each card: image top, title, price, category badge, location — nothing else
- Clean card: `rounded-xl border border-zinc-200 bg-white shadow-sm`

### Listing Detail
- Left/Main: large image(s), title, price, description
- Right sidebar (desktop only): seller info, contact, location
- On mobile: full-width, seller info below description

### Forms
- Full width on mobile
- Max width `max-w-md` or `max-w-lg` on desktop, centered
- One column only — no complex multi-column forms
- Labels above inputs, not floating labels (complexity vs. RTL issues)

### Admin Dashboard
- Sidebar navigation (desktop) / top navigation (mobile)
- Full-width data tables with pagination
- Clean stat cards at top: number, label, optional trend

---

## Component Patterns

### Cards
```
rounded-xl
border border-zinc-200 dark:border-zinc-800
bg-white dark:bg-zinc-900
shadow-sm hover:shadow-md
transition-shadow duration-200
overflow-hidden
```

### Buttons
- Primary: `bg-indigo-600 text-white hover:bg-indigo-700`
- Secondary: `border border-zinc-300 bg-white hover:bg-zinc-50`
- Danger: `bg-red-600 text-white hover:bg-red-700`
- Ghost: `hover:bg-zinc-100 text-zinc-700`
- All buttons: `rounded-lg px-4 py-2 text-sm font-medium transition-colors`

### Inputs
```
border border-zinc-300 dark:border-zinc-700
rounded-lg px-3 py-2
bg-white dark:bg-zinc-800
text-zinc-900 dark:text-zinc-50
focus:outline-none focus:ring-2 focus:ring-indigo-500
```

### Badges
```
Status active:    bg-emerald-50 text-emerald-700 border border-emerald-200
Status sold:      bg-zinc-100 text-zinc-500 border border-zinc-200
Status deleted:   bg-red-50 text-red-600 border border-red-200
Category:         bg-indigo-50 text-indigo-700 border border-indigo-200
```

---

## Animation Rules

### Allowed Animations
- **Hover on cards:** `shadow-sm → shadow-md` via `transition-shadow duration-200`
- **Button hover:** color transition via `transition-colors duration-150`
- **Page route transitions:** `opacity-0 → opacity-100` fade (Next.js, subtle)
- **Modal/drawer open:** slide-in from edge or scale-in from center
- **Toast notifications:** slide in from corner
- **Loading skeletons:** pulse shimmer

### Forbidden Animations
- Rotating logos or decorative elements
- Parallax scroll effects
- Entrance animations on every item in a list (distracting)
- Heavy spring physics (feels performative)
- Animation that delays the user from seeing content

### The Rule
**Animation earns its place by making the UI clearer or faster to understand. If removing it doesn't hurt the user, remove it.**

---

## Empty States

Every empty state must have:
1. A simple, relevant icon (from Lucide)
2. A clear heading: "No listings yet"
3. A helpful subtext: "Be the first to post something in your area."
4. A CTA when appropriate: "Create a listing" button

Never show a completely blank area.

---

## Error States

Every error state must have:
1. An icon (warning or x-circle)
2. A clear message: "Something went wrong while loading listings."
3. A retry button or a suggestion

Do not show raw error objects or stack traces to users.

---

## Mobile-Specific Patterns

- Use bottom navigation bar for primary actions on mobile (Browse, Post, Profile, Admin)
- Avoid hover-only interactions — everything must be tappable
- Images in cards use `object-cover` and fixed aspect ratios
- Text is never smaller than `text-sm` (14px)
- The floating "Post a listing" CTA is a fixed bottom button on mobile

---

## RTL Considerations

Arabic is read right-to-left. The entire layout mirrors on RTL.

- Navigation: logo on the right, links on the left
- Cards: text aligned right
- Icons that indicate direction (chevron-right, arrow-right) must be flipped
- Use CSS logical properties and Tailwind RTL variants (`rtl:flex-row-reverse`)
- Tailwind `dir` attribute on `<html>` handles most cases automatically

**Visual testing:** After building any layout, switch to `ar` locale and verify nothing breaks.
