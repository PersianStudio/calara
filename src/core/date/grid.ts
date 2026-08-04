/**
 * Calendar grid builders for week boards and month / mini-calendar matrices.
 * Weeks always start on Monday (ISO).
 */

import { addDays } from './add';
import { endOfMonth, endOfWeek } from './end-of';
import { startOfMonth, startOfWeek } from './start-of';

/**
 * Seven local midnights for the ISO week containing `anchor` (Mon → Sun).
 *
 * @example
 * getWeekDays(new Date(2024, 5, 13)); // Mon 10 … Sun 16 June 2024
 */
export const getWeekDays = (anchor: Date): Date[] => {
  const monday = startOfWeek(anchor);
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i));
};

/**
 * Contiguous day list for a month board: from the Monday of the week that
 * contains the 1st, through the Sunday of the week that contains the last day.
 * Length is always a multiple of 7 (typically 35 or 42).
 *
 * @example
 * // June 2024 starts on Saturday → grid includes late May + early July
 * getMonthGridDays(new Date(2024, 5, 15));
 */
export const getMonthGridDays = (anchor: Date): Date[] => {
  const gridStart = startOfWeek(startOfMonth(anchor));
  const gridEnd = endOfWeek(endOfMonth(anchor));
  const days: Date[] = [];
  let cursor = gridStart;
  while (cursor.getTime() <= gridEnd.getTime()) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
};
