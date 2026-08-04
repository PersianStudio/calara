import { FC, useState } from 'react';
import { DS_CALENDAR_FILTER_OPTIONS, type DsCalendarFilterKey, type DsCalendarFilters } from './types';
import { DsMiniCalendar } from './MiniCalendar';

export interface Holiday {
  id: string;
  label: string;
}

export interface DsCalendarSidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  filters: DsCalendarFilters;
  onFilterChange: (id: DsCalendarFilterKey, checked: boolean) => void;
  holidays?: Holiday[];
}

export const DsCalendarHolidays: FC<{ holidays?: Holiday[] }> = ({ holidays = [] }) => {
  const [expanded, setExpanded] = useState(false);
  if (!holidays.length) return null;
  const shown = expanded ? holidays : holidays.slice(0, 2);
  return (
    <div>
      <h3>Holidays</h3>
      <div className="calara-holiday-list">
        {shown.map((h) => (
          <div key={h.id} className="calara-holiday">
            {h.label}
          </div>
        ))}
      </div>
      {holidays.length > 2 ? (
        <button type="button" className="calara-btn calara-btn--text" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  );
};

export const DsCalendarFilterList: FC<{
  filters: DsCalendarFilters;
  onFilterChange: (id: DsCalendarFilterKey, checked: boolean) => void;
}> = ({ filters, onFilterChange }) => (
  <div>
    <h3>Calendar items</h3>
    <div className="calara-filter-list">
      {DS_CALENDAR_FILTER_OPTIONS.map((opt) => (
        <label key={opt.value}>
          <input
            type="checkbox"
            checked={filters[opt.value]}
            onChange={(e) => onFilterChange(opt.value, e.target.checked)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);

export const DsCalendarSidebar: FC<DsCalendarSidebarProps> = ({
  currentDate,
  onDateChange,
  filters,
  onFilterChange,
  holidays,
}) => (
  <aside className="calara-sidebar">
    <div>
      <h3>My calendar</h3>
      <DsMiniCalendar value={currentDate} onChange={onDateChange} />
    </div>
    <DsCalendarHolidays holidays={holidays} />
    <DsCalendarFilterList filters={filters} onFilterChange={onFilterChange} />
  </aside>
);

export default DsCalendarSidebar;
