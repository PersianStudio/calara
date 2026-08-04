import { FC } from 'react';
import type { DsCalendarFilterKey, DsCalendarView } from './types';
import type { CalendarEmptySlotSelection } from './utils/calendarEmptySlotTypes';
import DsCalendarDayView from './DayView';
import type { CalendarDayEvent } from './day/dayEventTypes';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';
import DsCalendarMonthView from './MonthView';
import type { CalendarMonthEvent } from './month/monthEventTypes';
import DsCalendarWeekView from './WeekView';
import type { CalendarWeekEvent } from './week/weekEventTypes';

export interface DsCalendarBoardProps {
  view: DsCalendarView;
  currentDate: Date;
  onDateChange?: (date: Date) => void;
  dayEvents?: CalendarDayEvent[];
  weekEvents?: CalendarWeekEvent[];
  monthEvents?: CalendarMonthEvent[];
  enabledFilters?: DsCalendarFilterKey[];
  showWeekdayHeader?: boolean;
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
  onReminderToggle?: (id: string, completed: boolean) => void;
}

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
    <div className="calara-board">
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
        <div className="calara-board" />
      )}
    </div>
  );
};

export default DsCalendarBoard;
