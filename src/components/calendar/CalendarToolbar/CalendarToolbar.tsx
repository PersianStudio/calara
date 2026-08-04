/**
 * Top bar: prev/next, date picker, view tabs, search, sidebar toggle.
 */

import { Dispatch, FC, SetStateAction } from 'react';
import { DsDatePicker } from '../../date-picker';
import type { DsCalendarView } from '../../../types/calendar';
import { shiftDate } from './shift-date';

export interface DsCalendarToolbarProps {
  view: DsCalendarView;
  onViewChange: (view: DsCalendarView) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  search?: string;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const DsCalendarToolbar: FC<DsCalendarToolbarProps> = ({
  view,
  onViewChange,
  currentDate,
  onDateChange,
  search,
  setSearch,
  sidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <div className="calara-toolbar">
      <div className="calara-toolbar__group">
        <button
          type="button"
          className="calara-btn"
          aria-label="Previous"
          onClick={() => onDateChange(shiftDate(view, currentDate, -1))}
        >
          ‹
        </button>
        <DsDatePicker
          variant="inlineText"
          selected={currentDate}
          onChange={(d) => {
            if (d instanceof Date) onDateChange(d);
          }}
          triggerAriaLabel="Choose date"
        />
        <button
          type="button"
          className="calara-btn"
          aria-label="Next"
          onClick={() => onDateChange(shiftDate(view, currentDate, 1))}
        >
          ›
        </button>
        <button type="button" className="calara-btn" onClick={() => onDateChange(new Date())}>
          Today
        </button>
      </div>

      <div className="calara-toolbar__group">
        {(['day', 'week', 'month'] as const).map((v) => (
          <button
            key={v}
            type="button"
            className={['calara-btn', view === v ? 'calara-btn--active' : ''].filter(Boolean).join(' ')}
            onClick={() => onViewChange(v)}
          >
            {v === 'day' ? 'Day' : v === 'week' ? 'Week' : 'Month'}
          </button>
        ))}
      </div>

      <div className="calara-toolbar__spacer" />

      <div className="calara-toolbar__group">
        <input
          className="calara-input"
          placeholder="Search"
          value={search ?? ''}
          onChange={(e) => setSearch(e.target.value || undefined)}
          aria-label="Search calendar"
        />
        <button type="button" className="calara-btn" onClick={onToggleSidebar} aria-pressed={sidebarOpen}>
          {sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        </button>
      </div>
    </div>
  );
};

export default DsCalendarToolbar;
