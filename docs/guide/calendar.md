# Calendar shell

`DsCalendar` is the full-page shell: toolbar, main board slot (`children`), and an optional sidebar. Pair it with `DsCalendarBoard` for day / week / month routing.

## Composition

```tsx
import {
  DsCalendar,
  DsCalendarBoard,
  DEFAULT_DS_CALENDAR_FILTERS,
  DEFAULT_DS_CALENDAR_VIEW,
  enabledDsCalendarFilters,
  type CalendarDayEvent,
  type CalendarMonthEvent,
  type CalendarWeekEvent,
  type DsCalendarFilters,
  type DsCalendarView,
} from '@persianstudio/calara';

function CalendarPage({
  dayEvents,
  weekEvents,
  monthEvents,
}: {
  dayEvents: CalendarDayEvent[];
  weekEvents: CalendarWeekEvent[];
  monthEvents: CalendarMonthEvent[];
}) {
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
      holidays={[
        { id: 'h1', label: 'Staff development day' },
        { id: 'h2', label: 'Public holiday' },
      ]}
    >
      <DsCalendarBoard
        view={view}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        dayEvents={dayEvents}
        weekEvents={weekEvents}
        monthEvents={monthEvents}
        enabledFilters={enabledDsCalendarFilters(filters)}
        onMeetingClick={(meeting) => openMeetingDrawer(meeting)}
        onEmptySlotClick={(slot) => startCreateMeeting(slot)}
        onReminderToggle={(id, completed) => patchReminder(id, completed)}
      />
    </DsCalendar>
  );
}
```

Both roots render under the `.calara` class so [CSS variables](./styling) apply.

## Toolbar

`DsCalendarToolbar` (used inside `DsCalendar`) provides:

| Control | Behavior |
|---------|----------|
| Prev / Next | Shifts `currentDate` by one day, week, or month depending on `view` |
| Inline date picker | `DsDatePicker` `variant="inlineText"` to jump to a date |
| Today | Resets to `new Date()` |
| Day / Week / Month tabs | Calls `onViewChange` (`list` is reserved, not shown) |
| Search input | Controlled via `search` / `setSearch` — **host filters events**; the board does not search internally |
| Sidebar toggle | `onToggleSidebar` |

You can also mount `DsCalendarToolbar` alone if you build a custom layout.

## Sidebar

When `sidebarOpen` is true, `DsCalendar` mounts `DsCalendarSidebar`:

1. **Mini calendar** (`DsMiniCalendar`) — jump within the month; weeks start Monday  
2. **Holidays** — optional list of `{ id, label }` (shows two, expand for more)  
3. **Filters** — checkboxes from `DS_CALENDAR_FILTER_OPTIONS`

```ts
import type { Holiday } from '@persianstudio/calara';

const holidays: Holiday[] = [
  { id: 'ny', label: 'New Year’s Day' },
];
```

## View switching

```ts
type DsCalendarView = 'day' | 'week' | 'month' | 'list';
```

`DsCalendarBoard` renders:

- `day` → `DsCalendarDayView`
- `week` → `DsCalendarWeekView`
- `month` → `DsCalendarMonthView`
- anything else (including reserved `list`) → empty board placeholder

Coerce URL / storage strings safely:

```ts
import { parseDsCalendarBoardTab } from '@persianstudio/calara';

const tab = parseDsCalendarBoardTab(searchParams.get('tab'));
// 'day' | 'week' | 'month' — unknown → 'day'
```

## Search

The toolbar search is a controlled string for **your** filtering pipeline (title match, remote query, etc.). Wire it before you pass events into the board:

```tsx
const visibleDay = useMemo(() => {
  if (!search) return dayEvents;
  const q = search.toLowerCase();
  return dayEvents.filter((e) => e.title.toLowerCase().includes(q));
}, [dayEvents, search]);

<DsCalendarBoard dayEvents={visibleDay} /* … */ />
```

## Holidays

Holidays are display-only labels in the sidebar. They do not block slots or alter the grid. Pass them only when you have copy to show; omit or pass `[]` to hide the section.

## Pieces for custom layouts

| Export | Role |
|--------|------|
| `DsCalendar` | Shell: toolbar + children + sidebar |
| `DsCalendarBoard` | View router |
| `DsCalendarToolbar` | Standalone top bar |
| `DsCalendarSidebar` | Standalone aside |
| `DsMiniCalendar` | Compact month navigator |
| `DsCalendarFilterList` / `DsCalendarHolidays` | Sidebar sections |

## Next

- [Views](./views) — scrubber, empty slots, travel time  
- [Drawers](./drawers) — slide-over calendar and meeting details  
- [API: components](../api/components)
