---
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
argument-hint: [file-path] | [component-name]
description: Generate a complete Vitest + React Testing Library test file for a specified source file or component.
---

# Generate Tests

Generate a Vitest test suite for: $ARGUMENTS

## Project Testing Setup

- **Framework:** Vitest 4 + React Testing Library + jsdom
- **Config:** `vitest.config.ts` (jsdom env, `@/*` alias, `vitest.setup.ts` loads `@testing-library/jest-dom/vitest`)
- **Run:** `pnpm test` (one-shot) · `pnpm test:watch` (watch mode)
- **Location:** tests colocate with the file under test (e.g. `use-mobile.test.ts` next to `use-mobile.ts`)
- **Existing examples:** !`find . -name "*.test.*" -not -path "*/node_modules/*" | head -5`
- **Target:** if $ARGUMENTS is a path, read it with @$ARGUMENTS; if it's a name, Grep for it first

## What to Test

- **Pure utilities in `lib/`** — unit-test inputs/outputs, edge cases
- **Client hooks in `hooks/` or `_hooks/`** — use `renderHook` from RTL, cover state transitions and cleanup
- **Client components in `components/` or `_components/`** — render, user interactions via `@testing-library/user-event`, accessible queries (`getByRole`, `getByLabelText`)
- **Skip:** Server Components (RTL can't render them — cover with E2E if needed), pure shadcn primitives without custom logic

## Generation Steps

1. **Analyze** — read the target; identify exports, props/args, side effects, and branches
2. **Pattern-match** — check a nearby existing test for the project's style (imports, describe/it structure, mock approach)
3. **Mock at the boundary** — `matchMedia`, `fetch`, timers, `next/navigation` stubs; use `vi.fn()` and `vi.stubGlobal()`; reset in `afterEach`
4. **Write tests** following AAA (Arrange, Act, Assert):
   - Happy path
   - Edge cases (empty/null/boundary values)
   - Error conditions
   - For hooks: initial state + each transition
   - For components: render, user interaction, accessible output
5. **Naming** — describe behavior, not implementation (`returns true when viewport is mobile`, not `calls matchMedia`)

## Conventions

- File naming: `kebab-case.test.ts(x)` colocated with source
- Import style: `import { describe, it, expect, vi, afterEach } from "vitest"`
- Use `screen` queries from RTL, prefer `getByRole` / `getByLabelText` over `getByTestId`
- No `any` — follow the project's `@typescript-eslint/no-explicit-any` warn rule
- Named exports only (project convention); no `export default`
