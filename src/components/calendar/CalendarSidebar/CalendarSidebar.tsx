/**
 * Right-hand sidebar: mini calendar, holidays, filter checkboxes.
 */

import { FC } from 'react';
import type { DsCalendarFilterKey, DsCalendarFilters } from '../../../types/calendar';
import { DsMiniCalendar } from '../MiniCalendar';
import { DsCalendarFilterList } from './FilterList';
import { DsCalendarHolidays, type Holiday } from './Holidays';

export type { Holiday };

export interface DsCalendarSidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  filters: DsCalendarFilters;
  onFilterChange: (id: DsCalendarFilterKey, checked: boolean) => void;
  holidays?: Holiday[];
}

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
