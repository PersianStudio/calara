/**
 * Shared scale constants for timed calendar boards (day / week grids).
 *
 * Events store **only** minutes-from-midnight; pixel layout derives from these
 * values so a card can never claim one time while being drawn at another.
 */

/** Minutes in one hour. */
export const MINUTES_PER_HOUR = 60;

/** Minutes in one civil day (24h). */
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
