import { DsTypography } from '../../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack } from '@mui/material';
import moment from 'moment';
import { FC, Fragment, useMemo, useRef } from 'react';
import type { DsCalendarFilterKey } from '../../types';
import DsCalendarEmptySlot from '../DsCalendarEmptySlot';
import DsCalendarTimeIndicator from '../DsCalendarTimeIndicator';
import { CalendarEmptySlotSelection } from '../../utils/calendarEmptySlotTypes';
import {
  HOUR_HEIGHT,
  MINUTES_PER_HOUR,
  dayHourHeight,
  formatHourLabel,
  variableMinutesToHeight,
  variableMinutesToOffset,
} from '../../utils/calendarTime';
import { CalendarDayEventType } from '../day/dayEventTypes';
import { meetingDetailsFromWeekEvent } from '../meetingDetails/meetingDetailsMappers';
import { CalendarMeetingDetails } from '../meetingDetails/meetingDetailsTypes';
import { scrubberInitialMinutes, useCalendarTimeScrubber } from '../../hooks/useCalendarTimeScrubber';
import WeekIceCallCard from './WeekIceCallCard';
import WeekInPersonCard from './WeekInPersonCard';
import WeekTravelBlock from './WeekTravelBlock';
import { CalendarWeekEvent } from './weekEventTypes';

/** Figma week board `25602:479678` — time label column. */
const TIME_COL_WIDTH = 60;
/** Day column header row height. */
const DAY_HEADER_HEIGHT = 40;
/** All-day strip under headers. */
const ALL_DAY_ROW_HEIGHT = 36;
/** Full day (00:00–23:00) so early/late scheduled calls are visible. */
const WEEK_START_HOUR = 0;
const WEEK_END_HOUR = 23;
/** Minimum day column width before horizontal scroll. */
const DAY_COL_MIN_WIDTH = 112;
/** Horizontal inset so adjacent columns' blocks don't touch. */
const EVENT_INSET = 4;

const FILTER_TO_EVENT_TYPE: Partial<Record<DsCalendarFilterKey, CalendarDayEventType>> = {
  ICE_CALLS: 'ice_call',
  IN_PERSON_MEETINGS: 'in_person_meeting',
};

/** Travel time occupies its own range before the meeting, so it widens the occupied span. */
const occupiedStartMinutes = (event: CalendarWeekEvent) =>
  event.type === 'in_person_meeting' && event.travelMinutes
    ? event.startMinutes - event.travelMinutes
    : event.startMinutes;

export interface DsCalendarWeekViewProps {
  currentDate: Date;
  /** Live week events (API-mapped). Empty when omitted. */
  events?: CalendarWeekEvent[];
  onDateChange?: (date: Date) => void;
  enabledFilters?: DsCalendarFilterKey[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onEmptySlotClick?: (slot: CalendarEmptySlotSelection) => void;
}

/**
 * Shared week time-grid for calendar page + drawer (Figma `25602:479678`).
 *
 * Empty hours stay at Figma `HOUR_HEIGHT`; hours with short meetings grow only as needed
 * so 15‑minute cards stay readable. Events and the scrubber share the same `hourHeights`.
 */
const DsCalendarWeekView: FC<DsCalendarWeekViewProps> = ({
  currentDate,
  events: eventsProp,
  onDateChange,
  enabledFilters,
  onMeetingClick,
  onEmptySlotClick,
}) => {
  const { t } = useTranslation();
  const now = moment();

  const weekStart = useMemo(() => moment(currentDate).startOf('isoWeek'), [currentDate]);
  const weekDays = useMemo(() => Array.from({ length: 7 }, (_, i) => weekStart.clone().add(i, 'day')), [weekStart]);

  const hours = useMemo(
    () => Array.from({ length: WEEK_END_HOUR - WEEK_START_HOUR + 1 }, (_, i) => WEEK_START_HOUR + i),
    [],
  );

  const isCurrentWeek = now.isSame(weekStart, 'isoWeek');

  const initialScrubberMinutes = useMemo(
    () => scrubberInitialMinutes(isCurrentWeek, WEEK_START_HOUR, WEEK_END_HOUR),
    // Seed once per week — don't chase the clock on every render.
    [isCurrentWeek, weekStart.valueOf()],
  );

  const timedGridRef = useRef<HTMLDivElement | null>(null);

  const visibleEvents = useMemo(() => {
    const source = eventsProp ?? [];
    if (!enabledFilters) return source;
    const allowed = new Set(
      enabledFilters
        .map((key) => FILTER_TO_EVENT_TYPE[key])
        .filter((type): type is CalendarDayEventType => Boolean(type)),
    );
    return source.filter((event) => allowed.has(event.type));
  }, [enabledFilters, eventsProp]);

  const occupancyRanges = useMemo(
    () =>
      visibleEvents.map((event) => ({
        startMinutes: occupiedStartMinutes(event),
        endMinutes: event.endMinutes,
      })),
    [visibleEvents],
  );

  /** Shared across all day columns so horizontal hour rules stay aligned. */
  const hourHeights = useMemo(
    () =>
      hours.map((hour) =>
        dayHourHeight(hour, occupancyRanges, {
          minHeight: HOUR_HEIGHT,
        }),
      ),
    [hours, occupancyRanges],
  );

  const hourTops = useMemo(() => {
    let acc = 0;
    return hourHeights.map((height) => {
      const top = acc;
      acc += height;
      return top;
    });
  }, [hourHeights]);

  const gridHeight = useMemo(() => hourHeights.reduce((sum, h) => sum + h, 0), [hourHeights]);

  const scrubber = useCalendarTimeScrubber({
    startHour: WEEK_START_HOUR,
    endHour: WEEK_END_HOUR,
    gridRef: timedGridRef,
    hourHeights,
    initialMinutes: initialScrubberMinutes,
  });

  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarWeekEvent[]>();
    for (const event of visibleEvents) {
      const list = map.get(event.dayIndex) ?? [];
      list.push(event);
      map.set(event.dayIndex, list);
    }
    return map;
  }, [visibleEvents]);

  const selectedDayIndex = moment(currentDate).diff(weekStart, 'days');

  return (
    <Stack flex={1} width={1} minHeight={0} overflow="auto">
      <Box
        sx={(theme) => ({
          minWidth: TIME_COL_WIDTH + 7 * DAY_COL_MIN_WIDTH,
          width: 1,
          border: `1px solid ${theme.palette.iceGray['opacity-16']}`,
          boxSizing: 'border-box',
        })}
      >
        {/* Day headers — "19 Mon" … selected = primary + underline */}
        <Stack direction="row" width={1} flexShrink={0}>
          <Box
            sx={(theme) => ({
              width: TIME_COL_WIDTH,
              flexShrink: 0,
              height: DAY_HEADER_HEIGHT,
              borderRight: `1px solid ${theme.palette.iceGray['opacity-16']}`,
              borderBottom: `1px solid ${theme.palette.iceGray['opacity-16']}`,
            })}
          />
          {weekDays.map((day, index) => {
            const isSelected = index === selectedDayIndex;
            const isLastDay = index === weekDays.length - 1;
            return (
              <Box
                key={day.format('YYYY-MM-DD')}
                component="button"
                type="button"
                onClick={() => onDateChange?.(day.toDate())}
                sx={(theme) => ({
                  flex: 1,
                  minWidth: DAY_COL_MIN_WIDTH,
                  height: DAY_HEADER_HEIGHT,
                  border: 'none',
                  bgcolor: 'transparent',
                  cursor: onDateChange ? 'pointer' : 'default',
                  px: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: isSelected
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${theme.palette.iceGray['opacity-16']}`,
                  borderRight: isLastDay ? 'none' : `1px solid ${theme.palette.iceGray['opacity-16']}`,
                })}
              >
                <DsTypography
                  variant="body2_500"
                  color={isSelected ? 'primary.main' : 'iceGray.700'}
                  textAlign="center"
                  noWrap
                >
                  {day.format('D ddd')}
                </DsTypography>
              </Box>
            );
          })}
        </Stack>

        {/* All-Day row — its bottom border is the grid's first hour rule. */}
        <Stack direction="row" width={1} flexShrink={0}>
          <Box
            sx={(theme) => ({
              width: TIME_COL_WIDTH,
              flexShrink: 0,
              height: ALL_DAY_ROW_HEIGHT,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: `1px solid ${theme.palette.iceGray['opacity-16']}`,
              borderBottom: `1px solid ${theme.palette.iceGray['opacity-16']}`,
            })}
          >
            <DsTypography variant="subtitle2" color="iceGray.500" textAlign="center">
              {t('ALL_DAY')}
            </DsTypography>
          </Box>
          {weekDays.map((day, index) => (
            <Box
              key={`all-day-${day.format('YYYY-MM-DD')}`}
              sx={(theme) => ({
                flex: 1,
                minWidth: DAY_COL_MIN_WIDTH,
                height: ALL_DAY_ROW_HEIGHT,
                borderRight:
                  index === weekDays.length - 1 ? 'none' : `1px solid ${theme.palette.iceGray['opacity-16']}`,
                borderBottom: `1px solid ${theme.palette.iceGray['opacity-16']}`,
                bgcolor: 'background.paper',
              })}
            />
          ))}
        </Stack>

        {/* Timed grid — also the scrubber's coordinate origin. */}
        <Stack ref={timedGridRef} direction="row" width={1} position="relative">
          {/* Time labels — click to place scrubber; each label is flush with the hour rule it names. */}
          <Box
            onPointerDown={scrubber.onColumnPointerDown}
            sx={(theme) => ({
              width: TIME_COL_WIDTH,
              flexShrink: 0,
              height: gridHeight,
              position: 'relative',
              borderRight: `1px solid ${theme.palette.iceGray['opacity-16']}`,
              cursor: 'pointer',
              touchAction: 'none',
            })}
          >
            {hours.map((hour, index) => {
              if (scrubber.hiddenHour === hour) return null;
              return (
                <Box
                  key={hour}
                  sx={{
                    position: 'absolute',
                    top: hourTops[index],
                    left: 0,
                    right: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <DsTypography variant="body2" color="iceGray.700" textAlign="center">
                    {formatHourLabel(hour)}
                  </DsTypography>
                </Box>
              );
            })}
          </Box>

          {/* Day columns */}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', position: 'relative' }}>
            {weekDays.map((day, dayIndex) => {
              const dayEvents = eventsByDay.get(dayIndex) ?? [];
              const isLastDay = dayIndex === weekDays.length - 1;
              return (
                <Box
                  key={day.format('YYYY-MM-DD')}
                  sx={(theme) => ({
                    flex: 1,
                    minWidth: DAY_COL_MIN_WIDTH,
                    height: gridHeight,
                    position: 'relative',
                    borderRight: isLastDay ? 'none' : `1px solid ${theme.palette.iceGray['opacity-16']}`,
                    bgcolor: 'background.paper',
                  })}
                >
                  {/* Hover targets — one per hour, no borders (rules are drawn as an overlay). */}
                  {hours.map((hour, index) => {
                    const hourStart = hour * MINUTES_PER_HOUR;
                    const hourEnd = hourStart + MINUTES_PER_HOUR;
                    const occupied = dayEvents.some(
                      (event) => occupiedStartMinutes(event) < hourEnd && event.endMinutes > hourStart,
                    );
                    if (occupied) return null;

                    return (
                      <Box
                        key={hour}
                        sx={{
                          position: 'absolute',
                          top: hourTops[index],
                          left: 0,
                          right: 0,
                          height: hourHeights[index],
                        }}
                      >
                        <DsCalendarEmptySlot
                          enabled={Boolean(onEmptySlotClick)}
                          onAddMeeting={
                            onEmptySlotClick ? () => onEmptySlotClick({ date: day.toDate(), hour }) : undefined
                          }
                        />
                      </Box>
                    );
                  })}

                  {dayEvents.map((event) => {
                    const travelMinutes = event.type === 'in_person_meeting' ? event.travelMinutes : undefined;
                    const displayEnd = Math.max(event.endMinutes, event.startMinutes + 15);
                    return (
                      <Fragment key={event.id}>
                        {travelMinutes ? (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: variableMinutesToOffset(
                                event.startMinutes - travelMinutes,
                                WEEK_START_HOUR,
                                hourHeights,
                              ),
                              left: EVENT_INSET,
                              right: EVENT_INSET,
                              height: variableMinutesToHeight(
                                event.startMinutes - travelMinutes,
                                event.startMinutes,
                                WEEK_START_HOUR,
                                hourHeights,
                              ),
                              zIndex: 1,
                            }}
                          >
                            <WeekTravelBlock travelMinutes={travelMinutes} />
                          </Box>
                        ) : null}

                        <Box
                          sx={{
                            position: 'absolute',
                            top: variableMinutesToOffset(event.startMinutes, WEEK_START_HOUR, hourHeights),
                            left: EVENT_INSET,
                            right: EVENT_INSET,
                            height: variableMinutesToHeight(
                              event.startMinutes,
                              displayEnd,
                              WEEK_START_HOUR,
                              hourHeights,
                            ),
                            zIndex: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <WeekEventRenderer
                            event={event}
                            weekStart={weekStart.toDate()}
                            onMeetingClick={onMeetingClick}
                            joinedTop={Boolean(travelMinutes)}
                          />
                        </Box>
                      </Fragment>
                    );
                  })}
                </Box>
              );
            })}

            {/* Hour rules — same coordinate space as the event blocks above. */}
            {hours.slice(1).map((hour, index) => (
              <Box
                key={`rule-${hour}`}
                sx={(theme) => ({
                  position: 'absolute',
                  top: hourTops[index + 1],
                  left: 0,
                  right: 0,
                  height: '1px',
                  bgcolor: theme.palette.iceGray['opacity-16'],
                  pointerEvents: 'none',
                })}
              />
            ))}
          </Box>

          {/* Scrubber spans hours column + day columns so pill, dot and rule stay joined. */}
          {scrubber.minutes != null && scrubber.top != null ? (
            <DsCalendarTimeIndicator
              minutes={scrubber.minutes}
              top={scrubber.top}
              timeColWidth={TIME_COL_WIDTH}
              onHeadPointerDown={scrubber.onHeadPointerDown}
              headAriaLabel={t('TIME')}
            />
          ) : null}
        </Stack>
      </Box>
    </Stack>
  );
};

const WeekEventRenderer: FC<{
  event: CalendarWeekEvent;
  weekStart: Date;
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  joinedTop?: boolean;
}> = ({ event, weekStart, onMeetingClick, joinedTop }) => {
  const handleClick = onMeetingClick ? () => onMeetingClick(meetingDetailsFromWeekEvent(event, weekStart)) : undefined;

  switch (event.type) {
    case 'ice_call':
      return <WeekIceCallCard event={event} onClick={handleClick} />;
    case 'in_person_meeting':
      return <WeekInPersonCard event={event} onClick={handleClick} joinedTop={joinedTop} />;
  }
};

export default DsCalendarWeekView;
