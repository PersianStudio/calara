/**
 * Month navigator + day grid for the date-picker popover.
 * Reuses the same core grid / format helpers as MiniCalendar.
 */

import { FC, useMemo } from 'react';
import {
  addMonths,
  formatDate,
  getMonthGridDays,
  isSameDay,
  isSameMonth,
  isToday,
  startOfDay,
} from '../../core/date';

const WEEKDAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export interface CalendarPanelProps {
  /** Currently selected day (highlight). */
  selected: Date | null;
  /** Month being browsed (may differ from selected while navigating). */
  viewMonth: Date;
  onViewMonthChange: (month: Date) => void;
  onSelectDay: (day: Date) => void;
  /** Days before this are not selectable. */
  minDate?: Date;
}

export const CalendarPanel: FC<CalendarPanelProps> = ({
  selected,
  viewMonth,
  onViewMonthChange,
  onSelectDay,
  minDate,
}) => {
  const days = useMemo(
    () => getMonthGridDays(viewMonth),
    [viewMonth.getFullYear(), viewMonth.getMonth()],
  );
  const min = minDate ? startOfDay(minDate) : null;

  return (
    <div className="calara-mini calara-datepicker__calendar">
      <div className="calara-mini__nav">
        <button
          type="button"
          className="calara-btn"
          aria-label="Previous month"
          onClick={() => onViewMonthChange(addMonths(viewMonth, -1))}
        >
          ‹
        </button>
        <div className="calara-mini__label">{formatDate(viewMonth, 'MMMM yyyy')}</div>
        <button
          type="button"
          className="calara-btn"
          aria-label="Next month"
          onClick={() => onViewMonthChange(addMonths(viewMonth, 1))}
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
          const isSelected = selected != null && isSameDay(day, selected);
          const outside = !isSameMonth(day, viewMonth);
          const today = isToday(day);
          const disabled = min != null && startOfDay(day).getTime() < min.getTime();
          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              className={[
                'calara-mini__day',
                outside ? 'is-outside' : '',
                isSelected ? 'is-selected' : '',
                today ? 'is-today' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => onSelectDay(day)}
            >
              {formatDate(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};
