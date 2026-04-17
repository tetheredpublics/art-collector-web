# Contributing

## Branch & Commit Workflow

### Branches

- Create a **short-lived feature branch** for every change, branched from `main`.
- Name branches with a prefix and a slug:
  - `feat/add-collection-search` — new feature
  - `fix/testimonial-type-errors` — bug fix
  - `chore/update-dependencies` — maintenance / tooling
  - `docs/improve-readme` — documentation only
- Keep branches small and focused — one logical change per branch.
- Delete branches after merging.

### Commits

- Write clear, imperative commit messages: `Fix null check in error page`, not `fixed stuff`.
- Keep commits atomic — each commit should compile and pass lint/check on its own.
- Prefix the subject line when helpful:
  - `feat:` / `fix:` / `chore:` / `docs:` / `refactor:` / `style:` / `test:`
- Keep the subject line under 72 characters. Add a body for context when the "why" isn't obvious.

### Before pushing

Run all three checks and fix any failures before pushing:

```bash
npm run lint
npm run check
npm run build
```

Also run `npm run format` if you've edited source files — the lint step will catch unformatted code.

### Pull Requests

- Open a PR against `main` for every branch.
- PR title should match the branch purpose — e.g. `feat: Add collection search`.
- Include a short description of **what** changed and **why**.
- Keep PRs small and reviewable — if a change grows large, split it into stacked PRs.
- Request a review before merging.
- Squash-merge to keep `main` history clean.
