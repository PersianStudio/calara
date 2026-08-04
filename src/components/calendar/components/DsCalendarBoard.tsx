import { Stack } from '@mui/material';
import { FC } from 'react';
import type { DsCalendarFilterKey, DsCalendarView } from '../types';
import type { CalendarEmptySlotSelection } from '../utils/calendarEmptySlotTypes';
import DsCalendarDayView from './day/DsCalendarDayView';
import type { CalendarDayEvent } from './day/dayEventTypes';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';
import DsCalendarMonthView from './month/DsCalendarMonthView';
import type { CalendarMonthEvent } from './month/monthEventTypes';
import DsCalendarWeekView from './week/DsCalendarWeekView';
import type { CalendarWeekEvent } from './week/weekEventTypes';

export interface DsCalendarBoardProps {
  view: DsCalendarView;
  currentDate: Date;
  onDateChange?: (date: Date) => void;
  dayEvents?: CalendarDayEvent[];
  weekEvents?: CalendarWeekEvent[];
  monthEvents?: CalendarMonthEvent[];
  enabledFilters?: DsCalendarFilterKey[];
  /** Page board shows weekday header; drawer day board does not. */
  showWeekdayHeader?: boolean;
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
  onReminderToggle?: (id: string, completed: boolean) => void;
}

/**
 * Presentational calendar board — switches day / week / month views.
 * Consumers supply already-mapped UI events; this component never fetches.
 */
export const DsCalendarBoard: FC<DsCalendarBoardProps> = ({
  view,
  currentDate,
  onDateChange,
  dayEvents,
  weekEvents,
  monthEvents,
  enabledFilters,
  showWeekdayHeader = true,
  onMeetingClick,
  onEmptySlotClick,
  onReminderToggle,
}) => {
  return (
    <Stack flex={1} width={1} minHeight={0} overflow="hidden">
      {view === 'day' ? (
        <DsCalendarDayView
          currentDate={currentDate}
          events={dayEvents}
          showWeekdayHeader={showWeekdayHeader}
          enabledFilters={enabledFilters}
          onMeetingClick={onMeetingClick}
          onEmptySlotClick={onEmptySlotClick}
          onReminderToggle={onReminderToggle}
        />
      ) : view === 'week' ? (
        <DsCalendarWeekView
          currentDate={currentDate}
          events={weekEvents}
          onDateChange={onDateChange}
          enabledFilters={enabledFilters}
          onMeetingClick={onMeetingClick}
          onEmptySlotClick={onEmptySlotClick}
        />
      ) : view === 'month' ? (
        <DsCalendarMonthView
          currentDate={currentDate}
          events={monthEvents}
          onDateChange={onDateChange}
          enabledFilters={enabledFilters}
          onMeetingClick={onMeetingClick}
          onEmptySlotClick={onEmptySlotClick}
        />
      ) : (
        // List tab temporarily disabled.
        <Stack flex={1} width={1} minHeight={0} />
      )}
    </Stack>
  );
};

export default DsCalendarBoard;
