# Concepts

Calara is a **presentational** calendar kit. You own dates, filters, search, and event arrays. The library draws boards and pickers; it never fetches or stores server state.

## Controlled state model

Every interactive surface is controlled:

| Concern | Typical host state | Passed as |
|---------|-------------------|-----------|
| Visible day / week / month anchor | `currentDate: Date` | `currentDate` + `onDateChange` |
| Board tab | `view: DsCalendarView` | `view` + `onViewChange` |
| Category toggles | `filters: DsCalendarFilters` | `filters` + `onFilterChange` |
| Sidebar visibility | `sidebarOpen: boolean` | `sidebarOpen` + `onToggleSidebar` |
| Toolbar search string | `search?: string` | `search` + `setSearch` |
| Events | your API / store | `dayEvents` / `weekEvents` / `monthEvents` |

```tsx
const [view, setView] = useState<DsCalendarView>('day');
const [currentDate, setCurrentDate] = useState(() => new Date());
const [filters, setFilters] = useState(DEFAULT_DS_CALENDAR_FILTERS);
```

> **Tip:** Keep one `currentDate` for the shell and board. Toolbar prev/next, mini calendar, and view tabs all mutate that same anchor.

## Minutes from midnight

Timed events store clock position as **integers** — minutes since local midnight (`0` … `1439`). Pixel layout and range labels are derived from those integers so a card can never claim one time while rendering another.

```ts
const startMinutes = 9 * 60 + 30; // 09:30
const endMinutes = 10 * 60 + 15;  // 10:15
```

Helpers live in the time core:

```ts
import {
  minutesOfDay,
  hourOfMinutes,
  formatTimeRange,
  formatTimeOfDay,
} from '@persianstudio/calara';

minutesOfDay(new Date());           // e.g. 845 for 14:05
hourOfMinutes(startMinutes);        // 9
formatTimeRange(startMinutes, endMinutes); // "09:30 am - 10:15 am"
```

> **Warning:** Never store a parallel display string next to `startMinutes` / `endMinutes`, and never parse a rendered label back into dates. Use [`meetingDetailsFrom*`](./events#meeting-details-mappers) when opening the meeting drawer.

Reminders are the exception on the day board: they sit in an **hour row** (`hour: 0–23`) with no range.

## ISO weeks (Monday start)

Week boards, mini calendar columns, and month grids use **ISO weeks**: Monday is day 0 / first column, Sunday is last.

```ts
import { startOfWeek, getWeekDays } from '@persianstudio/calara';

const monday = startOfWeek(new Date()); // Monday 00:00 local
const days = getWeekDays(new Date());   // [Mon … Sun]
```

Week events place themselves with `dayIndex: 0–6` (Monday = 0).

## Filters

Filter keys map 1:1 to day-event kinds:

| Filter key | Day event `type` |
|------------|------------------|
| `ICE_CALLS` | `ice_call` |
| `IN_PERSON_MEETINGS` | `in_person_meeting` |
| `TASKS` | `task` |
| `REMINDERS` | `reminder` |

Week and month boards only show ICE + in-person; task / reminder filters have no effect there.

```ts
import {
  DEFAULT_DS_CALENDAR_FILTERS,
  enabledDsCalendarFilters,
  type DsCalendarFilters,
} from '@persianstudio/calara';

const filters: DsCalendarFilters = { ...DEFAULT_DS_CALENDAR_FILTERS, TASKS: false };
const enabled = enabledDsCalendarFilters(filters);
// → ['ICE_CALLS', 'IN_PERSON_MEETINGS', 'REMINDERS']
```

Pass `enabled` into `DsCalendarBoard` as `enabledFilters`.

## Event kinds

| Kind | Day | Week | Month |
|------|-----|------|-------|
| `ice_call` | ✓ | ✓ | ✓ |
| `in_person_meeting` | ✓ (+ travel / location) | ✓ | ✓ |
| `task` | ✓ | — | — |
| `reminder` | ✓ | — | — |

Full TypeScript shapes: [Events](./events).

## Presentational boards — no fetching

`DsCalendarBoard` and the view components render whatever arrays you pass. They do not:

- call APIs
- manage React Query / Redux
- paginate or cache

Use [`calendarRangeForView`](../api/core) when you need the visible UTC window for your own query:

```ts
import { calendarRangeForView } from '@persianstudio/calara';

const { filter_from, filter_to } = calendarRangeForView(view, currentDate);
// fetch events for [filter_from, filter_to], then map into board shapes
```

## Composition snapshot

```text
Host app state
    │
    ├─ DsCalendar          toolbar + optional sidebar
    │       └─ children → DsCalendarBoard
    │                         ├─ DayView
    │                         ├─ WeekView
    │                         └─ MonthView
    ├─ DsDatePicker        standalone or inside drawers
    └─ DsMeetingDetailsDrawer / DsCalendarDrawer
```

## Next

- [Calendar shell](./calendar)
- [Views](./views)
- [Core date](./core-date) · [Core time](./core-time)
