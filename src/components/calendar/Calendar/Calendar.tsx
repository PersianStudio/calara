/**
 * Full calendar shell: toolbar + board slot + optional sidebar.
 */

import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import type { DsCalendarFilterKey, DsCalendarFilters, DsCalendarView } from '../../../types/calendar';
import { DsCalendarSidebar, type Holiday } from '../CalendarSidebar';
import { DsCalendarToolbar } from '../CalendarToolbar';

export interface DsCalendarProps {
  view: DsCalendarView;
  onViewChange: (view: DsCalendarView) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  search?: string;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  filters: DsCalendarFilters;
  onFilterChange: (id: DsCalendarFilterKey, checked: boolean) => void;
  holidays?: Holiday[];
  children: ReactNode;
}

export const DsCalendar: FC<DsCalendarProps> = ({
  view,
  onViewChange,
  currentDate,
  onDateChange,
  search,
  setSearch,
  sidebarOpen,
  onToggleSidebar,
  filters,
  onFilterChange,
  holidays,
  children,
}) => {
  return (
    <div className="calara calara-shell">
      <div className="calara-main">
        <DsCalendarToolbar
          view={view}
          onViewChange={onViewChange}
          currentDate={currentDate}
          onDateChange={onDateChange}
          search={search}
          setSearch={setSearch}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={onToggleSidebar}
        />
        {children}
      </div>
      {sidebarOpen ? (
        <DsCalendarSidebar
          currentDate={currentDate}
          onDateChange={onDateChange}
          filters={filters}
          onFilterChange={onFilterChange}
          holidays={holidays}
        />
      ) : null}
    </div>
  );
};

export default DsCalendar;
