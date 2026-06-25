# Repository Guidelines

This repository is a personal Next.js 16 starter template using the App Router, React 19, Tailwind v4, and shadcn/ui on Base UI primitives. Keep changes generic and template-appropriate unless a project-specific customization is requested.

## Project Structure & Module Organization

- `app/` contains routes, layouts, metadata, route handlers, `robots.ts`, and `sitemap.ts`.
- `components/ui/` is for shadcn-installed primitives only.
- `components/` contains shared app-level composed components.
- `context/` contains client providers such as `theme-provider.tsx` and optional provider stubs.
- `hooks/` contains reusable client hooks using the `use-*` naming pattern.
- `lib/` contains framework-agnostic utilities; `cn` lives in `lib/utils.ts`.
- `public/` contains static assets served from `/`.

Routes use feature-based architecture with Next.js private folders prefixed by `_`. Route-owned components, hooks, stores, utilities, constants, and business logic belong beside the route in folders such as `_components`, `_hooks`, `_stores`, `_utils`, `_constant`, and `_lib`. Do not import from one route's private folder into another route. Duplicate first; lift stable shared code to `components/`, `hooks/`, or `lib/` later.

When adding, renaming, or deleting top-level folders, update this list and the matching project-structure block in `README.md`.

## Build, Test, and Development Commands

```bash
pnpm dev          # next dev --turbopack
pnpm build        # next build
pnpm start        # production server
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write "**/*.{ts,tsx}"
pnpm test         # vitest run
pnpm test:watch   # vitest watch mode
```

Install shadcn components on demand only:

```bash
pnpm dlx shadcn@latest add <component>
```

## Coding Style & Naming Conventions

Use named exports for components, hooks, utilities, and providers. Use default exports only where Next.js requires them: `page.tsx`, `layout.tsx`, `not-found.tsx`, `global-error.tsx`, `robots.ts`, `sitemap.ts`, `loading.tsx`, and `error.tsx`.

Prefer `function` declarations for top-level components, hooks, and utilities. Use arrow functions for inline callbacks, React hook callbacks, event handlers, and lexical `this`.

Naming conventions:

- Variables and functions: `camelCase`
- Components: `PascalCase`
- Files: `kebab-case`, including components such as `user-card.tsx`
- Constants: `UPPER_CASE`

Prettier uses 3-space indentation, double quotes, no semicolons, `printWidth: 100`, sorted imports, and Tailwind class sorting. Import order is `server-only`, `react`, `next*`, third-party packages, `@/*`, then relative imports. Let Prettier reorder imports.

ESLint enforces separate type imports. Use `import type { User } from "@/types"` instead of `import { type User } from "@/types"`. Prefix intentionally unused variables or arguments with `_`.

## Testing Guidelines

Tests use Vitest, React Testing Library, jsdom, and `@testing-library/jest-dom/vitest`. Config lives in `vitest.config.ts`; setup lives in `vitest.setup.ts`. Colocate tests with the file under test, for example `hooks/use-breakpoint.test.ts` beside `hooks/use-breakpoint.ts`.

Server Components cannot be rendered by RTL. Unit-test pure logic and cover SSR behavior with E2E tests if E2E is added later.

## Architecture Notes

This is Next.js 16, so APIs and conventions may differ from older versions. Read relevant docs in `node_modules/next/dist/docs/` before changing framework-sensitive code.

Use `proxy.ts`, not `middleware.ts`; the exported function is `proxy()`. Keep the matcher excluding `api`, `_next/static`, `_next/image`, and metadata routes.

Tailwind v4 has no `tailwind.config.*`. Theme tokens live in `app/globals.css` as OKLCH CSS variables exposed through `@theme inline`. Dark mode uses the `.dark` variant driven by `next-themes`.

Body defaults in `app/globals.css` already apply `bg-background`, `text-sm`, `text-muted-foreground`, and the sans font. Do not repeat those classes on children unless the element intentionally differs.

shadcn/ui is configured for Base UI in `components.json` with Hugeicons. Do not introduce Radix primitives. Add or modify UI primitives in the existing Base UI style.

`tsconfig.json` maps `@/*` to the repository root. There is no `src/` directory.

## Metadata, Providers, and Configuration

`app/layout.tsx` defines `SITE_NAME`, `SITE_DESCRIPTION`, and `SITE_URL` from `NEXT_PUBLIC_BASE_URL`; keep metadata, viewport, Open Graph, and Twitter values aligned. When customizing a real site, update `app/robots.ts`, `app/sitemap.ts`, and the OG image reference if needed.

`context/theme-provider.tsx` also syncs `<meta name="theme-color">` on route changes and installs the global `d` theme hotkey, ignored while typing. Preserve both behaviors unless explicitly changing theme behavior.

Optional providers in `context/` may ship commented out. Enable them by installing documented dependencies, uncommenting the provider, and wrapping the tree in `app/layout.tsx`.

`next.config.mjs` keeps `reactCompiler` and `cacheComponents` commented out. `typedRoutes` and `experimental.typedEnv` are enabled, so new environment variables must be declared in `.env.example` or equivalent typed env files.

## Commit & Pull Request Guidelines

Recent commits use short imperative subjects, often Conventional Commit prefixes such as `feat:`, `fix:`, `refactor:`, and `style:`. Keep commits focused.

Pull requests should include a concise summary, linked issues when applicable, test results (`pnpm lint`, `pnpm typecheck`, `pnpm test`), and screenshots for UI changes. Husky runs `pnpm exec lint-staged` before commit; add checks to lint-staged rather than bypassing hooks.

## Agent-Specific Instructions

Make surgical changes. Touch only files required by the request, match existing style, and avoid unrelated refactors. Remove only imports, variables, or functions made unused by your own change. Mention unrelated dead code instead of deleting it.

`.mcp.json` configures the `next-devtools` MCP server. Prefer its Next.js docs tools for Next 16 questions when available.
