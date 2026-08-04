// MUI Imports
import type { Theme } from '@mui/material/styles';
import { CSSProperties } from 'react';

type ExtendedTypography = Theme['typography'] & {
  body3: CSSProperties;
  body3_500: CSSProperties;
  xs: CSSProperties;
  xs_Medium: CSSProperties;
};

const typography = (fontFamily: string): ExtendedTypography =>
  ({
    fontFamily:
      typeof fontFamily === 'undefined' || fontFamily === ''
        ? [
            'Poppins',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(',')
        : fontFamily,
    fontSize: 13.125,
    h1: {
      fontSize: '2.875rem', // 46px
      fontWeight: 500,
      lineHeight: '68px',
    },
    h2: {
      fontSize: '2.375rem', // 38px
      fontWeight: 500,
      lineHeight: '56px',
    },
    h3: {
      fontSize: '1.75rem', // 28px
      fontWeight: 500,
      lineHeight: '42px',
    },
    h3_600: {
      fontSize: '1.75rem', // 28px
      fontWeight: 600,
      lineHeight: '42px',
    },
    h4: {
      fontSize: '1.625rem', // 26px
      fontWeight: 500,
      lineHeight: '38px',
    },
    h4_600: {
      fontSize: '1.625rem', // 26px
      fontWeight: 600,
      lineHeight: '38px',
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: '28px',
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: '22px',
    },
    subtitle1: {
      fontSize: '0.875rem', // 14px
      lineHeight: '22px',
    },
    subtitle2: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: '20px',
    },
    body1: {
      fontSize: '1rem', // 16px
      lineHeight: '22px',
    },
    body1_500: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: '22px',
    },
    body2: {
      fontSize: '0.875rem', // 14px
      lineHeight: '20px',
    },
    body2_500: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: '20px',
    },
    body3: {
      fontSize: '0.75rem', // 12px
      lineHeight: '18px',
      fontWeight: 400,
    },
    body3_500: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: '18px',
    },
    xs: {
      fontSize: '0.6875rem', // 11px
      fontWeight: 400,
      lineHeight: '13px', // 100%
    },
    xs_Medium: {
      fontSize: '0.6875rem', // 11px
      fontWeight: 500,
      lineHeight: '13px', // 100%
    },
    button: {
      fontSize: '0.9375rem',
      lineHeight: 1.46667,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: '18px',
      letterSpacing: '0.4px',
    },
    overline: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: '14px',
      letterSpacing: '0.8px',
    },
    buttonLarge: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: '26px',
    },
    buttonMedium: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: '22px',
    },
    buttonSmall: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: '18px',
    },
    inputLabel: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: '15px',
    },
    helperText: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: '13px',
    },
    inputTextLarge: {
      fontSize: '1.125rem', // 18px
      fontWeight: 400,
      lineHeight: '28px',
    },
    inputText: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: '24px',
    },
    inputTextSmall: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: '22px',
    },
    avatarInitials: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: '18px',
    },
    chip: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: '20px',
    },
    tooltip: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: '20px',
    },
    alertText: {
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: '24px',
    },
    tableHeader: {
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      lineHeight: '24px',
    },
    badgeLabel: {
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      lineHeight: '20px',
    },
    navbar: {
      fontSize: '0.625rem', // 10px
      fontWeight: 500,
      lineHeight: '16px',
    },
    toast: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: '22px',
    },
  }) as ExtendedTypography;

export default typography;
