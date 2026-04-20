# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal Next.js 16 starter template (App Router, React 19, Tailwind v4, shadcn/ui on Base UI primitives). Intended to be cloned and customized per project — keep changes generic and template-appropriate unless told otherwise.

## Commands

```bash
pnpm dev          # next dev --turbopack
pnpm build        # next build
pnpm start        # production server
pnpm lint         # eslint (flat config)
pnpm typecheck    # tsc --noEmit
pnpm format       # prettier --write "**/*.{ts,tsx}"
```

Install a shadcn component on demand — do **not** pre-install the full set:

```bash
pnpm dlx shadcn@latest add dialog
```

There is no test runner configured.

## Naming conventions

- Variables → `camelCase`
- Functions → `camelCase`
- Components → `PascalCase`
- Files → `kebab-case` (including component files: `user-card.tsx` exporting `UserCard`)
- Constants → `UPPER_CASE`

**Prefer named `export` over `export default`.** Only use `export default` when the framework requires it — i.e. Next.js route files (`page.tsx`, `layout.tsx`, `not-found.tsx`, `global-error.tsx`, `robots.ts`, `sitemap.ts`, `loading.tsx`, `error.tsx`). For everything else (components, hooks, utils, providers), use named exports so imports stay consistent and rename-refactors are safe.

## Architecture notes that require reading multiple files

**shadcn/ui on Base UI, not Radix.** `components.json` is set to `style: "base-maia"` with `iconLibrary: "hugeicons"`. `components/ui/button.tsx` imports from `@base-ui/react/button` (not `@radix-ui/*`). When adding or modifying UI primitives, stay on Base UI — don't introduce Radix.

**Tailwind v4, no `tailwind.config.*`.** All theme tokens (colors as OKLCH, radii, fonts) live in `app/globals.css` via `@theme inline` and CSS custom properties. Dark mode is a `.dark` class variant (`@custom-variant dark (&:is(.dark *))`) driven by `next-themes` through `context/theme-provider.tsx`. To add a token, add the CSS variable in `:root` + `.dark`, then expose it under `@theme inline`.

**Middleware file is `proxy.ts`, not `middleware.ts`.** Next 16 renamed the convention; the exported function is `proxy()`. Keep the matcher excluding `api`, `_next/static`, `_next/image`, and metadata routes.

**Metadata pattern in `app/layout.tsx`.** `SITE_NAME`, `SITE_DESCRIPTION`, `SITE_URL` (from `NEXT_PUBLIC_BASE_URL`) are defined at the top and reused across `metadata`, `viewport`, OG, and Twitter. `app/robots.ts` and `app/sitemap.ts` currently hard-code `sitename.com` — update both when the site name is known. `app/opengraph-image.jpeg` is the default OG image; `app/layout.tsx` references `.png` — rename or update one to match when customizing.

**Optional providers in `context/` ship commented out.** `context/query-provider.tsx` is a stub for TanStack Query — the entire file is commented out. To enable it, install the deps (`pnpm add @tanstack/react-query @tanstack/react-query-devtools`), uncomment the file, and wrap the tree in `app/layout.tsx`. If a provider stub has no dependencies to install, just uncomment. Treat this as the pattern for future optional providers: ship commented-out, document the install in the same PR that enables it.

**Theme provider does two things beyond `next-themes`.** `context/theme-provider.tsx` also (1) syncs a `<meta name="theme-color">` to the resolved theme on each route change and (2) installs a global `d` hotkey that toggles theme (ignored while typing in inputs). Removing either breaks visible behavior on the starter page.

**Path alias is repo-root-wide.** `tsconfig.json` maps `@/*` → `./*` (not `./src/*`). `components.json` aliases follow suit: `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`. There is no `src/` directory.

**Folder intent** (keep this list in sync — see maintenance note below):

- `app/` — routes, layout, metadata (route handlers, sitemap, robots)
- `components/ui/` — shadcn-installed primitives only
- `components/` (root) — app-level composed components
- `context/` — client providers (theme, optional stubs like `query-provider.tsx`)
- `hooks/` — reusable client hooks (`use-*` prefix)
- `lib/` — framework-agnostic utilities (`cn` lives in `lib/utils.ts`)
- `public/` — static assets served at the root (`/`)

> **Maintenance:** when you add, rename, or delete a top-level folder (or meaningfully change its purpose), update this list in the same change. If a folder is deleted, remove its bullet — don't leave a stale entry. If a folder is added, add a one-line description of its intent. Same rule for `README.md`'s "Project structure" block. Don't let these two lists drift from the filesystem.

**ESLint enforces typed imports and unused detection.** `@typescript-eslint/consistent-type-imports` with `disallowTypeAnnotations: true` means never use `import { type X }` — use `import type { X }` separately. `unused-imports/no-unused-imports` will warn on unused imports; prefix intentionally unused vars/args with `_`.

**Prettier specifics that catch people out.** 3-space tabs, no semicolons, double quotes, `printWidth: 100`. `@trivago/prettier-plugin-sort-imports` enforces import order: `server-only` → `react` → `next*` → third-party → `@/*` → relative. Don't manually reorder — let Prettier do it.

**Husky + lint-staged run on pre-commit** (`.husky/pre-commit` → `pnpm exec lint-staged`). Note: `package.json` does not currently define a `lint-staged` config block — if the hook fails with "no configuration found," add one rather than bypassing with `--no-verify`.

## Config you may need to flip

`next.config.mjs` keeps `reactCompiler` and `cacheComponents` commented out. `typedRoutes: true` and `experimental.typedEnv: true` are on — `Link href` and `process.env` are strongly typed, so new env vars must be declared in `.env.example` (or similar) for typing to pick them up.

## MCP

`.mcp.json` wires the `next-devtools` MCP server (enabled in `.claude/settings.local.json`). Prefer its `nextjs_docs` / `nextjs_call` tools for Next 16-specific questions over web search.
