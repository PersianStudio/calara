import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
// ANCHOR: missing-ds-icon/TASK_CLIPBOARD — Day task card clipboard (25602:477666). Temporary local SVG until IceIconsEnum + DsIcon exist.
import { TaskClipboardIcon } from '../../assets/TaskClipboardIcon';
import { formatTimeRange } from '../../utils/calendarTime';
import { CalendarEventChip, CalendarEventChipTone } from './CalendarEventChip';
import { DayEventIconWell } from './DayEventIconWell';
import { CalendarDayTaskEvent, TaskPriority, TaskStatus } from './dayEventTypes';

export interface DayTaskCardProps {
  event: CalendarDayTaskEvent;
  fillSlot?: boolean;
}

/**
 * Figma Task item (`25602:477666`, `25602:477685`).
 * primary-8 bg · gray-200 border · icon well + title + status/priority chips + time.
 */
const DayTaskCard: FC<DayTaskCardProps> = ({ event, fillSlot }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={(theme) => ({
        width: 1,
        height: fillSlot ? 1 : undefined,
        minHeight: 0,
        borderRadius: '4px',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        bgcolor: theme.palette.primary['opacity-8'],
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        boxSizing: 'border-box',
      })}
    >
      <Stack flex={1} minWidth={0} minHeight={0} py={fillSlot ? 0.5 : 1} height={fillSlot ? 1 : undefined}>
        <Stack direction="row" spacing={3} alignItems="flex-start" px={2} py={fillSlot ? 0.5 : 1} minHeight={0}>
          <DayEventIconWell>
            <Box
              sx={(theme) => ({
                color: theme.palette.primary.main,
                display: 'flex',
                lineHeight: 0,
              })}
            >
              <DsIcon type="svg" size="sm" customIcon={<TaskClipboardIcon />} />
            </Box>
          </DayEventIconWell>

          <Stack spacing={fillSlot ? 0.5 : 3} py={fillSlot ? 0.5 : 2} minWidth={0} flex={1} overflow="hidden">
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
              <DsTypography variant="body2_500" color="iceGray.700" noWrap>
                {event.title}
              </DsTypography>
              <Stack direction="row" spacing={1} alignItems="center">
                {event.status ? (
                  <CalendarEventChip label={statusLabel(event.status, t)} tone={statusTone(event.status)} />
                ) : null}
                {event.priority ? (
                  <CalendarEventChip label={priorityLabel(event.priority, t)} tone={priorityTone(event.priority)} />
                ) : null}
              </Stack>
            </Stack>
            <DsTypography variant="subtitle2" color="iceGray.500" noWrap>
              {formatTimeRange(event.startMinutes, event.endMinutes)}
            </DsTypography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

const statusLabel = (status: TaskStatus, t: (k: string) => string) => {
  switch (status) {
    case 'done':
      return t('DONE');
    case 'overdue':
      return t('OVERDUE');
  }
};

const statusTone = (status: TaskStatus): CalendarEventChipTone => {
  switch (status) {
    case 'done':
      return 'success';
    case 'overdue':
      return 'error';
  }
};

const priorityLabel = (priority: TaskPriority, t: (k: string) => string) => {
  switch (priority) {
    case 'low':
      return t('LOW');
    case 'medium':
      return t('MEDIUM');
    case 'high':
      return t('HIGH');
  }
};

const priorityTone = (priority: TaskPriority): CalendarEventChipTone => {
  switch (priority) {
    case 'low':
      return 'info';
    case 'medium':
      return 'warning';
    case 'high':
      return 'error';
  }
};

export default DayTaskCard;
