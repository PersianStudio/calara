import { Components, Theme } from '@mui/material';

export const MuiSvgIcon: Components<Omit<Theme, 'components'>> = {
  MuiSvgIcon: {
    styleOverrides: {
      root: { '&.ChevronDownIcon': { display: 'flex', alignItems: 'center', justifyContent: 'center' } },
    },
    variants: [
      {
        props: { fontSize: 'small' },
        style: {
          width: 18,
          height: 18,
          fontSize: 'unset !important',
          '& svg': {
            width: 18,
            height: 18,
          },
        },
      },
      {
        props: { fontSize: 'medium' },
        style: {
          width: 20,
          height: 20,
          fontSize: 'unset !important',
          '& svg': {
            width: 20,
            height: 20,
          },
        },
      },
      {
        props: { fontSize: 'large' },
        style: {
          width: 24,
          height: 24,
          fontSize: 'unset !important',
          '& svg': {
            width: 24,
            height: 24,
          },
        },
      },
      {
        props: { fontSize: 'xlarge' },
        style: {
          width: 28,
          height: 28,
          fontSize: 'unset !important',
          '& svg': {
            width: 28,
            height: 28,
          },
        },
      },
    ],
  },
};
