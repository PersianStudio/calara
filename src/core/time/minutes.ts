/**
 * Minutes-from-midnight arithmetic for timed calendar events.
 * All clock positions in calara are integers in `[0, 1440)` (or clamped to a grid).
 */

import { MINUTES_PER_DAY, MINUTES_PER_HOUR } from './constants';

/**
 * Wrap any minute value into a single day `[0, MINUTES_PER_DAY)`.
 * Negative and overflow values stay on the circular 24h clock.
 *
 * @example
 * wrapMinutes(-15);   // 1425
 * wrapMinutes(1500);  // 60
 */
export const wrapMinutes = (minutes: number): number =>
  ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

/** Hour row (0–23) a timed event belongs to. */
export const hourOfMinutes = (minutesFromMidnight: number): number =>
  Math.floor(minutesFromMidnight / MINUTES_PER_HOUR);

/**
 * Minutes-from-midnight for a `Date`, for comparing "now" against event ranges.
 * Uses local hours + minutes only (seconds ignored).
 */
export const minutesOfDay = (date: Date): number =>
  date.getHours() * MINUTES_PER_HOUR + date.getMinutes();

/**
 * Clamp minutes to the inclusive hour range shown by a timed grid.
 * `gridEndHour` is the last visible hour row; the upper bound is that hour's end.
 *
 * @example
 * // Grid shows 8–17 → clamp to [480, 1080]
 * clampMinutesToGrid(400, 8, 17); // 480
 */
export const clampMinutesToGrid = (
  minutesFromMidnight: number,
  gridStartHour: number,
  gridEndHour: number,
): number => {
  const min = gridStartHour * MINUTES_PER_HOUR;
  const max = (gridEndHour + 1) * MINUTES_PER_HOUR;
  return Math.min(max, Math.max(min, minutesFromMidnight));
};
