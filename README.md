# @persianstudio/calara

<p align="center">
  <img src="docs/public/logo.svg" alt="calara" width="96" height="96" />
</p>

Zero-dependency **React calendar** and **date picker**.

Day / week / month boards · time scrubber · mini calendar · drawers · local date core.  
**React peers only** — no MUI, moment, date-fns, or react-datepicker.

| | |
|---|---|
| **Docs** | [persianstudio.github.io/calara/docs](https://persianstudio.github.io/calara/docs/) |
| **Live showcase** | [persianstudio.github.io/calara/showcase](https://persianstudio.github.io/calara/showcase/) |
| **npm** | [`@persianstudio/calara`](https://www.npmjs.com/package/@persianstudio/calara) |

---

## Install

```bash
pnpm add @persianstudio/calara
# or: npm i @persianstudio/calara
```

Import styles **once** in your app entry:

```ts
import '@persianstudio/calara/styles.css';
```

Peers: `react` and `react-dom` (^18 or ^19).

---

## Quick start

```tsx
import { useState } from 'react';
import {
  DsCalendar,
  DsCalendarBoard,
  DsDatePicker,
  DEFAULT_DS_CALENDAR_FILTERS,
  DEFAULT_DS_CALENDAR_VIEW,
  type DsCalendarFilters,
  type DsCalendarView,
} from '@persianstudio/calara';
import '@persianstudio/calara/styles.css';

export function App() {
  const [view, setView] = useState<DsCalendarView>(DEFAULT_DS_CALENDAR_VIEW);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<DsCalendarFilters>(DEFAULT_DS_CALENDAR_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState<string | undefined>();

  return (
    <>
      <DsDatePicker
        selected={currentDate}
        onChange={(d) => d instanceof Date && setCurrentDate(d)}
        inputLabel="Jump to date"
      />

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
        onFilterChange={(id, checked) => setFilters((f) => ({ ...f, [id]: checked }))}
      >
        <DsCalendarBoard
          view={view}
          currentDate={currentDate}
          dayEvents={[]}
          weekEvents={[]}
          monthEvents={[]}
        />
      </DsCalendar>
    </>
  );
}
```

Boards are **presentational** — you fetch data and map it into event types. Timed events store **minutes from midnight**; labels and pixel positions are always derived.

---

## What’s included

| Area | Exports |
|------|---------|
| Shell | `DsCalendar`, `DsCalendarToolbar`, `DsCalendarSidebar` |
| Board | `DsCalendarBoard`, day / week / month views |
| Pickers | `DsDatePicker`, `DsMiniCalendar` |
| Drawers | `DsCalendarDrawer`, `DsMeetingDetailsDrawer` |
| Core | Local `formatDate`, `startOfWeek`, `addDays`, time-grid math… |
| Utils | `calendarRangeForView`, meeting mappers, board ids |

Full guide: [Getting started](https://persianstudio.github.io/calara/docs/guide/getting-started)

---

## Local development

```bash
pnpm install
pnpm dev            # showcase → http://localhost:5181
pnpm docs:dev       # docs     → http://localhost:5182
pnpm build          # library → dist/
pnpm build:showcase
pnpm docs:build
pnpm build:pages    # assemble docs + showcase for GitHub Pages
```

---

## License

MIT © [Persian Studio](https://github.com/PersianStudio)
