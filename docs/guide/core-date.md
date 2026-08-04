# Core date

Local date helpers live under `@persianstudio/calara` — **no moment, no date-fns**. All operations use the runtime’s local timezone unless you serialize with `toUtcIsoString`.

```ts
import {
  formatDate,
  startOfDay,
  startOfWeek,
  startOfMonth,
  addDays,
  addWeeks,
  addMonths,
  getWeekDays,
  getMonthGridDays,
  toUtcIsoString,
  isSameDay,
  isToday,
} from '@persianstudio/calara';
```

## formatDate

Small English pattern formatter (longest token wins). No escape sequences — keep patterns simple.

**Tokens:** `d` `dd` `M` `MM` `MMM` `MMMM` `yy` `yyyy` `E` `EE` `EEE` `EEEE` `h` `hh` `H` `HH` `m` `mm` `a` `aa`

```ts
formatDate(new Date(2024, 5, 3, 9, 5), 'EEEE, MMMM d, yyyy');
// → "Monday, June 3, 2024"

formatDate(new Date(2024, 5, 3, 9, 5), 'dd MMM yyyy');
// → "03 Jun 2024"

formatDate(new Date(2024, 5, 3, 9, 5), 'h:mm aa');
// → "9:05 AM" /* aa = uppercase meridiem */
```

Used by `DsDatePicker`, toolbar labels, and month chips.

## startOf* / endOf*

Weeks are **ISO: Monday start**.

```ts
startOfDay(d);     // local midnight
startOfMonth(d);   // 1st, 00:00
startOfWeek(d);    // Monday 00:00 of the ISO week
startOfIsoWeek(d); // alias of startOfWeek

endOfDay(d);       // 23:59:59.999
endOfMonth(d);
endOfWeek(d);      // Sunday end of ISO week
endOfIsoWeek(d);   // alias
```

## add*

Always returns a **new** `Date` (inputs are never mutated).

```ts
addDays(d, 1);
addWeeks(d, -1);
addMonths(d, 1);   // clamps day (Jan 31 → Feb 28/29)
addMinutes(d, 30);
```

## Grid builders

```ts
getWeekDays(anchor);
// seven local midnights: Mon → Sun for the ISO week of `anchor`

getMonthGridDays(anchor);
// from Monday of the week containing the 1st
// through Sunday of the week containing the last day
// length is a multiple of 7 (usually 35 or 42)
```

Mini calendar and month board both use `getMonthGridDays`.

## Compare helpers

```ts
isSameDay(a, b);
isSameMonth(a, b);
isSameIsoWeek(a, b);
isToday(d);
```

## Field accessors

```ts
getYear(d);
getMonth(d);   // 0–11
getDate(d);    // day of month
getDay(d);     // Sun=0 … Sat=6 (native)
getHours(d);
getMinutes(d);
setHoursMinutes(d, hours, minutes); // clones; zeros seconds/ms
cloneDate(d);
```

## toUtcIsoString

Snap in **local** time first, then serialize the absolute instant:

```ts
const from = toUtcIsoString(startOfDay(currentDate));
const to = toUtcIsoString(endOfDay(currentDate));
// e.g. Asia/Tehran midnight → previous UTC evening with …Z
```

Pair with [`calendarRangeForView`](../api/core) for board-sized fetch windows.

## Next

- [Core time](./core-time)
- [API: core](../api/core)
- [Concepts](./concepts)
