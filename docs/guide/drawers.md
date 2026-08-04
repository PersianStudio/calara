# Drawers

Calara ships two slide-overs: a compact **calendar drawer** (embedded board) and a **meeting details** editor. Both use a backdrop, Escape-to-close, and the shared `.calara` styles.

## DsCalendarDrawer

Embed day / week / month inside a panel — useful for “pick a slot” flows without a full-page calendar.

```tsx
import { useState } from 'react';
import {
  DsCalendarDrawer,
  DEFAULT_DS_CALENDAR_FILTERS,
  type DsCalendarFilters,
} from '@persianstudio/calara';

function SlotPicker({
  open,
  onClose,
  currentDate,
  onDateChange,
  dayEvents,
  weekEvents,
  monthEvents,
}: Props) {
  const [filters, setFilters] = useState<DsCalendarFilters>(DEFAULT_DS_CALENDAR_FILTERS);

  return (
    <DsCalendarDrawer
      open={open}
      onClose={onClose}
      title="Schedule"
      initialTab="week"
      currentDate={currentDate}
      onDateChange={onDateChange}
      dayEvents={dayEvents}
      weekEvents={weekEvents}
      monthEvents={monthEvents}
      filters={filters}
      onFiltersChange={setFilters}
      calendars={[
        { id: 'mine', label: 'My calendar' },
        { id: 'team', label: 'Team' },
      ]}
      selectedCalendarId="mine"
      onCalendarChange={(id) => loadCalendar(id)}
      onOpenFullCalendar={() => navigate('/calendar')}
      onMeetingClick={setMeeting}
      onEmptySlotClick={onEmptySlot}
      footer={<button type="button" className="calara-btn calara-btn--primary">Done</button>}
    />
  );
}
```

### Props (summary)

| Prop | Purpose |
|------|---------|
| `open` / `onClose` | Visibility |
| `title` | Header label (default `"Calendar"`) |
| `initialTab` | `'day' \| 'week' \| 'month'` |
| `currentDate` / `onDateChange` | Anchor date + date field |
| `dayEvents` / `weekEvents` / `monthEvents` | Board data |
| `filters` / `onFiltersChange` | Optional controlled filters (defaults internally) |
| `calendars` / `selectedCalendarId` / `onCalendarChange` | Optional calendar switcher |
| `onOpenFullCalendar` | Extra header action |
| `footer` | Footer slot |
| `onMeetingClick` / `onEmptySlotClick` / `onReminderToggle` | Same as board |

Tab state lives inside the drawer. Board filters are derived with `enabledDsCalendarFilters`.

## DsMeetingDetailsDrawer

Edit title, date, start/end time, and (for in-person) location + travel.

```tsx
import {
  DsMeetingDetailsDrawer,
  type CalendarMeetingDetails,
  type MeetingDetailsFormValue,
} from '@persianstudio/calara';

function MeetingFlow({
  meeting,
  onClose,
  onPersist,
}: {
  meeting: CalendarMeetingDetails | null;
  onClose: () => void;
  onPersist: (values: MeetingDetailsFormValue) => void;
}) {
  return (
    <DsMeetingDetailsDrawer
      open={Boolean(meeting)}
      meeting={meeting}
      onClose={onClose}
      onSave={(values) => {
        onPersist(values);
        onClose();
      }}
    />
  );
}
```

### Form value

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

### Flow

1. User clicks ICE / in-person on a board → `onMeetingClick(details)`
2. Host sets `meeting` state and opens the drawer
3. User edits fields (date picker + time-only pickers)
4. Submit → `onSave(values)` → host PATCHes API and closes

Date field uses `minDate={startOfDay(new Date())}`. Travel presets are 5 / 15 / 30 / 45 / 60 minutes (plus the meeting’s current value if different).

> **Tip:** Build `CalendarMeetingDetails` with [`meetingDetailsFrom*`](./events#meeting-details-mappers) so start/end times stay faithful to stored minutes.

## Styling

Drawers render `calara calara-drawer-root` with `calara-drawer__backdrop` and `calara-drawer__panel`. Ensure [styles.css](./styling) is imported once at the app root.

## Next

- [Events](./events)
- [Date picker](./date-picker)
- [API: components](../api/components)
