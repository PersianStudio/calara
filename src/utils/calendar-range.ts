/**
 * Visible date window for a calendar board tab (ISO UTC bounds).
 * Useful for API range queries or any consumer that needs the board's fetch window.
 */

import {
  endOfDay,
  endOfIsoWeek,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfIsoWeek,
  startOfMonth,
  startOfWeek,
  toUtcIsoString,
} from '../core/date';
import type { DsCalendarView } from '../types/calendar';

/**
 * Compute the inclusive UTC ISO range for the active board view.
 *
 * Local `startOf*` / `endOf*` first, then serialize — matching former
 * `moment(...).startOf(...).utc().toISOString()` behavior.
 */
export const calendarRangeForView = (
  view: DsCalendarView,
  currentDate: Date,
): { filter_from: string; filter_to: string } => {
  if (view === 'day') {
    return {
      filter_from: toUtcIsoString(startOfDay(currentDate)),
      filter_to: toUtcIsoString(endOfDay(currentDate)),
    };
  }
  if (view === 'week') {
    return {
      filter_from: toUtcIsoString(startOfIsoWeek(currentDate)),
      filter_to: toUtcIsoString(endOfIsoWeek(currentDate)),
    };
  }
  // month + list: full month grid (includes overflow weeks)
  return {
    filter_from: toUtcIsoString(startOfWeek(startOfMonth(currentDate))),
    filter_to: toUtcIsoString(endOfWeek(endOfMonth(currentDate))),
  };
};
