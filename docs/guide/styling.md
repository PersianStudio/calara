# Styling

Calara UI is plain HTML + one stylesheet. There is **no MUI**, Emotion, or CSS-in-JS runtime.

## Import once

```ts
import '@persianstudio/calara/styles.css';
```

Do this at the application entry (or root layout). Importing the package main entry also side-effects the CSS, but the dedicated `styles.css` export is the recommended, explicit path.

> **Warning:** Importing the CSS in every feature module can duplicate rules and confuse SSR/hydration. One import is enough.

Package export map:

```json
"@persianstudio/calara/styles.css" → "./dist/calara.css"
```

## Root class and variables

Interactive roots use `.calara` (shell, drawers) or `.calara-datepicker`. Tokens live on `.calara`:

```css
.calara {
  --calara-border: #d0d7de;
  --calara-muted: #656d76;
  --calara-text: #1f2328;
  --calara-bg: #fff;
  --calara-surface: #f6f8fa;
  --calara-accent: #0969da;
  --calara-accent-soft: #ddf4ff;
  --calara-danger: #cf222e;
  --calara-ice: #0969da;
  --calara-inperson: #1a7f37;
  --calara-task: #9a6700;
  --calara-reminder: #8250df;
  --calara-travel: #bf8700;
}
```

Override after importing the package CSS:

```css
.calara {
  --calara-accent: #0b6bcb;
  --calara-ice: #0b6bcb;
  --calara-inperson: #0f7a3a;
}
```

Scope overrides to a wrapper that contains the calendar if you need multiple themes on one page.

## Class prefixes

| Prefix | Area |
|--------|------|
| `calara-shell` / `calara-main` | Full calendar layout |
| `calara-toolbar` | Top bar |
| `calara-sidebar` | Filters / mini calendar |
| `calara-board` / `calara-timed` | Boards |
| `calara-event` / `calara-scrubber` | Cards + scrubber |
| `calara-mini` | Mini month |
| `calara-datepicker` | Date picker |
| `calara-drawer-*` | Slide-overs |
| `calara-btn` / `calara-input` / `calara-field` | Shared controls |

Prefer variables and light wrappers over rewriting every class. Class names may gain BEM elements; treat the `calara-` prefix as the public styling surface.

## Theming later

v0.x ships one light default. A formal dark theme / density API is not part of the current contract. Until then:

1. Override the CSS variables above  
2. Add host-level rules for specific `calara-*` classes if needed  
3. Keep showcase-only fonts/icons out of the published CSS  

## Next

- [Getting started](./getting-started)
- [Architecture](../internals/architecture)
