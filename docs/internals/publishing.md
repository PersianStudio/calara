# Publishing to npm

Guide for releasing `@persianstudio/calara`.

## Prerequisites

- Publish rights to the `@persianstudio` scope  
- `npm login` / `npm whoami`  
- Clean release branch; Node 18+ / pnpm 9  

## What gets published

Consumers must **never** receive showcase, docs sources, or TypeScript `src/`.

`package.json` → `files` allowlist:

| Path | Why |
|------|-----|
| `dist/` (JS, CJS, `.d.ts`, `calara.css`) | Bundles + types + stylesheet |
| `LICENSE` | MIT |
| `README.md` | npm page |
| `CHANGELOG.md` | Release notes |

Excluded: `src/`, `showcase/`, `showcase-dist/`, `docs/`, `docs-dist/`, sourcemaps (unless intentionally added).

Exports consumers use:

```json
"." → dist JS + types
"./styles.css" → "./dist/calara.css"
```

## Pre-flight

```bash
pnpm install
pnpm typecheck
pnpm build
pnpm build:showcase
# pnpm docs:build   # when VitePress scripts exist
```

Checklist:

- [ ] README install paths still accurate  
- [ ] Docs API pages match `src/index.ts`  
- [ ] Showcase + docs build cleanly  
- [ ] Semver bump + CHANGELOG  
- [ ] CSS entry `@persianstudio/calara/styles.css` resolves  

Optional dry-run:

```bash
npm publish --dry-run
# or: pnpm pack && tar -tf …
```

## Publish

```bash
pnpm publish --access public   # first scoped release / ensure public
pnpm publish                   # later (publishConfig.access is public)
```

## After publish

1. Confirm the npm page for `@persianstudio/calara`  
2. Smoke-test install in a throwaway app (import component + `styles.css`)  
3. Confirm GitHub Pages redeployed docs + showcase  
4. Tag the GitHub release if needed  

## Related

- [Contributing](./contributing)  
- [GitHub Pages](./github-pages)  
- [API overview](../api/overview)  
