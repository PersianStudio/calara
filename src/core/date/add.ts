/**
 * Calendar arithmetic — always returns a new `Date`; never mutates the input.
 *
 * Months follow common calendar rules: if the target month is shorter, the day
 * clamps to the last valid day (Jan 31 + 1 month → Feb 28/29).
 */

import { cloneDate } from './clone';

/** Add (or subtract) whole calendar days. */
export const addDays = (d: Date, amount: number): Date => {
  const next = cloneDate(d);
  next.setDate(next.getDate() + amount);
  return next;
};

/** Add whole weeks (7 × `amount` days). */
export const addWeeks = (d: Date, amount: number): Date => addDays(d, amount * 7);

/**
 * Add whole calendar months, preserving time-of-day when possible.
 *
 * @example
 * addMonths(new Date(2024, 0, 31), 1); // → Feb 29 2024 (leap) or Feb 28
 */
export const addMonths = (d: Date, amount: number): Date => {
  const next = cloneDate(d);
  const day = next.getDate();
  // Set to day 1 first so intermediate overflow cannot skip an extra month.
  next.setDate(1);
  next.setMonth(next.getMonth() + amount);
  const daysInMonth = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
  next.setDate(Math.min(day, daysInMonth));
  return next;
};

/** Add whole minutes (can cross day/month/year boundaries). */
export const addMinutes = (d: Date, amount: number): Date => {
  const next = cloneDate(d);
  next.setMinutes(next.getMinutes() + amount);
  return next;
};
