import { FC, useMemo } from 'react';
import moment, { Moment } from 'moment';
import type { DsCalendarFilterKey } from './types';
import type { CalendarEmptySlotSelection } from './utils/calendarEmptySlotTypes';
import type { CalendarDayEventType } from './day/dayEventTypes';
import { meetingDetailsFromMonthEvent } from './meetingDetails/meetingDetailsMappers';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';
import type { CalendarMonthEvent } from './month/monthEventTypes';

const MAX_EVENTS_PER_CELL = 3;

const FILTER_TO_EVENT_TYPE: Partial<Record<DsCalendarFilterKey, CalendarDayEventType>> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
};

const WEEKDAY_LABELS = Array.from({ length: 7 }, (_, i) =>
  moment()
    .isoWeekday(i + 1)
    .format('ddd'),
);

export interface DsCalendarMonthViewProps {
  currentDate: Date;
  events?: CalendarMonthEvent[];
  onDateChange?: (date: Date) => void;
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
}

export const DsCalendarMonthView: FC<DsCalendarMonthViewProps> = ({
  currentDate,
  events: eventsProp,
  onDateChange,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
}) => {
  const month = useMemo(() => moment(currentDate), [currentDate]);

  const weeks = useMemo(() => {
    const start = month.clone().startOf('month').startOf('isoWeek');
    const end = month.clone().endOf('month').endOf('isoWeek');
    const days: Moment[] = [];
    const cursor = start.clone();
    while (cursor.isSameOrBefore(end, 'day')) {
      days.push(cursor.clone());
      cursor.add(1, 'day');
    }
    const rows: Moment[][] = [];
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
    return rows;
  }, [month]);

  const events = useMemo(() => {
    const all = eventsProp ?? [];
    if (!enabledFilters) return all;
    const allowed = new Set(
      enabledFilters
        .map((key) => FILTER_TO_EVENT_TYPE[key])
        .filter((type): type is CalendarDayEventType => Boolean(type)),
    );
    return all.filter((event) => allowed.has(event.type));
  }, [enabledFilters, eventsProp]);

  const eventsByDayKey = useMemo(() => {
    const map = new Map<string, CalendarMonthEvent[]>();
    for (const event of events) {
      const key = moment(event.date).format('YYYY-MM-DD');
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, [events]);

  return (
    <div className="calara-month">
      <div className="calara-month__weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="calara-month__weekday">
            {label}
          </div>
        ))}
      </div>
      {weeks.map((week, wi) => (
        <div key={wi} className="calara-month__week">
          {week.map((day) => {
            const key = day.format('YYYY-MM-DD');
            const outside = !day.isSame(month, 'month');
            const selected = day.isSame(currentDate, 'day');
            const today = day.isSame(moment(), 'day');
            const dayEvents = (eventsByDayKey.get(key) ?? []).slice(0, MAX_EVENTS_PER_CELL);

            return (
              <div
                key={key}
                className={['calara-month__cell', outside ? 'is-outside' : ''].filter(Boolean).join(' ')}
                onDoubleClick={() => onEmptySlotClick?.({ date: day.toDate() })}
              >
                <button
                  type="button"
                  className={[
                    'calara-month__daynum',
                    selected ? 'is-selected' : '',
                    today ? 'is-today' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => onDateChange?.(day.toDate())}
                >
                  {day.format('D')}
                </button>
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    className={[
                      'calara-chip',
                      event.type === 'ice_call' ? 'calara-chip--ice' : 'calara-chip--inperson',
                    ].join(' ')}
                    onClick={() => onMeetingClick?.(meetingDetailsFromMonthEvent(event))}
                  >
                    {event.title}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default DsCalendarMonthView;
