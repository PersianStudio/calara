/**
 * Pure helper: shift `date` by one board unit (day / week / month).
 */

import { addDays, addMonths, addWeeks } from '../../../core/date';
import type { DsCalendarView } from '../../../types/calendar';

/** Move forward (`1`) or back (`-1`) by one view unit. */
export const shiftDate = (view: DsCalendarView, date: Date, dir: -1 | 1): Date => {
  if (view === 'day') return addDays(date, dir);
  if (view === 'week') return addWeeks(date, dir);
  return addMonths(date, dir);
};
