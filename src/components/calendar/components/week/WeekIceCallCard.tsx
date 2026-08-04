import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { formatTimeRange } from '../../utils/calendarTime';
import { CalendarWeekIceCallEvent } from './weekEventTypes';

export interface WeekIceCallCardProps {
  event: CalendarWeekIceCallEvent;
  onClick?: () => void;
}

/**
 * Compact week ICE Call / meeting card (Figma `25602:479678` gray blocks).
 * Narrow day columns — camera icon + title + time (no 36px icon well).
 */
const WeekIceCallCard: FC<WeekIceCallCardProps> = ({ event, onClick }) => {
  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={(theme) => ({
        width: 1,
        height: 1,
        minHeight: 0,
        borderRadius: '4px',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        bgcolor: theme.palette.iceGray['opacity-8'],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        p: 1,
        boxSizing: 'border-box',
        textAlign: 'left',
        cursor: onClick ? 'pointer' : 'default',
        font: 'inherit',
        appearance: 'none',
      })}
    >
      <Stack spacing={0.5} minWidth={0} flex={1} minHeight={0}>
        <Box
          sx={(theme) => ({
            color: theme.palette.iceGray[700],
            display: 'flex',
            lineHeight: 0,
          })}
        >
          <DsIcon icon="CAMERA_ON" size="sm" />
        </Box>
        <DsTypography variant="body2_500" color="iceGray.700" noWrap>
          {event.title}
        </DsTypography>
        <DsTypography variant="subtitle2" color="iceGray.500" noWrap>
          {formatTimeRange(event.startMinutes, event.endMinutes)}
        </DsTypography>
      </Stack>
    </Box>
  );
};

export default WeekIceCallCard;
