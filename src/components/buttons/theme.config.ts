import { Theme } from '@mui/material';
import { borderLeft, padding } from '@mui/system';
import themeConfig from '../../materio/configs/themeConfig';

const iconStyles = (size?: string) => ({
  '& > *:nth-of-type(1)': {
    ...(size === 'small'
      ? {
          fontSize: '14px',
        }
      : {
          ...(size === 'medium'
            ? {
                fontSize: '16px',
              }
            : {
                fontSize: '20px',
              }),
        }),
  },
});

export const MuiButton: Theme['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        fontWeight: 400,
        '&.dropdown-btn': {
          padding: '12px 9px',
          '&.MuiButton-contained': {
            borderLeft: '0 !important',
          },
          ...(ownerState.size === 'small' && {
            i: {
              fontSize: '16px',
            },
          }),
          ...(ownerState.size === 'medium' && {
            i: {
              fontSize: '20px',
            },
          }),
          ...(ownerState.size === 'large' && {
            i: {
              fontSize: '24px',
            },
          }),
          ...(ownerState.variant === 'soft' && {
            borderLeft:
              ownerState.color === 'secondary'
                ? `1px solid ${theme.palette.iceGray['opacity-38']}`
                : `1px solid ${theme.palette?.[ownerState?.color || 'primary']['opacity-38']}`,
          }),
          ...(ownerState.variant === 'text' && {
            borderLeft:
              ownerState.color === 'secondary'
                ? `1px solid ${theme.palette.iceGray['500']}`
                : `1px solid ${theme.palette?.[ownerState?.color || 'primary']['500']}`,
            '&:hover': {
              borderLeft:
                ownerState.color === 'secondary'
                  ? `1px solid ${theme.palette.iceGray['600']}`
                  : `1px solid ${theme.palette?.[ownerState?.color || 'primary']['600']}`,
            },
          }),
          ...(ownerState.variant === 'contained' && {
            borderLeft:
              ownerState.color === 'secondary'
                ? `1px solid ${theme.palette.iceGray['700']}`
                : `1px solid ${theme.palette?.[ownerState?.color || 'primary']['800']}`,
            '&:hover': {
              borderLeft:
                ownerState.color === 'secondary'
                  ? `1px solid ${theme.palette.iceGray['600']}`
                  : `1px solid ${theme.palette?.[ownerState?.color || 'primary']['600']}`,
            },
          }),
        },
        ...(ownerState.variant === 'text'
          ? {
              ...(ownerState.size === 'small' && {
                padding: theme.spacing(2, 2.5),
              }),
              ...(ownerState.size === 'medium' && {
                padding: theme.spacing(2, 3.5),
              }),
              ...(ownerState.size === 'large' && {
                padding: theme.spacing(2, 4.5),
              }),
            }
          : ownerState.variant === 'outlined'
            ? {
                ...(ownerState.size === 'small' && {
                  padding: theme.spacing(1.75, 3.25),
                }),
                ...(ownerState.size === 'medium' && {
                  padding: theme.spacing(1.75, 4.25),
                }),
                ...(ownerState.size === 'large' && {
                  padding: theme.spacing(1.75, 5.25),
                }),
              }
            : {
                ...(ownerState.size === 'small' && {
                  padding: theme.spacing(2, 3.5),
                }),
                ...(ownerState.size === 'medium' && {
                  padding: theme.spacing(2, 4.5),
                }),
                ...(ownerState.size === 'large' && {
                  padding: theme.spacing(2, 5.5),
                }),
              }),
      }),
      contained: ({ ownerState }) => ({
        boxShadow: 'var(--mui-customShadows-xs)',
        ...(!ownerState.disabled && {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: 'var(--mui-customShadows-xs)',
          },
          '&:active': {
            boxShadow: 'none',
          },
        }),
      }),
      sizeSmall: ({ theme }) => ({
        lineHeight: 1.7147,
        fontSize: theme.typography.caption.fontSize,
        borderRadius: '6px',
      }),
      sizeMedium: ({ theme }) => ({
        lineHeight: 1.767,
        fontSize: theme.typography.body1.fontSize,
        borderRadius: '8px',
      }),
      sizeLarge: ({ theme }) => ({
        fontSize: '1.0625rem',
        lineHeight: 1.8825,
        borderRadius: '12px',
      }),
      startIcon: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineEnd: theme.spacing(1.5),
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineEnd: theme.spacing(2),
                  }
                : {
                    marginInlineEnd: theme.spacing(2.5),
                  }),
            }),
        ...iconStyles(ownerState.size),
      }),
      endIcon: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineStart: theme.spacing(1.5),
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineStart: theme.spacing(2),
                  }
                : {
                    marginInlineStart: theme.spacing(2.5),
                  }),
            }),
        ...iconStyles(ownerState.size),
      }),
    },
    variants: [
      {
        props: { variant: 'text', color: 'primary' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'secondary' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'error' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'warning' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'info' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'success' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-success-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'primary' },
        style: {
          borderColor: 'var(--mui-palette-primary-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-main)',
            borderColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'secondary' },
        style: {
          borderColor: 'var(--mui-palette-secondary-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-secondary-main)',
            borderColor: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'error' },
        style: {
          borderColor: 'var(--mui-palette-error-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-main)',
            borderColor: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'warning' },
        style: {
          borderColor: 'var(--mui-palette-warning-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-warning-main)',
            borderColor: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'info' },
        style: {
          borderColor: 'var(--mui-palette-info-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-info-main)',
            borderColor: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'success' },
        style: {
          borderColor: 'var(--mui-palette-success-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-success-main)',
            borderColor: 'var(--mui-palette-success-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-primary-dark)',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-contrastText)',
            backgroundColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'secondary' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-secondary-dark)',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-secondary-contrastText)',
            backgroundColor: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'error' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-error-dark)',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-contrastText)',
            backgroundColor: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'warning' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-warning-dark)',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-warning-contrastText)',
            backgroundColor: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'info' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-info-dark)',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-info-contrastText)',
            backgroundColor: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'success' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-success-dark)',
          },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-success-contrastText)',
            backgroundColor: 'var(--mui-palette-success-main)',
          },
        },
      },
      {
        props: { variant: 'soft', color: 'primary' },
        style: ({ theme }) => ({
          color: theme.palette.primary[500],
          backgroundColor: theme.palette.primary['opacity-16'],
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: theme.palette.primary[600],
              backgroundColor: theme.palette.primary['opacity-24'],
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: theme.palette.primary[500],
            backgroundColor: theme.palette.primary['opacity-16'],
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'secondary' },
        style: ({ theme }) => ({
          color: theme.palette.iceGray[500],
          backgroundColor: theme.palette.iceGray['opacity-16'],
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: theme.palette.iceGray[600],
              backgroundColor: theme.palette.iceGray['opacity-24'],
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: theme.palette.iceGray[500],
            backgroundColor: theme.palette.iceGray['opacity-16'],
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'error' },
        style: ({ theme }) => ({
          color: theme.palette.error[500],
          backgroundColor: theme.palette.error['opacity-16'],
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: theme.palette.error[600],
              backgroundColor: theme.palette.error['opacity-24'],
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: theme.palette.error[500],
            backgroundColor: theme.palette.error['opacity-16'],
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'warning' },
        style: ({ theme }) => ({
          color: theme.palette.warning[500],
          backgroundColor: theme.palette.warning['opacity-16'],
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: theme.palette.warning[600],
              backgroundColor: theme.palette.warning['opacity-24'],
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: theme.palette.warning[500],
            backgroundColor: theme.palette.warning['opacity-16'],
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'info' },
        style: ({ theme }) => ({
          color: theme.palette.info[500],
          backgroundColor: theme.palette.info['opacity-16'],
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: theme.palette.info[600],
              backgroundColor: theme.palette.info['opacity-24'],
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: theme.palette.info[500],
            backgroundColor: theme.palette.info['opacity-16'],
          },
        }),
      },
      {
        props: { variant: 'soft', color: 'success' },
        style: ({ theme }) => ({
          color: theme.palette.success[500],
          backgroundColor: theme.palette.success['opacity-16'],
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              color: theme.palette.success[600],
              backgroundColor: theme.palette.success['opacity-24'],
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: theme.palette.success[500],
            backgroundColor: theme.palette.success['opacity-16'],
          },
        }),
      },
    ],
  },
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        borderRadius: '4px',
        '&.circle': {
          borderRadius: '50%',
        },
        '& .MuiSvgIcon-root, & i, & svg': {
          fontSize: 'inherit',
        },
        '&.outlined': {
          border: '1px solid',
        },
        '&.contained': {
          color: 'white',
          backgroundColor:
            ownerState.color === 'secondary'
              ? theme.palette.iceGray[500]
              : theme.palette?.[ownerState.color || 'primary']?.[500],
          '&:hover': {
            backgroundColor:
              ownerState.color === 'secondary'
                ? `${theme.palette.iceGray[600]} !important`
                : `${theme.palette[ownerState.color || 'primary']?.[600]} !important`,
          },
        },
        '&.soft': {
          color: theme.palette[ownerState.color || 'primary']?.[500],
          backgroundColor:
            ownerState.color === 'secondary'
              ? theme.palette.iceGray?.['opacity-16']
              : theme.palette[ownerState.color || 'primary']?.['opacity-16'],
          '&:hover': {
            backgroundColor:
              ownerState.color === 'secondary'
                ? `${theme.palette.iceGray?.['opacity-24']} !important`
                : `${theme.palette[ownerState.color || 'primary']?.['opacity-24']} !important`,
          },
        },
      }),
      sizeSmall: ({ theme }) => ({
        padding: theme.spacing(2),
        fontSize: '1.25rem',
        minWidth: '40px',
        height: '40px',
        width: '40px',
      }),
      sizeMedium: ({ theme }) => ({
        padding: theme.spacing(2.25),
        fontSize: '1.375rem',
        minWidth: '44px',
        height: '44px',
        width: '44px',
      }),
      sizeLarge: ({ theme }) => ({
        padding: theme.spacing(2.5),
        fontSize: '1.5rem',
        minWidth: '48px',
        height: '48px',
        width: '48px',
      }),
    },
    variants: [
      {
        props: { color: 'default' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-action-active)',
          },
        },
      },
      {
        props: { color: 'primary' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { color: 'secondary' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { color: 'error' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { color: 'warning' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { color: 'info' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { color: 'success' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-success-main)',
          },
        },
      },
    ],
  },
};
