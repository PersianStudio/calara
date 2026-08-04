import { Card, CardProps, useTheme } from '@mui/material';
import { FC } from 'react';

export interface DsCardProps extends CardProps {
  boxShadow?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'iceDefault'
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24;
}

export const DsCard: FC<DsCardProps> = ({ boxShadow = 0, sx, ...props }) => {
  const theme = useTheme();

  // Determine which shadow to use based on the type of `boxShadow` prop
  const appliedShadow =
    typeof boxShadow === 'number'
      ? theme.shadows[boxShadow] // Use MUI's default shadow if `boxShadow` is a number
      : theme.customShadows?.[boxShadow] || // Use Materio's custom shadow if `boxShadow` is a string
        theme.customShadows[3];

  return <Card {...props} sx={{ boxShadow: appliedShadow, ...sx }} />;
};
