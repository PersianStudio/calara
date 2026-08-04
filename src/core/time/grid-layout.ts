/**
 * Pixel ↔ minutes mapping for fixed- and variable-height timed grids.
 *
 * Fixed grids use a uniform `hourHeight` (week board). Day boards grow busy
 * hours with {@link dayHourHeight}, then use the `variable*` helpers so the
 * scrubber and cards stay on the same minute scale.
 */

import {
  DAY_HOUR_HEIGHT_MAX,
  DAY_HOUR_HEIGHT_MIN,
  DAY_QUARTER_CARD_HEIGHT,
  HOUR_HEIGHT,
  MINUTES_PER_HOUR,
} from './constants';
import { clampMinutesToGrid } from './minutes';

/** Inclusive minute range of a timed event (or overlap segment). */
export type DayHourTimeRange = { startMinutes: number; endMinutes: number };

/** Tunables for {@link dayHourHeight}. */
export type AdaptiveHourHeightOptions = {
  /** Empty / light hours stay at this size (day default 60, week Figma 80). */
  minHeight?: number;
  maxHeight?: number;
  quarterCardHeight?: number;
};

/** Pixel offset of a time inside a grid whose first row is `gridStartHour`. */
export const minutesToOffset = (
  minutesFromMidnight: number,
  gridStartHour: number,
  hourHeight = HOUR_HEIGHT,
): number => ((minutesFromMidnight - gridStartHour * MINUTES_PER_HOUR) / MINUTES_PER_HOUR) * hourHeight;

/**
 * Inverse of `minutesToOffset` — Y inside a fixed-scale grid → minutes from midnight.
 * Round to the nearest minute so drag/click land on a real clock value.
 */
export const offsetToMinutes = (
  offsetPx: number,
  gridStartHour: number,
  hourHeight = HOUR_HEIGHT,
): number => Math.round(gridStartHour * MINUTES_PER_HOUR + (offsetPx / hourHeight) * MINUTES_PER_HOUR);

/**
 * Pixel height of a duration.
 * Never clamp the result — a minimum height makes the block stop at the wrong time.
 */
export const minutesToHeight = (durationMinutes: number, hourHeight = HOUR_HEIGHT): number =>
  (durationMinutes / MINUTES_PER_HOUR) * hourHeight;

/**
 * Height for one timed-grid hour: compact when empty; grows so every overlapping
 * segment is at least `quarterCardHeight` tall when duration is 15 minutes
 * (scales linearly for other durations). Capped at `maxHeight`.
 */
export const dayHourHeight = (
  hour: number,
  ranges: DayHourTimeRange[],
  {
    minHeight = DAY_HOUR_HEIGHT_MIN,
    maxHeight = DAY_HOUR_HEIGHT_MAX,
    quarterCardHeight = DAY_QUARTER_CARD_HEIGHT,
  }: AdaptiveHourHeightOptions = {},
): number => {
  const hourStart = hour * MINUTES_PER_HOUR;
  const hourEnd = hourStart + MINUTES_PER_HOUR;
  let required = minHeight;

  for (const range of ranges) {
    const overlapStart = Math.max(range.startMinutes, hourStart);
    const overlapEnd = Math.min(range.endMinutes, hourEnd);
    const duration = overlapEnd - overlapStart;
    if (duration <= 0) continue;
    required = Math.max(required, quarterCardHeight * (MINUTES_PER_HOUR / duration));
  }

  return Math.min(required, maxHeight);
};

/** Cumulative Y for minutes inside a variable-height grid (`hourHeights[0]` = `gridStartHour`). */
export const variableMinutesToOffset = (
  minutesFromMidnight: number,
  gridStartHour: number,
  hourHeights: number[],
): number => {
  const hour = Math.floor(minutesFromMidnight / MINUTES_PER_HOUR);
  const index = hour - gridStartHour;
  const frac = (minutesFromMidnight % MINUTES_PER_HOUR) / MINUTES_PER_HOUR;
  let y = 0;
  for (let i = 0; i < index; i++) {
    y += hourHeights[i] ?? DAY_HOUR_HEIGHT_MIN;
  }
  y += frac * (hourHeights[index] ?? DAY_HOUR_HEIGHT_MIN);
  return y;
};

/** Pixel span of a time range across variable-height hours. */
export const variableMinutesToHeight = (
  startMinutes: number,
  endMinutes: number,
  gridStartHour: number,
  hourHeights: number[],
): number =>
  variableMinutesToOffset(endMinutes, gridStartHour, hourHeights) -
  variableMinutesToOffset(startMinutes, gridStartHour, hourHeights);

/** Inverse of `variableMinutesToOffset` — Y inside a variable-height grid → minutes. */
export const variableOffsetToMinutes = (
  offsetPx: number,
  gridStartHour: number,
  gridEndHour: number,
  hourHeights: number[],
): number => {
  let acc = 0;
  for (let i = 0; i < hourHeights.length; i++) {
    const height = hourHeights[i];
    if (height <= 0) continue;
    if (offsetPx <= acc + height) {
      const frac = Math.min(1, Math.max(0, (offsetPx - acc) / height));
      return clampMinutesToGrid(
        Math.round((gridStartHour + i + frac) * MINUTES_PER_HOUR),
        gridStartHour,
        gridEndHour,
      );
    }
    acc += height;
  }
  return clampMinutesToGrid((gridEndHour + 1) * MINUTES_PER_HOUR, gridStartHour, gridEndHour);
};
