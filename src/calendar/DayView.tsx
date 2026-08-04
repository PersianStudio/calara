import { FC, Fragment, useMemo, useRef } from 'react';
import moment from 'moment';
import type { DsCalendarFilterKey } from './types';
import type { CalendarEmptySlotSelection } from './utils/calendarEmptySlotTypes';
import {
  MINUTES_PER_HOUR,
  dayHourHeight,
  formatHourLabel,
  formatTimeRange,
  variableMinutesToHeight,
  variableMinutesToOffset,
} from './utils/calendarTime';
import { meetingDetailsFromDayEvent } from './meetingDetails/meetingDetailsMappers';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';
import { scrubberInitialMinutes, useCalendarTimeScrubber } from './hooks/useCalendarTimeScrubber';
import DsCalendarTimeIndicator from './TimeIndicator';
import type { CalendarDayEvent, CalendarDayEventType } from './day/dayEventTypes';

const DAY_START_HOUR = 0;
const DAY_END_HOUR = 23;

const FILTER_TO_EVENT_TYPE: Record<DsCalendarFilterKey, CalendarDayEventType> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
  TASKS: 'task',
  REMINDERS: 'reminder',
};

const occupiedStartMinutes = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') return event.hour * MINUTES_PER_HOUR;
  if (event.type === 'in_person_meeting' && event.travelMinutes) {
    return event.startMinutes - event.travelMinutes;
  }
  return event.startMinutes;
};

const occupiedEndMinutes = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') return event.hour * MINUTES_PER_HOUR + 15;
  return event.endMinutes;
};

const eventDisplayRange = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') {
    const start = event.hour * MINUTES_PER_HOUR;
    return { startMinutes: start, endMinutes: start + 15 };
  }
  return { startMinutes: event.startMinutes, endMinutes: event.endMinutes };
};

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
  const isToday = moment(currentDate).isSame(moment(), 'day');

  const hours = useMemo(
    () => Array.from({ length: DAY_END_HOUR - DAY_START_HOUR + 1 }, (_, i) => DAY_START_HOUR + i),
    [],
  );

  const visibleEvents = useMemo(() => {
    if (!enabledFilters) return events;
    const allowed = new Set(enabledFilters.map((key) => FILTER_TO_EVENT_TYPE[key]));
    return events.filter((event) => allowed.has(event.type));
  }, [enabledFilters, events]);

  const occupancyRanges = useMemo(
    () =>
      visibleEvents.map((event) => ({
        startMinutes: occupiedStartMinutes(event),
        endMinutes: occupiedEndMinutes(event),
      })),
    [visibleEvents],
  );

  const hourHeights = useMemo(
    () => hours.map((hour) => dayHourHeight(hour, occupancyRanges)),
    [hours, occupancyRanges],
  );

  const initialScrubberMinutes = useMemo(
    () => scrubberInitialMinutes(isToday, DAY_START_HOUR, DAY_END_HOUR),
    [isToday, moment(currentDate).format('YYYY-MM-DD')],
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
          <div className={['calara-timed__day-head', isToday ? 'is-today' : ''].filter(Boolean).join(' ')}>
            {moment(currentDate).format('dddd')}
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

            {hours.map((hour) => (
              <Fragment key={`slot-${hour}`}>
                {onEmptySlotClick ? (
                  <button
                    type="button"
                    className="calara-empty-slot"
                    data-label="Add new meeting"
                    style={{
                      top: variableMinutesToOffset(hour * MINUTES_PER_HOUR, DAY_START_HOUR, hourHeights),
                      height: hourHeights[hour - DAY_START_HOUR],
                    }}
                    onClick={() =>
                      onEmptySlotClick({
                        date: currentDate,
                        hour,
                      })
                    }
                  />
                ) : null}
              </Fragment>
            ))}

            {visibleEvents.map((event) => {
              const range = eventDisplayRange(event);
              const top = variableMinutesToOffset(range.startMinutes, DAY_START_HOUR, hourHeights);
              const height = variableMinutesToHeight(
                range.startMinutes,
                range.endMinutes,
                DAY_START_HOUR,
                hourHeights,
              );

              if (event.type === 'in_person_meeting' && event.travelMinutes) {
                const travelStart = event.startMinutes - event.travelMinutes;
                const travelTop = variableMinutesToOffset(travelStart, DAY_START_HOUR, hourHeights);
                const travelHeight = variableMinutesToHeight(
                  travelStart,
                  event.startMinutes,
                  DAY_START_HOUR,
                  hourHeights,
                );
                return (
                  <Fragment key={event.id}>
                    <div className="calara-travel" style={{ top: travelTop, height: travelHeight }}>
                      {event.travelMinutes} minutes travel time
                    </div>
                    <button
                      type="button"
                      className="calara-event calara-event--inperson"
                      style={{ top, height }}
                      onClick={() => onMeetingClick?.(meetingDetailsFromDayEvent(event, currentDate))}
                    >
                      <span className="calara-event__title">{event.title}</span>
                      <span className="calara-event__meta">
                        {formatTimeRange(event.startMinutes, event.endMinutes)}
                        {event.location ? ` · ${event.location}` : ''}
                      </span>
                    </button>
                  </Fragment>
                );
              }

              if (event.type === 'ice_call') {
                return (
                  <button
                    key={event.id}
                    type="button"
                    className="calara-event calara-event--ice"
                    style={{ top, height }}
                    onClick={() => onMeetingClick?.(meetingDetailsFromDayEvent(event, currentDate))}
                  >
                    <span className="calara-event__title">{event.title}</span>
                    <span className="calara-event__meta">
                      {formatTimeRange(event.startMinutes, event.endMinutes)}
                    </span>
                  </button>
                );
              }

              if (event.type === 'task') {
                return (
                  <div key={event.id} className="calara-event calara-event--task" style={{ top, height }}>
                    <span className="calara-event__title">{event.title}</span>
                    <span className="calara-event__meta">
                      {event.status === 'overdue' ? 'Overdue' : event.status === 'done' ? 'Done' : 'Task'}
                      {event.priority ? ` · ${event.priority}` : ''}
                    </span>
                  </div>
                );
              }

              if (event.type === 'reminder') {
                return (
                  <div key={event.id} className="calara-event calara-event--reminder" style={{ top, height }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={event.completed}
                        onChange={(e) => onReminderToggle?.(event.id, e.target.checked)}
                      />{' '}
                      {event.title}
                    </label>
                  </div>
                );
              }

              return null;
            })}

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
