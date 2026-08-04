/**
 * Scrollable list of clock times at a fixed interval (default every 15 minutes).
 */

import { FC, useEffect, useMemo, useRef } from 'react';
import { formatDate, getHours, getMinutes, setHoursMinutes } from '../../core/date';

const MINUTES_PER_DAY = 24 * 60;

export interface TimePanelProps {
  /** Date whose hours/minutes are being edited. */
  selected: Date | null;
  /** Called with a clone of `selected` (or today) with the picked clock time. */
  onSelectTime: (next: Date) => void;
  /** Interval in minutes between options (default 15). */
  timeIntervals?: number;
  /** Display pattern, e.g. `h:mm aa`. */
  dateFormat?: string;
}

/** Build every slot from midnight to 23:45 (or whatever interval allows). */
const buildSlots = (interval: number): number[] => {
  const step = Math.max(1, interval);
  const slots: number[] = [];
  for (let m = 0; m < MINUTES_PER_DAY; m += step) slots.push(m);
  return slots;
};

export const TimePanel: FC<TimePanelProps> = ({
  selected,
  onSelectTime,
  timeIntervals = 15,
  dateFormat = 'h:mm aa',
}) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const slots = useMemo(() => buildSlots(timeIntervals), [timeIntervals]);

  const selectedMinutes =
    selected != null ? getHours(selected) * 60 + getMinutes(selected) : null;

  // Scroll the active option into view when the panel opens / selection changes.
  useEffect(() => {
    if (selectedMinutes == null || !listRef.current) return;
    const active = listRef.current.querySelector<HTMLElement>('[data-active="true"]');
    active?.scrollIntoView({ block: 'center' });
  }, [selectedMinutes]);

  return (
    <div className="calara-datepicker__times" ref={listRef} role="listbox" aria-label="Choose time">
      {slots.map((mins) => {
        const hours = Math.floor(mins / 60);
        const minutes = mins % 60;
        const labelDate = setHoursMinutes(selected ?? new Date(), hours, minutes);
        const isActive = selectedMinutes === mins;
        return (
          <button
            key={mins}
            type="button"
            role="option"
            aria-selected={isActive}
            data-active={isActive ? 'true' : undefined}
            className={['calara-datepicker__time', isActive ? 'is-selected' : ''].filter(Boolean).join(' ')}
            onClick={() => onSelectTime(setHoursMinutes(selected ?? new Date(), hours, minutes))}
          >
            {formatDate(labelDate, dateFormat)}
          </button>
        );
      })}
    </div>
  );
};
