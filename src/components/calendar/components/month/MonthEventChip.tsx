import { DsTypography } from '../../../typography/DsTypography';
import { Box, Stack } from '@mui/material';
import { FC, MouseEvent } from 'react';
import { CalendarMonthEvent } from './monthEventTypes';

export interface MonthEventChipProps {
  event: CalendarMonthEvent;
  onClick?: () => void;
}

/**
 * Month-cell event row (Figma `25602:480437`): vertical accent bar + truncated title.
 * ICE Call → iceGray bar · In-person → success bar.
 */
const MonthEventChip: FC<MonthEventChipProps> = ({ event, onClick }) => {
  const isInPerson = event.type === 'in_person_meeting';

  const handleClick = (e: MouseEvent) => {
    if (!onClick) return;
    e.stopPropagation();
    onClick();
  };

  return (
    <Stack
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      direction="row"
      spacing={1}
      alignItems="center"
      minWidth={0}
      width={1}
      onClick={handleClick}
      sx={{
        border: 'none',
        bgcolor: 'transparent',
        p: 0,
        cursor: onClick ? 'pointer' : 'default',
        font: 'inherit',
        appearance: 'none',
        textAlign: 'left',
      }}
    >
      <Box
        sx={(theme) => ({
          width: 2,
          height: 12,
          flexShrink: 0,
          borderRadius: '2px',
          bgcolor: isInPerson ? theme.palette.success.main : theme.palette.iceGray[700],
        })}
      />
      <DsTypography variant="subtitle2" color="iceGray.700" noWrap>
        {event.title}
      </DsTypography>
    </Stack>
  );
};

export default MonthEventChip;
