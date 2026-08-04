/**
 * Seven-day timed grid (ISO week Mon–Sun) with scrubber.
 * Per-day event markup lives in `WeekEventLayer`.
 */

import { FC, useMemo, useRef } from 'react';
import {
  formatDate,
  getWeekDays,
  isSameIsoWeek,
  isToday,
  startOfWeek,
} from '../../../core/date';
import {
  HOUR_HEIGHT,
  MINUTES_PER_HOUR,
  dayHourHeight,
  formatHourLabel,
  variableMinutesToOffset,
} from '../../../core/time';
import { scrubberInitialMinutes, useCalendarTimeScrubber } from '../../../hooks';
import type { DsCalendarFilterKey } from '../../../types/calendar';
import type { CalendarEmptySlotSelection } from '../../../types/empty-slot';
import type { CalendarWeekEvent } from '../../../types/events-week';
import type { CalendarMeetingDetails } from '../../../types/meeting';
import { DsCalendarTimeIndicator } from '../TimeIndicator';
import { WeekEventLayer } from './WeekEventLayer';
import { filterWeekEvents, occupancyRangesForWeekEvents } from './week-view.helpers';

const WEEK_START_HOUR = 0;
const WEEK_END_HOUR = 23;

export interface DsCalendarWeekViewProps {
  currentDate: Date;
  events?: CalendarWeekEvent[];
  onDateChange?: (date: Date) => void;
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
}

export const DsCalendarWeekView: FC<DsCalendarWeekViewProps> = ({
  currentDate,
  events: eventsProp,
  onDateChange,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
}) => {
  const weekStart = useMemo(() => startOfWeek(currentDate), [currentDate]);
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);
  const hours = useMemo(
    () => Array.from({ length: WEEK_END_HOUR - WEEK_START_HOUR + 1 }, (_, i) => WEEK_START_HOUR + i),
    [],
  );
  const isCurrentWeek = isSameIsoWeek(currentDate, new Date());
  const timedGridRef = useRef<HTMLDivElement | null>(null);

  const visibleEvents = useMemo(
    () => filterWeekEvents(eventsProp ?? [], enabledFilters),
    [enabledFilters, eventsProp],
  );

  const occupancyRanges = useMemo(
    () => occupancyRangesForWeekEvents(visibleEvents),
    [visibleEvents],
  );

  const hourHeights = useMemo(
    () =>
      hours.map((hour) =>
        dayHourHeight(hour, occupancyRanges, {
          minHeight: HOUR_HEIGHT,
        }),
      ),
    [hours, occupancyRanges],
  );

  const initialScrubberMinutes = useMemo(
    () => scrubberInitialMinutes(isCurrentWeek, WEEK_START_HOUR, WEEK_END_HOUR),
    [isCurrentWeek, weekStart.getTime()],
  );

  const scrubber = useCalendarTimeScrubber({
    startHour: WEEK_START_HOUR,
    endHour: WEEK_END_HOUR,
    gridRef: timedGridRef,
    hourHeights,
    initialMinutes: initialScrubberMinutes,
  });

  return (
    <div className="calara-timed">
      <div className="calara-timed__header">
        <div className="calara-timed__time-gutter" />
        {weekDays.map((day) => {
          const today = isToday(day);
          return (
            <button
              key={formatDate(day, 'yyyy-MM-dd')}
              type="button"
              className={['calara-timed__day-head', today ? 'is-today' : ''].filter(Boolean).join(' ')}
              onClick={() => onDateChange?.(day)}
            >
              {formatDate(day, 'EEE d')}
            </button>
          );
        })}
      </div>

      <div className="calara-timed__body">
        <div className="calara-timed__hours" onPointerDown={scrubber.onColumnPointerDown}>
          {hours.map((hour) => (
            <div
              key={hour}
              className="calara-timed__hour"
              style={{ height: hourHeights[hour - WEEK_START_HOUR] }}
            >
              {scrubber.hiddenHour === hour ? '' : formatHourLabel(hour)}
            </div>
          ))}
        </div>

        <div className="calara-timed__columns" ref={timedGridRef}>
          {weekDays.map((day, dayIndex) => (
            <div key={formatDate(day, 'yyyy-MM-dd')} className="calara-timed__column">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="calara-timed__hour-bg"
                  style={{ height: hourHeights[hour - WEEK_START_HOUR] }}
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
                        top: variableMinutesToOffset(hour * MINUTES_PER_HOUR, WEEK_START_HOUR, hourHeights),
                        height: hourHeights[hour - WEEK_START_HOUR],
                      }}
                      onClick={() => onEmptySlotClick({ date: day, hour })}
                    />
                  ))
                : null}

              <WeekEventLayer
                events={visibleEvents.filter((event) => event.dayIndex === dayIndex)}
                weekStart={weekStart}
                gridStartHour={WEEK_START_HOUR}
                hourHeights={hourHeights}
                onMeetingClick={onMeetingClick}
              />
            </div>
          ))}

          <DsCalendarTimeIndicator
            top={scrubber.top}
            minutes={scrubber.minutes}
            isDragging={scrubber.isDragging}
            onHeadPointerDown={scrubber.onHeadPointerDown}
          />
        </div>
      </div>
    </div>
  );
};

export default DsCalendarWeekView;
