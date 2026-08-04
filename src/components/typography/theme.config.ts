import { Theme } from '@mui/material';
import React from 'react';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    xs: React.CSSProperties;
    xs_Medium: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xs?: React.CSSProperties;
    xs_Medium?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xs: true;
    xs_Medium: true;
  }
}

export const MuiTypography: Theme['components'] = {
  MuiTypography: {
    /* styleOverrides: {
      gutterBottom: ({ theme }) => ({
        marginBottom: theme.spacing(2),
      }),
    }, */
    variants: [
      {
        props: { variant: 'h1' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'h2' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'h3' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'h4' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'h5' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'h6' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'subtitle1' },
        style: { color: 'rgb(var(--mui-palette-text-primaryChannel) / 0.55)' },
      },
      {
        props: { variant: 'subtitle2' },
        style: { color: 'rgb(var(--mui-palette-text-primaryChannel) / 0.55)' },
      },
      {
        props: { variant: 'body1' },
        style: { color: 'var(--mui-palette-text-secondary)' },
      },
      {
        props: { variant: 'body2' },
        style: { color: 'var(--mui-palette-text-secondary)' },
      },
      {
        props: { variant: 'buttonSmall' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'buttonMedium' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'buttonLarge' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
      {
        props: { variant: 'caption' },
        style: { color: 'var(--mui-palette-text-disabled)', display: 'inline-block' },
      },
      {
        props: { variant: 'overline' },
        style: { color: 'var(--mui-palette-text-primary)', display: 'inline-block' },
      },
      {
        props: { variant: 'xs' },
        style: { color: 'var(--mui-palette-text-secondary)' },
      },
      {
        props: { variant: 'xs_Medium' },
        style: { color: 'var(--mui-palette-text-primary)' },
      },
    ],
  },
};
