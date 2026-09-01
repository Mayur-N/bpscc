# Copilot instructions for this repository

Black Panthers Cricket Club website — Next.js (App Router) + TypeScript + Tailwind CSS v4,
with a JSON-backed "CMS" (no external headless CMS). Read
[docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md) and [README.md](../README.md) before
making non-trivial changes; read [CMS-GUIDE.md](../CMS-GUIDE.md) before changing
anything under `src/content/`.

## Testing policy (mandatory)

**Every change that adds or modifies behavior must include test coverage, and existing
tests must be verified before the change is considered complete.** Concretely:

1. Before finishing any task, run:
   - `npm test` (Vitest unit/component tests)
   - `npm run build` (type-checks and catches build-time errors)
   - `npm run test:e2e` when the change touches user-facing flows, navigation, or forms
     (Playwright — builds and serves the app automatically)
2. If you add a new component, utility, API route, or content getter: add a test for it
   in the matching `__tests__/` folder next to the code (see existing tests for
   patterns: `src/lib/__tests__/*.test.ts`, `src/app/api/contact/__tests__/route.test.ts`,
   `src/components/__tests__/*.test.tsx`).
3. If you change existing behavior (validation rules, filtering logic, copy that tests
   assert on, route structure, etc.), update the corresponding existing test(s) rather
   than leaving them stale or deleting them.
4. If you add a new page or primary navigation entry, add/update a Playwright spec in
   `e2e/` covering that it renders and is reachable from navigation.
5. Never mark a task done with failing or skipped tests. If a test must be temporarily
   skipped, say so explicitly and explain why.

## Content changes

- All editable site content lives in `src/content/*.json`, typed through
  `src/lib/content.ts`. When you change a JSON shape, update the matching TypeScript
  type in the same commit, and update `CMS-GUIDE.md` if the change affects what a
  non-technical admin would edit.
- Do not reintroduce "community engagement" content (clinics, charity events, outreach
  programs) — this was deliberately removed because the club does not currently run
  these programs. Confirm with the user before adding anything like it back.

## Styling conventions

- All theme colors are CSS variables in `src/app/globals.css` (`--panther-*`), exposed
  to Tailwind as `bg-panther-*` / `text-panther-*` / `border-panther-*` utilities. Use
  these tokens instead of hardcoding hex colors or arbitrary Tailwind color classes.
- `lucide-react` v1.x has no trademarked brand icons (Instagram/Facebook/YouTube/etc.).
  Use/extend `src/components/social-icons.tsx` for those instead of trying to import
  them from `lucide-react`.
- Use the `cn()` helper from `src/lib/utils.ts` (clsx + tailwind-merge) when composing
  conditional class names.

## Environment quirks

- On Windows/PowerShell, `npx`/`npm` may fail with an execution-policy error about
  `.ps1` scripts being unsigned. Use `npx.cmd` / `npm.cmd` instead.
- The club crest image is expected at `public/images/logo.png` and is not committed by
  default — components reference this path but it may be missing in a fresh checkout.
