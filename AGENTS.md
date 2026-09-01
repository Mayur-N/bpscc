<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Black Panthers Cricket Club — project instructions

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for the full,
authoritative instructions (testing policy, content conventions, styling conventions,
environment quirks). See [README.md](README.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
for project overview and architecture diagrams.

In short: this is a Next.js App Router site with JSON-backed content
(`src/content/*.json`, typed via `src/lib/content.ts`). Any behavioral change must come
with passing tests — run `npm test` and `npm run build` (and `npm run test:e2e` for
user-facing flows) before considering a task complete.
