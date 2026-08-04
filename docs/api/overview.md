# API overview

All public exports come from `@persianstudio/calara`.

```ts
import {
  // Components
  DsCalendar,
  DsCalendarBoard,
  DsCalendarToolbar,
  DsCalendarSidebar,
  DsCalendarFilterList,
  DsCalendarHolidays,
  DsMiniCalendar,
  DsCalendarDayView,
  DsCalendarWeekView,
  DsCalendarMonthView,
  DsCalendarDrawer,
  DsMeetingDetailsDrawer,
  DsDatePicker,

  // Constants / filter helpers
  DEFAULT_DS_CALENDAR_VIEW,
  DEFAULT_DS_CALENDAR_FILTERS,
  DS_CALENDAR_FILTER_OPTIONS,
  parseDsCalendarBoardTab,
  enabledDsCalendarFilters,
  defaultEnabledDsCalendarFilters,
  dayEventHour,

  // Utils
  calendarRangeForView,
  calendarBoardOccurrenceId,
  calendarMasterEventId,
  meetingDetailsFromDayEvent,
  meetingDetailsFromWeekEvent,
  meetingDetailsFromMonthEvent,

  // Core date + time (see groups below)
  formatDate,
  startOfWeek,
  minutesOfDay,
  formatTimeRange,
  // …
} from '@persianstudio/calara';

import type {
  DsCalendarProps,
  DsCalendarBoardProps,
  DsDatePickerProps,
  DsDatePickerVariant,
  DsCalendarView,
  DsCalendarFilters,
  CalendarDayEvent,
  CalendarWeekEvent,
  CalendarMonthEvent,
  CalendarMeetingDetails,
  CalendarEmptySlotSelection,
  MeetingDetailsFormValue,
  Holiday,
} from '@persianstudio/calara';

import '@persianstudio/calara/styles.css';
```

Internal modules under `src/` may move; **`src/index.ts` is the stability contract**.

## Components

| Export | Role |
|--------|------|
| `DsCalendar` | Shell: toolbar + children + sidebar |
| `DsCalendarBoard` | Day / week / month router |
| `DsCalendarToolbar` | Prev/next, tabs, search, sidebar toggle |
| `DsCalendarSidebar` | Mini calendar, holidays, filters |
| `DsCalendarFilterList` | Filter checkboxes |
| `DsCalendarHolidays` | Holiday list |
| `DsMiniCalendar` | Compact month navigator |
| `DsCalendarDayView` | Timed day board |
| `DsCalendarWeekView` | ISO week board |
| `DsCalendarMonthView` | Month chip grid |
| `DsCalendarDrawer` | Slide-over calendar |
| `DsMeetingDetailsDrawer` | Meeting editor drawer |
| `DsDatePicker` | Date / time popover |

`DsCalendarTimeIndicator` powers the scrubber inside day/week views; it is not re-exported from the package root.

## Types

View / filters, day / week / month events, meeting details, empty slot, picker props, drawer props — see [Types](./types).

## Constants

| Export | Meaning |
|--------|---------|
| `DEFAULT_DS_CALENDAR_VIEW` | `'day'` |
| `DEFAULT_DS_CALENDAR_FILTERS` | all categories `true` |
| `DS_CALENDAR_FILTER_OPTIONS` | checkbox labels |
| `parseDsCalendarBoardTab` | coerce string → board tab |
| `enabledDsCalendarFilters` | keys currently on |
| `defaultEnabledDsCalendarFilters` | enabled keys for defaults |
| `dayEventHour` | hour row for a day event |
| Time constants | `MINUTES_PER_HOUR`, `HOUR_HEIGHT`, … |

## Core

Date helpers (`formatDate`, `startOf*`, `add*`, grids, `toUtcIsoString`) and time helpers (minutes math, formatters, grid layout). Full list: [Core](./core). Guides: [core-date](../guide/core-date), [core-time](../guide/core-time).

## Utils

| Export | Purpose |
|--------|---------|
| `calendarRangeForView` | UTC ISO `{ filter_from, filter_to }` for the visible board |
| `calendarBoardOccurrenceId` | React key for recurring rows |
| `calendarMasterEventId` | strip occurrence suffix |
| `meetingDetailsFromDayEvent` | day → drawer payload |
| `meetingDetailsFromWeekEvent` | week → drawer payload |
| `meetingDetailsFromMonthEvent` | month → drawer payload |

## Hooks

Day/week scrubber logic lives in `src/hooks` (`useCalendarTimeScrubber`, `scrubberInitialMinutes`) and is used by the published views. It is **not** currently re-exported from `@persianstudio/calara`; treat it as an internal extension point when working from source.

## Where to go next

| Page | Contents |
|------|----------|
| [Components](./components) | Props tables |
| [Types](./types) | Event unions, filters, meeting details |
| [Core](./core) | Date + time signatures |
