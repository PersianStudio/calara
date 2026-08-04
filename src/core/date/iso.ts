/**
 * UTC ISO strings for API range queries.
 *
 * Callers should first snap with `startOf*` / `endOf*` in **local** time, then
 * pass the result here — matching former `moment(...).startOf(...).utc().toISOString()`.
 */

/**
 * Serialize `date`'s absolute instant as a UTC ISO-8601 string (`…Z`).
 *
 * @example
 * // Local midnight → UTC offset applied by the runtime timezone
 * toUtcIsoString(startOfDay(new Date(2024, 5, 15)));
 * // e.g. "2024-06-14T20:30:00.000Z" in Asia/Tehran (UTC+3:30)
 */
export const toUtcIsoString = (date: Date): string => date.toISOString();
