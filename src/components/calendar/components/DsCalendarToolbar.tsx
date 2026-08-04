import { DsButton } from '../../buttons/DsButton';
import { DsDatePicker } from '../../datePicker/DsDatePicker';
import { DsGroupButton } from '../../groupButton/DsGroupButton';
import { DsIcon } from '../../icons/DsIcon';
import { DsTypography } from '../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { SearchBox } from '@ice-web-app/shared-ui';
import { Grid, Stack } from '@mui/material';
import moment from 'moment';
import { Dispatch, FC, SetStateAction } from 'react';
// ANCHOR: missing-ds-icon/SIDEBAR_TOGGLE — Calendar toolbar sidebar panel toggle (25602:477648). Temporary local SVG until IceIconsEnum + DsIcon exist.
import { SidebarToggleIcon } from '../assets/SidebarToggleIcon';
import type { DsCalendarView } from '../types';

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

const VIEW_OPTIONS: DsCalendarView[] = [
  'day',
  'week',
  'month',
  // 'list', // temporarily hidden on the calendar page
];

/**
 * Figma Header (25602:477637) inside white calendar card.
 * - Date nav: prev/next icon buttons + DsDatePicker inlineText
 * - View switcher: outlined Day/Week/Month group (centered). List tab temporarily commented out.
 * - Search (200px) + sidebar toggle
 */
const DsCalendarToolbar: FC<DsCalendarToolbarProps> = ({
  view,
  onViewChange,
  currentDate,
  onDateChange,
  search,
  setSearch,
  sidebarOpen,
  onToggleSidebar,
}) => {
  const { t } = useTranslation();

  const shiftDate = (direction: -1 | 1) => {
    const next = moment(currentDate);
    if (view === 'week') {
      next.add(direction, 'week');
    } else if (view === 'month') {
      next.add(direction, 'month');
    } else {
      next.add(direction, 'day');
    }
    onDateChange(next.toDate());
  };

  const viewLabel = (option: DsCalendarView) => {
    switch (option) {
      case 'day':
        return t('DAY');
      case 'week':
        return t('WEEK');
      case 'month':
        return t('MONTH');
      case 'list':
        return t('LIST');
    }
  };

  return (
    <Grid container alignItems="center" spacing={{ xs: 4, md: 0 }} px={2} py={5}>
      <Grid item xs={12} md={4}>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Stack direction="row" alignItems="center">
            <DsButton
              justIcon
              size="small"
              variant="text"
              color="secondary"
              aria-label={t('PREVIOUS')}
              onClick={() => shiftDate(-1)}
              sx={{ width: 40, height: 40, minWidth: 40 }}
            >
              <DsIcon icon="CHEVRON_LEFT" size="sm" color="iceGray.700" />
            </DsButton>
            <DsButton
              justIcon
              size="small"
              variant="text"
              color="secondary"
              aria-label={t('NEXT')}
              onClick={() => shiftDate(1)}
              sx={{ width: 40, height: 40, minWidth: 40 }}
            >
              <DsIcon icon="CHEVRON_RIGHT" size="sm" color="iceGray.700" />
            </DsButton>
          </Stack>

          <DsDatePicker
            variant="inlineText"
            selected={currentDate}
            onChange={(date: Date | null) => {
              if (date) onDateChange(date);
            }}
            dateFormat="d MMMM yyyy"
            triggerAriaLabel={t('CALENDAR')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} display="flex" justifyContent="center">
        <DsGroupButton
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            '& .MuiButton-root': {
              minWidth: 100,
              height: 40,
              px: 3.5,
            },
          }}
          items={VIEW_OPTIONS.map((option) => ({
            children: (
              <DsTypography variant="caption" component="span">
                {viewLabel(option)}
              </DsTypography>
            ),
            onClick: () => onViewChange(option),
            sx:
              view === option
                ? {
                    bgcolor: ({ palette }) => palette.primary['opacity-8'],
                    '&:hover': {
                      bgcolor: ({ palette }) => palette.primary['opacity-16'],
                    },
                  }
                : undefined,
          }))}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Stack direction="row" alignItems="center" spacing={1} justifyContent="flex-end">
          <SearchBox
            noFilter
            withParams={false}
            search={search}
            setSearch={setSearch}
            sx={{ maxWidth: 200, width: 200 }}
          />
          <DsButton
            justIcon
            size="small"
            variant="text"
            color="secondary"
            aria-label={t('TOGGLE_LABEL', { label: t('CALENDAR') })}
            aria-pressed={sidebarOpen}
            onClick={onToggleSidebar}
            sx={{ width: 40, height: 40, minWidth: 40 }}
          >
            {/* ANCHOR: missing-ds-icon/SIDEBAR_TOGGLE — Calendar toolbar sidebar panel toggle (25602:477648). Temporary local SVG until IceIconsEnum + DsIcon exist. */}
            <DsIcon
              type="svg"
              size="md"
              color="iceGray.700"
              customIcon={<SidebarToggleIcon />}
              sx={{
                transform: sidebarOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                transition: (theme) =>
                  theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shorter,
                  }),
              }}
            />
          </DsButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default DsCalendarToolbar;
