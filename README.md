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

| Command          | What it does                    |
| ---------------- | ------------------------------- |
| `pnpm dev`       | Start dev server with Turbopack |
| `pnpm build`     | Production build                |
| `pnpm start`     | Run the production build        |
| `pnpm lint`      | ESLint                          |
| `pnpm typecheck` | `tsc --noEmit`                  |
| `pnpm format`    | Prettier write for `.ts`/`.tsx` |

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

## Git hooks

`pnpm install` sets up Husky via the `prepare` script. Pre-commit runs `lint-staged`.
