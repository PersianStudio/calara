/**
 * Week-view helpers: filter map and occupancy ranges (travel included).
 */

import type { DsCalendarFilterKey } from '../../../types/calendar';
import type { CalendarDayEventType } from '../../../types/events-day';
import type { CalendarWeekEvent } from '../../../types/events-week';

/** Week board only shows ICE + in-person (tasks/reminders live on the day board). */
export const FILTER_TO_EVENT_TYPE: Partial<Record<DsCalendarFilterKey, CalendarDayEventType>> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
};

/** Inclusive start including optional travel strip. */
export const occupiedStartMinutes = (event: CalendarWeekEvent) =>
  event.type === 'in_person_meeting' && event.travelMinutes
    ? event.startMinutes - event.travelMinutes
    : event.startMinutes;

/** Keep only events whose type is enabled by the active filters. */
export const filterWeekEvents = (
  events: CalendarWeekEvent[],
  enabledFilters?: DsCalendarFilterKey[],
): CalendarWeekEvent[] => {
  if (!enabledFilters) return events;
  const allowed = new Set(
    enabledFilters
      .map((key) => FILTER_TO_EVENT_TYPE[key])
      .filter((type): type is CalendarDayEventType => Boolean(type)),
  );
  return events.filter((event) => allowed.has(event.type));
};

/** Occupancy ranges for adaptive hour heights. */
export const occupancyRangesForWeekEvents = (events: CalendarWeekEvent[]) =>
  events.map((event) => ({
    startMinutes: occupiedStartMinutes(event),
    endMinutes: event.endMinutes,
  }));
