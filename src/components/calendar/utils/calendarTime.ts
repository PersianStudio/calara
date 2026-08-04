/**
 * Single source of truth for ICE Calls calendar time math.
 *
 * Events store **only** minutes-from-midnight. Every human-readable time string
 * and every pixel offset is derived from those minutes here, so a card can never
 * claim one time while being drawn at another.
 */

export const MINUTES_PER_HOUR = 60;
export const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;

/** Vertical scale of the timed grids: 1 hour = 80px (Figma week board `25602:479678`). */
export const HOUR_HEIGHT = 80;

/**
 * Day board — empty / light hours stay compact; busy hours grow only as needed so
 * each overlapping segment still maps linearly to minutes (scrubber stays in sync).
 */
export const DAY_HOUR_HEIGHT_MIN = 60;

/** Minimum pixel height for a 15-minute card on the day board. */
export const DAY_QUARTER_CARD_HEIGHT = 68;

/** Cap: four 15-minute cards in one hour (linear scale). */
export const DAY_HOUR_HEIGHT_MAX = DAY_QUARTER_CARD_HEIGHT * 4;

/** @deprecated Prefer adaptive `dayHourHeight` — alias of the busy-hour cap. */
export const DAY_HOUR_HEIGHT = DAY_HOUR_HEIGHT_MAX;

/** One quarter-hour slot at the busy-hour cap scale. */
export const DAY_QUARTER_HEIGHT = DAY_QUARTER_CARD_HEIGHT;

const wrapMinutes = (minutes: number) => ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;

const to12Hour = (hour24: number) => (hour24 % 12 === 0 ? 12 : hour24 % 12);

const meridiem = (hour24: number) => (hour24 < 12 ? 'am' : 'pm');

/** Hour-column label, e.g. `9 am` / `12 pm`. */
export const formatHourLabel = (hour: number) => {
  const hour24 = wrapMinutes(hour * MINUTES_PER_HOUR) / MINUTES_PER_HOUR;
  return `${to12Hour(hour24)} ${meridiem(hour24)}`;
};

/** Clock label for minutes-from-midnight, e.g. `09:00 am`. */
export const formatTimeOfDay = (minutesFromMidnight: number) => {
  const total = wrapMinutes(minutesFromMidnight);
  const hour24 = Math.floor(total / MINUTES_PER_HOUR);
  const minute = total % MINUTES_PER_HOUR;
  return `${String(to12Hour(hour24)).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${meridiem(hour24)}`;
};

/**
 * Range label, e.g. `09:00 am - 11:00 am`.
 * Always derive it — never store a range string next to the minutes it describes.
 */
export const formatTimeRange = (startMinutes: number, endMinutes: number) =>
  `${formatTimeOfDay(startMinutes)} - ${formatTimeOfDay(endMinutes)}`;

/** Pixel offset of a time inside a grid whose first row is `gridStartHour`. */
export const minutesToOffset = (minutesFromMidnight: number, gridStartHour: number, hourHeight = HOUR_HEIGHT) =>
  ((minutesFromMidnight - gridStartHour * MINUTES_PER_HOUR) / MINUTES_PER_HOUR) * hourHeight;

/**
 * Inverse of `minutesToOffset` — Y inside a fixed-scale grid → minutes from midnight.
 * Round to the nearest minute so drag/click land on a real clock value.
 */
export const offsetToMinutes = (offsetPx: number, gridStartHour: number, hourHeight = HOUR_HEIGHT) =>
  Math.round(gridStartHour * MINUTES_PER_HOUR + (offsetPx / hourHeight) * MINUTES_PER_HOUR);

/**
 * Pixel height of a duration.
 * Never clamp the result — a minimum height makes the block stop at the wrong time.
 */
export const minutesToHeight = (durationMinutes: number, hourHeight = HOUR_HEIGHT) =>
  (durationMinutes / MINUTES_PER_HOUR) * hourHeight;

export type DayHourTimeRange = { startMinutes: number; endMinutes: number };

export type AdaptiveHourHeightOptions = {
  /** Empty / light hours stay at this size (day default 60, week Figma 80). */
  minHeight?: number;
  maxHeight?: number;
  quarterCardHeight?: number;
};

/**
 * Height for one timed-grid hour: compact when empty; grows so every overlapping
 * segment is at least `quarterCardHeight` tall when duration is 15 minutes
 * (scales linearly for other durations). Capped at `maxHeight`.
 */
export const dayHourHeight = (
  hour: number,
  ranges: DayHourTimeRange[],
  {
    minHeight = DAY_HOUR_HEIGHT_MIN,
    maxHeight = DAY_HOUR_HEIGHT_MAX,
    quarterCardHeight = DAY_QUARTER_CARD_HEIGHT,
  }: AdaptiveHourHeightOptions = {},
) => {
  const hourStart = hour * MINUTES_PER_HOUR;
  const hourEnd = hourStart + MINUTES_PER_HOUR;
  let required = minHeight;

  for (const range of ranges) {
    const overlapStart = Math.max(range.startMinutes, hourStart);
    const overlapEnd = Math.min(range.endMinutes, hourEnd);
    const duration = overlapEnd - overlapStart;
    if (duration <= 0) continue;
    required = Math.max(required, quarterCardHeight * (MINUTES_PER_HOUR / duration));
  }

  return Math.min(required, maxHeight);
};

/** Cumulative Y for minutes inside a variable-height grid (`hourHeights[0]` = `gridStartHour`). */
export const variableMinutesToOffset = (minutesFromMidnight: number, gridStartHour: number, hourHeights: number[]) => {
  const hour = Math.floor(minutesFromMidnight / MINUTES_PER_HOUR);
  const index = hour - gridStartHour;
  const frac = (minutesFromMidnight % MINUTES_PER_HOUR) / MINUTES_PER_HOUR;
  let y = 0;
  for (let i = 0; i < index; i++) {
    y += hourHeights[i] ?? DAY_HOUR_HEIGHT_MIN;
  }
  y += frac * (hourHeights[index] ?? DAY_HOUR_HEIGHT_MIN);
  return y;
};

/** Pixel span of a time range across variable-height hours. */
export const variableMinutesToHeight = (
  startMinutes: number,
  endMinutes: number,
  gridStartHour: number,
  hourHeights: number[],
) =>
  variableMinutesToOffset(endMinutes, gridStartHour, hourHeights) -
  variableMinutesToOffset(startMinutes, gridStartHour, hourHeights);

/** Inverse of `variableMinutesToOffset` — Y inside a variable-height grid → minutes. */
export const variableOffsetToMinutes = (
  offsetPx: number,
  gridStartHour: number,
  gridEndHour: number,
  hourHeights: number[],
) => {
  let acc = 0;
  for (let i = 0; i < hourHeights.length; i++) {
    const height = hourHeights[i];
    if (height <= 0) continue;
    if (offsetPx <= acc + height) {
      const frac = Math.min(1, Math.max(0, (offsetPx - acc) / height));
      return clampMinutesToGrid(Math.round((gridStartHour + i + frac) * MINUTES_PER_HOUR), gridStartHour, gridEndHour);
    }
    acc += height;
  }
  return clampMinutesToGrid((gridEndHour + 1) * MINUTES_PER_HOUR, gridStartHour, gridEndHour);
};

/** Hour row a timed event belongs to. */
export const hourOfMinutes = (minutesFromMidnight: number) => Math.floor(minutesFromMidnight / MINUTES_PER_HOUR);

/** Minutes-from-midnight for a `Date`, for comparing "now" against event ranges. */
export const minutesOfDay = (date: Date) => date.getHours() * MINUTES_PER_HOUR + date.getMinutes();

/** Clamp minutes to the inclusive hour range shown by a timed grid. */
export const clampMinutesToGrid = (minutesFromMidnight: number, gridStartHour: number, gridEndHour: number) => {
  const min = gridStartHour * MINUTES_PER_HOUR;
  const max = (gridEndHour + 1) * MINUTES_PER_HOUR;
  return Math.min(max, Math.max(min, minutesFromMidnight));
};

/**
 * Scrubber pill label — hour-only when on the hour (`4 pm`), otherwise with minutes (`4:15 pm`).
 * Always derive from minutes; never store this string.
 */
export const formatScrubberLabel = (minutesFromMidnight: number) => {
  const total = wrapMinutes(minutesFromMidnight);
  const hour24 = Math.floor(total / MINUTES_PER_HOUR);
  const minute = total % MINUTES_PER_HOUR;
  if (minute === 0) return formatHourLabel(hour24);
  return `${to12Hour(hour24)}:${String(minute).padStart(2, '0')} ${meridiem(hour24)}`;
};
