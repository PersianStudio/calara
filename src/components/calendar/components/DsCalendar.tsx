import { ReactNode, FC } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Stack } from '@mui/material';
import { DsCard } from '../../card/DsCard';
import type { DsCalendarFilterKey, DsCalendarFilters, DsCalendarView } from '../types';
import type { Holiday } from './DsCalendarHolidays';
import DsCalendarSidebar from './DsCalendarSidebar';
import DsCalendarToolbar from './DsCalendarToolbar';

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
  /** Board body (typically `DsCalendarBoard` or a zone API wrapper). */
  children: ReactNode;
}

/**
 * Full calendar page chrome: toolbar + board card + optional right sidebar.
 * Presentational only — consumers own date/view/filter state and board data.
 */
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
    <Stack
      direction={{ xs: 'column', lg: 'row' }}
      spacing={4}
      flex={1}
      minHeight={0}
      alignItems={{ lg: 'flex-start' }}
    >
      <DsCard
        boxShadow="iceDefault"
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          width: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          alignSelf: { lg: 'stretch' },
        }}
      >
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
      </DsCard>

      {sidebarOpen ? (
        <DsCalendarSidebar
          currentDate={currentDate}
          onDateChange={onDateChange}
          filters={filters}
          onFilterChange={onFilterChange}
          holidays={holidays}
        />
      ) : null}
    </Stack>
  );
};

export default DsCalendar;
