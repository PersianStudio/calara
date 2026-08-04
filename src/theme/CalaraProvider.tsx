import '../icon/style.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '../i18n';

import CssBaseline from '@mui/material/CssBaseline';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { FC, ReactNode, useMemo } from 'react';

import type { Direction, SystemMode } from '../materio/@core/types';
import breakpoints from '../materio/@core/theme/breakpoints';
import colorSchemes from '../materio/@core/theme/colorSchemes';
import customShadows from '../materio/@core/theme/customShadows';
import shadows from '../materio/@core/theme/shadows';
import spacing from '../materio/@core/theme/spacing';
import typography from '../materio/@core/theme/typography';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      iceDefault: string;
    };
    shape: {
      borderRadius: number;
      customBorderRadius: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }

  interface ThemeOptions {
    customShadows?: Theme['customShadows'];
    shape?: Partial<Theme['shape']>;
  }

  interface TypographyVariants {
    h3_600: React.CSSProperties;
    h4_600: React.CSSProperties;
    body1_500: React.CSSProperties;
    body2_500: React.CSSProperties;
    body3: React.CSSProperties;
    body3_500: React.CSSProperties;
    xs: React.CSSProperties;
    xs_Medium: React.CSSProperties;
    buttonLarge: React.CSSProperties;
    buttonMedium: React.CSSProperties;
    buttonSmall: React.CSSProperties;
    inputLabel: React.CSSProperties;
    helperText: React.CSSProperties;
    inputTextLarge: React.CSSProperties;
    inputText: React.CSSProperties;
    inputTextSmall: React.CSSProperties;
    avatarInitials: React.CSSProperties;
    chip: React.CSSProperties;
    tooltip: React.CSSProperties;
    alertText: React.CSSProperties;
    tableHeader: React.CSSProperties;
    badgeLabel: React.CSSProperties;
    navbar: React.CSSProperties;
    toast: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h3_600?: React.CSSProperties;
    h4_600?: React.CSSProperties;
    body1_500?: React.CSSProperties;
    body2_500?: React.CSSProperties;
    body3?: React.CSSProperties;
    body3_500?: React.CSSProperties;
    xs?: React.CSSProperties;
    xs_Medium?: React.CSSProperties;
    buttonLarge?: React.CSSProperties;
    buttonMedium?: React.CSSProperties;
    buttonSmall?: React.CSSProperties;
    inputLabel?: React.CSSProperties;
    helperText?: React.CSSProperties;
    inputTextLarge?: React.CSSProperties;
    inputText?: React.CSSProperties;
    inputTextSmall?: React.CSSProperties;
    avatarInitials?: React.CSSProperties;
    chip?: React.CSSProperties;
    tooltip?: React.CSSProperties;
    alertText?: React.CSSProperties;
    tableHeader?: React.CSSProperties;
    badgeLabel?: React.CSSProperties;
    navbar?: React.CSSProperties;
    toast?: React.CSSProperties;
  }

  interface BreakpointOverrides {
    xxl: true;
    xxxl: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3_600: true;
    h4_600: true;
    body1_500: true;
    body2_500: true;
    body3: true;
    body3_500: true;
    xs: true;
    xs_Medium: true;
    buttonLarge: true;
    buttonMedium: true;
    buttonSmall: true;
    inputLabel: true;
    helperText: true;
    inputTextLarge: true;
    inputText: true;
    inputTextSmall: true;
    avatarInitials: true;
    chip: true;
    tooltip: true;
    alertText: true;
    tableHeader: true;
    badgeLabel: true;
    navbar: true;
    toast: true;
  }
}

export interface CalaraProviderProps {
  children: ReactNode;
  /** Visual mode for the CssVars theme. Default `light`. */
  mode?: SystemMode;
  /** Document / theme direction. Default `ltr`. */
  direction?: Direction;
}

/**
 * Minimal runtime theme + date localization for Calara calendar / date picker.
 * Ships ICE palette tokens (`iceGray`, opacity scales), Poppins, icon font, and date-fns adapter.
 */
export const CalaraProvider: FC<CalaraProviderProps> = ({
  children,
  mode = 'light',
  direction = 'ltr',
}) => {
  const theme = useMemo(
    () =>
      extendTheme({
        cssVarPrefix: 'mui',
        colorSchemes: colorSchemes('default'),
        ...spacing,
        breakpoints,
        direction,
        typography: typography('Poppins, sans-serif') as never,
        shadows: shadows(mode),
        customShadows: customShadows(mode),
        shape: {
          borderRadius: 6,
          customBorderRadius: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 },
        },
      }),
    [direction, mode],
  );

  return (
    <CssVarsProvider theme={theme} defaultMode={mode}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {children}
      </LocalizationProvider>
    </CssVarsProvider>
  );
};

/** Alias kept for drop-in familiarity with the upstream design-system provider name. */
export const DesignSystemProvider = CalaraProvider;
