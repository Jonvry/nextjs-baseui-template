# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal Next.js 16 starter template (App Router, React 19, Tailwind v4, shadcn/ui on Base UI primitives). Intended to be cloned and customized per project — keep changes generic and template-appropriate unless told otherwise.

Routes follow a **feature-based architecture** using Next.js private folders (`_*`) — see the "Feature-based architecture" section below for the private-folder convention and cross-page sharing rules.

## Commands

```bash
pnpm dev          # next dev --turbopack
pnpm build        # next build
pnpm start        # production server
pnpm lint         # eslint (flat config)
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write "**/*.{ts,tsx}"
pnpm test         # vitest run
pnpm test:watch   # vitest (watch mode)
```

Install a shadcn component on demand — do **not** pre-install the full set:

```bash
pnpm dlx shadcn@latest add <component>
```

**Testing.** Vitest + React Testing Library + jsdom. Config in `vitest.config.ts`, matchers set up in `vitest.setup.ts` (`@testing-library/jest-dom/vitest`). Tests colocate with the file under test — e.g. `components/ui/button.test.tsx` next to `button.tsx`. The `@/*` alias is mirrored in `vitest.config.ts` via `resolve.alias`. Server Components can't be rendered by RTL; unit-test pure logic and cover SSR behavior with E2E (not configured here).

## Naming conventions

- Variables → `camelCase`
- Functions → `camelCase`
- Components → `PascalCase`
- Files → `kebab-case` (including component files: `user-card.tsx` exporting `UserCard`)
- Constants → `UPPER_CASE`

**Prefer named `export` over `export default`.** Only use `export default` when the framework requires it — i.e. Next.js route files (`page.tsx`, `layout.tsx`, `not-found.tsx`, `global-error.tsx`, `robots.ts`, `sitemap.ts`, `loading.tsx`, `error.tsx`). For everything else (components, hooks, utils, providers), use named exports so imports stay consistent and rename-refactors are safe.

## Coding style

- **Prefer `function` declarations over arrow functions** for top-level/named functions (components, hooks, utils). Use arrow functions for inline callbacks (`.map`, `.filter`, event handlers), React hook callbacks (`useCallback`, `useMemo`, `useEffect`), and when you need lexical `this`. Enforced by ESLint (`func-style` + `prefer-arrow-callback`).

```ts
// Good
export function UserCard({ name }: Props) {
   return <div>{name}</div>
}

// Avoid
export const UserCard = ({ name }: Props) => {
   return <div>{name}</div>
}
```

## Architecture notes that require reading multiple files

**shadcn/ui on Base UI, not Radix.** `components.json` is set to `style: "base-maia"` with `iconLibrary: "hugeicons"`. `components/ui/button.tsx` imports from `@base-ui/react/button` (not `@radix-ui/*`). When adding or modifying UI primitives, stay on Base UI — don't introduce Radix.

**Tailwind v4, no `tailwind.config.*`.** All theme tokens (colors as OKLCH, radii, fonts) live in `app/globals.css` via `@theme inline` and CSS custom properties. Dark mode is a `.dark` class variant (`@custom-variant dark (&:is(.dark *))`) driven by `next-themes` through `context/theme-provider.tsx`. To add a token, add the CSS variable in `:root` + `.dark`, then expose it under `@theme inline`.

**Body defaults.** `app/globals.css` applies `bg-background text-sm text-muted-foreground` + the sans font to `body`. Don't repeat `text-sm`, `text-muted-foreground`, or `font-sans` on children — they inherit. Only add classes when the element differs: `text-foreground` for stronger text, `text-base`/`text-lg` for larger sizes, `font-medium`/`font-semibold` for emphasis.

**Middleware file is `proxy.ts`, not `middleware.ts`.** Next 16 renamed the convention; the exported function is `proxy()`. Keep the matcher excluding `api`, `_next/static`, `_next/image`, and metadata routes.

**Metadata pattern in `app/layout.tsx`.** `SITE_NAME`, `SITE_DESCRIPTION`, `SITE_URL` (from `NEXT_PUBLIC_BASE_URL`) are defined at the top and reused across `metadata`, `viewport`, OG, and Twitter. `app/robots.ts` and `app/sitemap.ts` currently hard-code `sitename.com` — update both when the site name is known. `app/opengraph-image.jpeg` is the default OG image; `app/layout.tsx` references `.png` — rename or update one to match when customizing.

**Optional providers in `context/` ship commented out.** `context/query-provider.tsx` is a stub for TanStack Query — the entire file is commented out. To enable it, install the deps (`pnpm add @tanstack/react-query @tanstack/react-query-devtools`), uncomment the file, and wrap the tree in `app/layout.tsx`. If a provider stub has no dependencies to install, just uncomment. Treat this as the pattern for future optional providers: ship commented-out, document the install in the same PR that enables it.

**Theme provider does two things beyond `next-themes`.** `context/theme-provider.tsx` also (1) syncs a `<meta name="theme-color">` to the resolved theme on each route change and (2) installs a global `d` hotkey that toggles theme (ignored while typing in inputs). Removing either breaks visible behavior on the starter page.

**Path alias is repo-root-wide.** `tsconfig.json` maps `@/*` → `./*` (not `./src/*`). `components.json` aliases follow suit: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. There is no `src/` directory.

**Folder intent** (keep this list in sync — see maintenance note below):

- `app/` — routes, layout, metadata (route handlers, sitemap, robots). Uses `_*` private folders — see "Feature-based architecture" below.
- `components/ui/` — shadcn-installed primitives only
- `components/` (root) — app-level composed components (shared across routes)
- `context/` — client providers (theme, optional stubs like `query-provider.tsx`)
- `hooks/` — reusable client hooks (`use-*` prefix), shared across routes
- `lib/` — framework-agnostic utilities (`cn` lives in `lib/utils.ts`)
- `public/` — static assets served at the root (`/`)

> **Maintenance:** when you add, rename, or delete a top-level folder (or meaningfully change its purpose), update this list in the same change. If a folder is deleted, remove its bullet — don't leave a stale entry. If a folder is added, add a one-line description of its intent. Same rule for `README.md`'s "Project structure" block. Don't let these two lists drift from the filesystem.

**ESLint enforces typed imports and unused detection.** `@typescript-eslint/consistent-type-imports` with `disallowTypeAnnotations: true` means never use `import { type X }` — use `import type { X }` separately. `unused-imports/no-unused-imports` will warn on unused imports; prefix intentionally unused vars/args with `_`.

**Prettier specifics that catch people out.** 3-space tabs, no semicolons, double quotes, `printWidth: 100`. `@trivago/prettier-plugin-sort-imports` enforces import order: `server-only` → `react` → `next*` → third-party → `@/*` → relative. Don't manually reorder — let Prettier do it.

**Husky + lint-staged run on pre-commit** (`.husky/pre-commit` → `pnpm exec lint-staged`). The `lint-staged` config in `package.json` runs `prettier --write --ignore-unknown` on all staged files. Add more tools (eslint, typecheck) to the config rather than bypassing with `--no-verify`.

## Feature-based architecture

Routes own their logic. Everything a page needs — components, hooks, stores, utilities — lives _next to_ the route file in a [Next.js private folder](https://nextjs.org/docs/app/api-reference/file-conventions/private-folders) (prefixed with `_`). Private folders are ignored by the routing system and produce no route segment.

### Private folders

| Folder        | Purpose                           |
| ------------- | --------------------------------- |
| `_components` | UI components scoped to the route |
| `_hooks`      | Feature-specific React hooks      |
| `_stores`     | Zustand state stores              |
| `_utils`      | Helper functions                  |
| `_constant`   | Static configuration              |
| `_lib`        | Business logic, schemas, context  |

Example:

```
app/
   dashboard/
      _components/
         user-card.tsx
      _hooks/
         use-dashboard-data.ts
      _lib/
         queries.ts
      page.tsx
      layout.tsx
```

### Cross-page sharing

**Do NOT import from one page's `_*` folders into another page.** Each page owns its internals. If two pages need the same thing:

1. Duplicate and adapt first — premature abstraction is worse than duplication.
2. Once it stabilizes into a shared primitive, **lift it** to a repo-root folder:
   - Shared UI → `components/` (or `components/ui/` if it's a new primitive)
   - Shared hook → `hooks/`
   - Shared utility → `lib/`
3. Then import via the root-level alias (`@/components/...`, `@/hooks/...`, `@/lib/...`).

Sharing across `_components/` folders leads to prop bloat and coupled regressions when one page's needs evolve.

For tiny routes (one-file `page.tsx` with no supporting code), skip private folders entirely. The architecture is a tool, not a mandate.

## Surgical changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that _your_ changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

## Config you may need to flip

`next.config.mjs` keeps `reactCompiler` and `cacheComponents` commented out. `typedRoutes: true` and `experimental.typedEnv: true` are on — `Link href` and `process.env` are strongly typed, so new env vars must be declared in `.env.example` (or similar) for typing to pick them up.

## MCP

`.mcp.json` wires the `next-devtools` MCP server (enabled in `.claude/settings.local.json`). Prefer its `nextjs_docs` / `nextjs_call` tools for Next 16-specific questions over web search.
