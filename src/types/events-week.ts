/**
 * Week-board event shapes (ICE calls + in-person only).
 */

import type { CalendarDayEventType } from './events-day';

export type CalendarWeekEventType = Extract<CalendarDayEventType, 'ice_call' | 'in_person_meeting'>;

export interface CalendarWeekEventBase {
  id: string;
  type: CalendarWeekEventType;
  title: string;
  /**
   * Day index within the visible ISO week (0 = Monday … 6 = Sunday).
   */
  dayIndex: number;
  /**
   * Start as minutes from midnight. This is the **only** source of truth for the
   * event's time — the displayed range label is derived via `formatTimeRange`.
   */
  startMinutes: number;
  /** End as minutes from midnight. */
  endMinutes: number;
  /** Optional venue for Meeting Details. */
  location?: string;
}

export interface CalendarWeekIceCallEvent extends CalendarWeekEventBase {
  type: 'ice_call';
}

export interface CalendarWeekInPersonEvent extends CalendarWeekEventBase {
  type: 'in_person_meeting';
  /**
   * Travel time that occupies its own range **before** `startMinutes`
   * (`startMinutes - travelMinutes` → `startMinutes`). It never shortens the meeting.
   */
  travelMinutes?: number;
}

export type CalendarWeekEvent = CalendarWeekIceCallEvent | CalendarWeekInPersonEvent;
