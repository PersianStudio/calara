# @persianstudio/calara

React **calendar** and **date picker** components extracted from the ICE design system for [Persian Studio](https://github.com/PersianStudio).

Live showcase: [persianstudio.github.io/calara](https://persianstudio.github.io/calara/)

## Install

```bash
pnpm add @persianstudio/calara
```

Peer: `react` / `react-dom` ^18 or ^19. Runtime deps include MUI 5, `@mui/x-date-pickers`, `react-datepicker`, `date-fns`, and `moment`.

## Quick start

```tsx
import { useState } from 'react';
import {
  CalaraProvider,
  DsCalendar,
  DsCalendarBoard,
  DsDatePicker,
  DEFAULT_DS_CALENDAR_FILTERS,
  DEFAULT_DS_CALENDAR_VIEW,
  type DsCalendarFilters,
  type DsCalendarView,
} from '@persianstudio/calara';

export function App() {
  const [view, setView] = useState<DsCalendarView>(DEFAULT_DS_CALENDAR_VIEW);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filters, setFilters] = useState<DsCalendarFilters>(DEFAULT_DS_CALENDAR_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState<string | undefined>();
  const [picked, setPicked] = useState<Date | null>(new Date());

  return (
    <CalaraProvider>
      <DsDatePicker selected={picked} onChange={(d) => setPicked(d as Date)} />
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
          filters={filters}
          dayEvents={[]}
          weekEvents={[]}
          monthEvents={[]}
        />
      </DsCalendar>
    </CalaraProvider>
  );
}
```

Wrap the tree in `CalaraProvider` (theme + LocalizationProvider + icon font).

## What’s included

| Export | Role |
|--------|------|
| `CalaraProvider` | ICE-like MUI CssVars theme, date-fns adapter, icon CSS |
| `DsCalendar` | Toolbar + board card + sidebar chrome |
| `DsCalendarBoard` | Day / week / month view switch |
| `DsMiniCalendar` | Compact month navigator (`@mui/x-date-pickers`) |
| `DsCalendarDrawer` / `DsMeetingDetailsDrawer` | Side drawers |
| `DsDatePicker` | Field / inline triggers over `react-datepicker` |
| Event types + mappers | Day / week / month event shapes |

## Local development

```bash
pnpm install
pnpm dev            # showcase on http://localhost:5181
pnpm build          # library → dist/
pnpm build:showcase # static site → showcase-dist/ (GitHub Pages)
```

## License

MIT © Persian Studio
