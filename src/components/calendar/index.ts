/**
 * Public calendar component + type exports (stable API names).
 */

export { DsMiniCalendar } from './MiniCalendar';
export type { DsMiniCalendarProps } from './MiniCalendar';

export type {
  DsCalendarView,
  DsCalendarFilterKey,
  DsCalendarFilters,
  DsCalendarBoardTab,
} from '../../types/calendar';
export {
  DEFAULT_DS_CALENDAR_VIEW,
  DEFAULT_DS_CALENDAR_FILTERS,
  parseDsCalendarBoardTab,
  DS_CALENDAR_FILTER_OPTIONS,
  enabledDsCalendarFilters,
  defaultEnabledDsCalendarFilters,
} from '../../types/calendar';

export { default as DsCalendar } from './Calendar';
export type { DsCalendarProps } from './Calendar';

export { default as DsCalendarToolbar } from './CalendarToolbar';
export type { DsCalendarToolbarProps } from './CalendarToolbar';

export { default as DsCalendarSidebar, DsCalendarFilterList, DsCalendarHolidays } from './CalendarSidebar';
export type { DsCalendarSidebarProps, Holiday } from './CalendarSidebar';

export { default as DsCalendarBoard } from './CalendarBoard';
export type { DsCalendarBoardProps } from './CalendarBoard';

export { default as DsCalendarDrawer } from './CalendarDrawer';
export type { DsCalendarDrawerProps, DsCalendarDrawerCalendarOption } from './CalendarDrawer';

export { default as DsCalendarDayView } from './DayView';
export type { DsCalendarDayViewProps } from './DayView';

export { default as DsCalendarWeekView } from './WeekView';
export type { DsCalendarWeekViewProps } from './WeekView';

export { default as DsCalendarMonthView } from './MonthView';
export type { DsCalendarMonthViewProps } from './MonthView';

export { default as DsMeetingDetailsDrawer } from './MeetingDetailsDrawer';
export type { DsMeetingDetailsDrawerProps, MeetingDetailsFormValue } from './MeetingDetailsDrawer';

export type { CalendarMeetingDetails } from '../../types/meeting';
export {
  meetingDetailsFromDayEvent,
  meetingDetailsFromWeekEvent,
  meetingDetailsFromMonthEvent,
} from '../../utils/meeting-mappers';

export type {
  CalendarDayEvent,
  CalendarDayEventType,
  CalendarDayTaskEvent,
  CalendarDayReminderEvent,
  CalendarDayIceCallEvent,
  CalendarDayInPersonEvent,
  TaskStatus,
  TaskPriority,
} from '../../types/events-day';
export { dayEventHour } from '../../types/events-day';

export type {
  CalendarWeekEvent,
  CalendarWeekIceCallEvent,
  CalendarWeekInPersonEvent,
} from '../../types/events-week';

export type { CalendarMonthEvent } from '../../types/events-month';

export type { CalendarEmptySlotSelection } from '../../types/empty-slot';

export { calendarRangeForView } from '../../utils/calendar-range';
export { calendarBoardOccurrenceId, calendarMasterEventId } from '../../utils/calendar-board-ids';
