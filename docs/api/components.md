# Components

Props for the public React components. Import from `@persianstudio/calara`. Import [`styles.css`](../guide/styling) once.

---

## DsCalendar

Full shell: toolbar + `children` + optional sidebar.

| Prop | Type | Description |
|------|------|-------------|
| `view` | `DsCalendarView` | Active tab |
| `onViewChange` | `(view) => void` | Tab change |
| `currentDate` | `Date` | Anchor date |
| `onDateChange` | `(date) => void` | Date change |
| `search` | `string \| undefined` | Search field value |
| `setSearch` | `Dispatch<SetStateAction<string \| undefined>>` | Search updater |
| `sidebarOpen` | `boolean` | Sidebar visibility |
| `onToggleSidebar` | `() => void` | Toggle sidebar |
| `filters` | `DsCalendarFilters` | Category toggles |
| `onFilterChange` | `(id, checked) => void` | Filter checkbox |
| `holidays` | `Holiday[]` | Optional sidebar holidays |
| `children` | `ReactNode` | Usually `DsCalendarBoard` |

---

## DsCalendarBoard

Routes to day / week / month views.

| Prop | Type | Description |
|------|------|-------------|
| `view` | `DsCalendarView` | Which board to show |
| `currentDate` | `Date` | Anchor |
| `onDateChange` | `(date) => void` | Week/month header navigation |
| `dayEvents` | `CalendarDayEvent[]` | Day board data |
| `weekEvents` | `CalendarWeekEvent[]` | Week board data |
| `monthEvents` | `CalendarMonthEvent[]` | Month board data |
| `enabledFilters` | `DsCalendarFilterKey[]` | Visible categories |
| `showWeekdayHeader` | `boolean` | Day view header (default `true`) |
| `onMeetingClick` | `(meeting: CalendarMeetingDetails) => void` | ICE / in-person click |
| `onEmptySlotClick` | `(slot: CalendarEmptySlotSelection) => void` | Empty cell/hour |
| `onReminderToggle` | `(id, completed) => void` | Day reminder checkbox |

---

## DsCalendarToolbar

| Prop | Type | Description |
|------|------|-------------|
| `view` | `DsCalendarView` | Drives prev/next shift unit |
| `onViewChange` | `(view) => void` | Day/week/month buttons |
| `currentDate` | `Date` | Shown in inline picker |
| `onDateChange` | `(date) => void` | Prev/next/today/picker |
| `search` | `string \| undefined` | Input value |
| `setSearch` | `Dispatch<…>` | Input onChange |
| `sidebarOpen` | `boolean` | `aria-pressed` on toggle |
| `onToggleSidebar` | `() => void` | Show/hide sidebar |

---

## DsCalendarSidebar

| Prop | Type | Description |
|------|------|-------------|
| `currentDate` | `Date` | Mini calendar value |
| `onDateChange` | `(date) => void` | Mini calendar select |
| `filters` | `DsCalendarFilters` | Checkbox state |
| `onFilterChange` | `(id, checked) => void` | Checkbox change |
| `holidays` | `Holiday[]` | Optional list |

Also exported: `DsCalendarFilterList`, `DsCalendarHolidays` (`Holiday`: `{ id: string; label: string }`).

---

## DsMiniCalendar

| Prop | Type | Description |
|------|------|-------------|
| `value` | `Date` | Selected / browsed month |
| `onChange` | `(date) => void` | Day click or month nav |
| `className` | `string` | Optional extra class |

Weekday headers are Mon–Sun.

---

## DsCalendarDayView

| Prop | Type | Description |
|------|------|-------------|
| `currentDate` | `Date` | Day shown |
| `events` | `CalendarDayEvent[]` | Cards |
| `showWeekdayHeader` | `boolean` | Default `true` |
| `enabledFilters` | `DsCalendarFilterKey[]` | Filter |
| `onMeetingClick` | `(meeting) => void` | ICE / in-person |
| `onEmptySlotClick` | `(slot) => void` | Empty hour |
| `onReminderToggle` | `(id, completed) => void` | Reminder |

Includes adaptive hour heights + scrubber.

---

## DsCalendarWeekView

| Prop | Type | Description |
|------|------|-------------|
| `currentDate` | `Date` | Any day in the ISO week |
| `events` | `CalendarWeekEvent[]` | Cards |
| `onDateChange` | `(date) => void` | Column header select |
| `enabledFilters` | `DsCalendarFilterKey[]` | ICE / in-person filters |
| `onMeetingClick` | `(meeting) => void` | |
| `onEmptySlotClick` | `(slot) => void` | |

---

## DsCalendarMonthView

| Prop | Type | Description |
|------|------|-------------|
| `currentDate` | `Date` | Month shown |
| `events` | `CalendarMonthEvent[]` | Chips |
| `onDateChange` | `(date) => void` | Optional |
| `enabledFilters` | `DsCalendarFilterKey[]` | |
| `onMeetingClick` | `(meeting) => void` | |
| `onEmptySlotClick` | `(slot) => void` | Empty cell (no `hour`) |

---

## DsCalendarDrawer

Extends board event props (minus `view` / `enabledFilters`) plus:

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Visibility |
| `onClose` | `() => void` | Backdrop / Escape / Close |
| `title` | `string` | Default `"Calendar"` |
| `initialTab` | `DsCalendarBoardTab` | `'day' \| 'week' \| 'month'` |
| `calendars` | `{ id, label }[]` | Optional switcher |
| `selectedCalendarId` | `string` | Selected option |
| `onCalendarChange` | `(id) => void` | |
| `filters` | `DsCalendarFilters` | Controlled filters |
| `onFiltersChange` | `(filters) => void` | |
| `onOpenFullCalendar` | `() => void` | Header action |
| `footer` | `ReactNode` | Footer slot |
| `currentDate` / `onDateChange` | | Date field + board |
| event + click props | | Same as board |

---

## DsMeetingDetailsDrawer

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | Visibility |
| `meeting` | `CalendarMeetingDetails \| null` | Seed form |
| `onClose` | `() => void` | Back / Escape / backdrop |
| `onSave` | `(values: MeetingDetailsFormValue) => void` | Submit |

`MeetingDetailsFormValue`: `meetingTitle`, `date`, `startTime`, `endTime`, optional `location`, `travelMinutes`.

---

## DsDatePicker

| Prop | Type | Description |
|------|------|-------------|
| `selected` | `Date \| null` | Preferred controlled value |
| `value` | `string \| number \| Date \| null` | Alternate input |
| `onChange` | `(date) => void` | Emits `Date \| null` (range tuple typed for future use) |
| `variant` | `'field' \| 'inlineText'` | Trigger style (default `field`) |
| `inputLabel` | `string` | Field label |
| `error` | `boolean` | Error styling |
| `helperText` | `string` | Helper under field |
| `triggerAriaLabel` | `string` | Inline trigger a11y |
| `dateFormat` | `string` | `formatDate` pattern (default `dd MMM yyyy`) |
| `showTimeSelect` | `boolean` | Show time list with calendar |
| `showTimeSelectOnly` | `boolean` | Time list only |
| `timeIntervals` | `number` | Minutes between options (default `15`) |
| `minDate` | `Date` | Disable earlier days |
| `placeholderText` | `string` | Empty field placeholder |
| `customInput` | `ReactElement` | Replace trigger |
| `id` / `className` | | DOM hooks |

---

## DsCalendarTimeIndicator

Scrubber pill used inside day/week views (not exported from the package root).

| Prop | Type | Description |
|------|------|-------------|
| `top` | `number \| null` | CSS `top` in the timed grid |
| `minutes` | `number \| null` | Minutes from midnight (label derived) |
| `isDragging` | `boolean` | Optional drag state |
| `onHeadPointerDown` | pointer handler | Start drag |

## Next

- [Types](./types)
- [Overview](./overview)
