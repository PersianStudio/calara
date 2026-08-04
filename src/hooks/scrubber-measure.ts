/**
 * DOM measurement helpers for the scrubber when hour rows grow dynamically.
 * Kept separate from the React hook so each module stays single-purpose.
 */

import { MINUTES_PER_HOUR, clampMinutesToGrid, hourOfMinutes } from '../core/time';

/**
 * Y inside a container of stacked hour rows → minutes from midnight.
 * Each direct child of `gridEl` is treated as one hour row.
 */
export const measuredYToMinutes = (
  y: number,
  gridEl: HTMLElement,
  startHour: number,
  endHour: number,
): number => {
  const rows = Array.from(gridEl.children) as HTMLElement[];
  if (rows.length === 0) return clampMinutesToGrid(startHour * MINUTES_PER_HOUR, startHour, endHour);

  let acc = 0;
  for (let i = 0; i < rows.length; i++) {
    const height = rows[i].offsetHeight;
    if (height <= 0) continue;
    if (y <= acc + height) {
      const frac = Math.min(1, Math.max(0, (y - acc) / height));
      return clampMinutesToGrid(Math.round((startHour + i + frac) * MINUTES_PER_HOUR), startHour, endHour);
    }
    acc += height;
  }
  return clampMinutesToGrid((endHour + 1) * MINUTES_PER_HOUR, startHour, endHour);
};

/** Minutes from midnight → Y using measured row heights. */
export const measuredMinutesToY = (
  minutes: number,
  gridEl: HTMLElement,
  startHour: number,
): number => {
  const rows = Array.from(gridEl.children) as HTMLElement[];
  const hourIndex = hourOfMinutes(minutes) - startHour;
  const minuteFrac = (minutes % MINUTES_PER_HOUR) / MINUTES_PER_HOUR;

  let acc = 0;
  for (let i = 0; i < rows.length; i++) {
    const height = rows[i].offsetHeight;
    if (i === hourIndex) return acc + minuteFrac * height;
    acc += height;
  }
  return acc;
};
