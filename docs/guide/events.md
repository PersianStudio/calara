# Events

Each board tab expects its own event shape. Times are **minutes from midnight** unless noted. Pass arrays into `DsCalendarBoard` (`dayEvents`, `weekEvents`, `monthEvents`).

## Day events

```ts
import type {
  CalendarDayEvent,
  CalendarDayIceCallEvent,
  CalendarDayInPersonEvent,
  CalendarDayTaskEvent,
  CalendarDayReminderEvent,
} from '@persianstudio/calara';

const ice: CalendarDayIceCallEvent = {
  id: 'ice-1',
  type: 'ice_call',
  title: 'Product sync',
  startMinutes: 9 * 60 + 30,
  endMinutes: 10 * 60 + 15,
};

const visit: CalendarDayInPersonEvent = {
  id: 'in-1',
  type: 'in_person_meeting',
  title: 'School visit',
  startMinutes: 11 * 60,
  endMinutes: 12 * 60 + 30,
  travelMinutes: 25,
  location: 'North Campus',
};

const task: CalendarDayTaskEvent = {
  id: 'task-1',
  type: 'task',
  title: 'Send agenda',
  startMinutes: 14 * 60,
  endMinutes: 14 * 60 + 45,
  status: 'overdue', // 'done' | 'overdue'
  priority: 'high',   // 'low' | 'medium' | 'high'
};

const reminder: CalendarDayReminderEvent = {
  id: 'rem-1',
  type: 'reminder',
  title: 'Call parent liaison',
  hour: 16,           // hour row only — no range
  completed: false,
};

const dayEvents: CalendarDayEvent[] = [ice, visit, task, reminder];
```

`dayEventHour(event)` returns the hour row for any day event (reminder → `hour`, timed → `hourOfMinutes(startMinutes)`).

## Week events

Only ICE and in-person. Place with `dayIndex` inside the visible ISO week (0 = Monday).

```ts
import type { CalendarWeekEvent } from '@persianstudio/calara';
import { addDays, startOfWeek } from '@persianstudio/calara';

const weekEvents: CalendarWeekEvent[] = [
  {
    id: 'w-ice-1',
    type: 'ice_call',
    title: 'Weekly standup',
    dayIndex: 0,
    startMinutes: 9 * 60,
    endMinutes: 9 * 60 + 30,
  },
  {
    id: 'w-in-1',
    type: 'in_person_meeting',
    title: 'Board briefing',
    dayIndex: 2,
    startMinutes: 13 * 60,
    endMinutes: 14 * 60 + 30,
    travelMinutes: 20,
    location: 'City Hall',
  },
];

// Absolute date for dayIndex 2:
const wednesday = addDays(startOfWeek(currentDate), 2);
```

## Month events

Chips need a calendar `date` plus minutes so Meeting Details shows the real clock time.

```ts
import type { CalendarMonthEvent } from '@persianstudio/calara';
import { addDays, startOfWeek } from '@persianstudio/calara';

const weekStart = startOfWeek(currentDate);

const monthEvents: CalendarMonthEvent[] = [
  {
    id: 'm-1',
    type: 'ice_call',
    title: 'ICE call 1',
    date: addDays(weekStart, 0),
    startMinutes: 10 * 60,
    endMinutes: 11 * 60,
  },
  {
    id: 'm-2',
    type: 'in_person_meeting',
    title: 'Campus visit',
    date: addDays(weekStart, 3),
    startMinutes: 14 * 60,
    endMinutes: 15 * 60,
    location: 'Campus',
    travelMinutes: 15,
  },
];
```

## Meeting details mappers

Boards map ICE / in-person clicks to `CalendarMeetingDetails` internally. When you map yourself (custom cards, lists), use the same helpers — they read stored minutes, never labels:

```ts
import {
  meetingDetailsFromDayEvent,
  meetingDetailsFromWeekEvent,
  meetingDetailsFromMonthEvent,
  startOfWeek,
  type CalendarMeetingDetails,
} from '@persianstudio/calara';

const fromDay: CalendarMeetingDetails = meetingDetailsFromDayEvent(ice, currentDate);

const fromWeek = meetingDetailsFromWeekEvent(weekEvents[0], startOfWeek(currentDate));

const fromMonth = meetingDetailsFromMonthEvent(monthEvents[0]);
```

Normalized payload:

```ts
interface CalendarMeetingDetails {
  id: string;
  kind: 'ice_call' | 'in_person_meeting';
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location?: string;
  travelMinutes?: number;
}
```

## Recurring occurrence ids

If your backend shares one master id across repeats, build stable React keys and strip them before PATCH:

```ts
import {
  calendarBoardOccurrenceId,
  calendarMasterEventId,
} from '@persianstudio/calara';

const key = calendarBoardOccurrenceId(masterId, startDateTimeIso, repeatType);
// SINGLE → masterId
// else → `${masterId}__${startDateTimeIso}`

const apiId = calendarMasterEventId(key); // strips `__…` suffix
```

## Filters ↔ types

| `DsCalendarFilterKey` | Day `type` | Week / month |
|-----------------------|------------|--------------|
| `ICE_CALLS` | `ice_call` | yes |
| `IN_PERSON_MEETINGS` | `in_person_meeting` | yes |
| `TASKS` | `task` | n/a |
| `REMINDERS` | `reminder` | n/a |

## Next

- [Views](./views)
- [API: types](../api/types)
- [Drawers](./drawers)
