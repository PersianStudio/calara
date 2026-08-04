# Types

Public TypeScript contracts for views, filters, events, meetings, and empty slots.

```ts
import type {
  DsCalendarView,
  DsCalendarBoardTab,
  DsCalendarFilterKey,
  DsCalendarFilters,
  CalendarDayEvent,
  CalendarWeekEvent,
  CalendarMonthEvent,
  CalendarMeetingDetails,
  CalendarMeetingKind,
  CalendarEmptySlotSelection,
  TaskStatus,
  TaskPriority,
} from '@persianstudio/calara';
```

---

## Views & filters

```ts
type DsCalendarView = 'day' | 'week' | 'month' | 'list';
type DsCalendarBoardTab = 'day' | 'week' | 'month';

type DsCalendarFilterKey =
  | 'ICE_CALLS'
  | 'IN_PERSON_MEETINGS'
  | 'TASKS'
  | 'REMINDERS';

interface DsCalendarFilters {
  ICE_CALLS: boolean;
  IN_PERSON_MEETINGS: boolean;
  TASKS: boolean;
  REMINDERS: boolean;
}
```

`list` is reserved. Prefer `parseDsCalendarBoardTab` when reading URL/storage strings.

---

## Day events

```ts
type CalendarDayEventType = 'task' | 'reminder' | 'ice_call' | 'in_person_meeting';
type TaskStatus = 'done' | 'overdue';
type TaskPriority = 'low' | 'medium' | 'high';

type CalendarDayEvent =
  | CalendarDayTaskEvent
  | CalendarDayReminderEvent
  | CalendarDayIceCallEvent
  | CalendarDayInPersonEvent;
```

| Variant | Distinct fields |
|---------|-----------------|
| `task` | `startMinutes`, `endMinutes`, optional `status`, `priority` |
| `reminder` | `hour` (0–23), `completed` — no range |
| `ice_call` | `startMinutes`, `endMinutes` |
| `in_person_meeting` | timed + optional `travelMinutes`, `location` |

Shared: `id`, `type`, `title`.

---

## Week events

```ts
type CalendarWeekEventType = 'ice_call' | 'in_person_meeting';

type CalendarWeekEvent =
  | CalendarWeekIceCallEvent
  | CalendarWeekInPersonEvent;
```

Shared fields: `id`, `type`, `title`, `dayIndex` (0 = Monday … 6 = Sunday), `startMinutes`, `endMinutes`, optional `location`.

In-person adds optional `travelMinutes` (occupies time **before** `startMinutes`).

---

## Month events

```ts
type CalendarMonthEventType = 'ice_call' | 'in_person_meeting';

interface CalendarMonthEvent {
  id: string;
  type: CalendarMonthEventType;
  title: string;
  date: Date;           // local calendar day
  startMinutes: number;
  endMinutes: number;
  location?: string;
  travelMinutes?: number;
}
```

---

## Meeting details

Normalized payload for `DsMeetingDetailsDrawer` / `onMeetingClick`:

```ts
type CalendarMeetingKind = 'ice_call' | 'in_person_meeting';

interface CalendarMeetingDetails {
  id: string;
  kind: CalendarMeetingKind;
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location?: string;
  travelMinutes?: number;
}
```

Build with `meetingDetailsFromDayEvent` / `FromWeekEvent` / `FromMonthEvent`.

Drawer submit shape:

```ts
interface MeetingDetailsFormValue {
  meetingTitle: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location?: string;
  travelMinutes?: number;
}
```

---

## Empty slot

```ts
interface CalendarEmptySlotSelection {
  date: Date;
  hour?: number; // 0–23; omitted on month cells
}
```

---

## Holiday

```ts
interface Holiday {
  id: string;
  label: string;
}
```

## Next

- [Events guide](../guide/events)
- [Components](./components)
