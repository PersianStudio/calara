/**
 * Month grid board — chips for ICE / in-person events.
 */

import { FC, useMemo } from 'react';
import {
  formatDate,
  getMonthGridDays,
  isSameDay,
  isSameMonth,
  isToday,
} from '../../../core/date';
import type { DsCalendarFilterKey } from '../../../types/calendar';
import type { CalendarEmptySlotSelection } from '../../../types/empty-slot';
import type { CalendarDayEventType } from '../../../types/events-day';
import type { CalendarMonthEvent } from '../../../types/events-month';
import type { CalendarMeetingDetails } from '../../../types/meeting';
import { meetingDetailsFromMonthEvent } from '../../../utils/meeting-mappers';

const MAX_EVENTS_PER_CELL = 3;

const FILTER_TO_EVENT_TYPE: Partial<Record<DsCalendarFilterKey, CalendarDayEventType>> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
};

/** Mon–Sun short labels for the month header row. */
const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface DsCalendarMonthViewProps {
  currentDate: Date;
  events?: CalendarMonthEvent[];
  onDateChange?: (date: Date) => void;
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
}

/** Chunk a flat day list into weeks of 7. */
const chunkWeeks = (days: Date[]): Date[][] => {
  const rows: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
  return rows;
};

export const DsCalendarMonthView: FC<DsCalendarMonthViewProps> = ({
  currentDate,
  events: eventsProp,
  onDateChange,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
}) => {
  const weeks = useMemo(
    () => chunkWeeks(getMonthGridDays(currentDate)),
    [currentDate.getFullYear(), currentDate.getMonth()],
  );

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
      const key = formatDate(event.date, 'yyyy-MM-dd');
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
            const key = formatDate(day, 'yyyy-MM-dd');
            const outside = !isSameMonth(day, currentDate);
            const selected = isSameDay(day, currentDate);
            const today = isToday(day);
            const dayEvents = (eventsByDayKey.get(key) ?? []).slice(0, MAX_EVENTS_PER_CELL);

            return (
              <div
                key={key}
                className={['calara-month__cell', outside ? 'is-outside' : ''].filter(Boolean).join(' ')}
                onDoubleClick={() => onEmptySlotClick?.({ date: day })}
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
                  onClick={() => onDateChange?.(day)}
                >
                  {formatDate(day, 'd')}
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
