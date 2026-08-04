# GitHub Pages hosting

Calara publishes **docs** and an interactive **showcase** under the project Pages base path:

| URL | Content |
|-----|---------|
| https://persianstudio.github.io/calara/ | Redirect → `/calara/docs/` |
| https://persianstudio.github.io/calara/docs/ | VitePress documentation |
| https://persianstudio.github.io/calara/showcase/ | Interactive demo app |

> Project Pages always include the repo name (`/calara/…`). There is no bare `persianstudio.github.io/docs` path from this repository — use `/calara/docs/`.

## Deploy pipeline

Typical workflow (`.github/workflows/pages.yml` when present):

1. `pnpm build` — library  
2. `pnpm build:showcase` — Vite app with `base: /calara/showcase/` → `showcase-dist/`  
3. `pnpm docs:build` — VitePress with `base: /calara/docs/` → `docs-dist/`  
4. Assemble `pages-dist/`:
   - `pages-dist/docs/` ← documentation  
   - `pages-dist/showcase/` ← demo  
   - `pages-dist/index.html` ← redirect to `/calara/docs/`  
5. Upload `pages-dist` and deploy  

## Local

```bash
pnpm docs:dev          # docs with base /calara/docs/ (when scripted)
pnpm dev               # showcase (see vite.showcase.config.ts for base)
pnpm build:showcase
pnpm build             # library
```

## Paths to remember

| Artifact | Base path |
|----------|-----------|
| Docs | `/calara/docs/` |
| Showcase | `/calara/showcase/` |
| Site root | redirect → docs |

Live showcase link used in guides: [https://persianstudio.github.io/calara/showcase/](https://persianstudio.github.io/calara/showcase/)

## Checklist after deploy

1. Confirm https://persianstudio.github.io/calara/docs/ loads  
2. Confirm https://persianstudio.github.io/calara/showcase/ runs the demo  
3. Confirm root URL redirects into docs  
4. Smoke-test a guide deep link (e.g. `/calara/docs/guide/getting-started`)  

## Related

- [Publishing](./publishing)  
- [Architecture](./architecture)  
