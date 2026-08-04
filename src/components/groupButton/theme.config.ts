// MUI Imports
import type { Theme } from '@mui/material/styles';

import { bgcolor } from '@mui/system';
// Config Imports
import themeConfig from '../../materio/configs/themeConfig';

const MuiButtonGroup: Theme['components'] = {
  MuiButtonGroup: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple,
    },
    styleOverrides: {
      contained: ({ ownerState }) => ({
        boxShadow: 'var(--mui-customShadows-xs)',
        ...(ownerState.disabled && {
          boxShadow: 'none',
        }),
      }),
    },
    variants: [
      {
        props: { variant: 'soft', color: 'primary' },
        style: ({ theme }) => ({
          '& .MuiButtonGroup-middleButton': {
            borderLeft: `1px solid ${theme.palette.primary['opacity-38']}`,
            borderRight: `1px solid ${theme.palette.primary['opacity-38']}`,
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'secondary' },
        style: ({ theme }) => ({
          '& .MuiButtonGroup-middleButton': {
            borderLeft: `1px solid ${theme.palette.secondary['opacity-38']}`,
            borderRight: `1px solid ${theme.palette.secondary['opacity-38']}`,
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'error' },
        style: ({ theme }) => ({
          '& .MuiButtonGroup-middleButton': {
            borderLeft: `1px solid ${theme.palette.error['opacity-38']}`,
            borderRight: `1px solid ${theme.palette.error['opacity-38']}`,
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'warning' },
        style: ({ theme }) => ({
          '& .MuiButtonGroup-middleButton': {
            borderLeft: `1px solid ${theme.palette.warning['opacity-38']}`,
            borderRight: `1px solid ${theme.palette.warning['opacity-38']}`,
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'info' },
        style: ({ theme }) => ({
          '& .MuiButtonGroup-middleButton': {
            borderLeft: `1px solid ${theme.palette.info['opacity-38']}`,
            borderRight: `1px solid ${theme.palette.info['opacity-38']}`,
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'success' },
        style: ({ theme }) => ({
          '& .MuiButtonGroup-middleButton': {
            borderLeft: `1px solid ${theme.palette.success['opacity-38']}`,
            borderRight: `1px solid ${theme.palette.success['opacity-38']}`,
          },
        }),
      },
      {
        props: { variant: 'text', color: 'primary' },
        style: {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'secondary' },
        style: {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'error' },
        style: {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'warning' },
        style: {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'info' },
        style: {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'success' },
        style: {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            borderColor: 'var(--mui-palette-success-main)',
          },
        },
      },
    ],
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...(ownerState.size === 'small' && {
          borderRadius: 'var(--mui-shape-customBorderRadius-md)',
          padding: theme.spacing(1.6),
        }),
        ...(ownerState.size === 'medium' && {
          borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
          padding: theme.spacing(2),
        }),
        ...(ownerState.size === 'large' && {
          borderRadius: 'var(--mui-shape-customBorderRadius-xl)',
          padding: theme.spacing(2.35),
        }),
        border: '1px solid var(--mui-palette-divider)',
        gap: theme.spacing(1),
        '& button': {
          '&:hover': {
            backgroundColor: `unset !important`,
            ...(ownerState.color && { color: `${theme.palette[ownerState.color]?.main} !important` }),
          },
          '&.Mui-selected': {
            ...(ownerState.color && { backgroundColor: `${theme.palette[ownerState.color]?.main} !important` }),
            color: 'var(--mui-palette-primary-contrastText) !important',
          },
        },
      }),
    },
  },
  MuiToggleButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&:not(.Mui-selected):not(.Mui-disabled)': {
          color: theme.palette.text.primary,
        },
        border: 'none',
      }),
      sizeSmall: ({ theme }) => ({
        borderRadius: 'var(--mui-shape-customBorderRadius-sm) !important',
        padding: theme.spacing(0.7),
      }),
      sizeMedium: ({ theme }) => ({
        borderRadius: 'var(--mui-shape-borderRadius) !important',
        padding: theme.spacing(0.75),
      }),
      sizeLarge: ({ theme }) => ({
        borderRadius: 'var(--mui-shape-customBorderRadius-lg) !important',
        padding: theme.spacing(0.95),
      }),
    },
  },
};

export default MuiButtonGroup;
