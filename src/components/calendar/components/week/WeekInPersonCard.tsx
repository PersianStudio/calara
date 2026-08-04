import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
// ANCHOR: missing-ds-icon/IN_PERSON_MEETING — Week in-person meeting icon (25602:479678). Temporary local SVG until IceIconsEnum + DsIcon exist.
import { InPersonMeetingIcon } from '../../assets/InPersonMeetingIcon';
import { formatTimeRange } from '../../utils/calendarTime';
import { CalendarWeekInPersonEvent } from './weekEventTypes';

export interface WeekInPersonCardProps {
  event: CalendarWeekInPersonEvent;
  onClick?: () => void;
  /** Square off the top corners when a travel block is stacked directly above. */
  joinedTop?: boolean;
}

/**
 * Compact week in-person meeting block (Figma `25602:479678` green block).
 *
 * Spans exactly `startMinutes` → `endMinutes`. Travel time is rendered as a
 * separate block above it (`WeekTravelBlock`) so it cannot eat into the meeting.
 */
const WeekInPersonCard: FC<WeekInPersonCardProps> = ({ event, onClick, joinedTop }) => {
  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={(theme) => ({
        width: 1,
        height: 1,
        minHeight: 0,
        borderRadius: joinedTop ? '0 0 4px 4px' : '4px',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        ...(joinedTop ? { borderTop: 'none' } : {}),
        bgcolor: theme.palette.success['opacity-8'],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'left',
        p: 0,
        cursor: onClick ? 'pointer' : 'default',
        font: 'inherit',
        appearance: 'none',
      })}
    >
      <Stack
        direction="row"
        spacing={1}
        alignItems="flex-start"
        px={1}
        py={0.5}
        flex={1}
        minHeight={0}
        sx={(theme) => ({
          borderLeft: `2px solid ${theme.palette.success.main}`,
          ml: 1,
        })}
      >
        <Box
          sx={(theme) => ({
            color: theme.palette.success.main,
            display: 'flex',
            lineHeight: 0,
            mt: '2px',
            flexShrink: 0,
          })}
        >
          <DsIcon type="svg" size="sm" customIcon={<InPersonMeetingIcon />} />
        </Box>
        <Stack spacing={0.5} minWidth={0} flex={1}>
          <DsTypography variant="body2_500" color="iceGray.700" noWrap>
            {event.title}
          </DsTypography>
          <DsTypography variant="subtitle2" color="iceGray.500" noWrap>
            {formatTimeRange(event.startMinutes, event.endMinutes)}
          </DsTypography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default WeekInPersonCard;
