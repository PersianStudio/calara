# Date picker

`DsDatePicker` is a zero-dependency date / time popover. No `react-datepicker`, no MUI DatePicker — plain HTML, positioned under a trigger.

Import CSS once (see [Getting started](./getting-started)).

## Variants

### Field (default)

Labeled input-style trigger with optional clear, error, and helper text:

```tsx
import { useState } from 'react';
import { DsDatePicker } from '@persianstudio/calara';

function FieldExample() {
  const [selected, setSelected] = useState<Date | null>(new Date());

  return (
    <DsDatePicker
      variant="field"
      inputLabel="Meeting date"
      selected={selected}
      onChange={(d) => setSelected(d instanceof Date || d === null ? d : null)}
      dateFormat="dd MMM yyyy"
      placeholderText="Pick a date"
      helperText="Local calendar day"
    />
  );
}
```

### Inline text

Compact text button — used by the calendar toolbar:

```tsx
<DsDatePicker
  variant="inlineText"
  selected={currentDate}
  onChange={(d) => {
    if (d instanceof Date) setCurrentDate(d);
  }}
  triggerAriaLabel="Choose date"
/>
```

## Time-only

`showTimeSelectOnly` opens a time list (interval steps) and writes hours/minutes onto the selected date (or “today” when empty):

```tsx
const [time, setTime] = useState<Date | null>(() => {
  const d = new Date();
  d.setHours(14, 30, 0, 0);
  return d;
});

<DsDatePicker
  selected={time}
  onChange={(d) => setTime(d instanceof Date || d === null ? d : null)}
  showTimeSelect
  showTimeSelectOnly
  timeIntervals={15}
  dateFormat="h:mm aa"
  inputLabel="Start time"
/>
```

## Date + time

Keep the month grid open after picking a day so the user can also choose a time:

```tsx
<DsDatePicker
  selected={selected}
  onChange={(d) => setSelected(d instanceof Date || d === null ? d : null)}
  showTimeSelect
  timeIntervals={15}
  dateFormat="dd MMM yyyy h:mm aa"
  inputLabel="Starts"
/>
```

When the day changes, existing clock time on `selected` is preserved.

## Formats

`dateFormat` uses the same token set as [`formatDate`](./core-date#formatdate):

| Pattern | Example |
|---------|---------|
| `dd MMM yyyy` | `04 Aug 2026` |
| `EEEE, MMMM d, yyyy` | `Tuesday, August 4, 2026` |
| `h:mm aa` | `2:30 PM` |
| `HH:mm` | `14:30` |

## Minimum date

Disable days before `minDate` in the month grid:

```tsx
import { startOfDay } from '@persianstudio/calara';

<DsDatePicker
  selected={date}
  onChange={…}
  minDate={startOfDay(new Date())}
  inputLabel="Date"
/>
```

## Controlled value

Prefer `selected: Date | null`. `value` also accepts `string | number | Date | null` and is parsed with `new Date(…)` when `selected` is omitted.

```tsx
<DsDatePicker selected={selected} onChange={setSelected} />
// or
<DsDatePicker value={isoString} onChange={…} />
```

`onChange` may be typed to allow a range tuple for future `selectsRange` use; today’s UI emits a single `Date | null`.

## Custom trigger

Pass `customInput` to replace the built-in trigger; your element should call into the picker by wrapping or composing carefully. Most apps use `field` or `inlineText`.

## Behavior notes

- Outside click and `Escape` close the popover
- Clear is available on the field variant (hidden in time-only mode)
- Root class: `calara-datepicker`

## Next

- [Core date](./core-date) — `formatDate` tokens  
- [Drawers](./drawers) — pickers inside meeting details  
- [API: components](../api/components#dsdatepicker)
