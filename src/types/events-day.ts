/**
 * Day-board event shapes. Minutes-from-midnight are the only stored times.
 */

import { hourOfMinutes } from '../core/time';

export type CalendarDayEventType = 'task' | 'reminder' | 'ice_call' | 'in_person_meeting';

export type TaskStatus = 'done' | 'overdue';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface CalendarDayEventBase {
  id: string;
  type: CalendarDayEventType;
  title: string;
}

/**
 * Day events that own a time range.
 *
 * Minutes are the only stored time — the hour row the card lands in and the
 * range label it shows are both derived, so they can never disagree.
 */
export interface CalendarDayTimedEventBase extends CalendarDayEventBase {
  /** Start as minutes from midnight. */
  startMinutes: number;
  /** End as minutes from midnight. */
  endMinutes: number;
}

export interface CalendarDayTaskEvent extends CalendarDayTimedEventBase {
  type: 'task';
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface CalendarDayReminderEvent extends CalendarDayEventBase {
  type: 'reminder';
  /** Reminders have no range — this is the hour row they sit in. */
  hour: number;
  completed: boolean;
}

export interface CalendarDayIceCallEvent extends CalendarDayTimedEventBase {
  type: 'ice_call';
}

export interface CalendarDayInPersonEvent extends CalendarDayTimedEventBase {
  type: 'in_person_meeting';
  /** Travel time preceding `startMinutes`; shown as a strip above the schedule line. */
  travelMinutes?: number;
  /** In-person venue — used by Meeting Details drawer. */
  location?: string;
}

export type CalendarDayEvent =
  | CalendarDayTaskEvent
  | CalendarDayReminderEvent
  | CalendarDayIceCallEvent
  | CalendarDayInPersonEvent;

/** Hour row an event belongs to in the day grid. */
export const dayEventHour = (event: CalendarDayEvent) =>
  event.type === 'reminder' ? event.hour : hourOfMinutes(event.startMinutes);
