/**
 * Snap a date to the start of a calendar unit (local time).
 * Week helpers use **ISO weeks: Monday = first day**.
 */

import { cloneDate } from './clone';

/** Local midnight of the calendar day containing `d`. */
export const startOfDay = (d: Date): Date => {
  const next = cloneDate(d);
  next.setHours(0, 0, 0, 0);
  return next;
};

/** First day of the month containing `d`, at local midnight. */
export const startOfMonth = (d: Date): Date => {
  const next = cloneDate(d);
  next.setDate(1);
  next.setHours(0, 0, 0, 0);
  return next;
};

/**
 * Monday 00:00:00 local of the ISO week containing `d`.
 * (`Date#getDay`: Sun=0 … Sat=6 → shift so Mon=0.)
 *
 * @example
 * // Thursday 2024-06-13 → Monday 2024-06-10
 * startOfWeek(new Date(2024, 5, 13));
 */
export const startOfWeek = (d: Date): Date => {
  const next = startOfDay(d);
  const day = next.getDay(); // 0=Sun … 6=Sat
  const daysFromMonday = day === 0 ? 6 : day - 1;
  next.setDate(next.getDate() - daysFromMonday);
  return next;
};

/**
 * Alias of {@link startOfWeek} — same Monday-based ISO week.
 * Kept under the familiar moment/date-fns name for call-site clarity.
 */
export const startOfIsoWeek = (d: Date): Date => startOfWeek(d);
