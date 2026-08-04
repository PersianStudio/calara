// MUI Imports
import type { Theme } from '@mui/material/styles';

const MuiInput: Theme['components'] = {
  /* remove number inputs up and down icon */
  MuiTextField: {
    styleOverrides: {
      root: {
        '& input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      },
    },
  },
  /* remove number inputs up and down icon */

  MuiFormControl: {
    styleOverrides: {
      root: {
        '&:has(.MuiRadio-root) .MuiFormHelperText-root, &:has(.MuiCheckbox-root) .MuiFormHelperText-root, &:has(.MuiSwitch-root) .MuiFormHelperText-root':
          {
            marginInline: 0,
          },
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        backgroundColor: 'var(--mui-palette-background-paper)',
        lineHeight: 1.6,
        '&.MuiOutlinedInput-root': {
          paddingLeft: '16px !important',
          paddingRight: '16px !important',
          '&.search-box-input': {
            // Match CustomTextField prefix inset so search + clear icons share the same edge gap.
            paddingLeft: '8px !important',
            paddingRight: '8px !important',
          },
        },
        '&.MuiInput-underline': {
          '&:before': {
            borderColor: 'var(--mui-palette-customColors-inputBorder)',
          },
          '&:not(.Mui-disabled, .Mui-error):hover:before': {
            borderColor: 'var(--mui-palette-action-active)',
          },
        },
        '&.Mui-disabled .MuiInputAdornment-root, &.Mui-disabled .MuiInputAdornment-root > *': {
          color: 'var(--mui-palette-action-disabled)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'var(--mui-palette-secondary-lighterOpacity) !important',
          cursor: 'not-allowed !important',
          pointerEvents: 'unset !important',
        },
      },
    },
  },
  MuiFilledInput: {
    styleOverrides: {
      root: {
        '&:before': {
          borderBottom: '1px solid var(--mui-palette-text-secondary)',
        },
        '&.Mui-disabled:before': {
          borderBottomStyle: 'solid',
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        // Resting (unshrunk) label sits inside the field like a placeholder — Figma gray-300.
        color: theme.palette.iceGray[300] as string,
        '&.MuiInputLabel-sizeLarge': {
          transform: 'translate(14px, 13px) scale(1)',
        },
        '&.MuiInputLabel-sizeMedium': {
          transform: 'translate(14px, 11px) scale(1)',
        },
        '&.MuiInputLabel-sizeSmall': {
          transform: 'translate(14px, 9px) scale(1)',
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
        },
      }),
      shrink: ({ ownerState }) => ({
        ...(ownerState.variant === 'outlined' && {
          color: 'var(--mui-palette-text-secondary)',
          transform: 'translate(12px, -8px) scale(0.8) !important',
        }),
        ...(ownerState.variant === 'filled' && {
          transform: 'translate(12px, 7px) scale(0.8)',
        }),
        ...(ownerState.variant === 'standard' && {
          transform: 'translate(0, -1.5px) scale(0.8)',
        }),
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        fontSize: '14px !important',
        '& .Mui-disabled': {
          backgroundColor: 'unset',
        },
        '&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--mui-palette-action-active)',
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          // borderColor: 'var(--mui-palette-action-disabledBackground)',
          border: 'none',
        },
        borderRadius: 'var(--mui-shape-customBorderRadius-lg) !important',
        '&.MuiInputBase-sizeSmall': {
          borderRadius: 'var(--mui-shape-customBorderRadius-md) !important',
        },
        '&.MuiInputBase-sizeMedium': {
          borderRadius: 'var(--mui-shape-customBorderRadius-lg) !important',
        },
        '&.MuiInputBase-sizeLarge': {
          borderRadius: 'var(--mui-shape-customBorderRadius-xl) !important',
        },
      },
      input: ({ theme, ownerState }) => ({
        ...(ownerState?.size === 'medium' && {
          '&:not(.MuiInputBase-inputMultiline, .MuiInputBase-inputAdornedStart)': {
            paddingBlock: theme.spacing(4),
          },
          height: '11px',
        }),
        ...(ownerState?.size === 'small' && {
          '&:not(.MuiInputBase-inputMultiline, .MuiInputBase-inputAdornedStart)': {
            paddingBlock: theme.spacing(3),
          },
          height: '23px',
        }),
        ...(ownerState?.size === 'large' && {
          '&:not(.MuiInputBase-inputMultiline, .MuiInputBase-inputAdornedStart)': {
            paddingBlock: theme.spacing(5),
          },
          height: '15px',
        }),
        // Figma gray-300 — browsers default placeholder opacity otherwise washes the token out.
        '&::placeholder': {
          color: theme.palette.iceGray[300] as string,
          opacity: 1,
        },
        '& ~ .MuiOutlinedInput-notchedOutline': {
          // borderColor: 'var(--mui-palette-divider)',
          borderColor: theme.palette.iceGray['400'],
        },
      }),
      notchedOutline: {
        '& legend': {
          fontSize: '0.867em',
        },
      },
    },
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        marginRight: '0 !important',
        color: 'var(--mui-palette-text-primary)',
        '& i, & svg': {
          fontSize: '1.25rem',
        },
        '& *': {
          color: 'inherit !important',
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        lineHeight: 1,
        letterSpacing: 'unset',
      },
    },
  },
};

export default MuiInput;
