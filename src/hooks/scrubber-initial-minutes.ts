/**
 * Seed helper: place the scrubber at "now" when the viewed period includes today.
 */

import { MINUTES_PER_HOUR, minutesOfDay } from '../core/time';

/**
 * @returns minutes from midnight when `now` falls inside the visible hour range; otherwise `null`.
 */
export const scrubberInitialMinutes = (
  isViewingTodayOrCurrentWeek: boolean,
  startHour: number,
  endHour: number,
  now = new Date(),
): number | null => {
  if (!isViewingTodayOrCurrentWeek) return null;

  const nowMinutes = minutesOfDay(now);
  if (nowMinutes < startHour * MINUTES_PER_HOUR || nowMinutes > (endHour + 1) * MINUTES_PER_HOUR) {
    return null;
  }
  return nowMinutes;
};
