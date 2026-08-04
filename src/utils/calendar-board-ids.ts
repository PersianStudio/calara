/**
 * Recurring board rows share a master event id but need a stable React key per
 * occurrence. Non-`SINGLE` repeats append `__${startDateTime}`.
 */

/** Build a React key that is unique per occurrence of a recurring event. */
export const calendarBoardOccurrenceId = (
  masterId: string,
  startDateTime: string,
  repeatType?: string | null,
) => {
  const repeat = repeatType ?? 'SINGLE';
  if (repeat === 'SINGLE') return masterId;
  return `${masterId}__${startDateTime}`;
};

/** Strip occurrence suffix before calling update / reminder APIs. */
export const calendarMasterEventId = (boardOrMasterId: string) =>
  boardOrMasterId.split('__')[0] ?? boardOrMasterId;
