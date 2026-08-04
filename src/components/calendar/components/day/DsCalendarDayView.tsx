import { DsTypography } from '../../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack, useTheme } from '@mui/material';
import moment from 'moment';
import { FC, Fragment, useMemo, useRef } from 'react';
import type { DsCalendarFilterKey } from '../../types';
import DsCalendarEmptySlot from '../DsCalendarEmptySlot';
import DsCalendarTimeIndicator from '../DsCalendarTimeIndicator';
import { CalendarEmptySlotSelection } from '../../utils/calendarEmptySlotTypes';
import {
  MINUTES_PER_HOUR,
  dayHourHeight,
  formatHourLabel,
  variableMinutesToHeight,
  variableMinutesToOffset,
} from '../../utils/calendarTime';
import { meetingDetailsFromDayEvent } from '../meetingDetails/meetingDetailsMappers';
import { CalendarMeetingDetails } from '../meetingDetails/meetingDetailsTypes';
import { scrubberInitialMinutes, useCalendarTimeScrubber } from '../../hooks/useCalendarTimeScrubber';
import WeekTravelBlock from '../week/WeekTravelBlock';
import DayIceCallCard from './DayIceCallCard';
import DayInPersonCard from './DayInPersonCard';
import DayReminderCard from './DayReminderCard';
import DayTaskCard from './DayTaskCard';
import { CalendarDayEvent, CalendarDayEventType } from './dayEventTypes';

/** Figma `25602:477663` / drawer `25601:476914` — time label column width. */
const TIME_COL_WIDTH = 60;

/** Horizontal inset so adjacent hour borders don't clip card edges. */
const EVENT_INSET = 8;

/** Full day (00:00–23:00). Midnight scheduled calls must be visible. */
const DAY_START_HOUR = 0;
const DAY_END_HOUR = 23;

const FILTER_TO_EVENT_TYPE: Record<DsCalendarFilterKey, CalendarDayEventType> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
  TASKS: 'task',
  REMINDERS: 'reminder',
};

const occupiedStartMinutes = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') return event.hour * MINUTES_PER_HOUR;
  if (event.type === 'in_person_meeting' && event.travelMinutes) {
    return event.startMinutes - event.travelMinutes;
  }
  return event.startMinutes;
};

const occupiedEndMinutes = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') return event.hour * MINUTES_PER_HOUR + 15;
  return event.endMinutes;
};

const eventDisplayRange = (event: CalendarDayEvent) => {
  if (event.type === 'reminder') {
    const start = event.hour * MINUTES_PER_HOUR;
    return { startMinutes: start, endMinutes: start + 15 };
  }
  return { startMinutes: event.startMinutes, endMinutes: event.endMinutes };
};

export interface DsCalendarDayViewProps {
  currentDate: Date;
  /** Live calendar entries for the day (API-mapped). Empty when omitted. */
  events?: CalendarDayEvent[];
  /** Page board shows weekday header; drawer day board does not (Figma `25601:476914`). */
  showWeekdayHeader?: boolean;
  /** Active calendar-item filters. When omitted, all types show. */
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
  /** Persist reminder completed toggle through calendar sync. */
  onReminderToggle?: (id: string, completed: boolean) => void;
}

/**
 * Shared day time-grid (page + drawer).
 *
 * Hour rows stay compact when empty and grow only as needed for overlapping events.
 * Events and the scrubber share the same per-hour proportional minutes→px math.
 */
const DsCalendarDayView: FC<DsCalendarDayViewProps> = ({
  currentDate,
  events: eventsProp,
  showWeekdayHeader = true,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
  onReminderToggle,
}) => {
  const { t } = useTranslation();
  const weekdayLabel = moment(currentDate).format('dddd');
  const now = moment();
  const isToday = moment(currentDate).isSame(now, 'day');

  const events = eventsProp ?? [];
  const timedGridRef = useRef<HTMLDivElement | null>(null);

  const hours = useMemo(
    () => Array.from({ length: DAY_END_HOUR - DAY_START_HOUR + 1 }, (_, i) => DAY_START_HOUR + i),
    [],
  );

  const visibleEvents = useMemo(() => {
    if (!enabledFilters) return events;
    const allowed = new Set(enabledFilters.map((key) => FILTER_TO_EVENT_TYPE[key]));
    return events.filter((event) => allowed.has(event.type));
  }, [enabledFilters, events]);

  const occupancyRanges = useMemo(
    () =>
      visibleEvents.map((event) => ({
        startMinutes: occupiedStartMinutes(event),
        endMinutes: occupiedEndMinutes(event),
      })),
    [visibleEvents],
  );

  const hourHeights = useMemo(
    () => hours.map((hour) => dayHourHeight(hour, occupancyRanges)),
    [hours, occupancyRanges],
  );

  const gridHeight = useMemo(() => hourHeights.reduce((sum, h) => sum + h, 0), [hourHeights]);

  const initialScrubberMinutes = useMemo(
    () => scrubberInitialMinutes(isToday, DAY_START_HOUR, DAY_END_HOUR),
    [isToday, moment(currentDate).startOf('day').valueOf()],
  );

  const scrubber = useCalendarTimeScrubber({
    startHour: DAY_START_HOUR,
    endHour: DAY_END_HOUR,
    gridRef: timedGridRef,
    measureRows: true,
    initialMinutes: initialScrubberMinutes,
  });

  const handleReminderToggle = (id: string, completed: boolean) => {
    onReminderToggle?.(id, completed);
  };

  const theme = useTheme();

  return (
    <Stack flex={1} width={1} minHeight={0} overflow="hidden">
      {showWeekdayHeader ? (
        <Box sx={{ borderTop: `1px solid ${theme.palette.iceGray['opacity-24']}` }}>
          <Box sx={{ width: 1, px: 2, py: 2, flexShrink: 0 }}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <DsTypography variant="body1_500" color="iceGray.700" textAlign="center">
                {weekdayLabel}
              </DsTypography>
            </Stack>
          </Box>
          <Box
            sx={(theme) => ({
              width: 1,
              // borderBottom: `1px solid ${theme.palette.iceGray['opacity-24']}`,
              flexShrink: 0,
            })}
          />
        </Box>
      ) : null}

      <Stack flex={1} width={1} minHeight={0} overflow="auto">
        <Box
          position="relative"
          width={1}
          sx={(theme) => ({
            border: `1px solid ${theme.palette.iceGray['opacity-16']}`,
            boxSizing: 'border-box',
          })}
        >
          {/* Stacked hour rows — scrubber measures these direct children. */}
          <Stack ref={timedGridRef} width={1}>
            {hours.map((hour, index) => {
              const hourStart = hour * MINUTES_PER_HOUR;
              const hourEnd = hourStart + MINUTES_PER_HOUR;
              const occupied = occupancyRanges.some(
                (range) => range.startMinutes < hourEnd && range.endMinutes > hourStart,
              );
              const isLastHour = index === hours.length - 1;

              return (
                <Stack
                  key={hour}
                  direction="row"
                  width={1}
                  flexShrink={0}
                  sx={(theme) => ({
                    height: hourHeights[index],
                    borderBottom: isLastHour ? 'none' : `1px solid ${theme.palette.iceGray['opacity-16']}`,
                    boxSizing: 'border-box',
                  })}
                >
                  <Box
                    onPointerDown={scrubber.onColumnPointerDown}
                    sx={(theme) => ({
                      width: TIME_COL_WIDTH,
                      flexShrink: 0,
                      borderRight: `1px solid ${theme.palette.iceGray['opacity-16']}`,
                      cursor: 'pointer',
                      touchAction: 'none',
                      zIndex: 2,
                    })}
                  >
                    {scrubber.hiddenHour === hour ? null : (
                      <DsTypography variant="body2" color="iceGray.700" textAlign="center">
                        {formatHourLabel(hour)}
                      </DsTypography>
                    )}
                  </Box>
                  <Box flex={1} minWidth={0} height={1} position="relative" bgcolor="background.paper">
                    {occupied ? null : (
                      <DsCalendarEmptySlot
                        enabled={Boolean(onEmptySlotClick)}
                        onAddMeeting={
                          onEmptySlotClick ? () => onEmptySlotClick({ date: currentDate, hour }) : undefined
                        }
                      />
                    )}
                  </Box>
                </Stack>
              );
            })}
          </Stack>

          {/* Events share the same cumulative hour heights as the scrubber. */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: TIME_COL_WIDTH,
              right: 0,
              height: gridHeight,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {visibleEvents.map((event) => {
              const { startMinutes: start, endMinutes: end } = eventDisplayRange(event);
              const travelMinutes = event.type === 'in_person_meeting' ? event.travelMinutes : undefined;

              return (
                <Fragment key={event.id}>
                  {travelMinutes ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: variableMinutesToOffset(start - travelMinutes, DAY_START_HOUR, hourHeights),
                        left: EVENT_INSET,
                        right: EVENT_INSET,
                        height: variableMinutesToHeight(start - travelMinutes, start, DAY_START_HOUR, hourHeights),
                        zIndex: 1,
                        overflow: 'hidden',
                        pointerEvents: 'auto',
                      }}
                    >
                      <WeekTravelBlock travelMinutes={travelMinutes} />
                    </Box>
                  ) : null}

                  <Box
                    sx={{
                      position: 'absolute',
                      top: variableMinutesToOffset(start, DAY_START_HOUR, hourHeights),
                      left: EVENT_INSET,
                      right: EVENT_INSET,
                      height: variableMinutesToHeight(start, Math.max(end, start + 15), DAY_START_HOUR, hourHeights),
                      zIndex: 1,
                      overflow: 'hidden',
                      pointerEvents: 'auto',
                    }}
                  >
                    <DayEventRenderer
                      event={event}
                      currentDate={currentDate}
                      onReminderToggle={handleReminderToggle}
                      onMeetingClick={onMeetingClick}
                      fillSlot
                    />
                  </Box>
                </Fragment>
              );
            })}
          </Box>

          {scrubber.minutes != null && scrubber.top != null ? (
            <DsCalendarTimeIndicator
              minutes={scrubber.minutes}
              top={scrubber.top}
              timeColWidth={TIME_COL_WIDTH}
              onHeadPointerDown={scrubber.onHeadPointerDown}
              headAriaLabel={t('TIME')}
            />
          ) : null}
        </Box>
      </Stack>
    </Stack>
  );
};

const DayEventRenderer: FC<{
  event: CalendarDayEvent;
  currentDate: Date;
  onReminderToggle: (id: string, completed: boolean) => void;
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  fillSlot?: boolean;
}> = ({ event, currentDate, onReminderToggle, onMeetingClick, fillSlot }) => {
  switch (event.type) {
    case 'task':
      return <DayTaskCard event={event} fillSlot={fillSlot} />;
    case 'reminder':
      return <DayReminderCard event={event} onToggle={onReminderToggle} fillSlot={fillSlot} />;
    case 'ice_call':
      return (
        <DayIceCallCard
          event={event}
          fillSlot={fillSlot}
          onClick={onMeetingClick ? () => onMeetingClick(meetingDetailsFromDayEvent(event, currentDate)) : undefined}
        />
      );
    case 'in_person_meeting':
      return (
        <DayInPersonCard
          event={event}
          fillSlot={fillSlot}
          onClick={onMeetingClick ? () => onMeetingClick(meetingDetailsFromDayEvent(event, currentDate)) : undefined}
        />
      );
  }
};

export default DsCalendarDayView;
