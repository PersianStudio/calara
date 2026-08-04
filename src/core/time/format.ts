/**
 * Human-readable clock labels derived from minutes-from-midnight.
 * Always format from minutes — never store a parallel display string.
 */

import { MINUTES_PER_HOUR } from './constants';
import { wrapMinutes } from './minutes';

const to12Hour = (hour24: number): number => (hour24 % 12 === 0 ? 12 : hour24 % 12);

const meridiem = (hour24: number): 'am' | 'pm' => (hour24 < 12 ? 'am' : 'pm');

/**
 * Hour-column label, e.g. `9 am` / `12 pm`.
 *
 * @param hour — hour-of-day (0–23); wrapped via the day clock if out of range
 */
export const formatHourLabel = (hour: number): string => {
  const hour24 = wrapMinutes(hour * MINUTES_PER_HOUR) / MINUTES_PER_HOUR;
  return `${to12Hour(hour24)} ${meridiem(hour24)}`;
};

/**
 * Clock label for minutes-from-midnight, e.g. `09:00 am`.
 * Zero-pads both hour (12h) and minute for stable column width.
 */
export const formatTimeOfDay = (minutesFromMidnight: number): string => {
  const total = wrapMinutes(minutesFromMidnight);
  const hour24 = Math.floor(total / MINUTES_PER_HOUR);
  const minute = total % MINUTES_PER_HOUR;
  return `${String(to12Hour(hour24)).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${meridiem(hour24)}`;
};

/**
 * Range label, e.g. `09:00 am - 11:00 am`.
 * Always derive it — never store a range string next to the minutes it describes.
 */
export const formatTimeRange = (startMinutes: number, endMinutes: number): string =>
  `${formatTimeOfDay(startMinutes)} - ${formatTimeOfDay(endMinutes)}`;

/**
 * Scrubber pill label — hour-only when on the hour (`4 pm`), otherwise with
 * minutes (`4:15 pm`). Always derive from minutes; never store this string.
 */
export const formatScrubberLabel = (minutesFromMidnight: number): string => {
  const total = wrapMinutes(minutesFromMidnight);
  const hour24 = Math.floor(total / MINUTES_PER_HOUR);
  const minute = total % MINUTES_PER_HOUR;
  if (minute === 0) return formatHourLabel(hour24);
  return `${to12Hour(hour24)}:${String(minute).padStart(2, '0')} ${meridiem(hour24)}`;
};
