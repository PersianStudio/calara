// React Imports
import React from 'react';

// MUI Imports
import type { Theme } from '@mui/material/styles';
import { Skin } from '../../materio/@core/types';
import { DsIcon } from '../icons/DsIcon';

// Type Imports

const MuiSelect = (skin: Skin): Theme['components'] => ({
  MuiAutocomplete: {
    defaultProps: {
      ...(skin === 'bordered' && {
        slotProps: {
          paper: {
            variant: 'outlined',
          },
        },
      }),
      ChipProps: {
        size: 'small',
      },
      popupIcon: <DsIcon icon="CHEVRON_DOWN" />,
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        '& .MuiInputBase-root': {
          backgroundColor: 'var(--mui-palette-background-paper)',
        },
        '& .MuiButtonBase-root.Mui-disabled i, & .MuiButtonBase-root.Mui-disabled svg': {
          color: 'var(--mui-palette-action-disabled)',
        },
        /* '& .MuiOutlinedInput-input': {
          ...(ownerState?.size === 'large' && {
            height: '23px',
          }),
          ...(ownerState?.size === 'medium' && {
            height: '21.5px',
          }),
          ...(ownerState?.size === 'small' && {
            height: '23px',
          }),
          }, */
      }),
      endAdornment: {
        '& .MuiAutocomplete-clearIndicator': {
          '&:hover': {
            backgroundColor: 'unset !important',
          },
        },
      },
      input: {
        '& + .MuiAutocomplete-endAdornment': {
          right: '1rem',
          '& i, & svg': {
            fontSize: '1.5rem',
            color: 'var(--mui-palette-text-primary)',
          },
          '& .MuiAutocomplete-clearIndicator': {
            padding: 2,
          },
        },
        '&.MuiInputBase-inputSizeSmall + .MuiAutocomplete-endAdornment': {
          '& i, & svg': {
            fontSize: '1.375rem',
          },
        },
      },
      paper: {
        backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
        ...(skin !== 'bordered' && {
          boxShadow: 'var(--mui-customShadows-lg)',
          marginBlockStart: '0.125rem',
        }),
      },
      listbox: ({ theme }) => ({
        '& .MuiAutocomplete-option': {
          padding: theme.spacing(2, 5),

          '&[aria-selected="true"]': {
            backgroundColor: theme.palette.primary['opacity-32'],
            color: 'var(--mui-palette-primary-main)',
            fontWeight: 500,
            '&.Mui-focused, &.Mui-focusVisible': {
              backgroundColor: theme.palette.primary['opacity-32'],
            },
          },
        },
        '& .MuiAutocomplete-option:hover': {
          backgroundColor: theme.palette.primary['opacity-32'],
        },
        '& .MuiAutocomplete-option.Mui-focusVisible': {
          backgroundColor: theme.palette.primary['opacity-32'],
        },
      }),
      popupIndicator: {
        minWidth: 'unset !important',
        width: 'unset !important',
        height: 'unset !important',
      },
    },
  },
});

export default MuiSelect;
