/**
 * Calendar board view modes, filter keys, and plain-English defaults.
 */

/** Top-level board mode. `list` is reserved for a future agenda view. */
export type DsCalendarView = 'day' | 'week' | 'month' | 'list';

/** Filter toggles that map 1:1 to day-event kinds. */
export type DsCalendarFilterKey = 'ICE_CALLS' | 'IN_PERSON_MEETINGS' | 'TASKS' | 'REMINDERS';

export interface DsCalendarFilters {
  ICE_CALLS: boolean;
  IN_PERSON_MEETINGS: boolean;
  TASKS: boolean;
  REMINDERS: boolean;
}

/** Default board tab when a host does not pick one. */
export const DEFAULT_DS_CALENDAR_VIEW: DsCalendarView = 'day';

/** All filter categories enabled. */
export const DEFAULT_DS_CALENDAR_FILTERS: DsCalendarFilters = {
  ICE_CALLS: true,
  IN_PERSON_MEETINGS: true,
  TASKS: true,
  REMINDERS: true,
};

/** Tabs that actually render a board (excludes reserved `list`). */
export type DsCalendarBoardTab = Extract<DsCalendarView, 'day' | 'week' | 'month'>;

/**
 * Coerce an unknown string (URL param, storage) into a board tab.
 * Unknown values fall back to `day`.
 */
export const parseDsCalendarBoardTab = (raw: string | undefined | null): DsCalendarBoardTab => {
  if (raw === 'week' || raw === 'month' || raw === 'day') return raw;
  return 'day';
};

/** Sidebar / drawer checkbox labels in plain English. */
export const DS_CALENDAR_FILTER_OPTIONS: { value: DsCalendarFilterKey; label: string }[] = [
  { value: 'ICE_CALLS', label: 'ICE Call' },
  { value: 'IN_PERSON_MEETINGS', label: 'In Person Meetings' },
  { value: 'TASKS', label: 'Tasks' },
  { value: 'REMINDERS', label: 'Reminders' },
];

/** Keys whose filter flag is currently on. */
export const enabledDsCalendarFilters = (filters: DsCalendarFilters): DsCalendarFilterKey[] =>
  (Object.entries(filters) as [DsCalendarFilterKey, boolean][])
    .filter(([, on]) => on)
    .map(([key]) => key);

/** Convenience: enabled keys for the default filter set. */
export const defaultEnabledDsCalendarFilters = (): DsCalendarFilterKey[] =>
  enabledDsCalendarFilters(DEFAULT_DS_CALENDAR_FILTERS);
