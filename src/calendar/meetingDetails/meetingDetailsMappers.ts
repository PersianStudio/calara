import moment from 'moment';
import { CalendarDayEvent } from '../day/dayEventTypes';
import { CalendarMonthEvent } from '../month/monthEventTypes';
import { CalendarWeekEvent } from '../week/weekEventTypes';
import { CalendarMeetingDetails } from './meetingDetailsTypes';

const combineDateAndMinutes = (date: Date, minutesFromMidnight: number) =>
  moment(date).startOf('day').add(minutesFromMidnight, 'minutes').toDate();

/**
 * All three mappers read the event's stored minutes directly.
 * Never parse a rendered range label back into dates — the label is derived
 * output, not data, and round-tripping it silently loses or invents time.
 */
export const meetingDetailsFromDayEvent = (
  event: Extract<CalendarDayEvent, { type: 'ice_call' | 'in_person_meeting' }>,
  currentDate: Date,
): CalendarMeetingDetails => {
  const day = moment(currentDate).startOf('day').toDate();

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

export const meetingDetailsFromWeekEvent = (event: CalendarWeekEvent, weekStart: Date): CalendarMeetingDetails => {
  const day = moment(weekStart).add(event.dayIndex, 'days').startOf('day').toDate();

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

export const meetingDetailsFromMonthEvent = (event: CalendarMonthEvent): CalendarMeetingDetails => {
  const day = moment(event.date).startOf('day').toDate();

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
