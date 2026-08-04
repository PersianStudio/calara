export type DsCalendarView = 'day' | 'week' | 'month' | 'list';

export type DsCalendarFilterKey = 'ICE_CALLS' | 'IN_PERSON_MEETINGS' | 'TASKS' | 'REMINDERS';

export interface DsCalendarFilters {
  ICE_CALLS: boolean;
  IN_PERSON_MEETINGS: boolean;
  TASKS: boolean;
  REMINDERS: boolean;
}

export const DEFAULT_DS_CALENDAR_VIEW: DsCalendarView = 'day';

export const DEFAULT_DS_CALENDAR_FILTERS: DsCalendarFilters = {
  ICE_CALLS: true,
  IN_PERSON_MEETINGS: true,
  TASKS: true,
  REMINDERS: true,
};

/** Board tabs shared by full calendar page and compact drawer. */
export type DsCalendarBoardTab = Extract<DsCalendarView, 'day' | 'week' | 'month'>;

export const parseDsCalendarBoardTab = (raw: string | undefined | null): DsCalendarBoardTab => {
  if (raw === 'week' || raw === 'month' || raw === 'day') return raw;
  return 'day';
};

/** Default multi-select / filter catalog (label keys resolve via i18n). */
export const DS_CALENDAR_FILTER_OPTIONS: {
  value: DsCalendarFilterKey;
  labelKey: string;
}[] = [
  { value: 'ICE_CALLS', labelKey: 'ICE_CALL' },
  { value: 'IN_PERSON_MEETINGS', labelKey: 'IN_PERSON_MEETINGS' },
  { value: 'TASKS', labelKey: 'TASKS' },
  { value: 'REMINDERS', labelKey: 'REMINDERS' },
];

/** Active filter keys from a boolean filter map (order follows `DS_CALENDAR_FILTER_OPTIONS`). */
export const enabledDsCalendarFilters = (filters: DsCalendarFilters): DsCalendarFilterKey[] =>
  (Object.entries(filters) as [DsCalendarFilterKey, boolean][]).filter(([, on]) => on).map(([key]) => key);

/** Default enabled filter keys from `DEFAULT_DS_CALENDAR_FILTERS`. */
export const defaultEnabledDsCalendarFilters = (): DsCalendarFilterKey[] =>
  enabledDsCalendarFilters(DEFAULT_DS_CALENDAR_FILTERS);
