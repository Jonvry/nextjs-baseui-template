# Next.js Starter (Feature-Based Architecture)

A **modern, opinionated Next.js starter template** built for scalability and clarity.

- ⚡ Next.js 16 (App Router)
- ⚛️ React 19
- 🎨 Tailwind CSS v4 (no config, CSS variables)
- 🧩 shadcn/ui (Base UI primitives, not Radix)
- 🧠 Feature-based architecture with private folders
- 🧪 Vitest + React Testing Library
- 🧹 ESLint + Prettier + Husky

---

## Philosophy

This starter is designed around a **feature-first architecture**:

- Routes **own their logic**
- Shared code is **intentional, not accidental**
- UI primitives are **standardized**
- Styling is **token-driven**

> Duplication is cheaper than the wrong abstraction.

---

## Tech Stack

- **Framework:** Next.js 16
- **UI:** React 19
- **Styling:** Tailwind CSS v4 + CSS variables
- **Components:** shadcn/ui (Base UI)
- **State (optional):** Zustand
- **Data Fetching (optional):** TanStack Query
- **Testing:** Vitest + React Testing Library
- **Linting/Formatting:** ESLint + Prettier

---

## Getting Started

### 1. Clone the template

```bash
git clone https://github.com/Jonvry/nextjs-baseui-template.git
cd nextjs-baseui-template
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run development server

```bash
pnpm dev
```

App runs at: http://localhost:3000

---

## Available Scripts

```bash
pnpm dev          # start dev server (turbopack)
pnpm build        # production build
pnpm start        # run production server
pnpm lint         # eslint
pnpm typecheck    # typescript check
pnpm format       # prettier
pnpm test         # run tests
pnpm test:watch   # watch mode
```

---

## Project structure

```
app/                 Routes, layout, metadata (sitemap.ts, robots.ts, global-error.tsx, not-found.tsx)
components/ui/       shadcn-installed primitives
components/          App-level composed components
context/             Client providers (theme, optional stubs)
hooks/               Reusable client hooks (use-*)
lib/                 Framework-agnostic utilities (cn)
public/              Static assets served at /
proxy.ts             Next 16 middleware entry point
```

---

## Feature-Based Architecture (Private Folders)

Each route can contain **private folders** (prefixed with `_`):

```
app/(example)/
  _components/
  _hooks/
  _stores/
  _utils/
  _constant/
  _lib/
  page.tsx
```

### Rules

- Private folders are **NOT routes**
- They are **scoped to the feature**
- Do NOT import across routes
- Extract to shared folders if reused

---

## Where Should Code Go?

| Use Case             | Location            |
| -------------------- | ------------------- |
| Shared UI            | `components/`       |
| Route-specific UI    | `_components/`      |
| Reusable hooks       | `hooks/`            |
| Route-specific hooks | `_hooks/`           |
| Utilities            | `lib/` or `_utils/` |
| Business logic       | `_lib/`             |
| Global providers     | `context/`          |

---

## Styling (Tailwind v4)

- No `tailwind.config.*`
- Uses CSS variables inside `app/globals.css`

```css
:root {
   --color-primary: oklch(...);
}
```

### Dark Mode

- Controlled via `.dark` class
- Managed by `next-themes`

---

## UI Components

- Built with **shadcn/ui on Base UI**
- Config defined in `components.json`

### Add components on demand

```bash
pnpm dlx shadcn@latest add button
```

Do NOT install all components at once  
Do NOT introduce Radix UI

---

## Testing

- Vitest + React Testing Library
- Tests colocated with source files

```
use-mobile.ts
use-mobile.test.ts
```

### Notes

- Do NOT test Server Components with RTL
- Test logic separately
- Use E2E for SSR (not included)

---

## Naming Conventions

| Type       | Format     |
| ---------- | ---------- |
| Variables  | camelCase  |
| Functions  | camelCase  |
| Components | PascalCase |
| Files      | kebab-case |
| Constants  | UPPER_CASE |

---

## Exports

```ts
// ✅ Preferred
export function Component() {}

// ❌ Avoid
export default function Component() {}
```

Only use `export default` for Next.js route files.

---

## Imports

Use type-only imports:

```ts
import type { User } from "@/types"
```

Import order is handled automatically by Prettier.

---

## Environment Variables

- Strongly typed via Next.js config
- Add new variables to:

```
.env.example
```

---

## Next.js Notes

- Middleware file is `proxy.ts` (NOT `middleware.ts`)
- Must export `proxy()`

---

## Path Aliases

```
@/* → project root
```

Example:

```ts
import { Button } from "@/components/ui/button"
```

---

## Providers

Located in `context/`

- Optional providers are **commented out**
- Enable by installing deps and uncommenting

### Theme Provider

Includes:

- Theme switching
- `<meta name="theme-color">` sync
- `d` keyboard shortcut

---

## PWA (optional)

The template ships with a minimal PWA setup: a web app manifest, a pass-through service worker, and an in-app install prompt. It's **opt-in** — if your project doesn't need to be installable, remove the following files and references:

| Delete                          | What it is                                      |
| ------------------------------- | ----------------------------------------------- |
| `app/manifest.ts`               | Next 16 metadata route generating the manifest  |
| `public/sw.js`                  | Minimal service worker (pass-through `fetch`)   |
| `components/sw-register.tsx`    | Client component that registers the SW on mount |
| `components/install-prompt.tsx` | In-app install button (Chromium) + iOS fallback |

Then remove the two imports + JSX usages:

- `<ServiceWorkerRegister />` in `app/layout.tsx` (and its import)
- `<InstallPrompt />` in `app/page.tsx` (and its import)

If you keep the PWA, you **must** add real icon files at `public/icon-192x192.png` and `public/icon-512x512.png` — the manifest references them and Chrome won't treat the app as installable without valid icons.

---

## Git Hooks

- Husky + lint-staged

If it fails:

- Add lint-staged config
- Do NOT bypass with `--no-verify`

---

## Common Mistakes

- Importing from another route’s `_components`
- Over-abstracting too early
- Adding unnecessary global state
- Introducing new UI libraries
- Breaking naming/export rules

---

## Maintenance

When updating structure:

- Update:
   - `README.md`
   - `AGENTS.md`

Keep documentation in sync with the codebase.
