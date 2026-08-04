import moment from 'moment';
import type { DsCalendarView } from '../types';

/**
 * Visible date window for a calendar board tab (ISO UTC bounds).
 * Useful for API range queries or any consumer that needs the board's fetch window.
 */
export const calendarRangeForView = (
  view: DsCalendarView,
  currentDate: Date,
): { filter_from: string; filter_to: string } => {
  if (view === 'day') {
    return {
      filter_from: moment(currentDate).startOf('day').utc().toISOString(),
      filter_to: moment(currentDate).endOf('day').utc().toISOString(),
    };
  }
  if (view === 'week') {
    return {
      filter_from: moment(currentDate).startOf('isoWeek').utc().toISOString(),
      filter_to: moment(currentDate).endOf('isoWeek').utc().toISOString(),
    };
  }
  // month + list: full month grid (includes overflow weeks)
  return {
    filter_from: moment(currentDate).startOf('month').startOf('isoWeek').utc().toISOString(),
    filter_to: moment(currentDate).endOf('month').endOf('isoWeek').utc().toISOString(),
  };
};
