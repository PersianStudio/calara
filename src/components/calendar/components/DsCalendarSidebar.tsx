import { DsCard } from '../../card/DsCard';
import { DsMiniCalendar } from '../DsMiniCalendar';
import { Divider, Stack } from '@mui/material';
import { FC } from 'react';
import type { DsCalendarFilterKey, DsCalendarFilters } from '../types';
import DsCalendarHolidays, { Holiday } from './DsCalendarHolidays';
import DsCalendarFilterList from './DsCalendarFilterList';

export interface DsCalendarSidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  filters: DsCalendarFilters;
  onFilterChange: (id: DsCalendarFilterKey, checked: boolean) => void;
  holidays?: Holiday[];
}

const DsCalendarSidebar: FC<DsCalendarSidebarProps> = ({
  currentDate,
  onDateChange,
  filters,
  onFilterChange,
  holidays = [],
}) => {
  const hasHolidays = holidays.length > 0;

  return (
    <DsCard
      boxShadow="iceDefault"
      sx={{
        width: { xs: 1, lg: 385 },
        flexShrink: 0,
        alignSelf: { lg: 'flex-start' },
        p: { xs: 4, lg: 5 },
        pt: { lg: 2 },
      }}
    >
      <Stack spacing={4} width={1} alignItems="center">
        <DsMiniCalendar value={currentDate} onChange={onDateChange} />

        <Divider sx={{ width: 1 }} />

        {hasHolidays ? (
          <>
            <DsCalendarHolidays holidays={holidays} />
            <Divider sx={{ width: 1 }} />
          </>
        ) : null}

        <DsCalendarFilterList value={filters} onChange={onFilterChange} />
      </Stack>
    </DsCard>
  );
};

export default DsCalendarSidebar;
