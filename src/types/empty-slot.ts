/**
 * Empty-slot click payload when the host wants "add meeting" from the board.
 */

export interface CalendarEmptySlotSelection {
  /** Calendar day for the new meeting. */
  date: Date;
  /** Hour of day (0–23). When omitted (month cells), defaults to 9:00. */
  hour?: number;
}
