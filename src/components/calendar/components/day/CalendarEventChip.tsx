import { DsTypography } from '../../../typography/DsTypography';
import { Box } from '@mui/material';
import type { Theme } from '@mui/material';
import { FC } from 'react';

export type CalendarEventChipTone = 'success' | 'warning' | 'error' | 'info' | 'primary';

export interface CalendarEventChipProps {
  label: string;
  tone: CalendarEventChipTone;
}

/**
 * Figma day-card status/priority pill (h 18, border 0.6, opacity-16 fill).
 * Not a 1:1 `DsChip` match (Figma is smaller + bordered tonal) — local until DS gains this size.
 */
export const CalendarEventChip: FC<CalendarEventChipProps> = ({ label, tone }) => (
  <Box
    sx={(theme) => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 24,
      height: 18,
      px: 3,
      py: '2px',
      borderRadius: '50px',
      border: `0.6px solid ${toneBorder(theme, tone)}`,
      bgcolor: toneBg(theme, tone),
      flexShrink: 0,
    })}
  >
    <DsTypography variant="xs_Medium" color={toneColorKey(tone)} component="span">
      {label}
    </DsTypography>
  </Box>
);

const toneBg = (theme: Theme, tone: CalendarEventChipTone) => {
  switch (tone) {
    case 'success':
      return theme.palette.success['opacity-16'] as string;
    case 'warning':
      return theme.palette.warning['opacity-16'] as string;
    case 'error':
      return theme.palette.error['opacity-16'] as string;
    case 'info':
      return theme.palette.info['opacity-16'] as string;
    case 'primary':
      return theme.palette.primary['opacity-16'] as string;
  }
};

const toneBorder = (theme: Theme, tone: CalendarEventChipTone) => {
  switch (tone) {
    case 'success':
      return theme.palette.success.main;
    case 'warning':
      return theme.palette.warning.main;
    case 'error':
      return theme.palette.error.main;
    case 'info':
      return theme.palette.info.main;
    case 'primary':
      return theme.palette.primary.main;
  }
};

const toneColorKey = (tone: CalendarEventChipTone) => {
  switch (tone) {
    case 'success':
      return 'success.main';
    case 'warning':
      return 'warning.main';
    case 'error':
      return 'error.main';
    case 'info':
      return 'info.main';
    case 'primary':
      return 'primary.main';
  }
};
