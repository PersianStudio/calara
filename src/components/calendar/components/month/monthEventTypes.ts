import { CalendarDayEventType } from '../day/dayEventTypes';

export type CalendarMonthEventType = Extract<CalendarDayEventType, 'ice_call' | 'in_person_meeting'>;

export interface CalendarMonthEvent {
  id: string;
  type: CalendarMonthEventType;
  title: string;
  /** Local calendar day (date-only; the time of day comes from the minutes below). */
  date: Date;
  /**
   * Start as minutes from midnight. Required so opening a month chip in Meeting
   * Details shows the event's real time instead of a fabricated default.
   */
  startMinutes: number;
  /** End as minutes from midnight. */
  endMinutes: number;
  location?: string;
  travelMinutes?: number;
}
