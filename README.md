# template

Personal Next.js 16 starter template. App Router, React 19, Tailwind v4, shadcn/ui on Base UI primitives, TypeScript strict mode.

## Stack

- **Next.js** 16 (App Router, Turbopack, `typedRoutes`)
- **React** 19.2
- **TypeScript** 6 (strict)
- **Tailwind CSS** v4 (CSS-first config in `app/globals.css`, no `tailwind.config.*`)
- **shadcn/ui** — `base-maia` style on **Base UI** primitives, `hugeicons` icon library
- **next-themes** — class-based dark mode with a `d` hotkey to toggle
- **ESLint** flat config + **Prettier** (3-space tabs, no semis, double quotes, import sorting)
- **Husky** + **lint-staged** pre-commit hook
- **Vitest** + **React Testing Library** (jsdom)
- **PWA** (optional) — manifest, service worker, install prompt

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

## Scripts

| Command           | What it does                    |
| ----------------- | ------------------------------- |
| `pnpm dev`        | Start dev server with Turbopack |
| `pnpm build`      | Production build                |
| `pnpm start`      | Run the production build        |
| `pnpm lint`       | ESLint                          |
| `pnpm typecheck`  | `tsc --noEmit`                  |
| `pnpm format`     | Prettier write for `.ts`/`.tsx` |
| `pnpm test`       | Vitest (one-shot)               |
| `pnpm test:watch` | Vitest in watch mode            |

## Installing shadcn components

Install only the components you need — the template ships with just `Button`.

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dropdown-menu
```

Configured in `components.json` (`style: base-maia`, `baseColor: taupe`, `iconLibrary: hugeicons`).

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

Path alias: `@/*` → repo root (no `src/` directory).

> Keep this block in sync with the filesystem — if a top-level folder is added, renamed, or removed, update this list and the mirrored one in `CLAUDE.md` in the same commit.

## Conventions

### Naming

| Kind       | Style        | Example             |
| ---------- | ------------ | ------------------- |
| Variables  | `camelCase`  | `userName`          |
| Functions  | `camelCase`  | `getUserById()`     |
| Components | `PascalCase` | `UserCard`          |
| Files      | `kebab-case` | `user-card.tsx`     |
| Constants  | `UPPER_CASE` | `MOBILE_BREAKPOINT` |

Component files use `kebab-case` filenames and `PascalCase` exports (`user-card.tsx` → `export function UserCard`).

### Exports

Prefer named `export` over `export default`. Only use `export default` where the framework requires it — Next.js route files (`page.tsx`, `layout.tsx`, `not-found.tsx`, `global-error.tsx`, `robots.ts`, `sitemap.ts`, etc.).

```ts
// ✅ preferred
export function UserCard() {
   /* ... */
}

// ✅ only in Next.js route files
export default function Page() {
   /* ... */
}
```

### Optional providers

`context/` may contain provider stubs that ship fully commented out. Example: `context/query-provider.tsx` for TanStack Query. To enable, install the deps and uncomment:

```bash
pnpm add @tanstack/react-query @tanstack/react-query-devtools
```

Then wrap the tree in `app/layout.tsx`. Providers with no extra deps just need uncommenting.

### Imports

Type imports must be a separate statement:

```ts
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
```

Prettier's import-sort plugin orders them: `server-only` → `react` → `next*` → third-party → `@/*` → relative. Let the formatter handle it.

### Theming

Add tokens in `app/globals.css` — define the CSS variable in `:root` and `.dark`, then expose it under `@theme inline`. Don't create a `tailwind.config.*`.

### Middleware

The middleware file is `proxy.ts` (Next 16 rename). The exported function is `proxy()`.

## Testing

Vitest + React Testing Library + jsdom. Tests colocate with the file they cover — e.g. `hooks/use-mobile.text.ts` next to `use-mobile.ts`.

```ts
import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useIsMobile } from "./use-mobile"

describe("useIsMobile", () => {
   const listeners = new Set<() => void>()
   const originalMatchMedia = window.matchMedia

   function setViewport(width: number) {
      Object.defineProperty(window, "innerWidth", {
         value: width,
         writable: true,
         configurable: true,
      })
      act(() => {
         listeners.forEach((fn) => fn())
      })
   }

   beforeEach(() => {
      listeners.clear()
      window.matchMedia = vi.fn((query: string) => ({
         matches: window.innerWidth < 768,
         media: query,
         onchange: null,
         addEventListener: (_: string, fn: () => void) => listeners.add(fn),
         removeEventListener: (_: string, fn: () => void) => listeners.delete(fn),
         addListener: vi.fn(),
         removeListener: vi.fn(),
         dispatchEvent: vi.fn(),
      })) as unknown as typeof window.matchMedia
   })

   afterEach(() => {
      window.matchMedia = originalMatchMedia
   })

   it("returns true when the viewport is narrower than 768px", () => {
      setViewport(500)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current).toBe(true)
   })

   it("returns false when the viewport is 768px or wider", () => {
      setViewport(1024)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current).toBe(false)
   })

   it("updates when the viewport crosses the breakpoint", () => {
      setViewport(1024)
      const { result } = renderHook(() => useIsMobile())
      expect(result.current).toBe(false)

      setViewport(500)
      expect(result.current).toBe(true)
   })
})
```

Server Components can't be rendered by RTL. Keep logic in plain async functions and unit-test those; cover SSR/streaming with E2E (not configured in this template).

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

## Git hooks

`pnpm install` sets up Husky via the `prepare` script. Pre-commit runs `lint-staged`.
