# Contributing

Thanks for helping improve calara.

## Prerequisites

- Node 18+
- pnpm 9 (`packageManager` in `package.json`)

```bash
pnpm install
pnpm dev              # showcase
pnpm typecheck
pnpm build            # library → dist/
pnpm build:showcase   # demo → showcase-dist/
```

When VitePress scripts are wired in the repo:

```bash
pnpm docs:dev         # docs with base /calara/docs/
pnpm docs:build       # docs → docs-dist/
```

## Principles

1. Keep `src/index.ts` stable — public exports are the contract  
2. Small files — prefer focused modules (one job each)  
3. Pure helpers in `core/` for date/time math  
4. Comment the *why* (especially minutes ↔ pixels)  
5. Defaults stay English + LTR — localization is caller-owned  
6. Zero UI / date library peers in `src/` — showcase may use extra deps; they must not leak into the package  
7. Boards stay presentational — no fetching inside components  
8. Library ≠ showcase ≠ docs for npm — only `dist/` ships to the registry  

## Where to change what

| Goal | Start here |
|------|------------|
| Day / week / month boards | `src/components/calendar/*View/` |
| Shell / toolbar / sidebar | `src/components/calendar/Calendar*` |
| Drawers | `CalendarDrawer/`, `MeetingDetailsDrawer/` |
| Date picker | `src/components/date-picker/` |
| Date math | `src/core/date/` |
| Timed grid math | `src/core/time/` |
| Event types | `src/types/` |
| Mappers / range | `src/utils/` |
| Scrubber | `src/hooks/` |
| Styles | `src/styles/calara.css` |
| Demo | `showcase/` |
| Docs site | `docs/` (VitePress) |

## Structure rules

- Prefer cloning dates; never mutate caller-owned `Date` values in core helpers  
- Store times as minutes-from-midnight; derive labels with `formatTime*`  
- Weeks start Monday (`startOfWeek` / `getWeekDays`)  
- Keep CSS class names under the `calara-` prefix  

## Pull requests

- Run `pnpm typecheck && pnpm build && pnpm build:showcase` (and docs build when available)  
- Prefer focused PRs (engine vs showcase vs docs)  
- Update README + docs when public API or behavior changes  
- Do not commit `dist/`, `showcase-dist/`, or `docs-dist/`  

## License

By contributing you agree your work is released under the MIT license.
