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

A `.env` file at the project root is needed with these private values:

- `API_KEY` — used by `/c/[content_token]` route to call `api.artcollectorapp.net`
- `MIXPANEL_TOKEN` — used by `/api/mixpanel` endpoint
- `BACKEND_API_URL` — base URL for homepage stats and `/news/highlights` server-side fetches
- `ART_COLLECTOR_API_URL` — base URL for `/c/[content_token]` server-side shortlink fetches

`BACKEND_API_URL` and `ART_COLLECTOR_API_URL` must be set (they can use the production URL values) so server routes can build and run. `API_KEY` and `MIXPANEL_TOKEN` are the sensitive values; without real secrets, the homepage/static pages still render, but the share page (`/c/...`) and analytics endpoint will fail.

### Git workflow

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full branch, commit, and PR conventions. Key points for agents:

- Branch from `main` with a prefixed name (`feat/`, `fix/`, `chore/`, `docs/`).
- Make small, atomic commits with clear imperative messages.
- Run `npm run lint`, `npm run check`, and `npm run build` before pushing — all three must pass.
- Open a PR against `main` with a descriptive title and short summary of what/why.

### Notes

- All three checks (`lint`, `check`, `build`) pass cleanly.
- `static/privacy.html` is excluded from Prettier via `.prettierignore` (auto-generated legal HTML with non-standard tags).
- The `.npmrc` has `engine-strict=true`; Node.js 22+ is required (set in `package.json` engines).
- Deploys to Netlify via `@sveltejs/adapter-netlify` (Node 22 set in `netlify.toml`).
- Homepage SSR data (`/+page.server.js`) fetches live stats from a remote DigitalOcean backend — this may fail or timeout if the remote API is down, but the dev server still starts.
- **Hidden pages convention**: Files named `-page.svelte` (dash prefix instead of `+`) are intentionally hidden/disabled routes. SvelteKit only recognises `+page.svelte`, so the dash prefix effectively disables the route without deleting the file. Example: `src/routes/about/-page.svelte` returns 404 on purpose. Do not "fix" these to `+page.svelte`.
