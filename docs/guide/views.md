# Views

Day and week boards are timed grids (hours 0–23). Month is a Mon–Sun chip grid. All three share filters, meeting clicks, and empty-slot clicks via `DsCalendarBoard`.

## Day view

`DsCalendarDayView` shows one local day.

- Timed cards use `startMinutes` / `endMinutes`
- Reminders pin to an `hour` row
- Tasks / ICE / in-person render as range cards
- In-person `travelMinutes` draws a travel strip **above** the meeting start (travel does not shorten the meeting)

```tsx
<DsCalendarDayView
  currentDate={currentDate}
  events={dayEvents}
  enabledFilters={enabled}
  showWeekdayHeader
  onMeetingClick={onMeetingClick}
  onEmptySlotClick={onEmptySlotClick}
  onReminderToggle={(id, completed) => /* patch */ undefined}
/>
```

## Week view

`DsCalendarWeekView` shows the ISO week containing `currentDate` (Monday → Sunday).

- Events use `dayIndex` (0 = Monday … 6 = Sunday)
- Only `ice_call` and `in_person_meeting`
- Column headers can change the selected day via `onDateChange`

```tsx
<DsCalendarWeekView
  currentDate={currentDate}
  events={weekEvents}
  onDateChange={setCurrentDate}
  enabledFilters={enabled}
  onMeetingClick={onMeetingClick}
  onEmptySlotClick={onEmptySlotClick}
/>
```

## Month view

`DsCalendarMonthView` builds a month matrix with `getMonthGridDays` (leading/trailing days from adjacent months).

- Chips: ICE + in-person only
- Up to three chips per cell; extras are truncated in the UI
- Clicking a chip opens meeting details; clicking empty cell space fires `onEmptySlotClick` (hour defaults to 9 when opening create flows)

```tsx
<DsCalendarMonthView
  currentDate={currentDate}
  events={monthEvents}
  onDateChange={setCurrentDate}
  enabledFilters={enabled}
  onMeetingClick={onMeetingClick}
  onEmptySlotClick={onEmptySlotClick}
/>
```

## Time scrubber

Day and week boards include a red **scrubber** line:

- Click the hours column to place it
- Drag the pill head to move it
- Minutes are the stored value; `top` and the label (`4 pm`, `4:15 pm`) are derived

When the visible day/week includes “now”, the scrubber seeds near the current time. Internally this uses `useCalendarTimeScrubber` + `DsCalendarTimeIndicator`.

## Empty slots

Clicking an empty hour (day/week) or empty month cell yields:

```ts
interface CalendarEmptySlotSelection {
  date: Date;
  hour?: number; // 0–23; omitted on month → treat as 9:00 in your create flow
}
```

```tsx
onEmptySlotClick={(slot) => {
  const hour = slot.hour ?? 9;
  openCreateMeeting({ date: slot.date, hour });
}}
```

## Adaptive hour heights

Busy hours grow so short overlapping cards stay readable; empty hours stay compact.

| Board | Behavior |
|-------|----------|
| Day | `dayHourHeight` with min ~60px, grows with occupancy, capped |
| Week | Same helper, min height aligned to `HOUR_HEIGHT` (80px) |

Pixel ↔ minute mapping for variable rows uses `variableMinutesToOffset` / `variableOffsetToMinutes` so cards and the scrubber share one scale. See [Core time](./core-time).

## Travel time

For `in_person_meeting` events, optional `travelMinutes` reserves a range **before** `startMinutes`:

```text
[startMinutes - travelMinutes] ── travel strip ── [startMinutes] ── meeting ── [endMinutes]
```

Travel never shortens the meeting itself. Week and day boards both render the strip; month chips may carry `travelMinutes` for the details drawer only.

## Meeting clicks

ICE and in-person clicks emit a normalized `CalendarMeetingDetails` (already mapped inside the views). Wire it to `DsMeetingDetailsDrawer`:

```tsx
const [meeting, setMeeting] = useState<CalendarMeetingDetails | null>(null);

<DsCalendarBoard
  onMeetingClick={setMeeting}
  /* … */
/>

<DsMeetingDetailsDrawer
  open={Boolean(meeting)}
  meeting={meeting}
  onClose={() => setMeeting(null)}
  onSave={(values) => {
    persistMeeting(values);
    setMeeting(null);
  }}
/>
```

## Next

- [Events](./events) — full TypeScript shapes  
- [Drawers](./drawers)  
- [Core time](./core-time) — build a custom timed grid
