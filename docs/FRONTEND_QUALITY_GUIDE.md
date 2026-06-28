# Frontend Quality Guide — SND Mini

This guide defines the engineering and quality standards for every frontend sprint.
Read this before writing any frontend code.

---

## Philosophy

The frontend must feel like a **professional, production-ready product**. Not a tutorial app. Not a copied dashboard template. Not a generic school project.

Users of SND Mini should feel:
- Trust (the platform looks safe and credible)
- Clarity (information is easy to find and understand)
- Comfort (the experience works on their device, in their language)
- Speed (interactions feel instant and responsive)

---

## Architecture Rules

### Feature-Based Organization
Group code by feature, not by file type.

```
features/
  auth/
    api.ts        ← axios calls
    hooks.ts      ← TanStack Query hooks
  listings/
    api.ts
    hooks.ts
```

**Why:** When you need to change how listings work, all the relevant code is in one place — not scattered across `api/`, `hooks/`, `store/` folders.

### Component Responsibilities
- **Page components** (`app/[locale]/...`) — compose layouts, fetch data, no business logic
- **Feature components** (`components/listings/ListingCard.tsx`) — domain-specific UI, receive props
- **Shared components** (`components/shared/`) — reusable UI primitives (empty states, loaders, etc.)
- **shadcn/ui components** (`components/ui/`) — base design system, customize but don't break

### No Business Logic in Components
API calls and data transformation belong in `features/*/api.ts` and `features/*/hooks.ts`, not inside components. Components receive data and dispatch actions.

---

## TypeScript Rules

- `strict: true` always
- No `any` without explicit justification
- All API response types defined in `types/`
- Props interfaces defined for every component
- No implicit `any` from API responses — type them with Zod schemas

---

## Data Fetching Rules (TanStack Query)

- All server state managed by TanStack Query
- No raw `useEffect` + `fetch` for data fetching
- Use custom hooks from `features/*/hooks.ts`:

```typescript
// features/listings/hooks.ts
export function useListings(params: ListingsParams) {
  return useQuery({
    queryKey: ['listings', params],
    queryFn: () => fetchListings(params),
  });
}
```

- Always handle loading, error, and empty states in UI
- Use `useMutation` for POST/PATCH/DELETE with proper `onSuccess` invalidation

---

## Form Rules (React Hook Form + Zod)

- All forms use React Hook Form
- All forms use Zod for validation schema
- Validation errors display inline — not as alerts
- Submit button is disabled while the mutation is pending
- Success and error feedback is clear and immediate

```typescript
const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
```

---

## Responsive Design Rules

### Mobile-First
Build the mobile layout first. Expand to tablet and desktop.

### Breakpoints (Tailwind defaults)
```
Default:  mobile  (< 640px)
sm:       640px+
md:       768px+
lg:       1024px+
xl:       1280px+
```

### Required at Every Viewport
- Tap targets ≥ 44px on mobile
- Navigation accessible on mobile (hamburger or bottom bar)
- Cards stack vertically on mobile, grid on desktop
- Forms are full-width on mobile
- Images scale properly

---

## RTL / LTR Rules

The app supports Arabic (RTL) and English (LTR).

### Rules
- Use `ms-` and `me-` (margin-start, margin-end) instead of `ml-` and `mr-`
- Use `ps-` and `pe-` (padding-start, padding-end) instead of `pl-` and `pr-`
- Never hardcode `dir="ltr"` on any element
- The `<html>` element gets `dir` from the locale
- Icons that indicate direction (arrows, chevrons) must flip on RTL — use CSS logical properties or the `rtl:` Tailwind variant
- Test every layout in both Arabic and English before marking a sprint complete

```tsx
// Correct
<div className="ms-4 pe-2">

// Wrong
<div className="ml-4 pr-2">
```

---

## State Management Rules

- **Server state:** TanStack Query
- **Form state:** React Hook Form
- **Local UI state:** `useState` / `useReducer`
- **Auth state:** Custom `useAuth` hook (reads from TanStack Query or a lightweight context)
- No Redux, no Zustand — they are not needed at this scale

---

## Loading, Empty, Error States

Every data-driven view must handle all four states:

| State | What to show |
|---|---|
| Loading | Skeleton loaders (not a spinner for content-heavy pages) |
| Empty | A meaningful empty state with an icon, a message, and a CTA |
| Error | A clear error message with a retry option |
| Success | The actual content |

Never show a blank white screen.

---

## Accessibility Rules

- Use semantic HTML (`<nav>`, `<main>`, `<article>`, `<button>`, `<label>`)
- All interactive elements are keyboard-accessible
- All images have `alt` text
- Focus states are visible (do not remove `:focus` styles)
- Color contrast meets WCAG AA minimum (4.5:1 for normal text)
- Form inputs have associated labels
- Error messages are announced to screen readers (`aria-live` or `role="alert"`)

---

## i18n Rules

- Every UI string lives in `messages/en.json` and `messages/ar.json`
- No hardcoded English strings in components (except developer-only items)
- Use `next-intl`'s `useTranslations` hook
- Date and number formatting uses locale-aware utilities
- Test the Arabic version of every page

```tsx
const t = useTranslations('listings');
<h1>{t('title')}</h1>
```

---

## Light/Dark Mode

- Use Tailwind's `dark:` variant for all colors
- shadcn/ui components support dark mode natively
- Background, text, border, and card colors must all have dark variants
- Test both modes

---

## Code Reuse Rules

- If a component is used in two places, extract it
- If an API call is made in two hooks, extract it to `api.ts`
- If a Zod schema is shared between backend and frontend, move it to a shared package (future)
- No copy-paste of more than 5 lines

---

## Performance Rules

- Images use Next.js `<Image>` component (automatic optimization)
- Listings are paginated — never fetch all listings at once
- No unnecessary re-renders — memoize with `useMemo` / `useCallback` when profiling shows it matters
- Heavy libraries are imported dynamically if not needed on first paint
- No blocking data fetches in layouts — use suspense boundaries
