/**
 * Normalized meeting payload for the Meeting Details drawer.
 * Mapped from day / week / month board events.
 */

export type CalendarMeetingKind = 'ice_call' | 'in_person_meeting';

export interface CalendarMeetingDetails {
  id: string;
  kind: CalendarMeetingKind;
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location?: string;
  travelMinutes?: number;
}
