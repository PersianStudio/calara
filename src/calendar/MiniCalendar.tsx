import { FC, useMemo } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export interface DsMiniCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  className?: string;
}

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const DsMiniCalendar: FC<DsMiniCalendarProps> = ({ value, onChange, className }) => {
  const monthStart = startOfMonth(value);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(endOfMonth(monthStart), { weekStartsOn: 1 });

  const days = useMemo(
    () => eachDayOfInterval({ start: gridStart, end: gridEnd }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthStart.getTime()],
  );

  return (
    <div className={['calara-mini', className].filter(Boolean).join(' ')}>
      <div className="calara-mini__nav">
        <button
          type="button"
          className="calara-btn"
          aria-label="Previous month"
          onClick={() => onChange(addMonths(value, -1))}
        >
          ‹
        </button>
        <div className="calara-mini__label">{format(value, 'MMMM yyyy')}</div>
        <button
          type="button"
          className="calara-btn"
          aria-label="Next month"
          onClick={() => onChange(addMonths(value, 1))}
        >
          ›
        </button>
      </div>
      <div className="calara-mini__grid">
        {WEEKDAY_LABELS.map((label, i) => (
          <div key={`${label}-${i}`} className="calara-mini__dow">
            {label}
          </div>
        ))}
        {days.map((day) => {
          const selected = isSameDay(day, value);
          const outside = !isSameMonth(day, value);
          const today = isSameDay(day, new Date());
          return (
            <button
              key={day.toISOString()}
              type="button"
              className={[
                'calara-mini__day',
                outside ? 'is-outside' : '',
                selected ? 'is-selected' : '',
                today ? 'is-today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onChange(day)}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};
