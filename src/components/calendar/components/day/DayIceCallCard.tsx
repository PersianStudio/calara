import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { formatTimeRange } from '../../utils/calendarTime';
import { DayEventIconWell } from './DayEventIconWell';
import { CalendarDayIceCallEvent } from './dayEventTypes';

export interface DayIceCallCardProps {
  event: CalendarDayIceCallEvent;
  onClick?: () => void;
  /** Fill a timed-grid slot (`height: 100%`); clips content rather than growing the hour. */
  fillSlot?: boolean;
}

/**
 * Figma Meeting / ICE Call item (`25602:477668`).
 * iceGray opacity-8 bg · gray-200 border · camera icon well + title + time.
 */
const DayIceCallCard: FC<DayIceCallCardProps> = ({ event, onClick, fillSlot }) => {
  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={(theme) => ({
        width: 1,
        height: fillSlot ? 1 : undefined,
        minHeight: 0,
        borderRadius: '4px',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        bgcolor: theme.palette.iceGray['opacity-8'],
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        textAlign: 'left',
        p: 0,
        cursor: onClick ? 'pointer' : 'default',
        font: 'inherit',
        appearance: 'none',
        boxSizing: 'border-box',
      })}
    >
      <Stack flex={1} minWidth={0} minHeight={0} py={fillSlot ? 0.5 : 1} height={fillSlot ? 1 : undefined}>
        <Stack direction="row" spacing={3} alignItems="flex-start" px={2} py={fillSlot ? 0.5 : 1} minHeight={0}>
          <DayEventIconWell>
            <Box
              sx={(theme) => ({
                color: theme.palette.iceGray[700],
                display: 'flex',
                lineHeight: 0,
              })}
            >
              <DsIcon icon="CAMERA_ON" size="sm" />
            </Box>
          </DayEventIconWell>

          <Stack spacing={fillSlot ? 0.5 : 3} py={fillSlot ? 0.5 : 2} minWidth={0} flex={1} overflow="hidden">
            <DsTypography variant="body2_500" color="iceGray.700" noWrap>
              {event.title}
            </DsTypography>
            <DsTypography variant="subtitle2" color="iceGray.500" noWrap>
              {formatTimeRange(event.startMinutes, event.endMinutes)}
            </DsTypography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DayIceCallCard;
