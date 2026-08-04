import { DsTypography } from '../../../typography/DsTypography';
import { Box, Stack } from '@mui/material';
import moment, { Moment } from 'moment';
import { FC, useMemo } from 'react';
import type { DsCalendarFilterKey } from '../../types';
import DsCalendarEmptySlot from '../DsCalendarEmptySlot';
import { CalendarEmptySlotSelection } from '../../utils/calendarEmptySlotTypes';
import { CalendarDayEventType } from '../day/dayEventTypes';
import { meetingDetailsFromMonthEvent } from '../meetingDetails/meetingDetailsMappers';
import { CalendarMeetingDetails } from '../meetingDetails/meetingDetailsTypes';
import MonthEventChip from './MonthEventChip';
import { CalendarMonthEvent } from './monthEventTypes';

/** Figma month board `25602:480437` — selected day circle. */
const DAY_NUMBER_SIZE = 28;
/** Weekday header row height. */
const WEEKDAY_HEADER_HEIGHT = 36;
/** Max event rows shown per cell (Figma sample stacks ≤2; keep overflow clipped). */
const MAX_EVENTS_PER_CELL = 3;

const FILTER_TO_EVENT_TYPE: Partial<Record<DsCalendarFilterKey, CalendarDayEventType>> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
};

const WEEKDAY_LABELS = Array.from({ length: 7 }, (_, i) =>
  moment()
    .isoWeekday(i + 1)
    .format('ddd'),
);

export interface DsCalendarMonthViewProps {
  currentDate: Date;
  /** Live month events (API-mapped). Empty when omitted. */
  events?: CalendarMonthEvent[];
  onDateChange?: (date: Date) => void;
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
}

/**
 * Shared month grid for calendar page + drawer (Figma `25602:480437`).
 * Mon–Sun headers · outside-month muted days · selected blue circle · accent event chips.
 */
const DsCalendarMonthView: FC<DsCalendarMonthViewProps> = ({
  currentDate,
  events: eventsProp,
  onDateChange,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
}) => {
  const month = useMemo(() => moment(currentDate), [currentDate]);

  const weeks = useMemo(() => {
    const start = month.clone().startOf('month').startOf('isoWeek');
    const end = month.clone().endOf('month').endOf('isoWeek');
    const days: Moment[] = [];
    const cursor = start.clone();
    while (cursor.isSameOrBefore(end, 'day')) {
      days.push(cursor.clone());
      cursor.add(1, 'day');
    }
    const rows: Moment[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      rows.push(days.slice(i, i + 7));
    }
    return rows;
  }, [month]);

  const events = useMemo(() => {
    const all = eventsProp ?? [];
    if (!enabledFilters) return all;
    const allowed = new Set(
      enabledFilters
        .map((key) => FILTER_TO_EVENT_TYPE[key])
        .filter((type): type is CalendarDayEventType => Boolean(type)),
    );
    return all.filter((event) => allowed.has(event.type));
  }, [enabledFilters, eventsProp]);

  const eventsByDayKey = useMemo(() => {
    const map = new Map<string, CalendarMonthEvent[]>();
    for (const event of events) {
      const key = moment(event.date).format('YYYY-MM-DD');
      const list = map.get(key) ?? [];
      list.push(event);
      map.set(key, list);
    }
    return map;
  }, [events]);

  return (
    <Stack flex={1} width={1} minHeight={0} overflow="hidden">
      {/* Weekday headers */}
      <Stack direction="row" width={1} flexShrink={0} height={WEEKDAY_HEADER_HEIGHT}>
        {WEEKDAY_LABELS.map((label) => (
          <Box
            key={label}
            sx={(theme) => ({
              flex: 1,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: `1px solid ${theme.palette.iceGray['opacity-16']}`,
              borderBottom: `1px solid ${theme.palette.iceGray['opacity-16']}`,
              borderRight: `1px solid ${theme.palette.iceGray['opacity-16']}`,
              '&:last-of-type': { borderRight: 'none' },
            })}
          >
            <DsTypography variant="subtitle2" color="iceGray.500" textAlign="center">
              {label}
            </DsTypography>
          </Box>
        ))}
      </Stack>

      {/* Week rows */}
      <Stack flex={1} minHeight={0} width={1}>
        {weeks.map((weekDays) => (
          <Stack key={weekDays[0].format('YYYY-MM-DD')} direction="row" flex={1} minHeight={0} width={1}>
            {weekDays.map((day) => {
              const dayKey = day.format('YYYY-MM-DD');
              const inCurrentMonth = day.isSame(month, 'month');
              const isSelected = day.isSame(currentDate, 'day');
              const dayEvents = (eventsByDayKey.get(dayKey) ?? []).slice(0, MAX_EVENTS_PER_CELL);

              return (
                <Box
                  key={dayKey}
                  onClick={() => onDateChange?.(day.toDate())}
                  sx={(theme) => ({
                    flex: 1,
                    minWidth: 0,
                    minHeight: 0,
                    height: '100%',
                    bgcolor: 'background.paper',
                    cursor: onDateChange || onEmptySlotClick ? 'pointer' : 'default',
                    textAlign: 'left',
                    overflow: 'hidden',
                    borderBottom: `1px solid ${theme.palette.iceGray['opacity-16']}`,
                    borderRight: `1px solid ${theme.palette.iceGray['opacity-16']}`,
                    '&:last-of-type': { borderRight: 'none' },
                  })}
                >
                  <DsCalendarEmptySlot
                    enabled={dayEvents.length === 0 && Boolean(onEmptySlotClick)}
                    onAddMeeting={onEmptySlotClick ? () => onEmptySlotClick({ date: day.toDate() }) : undefined}
                    sx={{ p: 2, gap: 1, alignItems: 'flex-start' }}
                  >
                    <Box
                      sx={(theme) => ({
                        width: DAY_NUMBER_SIZE,
                        height: DAY_NUMBER_SIZE,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        bgcolor: isSelected ? theme.palette.primary.main : 'transparent',
                      })}
                    >
                      <DsTypography
                        variant="body2_500"
                        color={isSelected ? 'iceGray.50' : inCurrentMonth ? 'iceGray.700' : 'iceGray.300'}
                        textAlign="center"
                      >
                        {day.date()}
                      </DsTypography>
                    </Box>

                    {dayEvents.length > 0 ? (
                      <Stack spacing={0.5} width={1} minWidth={0} overflow="hidden">
                        {dayEvents.map((event) => (
                          <MonthEventChip
                            key={event.id}
                            event={event}
                            onClick={
                              onMeetingClick ? () => onMeetingClick(meetingDetailsFromMonthEvent(event)) : undefined
                            }
                          />
                        ))}
                      </Stack>
                    ) : null}
                  </DsCalendarEmptySlot>
                </Box>
              );
            })}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default DsCalendarMonthView;
