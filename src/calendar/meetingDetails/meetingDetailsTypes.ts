export type CalendarMeetingKind = 'ice_call' | 'in_person_meeting';

/**
 * Normalized meeting payload for the calendar Meeting Details drawer
 * (Figma `25618:480934`). Maps from day / week / month board fixtures until API is wired.
 */
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
