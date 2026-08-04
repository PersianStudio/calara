/**
 * Single-day timed grid with adaptive hour heights and scrubber.
 * Event markup lives in `DayEventLayer` so this file stays layout-focused.
 */

import { FC, useMemo, useRef } from 'react';
import { formatDate, isToday } from '../../../core/date';
import {
  MINUTES_PER_HOUR,
  dayHourHeight,
  formatHourLabel,
  variableMinutesToOffset,
} from '../../../core/time';
import { scrubberInitialMinutes, useCalendarTimeScrubber } from '../../../hooks';
import type { DsCalendarFilterKey } from '../../../types/calendar';
import type { CalendarEmptySlotSelection } from '../../../types/empty-slot';
import type { CalendarDayEvent } from '../../../types/events-day';
import type { CalendarMeetingDetails } from '../../../types/meeting';
import { DsCalendarTimeIndicator } from '../TimeIndicator';
import { DayEventLayer } from './DayEventLayer';
import { filterDayEvents, occupancyRangesForEvents } from './day-view.helpers';

const DAY_START_HOUR = 0;
const DAY_END_HOUR = 23;

export interface DsCalendarDayViewProps {
  currentDate: Date;
  events?: CalendarDayEvent[];
  showWeekdayHeader?: boolean;
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
  onReminderToggle?: (id: string, completed: boolean) => void;
}

export const DsCalendarDayView: FC<DsCalendarDayViewProps> = ({
  currentDate,
  events: eventsProp,
  showWeekdayHeader = true,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
  onReminderToggle,
}) => {
  const events = eventsProp ?? [];
  const timedGridRef = useRef<HTMLDivElement | null>(null);
  const viewingToday = isToday(currentDate);

  const hours = useMemo(
    () => Array.from({ length: DAY_END_HOUR - DAY_START_HOUR + 1 }, (_, i) => DAY_START_HOUR + i),
    [],
  );

  const visibleEvents = useMemo(
    () => filterDayEvents(events, enabledFilters),
    [enabledFilters, events],
  );

  const occupancyRanges = useMemo(
    () => occupancyRangesForEvents(visibleEvents),
    [visibleEvents],
  );

  const hourHeights = useMemo(
    () => hours.map((hour) => dayHourHeight(hour, occupancyRanges)),
    [hours, occupancyRanges],
  );

  const initialScrubberMinutes = useMemo(
    () => scrubberInitialMinutes(viewingToday, DAY_START_HOUR, DAY_END_HOUR),
    [viewingToday, formatDate(currentDate, 'yyyy-MM-dd')],
  );

  const scrubber = useCalendarTimeScrubber({
    startHour: DAY_START_HOUR,
    endHour: DAY_END_HOUR,
    gridRef: timedGridRef,
    hourHeights,
    initialMinutes: initialScrubberMinutes,
  });

  return (
    <div className="calara-timed">
      {showWeekdayHeader ? (
        <div className="calara-timed__header">
          <div className="calara-timed__time-gutter" />
          <div
            className={['calara-timed__day-head', viewingToday ? 'is-today' : '']
              .filter(Boolean)
              .join(' ')}
          >
            {formatDate(currentDate, 'EEEE')}
          </div>
        </div>
      ) : null}

      <div className="calara-timed__body">
        <div className="calara-timed__hours" onPointerDown={scrubber.onColumnPointerDown}>
          {hours.map((hour) => (
            <div
              key={hour}
              className="calara-timed__hour"
              style={{ height: hourHeights[hour - DAY_START_HOUR] }}
            >
              {scrubber.hiddenHour === hour ? '' : formatHourLabel(hour)}
            </div>
          ))}
        </div>

        <div className="calara-timed__columns">
          <div className="calara-timed__column" ref={timedGridRef}>
            {hours.map((hour) => (
              <div
                key={hour}
                className="calara-timed__hour-bg"
                style={{ height: hourHeights[hour - DAY_START_HOUR] }}
              />
            ))}

            {onEmptySlotClick
              ? hours.map((hour) => (
                  <button
                    key={`slot-${hour}`}
                    type="button"
                    className="calara-empty-slot"
                    data-label="Add new meeting"
                    style={{
                      top: variableMinutesToOffset(hour * MINUTES_PER_HOUR, DAY_START_HOUR, hourHeights),
                      height: hourHeights[hour - DAY_START_HOUR],
                    }}
                    onClick={() => onEmptySlotClick({ date: currentDate, hour })}
                  />
                ))
              : null}

            <DayEventLayer
              events={visibleEvents}
              currentDate={currentDate}
              gridStartHour={DAY_START_HOUR}
              hourHeights={hourHeights}
              onMeetingClick={onMeetingClick}
              onReminderToggle={onReminderToggle}
            />

            <DsCalendarTimeIndicator
              top={scrubber.top}
              minutes={scrubber.minutes}
              isDragging={scrubber.isDragging}
              onHeadPointerDown={scrubber.onHeadPointerDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DsCalendarDayView;
