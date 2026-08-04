import { Box } from '@mui/material';
import { FC, ReactNode } from 'react';

interface DayEventIconWellProps {
  children: ReactNode;
}

/**
 * Shared 36×36 icon well used by task / ICE call / in-person cards
 * (Figma Icon frame: white bg, gray-200 border, radius 4, p 6).
 */
export const DayEventIconWell: FC<DayEventIconWellProps> = ({ children }) => (
  <Box
    sx={(theme) => ({
      width: 36,
      height: 36,
      flexShrink: 0,
      borderRadius: '4px',
      bgcolor: theme.palette.iceGray[50],
      border: `1px solid ${theme.palette.iceGray[200]}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      p: '6px',
      boxSizing: 'border-box',
    })}
  >
    {children}
  </Box>
);
