/**
 * Compact month navigator used in the calendar sidebar.
 */

import { FC, useMemo } from 'react';
import {
  addMonths,
  formatDate,
  getMonthGridDays,
  isSameDay,
  isSameMonth,
  isToday,
} from '../../../core/date';

export interface DsMiniCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  className?: string;
}

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const DsMiniCalendar: FC<DsMiniCalendarProps> = ({ value, onChange, className }) => {
  const days = useMemo(
    () => getMonthGridDays(value),
    [value.getFullYear(), value.getMonth()],
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
        <div className="calara-mini__label">{formatDate(value, 'MMMM yyyy')}</div>
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
          const today = isToday(day);
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
              {formatDate(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};
