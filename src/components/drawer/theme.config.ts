// MUI Imports
import type { Theme } from '@mui/material';
import { Skin } from '../../materio/@core/types';

// Type Imports

const MuiDrawer = (skin: Skin): Theme['components'] => ({
  MuiDrawer: {
    defaultProps: {
      ...(skin === 'bordered' && {
        PaperProps: {
          elevation: 0,
        },
      }),
    },
    styleOverrides: {
      paper: {
        ...(skin !== 'bordered' && {
          boxShadow: 'var(--mui-customShadows-lg)',
        }),
        borderRadius: 6,
      },
    },
  },
});

export default MuiDrawer;
