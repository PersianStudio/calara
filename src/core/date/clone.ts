/**
 * Safe date cloning — every public date helper clones before mutating so
 * callers never see their inputs change underfoot (React state / props stay stable).
 */

/**
 * Return a new `Date` with the same instant as `d`.
 *
 * @example
 * const a = new Date('2024-06-15T10:00:00');
 * const b = cloneDate(a);
 * b.setHours(0); // `a` is untouched
 */
export const cloneDate = (d: Date): Date => new Date(d.getTime());
