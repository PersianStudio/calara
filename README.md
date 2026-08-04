# @persianstudio/calara

React **calendar** and **date picker** focused on behavior: day / week / month boards, scrubber, filters, mini calendar, drawers. UI is plain HTML/CSS (no MUI). Custom theming comes later.

Live showcase: [persianstudio.github.io/calara](https://persianstudio.github.io/calara/)

## Install

```bash
pnpm add @persianstudio/calara
```

Peers: `react` / `react-dom`. Runtime deps: `date-fns`, `moment`, `react-datepicker`.

Import styles once:

```ts
import '@persianstudio/calara/styles.css';
```

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
  );
}
```

## Local development

```bash
pnpm install
pnpm dev            # http://localhost:5181
pnpm build
pnpm build:showcase
```

## License

MIT © Persian Studio
