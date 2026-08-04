# Core time

Timed boards store clock positions as **minutes from midnight**. Pixel layout and labels derive from those integers — never the other way around.

```ts
import {
  MINUTES_PER_HOUR,
  MINUTES_PER_DAY,
  HOUR_HEIGHT,
  wrapMinutes,
  hourOfMinutes,
  minutesOfDay,
  clampMinutesToGrid,
  formatHourLabel,
  formatTimeOfDay,
  formatTimeRange,
  formatScrubberLabel,
  minutesToOffset,
  offsetToMinutes,
  minutesToHeight,
  dayHourHeight,
  variableMinutesToOffset,
  variableMinutesToHeight,
  variableOffsetToMinutes,
} from '@persianstudio/calara';
```

## Minutes math

```ts
wrapMinutes(-15);   // 1425
wrapMinutes(1500);  // 60

hourOfMinutes(9 * 60 + 30); // 9
minutesOfDay(new Date());   // local hours*60 + minutes

clampMinutesToGrid(400, 8, 17);
// grid 8–17 → clamp into [480, 1080]
```

Constants:

| Name | Value / role |
|------|----------------|
| `MINUTES_PER_HOUR` | `60` |
| `MINUTES_PER_DAY` | `1440` |
| `HOUR_HEIGHT` | `80` px per hour (week scale) |
| `DAY_HOUR_HEIGHT_MIN` | compact empty day hours |
| `DAY_QUARTER_CARD_HEIGHT` | min height for a 15-minute card |
| `DAY_HOUR_HEIGHT_MAX` | busy-hour cap |

## formatTime*

Always format **from minutes**. Do not store a parallel display string.

```ts
formatHourLabel(9);              // "9 am"
formatTimeOfDay(9 * 60 + 5);     // "09:05 am"
formatTimeRange(540, 615);       // "09:00 am - 10:15 am"
formatScrubberLabel(16 * 60);    // "4 pm"
formatScrubberLabel(16 * 60 + 15); // "4:15 pm"
```

## Fixed-scale grid (uniform hour height)

Useful for custom week-like boards:

```ts
const top = minutesToOffset(startMinutes, /* gridStartHour */ 0, HOUR_HEIGHT);
const height = minutesToHeight(endMinutes - startMinutes, HOUR_HEIGHT);
const minutes = offsetToMinutes(pointerY, 0, HOUR_HEIGHT);
```

## Adaptive / variable hour heights

Day (and week) boards grow busy hours:

```ts
const ranges = events.map((e) => ({
  startMinutes: e.startMinutes,
  endMinutes: e.endMinutes,
}));

const hourHeights = hours.map((hour) => dayHourHeight(hour, ranges));

const top = variableMinutesToOffset(startMinutes, 0, hourHeights);
const height = variableMinutesToHeight(startMinutes, endMinutes, 0, hourHeights);
const minutes = variableOffsetToMinutes(pointerY, 0, 23, hourHeights);
```

`dayHourHeight` ensures overlapping segments stay tall enough (scaled from a 15-minute card minimum) without breaking linear minute mapping.

## Building a custom board

1. Store events with `startMinutes` / `endMinutes`  
2. Compute occupancy ranges → `hourHeights` (or use fixed `HOUR_HEIGHT`)  
3. Position cards with `variableMinutesToOffset` / `minutesToOffset`  
4. Derive labels with `formatTimeRange`  
5. Optionally wire `useCalendarTimeScrubber` (see package `src/hooks`) for a scrubber line  

> **Tip:** The published day/week views already do this. Reach for these helpers when embedding a timed grid outside `DsCalendarBoard`.

## Next

- [Views](./views)
- [Concepts](./concepts)
- [API: core](../api/core)
