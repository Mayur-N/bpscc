# Content Management Guide (Black Panthers CC website)

This site uses a **JSON-backed, developer-free content system**. There are two ways
to edit content — pick whichever is available to you:

1. **The Admin UI** (`/admin`) — a password-protected, form-based editor in the
   browser. No file editing, no JSON syntax to get wrong. See
   [Editing content via the Admin UI](#editing-content-via-the-admin-ui) below.
2. **Editing the JSON files directly** under `src/content/` — always available as a
   fallback, e.g. via GitHub's web editor. See [Editing the JSON files directly](#editing-the-json-files-directly).

> After editing content (either way), the site needs to be rebuilt/redeployed (or
> restarted in dev with `npm run dev`) to pick up changes, since content is read at
> build time.

## Editing content via the Admin UI

The Admin UI lets a non-technical committee member update content through a normal
web form — no code, no JSON, no git required for the editing step itself.

1. Ask a developer to set two environment variables on the server that runs the site
   (see [`.env.example`](.env.example)): `ADMIN_PASSWORD` (the login password) and
   `ADMIN_SESSION_SECRET` (any long random string). The Admin UI is disabled until
   both are set.
2. Go to `/admin` on the running site and log in with `ADMIN_PASSWORD`.
3. Pick a section (Club Info, Squad, Fixtures, Results, Events, Gallery, Sponsors,
   Committee, etc.), edit the fields, use **+ Add item** / **Remove** to add or delete
   entries, then click **Save changes**.
4. Saved changes are written straight to the same `src/content/*.json` files described
   below. If the site auto-deploys from a server with a persistent, writable
   filesystem, changes can go live on the next deploy; otherwise a developer commits
   and pushes the updated files to publish them.

> **Important:** the Admin UI needs a Node server with filesystem write access, so it
> only works on the "Node-capable host" deployment option — it is not available on the
> static GitHub Pages export (see the "Hosting" section of `README.md`).

## Editing the JSON files directly

All editable content lives in plain JSON files under `src/content/`. No coding
experience is required — just open the file in any text editor (or GitHub's web
editor), change the values between the quotes, and save.

## Files and what they control

| File | Controls |
| --- | --- |
| `club.json` | Club name, tagline, history, mission/vision, values, home ground, training times, stats, social links |
| `next-match.json` | The "next fixture" banner shown at the top of the homepage |
| `committee.json` | Leadership & committee member cards |
| `players.json` | Squad roster and player stats |
| `fixtures.json` | Upcoming matches |
| `results.json` | Past match results |
| `events.json` | Upcoming club events |
| `gallery.json` | Media gallery items |
| `reels.json` | Video reels / highlights |
| `sponsors.json` | Sponsor logos and tiers |

## Editing rules

1. Keep the file structure (the `{ }` and `[ ]` brackets) exactly as-is —
   only change the text between quotes.
2. Every entry needs a unique `id` (e.g. `"p9"`, `"f5"`) — just increment the
   last used number when adding a new one.
3. Dates use the format `YYYY-MM-DD` (e.g. `"2026-11-02"`).
4. To add a new player/fixture/event/etc., copy an existing `{ ... }` block,
   paste it before the closing `]`, and edit the values.

## Adding real photos

Player, committee, and gallery photos currently render as generated initials/
icons so the site works without placeholder image files. To use real photos:

1. Add the image file to `public/images/...`.
2. Add a `"photo": "/images/your-file.jpg"` field to the matching JSON entry.
3. Update the corresponding card component to render an `<Image>` when `photo`
   is present (ask a developer for this one-time change).

## Club logo

The crest shown in the navbar, footer, and browser tab is read from
`public/images/logo.png`. Add (or replace) that exact file to update the logo
site-wide — no code changes needed.

## Color theme

The site's colors (black/charcoal background, gold accent, crimson highlight)
are defined once in `src/app/globals.css` under `:root`. Change the hex
values there to re-theme the whole site.

## Upgrading to a full headless CMS later

This structure is intentionally compatible with a future migration to a
headless CMS (Sanity, Prismic, etc.) — each JSON file maps 1:1 to a future
content type/schema, so migrating later means pointing the same
`src/lib/content.ts` getters at the CMS API instead of local JSON.
