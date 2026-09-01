# Black Panthers Cricket Club — Website

The official website for **Black Panthers Cricket Club**: fixtures & results, squad
profiles, committee/leadership info, events & media gallery, sponsors, and a
membership/contact form. Built with Next.js (App Router), TypeScript, and Tailwind CSS,
with a lightweight JSON-backed "CMS" so non-technical committee members can update
content without touching code.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (theme tokens in [`src/app/globals.css`](src/app/globals.css)) |
| Icons | [lucide-react](https://lucide.dev) (+ custom SVGs for brand icons it no longer ships) |
| Content | Local JSON files under [`src/content/`](src/content) — see [CMS-GUIDE.md](CMS-GUIDE.md) |
| Unit/component tests | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |
| End-to-end tests | [Playwright](https://playwright.dev) |

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for diagrams and a deeper explanation
of how the pieces fit together.

## Getting started

Requires Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Windows/PowerShell note:** if `npx`/`npm` fail with an execution-policy error about
> `.ps1` scripts, use `npx.cmd` / `npm.cmd` instead — this repo was developed under that
> constraint.

## Available scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm test` | Run Vitest unit/component tests once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:coverage` | Run Vitest with coverage report |
| `npm run test:e2e` | Run Playwright e2e tests (builds & serves the app automatically) |
| `npm run test:e2e:ui` | Run Playwright in interactive UI mode |

## Project structure

```
src/
  app/                 Next.js App Router routes (pages + /api/contact route handler)
  components/          Reusable UI components (server components by default; "use client" where needed)
  content/              JSON "CMS" content files — see CMS-GUIDE.md
  lib/
    content.ts         Typed getters over the JSON content (single source of truth for shapes)
    utils.ts           `cn()` class-name helper (clsx + tailwind-merge)
  content and component tests live in __tests__/ folders next to the code they cover
e2e/                    Playwright end-to-end specs
public/images/          Static assets (club logo, etc. — see CMS-GUIDE.md)
docs/ARCHITECTURE.md     Architecture diagrams and deep-dive documentation
CMS-GUIDE.md            Non-developer guide to editing site content
```

## Content management

There is no external headless CMS wired up (no Sanity/Prismic account was available
when this was built). Instead, all editable content — players, fixtures, results,
events, gallery, sponsors, committee, club info — lives in plain JSON files under
[`src/content/`](src/content), documented for non-developers in
[CMS-GUIDE.md](CMS-GUIDE.md). The JSON files are typed 1:1 through
[`src/lib/content.ts`](src/lib/content.ts), so migrating to a real headless CMS later
just means swapping those getters for API calls.

## Testing

This project has two layers of automated tests:

1. **Unit/component tests** (Vitest + Testing Library) — cover content-layer logic
   (`src/lib/content.ts`), the contact form API route's validation, and interactive
   components (squad filtering, fixtures/results tabs, contact form states).
2. **End-to-end tests** (Playwright) — smoke-test real user flows against a production
   build: homepage renders, primary navigation (desktop + mobile menu) works, squad
   filtering/search, fixtures/results tab switching, and the contact form's
   success/validation states.

**Whenever you add or change a feature, add or update the corresponding tests, and run
the full suite (`npm test` and `npm run test:e2e`) before considering the change done.**
See [`.github/copilot-instructions.md`](.github/copilot-instructions.md) for the full
testing policy used by AI coding agents working in this repo.

## Deployment

Any Next.js-compatible host works (e.g. [Vercel](https://vercel.com/new)). Run
`npm run build` then `npm run start`, or point your platform's Next.js build/start
commands at this repo.

