# Getting started

**calara** (`@persianstudio/calara`) is a React calendar and date-picker library. It ships day / week / month boards, a mini calendar, drawers, and a local date/time core.

Peers are **React 18/19 only** — no MUI, no moment, no date-fns, no runtime dependencies.

Live demo: [Showcase](https://persianstudio.github.io/calara/showcase/)

## Install

```bash
pnpm add @persianstudio/calara
# npm i @persianstudio/calara
# yarn add @persianstudio/calara
```

Peer dependencies (install if your app does not already have them):

```bash
pnpm add react react-dom
```

The npm package ships compiled `dist/` (JS, types, CSS) plus license/READMEs — **not** the showcase or this docs source tree.

## Import CSS once

Styles must load for boards and pickers to look correct. Import the stylesheet **once** at your app entry (or any root layout):

```ts
import '@persianstudio/calara/styles.css';
```

> **Tip:** Importing from `@persianstudio/calara` also pulls in the CSS as a side effect. Prefer the explicit `styles.css` entry so bundlers and SSR setups stay predictable. Do not import it in every component.

## Minimal calendar

Own the state yourself — calara is presentational. Compose `DsCalendar` (shell) with `DsCalendarBoard` (day / week / month):

```tsx
import { useState } from 'react';
import {
  DsCalendar,
  DsCalendarBoard,
  DEFAULT_DS_CALENDAR_FILTERS,
  DEFAULT_DS_CALENDAR_VIEW,
  enabledDsCalendarFilters,
  type DsCalendarFilters,
  type DsCalendarView,
} from '@persianstudio/calara';
import '@persianstudio/calara/styles.css';

export function App() {
  const [view, setView] = useState<DsCalendarView>(DEFAULT_DS_CALENDAR_VIEW);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [filters, setFilters] = useState<DsCalendarFilters>(DEFAULT_DS_CALENDAR_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState<string | undefined>();

  return (
    <DsCalendar
      view={view}
      onViewChange={setView}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      search={search}
      setSearch={setSearch}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((o) => !o)}
      filters={filters}
      onFilterChange={(id, checked) =>
        setFilters((f) => ({ ...f, [id]: checked }))
      }
    >
      <DsCalendarBoard
        view={view}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        dayEvents={[]}
        weekEvents={[]}
        monthEvents={[]}
        enabledFilters={enabledDsCalendarFilters(filters)}
      />
    </DsCalendar>
  );
}
```

Pass real event arrays when you have data. See [Events](./events) for shapes.

## Minimal date picker

```tsx
import { useState } from 'react';
import { DsDatePicker } from '@persianstudio/calara';
import '@persianstudio/calara/styles.css';

export function DateField() {
  const [selected, setSelected] = useState<Date | null>(new Date());

  return (
    <DsDatePicker
      variant="field"
      inputLabel="Meeting date"
      selected={selected}
      onChange={(d) => setSelected(d instanceof Date || d === null ? d : null)}
      dateFormat="dd MMM yyyy"
    />
  );
}
```

## TypeScript

The package ships `.d.ts` next to the bundles. Import types from the same entry:

```ts
import type {
  CalendarDayEvent,
  CalendarWeekEvent,
  CalendarMonthEvent,
  CalendarMeetingDetails,
  DsCalendarView,
  DsCalendarFilters,
  DsDatePickerProps,
} from '@persianstudio/calara';
```

No extra `@types` package is required beyond React’s own types.

## What you do *not* get

| Not included | Why |
|--------------|-----|
| Network / fetching | Boards are presentational — you load events |
| MUI / Emotion | Plain HTML + CSS |
| moment / date-fns / Day.js | Built-in `core/date` + `core/time` |
| Locale packs | English labels by default; localize in the host |

## Next steps

- [Concepts](./concepts) — controlled state, minutes-from-midnight, filters
- [Calendar shell](./calendar) — toolbar, sidebar, composition
- [Date picker](./date-picker) — field, inline, time-only
- [Showcase](https://persianstudio.github.io/calara/showcase/) — interactive demo
