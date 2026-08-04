# Core API

Date and time helpers exported from `@persianstudio/calara`. No moment / date-fns.

Guides: [core-date](../guide/core-date) · [core-time](../guide/core-time)

---

## Date

### Clone & parts

| Signature | Notes |
|-----------|-------|
| `cloneDate(d: Date): Date` | Shallow copy |
| `getYear(d): number` | Local year |
| `getMonth(d): number` | 0–11 |
| `getDate(d): number` | Day of month |
| `getDay(d): number` | Sun=0 … Sat=6 |
| `getHours(d): number` | 0–23 |
| `getMinutes(d): number` | 0–59 |
| `setHoursMinutes(d, hours, minutes): Date` | Clone; zeros seconds/ms |

### Compare

| Signature | Notes |
|-----------|-------|
| `isSameDay(a, b): boolean` | Local calendar day |
| `isSameMonth(a, b): boolean` | |
| `isSameIsoWeek(a, b): boolean` | Mon–Sun week |
| `isToday(d): boolean` | |

### Boundaries

| Signature | Notes |
|-----------|-------|
| `startOfDay(d): Date` | Local midnight |
| `startOfMonth(d): Date` | |
| `startOfWeek(d): Date` | Monday 00:00 ISO |
| `startOfIsoWeek(d): Date` | Alias of `startOfWeek` |
| `endOfDay(d): Date` | 23:59:59.999 |
| `endOfMonth(d): Date` | |
| `endOfWeek(d): Date` | Sunday end ISO |
| `endOfIsoWeek(d): Date` | Alias |

### Arithmetic

| Signature | Notes |
|-----------|-------|
| `addDays(d, amount): Date` | |
| `addWeeks(d, amount): Date` | |
| `addMonths(d, amount): Date` | Clamps day-of-month |
| `addMinutes(d, amount): Date` | |

### Grids & format

| Signature | Notes |
|-----------|-------|
| `getWeekDays(anchor): Date[]` | Mon→Sun midnights |
| `getMonthGridDays(anchor): Date[]` | Month matrix days |
| `formatDate(date, pattern): string` | English tokens |
| `toUtcIsoString(date): string` | `date.toISOString()` |

---

## Time

### Constants

| Name | Role |
|------|------|
| `MINUTES_PER_HOUR` | `60` |
| `MINUTES_PER_DAY` | `1440` |
| `HOUR_HEIGHT` | `80` px / hour |
| `DAY_HOUR_HEIGHT_MIN` | Empty day hour min |
| `DAY_QUARTER_CARD_HEIGHT` | 15-min card min height |
| `DAY_HOUR_HEIGHT_MAX` | Busy hour cap |

### Minutes

| Signature | Notes |
|-----------|-------|
| `wrapMinutes(minutes): number` | Into `[0, 1440)` |
| `hourOfMinutes(minutes): number` | 0–23 |
| `minutesOfDay(date): number` | Local H*60+M |
| `clampMinutesToGrid(minutes, startHour, endHour): number` | Inclusive grid clamp |

### Labels

| Signature | Example |
|-----------|---------|
| `formatHourLabel(hour): string` | `"9 am"` |
| `formatTimeOfDay(minutes): string` | `"09:05 am"` |
| `formatTimeRange(start, end): string` | `"09:00 am - 10:15 am"` |
| `formatScrubberLabel(minutes): string` | `"4 pm"` / `"4:15 pm"` |

### Grid layout

| Signature | Notes |
|-----------|-------|
| `minutesToOffset(minutes, gridStartHour, hourHeight?): number` | Fixed scale Y |
| `offsetToMinutes(offsetPx, gridStartHour, hourHeight?): number` | Inverse |
| `minutesToHeight(durationMinutes, hourHeight?): number` | Block height |
| `dayHourHeight(hour, ranges, options?): number` | Adaptive hour px |
| `variableMinutesToOffset(minutes, gridStartHour, hourHeights): number` | Variable Y |
| `variableMinutesToHeight(start, end, gridStartHour, hourHeights): number` | |
| `variableOffsetToMinutes(offsetPx, startHour, endHour, hourHeights): number` | Inverse |

Types: `DayHourTimeRange`, `AdaptiveHourHeightOptions`.

---

## Related utils

| Signature | Notes |
|-----------|-------|
| `calendarRangeForView(view, currentDate): { filter_from, filter_to }` | UTC ISO window |
| `calendarBoardOccurrenceId(masterId, startDateTime, repeatType?): string` | Occurrence key |
| `calendarMasterEventId(boardOrMasterId): string` | Strip suffix |
| `meetingDetailsFromDayEvent(event, currentDate): CalendarMeetingDetails` | |
| `meetingDetailsFromWeekEvent(event, weekStart): CalendarMeetingDetails` | |
| `meetingDetailsFromMonthEvent(event): CalendarMeetingDetails` | |

## Next

- [Overview](./overview)
- [Concepts](../guide/concepts)
