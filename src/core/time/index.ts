/**
 * Self-contained timed-grid helpers for calara.
 * Ported from `calendar/utils/calendarTime` — behavior kept identical.
 */

export {
  MINUTES_PER_HOUR,
  MINUTES_PER_DAY,
  HOUR_HEIGHT,
  DAY_HOUR_HEIGHT_MIN,
  DAY_HOUR_HEIGHT_MAX,
  DAY_QUARTER_CARD_HEIGHT,
} from './constants';

export { wrapMinutes, hourOfMinutes, minutesOfDay, clampMinutesToGrid } from './minutes';

export {
  formatHourLabel,
  formatTimeOfDay,
  formatTimeRange,
  formatScrubberLabel,
} from './format';

export {
  minutesToOffset,
  offsetToMinutes,
  minutesToHeight,
  dayHourHeight,
  variableMinutesToOffset,
  variableMinutesToHeight,
  variableOffsetToMinutes,
} from './grid-layout';

export type { DayHourTimeRange, AdaptiveHourHeightOptions } from './grid-layout';
