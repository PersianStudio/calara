/**
 * Routes day / week / month boards based on the active view tab.
 */

import { FC } from 'react';
import type { DsCalendarFilterKey, DsCalendarView } from '../../../types/calendar';
import type { CalendarEmptySlotSelection } from '../../../types/empty-slot';
import type { CalendarDayEvent } from '../../../types/events-day';
import type { CalendarMonthEvent } from '../../../types/events-month';
import type { CalendarWeekEvent } from '../../../types/events-week';
import type { CalendarMeetingDetails } from '../../../types/meeting';
import { DsCalendarDayView } from '../DayView';
import { DsCalendarMonthView } from '../MonthView';
import { DsCalendarWeekView } from '../WeekView';

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
