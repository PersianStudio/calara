/**
 * Snap a date to the end of a calendar unit (local time, inclusive last ms).
 * Week helpers use **ISO weeks: Monday–Sunday**.
 */

import { cloneDate } from './clone';
import { startOfWeek } from './start-of';

/** Last millisecond of the calendar day containing `d` (23:59:59.999). */
export const endOfDay = (d: Date): Date => {
  const next = cloneDate(d);
  next.setHours(23, 59, 59, 999);
  return next;
};

/** Last millisecond of the last calendar day of the month containing `d`. */
export const endOfMonth = (d: Date): Date => {
  const next = cloneDate(d);
  // Day 0 of next month = last day of this month.
  next.setMonth(next.getMonth() + 1, 0);
  next.setHours(23, 59, 59, 999);
  return next;
};

/**
 * Sunday 23:59:59.999 local of the ISO week containing `d`.
 *
 * @example
 * // Thursday 2024-06-13 → Sunday 2024-06-16 23:59:59.999
 * endOfWeek(new Date(2024, 5, 13));
 */
export const endOfWeek = (d: Date): Date => {
  const monday = startOfWeek(d);
  monday.setDate(monday.getDate() + 6);
  monday.setHours(23, 59, 59, 999);
  return monday;
};

/** Alias of {@link endOfWeek} — ISO week Sunday end. */
export const endOfIsoWeek = (d: Date): Date => endOfWeek(d);
