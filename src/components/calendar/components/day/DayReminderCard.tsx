import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
import { CalendarDayReminderEvent } from './dayEventTypes';

export interface DayReminderCardProps {
  event: CalendarDayReminderEvent;
  onToggle?: (id: string, completed: boolean) => void;
  fillSlot?: boolean;
}

/**
 * Figma Reminder item (`25602:477667` checked, `25602:477674` unchecked).
 * warning-8 bg · gray-200 border · orange checkbox + body2_500 title.
 */
const DayReminderCard: FC<DayReminderCardProps> = ({ event, onToggle, fillSlot }) => {
  return (
    <Box
      sx={(theme) => ({
        width: 1,
        height: fillSlot ? 1 : undefined,
        minHeight: 0,
        borderRadius: '4px',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        bgcolor: theme.palette.warning['opacity-8'],
        pl: '2px',
        pr: 4,
        py: fillSlot ? 0.5 : 2,
        boxSizing: 'border-box',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <Stack direction="row" spacing={0.5} alignItems="center" width={1}>
        <Box
          component="button"
          type="button"
          aria-checked={event.completed}
          onClick={() => onToggle?.(event.id, !event.completed)}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            p: '6px',
            borderRadius: '4px',
            flexShrink: 0,
          }}
        >
          {event.completed ? (
            <Box
              sx={(theme) => ({
                width: 18,
                height: 18,
                borderRadius: '4px',
                bgcolor: theme.palette.warning.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Figma Light/Elevation/shadow-xs → theme customShadows.xs (never hardcode rgba)
                boxShadow: theme.customShadows.xs,
                color: theme.palette.iceGray[50],
              })}
            >
              <DsIcon icon="CHECK" size={12} color="iceGray.50" />
            </Box>
          ) : (
            <Box
              sx={(theme) => ({
                width: 18,
                height: 18,
                borderRadius: '4px',
                border: `2px solid ${theme.palette.warning.main}`,
                bgcolor: theme.palette.iceGray[50],
                boxSizing: 'border-box',
              })}
            />
          )}
        </Box>

        <DsTypography variant="body2_500" color="iceGray.700" noWrap>
          {event.title}
        </DsTypography>
      </Stack>
    </Box>
  );
};

export default DayReminderCard;
