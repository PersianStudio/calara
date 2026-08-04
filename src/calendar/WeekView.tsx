import { FC, Fragment, useMemo, useRef } from 'react';
import moment from 'moment';
import type { DsCalendarFilterKey } from './types';
import type { CalendarEmptySlotSelection } from './utils/calendarEmptySlotTypes';
import {
  HOUR_HEIGHT,
  MINUTES_PER_HOUR,
  dayHourHeight,
  formatHourLabel,
  formatTimeRange,
  variableMinutesToHeight,
  variableMinutesToOffset,
} from './utils/calendarTime';
import type { CalendarDayEventType } from './day/dayEventTypes';
import { meetingDetailsFromWeekEvent } from './meetingDetails/meetingDetailsMappers';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';
import { scrubberInitialMinutes, useCalendarTimeScrubber } from './hooks/useCalendarTimeScrubber';
import DsCalendarTimeIndicator from './TimeIndicator';
import type { CalendarWeekEvent } from './week/weekEventTypes';

const WEEK_START_HOUR = 0;
const WEEK_END_HOUR = 23;

const FILTER_TO_EVENT_TYPE: Partial<Record<DsCalendarFilterKey, CalendarDayEventType>> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
};

const occupiedStartMinutes = (event: CalendarWeekEvent) =>
  event.type === 'in_person_meeting' && event.travelMinutes
    ? event.startMinutes - event.travelMinutes
    : event.startMinutes;

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
  const weekStart = useMemo(() => moment(currentDate).startOf('isoWeek'), [currentDate]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => weekStart.clone().add(i, 'day')), [weekStart]);
  const hours = useMemo(
    () => Array.from({ length: WEEK_END_HOUR - WEEK_START_HOUR + 1 }, (_, i) => WEEK_START_HOUR + i),
    [],
  );
  const isCurrentWeek = moment().isSame(weekStart, 'isoWeek');
  const timedGridRef = useRef<HTMLDivElement | null>(null);

  const visibleEvents = useMemo(() => {
    const source = eventsProp ?? [];
    if (!enabledFilters) return source;
    const allowed = new Set(
      enabledFilters
        .map((key) => FILTER_TO_EVENT_TYPE[key])
        .filter((type): type is CalendarDayEventType => Boolean(type)),
    );
    return source.filter((event) => allowed.has(event.type));
  }, [enabledFilters, eventsProp]);

  const occupancyRanges = useMemo(
    () =>
      visibleEvents.map((event) => ({
        startMinutes: occupiedStartMinutes(event),
        endMinutes: event.endMinutes,
      })),
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
    [isCurrentWeek, weekStart.valueOf()],
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
          const isToday = day.isSame(moment(), 'day');
          return (
            <button
              key={day.format('YYYY-MM-DD')}
              type="button"
              className={['calara-timed__day-head', isToday ? 'is-today' : ''].filter(Boolean).join(' ')}
              onClick={() => onDateChange?.(day.toDate())}
            >
              {day.format('ddd D')}
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
            <div key={day.format('YYYY-MM-DD')} className="calara-timed__column">
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
                      onClick={() =>
                        onEmptySlotClick({
                          date: day.toDate(),
                          hour,
                        })
                      }
                    />
                  ))
                : null}

              {visibleEvents
                .filter((event) => event.dayIndex === dayIndex)
                .map((event) => {
                  const top = variableMinutesToOffset(event.startMinutes, WEEK_START_HOUR, hourHeights);
                  const height = variableMinutesToHeight(
                    event.startMinutes,
                    event.endMinutes,
                    WEEK_START_HOUR,
                    hourHeights,
                  );

                  if (event.type === 'in_person_meeting' && event.travelMinutes) {
                    const travelStart = event.startMinutes - event.travelMinutes;
                    return (
                      <Fragment key={event.id}>
                        <div
                          className="calara-travel"
                          style={{
                            top: variableMinutesToOffset(travelStart, WEEK_START_HOUR, hourHeights),
                            height: variableMinutesToHeight(
                              travelStart,
                              event.startMinutes,
                              WEEK_START_HOUR,
                              hourHeights,
                            ),
                          }}
                        >
                          {event.travelMinutes} minutes travel time
                        </div>
                        <button
                          type="button"
                          className="calara-event calara-event--inperson"
                          style={{ top, height }}
                          onClick={() =>
                            onMeetingClick?.(meetingDetailsFromWeekEvent(event, weekStart.toDate()))
                          }
                        >
                          <span className="calara-event__title">{event.title}</span>
                          <span className="calara-event__meta">
                            {formatTimeRange(event.startMinutes, event.endMinutes)}
                          </span>
                        </button>
                      </Fragment>
                    );
                  }

                  return (
                    <button
                      key={event.id}
                      type="button"
                      className={[
                        'calara-event',
                        event.type === 'ice_call' ? 'calara-event--ice' : 'calara-event--inperson',
                      ].join(' ')}
                      style={{ top, height }}
                      onClick={() => onMeetingClick?.(meetingDetailsFromWeekEvent(event, weekStart.toDate()))}
                    >
                      <span className="calara-event__title">{event.title}</span>
                      <span className="calara-event__meta">
                        {formatTimeRange(event.startMinutes, event.endMinutes)}
                      </span>
                    </button>
                  );
                })}
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
