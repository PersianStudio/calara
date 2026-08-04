/**
 * Local calendar / clock field accessors.
 *
 * All getters read the **local** timezone of the `Date` (same as `Date#get*`).
 * Setters always clone — inputs are never mutated.
 */

import { cloneDate } from './clone';

/** Full year, e.g. `2024`. */
export const getYear = (d: Date): number => d.getFullYear();

/** Month index 0–11 (January = 0), matching `Date#getMonth`. */
export const getMonth = (d: Date): number => d.getMonth();

/** Day of month 1–31. */
export const getDate = (d: Date): number => d.getDate();

/**
 * Day of week 0–6 where Sunday = 0 (native `Date#getDay`).
 * For ISO Monday-based day numbers, prefer week helpers in `start-of` / `compare`.
 */
export const getDay = (d: Date): number => d.getDay();

/** Hours 0–23 in local time. */
export const getHours = (d: Date): number => d.getHours();

/** Minutes 0–59 in local time. */
export const getMinutes = (d: Date): number => d.getMinutes();

/**
 * Clone `d` and set local hours + minutes; seconds and ms are zeroed so
 * comparisons and range math stay on whole-minute boundaries.
 *
 * @example
 * setHoursMinutes(new Date('2024-06-15T10:30:45'), 9, 15)
 * // → 2024-06-15 09:15:00.000 local
 */
export const setHoursMinutes = (d: Date, hours: number, minutes: number): Date => {
  const next = cloneDate(d);
  next.setHours(hours, minutes, 0, 0);
  return next;
};
