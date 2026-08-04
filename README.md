# @persianstudio/calara

Zero-dependency React **calendar** and **date picker** (React / ReactDOM peers only).

- Day / week / month boards, scrubber, filters, mini calendar, drawers
- Local date & time core (no `moment` / `date-fns` / `react-datepicker`)
- Plain HTML + CSS UI

Live showcase: [persianstudio.github.io/calara](https://persianstudio.github.io/calara/)

## Install

```bash
pnpm add @persianstudio/calara
```

```ts
import '@persianstudio/calara/styles.css';
```

## Layout

```
src/
  core/date     # pure date helpers
  core/time     # timed-grid minutes ↔ pixels
  types/        # views, filters, events
  utils/        # range, ids, mappers
  hooks/        # scrubber
  components/
    calendar/   # boards, drawers, mini calendar
    date-picker/# local popover picker
  styles/
```

## Quick start

```tsx
import { useState } from 'react';
import {
  DsCalendar,
  DsCalendarBoard,
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
      <DsCalendarBoard view={view} currentDate={currentDate} dayEvents={[]} weekEvents={[]} monthEvents={[]} />
    </DsCalendar>
  );
}
```

## Local development

```bash
pnpm install
pnpm dev
pnpm build
pnpm build:showcase
```

## License

MIT © Persian Studio
