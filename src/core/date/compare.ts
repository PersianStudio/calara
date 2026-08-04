/**
 * Equality helpers for calendar UI (same local day / month / ISO week).
 * Compare calendar fields — not raw timestamps — so timezone-local days match.
 */

import { startOfIsoWeek } from './start-of';
import { getDate, getMonth, getYear } from './parts';

/** True when both dates fall on the same local calendar day. */
export const isSameDay = (a: Date, b: Date): boolean =>
  getYear(a) === getYear(b) && getMonth(a) === getMonth(b) && getDate(a) === getDate(b);

/** True when both dates fall in the same local calendar month + year. */
export const isSameMonth = (a: Date, b: Date): boolean =>
  getYear(a) === getYear(b) && getMonth(a) === getMonth(b);

/**
 * True when both dates share the same ISO week (Mon–Sun) in local time.
 *
 * @example
 * isSameIsoWeek(new Date(2024, 5, 10), new Date(2024, 5, 16)); // true (Mon–Sun)
 */
export const isSameIsoWeek = (a: Date, b: Date): boolean =>
  startOfIsoWeek(a).getTime() === startOfIsoWeek(b).getTime();

/** True when `d` is the local calendar day matching "now". */
export const isToday = (d: Date): boolean => isSameDay(d, new Date());
