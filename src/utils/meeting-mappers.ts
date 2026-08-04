/**
 * Map day / week / month board events into the Meeting Details drawer payload.
 *
 * All three mappers read the event's stored minutes directly.
 * Never parse a rendered range label back into dates — the label is derived
 * output, not data, and round-tripping it silently loses or invents time.
 */

import { addDays, addMinutes, startOfDay } from '../core/date';
import type { CalendarDayEvent } from '../types/events-day';
import type { CalendarMonthEvent } from '../types/events-month';
import type { CalendarWeekEvent } from '../types/events-week';
import type { CalendarMeetingDetails } from '../types/meeting';

/** Combine a calendar day with minutes-from-midnight into a local Date. */
const combineDateAndMinutes = (date: Date, minutesFromMidnight: number): Date =>
  addMinutes(startOfDay(date), minutesFromMidnight);

/** Day-board ICE / in-person → drawer payload. */
export const meetingDetailsFromDayEvent = (
  event: Extract<CalendarDayEvent, { type: 'ice_call' | 'in_person_meeting' }>,
  currentDate: Date,
): CalendarMeetingDetails => {
  const day = startOfDay(currentDate);

  return {
    id: event.id,
    kind: event.type,
    title: event.title,
    date: day,
    startTime: combineDateAndMinutes(day, event.startMinutes),
    endTime: combineDateAndMinutes(day, event.endMinutes),
    location: event.type === 'in_person_meeting' ? event.location : undefined,
    travelMinutes: event.type === 'in_person_meeting' ? event.travelMinutes : undefined,
  };
};

/** Week-board event → drawer payload (`weekStart` is Monday of the visible week). */
export const meetingDetailsFromWeekEvent = (
  event: CalendarWeekEvent,
  weekStart: Date,
): CalendarMeetingDetails => {
  const day = startOfDay(addDays(weekStart, event.dayIndex));

  return {
    id: event.id,
    kind: event.type,
    title: event.title,
    date: day,
    startTime: combineDateAndMinutes(day, event.startMinutes),
    endTime: combineDateAndMinutes(day, event.endMinutes),
    location: event.location,
    travelMinutes: event.type === 'in_person_meeting' ? event.travelMinutes : undefined,
  };
};

/** Month-board chip → drawer payload. */
export const meetingDetailsFromMonthEvent = (event: CalendarMonthEvent): CalendarMeetingDetails => {
  const day = startOfDay(event.date);

  return {
    id: event.id,
    kind: event.type,
    title: event.title,
    date: day,
    startTime: combineDateAndMinutes(day, event.startMinutes),
    endTime: combineDateAndMinutes(day, event.endMinutes),
    location: event.location,
    travelMinutes: event.travelMinutes,
  };
};
