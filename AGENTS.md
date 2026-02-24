# AGENTS.md

## Cursor Cloud specific instructions

This is a SvelteKit 2.x marketing website (Svelte 4, Vite 5, Tailwind CSS 3.4) for the "Art Collector" mobile app. It has no local database, no Docker, and no backend to run locally. All API calls target remote services.

### Quick reference

| Task         | Command                            |
| ------------ | ---------------------------------- |
| Install deps | `npm install`                      |
| Dev server   | `npm run dev` (Vite on port 5173)  |
| Build        | `npm run build`                    |
| Lint         | `npm run lint` (Prettier + ESLint) |
| Type check   | `npm run check` (svelte-check)     |
| Format       | `npm run format`                   |

### Environment variables

A `.env` file at the project root is needed with two private keys:

- `API_KEY` — used by `/c/[content_token]` route to call `api.artcollectorapp.net`
- `MIXPANEL_TOKEN` — used by `/api/mixpanel` endpoint

Without real values, the homepage and static pages (`/collections`, `/download`, `/referral-terms`) still render correctly. Only the share page (`/c/...`) and analytics endpoint require valid secrets.

### Notes

- All three checks (`lint`, `check`, `build`) pass cleanly.
- `static/privacy.html` is excluded from Prettier via `.prettierignore` (auto-generated legal HTML with non-standard tags).
- The `.npmrc` has `engine-strict=true`; Node.js 22+ is required (set in `package.json` engines).
- Deploys to Netlify via `@sveltejs/adapter-netlify` (Node 22 set in `netlify.toml`).
- Homepage SSR data (`/+page.server.js`) fetches live stats from a remote DigitalOcean backend — this may fail or timeout if the remote API is down, but the dev server still starts.
- The `/about` route intentionally uses `-page.svelte` (not `+page.svelte`) and returns 404.
