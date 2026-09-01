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
  app/                 Next.js App Router routes
    api/contact/       Membership/contact form route handler
    api/admin/         Admin auth (login/logout) + content read/write route handlers
    admin/             Password-protected content editor UI (/admin)
  components/          Reusable UI components (server components by default; "use client" where needed)
  content/              JSON "CMS" content files — see CMS-GUIDE.md
  lib/
    content.ts         Typed getters over the JSON content (single source of truth for shapes)
    admin-auth.ts       Signed-cookie session helpers for the /admin UI
    admin-collections.ts Allow-list of content files the /admin UI is permitted to read/write
    utils.ts           `cn()` class-name helper (clsx + tailwind-merge)
  proxy.ts             Guards /admin and /api/admin behind the signed session cookie
  content and component tests live in __tests__/ folders next to the code they cover
e2e/                    Playwright end-to-end specs
public/images/          Static assets (club logo, etc. — see CMS-GUIDE.md)
docs/ARCHITECTURE.md     Architecture diagrams and deep-dive documentation
CMS-GUIDE.md            Non-developer guide to editing site content (Admin UI + JSON files)
.github/workflows/       CI (lint/test/build/e2e) and static GitHub Pages deployment
```

## Content management

There is no external headless CMS wired up (no Sanity/Prismic account was available
when this was built). Instead, all editable content — players, fixtures, results,
events, gallery, sponsors, committee, club info — lives in plain JSON files under
[`src/content/`](src/content), typed 1:1 through [`src/lib/content.ts`](src/lib/content.ts).

Non-technical admins have two ways to edit it, documented in [CMS-GUIDE.md](CMS-GUIDE.md):

1. **The `/admin` UI** — a password-protected, form-based content editor (no JSON/code
   editing). Requires `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` env vars (see
   [`.env.example`](.env.example)) and a Node host with a writable filesystem — it is
   not available on the static GitHub Pages export.
2. **Editing the JSON files directly** — always available as a fallback.

Migrating to a real headless CMS later just means swapping the `getX()` functions in
`src/lib/content.ts` for API calls.

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

## Hosting & deployment

### Option A: Node-capable host (recommended, full functionality)

Any Next.js-compatible host works (e.g. [Vercel](https://vercel.com/new), Netlify,
Railway, a VPS). Run `npm run build` then `npm run start`, or point your platform's
Next.js build/start commands at this repo. This preserves everything, including the
`/api/contact` route and the `/admin` content-editing UI.

### Option B: GitHub Pages (static-only)

GitHub Pages only serves static files — it can't run the `/api/contact` route or the
`/admin` UI (both need a Node server). Two ready-made workflows are included:

- [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — on every push/PR: installs
  deps, lints, runs `npm test`, `npm run build`, and (after `lint-and-test` passes)
  `npm run test:e2e`.
- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) — on push
  to `main`: removes `src/app/api`, `src/app/admin`, and `src/proxy.ts` (unsupported
  by static export), builds a static export (`npm run build:static`, which sets
  `STATIC_EXPORT=true` so `next.config.ts` switches to `output: "export"` with
  unoptimized images), then publishes it via `actions/upload-pages-artifact` +
  `actions/deploy-pages`.

To enable it once: in the repo's **Settings → Pages**, set *Source* to **GitHub
Actions**. Then, optionally:

- Because the API route is gone on Pages, the contact form falls back to
  `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` — set this as a repository **variable** (Settings
  → Secrets and variables → Actions → Variables) to an external form backend (e.g.
  [Formspree](https://formspree.io)) if you need the contact form to work on Pages.
  Leave it unset and the form will simply fail on Pages (it still works fully on a
  Node host, along with `/admin`).
- The workflow defaults `PAGES_BASE_PATH` to `/<repo-name>` (project Pages without a
  custom domain, e.g. `https://<user>.github.io/bpscc/`). If you're using a custom
  domain or a user/org root page (`<user>.github.io`), edit the workflow to set it to
  an empty string instead.

To try the static build locally: `npm run build:static` (after removing
`src/app/api`, `src/app/admin`, and `src/proxy.ts`, since Next will otherwise
fail the build the same way it would on Pages).

