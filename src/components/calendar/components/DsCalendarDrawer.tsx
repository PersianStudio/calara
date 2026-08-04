import { ReactNode, FC } from 'react';
import { Grid, Stack } from '@mui/material';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { DsButton } from '../../buttons/DsButton';
import { DsDatePicker } from '../../datePicker/DsDatePicker';
import { DsDrawer } from '../../drawer/DsDrawer';
import { DsIcon } from '../../icons/DsIcon';
import { DsSelect } from '../../select/DsSelect';
import { DsTabs } from '../../tabs/DsTabs';
import { DsTypography } from '../../typography/DsTypography';
import {
  DS_CALENDAR_FILTER_OPTIONS,
  type DsCalendarBoardTab,
  type DsCalendarFilterKey,
} from '../types';
import DsCalendarBoard from './DsCalendarBoard';
import type { CalendarDayEvent } from './day/dayEventTypes';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';
import type { CalendarMonthEvent } from './month/monthEventTypes';
import type { CalendarWeekEvent } from './week/weekEventTypes';
import type { CalendarEmptySlotSelection } from '../utils/calendarEmptySlotTypes';

export interface DsCalendarDrawerCalendarOption {
  label: string;
  value: string;
}

export interface DsCalendarDrawerProps {
  open: boolean;
  onClose: () => void;
  view: DsCalendarBoardTab;
  onViewChange: (view: DsCalendarBoardTab) => void;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  /** Selected calendar id for the calendar picker. */
  calendarId: string;
  onCalendarIdChange: (id: string) => void;
  calendarOptions: DsCalendarDrawerCalendarOption[];
  itemFilters: DsCalendarFilterKey[];
  onItemFiltersChange: (filters: DsCalendarFilterKey[]) => void;
  dayEvents?: CalendarDayEvent[];
  weekEvents?: CalendarWeekEvent[];
  monthEvents?: CalendarMonthEvent[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
  onReminderToggle?: (id: string, completed: boolean) => void;
  /** Opens the full calendar page (e.g. navigate). */
  onOpenFullCalendar?: () => void;
  /** Zone-hosted mutation drawers rendered beside the drawer. */
  footer?: ReactNode;
}

/**
 * Compact calendar drawer chrome (tabs + filters + board).
 * Presentational only — no fetch / mutate.
 */
export const DsCalendarDrawer: FC<DsCalendarDrawerProps> = ({
  open,
  onClose,
  view,
  onViewChange,
  currentDate,
  onDateChange,
  calendarId,
  onCalendarIdChange,
  calendarOptions,
  itemFilters,
  onItemFiltersChange,
  dayEvents,
  weekEvents,
  monthEvents,
  onMeetingClick,
  onEmptySlotClick,
  onReminderToggle,
  onOpenFullCalendar,
  footer,
}) => {
  const { t } = useTranslation();

  const content = (
    <Stack spacing={5} height={1} minHeight={0}>
      <DsTabs
        type="flat"
        variant="fullWidth"
        value={view}
        onChange={(_, value: DsCalendarBoardTab) => onViewChange(value)}
        items={[
          { label: t('DAY'), value: 'day' },
          { label: t('WEEK'), value: 'week' },
          { label: t('MONTH'), value: 'month' },
        ]}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <DsDatePicker
            variant="field"
            inputSize="medium"
            inputLabel={t('DATE')}
            selected={currentDate}
            onChange={(date: Date | null) => {
              if (date) onDateChange(date);
            }}
            dateFormat="dd MMM yyyy"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DsSelect
            size="medium"
            label={t('CALENDAR')}
            disableClearable
            value={calendarId}
            onChange={(value) => onCalendarIdChange(value as string)}
            options={calendarOptions}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DsSelect
            type="multi"
            size="medium"
            label={t('CALENDAR_ITEMS')}
            value={itemFilters}
            onChange={(value) => onItemFiltersChange(value as DsCalendarFilterKey[])}
            options={DS_CALENDAR_FILTER_OPTIONS.map((option) => ({
              value: option.value,
              label: t(option.labelKey),
            }))}
            limitTags={2}
          />
        </Grid>
      </Grid>

      <Stack flex={1} minHeight={0} width={1} overflow="hidden">
        <DsCalendarBoard
          view={view}
          currentDate={currentDate}
          onDateChange={onDateChange}
          dayEvents={dayEvents}
          weekEvents={weekEvents}
          monthEvents={monthEvents}
          enabledFilters={itemFilters}
          showWeekdayHeader={false}
          onMeetingClick={onMeetingClick}
          onEmptySlotClick={onEmptySlotClick}
          onReminderToggle={onReminderToggle}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <DsDrawer
        open={open}
        onClose={onClose}
        size="xl"
        disableCloseOnOutsideClick={false}
        dialogContentProps={{
          sx: {
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flex: 1,
            minHeight: 0,
          },
        }}
        header={
          <Stack direction="row" alignItems="center" spacing={2}>
            {onOpenFullCalendar ? (
              <DsButton
                justIcon
                circle
                size="xSmall"
                variant="text"
                color="secondary"
                aria-label={t('OPEN_LABEL', { label: t('CALENDAR') })}
                onClick={onOpenFullCalendar}
              >
                <DsIcon icon="OPEN_IN_NEW_TAB" size="md" color="iceGray.700" />
              </DsButton>
            ) : null}
            <DsTypography variant="h5" fontWeight={600} color="iceGray.700">
              {t('CALENDAR')}
            </DsTypography>
          </Stack>
        }
        content={content}
      />
      {footer}
    </>
  );
};

export default DsCalendarDrawer;
