import { Stack, SxProps, Theme } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useLocaleText, useNextMonthDisabled, usePreviousMonthDisabled, useUtils } from '@mui/x-date-pickers/internals';
import { format } from 'date-fns';
import { FC } from 'react';
import { DsButton } from '../buttons/DsButton';
import { DsIcon } from '../icons/DsIcon';
import { DsTypography } from '../typography/DsTypography';

export interface DsMiniCalendarProps {
  value: Date;
  onChange: (date: Date) => void;
  /** Defaults to 345 (Figma ReactDatePicker — frame is 345×302). */
  width?: number | string;
  sx?: SxProps<Theme>;
}

/** Figma Row `25602:477719` — prev + month + next cluster width. */
const HEADER_CLUSTER_WIDTH = 218;
/** Figma IconButton `25602:477720` / `25602:477723`. */
const HEADER_NAV_SIZE = 44;
/** Figma header Row `25602:477718` — py 4 + 44 nav = 52. */
const HEADER_ROW_HEIGHT = 52;
/**
 * Figma ReactDatePicker `25602:477717` — `flex-col gap-[24px]` between
 * month header and weekday+dates body. Do not leave this to MUI defaults.
 */
const HEADER_TO_BODY_GAP = 24;
/**
 * Figma Frame `25602:477724` — `flex-col gap-[6px]` between weekday row and Dates.
 * Dates still keeps its own pt 12 — gap is outside that padding.
 */
const WEEKDAY_TO_DATES_GAP = 6;

/**
 * Figma header Row `25602:477718`: centered cluster `[prev][month][next]`.
 *
 * MUI default `PickersCalendarHeader` DOM is `[label][prev][next]` — CSS cannot
 * reorder that into the Figma layout. Replace the slot instead of fighting ArrowSwitcher sx.
 */
const MiniCalendarHeader = (props: PickersCalendarHeaderProps<Date>) => {
  const {
    currentMonth,
    onMonthChange,
    disabled,
    disableFuture,
    disablePast,
    maxDate,
    minDate,
    labelId,
    format: labelFormat,
    timezone,
    view,
  } = props;

  const utils = useUtils<Date>();
  const localeText = useLocaleText();
  const resolvedFormat = labelFormat ?? `${utils.formats.month} ${utils.formats.year}`;
  const label = utils.formatByString(currentMonth, resolvedFormat);

  const isPreviousDisabled = usePreviousMonthDisabled(currentMonth, {
    disablePast,
    minDate,
    timezone,
  });
  const isNextDisabled = useNextMonthDisabled(currentMonth, {
    disableFuture,
    maxDate,
    timezone,
  });

  if (view !== 'day') {
    return null;
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      width={1}
      flexShrink={0}
      sx={{
        py: '4px',
        minHeight: HEADER_ROW_HEIGHT,
        maxHeight: HEADER_ROW_HEIGHT,
        m: 0,
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" alignItems="center" width={HEADER_CLUSTER_WIDTH} flexShrink={0}>
        <DsButton
          justIcon
          size="medium"
          variant="text"
          color="secondary"
          disabled={disabled || isPreviousDisabled}
          aria-label={localeText.previousMonth}
          onClick={() => onMonthChange(utils.addMonths(currentMonth, -1), 'right')}
          sx={{
            width: HEADER_NAV_SIZE,
            height: HEADER_NAV_SIZE,
            minWidth: HEADER_NAV_SIZE,
            borderRadius: '4px',
          }}
        >
          <DsIcon icon="CHEVRON_LEFT" size="md" color="iceGray.700" />
        </DsButton>

        <Stack flex={1} minWidth={0} alignItems="center" justifyContent="center">
          <DsTypography variant="subtitle1" color="iceGray.700" id={labelId} aria-live="polite" component="div">
            {label}
          </DsTypography>
        </Stack>

        <DsButton
          justIcon
          size="medium"
          variant="text"
          color="secondary"
          disabled={disabled || isNextDisabled}
          aria-label={localeText.nextMonth}
          onClick={() => onMonthChange(utils.addMonths(currentMonth, 1), 'left')}
          sx={{
            width: HEADER_NAV_SIZE,
            height: HEADER_NAV_SIZE,
            minWidth: HEADER_NAV_SIZE,
            borderRadius: '4px',
          }}
        >
          <DsIcon icon="CHEVRON_RIGHT" size="md" color="iceGray.700" />
        </DsButton>
      </Stack>
    </Stack>
  );
};

/** Figma day cell `Component 1` — 36×36. */
const DAY_SIZE = 36;
/** Figma weekday row `25602:477725` height. */
const WEEKDAY_ROW_HEIGHT = 20;
/** Figma Dates `25602:477733` padding: pt 12 / pb 8 / px 8. */
const DATES_PAD_Y_TOP = 12;
const DATES_PAD_Y_BOTTOM = 8;
/** Figma Dates shows **5** week rows — not MUI’s default 6-week reserved height. */
const DATES_WEEK_ROWS = 5;
/**
 * Figma Dates `25602:477733` height **200** = pt 12 + 5×36 + pb 8.
 * Do **not** reserve a 6th week here — that blows overall height past 302.
 */
const DATES_HEIGHT = DATES_PAD_Y_TOP + DAY_SIZE * DATES_WEEK_ROWS + DATES_PAD_Y_BOTTOM; // 200
/** Figma body `25602:477724` = weekdays 20 + gap 6 + Dates 200. */
const BODY_HEIGHT = WEEKDAY_ROW_HEIGHT + WEEKDAY_TO_DATES_GAP + DATES_HEIGHT; // 226
/**
 * Figma ReactDatePicker `25602:477717` overall height **302**:
 * header 52 + gap 24 + body 226.
 */
const MINI_CALENDAR_HEIGHT = HEADER_ROW_HEIGHT + HEADER_TO_BODY_GAP + BODY_HEIGHT; // 302
/** Figma ReactDatePicker width. */
const MINI_CALENDAR_WIDTH = 345;

/**
 * Nested `sx` value callbacks do **not** receive `{ theme }`.
 * Always use a top-level `(theme) => ({ ... })` when spreading theme.typography / palette.
 *
 * Vertical rhythm (Figma `25602:477717` — overall **302×345**):
 * - root height 302 = header 52 + gap 24 + body 226
 * - body 226 = weekdays 20 + gap 6 + Dates 200
 * - Dates 200 = pt 12 + 5×36 + pb 8
 */
const buildMiniCalendarSx =
  (width: number | string): SxProps<Theme> =>
  (theme) => ({
    width,
    maxWidth: 1,
    // Lock to Figma frame — override MUI VIEW_HEIGHT (336) and our old 6-week Dates (236).
    height: MINI_CALENDAR_HEIGHT,
    minHeight: MINI_CALENDAR_HEIGHT,
    maxHeight: MINI_CALENDAR_HEIGHT,
    m: 0,
    p: 0,
    gap: `${HEADER_TO_BODY_GAP}px`,
    bgcolor: 'background.paper',
    borderRadius: '6px',
    // Figma `overflow-clip` on ReactDatePicker — height is the contract.
    overflow: 'hidden',
    boxSizing: 'border-box',
    '& .MuiDateCalendar-viewTransitionContainer': {
      width: 1,
      height: BODY_HEIGHT,
      minHeight: BODY_HEIGHT,
      maxHeight: BODY_HEIGHT,
      m: 0,
      p: 0,
      overflow: 'hidden',
    },
    '& .MuiDayCalendar-root': {
      width: 1,
      height: BODY_HEIGHT,
      minHeight: BODY_HEIGHT,
      maxHeight: BODY_HEIGHT,
      m: 0,
      p: 0,
      gap: `${WEEKDAY_TO_DATES_GAP}px`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxSizing: 'border-box',
    },
    '& .MuiDayCalendar-header': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: 2,
      width: 1,
      flexShrink: 0,
      minHeight: WEEKDAY_ROW_HEIGHT,
      maxHeight: WEEKDAY_ROW_HEIGHT,
      m: 0,
      p: 0,
      pt: 0,
      pb: 0,
    },
    '& .MuiDayCalendar-weekDayLabel': {
      width: 47,
      height: WEEKDAY_ROW_HEIGHT,
      minHeight: WEEKDAY_ROW_HEIGHT,
      margin: 0,
      padding: 0,
      ...theme.typography.subtitle2,
      color: theme.palette.iceGray[700],
    },
    // Figma Dates: pt 12, px 8, pb 8 — after the 6px gap above.
    '& .MuiDayCalendar-monthContainer': {
      overflow: 'hidden',
      pt: `${DATES_PAD_Y_TOP}px`,
      px: 2,
      pb: `${DATES_PAD_Y_BOTTOM}px`,
      boxSizing: 'border-box',
    },
    '& .MuiDayCalendar-weekContainer': {
      margin: 0,
      justifyContent: 'space-between',
      minHeight: DAY_SIZE,
      maxHeight: DAY_SIZE,
    },
    '& .MuiDayCalendar-slideTransition': {
      height: DATES_HEIGHT,
      minHeight: DATES_HEIGHT,
      maxHeight: DATES_HEIGHT,
      overflow: 'hidden',
      overflowX: 'hidden',
      m: 0,
      flexShrink: 0,
      boxSizing: 'border-box',
    },
    '& .MuiPickersSlideTransition-root': {
      height: DATES_HEIGHT,
      minHeight: DATES_HEIGHT,
      maxHeight: DATES_HEIGHT,
      overflow: 'hidden',
      overflowX: 'hidden',
      m: 0,
      flexShrink: 0,
      boxSizing: 'border-box',
    },
  });

const MiniCalendarDay = (props: PickersDayProps<Date>) => {
  const { day, outsideCurrentMonth, selected, ...other } = props;

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      selected={selected}
      sx={(theme) => ({
        width: 36,
        height: 36,
        margin: 0,
        // Circles: use percentage, not 500px / theme large radius tokens
        borderRadius: '50%',
        ...theme.typography.body1,
        color: outsideCurrentMonth ? theme.palette.iceGray[300] : theme.palette.iceGray[700],
        '&.Mui-selected': {
          bgcolor: theme.palette.primary.main,
          color: theme.palette.iceGray[50],
          boxShadow: 'var(--mui-customShadows-xs)',
          '&:hover, &:focus': {
            bgcolor: theme.palette.primary.dark,
          },
        },
        '&.MuiPickersDay-today:not(.Mui-selected)': {
          border: 'none',
        },
      })}
    />
  );
};

/**
 * Compact month calendar (Figma ReactDatePicker / ICE Calls calendar sidebar).
 * Built on MUI X `DateCalendar` with a custom header slot for Figma Row `25602:477718`.
 */
export const DsMiniCalendar: FC<DsMiniCalendarProps> = ({ value, onChange, width = MINI_CALENDAR_WIDTH, sx }) => {
  return (
    <DateCalendar
      value={value}
      onChange={(next) => {
        if (next) onChange(next);
      }}
      views={['day']}
      showDaysOutsideCurrentMonth
      // Figma Dates is 5 week rows / 200px — keep MUI from reserving a 6th row that breaks 302 height.
      fixedWeekNumber={DATES_WEEK_ROWS}
      dayOfWeekFormatter={(day) => format(day, 'EEEEEE')}
      slots={{
        calendarHeader: MiniCalendarHeader,
        day: MiniCalendarDay,
      }}
      slotProps={{
        calendarHeader: {
          format: 'MMMM yyyy',
        },
      }}
      sx={[buildMiniCalendarSx(width), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    />
  );
};
