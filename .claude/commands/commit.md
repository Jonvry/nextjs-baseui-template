---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), Bash(git diff:*), Bash(git log:*)
argument-hint: [message] | --no-verify | --amend
description: Create clean commits using the Conventional Commits format
---

# Smart Git Commit

Create well-formatted commit: $ARGUMENTS

## Current Repository State

- Git status: !`git status --porcelain`
- Current branch: !`git branch --show-current`
- Staged changes: !`git diff --cached --stat`
- Unstaged changes: !`git diff --stat`
- Recent commits: !`git log --oneline -5`

## What This Command Does

1. Unless specified with `--no-verify`, automatically runs pre-commit checks:
   - `pnpm lint` to ensure code quality
   - `pnpm typecheck` to verify TypeScript types
   - `pnpm test` to run the Vitest suite
2. Checks which files are staged with `git status`
3. If 0 files are staged, automatically adds all modified and new files with `git add`
4. Performs a `git diff` to understand what changes are being committed
5. Analyzes the diff to determine if multiple distinct logical changes are present
6. If multiple distinct changes are detected, suggests breaking the commit into multiple smaller commits
7. For each commit (or the single commit if not split), creates a commit message using the conventional commit format

## Commit Message Format

Use the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature for the user
- `fix`: A bug fix
- `docs`: Documentation-only changes
- `style`: Changes that do not affect the meaning of the code (whitespace, formatting, missing semicolons, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify `src` or `test` files
- `revert`: Reverts a previous commit

### Breaking Changes

Append `!` after the type/scope, or include a `BREAKING CHANGE:` footer:

```
feat(api)!: remove deprecated v1 endpoints
```

### Scope (optional)

Use a noun describing the section of the codebase affected: `feat(auth):`, `fix(parser):`, `refactor(db):`.

## Best Practices for Commits

- **Verify before committing**: Ensure code lints, typechecks, and tests pass
- **Atomic commits**: Each commit should contain related changes that serve a single purpose
- **Split large changes**: If changes touch multiple concerns, split them into separate commits
- **Imperative mood**: Write commit messages as commands ("add feature", not "added feature" or "adds feature")
- **Concise subject**: Keep the subject line under 72 characters; do not end with a period
- **Lowercase description**: Start the description with a lowercase letter (unless it's a proper noun)
- **Explain the "why"**: Use the body to explain the motivation for the change, not the "what"
- **No emoji**: Keep commit messages plain text for professional tooling and log readability

## Guidelines for Splitting Commits

When analyzing the diff, consider splitting commits based on these criteria:

1. **Different concerns**: Changes to unrelated parts of the codebase
2. **Different types of changes**: Mixing features, fixes, refactoring, etc.
3. **File patterns**: Changes to different types of files (e.g., source code vs documentation)
4. **Logical grouping**: Changes that would be easier to understand or review separately
5. **Size**: Very large changes that would be clearer if broken down

## Examples

Good commit messages:

- `feat(auth): add multi-factor authentication support`
- `fix(parser): resolve memory leak during large file ingestion`
- `docs(api): document rate limiting headers and error codes`
- `refactor(orders): extract pricing logic into dedicated service`
- `perf(query): cache repeated user lookups in request scope`
- `test(checkout): add integration coverage for refund flow`
- `build(deps): upgrade next to 16.0.3`
- `ci(github): require typecheck to pass before merge`
- `chore(release): bump version to 1.4.0`
- `revert: revert "feat(auth): add SSO provider"`
- `feat(api)!: drop support for v1 response envelope`

Example of splitting commits:

- First commit: `feat(types): add solc version type definitions`
- Second commit: `docs(types): document new solc version definitions`
- Third commit: `build(deps): update package.json dependencies`
- Fourth commit: `feat(api): add type definitions for new endpoints`
- Fifth commit: `refactor(workers): improve concurrency handling`
- Sixth commit: `fix(lint): resolve linting issues in new modules`
- Seventh commit: `test(solc): add unit tests for version features`
- Eighth commit: `build(deps): patch dependencies with security advisories`

## Command Options

- `--no-verify`: Skip running the pre-commit checks (lint, typecheck, test)
- `--amend`: Amend the most recent commit (use with care; never amend commits that have been pushed to a shared branch)

## Important Notes

- Do NOT add `Co-Authored-By` lines to commit messages
- Do NOT include emoji in commit subjects or bodies
- By default, pre-commit checks (`pnpm lint`, `pnpm typecheck`, `pnpm test`) will run to ensure code quality
- If these checks fail, you'll be asked if you want to proceed with the commit anyway or fix the issues first
- If specific files are already staged, the command will only commit those files
- If no files are staged, it will automatically stage all modified and new files
- The commit message will be constructed based on the changes detected
- Before committing, the command will review the diff to identify if multiple commits would be more appropriate
- If suggesting multiple commits, it will help you stage and commit the changes separately
- Always reviews the commit diff to ensure the message matches the changes
