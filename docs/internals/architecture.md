# Architecture

How calara is layered so contributors can navigate and extend it safely.

## Package layout

```text
calara/
├── src/                 # Publishable library
│   ├── core/            # Local date + timed-grid math (zero date libs)
│   ├── types/           # Views, filters, event unions
│   ├── utils/           # Range, occurrence ids, meeting mappers
│   ├── hooks/           # Scrubber (used by day/week views)
│   ├── components/
│   │   ├── calendar/    # Shell, boards, drawers, mini calendar
│   │   └── date-picker/ # Popover picker
│   ├── styles/          # calara.css
│   └── index.ts         # Public export contract
├── showcase/            # Live demo (GitHub Pages /showcase/)
├── docs/                # This VitePress site (Pages at /calara/docs/)
├── README.md
└── .github/workflows/   # Pages / CI (when present)
```

## Runtime mental model

```text
Host app (controlled state)
    │
    ├─ DsCalendar ── toolbar + sidebar
    │       └─ DsCalendarBoard
    │               ├─ DayView  ── scrubber hook + TimeIndicator
    │               ├─ WeekView ── scrubber hook + TimeIndicator
    │               └─ MonthView
    ├─ DsDatePicker
    └─ Drawers (calendar / meeting details)
            │
            └─ core/date + core/time  (labels, grids, minutes ↔ px)
```

| Area | Responsibility |
|------|----------------|
| `core/date` | Local calendar math, format tokens, ISO weeks |
| `core/time` | Minutes-from-midnight, labels, pixel mapping |
| `types/` | Public event / filter / meeting contracts |
| `utils/` | Fetch windows, recurrence keys, drawer mappers |
| `hooks/` | Interactive scrubber |
| `components/calendar/` | Boards and chrome |
| `components/date-picker/` | Field / inline / time panels |
| `styles/` | Single CSS file + variables |

## Design principles

1. **Zero runtime dependencies** — peers are React + ReactDOM only  
2. **No MUI / moment / date-fns** — plain HTML/CSS + in-repo core  
3. **Short files, one job** — views own layout; event layers own cards; helpers stay pure  
4. **Minutes are source of truth** — never store parallel display times  
5. **Presentational boards** — host fetches and filters  
6. **ISO weeks (Monday start)** everywhere grids matter  
7. **Library ≠ showcase ≠ docs** for npm — only `dist/` ships to the registry  

## Public API stability

Consumers import only from `@persianstudio/calara` (`src/index.ts`). Internal folders may move if exports stay compatible.

CSS entry: `@persianstudio/calara/styles.css` → `dist/calara.css`.

## Related

- [Contributing](./contributing)
- [Publishing](./publishing)
- [GitHub Pages](./github-pages)
- [API overview](../api/overview)
