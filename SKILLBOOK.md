# SKILLBOOK
> Place this file as `CLAUDE.md` in your project root. All 22 skills load automatically every session.
>
> **Skills:** accessibility-check · animation · api-integration · code-reviewer · component-builder · css-architecture · dark-mode · design-system · error-handling · form-builder · git-commit-writer · image-optimization · performance-audit · prompt-improver · responsive-design · seo-optimizer · state-management · token-saver · typography · ui-debug · ux-patterns · web-security


---

## SKILL: accessibility-check
**Triggers:** Audit HTML/React/CSS code for accessibility (a11y) issues and provide fixes. Use when user asks about "accessibility", "a11y", "WCAG", "screen reader", "keyboard navigation", "alt text", "aria labels", "color contrast", "focus management", or wants to make their UI more accessible.


# Accessibility Check

Systematic accessibility audit and fix guide for web interfaces.

## Audit Process

### Step 1: Automated issues (check first)

These are reliably detectable and always fixable:

- Missing `alt` attributes on `<img>`
- Missing `<label>` for form inputs
- Missing `lang` attribute on `<html>`
- Buttons/links with no accessible name
- Duplicate IDs
- Empty heading tags
- Links that say "click here" or "read more"
- Missing `<main>`, `<nav>`, `<header>` landmarks

### Step 2: Interactive elements

Every interactive element must be:
- **Focusable** — reachable by Tab key
- **Operable** — activatable by Enter/Space
- **Visible when focused** — `:focus-visible` style present, never `outline: none` without replacement
- **Labelled** — screen reader knows what it does

### Step 3: Color & contrast

Minimum WCAG AA ratios:
- Normal text (< 18px): **4.5:1**
- Large text (≥ 18px or 14px bold): **3:1**
- UI components (borders, icons): **3:1**
- Text on colored backgrounds: use a contrast checker

> Color alone must never convey meaning (error states, required fields, etc.)

### Step 4: Motion & animation

- Wrap animations in `@media (prefers-reduced-motion: reduce)`
- No flashing content > 3 times per second


## Common Issues & Fixes

### Missing alt text
```html
<!-- ❌ -->
<img src="dashboard.png">

<!-- ✅ Descriptive alt -->
<img src="dashboard.png" alt="Monthly revenue chart showing 23% growth">

<!-- ✅ Decorative image (ignored by screen readers) -->
<img src="decoration.svg" alt="" role="presentation">
```

### Icon-only buttons
```html
<!-- ❌ Screen reader says "button" -->
<button><SearchIcon /></button>

<!-- ✅ -->
<button aria-label="Search"><SearchIcon aria-hidden="true" /></button>
```

### Custom interactive elements
```html
<!-- ❌ Div acting as button — not focusable, not keyboard-operable -->
<div onClick={handleClose}>×</div>

<!-- ✅ Use button -->
<button onClick={handleClose} aria-label="Close dialog">×</button>
```

### Modal / dialog focus management
```tsx
// ✅ Focus should move to modal on open, return to trigger on close
// Use a library like @radix-ui/dialog or implement:
useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus()
  } else {
    triggerRef.current?.focus()
  }
}, [isOpen])
```

### Form error messages
```html
<!-- ❌ Error visually present but not announced -->
<input type="email">
<span class="error">Invalid email</span>

<!-- ✅ -->
<input type="email" aria-describedby="email-error" aria-invalid="true">
<span id="email-error" role="alert">Invalid email address</span>
```

### Live regions for dynamic content
```html
<!-- Announce loading states, success/error messages -->
<div aria-live="polite" aria-atomic="true">
  {status && <p>{status}</p>}
</div>
```

### Skip navigation link
```html
<!-- First element in <body> -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```


## ARIA Quick Reference

| Use case | ARIA |
|----------|------|
| Toggle (on/off) | `aria-pressed="true/false"` |
| Checkbox-like | `aria-checked="true/false/mixed"` |
| Expanded section | `aria-expanded="true/false"` |
| Required field | `aria-required="true"` |
| Invalid field | `aria-invalid="true"` |
| Loading | `aria-busy="true"` |
| Modal | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |
| Tab panel | `role="tablist"` + `role="tab"` + `role="tabpanel"` |
| Hide from screen reader | `aria-hidden="true"` |
| Announce change | `aria-live="polite"` (or `assertive` for urgent) |


## Output Format

Return a prioritized list:

**Critical (blocks access)**
- [element/line] — [issue] — [exact fix]

**Serious (degrades experience)**
- [element/line] — [issue] — [exact fix]

**Moderate (WCAG compliance)**
- [element/line] — [issue] — [recommendation]

Include code snippets for all fixes.

---

## SKILL: animation
**Triggers:** Add CSS and JavaScript animations, transitions, micro-interactions, scroll animations, and page transitions to web interfaces. Use when user asks about "animation", "transition", "micro-interaction", "hover effect", "scroll animation", "page transition", "fade in", "slide", "keyframes", "motion", "animate", or wants to add movement to their UI.


# Animation

Add purposeful, performant animation that enhances UX without being distracting.

## The Golden Rule

Animate **transform** and **opacity** only. Everything else triggers layout or paint, killing performance.

```css
/* ✅ GPU-accelerated — smooth 60fps */
transform: translateX(0) scale(1) rotate(0deg);
opacity: 1;

/* ❌ Triggers layout — janky */
width, height, top, left, margin, padding
```

## CSS Transitions (simple state changes)

```css
/* All interactive elements should have transitions */
.button {
  transition: background-color 150ms ease, transform 100ms ease, box-shadow 150ms ease;
}
.button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.button:active {
  transform: translateY(0);
}
```

## CSS Keyframe Animations

```css
/* Fade in + slide up — the most useful animation */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Skeleton loading pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* Spinner */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Bounce — for notifications/alerts */
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
}
```

## Staggered Animations (lists, cards, grids)

```css
/* CSS approach — use animation-delay */
.card:nth-child(1) { animation: fadeInUp 400ms ease both; }
.card:nth-child(2) { animation: fadeInUp 400ms 80ms ease both; }
.card:nth-child(3) { animation: fadeInUp 400ms 160ms ease both; }
```

```jsx
// React approach — dynamic delay
{items.map((item, i) => (
  <Card
    key={item.id}
    style={{ animationDelay: `${i * 80}ms` }}
    className="animate-fadeInUp"
  />
))}
```

## Scroll Animations

### CSS-only (Intersection Observer not needed)
```css
/* Modern CSS scroll-driven animations */
@keyframes reveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

### Intersection Observer (broader support)
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target) // animate once
    }
  })
}, { threshold: 0.1 })

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
```

```css
[data-animate] { opacity: 0; transform: translateY(20px); transition: opacity 500ms ease, transform 500ms ease; }
[data-animate].is-visible { opacity: 1; transform: translateY(0); }
```

## Framer Motion (React)

```jsx
import { motion, AnimatePresence } from 'framer-motion'

// Basic entrance animation
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>

// Exit animation (needs AnimatePresence wrapper)
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    />
  )}
</AnimatePresence>

// Stagger children
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0 }
}
<motion.ul variants={container} initial="hidden" animate="show">
  {items.map(i => <motion.li key={i.id} variants={item} />)}
</motion.ul>
```

## Easing Reference

```css
/* Feel guide */
ease-out   — enters fast, settles gently  (best for entrances)
ease-in    — starts slow, exits fast      (best for exits)
ease-in-out — smooth both ways            (best for loops)
linear     — robotic, use for spinners only

/* Custom cubic-bezier */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* bouncy */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);       /* material design */
--ease-snappy: cubic-bezier(0.2, 0, 0, 1);          /* fast + smooth */
```

## Duration Guide

| Interaction | Duration |
|-------------|----------|
| Hover/active state | 100–150ms |
| Modal open/close | 200–250ms |
| Page transition | 300–400ms |
| Complex entrance | 400–600ms |
| Attention-seeking | 600–800ms |

## Reduced Motion (Required)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```jsx
// Framer Motion respects this automatically with:
const { prefersReducedMotion } = useReducedMotion()
```

---

## SKILL: api-integration
**Triggers:** Integrate REST and GraphQL APIs into web apps with proper error handling, loading states, auth headers, retries, and caching. Use when user needs to "connect to an API", "fetch data", "call an endpoint", "integrate a third-party API", "handle API errors", "add authentication headers", "API wrapper", or is building any data-fetching layer.


# API Integration

Build robust, type-safe API integrations with proper error handling, loading states, and caching.

## Choosing Your Fetching Strategy

| Approach | Use when |
|----------|----------|
| `fetch` / `axios` | Server-side, one-off requests, non-React |
| **TanStack Query** | React apps — most cases, best DX |
| **SWR** | Simpler React apps, Next.js |
| **tRPC** | Full-stack TypeScript monorepo |
| **GraphQL + Apollo/urql** | GraphQL APIs |

## API Client Setup (TypeScript)

```typescript
// lib/api-client.ts — centralized client with auth + error handling
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.example.com'

class ApiError extends Error {
  constructor(public status: number, public data: unknown, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken() // your auth logic

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const data = await res.json().catch(() => null)
    throw new ApiError(res.status, data, `API error ${res.status}: ${path}`)
  }

  return res.json() as Promise<T>
}

export const api = {
  get:    <T>(path: string) => apiFetch<T>(path),
  post:   <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put:    <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  patch:  <T>(path: string, body: unknown) => apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
}
```

## TanStack Query Pattern

```typescript
// hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api-client'

// Query key factory — keeps keys consistent
export const userKeys = {
  all: ['users'] as const,
  list: (filters?: UserFilters) => [...userKeys.all, 'list', filters] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}

// Fetch list
export function useUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: userKeys.list(filters),
    queryFn: () => api.get<User[]>('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Fetch single
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<User>(`/users/${id}`),
    enabled: !!id,
  })
}

// Mutation with optimistic update
export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) =>
      api.patch<User>(`/users/${id}`, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(userKeys.detail(updated.id), updated)
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
```

## Error Handling Patterns

```typescript
// Categorize errors for better UX
function handleApiError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401: return 'Please log in to continue'
      case 403: return "You don't have permission to do that"
      case 404: return 'Not found'
      case 422: return 'Please check your input and try again'
      case 429: return 'Too many requests — please slow down'
      case 500: return 'Server error — please try again later'
      default:  return 'Something went wrong'
    }
  }
  if (error instanceof TypeError) return 'Network error — check your connection'
  return 'An unexpected error occurred'
}
```

## Retry Logic

```typescript
// Exponential backoff retry
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if (attempt === maxRetries) throw error
      if (error instanceof ApiError && error.status < 500) throw error // don't retry 4xx
      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 500))
    }
  }
  throw new Error('unreachable')
}
```

## Pagination Pattern

```typescript
// Cursor-based pagination with TanStack Query
export function useInfiniteUsers() {
  return useInfiniteQuery({
    queryKey: userKeys.list(),
    queryFn: ({ pageParam }) =>
      api.get<{ users: User[]; nextCursor: string | null }>(
        `/users?cursor=${pageParam ?? ''}`
      ),
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    initialPageParam: null,
  })
}
```

## Environment Config

```typescript
// Always validate env vars at startup
const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  apiKey: process.env.API_KEY, // server-side only
} as const

// Validate
Object.entries(config).forEach(([key, val]) => {
  if (!val) throw new Error(`Missing env var: ${key}`)
})
```

## Security Checklist

- [ ] API keys never exposed to client bundle (use server-side only)
- [ ] Auth tokens stored in `httpOnly` cookies, not `localStorage`
- [ ] All user-provided data validated before sending to API
- [ ] CORS configured correctly on backend
- [ ] Rate limiting handled gracefully (429 with backoff)
- [ ] Sensitive data stripped from error logs

---

## SKILL: code-reviewer
**Triggers:** Review frontend/web code for bugs, performance issues, security flaws, accessibility problems, and best practice violations. Use when user asks to "review my code", "check this code", "what's wrong with this", "code review", "audit this", "give feedback on my code", "is this good code", or submits code for evaluation.


# Code Reviewer

Fast, structured code review focused on real issues — not style opinions.

## Review Priorities (in order)

1. **Bugs** — Will this break? Does it always work correctly?
2. **Security** — XSS, data exposure, unvalidated input, auth gaps
3. **Performance** — Unnecessary re-renders, layout thrashing, waterfalls
4. **Accessibility** — Can all users use this?
5. **Maintainability** — Will the next developer understand this?
6. **Style** — Only flag if it violates a clear convention

> Never comment on style unless asked. Don't nitpick naming unless confusing.


## Review Checklist

### JavaScript / TypeScript

- [ ] No `any` types where specific types can be inferred
- [ ] Async errors are caught (try/catch or `.catch()`)
- [ ] No floating promises (unhandled `async` calls)
- [ ] Array mutations avoided on state (no `.push()` on state arrays)
- [ ] No `==` instead of `===`
- [ ] No `console.log` left in production code
- [ ] Null/undefined safely handled (optional chaining, nullish coalescing)

### React

- [ ] Hooks rules followed (no conditional hooks, no hooks in callbacks)
- [ ] Dependencies array complete in `useEffect`/`useCallback`/`useMemo`
- [ ] No derived state stored in state (compute from props instead)
- [ ] Keys in lists are stable (not array index unless list is static)
- [ ] Large components broken into focused sub-components
- [ ] No inline object/function literals in JSX causing unnecessary re-renders
- [ ] `useCallback`/`useMemo` used only where profiling shows benefit (not preemptively)

### Security

- [ ] No `dangerouslySetInnerHTML` with user-provided content
- [ ] Sensitive data not logged or exposed in errors
- [ ] API keys not hardcoded or exposed to client
- [ ] User input validated before use
- [ ] No `eval()` or `new Function()` with user input
- [ ] External links use `rel="noopener noreferrer"`

### Performance

- [ ] Images have explicit width/height (prevents layout shift)
- [ ] Heavy imports lazy-loaded when not immediately needed
- [ ] No sequential `await` when `Promise.all` would work
- [ ] No API calls inside render (use `useEffect` or query library)
- [ ] Large lists virtualized (react-window, tanstack virtual)

### Accessibility

- [ ] Interactive elements are focusable and keyboard-operable
- [ ] Images have descriptive alt text (or `alt=""` if decorative)
- [ ] Form inputs have associated labels
- [ ] Color is not the only indicator of state
- [ ] Touch targets are at least 44×44px


## Output Format

Structure review as:

### 🐛 Bugs (must fix)
> [line/snippet] — [what's wrong] — [fix]

### 🔒 Security (must fix)
> [line/snippet] — [risk] — [fix]

### ⚡ Performance (should fix)
> [line/snippet] — [impact] — [fix]

### ♿ Accessibility (should fix)
> [line/snippet] — [issue] — [fix]

### 💡 Suggestions (optional)
> [line/snippet] — [why it could be better] — [alternative]

### ✅ What's good
> Briefly note 2-3 things done well (keeps feedback balanced)


## Tone Guidelines

- Be direct and specific. "Line 47: missing error handling" not "you might want to consider error handling"
- Explain WHY for non-obvious issues
- Provide the fix, not just the problem
- Don't rewrite working code just to match your preferences
- If something is ambiguous, state the assumption you're reviewing under

---

## SKILL: component-builder
**Triggers:** Build production-ready React/Vue/HTML components with clean structure, TypeScript types, accessibility, and sensible defaults. Use when user asks to "build a component", "create a UI component", "make a reusable component", "build a [button/modal/form/table/card/dropdown/etc]", or wants a specific UI element implemented.


# Component Builder

Build focused, reusable, accessible UI components that are production-ready from the start.

## Process

### Step 1: Clarify the component contract

Before writing code, establish:
- **Props/API** — What inputs does it accept? What events does it emit?
- **States** — What visual states exist? (default, hover, focus, disabled, loading, error, empty)
- **Variants** — Size variants? Color variants? Layout variants?
- **Slots/children** — Does content need to be injected?
- **Framework** — React, Vue, HTML/CSS, or framework-agnostic?

If unclear, ask ONE focused question. Don't ask multiple.

### Step 2: Build the component

**Structure every component as:**
1. Types/Props interface (TypeScript)
2. Component logic
3. Render
4. Styles (co-located or Tailwind)

### Step 3: Include the essentials

Every component should have:
- [ ] TypeScript types for all props
- [ ] Default prop values where sensible
- [ ] `aria-*` attributes for accessibility
- [ ] Keyboard interaction (Enter/Space for interactive elements)
- [ ] Focus visible styles (never remove `:focus-visible`)
- [ ] Forwarded ref if it's an interactive element
- [ ] A brief JSDoc comment if the API isn't obvious


## Component Templates

### React Component (TypeScript + Tailwind)

```tsx
import { forwardRef } from 'react'
import { cn } from '@/lib/utils' // or clsx

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading}
      className={cn(
        'inline-flex items-center justify-center rounded font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        {
          primary: 'bg-blue-600 text-white hover:bg-blue-700',
          secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
          ghost: 'hover:bg-gray-100',
          destructive: 'bg-red-600 text-white hover:bg-red-700',
        }[variant],
        { sm: 'h-8 px-3 text-sm', md: 'h-10 px-4', lg: 'h-12 px-6 text-lg' }[size],
        className
      )}
      {...props}
    >
      {loading && <span className="mr-2 animate-spin">⟳</span>}
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export { Button }
export type { ButtonProps }
```

### Compound Component Pattern (for complex components)

```tsx
// Use when component has multiple related sub-parts
// Example: <Card>, <Card.Header>, <Card.Body>, <Card.Footer>

const Card = ({ children, className, ...props }: CardProps) => (
  <div className={cn('rounded-lg border bg-white shadow-sm', className)} {...props}>
    {children}
  </div>
)

Card.Header = ({ children, className }: CardSectionProps) => (
  <div className={cn('border-b px-6 py-4', className)}>{children}</div>
)

Card.Body = ({ children, className }: CardSectionProps) => (
  <div className={cn('px-6 py-4', className)}>{children}</div>
)
```

### Headless / Logic-only Hook

```tsx
// When behavior should be separated from presentation
function useToggle(initial = false) {
  const [value, setValue] = useState(initial)
  return {
    value,
    toggle: () => setValue(v => !v),
    setTrue: () => setValue(true),
    setFalse: () => setValue(false),
  }
}
```


## Accessibility Checklist

| Element | Required ARIA |
|---------|--------------|
| Icon-only button | `aria-label="..."` |
| Modal/dialog | `role="dialog"`, `aria-modal`, `aria-labelledby` |
| Loading state | `aria-busy="true"` or `aria-live="polite"` |
| Error message | `aria-describedby` linking input to error |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` |
| Toggle | `aria-pressed` or `aria-checked` |
| Expanded section | `aria-expanded` |


## Output Format

Deliver:
1. **The component file** (complete, copy-paste ready)
2. **Usage example** (5–10 lines showing common use)
3. **Props table** (if non-trivial API)

Keep explanations minimal — the code should speak for itself.

---

## SKILL: css-architecture
**Triggers:** Organize, structure, and scale CSS for maintainable codebases. Use when user asks about "CSS structure", "design tokens", "CSS variables", "theming", "naming conventions", "BEM", "CSS modules", "CSS organization", "scaling CSS", "style system", or wants help making their CSS more maintainable.


# CSS Architecture

Build CSS systems that scale — from design tokens to naming conventions to theming.

## Design Tokens (the foundation)

Design tokens are the single source of truth for your visual language. Define them first.

```css
/* tokens.css — or :root in globals.css */
:root {
  /* Color palette */
  --color-gray-50:  #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-900: #111827;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;

  /* Semantic colors (reference palette tokens) */
  --color-background:    var(--color-gray-50);
  --color-surface:       #ffffff;
  --color-text-primary:  var(--color-gray-900);
  --color-text-secondary: #6b7280;
  --color-border:        var(--color-gray-100);
  --color-accent:        var(--color-blue-600);
  --color-accent-hover:  var(--color-blue-500);

  /* Typography */
  --font-sans:   'Inter Variable', system-ui, sans-serif;
  --font-mono:   'JetBrains Mono', 'Fira Code', monospace;
  --font-display: 'Cal Sans', var(--font-sans);

  --text-xs:   0.75rem;   /* 12px */
  --text-sm:   0.875rem;  /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg:   1.125rem;  /* 18px */
  --text-xl:   1.25rem;   /* 20px */
  --text-2xl:  1.5rem;    /* 24px */
  --text-4xl:  2.25rem;   /* 36px */

  /* Spacing (4px base unit) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   350ms ease;

  /* Z-index scale */
  --z-base:    0;
  --z-above:   10;
  --z-dropdown: 100;
  --z-sticky:  200;
  --z-overlay: 300;
  --z-modal:   400;
  --z-toast:   500;
}
```

## Dark Mode Theming

```css
/* Automatic dark mode via media query */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background:    #0f172a;
    --color-surface:       #1e293b;
    --color-text-primary:  #f1f5f9;
    --color-text-secondary: #94a3b8;
    --color-border:        #334155;
  }
}

/* Manual dark mode via class */
[data-theme="dark"] {
  --color-background:    #0f172a;
  /* etc */
}
```

## File Structure

```
styles/
├── tokens.css          # Design tokens (:root variables)
├── reset.css           # Normalize / CSS reset
├── typography.css      # Base type styles
├── utilities.css       # One-off utility classes
└── components/
    ├── button.css
    ├── card.css
    └── form.css
```

Or with Tailwind:
```
styles/
├── globals.css         # @tailwind directives + custom properties
└── components/         # Only for complex components needing vanilla CSS
```

## Naming Conventions

### BEM (Block Element Modifier)
```css
/* Block */
.card { }

/* Element (part of block) */
.card__title { }
.card__image { }
.card__footer { }

/* Modifier (variant of block or element) */
.card--featured { }
.card__title--large { }
```

### Tailwind + Component Classes (hybrid)
```html
<!-- Use Tailwind for utilities, a class for the component itself -->
<div class="card rounded-lg shadow-md overflow-hidden">
  <h2 class="card__title text-xl font-semibold">...</h2>
</div>
```

## CSS Layers (modern cascade control)

```css
@layer reset, tokens, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  /* etc */
}

@layer tokens { :root { /* all tokens */ } }
@layer base { h1, h2, h3 { /* base type */ } }
@layer components { .button { /* component */ } }
@layer utilities { .sr-only { /* utility */ } }
```

## Common Architecture Mistakes

| Mistake | Fix |
|---------|-----|
| Magic numbers everywhere | Use spacing/color tokens |
| Deep nesting (`.a .b .c .d`) | Flatten with BEM, max 2 levels deep |
| `!important` abuse | Fix specificity instead |
| Inline styles for variants | Use CSS custom properties or data attributes |
| No dark mode strategy | Plan token layer early |
| Global CSS in component files | Scope with CSS Modules or BEM naming |

---

## SKILL: dark-mode
**Triggers:** Implement dark mode for websites and web apps including CSS custom properties, system preference detection, manual toggle, localStorage persistence, Next.js dark mode, and preventing flash of incorrect theme. Use when user asks about "dark mode", "light/dark toggle", "color scheme", "theme switcher", "prefers-color-scheme", "dark theme", or wants to add theme switching to their app.


# Dark Mode

Implement dark mode that respects system preferences, persists user choice, and avoids theme flash.

## The Three Requirements

1. **System-aware** — respect `prefers-color-scheme`
2. **User-overridable** — manual toggle saved to localStorage
3. **No flash** — correct theme on first paint, before JS loads

## CSS Custom Properties Approach

```css
/* Define all theme colors as CSS variables */
:root {
  --bg:          #ffffff;
  --bg-surface:  #f9fafb;
  --text:        #111827;
  --text-muted:  #6b7280;
  --border:      #e5e7eb;
  --accent:      #3b82f6;
}

[data-theme="dark"] {
  --bg:          #0f172a;
  --bg-surface:  #1e293b;
  --text:        #f1f5f9;
  --text-muted:  #94a3b8;
  --border:      #334155;
  --accent:      #60a5fa;
}

/* Automatic dark mode (no JS needed) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg:          #0f172a;
    --bg-surface:  #1e293b;
    --text:        #f1f5f9;
    --text-muted:  #94a3b8;
    --border:      #334155;
    --accent:      #60a5fa;
  }
}
```

## Preventing Flash (Critical)

Add this inline `<script>` before anything else in `<head>`:

```html
<script>
  // Run before page renders — no flash
  (function() {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = saved ?? (prefersDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
  })()
</script>
```

## React Hook (theme toggle)

```tsx
// hooks/use-theme.ts
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system'
    return (localStorage.getItem('theme') as Theme) ?? 'system'
  })

  const resolvedTheme: 'light' | 'dark' = (() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  })()

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', resolvedTheme)
    if (theme === 'system') {
      localStorage.removeItem('theme')
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [theme, resolvedTheme])

  return { theme, resolvedTheme, setTheme: setThemeState }
}
```

## Theme Toggle Component

```tsx
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

// 3-way toggle (light / dark / system)
export function ThemeSelect() {
  const { theme, setTheme } = useTheme()
  return (
    <select value={theme} onChange={e => setTheme(e.target.value as Theme)}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="system">System</option>
    </select>
  )
}
```

## Next.js Setup

```tsx
// app/layout.tsx — apply data-theme on <html>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash script */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            var t=localStorage.getItem('theme');
            var d=window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.setAttribute('data-theme', t||(d?'dark':'light'));
          })()
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

> `suppressHydrationWarning` on `<html>` is needed because `data-theme` is set by the inline script before React hydrates — this is intentional and safe.

## Tailwind Dark Mode

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media' for system-only
}
```

```html
<!-- Use dark: prefix -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

When using `class` strategy, toggle the `dark` class on `<html>`:
```js
document.documentElement.classList.toggle('dark')
```

## Image Handling in Dark Mode

```html
<!-- Different image per theme -->
<picture>
  <source srcset="logo-dark.svg" media="(prefers-color-scheme: dark)">
  <img src="logo-light.svg" alt="Logo">
</picture>

<!-- CSS approach -->
.logo { content: url('/logo-light.svg'); }
[data-theme="dark"] .logo { content: url('/logo-dark.svg'); }
```

---

## SKILL: design-system
**Triggers:** Build and maintain design systems including component libraries, design tokens, documentation, variant APIs, and style guides. Use when user asks about "design system", "component library", "style guide", "token system", "variant API", "storybook", "design consistency", "scalable styles", "theming system", "design language", "UI kit", or wants to create a consistent visual and interaction foundation across their app.


# Design System

Build a shared language between design and code — consistent, scalable, and documented.

## What a Design System Is (and Isn't)

**It IS:**
- A set of design decisions made once, applied everywhere
- A living collection of reusable components
- Documentation of when and how to use each component
- A shared vocabulary between designers and developers

**It is NOT:**
- Just a component library (that's one part of it)
- A rigid set of rules (it should enable creativity within constraints)
- Finished (it evolves with your product)


## Layer 1: Design Tokens

Tokens are the atoms — every other layer references them. Define once, use everywhere.

```typescript
// tokens.ts — the source of truth
export const tokens = {
  // Primitives (raw values — don't use directly in components)
  color: {
    gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
            400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
            800: '#1f2937', 900: '#111827', 950: '#030712' },
    blue: { 50: '#eff6ff', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8' },
    red:  { 50: '#fef2f2', 500: '#ef4444', 600: '#dc2626' },
    green:{ 50: '#f0fdf4', 500: '#22c55e', 600: '#16a34a' },
  },
  
  // Semantic (reference primitives — USE these in components)
  semantic: {
    'color-background':     'var(--color-gray-50)',
    'color-surface':        '#ffffff',
    'color-surface-raised': 'var(--color-gray-50)',
    'color-border':         'var(--color-gray-200)',
    'color-border-strong':  'var(--color-gray-400)',
    'color-text':           'var(--color-gray-900)',
    'color-text-secondary': 'var(--color-gray-500)',
    'color-text-disabled':  'var(--color-gray-400)',
    'color-accent':         'var(--color-blue-600)',
    'color-accent-hover':   'var(--color-blue-700)',
    'color-danger':         'var(--color-red-600)',
    'color-success':        'var(--color-green-600)',
  },

  // Spacing (4px base unit)
  space: { 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem',
           6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem' },

  // Typography
  font: {
    family: { sans: "'Inter Variable', system-ui, sans-serif", mono: "'JetBrains Mono', monospace" },
    size:   { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem',
              xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem' },
    weight: { normal: '400', medium: '500', semibold: '600', bold: '700' },
    leading:{ tight: '1.2', snug: '1.375', normal: '1.5', relaxed: '1.625', loose: '2' },
  },

  // Border radius
  radius: { none: '0', sm: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },

  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },

  // Z-index
  z: { base: 0, above: 10, dropdown: 100, sticky: 200, overlay: 300, modal: 400, toast: 500 },

  // Transitions
  duration: { fast: '100ms', base: '200ms', slow: '350ms' },
  easing:   { default: 'cubic-bezier(0.4, 0, 0.2, 1)', in: 'cubic-bezier(0.4, 0, 1, 1)', out: 'cubic-bezier(0, 0, 0.2, 1)' },
} as const
```


## Layer 2: Component API Design

Every component in your system needs a consistent, predictable API.

### Variant pattern (class-variance-authority)

```bash
npm install class-variance-authority
```

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles (always applied)
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:     'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
        secondary:   'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-400',
        outline:     'border border-gray-200 bg-transparent hover:bg-gray-50 focus-visible:ring-gray-400',
        ghost:       'hover:bg-gray-100 focus-visible:ring-gray-400',
        destructive: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600',
        link:        'text-blue-600 underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs',
        sm: 'h-8 px-3 text-sm',
        md: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base',
        xl: 'h-12 px-6 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, loading, leftIcon, rightIcon, className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={props.disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner className="h-4 w-4" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  )
)
```

### Consistent prop naming conventions

```typescript
// ✅ Consistent naming across all components
interface ComponentProps {
  // Variants always use `variant`
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  // Sizes always use `size`
  size?: 'sm' | 'md' | 'lg'
  // Visual state
  isDisabled?: boolean   // or just extend HTML: disabled?: boolean
  isLoading?: boolean
  isSelected?: boolean
  isExpanded?: boolean
  // Layout
  fullWidth?: boolean
  // Extensibility
  className?: string
  // Children
  children?: React.ReactNode
  // Render props
  as?: React.ElementType  // polymorphic: <Button as="a" href="...">
}
```


## Layer 3: Component Documentation

Every component needs answers to:
1. **What is it?** — one sentence
2. **When to use it** (and when NOT to)
3. **Variants** — visual examples
4. **Props** — table with types, defaults, descriptions
5. **Accessibility** — what ARIA it uses, keyboard behavior
6. **Examples** — copy-paste code

### Storybook story template

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Buttons trigger actions or navigate. 
Use **primary** for the most important action on the page.
Never use more than one primary button in the same view.
        `
      }
    }
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'] },
    size:    { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
  }
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Save changes', variant: 'primary' } }
export const Destructive: Story = { args: { children: 'Delete account', variant: 'destructive' } }
export const Loading: Story = { args: { children: 'Saving...', loading: true } }

// Show all variants together
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      {(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const).map(v => (
        <Button key={v} variant={v}>{v}</Button>
      ))}
    </div>
  )
}
```


## Layer 4: Component Inventory

Track what you have to avoid duplication:

```markdown
## Status Key
✅ Production-ready  🚧 In progress  📋 Planned  ❌ Deprecated

## Components

### Inputs
| Component   | Status | Notes |
|------------|--------|-------|
| Button      | ✅     | 5 variants, 3 sizes |
| Input       | ✅     | Text, email, number, password |
| Textarea    | ✅     |       |
| Select      | ✅     | Native + custom |
| Checkbox    | ✅     |       |
| Radio       | ✅     |       |
| Toggle      | ✅     | Accessible switch |
| File Upload | 🚧     | Drag-and-drop pending |

### Layout
| Component   | Status | Notes |
|------------|--------|-------|
| Card        | ✅     | Default, bordered, elevated |
| Divider     | ✅     |       |
| Stack       | ✅     | Vertical spacing utility |
| Grid        | 📋     | Planned Q2 |

### Feedback
| Component   | Status | Notes |
|------------|--------|-------|
| Toast       | ✅     | success, error, info, warning |
| Alert       | ✅     | Inline alerts |
| Badge       | ✅     |       |
| Spinner     | ✅     |       |
| Skeleton    | ✅     |       |
| Progress    | 📋     |       |
```


## File Structure

```
src/
├── components/
│   └── ui/                    # Design system components
│       ├── button/
│       │   ├── Button.tsx
│       │   ├── Button.stories.tsx
│       │   ├── Button.test.tsx
│       │   └── index.ts
│       ├── input/
│       ├── card/
│       └── index.ts           # Re-export everything
├── lib/
│   ├── tokens.ts              # Design tokens
│   └── utils.ts               # cn() helper etc.
└── styles/
    ├── globals.css            # @tailwind + CSS custom properties
    └── tokens.css             # CSS variables from tokens
```


## Theming (multi-brand / white-label)

```typescript
// themes/default.ts
export const defaultTheme = {
  colors: { accent: '#3b82f6', 'accent-hover': '#2563eb' },
  radius: { button: '0.375rem', card: '0.5rem' },
  fonts:  { sans: "'Inter Variable', system-ui, sans-serif" },
}

// themes/brand-x.ts
export const brandXTheme = {
  colors: { accent: '#7c3aed', 'accent-hover': '#6d28d9' },
  radius: { button: '9999px', card: '1rem' },    // pill buttons
  fonts:  { sans: "'Nunito', system-ui, sans-serif" },
}

// Apply theme as CSS variables
function applyTheme(theme: typeof defaultTheme) {
  Object.entries(theme.colors).forEach(([key, val]) => {
    document.documentElement.style.setProperty(`--color-${key}`, val)
  })
}
```


## Design System Governance

**Contribution process:**
1. Propose in a discussion (design + eng review)
2. Build in isolation (Storybook)
3. Review for API consistency, accessibility, token usage
4. Document before merging
5. Announce in team channel

**Versioning:**
- Treat like a library — semantic versioning
- Breaking changes get a major version
- New components get a minor version
- Keep a CHANGELOG

**When to add to the system vs. keep local:**
```
Add to system when:        Keep local when:
✅ Used in 3+ places       ✅ Used in 1 place only
✅ Long-term stable        ✅ Experimental / in flux
✅ Generalizable           ✅ Highly domain-specific
```

---

## SKILL: error-handling
**Triggers:** Implement robust error handling for web apps including React error boundaries, async error handling, API errors, user-facing error states, error logging, and graceful degradation. Use when user asks about "error handling", "error boundary", "try catch", "async errors", "error states", "crash", "unhandled promise", "error logging", "graceful degradation", or wants better error resilience.


# Error Handling

Build apps that fail gracefully — users see helpful messages, you get actionable logs.

## Error Types

| Type | Where | Fix |
|------|-------|-----|
| **Render errors** | React component throws | Error Boundary |
| **Async/network errors** | fetch, API calls | try/catch + user message |
| **Unhandled promises** | Missing .catch() | Global handler |
| **Type errors** | Runtime type mismatch | TypeScript + runtime validation |
| **Expected errors** | 404, 422, auth failed | Handle per-case |
| **Unexpected errors** | Bugs, server 500s | Generic fallback + logging |

## React Error Boundaries

```tsx
// components/error-boundary.tsx
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode)
  onError?: (error: Error, info: { componentStack: string }) => void
}

interface State { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    this.props.onError?.(error, info)
    console.error('ErrorBoundary caught:', error, info)
    // Send to Sentry: Sentry.captureException(error, { extra: info })
  }

  reset = () => this.setState({ hasError: false, error: null })

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props
      if (typeof fallback === 'function') return fallback(this.state.error!, this.reset)
      return fallback ?? <DefaultErrorFallback error={this.state.error!} reset={this.reset} />
    }
    return this.props.children
  }
}

function DefaultErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>We're looking into it. Try refreshing or come back later.</p>
      <button onClick={reset}>Try again</button>
      {process.env.NODE_ENV === 'development' && (
        <pre>{error.message}</pre>
      )}
    </div>
  )
}
```

```tsx
// Usage — wrap sections, not just the whole app
<ErrorBoundary fallback={(error, reset) => <SectionError error={error} onRetry={reset} />}>
  <DashboardWidget />
</ErrorBoundary>
```

## Async Error Handling

```typescript
// Custom error class — gives structured error info
class AppError extends Error {
  constructor(
    public code: 'NETWORK' | 'AUTH' | 'NOT_FOUND' | 'VALIDATION' | 'UNKNOWN',
    public message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'AppError'
  }
}

// Wrapper that classifies errors
async function safeAsync<T>(fn: () => Promise<T>): Promise<[T, null] | [null, AppError]> {
  try {
    const data = await fn()
    return [data, null]
  } catch (error) {
    if (error instanceof AppError) return [null, error]
    if (error instanceof TypeError) return [null, new AppError('NETWORK', 'Network error', undefined, error)]
    return [null, new AppError('UNKNOWN', 'An unexpected error occurred', undefined, error)]
  }
}

// Usage
const [user, error] = await safeAsync(() => fetchUser(id))
if (error) {
  if (error.code === 'AUTH') redirect('/login')
  return showError(error.message)
}
```

## Error States in UI

```tsx
// Show the right UI for each error state
function DataView({ id }: { id: string }) {
  const { data, error, isLoading, refetch } = useQuery(...)

  if (isLoading) return <Skeleton />

  if (error) {
    const msg = getErrorMessage(error) // converts error to user-friendly string
    return (
      <EmptyState
        icon={<AlertIcon />}
        title="Couldn't load data"
        description={msg}
        action={<button onClick={() => refetch()}>Try again</button>}
      />
    )
  }

  if (!data || data.length === 0) {
    return <EmptyState title="No results" description="Try adjusting your filters." />
  }

  return <DataTable data={data} />
}
```

## Global Error Handlers

```typescript
// Catch unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // Sentry.captureException(event.reason)
  event.preventDefault() // prevent console noise in production
})

// Catch uncaught exceptions
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error)
  // Sentry.captureException(event.error)
})
```

## Next.js Error Pages

```tsx
// app/error.tsx — handles render errors in the app
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// app/not-found.tsx
export default function NotFound() {
  return <div><h2>Page not found</h2><Link href="/">Go home</Link></div>
}

// app/global-error.tsx — catches errors in root layout
'use client'
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return <html><body><h2>Something went wrong</h2><button onClick={reset}>Try again</button></body></html>
}
```

## Error Logging (Sentry)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

```typescript
// Log errors with context
import * as Sentry from '@sentry/nextjs'

Sentry.captureException(error, {
  user: { id: userId, email: userEmail },
  tags: { feature: 'checkout', action: 'payment' },
  extra: { orderId, cartItems },
})
```

## Error Message Helpers

```typescript
// Convert any error to a user-friendly string
function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) return error.message
  if (error instanceof Error) {
    if (error.message.includes('fetch')) return 'Network error — check your connection'
    return error.message
  }
  return 'An unexpected error occurred'
}

// HTTP status → user message
const STATUS_MESSAGES: Record<number, string> = {
  400: 'Please check your input and try again',
  401: 'Please log in to continue',
  403: "You don't have permission to do that",
  404: 'Not found',
  429: 'Too many requests — please slow down',
  500: 'Server error — please try again later',
  503: 'Service unavailable — please try again later',
}
```

---

## SKILL: form-builder
**Triggers:** Build accessible, validated web forms with good UX including React Hook Form, Zod validation, error states, loading states, and multi-step forms. Use when user asks to "build a form", "add form validation", "create a signup form", "contact form", "multi-step form", "form errors", "react hook form", "form submit", or needs any kind of user input form.


# Form Builder

Build forms that are accessible, validated, and a pleasure to fill out.

## Stack Recommendation

| Layer | Tool |
|-------|------|
| Form state | **React Hook Form** (best performance, minimal re-renders) |
| Validation schema | **Zod** (TypeScript-first, composable) |
| Integration | `@hookform/resolvers` |

```bash
npm install react-hook-form zod @hookform/resolvers
```

## Complete Form Example

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// 1. Define schema
const schema = z.object({
  name:  z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
  subscribe: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

// 2. Form component
export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    await submitToApi(data) // your API call
    reset()
  }

  if (isSubmitSuccessful) return <SuccessMessage />

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Name" error={errors.name?.message}>
        <input
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
      </Field>

      <Field label="Email" error={errors.email?.message}>
        <input
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea {...register('message')} rows={4} />
      </Field>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

// 3. Reusable Field wrapper
function Field({ label, error, children }: {
  label: string; error?: string; children: React.ReactNode
}) {
  const id = useId()
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {React.cloneElement(children as React.ReactElement, { id })}
      {error && (
        <span id={`${id}-error`} role="alert" className="error-message">
          {error}
        </span>
      )}
    </div>
  )
}
```

## Zod Schema Patterns

```typescript
// Common validations
const schema = z.object({
  // String
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, 'Alphanumeric only'),

  // Email
  email: z.string().email(),

  // Password with confirmation
  password: z.string().min(8).regex(/[A-Z]/, 'Need uppercase').regex(/[0-9]/, 'Need number'),
  confirmPassword: z.string(),

  // Phone
  phone: z.string().regex(/^\+?[\d\s\-()]{7,15}$/, 'Invalid phone number').optional(),

  // URL
  website: z.string().url().optional().or(z.literal('')),

  // Number
  age: z.number().int().min(18, 'Must be 18+').max(120),

  // Select
  role: z.enum(['admin', 'user', 'viewer']),

  // File
  avatar: z.instanceof(File).refine(f => f.size < 5_000_000, 'Max 5MB'),
}).refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords don't match", path: ['confirmPassword'] }
)
```

## Multi-Step Form

```tsx
type Step = 'account' | 'profile' | 'review'

export function MultiStepForm() {
  const [step, setStep] = useState<Step>('account')
  const [formData, setFormData] = useState<Partial<FormData>>({})

  const handleStepComplete = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
    const next: Record<Step, Step | 'done'> = {
      account: 'profile', profile: 'review', review: 'done'
    }
    if (next[step] === 'done') submitFinalForm({ ...formData, ...data })
    else setStep(next[step] as Step)
  }

  return (
    <div>
      <StepIndicator current={step} steps={['account', 'profile', 'review']} />
      {step === 'account' && <AccountStep onComplete={handleStepComplete} />}
      {step === 'profile' && <ProfileStep onComplete={handleStepComplete} />}
      {step === 'review'  && <ReviewStep data={formData} onComplete={handleStepComplete} />}
    </div>
  )
}
```

## UX Best Practices

**Validation timing:**
- Validate on blur (not on every keystroke — too aggressive)
- Show errors after first submit attempt, then live-validate on change
- React Hook Form does this with `mode: 'onTouched'`

**Error messages:**
- Be specific: "Email is required" not "This field is required"
- Tell the user how to fix it: "Must be at least 8 characters" not "Too short"
- Use `role="alert"` so screen readers announce errors

**Loading & success states:**
- Disable submit button while submitting
- Show a spinner or "Sending…" text
- Give clear success feedback, don't just silently reset

**Label rules:**
- Every input must have a visible `<label>` or `aria-label`
- Never use placeholder text as the only label (disappears on type)
- Mark required fields with `aria-required` and a visual indicator

## CSS for Form States

```css
.input {
  border: 1px solid var(--color-border);
  transition: border-color 150ms ease, box-shadow 150ms ease;
}
.input:focus-visible {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(59,130,246,0.25);
}
.input[aria-invalid="true"] {
  border-color: var(--color-error);
}
.error-message {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin-top: var(--space-1);
}
```

---

## SKILL: git-commit-writer
**Triggers:** Write clear, conventional git commit messages and help with git workflows. Use when user asks to "write a commit message", "commit this", "what should my commit say", "conventional commits", "changelog", "git message", "commit format", or has staged changes they need to describe.


# Git Commit Writer

Write clear, conventional commit messages that make history readable and changelogs automatic.

## Conventional Commits Format

```
<type>(<scope>): <short summary>

[optional body]

[optional footer]
```

**Rules:**
- Summary line: **50 chars max**, imperative mood ("add" not "added")
- Body: wrap at 72 chars, explain WHY not WHAT
- Footer: reference issues, breaking changes

## Commit Types

| Type | When to use |
|------|-------------|
| `feat` | New feature for the user |
| `fix` | Bug fix for the user |
| `perf` | Performance improvement |
| `refactor` | Code change that's not a feat or fix |
| `style` | Formatting, missing semicolons — no logic change |
| `test` | Adding or fixing tests |
| `docs` | Documentation only |
| `chore` | Build process, dependencies, tooling |
| `ci` | CI/CD configuration changes |
| `revert` | Reverts a previous commit |

## Breaking Changes

```
feat(auth)!: replace JWT with session tokens

BREAKING CHANGE: All existing JWT tokens are invalidated.
Users will need to log in again.

Closes #247
```

## Examples by Scenario

**Adding a feature:**
```
feat(dashboard): add export to CSV button

Users can now export their transaction history as a CSV file.
Supports date range filtering and column selection.

Closes #183
```

**Fixing a bug:**
```
fix(auth): redirect to login after session expiry

Previously, expired sessions showed a blank screen.
Now redirects to /login with a "session expired" notice.

Fixes #301
```

**Refactoring:**
```
refactor(api): extract rate limiting to middleware

Moves rate limiting logic from individual route handlers
into a reusable middleware function. No behavior change.
```

**Dependency update:**
```
chore(deps): upgrade React to 19.0.0

Includes concurrent features and compiler improvements.
No breaking changes in our codebase.
```

**Performance fix:**
```
perf(images): convert hero images to webp format

Reduces hero image weight from 1.2MB to 340KB.
LCP score improves from 3.2s to 1.8s on 3G.
```

## Process When Asked to Write a Commit

1. Look at what changed (user describes or pastes diff)
2. Identify the primary type and scope
3. Write a summary: verb + object + context
4. Add body if the WHY isn't obvious from the summary
5. Add footer for breaking changes or issue references

## Scope Guidelines

Use the affected area of the codebase:
- `feat(auth):` — authentication system
- `fix(navbar):` — navigation component
- `perf(images):` — image handling
- `chore(deps):` — dependencies
- `feat:` — no scope needed for app-wide changes

## Multi-commit Workflow (Feature Branch)

Structure a feature branch's commits as a story:
```
feat(checkout): add address validation
feat(checkout): integrate Stripe payment intent
feat(checkout): add order confirmation email
fix(checkout): handle declined card gracefully
test(checkout): add integration tests for payment flow
```

This makes PR reviews easier and reverts surgical.

## Generate Changelog Entry

From conventional commits, generate changelog sections:
```markdown
## [1.4.0] - 2025-02-25

### Features
- **dashboard**: add export to CSV button (#183)
- **auth**: add social login with Google (#201)

### Bug Fixes
- **auth**: redirect to login after session expiry (#301)
- **navbar**: fix dropdown clipping on mobile (#289)

### Performance
- **images**: convert hero images to webp format
```

---

## SKILL: image-optimization
**Triggers:** Optimize images for the web including format selection, compression, responsive images, lazy loading, Next.js Image component, aspect ratios, and preventing layout shift. Use when user asks about "image optimization", "slow images", "image formats", "webp", "avif", "lazy loading", "next/image", "responsive images", "srcset", "image size", or images causing performance issues.


# Image Optimization

Images are typically 50–70% of page weight. Getting them right is the single biggest performance win.

## Format Selection

| Format | Use for | Savings vs JPG |
|--------|---------|----------------|
| **AVIF** | Photos, complex images | 40–60% smaller |
| **WebP** | Photos, illustrations | 25–35% smaller |
| **SVG** | Icons, logos, illustrations | Vector = tiny |
| **PNG** | Transparency, pixel art | Use WebP instead |
| **GIF** | Simple animations | Use WebM/MP4 instead |

**Strategy:** Use AVIF with WebP fallback:
```html
<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero image">
</picture>
```

## Next.js Image Component (recommended for Next.js)

```tsx
import Image from 'next/image'

// Static image (auto-optimized, auto-sized)
import heroImg from '@/public/hero.jpg'
<Image src={heroImg} alt="Hero" priority />

// Dynamic/remote image
<Image
  src="https://example.com/photo.jpg"
  alt="Product photo"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Full-width hero (fill mode)
<div className="relative h-96">
  <Image
    src="/hero.jpg"
    alt="Hero"
    fill
    className="object-cover"
    priority          // preload — use on LCP image only
    sizes="100vw"
  />
</div>
```

**Configure remote domains in `next.config.js`:**
```js
module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.example.com' },
    ],
  },
}
```

## Responsive Images (vanilla HTML)

```html
<!-- srcset + sizes — browser picks best image -->
<img
  src="photo-800.webp"
  srcset="
    photo-400.webp  400w,
    photo-800.webp  800w,
    photo-1600.webp 1600w
  "
  sizes="
    (max-width: 640px)  100vw,
    (max-width: 1024px) 50vw,
    800px
  "
  alt="Product photo"
  width="800"
  height="600"
  loading="lazy"
>
```

> `sizes` tells the browser how wide the image will be displayed so it can pick the right source. Always include it with `srcset`.

## Preventing Layout Shift (CLS)

Always set `width` and `height` on images — or use `aspect-ratio`:

```html
<!-- Option 1: Explicit dimensions -->
<img src="photo.webp" alt="..." width="800" height="600">

<!-- Option 2: CSS aspect-ratio -->
<img src="photo.webp" alt="..." style="width: 100%; aspect-ratio: 16/9; object-fit: cover;">

<!-- Option 3: Padding-top hack (older browsers) -->
<div style="position: relative; padding-top: 56.25%;">
  <img style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;">
</div>
```

## Lazy Loading

```html
<!-- Native lazy loading (supported everywhere modern) -->
<img src="below-fold.webp" alt="..." loading="lazy" width="800" height="600">

<!-- Never lazy-load above-the-fold images -->
<img src="hero.webp" alt="..." loading="eager" fetchpriority="high">
```

## Converting Images

```bash
# Install sharp (Node.js)
npm install sharp

# Convert and resize
const sharp = require('sharp')
await sharp('input.jpg')
  .resize(800, 600, { fit: 'cover' })
  .webp({ quality: 85 })
  .toFile('output.webp')

# CLI with cwebp (Google)
cwebp -q 85 input.jpg -o output.webp

# CLI with ImageMagick
magick input.jpg -quality 85 output.webp
magick input.png -quality 85 output.avif
```

## Quality Settings

| Format | Quality | Result |
|--------|---------|--------|
| JPEG | 80–85 | Good for most photos |
| WebP | 80–85 | Good quality, small file |
| AVIF | 60–70 | Smaller, same perceived quality |
| PNG → WebP | lossless | Identical quality, 26% smaller |

## Background Images (CSS)

```css
/* Responsive background with modern format */
.hero {
  background-image: url('hero.webp');
  background-size: cover;
  background-position: center;
}

/* Provide fallback */
@supports not (background-image: url('x.avif')) {
  .hero { background-image: url('hero.webp'); }
}
@supports (background-image: url('x.avif')) {
  .hero { background-image: url('hero.avif'); }
}
```

## Checklist

- [ ] Images converted to WebP or AVIF
- [ ] `width` and `height` attributes set on all images
- [ ] `loading="lazy"` on below-fold images
- [ ] `loading="eager"` + `fetchpriority="high"` on LCP/hero image
- [ ] `srcset` + `sizes` for responsive images
- [ ] Images served from CDN
- [ ] Largest image compressed to < 200KB
- [ ] Animated GIFs replaced with WebM/MP4
- [ ] SVG used for icons and logos

---

## SKILL: performance-audit
**Triggers:** Audit and fix web performance issues including slow load times, large bundles, render blocking, Core Web Vitals (LCP, CLS, INP), lazy loading, caching, and runtime performance. Use when user mentions "site is slow", "bad lighthouse score", "large bundle", "LCP", "CLS", "layout shift", "performance", "loading time", "slow render", "optimize", or wants to improve page speed.


# Performance Audit

Systematic approach to diagnosing and fixing web performance — from load time to runtime smoothness.

## Core Web Vitals (Google's ranking signals)

| Metric | What it measures | Good | Needs Work | Poor |
|--------|-----------------|------|------------|------|
| **LCP** (Largest Contentful Paint) | Load speed | < 2.5s | 2.5–4s | > 4s |
| **INP** (Interaction to Next Paint) | Responsiveness | < 200ms | 200–500ms | > 500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | < 0.1 | 0.1–0.25 | > 0.25 |

## Audit Layers

### 1. Network / Load Performance

**Images (biggest win, most neglected):**
- Use modern formats: `webp` or `avif` (30–50% smaller than jpg/png)
- Always set `width` and `height` attributes (prevents CLS)
- Lazy-load below-fold images: `loading="lazy"`
- Preload hero/LCP image: `<link rel="preload" as="image" href="hero.webp">`
- Use `srcset` for responsive images

**Fonts:**
- `font-display: swap` — prevents invisible text during load
- Preload critical fonts: `<link rel="preload" as="font" crossorigin>`
- Subset fonts to only needed characters
- Self-host Google Fonts instead of CDN (removes DNS lookup)

**Resource hints:**
```html
<link rel="preconnect" href="https://api.example.com">
<link rel="dns-prefetch" href="https://fonts.googleapis.com">
<link rel="preload" as="script" href="/critical.js">
```

### 2. JavaScript Bundle

**Diagnosis:**
```bash
npx bundle-buddy        # visualize bundle composition
npx source-map-explorer dist/main.js  # what's in the bundle
npx vite-bundle-visualizer  # for Vite projects
```

**Fixes:**
- Code-split routes: `const Page = lazy(() => import('./Page'))`
- Dynamic imports for heavy libs: `import('chart.js').then(...)`
- Tree-shake: ensure named imports, not `import * as`
- Remove duplicate dependencies: `npx depcheck`
- Replace heavy libs: moment.js → date-fns, lodash → native JS

**Target bundle sizes:**
- Initial JS: < 200KB gzipped
- Total page weight: < 1MB for most sites

### 3. React Runtime Performance

**Find slow components:**
```jsx
// React DevTools Profiler — record interaction, find slow components
// Or add timing manually:
const start = performance.now()
// ...render...
console.log('render time:', performance.now() - start)
```

**Common React perf issues:**

| Problem | Fix |
|---------|-----|
| Component re-renders on parent state change | `React.memo(Component)` |
| Expensive calculation runs every render | `useMemo(() => calc(), [deps])` |
| New function reference on every render | `useCallback(() => fn(), [deps])` |
| Large list rendering all items | `@tanstack/react-virtual` |
| Context re-renders all consumers | Split context or use `useMemo` for value |

### 4. CSS Performance

- Remove unused CSS: PurgeCSS, Tailwind's built-in purge
- Avoid `@import` in CSS (blocks rendering) — use `<link>` tags instead
- Use `will-change: transform` sparingly on animated elements
- Avoid layout-triggering properties in animations (use `transform` + `opacity` only)

### 5. Caching Strategy

```
# Ideal cache headers
# Static assets (hashed filenames) — cache forever
Cache-Control: public, max-age=31536000, immutable

# HTML — always revalidate
Cache-Control: no-cache

# API responses — short cache
Cache-Control: public, max-age=60, stale-while-revalidate=300
```

## Quick Wins Checklist

- [ ] Images converted to webp/avif with explicit dimensions
- [ ] Hero/LCP image preloaded
- [ ] Fonts using `font-display: swap`
- [ ] JS routes code-split
- [ ] `loading="lazy"` on below-fold images
- [ ] Unused JS/CSS removed
- [ ] HTTP/2 or HTTP/3 enabled on server
- [ ] Gzip/Brotli compression enabled
- [ ] Static assets on CDN

## Lighthouse in CI

```bash
# Run Lighthouse programmatically
npx lighthouse https://yoursite.com --output json --chrome-flags="--headless"

# Or use lighthouse-ci
npm install -g @lhci/cli
lhci autorun
```

---

## SKILL: prompt-improver
**Triggers:** Improves and rewrites user prompts to get better, more accurate results from AI agents. Use when user says "improve my prompt", "make this prompt better", "rewrite this prompt", "optimize my prompt", "this prompt isn't working", or wants help crafting effective instructions for AI tools.


# Prompt Improver

Transform vague or underperforming prompts into precise, high-yield instructions that get better results while using fewer tokens.

## When to Use This Skill

- User wants to refine a prompt that isn't producing good output
- User is building a system prompt for an agent or chatbot
- User wants to communicate more clearly with an AI tool
- User wants to reduce back-and-forth and get answers faster

## Process

### Step 1: Diagnose the original prompt

Identify what's missing or weak:
- **Vague intent** — What should the output actually be?
- **Missing context** — Role, tech stack, constraints, audience?
- **No format spec** — Should output be code, prose, a list, JSON?
- **Ambiguous scope** — Too broad or too narrow?
- **No examples** — Would a few-shot example clarify?

### Step 2: Rewrite using these principles

**Be explicit about the role:**
> "You are a senior React developer reviewing a pull request…"

**State the output format clearly:**
> "Return a JSON object with keys: `fix`, `explanation`, `severity`."

**Include relevant constraints:**
> "Use Tailwind CSS only. No third-party component libraries. TypeScript."

**Add a negative example when helpful:**
> "Do NOT rewrite the entire component. Only fix the bug."

**Specify length/depth:**
> "Give a 2-sentence explanation, then the corrected code."

### Step 3: Return the improved prompt

Show:
1. **Original prompt** (quoted, unchanged)
2. **Improved prompt** (ready to copy-paste)
3. **What changed** (2-4 bullet points explaining the improvements)

## Prompt Patterns by Use Case

**Debugging:**
```
You are debugging a [LANGUAGE] [FRAMEWORK] app. The bug is: [ERROR MESSAGE].
Context: [RELEVANT CODE].
Return: 1) Root cause 2) Exact fix 3) Why it happened.
```

**Code generation:**
```
Write a [COMPONENT/FUNCTION] in [LANGUAGE] that [DOES X].
Constraints: [TECH STACK, STYLE GUIDE, PERFORMANCE NEEDS].
Output: complete, working code only. No explanation unless I ask.
```

**Design/UI:**
```
Design a [COMPONENT] for a [TYPE OF APP] targeting [AUDIENCE].
Style: [AESTHETIC — e.g. minimal, brutalist, corporate].
Output: HTML/CSS/JS in a single file. Use CSS variables for theming.
```

**Refactoring:**
```
Refactor this [LANGUAGE] code to be more [readable/performant/idiomatic].
Do NOT change the public API or external behavior.
Explain each change in a comment above the changed line.
```

## Quality Checklist

Before returning the improved prompt, verify:
- [ ] Role is explicit if it matters
- [ ] Output format is unambiguous
- [ ] Constraints are stated (stack, style, limits)
- [ ] Scope is bounded (not "explain everything about X")
- [ ] Examples included if the task is complex or subjective
- [ ] Negative constraints added if common mistakes should be avoided

## Tips for Token Efficiency

- Remove pleasantries ("Please", "Could you", "Thanks")
- Use imperative form: "Return…", "Write…", "Fix…"
- Specify what NOT to include to prevent padding
- Use structured output (JSON, numbered list) to prevent verbose prose

---

## SKILL: responsive-design
**Triggers:** Build and fix responsive layouts for all screen sizes. Use when the user mentions "mobile layout", "responsive", "breakpoints", "looks broken on mobile", "not working on tablet", "media queries", "fluid layout", "mobile-first", "viewport", or wants a layout to work across devices.


# Responsive Design

Build layouts that work beautifully from 320px to 4K — mobile-first, fluid, and robust.

## Core Principle: Mobile First

Always write base styles for mobile, then add complexity at larger breakpoints:

```css
/* ❌ Desktop-first (harder to override) */
.card { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 768px) { .card { display: block; } }

/* ✅ Mobile-first (clean, additive) */
.card { display: block; }
@media (min-width: 768px) { .card { display: grid; grid-template-columns: 1fr 1fr; } }
```

## Standard Breakpoints

| Name | Width | Target |
|------|-------|--------|
| `xs` | 320px | Small phones |
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Wide screens |

**Tailwind shorthand:** `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

## Responsive Layout Patterns

### Stack → Side by side
```html
<div class="flex flex-col md:flex-row gap-4">
  <aside class="w-full md:w-64 shrink-0">Sidebar</aside>
  <main class="flex-1">Content</main>
</div>
```

### Responsive grid (auto-fill)
```css
/* Columns auto-fill — no media query needed */
.grid { 
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

### Responsive typography
```css
/* Fluid font size — scales between viewport sizes */
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
p  { font-size: clamp(1rem, 2vw, 1.125rem); }
```

### Responsive spacing
```css
.section {
  padding-block: clamp(2rem, 8vw, 6rem);
  padding-inline: clamp(1rem, 5vw, 4rem);
}
```

### Responsive images
```html
<!-- Always specify aspect ratio to prevent layout shift -->
<img src="hero.jpg" alt="..." class="w-full aspect-video object-cover">

<!-- Art direction: different crops per breakpoint -->
<picture>
  <source srcset="hero-wide.jpg" media="(min-width: 768px)">
  <img src="hero-square.jpg" alt="...">
</picture>
```

## Common Responsive Bugs & Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| Horizontal scroll on mobile | Element wider than viewport | Add `overflow-x: hidden` to `body`, check for fixed-width elements |
| Text too small on mobile | `px` units not scaling | Use `rem` or `clamp()` |
| Buttons too small to tap | Under 44px tap target | Add `min-height: 44px; min-width: 44px` |
| Images overflowing | No max-width | Add `max-width: 100%` or `img { width: 100%; }` |
| Navbar breaks on medium screens | Binary desktop/mobile thinking | Add a mid-size breakpoint |
| Content hidden under fixed header | Not accounting for header height | Use `scroll-margin-top` or `padding-top` on `<main>` |

## Testing Checklist

- [ ] 375px (iPhone SE) — no horizontal scroll, text readable
- [ ] 768px (iPad) — layout transitions make sense
- [ ] 1280px (Desktop) — max-width container centered
- [ ] Pinch zoom to 200% — content still accessible
- [ ] Landscape orientation on mobile — layout adapts
- [ ] Test with real device, not just browser DevTools

---

## SKILL: seo-optimizer
**Triggers:** Optimize web pages for search engines including meta tags, structured data, semantic HTML, sitemaps, robots.txt, Core Web Vitals, and Next.js SEO setup. Use when user asks about "SEO", "meta tags", "search ranking", "Google indexing", "structured data", "schema markup", "sitemap", "open graph", "twitter card", "canonical", "robots", or wants pages to rank better.


# SEO Optimizer

Technical SEO implementation for modern web apps — metadata, structured data, semantic HTML, and indexing signals.

## Page Metadata

### Next.js App Router (Metadata API)

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  return {
    title: post.title,
    description: post.excerpt, // 150–160 chars
    alternates: {
      canonical: `https://example.com/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://example.com/blog/${params.slug}`,
      images: [{ url: post.ogImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.ogImage],
    },
  }
}
```

### HTML Meta Tags (vanilla/other frameworks)
```html
<head>
  <title>Page Title — Brand Name</title>
  <meta name="description" content="150–160 character description with primary keyword.">
  <link rel="canonical" href="https://example.com/page">

  <!-- Open Graph -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:type" content="website">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Description">
  <meta name="twitter:image" content="https://example.com/og-image.jpg">

  <!-- Robots -->
  <meta name="robots" content="index, follow">
  <!-- or for private pages: -->
  <meta name="robots" content="noindex, nofollow">
</head>
```

## Structured Data (JSON-LD)

Structured data helps Google understand your content and enables rich results.

### Article
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": { "@type": "Person", "name": "Author Name" },
  "datePublished": "2025-02-25",
  "dateModified": "2025-02-25",
  "image": "https://example.com/article-image.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": { "@type": "ImageObject", "url": "https://example.com/logo.png" }
  }
}
</script>
```

### FAQ (enables accordion in search results)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is your return policy?",
      "acceptedAnswer": { "@type": "Answer", "text": "30-day returns..." }
    }
  ]
}
</script>
```

### Breadcrumb
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Article Title" }
  ]
}
</script>
```

## Semantic HTML Structure

```html
<body>
  <header>
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main>
    <article>
      <h1>Primary Page Title (one per page)</h1>
      <section>
        <h2>Section Title</h2>
        <h3>Subsection</h3>
      </section>
    </article>
    <aside aria-label="Related posts">...</aside>
  </main>
  <footer>...</footer>
</body>
```

**H-tag rules:**
- One `<h1>` per page, matches `<title>`
- Don't skip levels (h1 → h3)
- Use headings for structure, not styling

## Sitemap (Next.js)

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  return [
    { url: 'https://example.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://example.com/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    ...posts.map(post => ({
      url: `https://example.com/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
```

## robots.txt

```
# app/robots.ts (Next.js)
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/private/'] },
    sitemap: 'https://example.com/sitemap.xml',
  }
}
```

## SEO Checklist

- [ ] Unique `<title>` per page (50–60 chars)
- [ ] Unique meta description (150–160 chars)
- [ ] Canonical URL on every page
- [ ] `<h1>` matches page topic, one per page
- [ ] Images have descriptive alt text
- [ ] Internal links use descriptive anchor text
- [ ] Sitemap submitted to Google Search Console
- [ ] Page loads in under 2.5s (LCP)
- [ ] No layout shift (CLS < 0.1)
- [ ] Mobile-friendly (test with Google's tool)
- [ ] HTTPS
- [ ] Structured data validated (Google Rich Results Test)

---

## SKILL: state-management
**Triggers:** Choose and implement the right state management solution for React apps including useState, useReducer, Context, Zustand, Jotai, and server state with TanStack Query. Use when user asks about "state management", "global state", "zustand", "redux", "context api", "state not updating", "prop drilling", "share state between components", "app state", or needs help managing data flow.


# State Management

Choose the right tool for each kind of state — most apps need far less than they think.

## State Categories (choose tool by category)

| State Type | Examples | Best Tool |
|-----------|----------|-----------|
| **Local UI state** | open/closed, input value, selected tab | `useState` |
| **Complex local state** | multi-step form, undo/redo | `useReducer` |
| **Shared UI state** | theme, sidebar open | Zustand or Context |
| **Server/async state** | API data, cache | TanStack Query |
| **Form state** | validation, dirty state | React Hook Form |
| **URL state** | filters, pagination, search | URL params |

> **Start local. Only lift state when two components genuinely need it.**

## Decision Guide

```
Does only one component need this state?
  └── YES → useState / useReducer

Is it async data from an API?
  └── YES → TanStack Query (not useState!)

Is it shared between many components?
  ├── Is it simple? → Context API
  └── Is it complex / updated frequently? → Zustand

Is it a large app with complex state?
  └── Zustand (Redux if you need DevTools + middleware)
```

## useState (most things)

```tsx
// Simple state
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)

// Updater function — when new state depends on old state
setCount(prev => prev + 1)

// Object state — always spread to avoid mutation
setUser(prev => ({ ...prev!, name: 'Alice' }))
```

## useReducer (complex local state)

```tsx
type State = { count: number; step: number }
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'setStep'; step: number }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { ...state, count: state.count + state.step }
    case 'decrement': return { ...state, count: state.count - state.step }
    case 'setStep':   return { ...state, step: action.step }
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 })
dispatch({ type: 'increment' })
```

## Zustand (shared client state — recommended)

```bash
npm install zustand
```

```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppStore {
  // State
  sidebarOpen: boolean
  user: User | null
  // Actions
  toggleSidebar: () => void
  setUser: (user: User | null) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      user: null,
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      setUser: (user) => set({ user }),
    }),
    { name: 'app-storage', partialize: (state) => ({ user: state.user }) }
  )
)

// Usage — only subscribes to the slice it needs (no unnecessary re-renders)
const sidebarOpen = useAppStore(state => state.sidebarOpen)
const toggleSidebar = useAppStore(state => state.toggleSidebar)
```

## Context API (simple shared state)

```tsx
// Best for: theme, locale, auth — low-frequency updates
const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void } | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
```

> **Context re-renders all consumers on every update.** For frequently-changing state, use Zustand instead.

## TanStack Query (server/async state)

```tsx
// Replaces: useState + useEffect + loading + error + refetch
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5 * 60 * 1000, // 5 min cache
  })
}

// In component:
const { data: user, isLoading, error } = useUser(userId)
if (isLoading) return <Skeleton />
if (error) return <ErrorMessage error={error} />
return <UserCard user={user} />
```

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Storing API data in useState | Use TanStack Query |
| Everything in global state | Default to local state |
| Context for high-frequency updates | Use Zustand |
| Mutating state directly | Always spread: `{ ...prev, key: value }` |
| `useEffect` for derived state | Compute inline instead |
| Prop drilling 3+ levels | Lift to Zustand or Context |

---

## SKILL: token-saver
**Triggers:** Reduce AI token usage and credit consumption while maintaining output quality. Use when user asks about "saving credits", "reducing tokens", "cheaper prompts", "token optimization", "too expensive", "API costs", "using too many credits", or wants to make their AI usage more efficient and cost-effective.


# Token Saver

Practical strategies to cut token usage by 30–70% without sacrificing output quality.

## Core Principles

**Token cost = input tokens + output tokens**
- Input: your prompt + context + history
- Output: the response
- Both cost money. Both can be optimized.


## Reducing Input Tokens

### 1. Trim your prompts
Remove anything that doesn't change the output:
- ❌ "Could you please help me…" → ✅ "Fix this:"
- ❌ "I was wondering if…" → ✅ (just ask)
- ❌ Restating what Claude already said
- ❌ Repeating context already in the conversation

### 2. Send only relevant code
Don't paste entire files if only one function is the issue.

```
// ❌ Don't do this: paste 300 lines
// ✅ Do this: paste the 20 relevant lines + "rest of file is unchanged"
```

### 3. Use references instead of repetition
Instead of re-explaining your stack every message:
```
// Put this in your system prompt ONCE:
"Stack: Next.js 14, TypeScript, Tailwind, Prisma, Postgres"
// Then in follow-up messages, just reference it:
"Using our stack, add auth to this route:"
```

### 4. Compress your context
When continuing a long task, summarize instead of scrolling back:
```
// ❌ Pasting 10 previous messages
// ✅ "We've built: auth, dashboard, settings page. Next: notifications."
```

### 5. Use structured input
Models parse structured input faster and more accurately:
```
// ❌ Long prose description
// ✅
Task: Fix login bug
Error: "Cannot read properties of undefined (reading 'user')"
File: src/auth/session.ts:47
Constraint: Don't change the API contract
```


## Reducing Output Tokens

### 6. Specify output format
Prose is expensive. Structured output is cheap.
```
// ❌ "Explain how to fix this bug"  → 400 token essay
// ✅ "Return: 1) root cause (1 line) 2) fix (code only) 3) prevention (1 line)"
```

### 7. Ask for code only
```
"Return working code only. No explanations."
"Return the diff only. No commentary."
```

### 8. Limit depth
```
"Brief explanation only — 2 sentences max."
"Top 3 options only, no exhaustive list."
```

### 9. Use JSON for structured data
```
"Return JSON: { fix: string, severity: 'low'|'medium'|'high', breaking: boolean }"
```


## Workflow Optimization

### 10. Batch related questions
```
// ❌ 5 separate messages (5x context overhead)
// ✅ One message:
"For the auth module:
1. What's the session bug on line 47?
2. How should I handle token refresh?
3. Is this approach secure?"
```

### 11. Use system prompts for repeated context
Put stable context (stack, conventions, constraints) in a system prompt so it's cached and not re-sent.

### 12. Stop asking for what you don't need
Common bloat patterns:
- "Explain your reasoning" — only ask if you need the reasoning
- "List all alternatives" — ask for best 2 if that's all you'll use
- "Walk me through it step by step" — only for learning, costs 3x

### 13. Checkpoint & compress long sessions
After every 10-15 messages, start a fresh session with a compressed summary:
```
"Context: We're building X. Decisions made: [list]. Current task: [specific thing]."
```


## Quick Reference: Token Multipliers

| Pattern | Token Cost | Fix |
|---------|-----------|-----|
| "Explain everything about X" | 5–10x | Scope it: "Explain X in context of Y" |
| Pasting entire file | 3–5x | Paste only relevant section |
| No output format | 2–3x | Specify format |
| Re-explaining stack | 2x per msg | System prompt once |
| Conversational pleasantries | +50–100 | Remove |
| "List all possible…" | 5x | "Best 3 only" |


## For API Users

- Enable **prompt caching** (Anthropic) for system prompts used repeatedly
- Use **Haiku** for classification, routing, and simple tasks
- Use **Sonnet** for most dev work
- Use **Opus** only for architecture decisions and complex reasoning
- Batch non-urgent requests with the **Batch API** (50% discount)

---

## SKILL: typography
**Triggers:** Set up and improve web typography including font pairing, fluid type scales, line height, font loading, variable fonts, and readable body text. Use when user asks about "fonts", "typography", "type scale", "font pairing", "readability", "font loading", "variable fonts", "line height", "google fonts", "font size", or wants text to look better.


# Typography

Type is 95% of design. Get this right and everything else gets easier.

## Font Loading Strategy

### Self-hosted (best performance)
```css
/* Use font-display: swap to prevent invisible text */
@font-face {
  font-family: 'Inter Variable';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/InterVariable.woff2') format('woff2');
}
```

### Google Fonts (convenience)
```html
<!-- Preconnect first — reduces latency -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Next.js (best of both — self-hosts automatically)
```tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

// Apply in layout:
<html className={`${inter.variable} ${playfair.variable}`}>
```

## Fluid Type Scale

Scales smoothly between viewport sizes — no jarring jumps at breakpoints:

```css
:root {
  /* clamp(min, preferred, max) */
  --text-xs:   clamp(0.69rem,  0.66rem + 0.18vw, 0.8rem);
  --text-sm:   clamp(0.83rem,  0.78rem + 0.24vw, 1rem);
  --text-base: clamp(1rem,     0.95rem + 0.24vw, 1.125rem);
  --text-lg:   clamp(1.2rem,   1.14rem + 0.29vw, 1.375rem);
  --text-xl:   clamp(1.44rem,  1.36rem + 0.4vw,  1.75rem);
  --text-2xl:  clamp(1.73rem,  1.63rem + 0.49vw, 2.125rem);
  --text-3xl:  clamp(2.07rem,  1.94rem + 0.67vw, 2.625rem);
  --text-4xl:  clamp(2.49rem,  2.31rem + 0.9vw,  3.25rem);
  --text-5xl:  clamp(3rem,     2.76rem + 1.18vw, 4rem);
}
```

> Generate custom scales at: **utopia.fyi/type**

## Readable Body Text

```css
body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: 1.7;             /* 1.5–1.8 for body text */
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Optimal reading width */
p, li, blockquote {
  max-width: 65ch;  /* ~65 characters per line is optimal */
}

/* Headings — tighter line height */
h1, h2, h3 { line-height: 1.2; letter-spacing: -0.02em; }
h4, h5, h6 { line-height: 1.4; }
```

## Font Pairing Combinations

| Display | Body | Vibe |
|---------|------|------|
| Playfair Display | Source Sans 3 | Editorial, magazine |
| Fraunces | Epilogue | Literary, warm |
| Cabinet Grotesk | Satoshi | Modern, startup |
| Instrument Serif | DM Sans | Refined, SaaS |
| Space Grotesk | IBM Plex Sans | Technical, developer |
| Bebas Neue | Inter | Bold, marketing |
| Cormorant Garamond | Jost | Luxury, fashion |

### Applying a pair:
```css
:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body:    'Source Sans 3', system-ui, sans-serif;
}

h1, h2, h3 { font-family: var(--font-display); }
body        { font-family: var(--font-body); }
```

## Variable Fonts (advanced)

Variable fonts let you animate and fine-tune any axis:

```css
/* Inter Variable — weight, slant, optical size */
h1 {
  font-variation-settings: 'wght' 750, 'slnt' -3;
}

/* Animate weight on hover */
.link {
  font-variation-settings: 'wght' 400;
  transition: font-variation-settings 200ms ease;
}
.link:hover {
  font-variation-settings: 'wght' 600;
}
```

## Typography Checklist

- [ ] Body text: 16px+ base size, 1.5–1.8 line height
- [ ] Max line length: 50–75 characters (`max-width: 65ch`)
- [ ] Heading hierarchy: clear contrast between h1–h4 sizes
- [ ] Letter spacing: slightly negative for large headings (`-0.02em`)
- [ ] `font-display: swap` on all `@font-face` declarations
- [ ] Fonts preloaded or using `next/font`
- [ ] `-webkit-font-smoothing: antialiased` on body
- [ ] Sufficient contrast: 4.5:1 for body, 3:1 for large text
- [ ] Fallback fonts listed in font stack

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Too many font weights loaded | Load only the weights you use |
| No fallback font stack | `'Inter', system-ui, -apple-system, sans-serif` |
| Line height too tight | 1.5 minimum for body text |
| Lines too long | `max-width: 65ch` on paragraphs |
| Invisible text during load | `font-display: swap` |
| `px` font sizes | Use `rem` — respects user preferences |

---

## SKILL: ui-debug
**Triggers:** Systematically debug frontend UI issues including layout bugs, CSS problems, React rendering issues, hydration errors, z-index/overflow issues, and visual regressions. Use when the user says "UI is broken", "layout is wrong", "CSS isn't working", "component won't render", "hydration error", "flickering", "overlap", "z-index problem", "responsive layout bug", or similar visual/CSS/DOM issues.


# UI Debug

Systematic approach to diagnosing and fixing frontend visual bugs without thrashing.

## When to Use This Skill

- Layout looks wrong and you can't figure out why
- CSS property isn't having the expected effect
- React component renders incorrectly or not at all
- Hydration mismatch errors (Next.js / SSR)
- Z-index or stacking context issues
- Overflow/scroll problems
- Responsive design breakpoints behaving unexpectedly

## Diagnosis Framework

### Step 1: Isolate the problem

Ask:
1. **Where does it break?** Specific breakpoint? Browser? Only on mount?
2. **When did it start?** After a specific change? Always been wrong?
3. **Is it reproducible?** Always, sometimes, or only in prod?

### Step 2: Identify the category

**Layout / Box Model:**
- Check `display`, `position`, `box-sizing`
- Inspect computed styles in DevTools (not just declared)
- Look for collapsing margins, flex/grid misconfigurations
- Verify parent has explicit height if child uses `height: 100%`

**Stacking / Z-Index:**
- Remember: z-index only works on positioned elements (`relative`, `absolute`, `fixed`, `sticky`)
- A new stacking context is created by: `transform`, `opacity < 1`, `filter`, `will-change`, `isolation: isolate`
- Use DevTools "3D view" or `outline: 1px solid red` to visualize stacking

**Overflow / Scroll:**
- Check all ancestors for `overflow: hidden` — this is the #1 scroll bug cause
- `overflow: hidden` on a parent clips `position: fixed` children
- Use `overflow: clip` as a safer alternative in modern CSS

**Flexbox / Grid:**
- Check if `flex-shrink` is collapsing items unexpectedly
- `min-width: 0` on flex children prevents text overflow bugs
- Grid auto-placement can be surprising — check `grid-auto-flow`

**React Rendering:**
- Console errors first — they're almost always pointing at the real issue
- Check for missing `key` props in lists
- Check for conditional rendering that flips between server/client (hydration)
- Use React DevTools Profiler to find unnecessary re-renders

**Hydration Errors (Next.js/SSR):**
- The HTML from server doesn't match what React renders on client
- Common causes: `Date.now()`, `Math.random()`, `window` usage in render, browser extensions
- Fix: wrap dynamic content in `useEffect` + state, or use `suppressHydrationWarning` sparingly

## Debug Utilities

Add these temporarily to diagnose:

```css
/* Visualize all boxes */
* { outline: 1px solid rgba(255,0,0,0.3); }

/* Find overflow culprit */
* { overflow: visible !important; }

/* Check stacking contexts */
* { isolation: isolate; }
```

```js
// Log every render (React)
useEffect(() => { console.log('rendered', componentName); });

// Find what's causing re-renders
const prev = useRef();
useEffect(() => {
  if (prev.current !== someValue) {
    console.log('changed:', prev.current, '→', someValue);
    prev.current = someValue;
  }
});
```

## Common Bugs & Fixes

| Bug | Likely Cause | Fix |
|-----|-------------|-----|
| Text overflows flex container | `min-width` default is `auto` | Add `min-width: 0` to flex child |
| Fixed element moves on scroll | Ancestor has `transform` | Remove `transform` from ancestor or use a portal |
| `height: 100%` does nothing | Parent has no explicit height | Set height on parent chain or use `height: 100vh` |
| Z-index ignored | Element isn't positioned | Add `position: relative` |
| Hover flickers | Hover target and tooltip overlap | Add `pointer-events: none` to tooltip, or use CSS-only hover with gap |
| Image wrong size | Missing `width`/`height` attrs | Add explicit dims or `aspect-ratio` |
| Scroll inside modal doesn't work | `overflow: hidden` on body | Use `overscroll-behavior: contain` instead |

## Output Format

When diagnosing, return:
1. **Root cause** — one sentence
2. **Why it happens** — brief explanation
3. **Fix** — exact code change
4. **How to verify** — what to check after the fix

---

## SKILL: ux-patterns
**Triggers:** Apply UX design principles to web interfaces — user flows, navigation patterns, information architecture, feedback & loading states, empty states, onboarding, error UX, and usability heuristics. Use when user asks about "UX", "user experience", "user flow", "navigation design", "information architecture", "onboarding", "empty state", "loading state", "feedback", "usability", "interaction design", "how should this work", "is this good UX", "confusing UI", or wants to improve how their interface feels and flows.


# UX Patterns

Make interfaces that feel intuitive — users should never need to think about how to use your app.

## Nielsen's 10 Usability Heuristics (the foundation)

Use these as a lens when reviewing any interface:

| # | Heuristic | In practice |
|---|-----------|-------------|
| 1 | **Visibility of system status** | Always show what's happening (loading, saving, progress) |
| 2 | **Match real world** | Use familiar language, not internal jargon |
| 3 | **User control & freedom** | Provide undo, back, cancel — let users recover from mistakes |
| 4 | **Consistency & standards** | Same action = same result, every time |
| 5 | **Error prevention** | Disable impossible actions, confirm destructive ones |
| 6 | **Recognition over recall** | Show options, don't make users remember |
| 7 | **Flexibility & efficiency** | Shortcuts for power users, simple path for beginners |
| 8 | **Aesthetic & minimal design** | Every element must earn its place |
| 9 | **Help users recognize errors** | Clear, specific error messages with a path forward |
| 10 | **Help & documentation** | Context-sensitive help at the point of need |


## Navigation Design

### Principles
- **3-click rule is a myth** — depth is fine, *confusion* is not
- Users need to always know: *Where am I? Where can I go? How do I get back?*
- The active state must be unmistakable
- Mobile nav: bottom tabs beat hamburgers for primary destinations (thumb zone)

### Navigation Patterns

**Primary navigation (top-level):**
```
Desktop: horizontal topbar (5–7 items max) OR left sidebar (for apps)
Mobile:  bottom tab bar (3–5 items) OR hamburger menu (secondary nav only)
```

**Breadcrumbs** — use for deep hierarchies (3+ levels):
```
Home > Blog > Category > Article Title
```
Always clickable except the current page.

**Tabs** — use for switching views of the same data:
- Don't use tabs for navigation between pages (use links)
- Show all tab labels at once — don't hide in a dropdown
- Active tab: visually distinct, not just a different color

**Sidebar** — use for complex apps with many sections:
- Collapsible on mobile
- Group related items with section headers
- Highlight current route clearly


## Loading States

**Every async action needs a loading state.** Never leave users staring at a blank screen.

### Pattern by duration:

| Duration | Pattern |
|----------|---------|
| < 300ms | Nothing (too fast to notice) |
| 300ms–1s | Spinner or inline loading indicator |
| 1s–3s | Skeleton screen (matches content shape) |
| 3s+ | Progress bar with estimated time |
| Unknown | Skeleton + cancel option after 10s |

### Skeleton screens (best practice)
```html
<!-- Match the shape of the real content -->
<div class="skeleton-card">
  <div class="skeleton-avatar"></div>
  <div>
    <div class="skeleton-line" style="width: 60%"></div>
    <div class="skeleton-line" style="width: 40%"></div>
  </div>
</div>
```
```css
.skeleton-line, .skeleton-avatar {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Optimistic UI (instant feedback)
Update the UI immediately, then confirm with the server:
```tsx
// Show the new comment instantly, revert on failure
const addComment = (text: string) => {
  const tempId = `temp-${Date.now()}`
  setComments(prev => [...prev, { id: tempId, text, pending: true }])
  api.post('/comments', { text })
    .then(real => setComments(prev => prev.map(c => c.id === tempId ? real : c)))
    .catch(() => {
      setComments(prev => prev.filter(c => c.id !== tempId))
      toast.error('Failed to post comment')
    })
}
```


## Empty States

Empty states are an opportunity, not a dead end. Every empty state needs:
1. **An explanation** — why is it empty?
2. **A clear next action** — what should the user do?
3. **Optional: visual** — an illustration or icon (not mandatory)

### Empty state types:

**First-time (user has never added content):**
```
🗂️ No projects yet
Create your first project to get started.
[+ New Project]
```

**Filtered/searched (results exist but filter hides them):**
```
🔍 No results for "quarterly report"
Try a different search term or clear your filters.
[Clear filters]
```

**Error state (something went wrong):**
```
⚠️ Couldn't load your projects
Check your connection and try again.
[Try again]
```

**Completed (user has done everything):**
```
✅ All caught up!
You've reviewed all items in your inbox.
[Go to archive]
```


## Feedback & Confirmation

### Action feedback hierarchy:

| Action | Feedback Type |
|--------|--------------|
| Save / update | Inline success indicator or subtle toast |
| Send / submit | Clear success state + next step |
| Delete | Confirmation dialog + undo option |
| Irreversible action | Confirmation with typed confirmation |
| Form error | Inline field errors + summary at top |
| Network error | Toast with retry action |

### Toast notifications:
- **Success**: auto-dismiss after 3–4s
- **Error**: stays until dismissed (user must acknowledge)
- **Info**: auto-dismiss after 5s
- **Warning**: stays until dismissed
- Max 3 toasts visible at once, stack from bottom-right (desktop)

### Confirmation dialogs:
```
Only use modals for:
✅ Destructive actions (delete, archive)
✅ High-stakes confirmations
✅ Actions that can't be undone

Never use modals for:
❌ Simple form submission
❌ Navigation (use a page or slide-over instead)
❌ Errors that could be inline
```


## Onboarding Patterns

**The goal:** get users to their "aha moment" as fast as possible.

### Progressive disclosure:
Don't show everything at once. Reveal complexity as users need it:
```
New user sees: core feature only
After first success: introduce next feature
After 3 uses: show advanced options
Power user: full feature set
```

### Onboarding flows:

**Welcome checklist** (SaaS apps):
```
Get started: □ Add your first project
             □ Invite a teammate
             □ Connect your tools
             
Shows progress, gives a sense of completion.
Dismiss permanently once all done.
```

**Empty state as onboarding:**
The first empty state IS the onboarding — don't add a separate flow.

**Tooltips / hotspots:**
Use sparingly. Only highlight 2–3 things. Auto-dismiss on interaction.

**Skip always available:**
Never force onboarding. Always offer "Skip" or "I'll explore myself."


## Form UX

- **One column** — multi-column forms have higher error rates
- **Label above input** — never placeholder-only
- **Tab order** must be logical (top to bottom, left to right)
- **Auto-focus** the first field on page load
- **Inline validation**: validate on blur, not on keypress
- **Group related fields** with visual separation
- **Show password** toggle on password fields
- **Primary CTA** should be the most visually prominent element on the form
- **Autofill-friendly**: use correct `autocomplete` attributes

```html
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="new-password" autocomplete="new-password">
```


## Information Architecture

### Card sorting heuristic:
Group items by user mental model, not by your internal logic.
Ask: "What would a user look for this under?"

### Progressive disclosure:
```
Overview → Summary → Details
List → Item → Edit
Dashboard → Report → Row → Cell
```

### Search vs. Browse:
- **Browse** when users don't know exactly what they want
- **Search** when users know exactly what they want
- Most apps need both

### Labelling:
- Use verbs for actions: "Create project", not "New project creation"
- Use nouns for things: "Projects", "Settings", "Team"
- Avoid jargon: "Workspace" is better than "Tenant" for most users


## Destructive Action UX

```
Low risk (undo available)    → Single click, show undo toast
Medium risk (no undo)        → Confirmation dialog with consequences
High risk (irreversible)     → Type to confirm + clear warning
Extreme risk (data loss)     → Multi-step confirmation + email notice
```

```html
<!-- Type to confirm pattern -->
<p>Type "DELETE" to confirm you want to permanently remove all data.</p>
<input placeholder="Type DELETE" oninput="submitBtn.disabled = this.value !== 'DELETE'">
<button id="submitBtn" disabled class="btn-destructive">Delete everything</button>
```


## UX Review Checklist

Before shipping any feature, verify:

**Flows:**
- [ ] Clear entry point — where does the user start?
- [ ] Happy path takes < 3 decisions to complete
- [ ] Error paths are handled with clear recovery
- [ ] Back button / undo always works

**Feedback:**
- [ ] Every action has a visible response within 100ms
- [ ] Loading states for anything > 300ms
- [ ] Success states confirm completion
- [ ] Errors include a fix, not just a description

**Content:**
- [ ] All labels use plain language
- [ ] Empty states have a clear CTA
- [ ] Tooltips only where genuinely needed
- [ ] Destructive actions require confirmation

**Accessibility:**
- [ ] Keyboard navigable
- [ ] Focus visible on all interactive elements
- [ ] Screen reader announces state changes (`aria-live`)

---

## SKILL: web-security
**Triggers:** Secure web applications against common vulnerabilities including XSS, CSRF, SQL injection, insecure headers, auth issues, and data exposure. Use when user asks about "security", "XSS", "CSRF", "injection", "security headers", "authentication security", "secure cookies", "data exposure", "input sanitization", "CORS", or wants to harden their web app.


# Web Security

Practical security hardening for web developers — focused on what actually gets exploited.

## The OWASP Top 10 (most common web vulnerabilities)

1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, XSS, etc.)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable/Outdated Components
7. Auth & Identity Failures
8. Software Integrity Failures
9. Logging & Monitoring Failures
10. SSRF


## XSS (Cross-Site Scripting)

**Never trust user input. Always escape output.**

```tsx
// ❌ Dangerous — executes attacker-controlled HTML
<div dangerouslySetInnerHTML={{ __html: userContent }} />
element.innerHTML = userInput

// ✅ Safe — React escapes by default
<div>{userContent}</div>
element.textContent = userInput

// ✅ If you MUST render HTML — sanitize first
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userContent) }} />
```

**Content Security Policy (strongest XSS defense):**
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-{RANDOM}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:
```


## CSRF (Cross-Site Request Forgery)

```typescript
// Protect state-changing endpoints with CSRF tokens
// Next.js Edge Middleware approach:

import { randomBytes } from 'crypto'

// Set CSRF token cookie
const csrfToken = randomBytes(32).toString('hex')
response.cookies.set('csrf-token', csrfToken, {
  httpOnly: false, // readable by JS for inclusion in headers
  sameSite: 'strict',
  secure: true,
})

// Validate on POST/PUT/DELETE
const headerToken = request.headers.get('x-csrf-token')
const cookieToken = request.cookies.get('csrf-token')?.value
if (headerToken !== cookieToken) return new Response('Forbidden', { status: 403 })

// Alternative: SameSite=Strict cookies prevent CSRF for most cases
// (modern browsers + no subdomain attacks)
```


## SQL Injection

**Always use parameterized queries. Never string-concatenate SQL.**

```typescript
// ❌ SQL Injection
const result = await db.query(`SELECT * FROM users WHERE email = '${userEmail}'`)

// ✅ Parameterized query
const result = await db.query('SELECT * FROM users WHERE email = $1', [userEmail])

// ✅ ORM (Prisma, Drizzle) — parameterized by default
const user = await prisma.user.findFirst({ where: { email: userEmail } })
```


## Security Headers

Add these to every response:

```typescript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },         // prevent clickjacking
  { key: 'X-Content-Type-Options', value: 'nosniff' },     // prevent MIME sniffing
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
```


## Authentication Security

```typescript
// Passwords — always hash with bcrypt or argon2
import bcrypt from 'bcrypt'
const hash = await bcrypt.hash(password, 12) // cost factor 10-12
const valid = await bcrypt.compare(password, hash)

// Sessions — use httpOnly, secure, sameSite cookies
response.setHeader('Set-Cookie', [
  `session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
])
// ❌ Never store auth tokens in localStorage (XSS vulnerable)

// JWT — verify signature, check expiry
import jwt from 'jsonwebtoken'
const payload = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ['HS256'] })

// Rate limit login attempts
// Use: express-rate-limit, upstash/ratelimit, or middleware
```


## Input Validation

```typescript
// Validate on the server — never trust client
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email().max(254),
  username: z.string().min(2).max(50).regex(/^[a-zA-Z0-9_-]+$/),
  age: z.number().int().min(0).max(150),
})

// In your API route:
const result = CreateUserSchema.safeParse(req.body)
if (!result.success) {
  return res.status(422).json({ errors: result.error.issues })
}
const { email, username, age } = result.data // safe to use
```


## CORS Configuration

```typescript
// Only allow origins you control
const ALLOWED_ORIGINS = ['https://yourapp.com', 'https://www.yourapp.com']

function setCORSHeaders(req: Request, res: Response) {
  const origin = req.headers.get('origin') ?? ''
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}
// ❌ Never: Access-Control-Allow-Origin: *  with credentials
```


## Environment Variables

```bash
# .env — server-side secrets
DATABASE_URL=postgres://...
JWT_SECRET=...
STRIPE_SECRET_KEY=sk_live_...

# .env.local — public client vars (prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_STRIPE_KEY=pk_live_...  # publishable only

# Never commit .env files
# Add to .gitignore: .env, .env.local, .env.*.local
```


## Security Checklist

- [ ] All user input validated and sanitized
- [ ] `dangerouslySetInnerHTML` requires DOMPurify
- [ ] Auth tokens in httpOnly cookies, not localStorage
- [ ] Passwords hashed with bcrypt/argon2 (cost ≥ 10)
- [ ] All API endpoints check authentication + authorization
- [ ] SQL via parameterized queries or ORM only
- [ ] Security headers set on all responses
- [ ] HTTPS enforced (HSTS header)
- [ ] Rate limiting on auth endpoints
- [ ] Secrets in env vars, never hardcoded
- [ ] Dependencies audited: `npm audit`
- [ ] Error messages don't leak internal details
