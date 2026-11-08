# Strict Development & Quality Guidelines

## 1. Safety & Context Protection
- DO NOT rewrite or delete existing logic outside the immediate task scope.
- Maintain backwards compatibility for all public APIs and components.
- Always inspect existing code and dependencies before introducing new packages.

## 2. Test-Driven Development (TDD) Required
- Before modifying or adding business logic, create or update automated unit/integration tests.
- Verify tests fail prior to implementing new features (Red phase).
- Implement the minimal required changes to make all tests pass (Green phase).

## 3. Verification Protocol
- Never mark an Implementation Plan or Task as complete without running validation commands.
- Before finalizing a task, run in terminal:
  1. Unit tests: `npm test` (или pytest / vitest)
  2. Typechecker: `npm run typecheck` (или tsc --noEmit)
  3. Linter: `npm run lint`
- If any test or type error fails, fix the regression immediately before writing the Walkthrough artifact.

## 4. UI / Extension Verification
- For browser extensions and frontend UI: use headless Playwright/Puppeteer or the built-in Antigravity Browser Agent to verify DOM rendering and clicks.