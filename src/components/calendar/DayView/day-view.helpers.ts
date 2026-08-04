/**
 * Day-view helpers: filter → event-type map and occupancy ranges for adaptive hours.
 */

import { MINUTES_PER_HOUR } from '../../../core/time';
import type { DsCalendarFilterKey } from '../../../types/calendar';
import type { CalendarDayEvent, CalendarDayEventType } from '../../../types/events-day';

/** Map sidebar filter keys onto day-event `type` values. */
export const FILTER_TO_EVENT_TYPE: Record<DsCalendarFilterKey, CalendarDayEventType> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
  TASKS: 'task',
  REMINDERS: 'reminder',
};

/** Inclusive start of the pixels an event occupies (includes travel). */
export const occupiedStartMinutes = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') return event.hour * MINUTES_PER_HOUR;
  if (event.type === 'in_person_meeting' && event.travelMinutes) {
    return event.startMinutes - event.travelMinutes;
  }
  return event.startMinutes;
};

/** Inclusive end of the pixels an event occupies. */
export const occupiedEndMinutes = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') return event.hour * MINUTES_PER_HOUR + 15;
  return event.endMinutes;
};

/** Visual range for the event card itself (excludes travel strip). */
export const eventDisplayRange = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') {
    const start = event.hour * MINUTES_PER_HOUR;
    return { startMinutes: start, endMinutes: start + 15 };
  }
  return { startMinutes: event.startMinutes, endMinutes: event.endMinutes };
};

/** Keep only events whose type is enabled by the active filters. */
export const filterDayEvents = (
  events: CalendarDayEvent[],
  enabledFilters?: DsCalendarFilterKey[],
): CalendarDayEvent[] => {
  if (!enabledFilters) return events;
  const allowed = new Set(enabledFilters.map((key) => FILTER_TO_EVENT_TYPE[key]));
  return events.filter((event) => allowed.has(event.type));
};

/** Occupancy ranges used by `dayHourHeight` for adaptive row sizing. */
export const occupancyRangesForEvents = (events: CalendarDayEvent[]) =>
  events.map((event) => ({
    startMinutes: occupiedStartMinutes(event),
    endMinutes: occupiedEndMinutes(event),
  }));
