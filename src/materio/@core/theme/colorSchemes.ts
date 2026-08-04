// MUI Imports
import type { Theme } from '@mui/material/styles';

// Type Imports
import type { Skin } from '../../@core/types';

const colorSchemes = (skin: Skin): Theme['colorSchemes'] => {
  return {
    light: {
      palette: {
        primary: {
          main: '#0073E6', // 500
          light: '#CCE3FA', // 100
          dark: '#003061', // 900
          20: '#F5FAFF',
          50: '#E6F1FD',
          100: '#CCE3FA',
          200: '#99C7F5',
          300: '#66ABF0',
          400: '#338FEB',
          500: '#0073E6',
          600: '#0067CF',
          700: '#0062C3',
          800: '#005CB8',
          900: '#0056AC',
          // Opacity
          'opacity-8': '#F2F8FE',
          'opacity-16': '#E5F1FC',
          'opacity-24': '#D9EAFB',
          'opacity-32': '#CCE3FA',
          'opacity-38': '#BFDCF9',
          lighterOpacity: '#F2F8FE', // 8
          lightOpacity: '#E5F1FC', // 16
          mainOpacity: '#D9EAFB', // 24
          darkOpacity: '#CCE3FA', // 32
          darkerOpacity: '#BFDCF9', // 38
        },
        info: {
          main: '#0022FF', // 500
          light: '#CCD3FF', // 100
          dark: '#001ABF', // 900
          100: '#CCD3FF',
          200: '#99A7FF',
          300: '#667AFF',
          400: '#334EFF',
          500: '#0022FF',
          600: '#001FE6',
          700: '#001DD9',
          800: '#001BCC',
          900: '#001ABF',
          // Opacity
          'opacity-8': '#F2F4FF',
          'opacity-16': '#E5E9FF',
          'opacity-24': '#D9DEFF',
          'opacity-32': '#CCD3FF',
          'opacity-38': '#BDC5FD',
          lighterOpacity: '#F2F4FF', // 8
          lightOpacity: '#E5E9FF', // 16
          mainOpacity: '#D9DEFF', // 24
          darkOpacity: '#CCD3FF', // 32
          darkerOpacity: '#BDC5FD', // 38
          contrastText: '#fff',
        },
        success: {
          main: '#28A745', // 500
          light: '#D4EDDA', // 100
          dark: '#1E7D34', // 900
          100: '#D4EDDA',
          200: '#A9DCB5',
          300: '#7ECA8F',
          400: '#53B96A',
          500: '#28A745',
          600: '#24963E',
          700: '#228E3B',
          800: '#208637',
          900: '#1E7D34',
          // Opacity
          'opacity-8': '#F4FBF6',
          'opacity-16': '#E9F6EC',
          'opacity-24': '#DFF2E3',
          'opacity-32': '#D4EDDA',
          'opacity-38': '#C9E9D1',
          lighterOpacity: '#F4FBF6', // 8
          lightOpacity: '#E9F6EC', // 16
          mainOpacity: '#DFF2E3', // 24
          darkOpacity: '#D4EDDA', // 32
          darkerOpacity: '#C9E9D1', // 38
          contrastText: '#fff',
        },
        warning: {
          main: '#F16E00', // 500
          light: '#FCE2CC', // 100
          dark: '#B55300', // 900
          100: '#FCE2CC',
          200: '#F9C599',
          300: '#F7A866',
          400: '#F48B33',
          500: '#F16E00',
          600: '#D96300',
          700: '#CD5E00',
          800: '#C15800',
          900: '#B55300',
          // Opacity
          'opacity-8': '#FEF8F2',
          'opacity-16': '#FEF0E5',
          'opacity-24': '#FDE9D9',
          'opacity-32': '#FCE2CC',
          'opacity-38': '#FBDBBF',
          lighterOpacity: '#FEF8F2', // 8
          lightOpacity: '#FEF0E5', // 16
          mainOpacity: '#FDE9D9', // 24
          darkOpacity: '#FCE2CC', // 32
          darkerOpacity: '#FBDBBF', // 38
          contrastText: '#fff',
        },
        error: {
          main: '#EA3B3B', // 500
          light: '#FBD8D8', // 100
          dark: '#B02C2C', // 900
          100: '#FBD8D8',
          200: '#F7B1B1',
          300: '#F28989',
          400: '#EE6262',
          500: '#EA3B3B',
          600: '#D33535',
          700: '#C73232',
          800: '#BB2F2F',
          900: '#B02C2C',
          // Opacity
          'opacity-8': '#FEF5F5',
          'opacity-16': '#FDEBEB',
          'opacity-24': '#FCE2E2',
          'opacity-32': '#FBD8D8',
          'opacity-38': '#FACECE',
          lighterOpacity: '#FEF5F5', // 8
          lightOpacity: '#FDEBEB', // 16
          mainOpacity: '#FCE2E2', // 24
          darkOpacity: '#FBD8D8', // 32
          darkerOpacity: '#FACECE', // 38
          contrastText: '#fff',
        },
        secondary: {
          main: '#757575', // based on design system
          light: '#F1F1F1', // based on design system
          dark: '#585858', // based on design system
          contrastText: '#fff',
          lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)',
        },
        iceGray: {
          50: '#FFFFFF', // gray-50 | White text,icon
          100: '#F8F8F8', // gray-100 | bg
          200: '#E0E0E0', // gray-200 | Divider
          300: '#BDBDBD', // gray-300 | Disabled text,inactive icons,switch
          400: '#ECECEC', // gray-400 | Focus outlines
          500: '#757575', // gray-500 | Secondary text,Buttons,Gray icons
          600: '#616161', // gray-600 | Hovered buttons
          700: '#424242', // gray-700 | main text,Active icon,tooltip
          800: '#212121',
          900: '#191919',
          // Opacity
          'opacity-8': '#F5F5F5',
          'opacity-16': '#ECECEC',
          'opacity-24': '#E3E3E3',
          'opacity-32': '#D9D9D9',
          'opacity-38': '#D0D0D0',
        },
        primaryGray: {
          20: '#FBFBFB',
          50: '#F1F1F1',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#8A8A8A',
          500: '#757575',
          600: '#696969',
          700: '#616161',
          800: '#5E5E5E',
          900: '#585858',
          // Opacity
          'opacity-8': '#F8F8F8',
          'opacity-16': '#F1F1F1',
          'opacity-24': '#EAEAEA',
          'opacity-32': '#E3E3E3',
          'opacity-38': '#DDDDDD',
        },
        turquoise: {
          500: '#20BFC5',
          600: '#168B8F',
          // Opacity
          'opacity-16': '#168B8F1A',
          'opacity-10': '#168B8F1A',
        },
        text: {
          primary: '#424242', // gray-700
          secondary: '#757575', // gray-500
          disabled: '#BDBDBD', // gray-300
          primaryChannel: 'var(--mui-mainColorChannels-light)',
          secondaryChannel: 'var(--mui-mainColorChannels-light)',
        },
        divider: '#E0E0E0', // gray-200
        dividerChannel: 'var(--mui-mainColorChannels-light)',
        background: {
          default: skin === 'bordered' ? '#FFFFFF' : '#F8F8F8', // gray-100
          paper: '#FFFFFF', // gray-50
        },
        action: {
          active: `rgb(var(--mui-mainColorChannels-light) / 0.6)`,
          hover: `rgb(var(--mui-mainColorChannels-light) / 0.04)`,
          selected: `rgb(var(--mui-mainColorChannels-light) / 0.08)`,
          disabled: `rgb(var(--mui-mainColorChannels-light) / 0.3)`,
          disabledBackground: `rgb(var(--mui-mainColorChannels-light) / 0.12)`,
          focus: `rgb(var(--mui-mainColorChannels-light) / 0.1)`,
          focusOpacity: 0.1,
          activeChannel: 'var(--mui-mainColorChannels-light)',
          selectedChannel: 'var(--mui-mainColorChannels-light)',
        },
        Alert: {
          errorColor: 'var(--mui-palette-error-main)',
          warningColor: 'var(--mui-palette-warning-main)',
          infoColor: 'var(--mui-palette-info-main)',
          successColor: 'var(--mui-palette-success-main)',
          errorStandardBg: 'var(--mui-palette-error-lightOpacity)',
          warningStandardBg: 'var(--mui-palette-warning-lightOpacity)',
          infoStandardBg: 'var(--mui-palette-info-lightOpacity)',
          successStandardBg: 'var(--mui-palette-success-lightOpacity)',
          errorFilledColor: 'var(--mui-palette-error-contrastText)',
          warningFilledColor: 'var(--mui-palette-warning-contrastText)',
          infoFilledColor: 'var(--mui-palette-info-contrastText)',
          successFilledColor: 'var(--mui-palette-success-contrastText)',
          errorFilledBg: 'var(--mui-palette-error-main)',
          warningFilledBg: 'var(--mui-palette-warning-main)',
          infoFilledBg: 'var(--mui-palette-info-main)',
          successFilledBg: 'var(--mui-palette-success-main)',
        },
        Avatar: {
          defaultBg: '#F0EFF0',
        },
        Chip: {
          defaultBorder: 'var(--mui-palette-divider)',
        },
        FilledInput: {
          bg: `rgb(var(--mui-mainColorChannels-light) / 0.06)`,
          hoverBg: `rgb(var(--mui-mainColorChannels-light) / 0.08)`,
          disabledBg: `rgb(var(--mui-mainColorChannels-light) / 0.06)`,
        },
        LinearProgress: {
          primaryBg: 'var(--mui-palette-primary-mainOpacity)',
          secondaryBg: 'var(--mui-palette-secondary-mainOpacity)',
          errorBg: 'var(--mui-palette-error-mainOpacity)',
          warningBg: 'var(--mui-palette-warning-mainOpacity)',
          infoBg: 'var(--mui-palette-info-mainOpacity)',
          successBg: 'var(--mui-palette-success-mainOpacity)',
        },
        SnackbarContent: {
          bg: '#1A0E33',
          color: 'var(--mui-palette-background-paper)',
        },
        Switch: {
          defaultColor: 'var(--mui-palette-common-white)',
          defaultDisabledColor: 'var(--mui-palette-common-white)',
          primaryDisabledColor: 'var(--mui-palette-common-white)',
          secondaryDisabledColor: 'var(--mui-palette-common-white)',
          errorDisabledColor: 'var(--mui-palette-common-white)',
          warningDisabledColor: 'var(--mui-palette-common-white)',
          infoDisabledColor: 'var(--mui-palette-common-white)',
          successDisabledColor: 'var(--mui-palette-common-white)',
        },
        Tooltip: {
          bg: '#1A0E33',
        },
        TableCell: {
          border: 'var(--mui-palette-divider)',
        },
        customColors: {
          bodyBg: '#F4F5FA',
          chatBg: '#F7F6FA',
          greyLightBg: '#FAFAFA',
          inputBorder: `rgb(var(--mui-mainColorChannels-light) / 0.22)`,
          goldBorder: 'linear-gradient(0deg, rgba(202,119,1,1) 0%, rgba(237,176,93,1) 50%, rgba(255,190,102,1) 100%)',
          greenBorder:
            'linear-gradient(135deg, rgba(28, 119, 49, 1) 0%, rgba(83, 185, 106, 1) 50%, rgba(156, 215, 169, 1) 100%)',
          purpleBorder: 'linear-gradient(135deg, #546BFF 0%, #8A99FF 50%, #B0BAFF 100%)',
          tableHeaderBg: '#F6F7FB',
          tooltipText: '#FFFFFF',
          trackBg: '#F0F2F8',
        },
        // add below lines of code to fix bugs on build
        common: {
          black: '#19191A',
        },
        mode: 'light',
        contrastThreshold: 3,
        tonalOffset: 0.2,
        getContrastText: (color: string) => (color === '#000' ? '#fff' : '#000'),
        augmentColor: (color: string) => color, // Define according to your needs
        colorScheme: 'light',
      },
      opacity: {/* Define opacity values */},
      overlays: {/* Define overlay values */},
    },
    dark: {
      palette: {
        primary: {
          main: '#0073E6', // 500
          light: '#F5FAFF', // 100
          dark: '#003061', // 900
          20: '#F5FAFF',
          50: '#E6F1FD',
          100: '#CCE3FA',
          200: '#99C7F5',
          300: '#66ABF0',
          400: '#338FEB',
          500: '#0073E6',
          600: '#0067CF',
          700: '#0062C3',
          800: '#005CB8',
          900: '#0056AC',
          // Opacity
          'opacity-8': '#F2F8FE',
          'opacity-16': '#E5F1FC',
          'opacity-24': '#D9EAFB',
          'opacity-32': '#CCE3FA',
          'opacity-38': '#BFDCF9',
          lighterOpacity: '#F2F8FE', // 8
          lightOpacity: '#E5F1FC', // 16
          mainOpacity: '#D9EAFB', // 24
          darkOpacity: '#CCE3FA', // 32
          darkerOpacity: '#BFDCF9', // 38
        },
        info: {
          main: '#0022FF', // 500
          light: '#CCD3FF', // 100
          dark: '#001ABF', // 900
          100: '#CCD3FF',
          200: '#99A7FF',
          300: '#667AFF',
          400: '#334EFF',
          500: '#0022FF',
          600: '#001FE6',
          700: '#001DD9',
          800: '#001BCC',
          900: '#001ABF',
          // Opacity
          'opacity-8': '#F2F4FF',
          'opacity-16': '#E5E9FF',
          'opacity-24': '#D9DEFF',
          'opacity-32': '#CCD3FF',
          'opacity-38': '#BDC5FD',
          lighterOpacity: '#F2F4FF', // 8
          lightOpacity: '#E5E9FF', // 16
          mainOpacity: '#D9DEFF', // 24
          darkOpacity: '#CCD3FF', // 32
          darkerOpacity: '#BDC5FD', // 38
          contrastText: '#fff',
        },
        success: {
          main: '#28A745', // 500
          light: '#D4EDDA', // 100
          dark: '#1E7D34', // 900
          100: '#D4EDDA',
          200: '#A9DCB5',
          300: '#7ECA8F',
          400: '#53B96A',
          500: '#28A745',
          600: '#24963E',
          700: '#228E3B',
          800: '#208637',
          900: '#1E7D34',
          // Opacity
          'opacity-8': '#F4FBF6',
          'opacity-16': '#E9F6EC',
          'opacity-24': '#DFF2E3',
          'opacity-32': '#D4EDDA',
          'opacity-38': '#C9E9D1',
          lighterOpacity: '#F4FBF6', // 8
          lightOpacity: '#E9F6EC', // 16
          mainOpacity: '#DFF2E3', // 24
          darkOpacity: '#D4EDDA', // 32
          darkerOpacity: '#C9E9D1', // 38
          contrastText: '#fff',
        },
        warning: {
          main: '#F16E00', // 500
          light: '#FCE2CC', // 100
          dark: '#B55300', // 900
          100: '#FCE2CC',
          200: '#F9C599',
          300: '#F7A866',
          400: '#F48B33',
          500: '#F16E00',
          600: '#D96300',
          700: '#CD5E00',
          800: '#C15800',
          900: '#B55300',
          // Opacity
          'opacity-8': '#FEF8F2',
          'opacity-16': '#FEF0E5',
          'opacity-24': '#FDE9D9',
          'opacity-32': '#FCE2CC',
          'opacity-38': '#FBDBBF',
          lighterOpacity: '#FEF8F2', // 8
          lightOpacity: '#FEF0E5', // 16
          mainOpacity: '#FDE9D9', // 24
          darkOpacity: '#FCE2CC', // 32
          darkerOpacity: '#FBDBBF', // 38
          contrastText: '#fff',
        },
        error: {
          main: '#EA3B3B', // 500
          light: '#FBD8D8', // 100
          dark: '#B02C2C', // 900
          100: '#FBD8D8',
          200: '#F7B1B1',
          300: '#F28989',
          400: '#EE6262',
          500: '#EA3B3B',
          600: '#D33535',
          700: '#C73232',
          800: '#BB2F2F',
          900: '#B02C2C',
          // Opacity
          'opacity-8': '#FEF5F5',
          'opacity-16': '#FDEBEB',
          'opacity-24': '#FCE2E2',
          'opacity-32': '#FBD8D8',
          'opacity-38': '#FACECE',
          lighterOpacity: '#FEF5F5', // 8
          lightOpacity: '#FDEBEB', // 16
          mainOpacity: '#FCE2E2', // 24
          darkOpacity: '#FBD8D8', // 32
          darkerOpacity: '#FACECE', // 38
          contrastText: '#fff',
        },
        secondary: {
          main: '#8A8D93',
          light: '#A1A4A9',
          dark: '#7C7F84',
          contrastText: '#fff',
          lighterOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.08)',
          lightOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
          mainOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.24)',
          darkOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.32)',
          darkerOpacity: 'rgb(var(--mui-palette-secondary-mainChannel) / 0.38)',
        },
        iceGray: {
          50: '#212121', // gray-50 | White text,icon
          100: '#424242', // gray-100 | bg
          200: '#555555', // gray-200 | Divider
          300: '#757575', // gray-300 | Disabled text,inactive icons,switch
          400: '#8E8E8E', // gray-400 | Focus outlines
          500: '#E0E0E0', // gray-500 | Secondary text,Buttons,Gray icons
          600: '#B3B3B3', // gray-600 | Hovered buttons
          700: '#FFFFFF', // gray-700 | main text,Active icon,tooltip
          800: '#ECECEC',
          900: '#FFFFFF',
          // Opacity
          'opacity-8': '#E7E3FC',
          'opacity-16': '#E7E3FC',
          'opacity-24': '#E7E3FC',
          'opacity-32': '#E7E3FC',
          'opacity-38': '#E7E3FC',
        },
        primaryGray: {
          20: '#FBFBFB',
          50: '#F1F1F1',
          100: '#E0E0E0',
          200: '#BDBDBD',
          300: '#9E9E9E',
          400: '#8A8A8A',
          500: '#757575',
          600: '#696969',
          700: '#616161',
          800: '#5E5E5E',
          900: '#585858',
          // Opacity
          'opacity-8': '#F8F8F8',
          'opacity-16': '#F1F1F1',
          'opacity-24': '#EAEAEA',
          'opacity-32': '#E3E3E3',
          'opacity-38': '#DDDDDD',
        },
        turquoise: {
          500: '#20BFC5',
          600: '#168B8F',
          // Opacity
          'opacity-16': '#168B8F1A',
          'opacity-10': '#168B8F1A',
        },
        text: {
          primary: '#FFFFFF', // gray-700
          secondary: '#E0E0E0', // gray-500
          disabled: '#757575', // gray-300
          primaryChannel: 'var(--mui-mainColorChannels-light)',
          secondaryChannel: 'var(--mui-mainColorChannels-light)',
        },
        divider: '#555555', // gray-200
        dividerChannel: 'var(--mui-mainColorChannels-light)',
        background: {
          default: skin === 'bordered' ? '#312D4B' : '#424242', // gray-100
          paper: '#212121', // gray-50
        },
        action: {
          active: `rgb(var(--mui-mainColorChannels-dark) / 0.6)`,
          hover: `rgb(var(--mui-mainColorChannels-dark) / 0.04)`,
          selected: `rgb(var(--mui-mainColorChannels-dark) / 0.08)`,
          disabled: `rgb(var(--mui-mainColorChannels-dark) / 0.3)`,
          disabledBackground: `rgb(var(--mui-mainColorChannels-dark) / 0.12)`,
          focus: `rgb(var(--mui-mainColorChannels-dark) / 0.1)`,
          focusOpacity: 0.1,
          activeChannel: 'var(--mui-mainColorChannels-dark)',
          selectedChannel: 'var(--mui-mainColorChannels-dark)',
        },
        Alert: {
          errorColor: 'var(--mui-palette-error-main)',
          warningColor: 'var(--mui-palette-warning-main)',
          infoColor: 'var(--mui-palette-info-main)',
          successColor: 'var(--mui-palette-success-main)',
          errorStandardBg: 'var(--mui-palette-error-lightOpacity)',
          warningStandardBg: 'var(--mui-palette-warning-lightOpacity)',
          infoStandardBg: 'var(--mui-palette-info-lightOpacity)',
          successStandardBg: 'var(--mui-palette-success-lightOpacity)',
          errorFilledColor: 'var(--mui-palette-error-contrastText)',
          warningFilledColor: 'var(--mui-palette-warning-contrastText)',
          infoFilledColor: 'var(--mui-palette-info-contrastText)',
          successFilledColor: 'var(--mui-palette-success-contrastText)',
          errorFilledBg: 'var(--mui-palette-error-main)',
          warningFilledBg: 'var(--mui-palette-warning-main)',
          infoFilledBg: 'var(--mui-palette-info-main)',
          successFilledBg: 'var(--mui-palette-success-main)',
        },
        Avatar: {
          defaultBg: '#3F3B59',
        },
        Chip: {
          defaultBorder: 'var(--mui-palette-divider)',
        },
        FilledInput: {
          bg: `rgb(var(--mui-mainColorChannels-dark) / 0.06)`,
          hoverBg: `rgb(var(--mui-mainColorChannels-dark) / 0.08)`,
          disabledBg: `rgb(var(--mui-mainColorChannels-dark) / 0.06)`,
        },
        LinearProgress: {
          primaryBg: 'var(--mui-palette-primary-mainOpacity)',
          secondaryBg: 'var(--mui-palette-secondary-mainOpacity)',
          errorBg: 'var(--mui-palette-error-mainOpacity)',
          warningBg: 'var(--mui-palette-warning-mainOpacity)',
          infoBg: 'var(--mui-palette-info-mainOpacity)',
          successBg: 'var(--mui-palette-success-mainOpacity)',
        },
        SnackbarContent: {
          bg: '#F7F4FF',
          color: 'var(--mui-palette-background-paper)',
        },
        Switch: {
          defaultColor: 'var(--mui-palette-common-white)',
          defaultDisabledColor: 'var(--mui-palette-common-white)',
          primaryDisabledColor: 'var(--mui-palette-common-white)',
          secondaryDisabledColor: 'var(--mui-palette-common-white)',
          errorDisabledColor: 'var(--mui-palette-common-white)',
          warningDisabledColor: 'var(--mui-palette-common-white)',
          infoDisabledColor: 'var(--mui-palette-common-white)',
          successDisabledColor: 'var(--mui-palette-common-white)',
        },
        Tooltip: {
          bg: '#F7F4FF',
        },
        TableCell: {
          border: 'var(--mui-palette-divider)',
        },
        customColors: {
          bodyBg: '#28243D',
          chatBg: '#373452',
          greyLightBg: '#373350',
          inputBorder: `rgb(var(--mui-mainColorChannels-dark) / 0.22)`,
          goldBorder: 'linear-gradient(0deg, rgba(202,119,1,1) 0%, rgba(237,176,93,1) 50%, rgba(255,190,102,1) 100%)',
          greenBorder:
            'linear-gradient(135deg, rgba(156, 215, 169, 1) 0%, rgba(83, 185, 106, 1) 50%, rgba(28, 119, 49, 1) 100%)',
          purpleBorder: 'linear-gradient(135deg, #546BFF 0%, #8A99FF 50%, #B0BAFF 100%)',
          tableHeaderBg: '#3D3759',
          tooltipText: '#312D4B',
          trackBg: '#474360',
        },
      },
      opacity: {/* Define opacity values */},
      overlays: {/* Define overlay values */},
    },
  } as unknown as Theme['colorSchemes'];
};

export default colorSchemes;

export type colorSchemesType =
  | 'primary.main'
  | 'primary.light'
  | 'primary.dark'
  | 'primary.20'
  | 'primary.50'
  | 'primary.100'
  | 'primary.200'
  | 'primary.300'
  | 'primary.400'
  | 'primary.500'
  | 'primary.600'
  | 'primary.700'
  | 'primary.800'
  | 'primary.900'
  | 'primary.opacity8'
  | 'primary.opacity16'
  | 'primary.opacity24'
  | 'primary.opacity32'
  | 'primary.opacity38'
  | 'primary.lighterOpacity'
  | 'primary.lightOpacity'
  | 'primary.mainOpacity'
  | 'primary.darkOpacity'
  | 'primary.darkerOpacity'
  | 'secondary.main'
  | 'secondary.light'
  | 'secondary.dark'
  | 'secondary.contrastText'
  | 'secondary.lighterOpacity'
  | 'secondary.lightOpacity'
  | 'secondary.mainOpacity'
  | 'secondary.darkOpacity'
  | 'secondary.darkerOpacity'
  | 'error.main'
  | 'error.light'
  | 'error.dark'
  | 'error.100'
  | 'error.200'
  | 'error.300'
  | 'error.400'
  | 'error.500'
  | 'error.600'
  | 'error.700'
  | 'error.800'
  | 'error.900'
  | 'error.opacity8'
  | 'error.opacity16'
  | 'error.opacity24'
  | 'error.opacity32'
  | 'error.opacity38'
  | 'error.contrastText'
  | 'error.lighterOpacity'
  | 'error.lightOpacity'
  | 'error.mainOpacity'
  | 'error.darkOpacity'
  | 'error.darkerOpacity'
  | 'warning.main'
  | 'warning.light'
  | 'warning.dark'
  | 'warning.100'
  | 'warning.200'
  | 'warning.300'
  | 'warning.400'
  | 'warning.500'
  | 'warning.600'
  | 'warning.700'
  | 'warning.800'
  | 'warning.900'
  | 'warning.opacity8'
  | 'warning.opacity16'
  | 'warning.opacity24'
  | 'warning.opacity32'
  | 'warning.opacity38'
  | 'warning.contrastText'
  | 'warning.lighterOpacity'
  | 'warning.lightOpacity'
  | 'warning.mainOpacity'
  | 'warning.darkOpacity'
  | 'warning.darkerOpacity'
  | 'info.main'
  | 'info.light'
  | 'info.dark'
  | 'info.100'
  | 'info.200'
  | 'info.300'
  | 'info.400'
  | 'info.500'
  | 'info.600'
  | 'info.700'
  | 'info.800'
  | 'info.900'
  | 'info.opacity8'
  | 'info.opacity16'
  | 'info.opacity24'
  | 'info.opacity32'
  | 'info.opacity38'
  | 'info.contrastText'
  | 'info.lighterOpacity'
  | 'info.lightOpacity'
  | 'info.mainOpacity'
  | 'info.darkOpacity'
  | 'info.darkerOpacity'
  | 'success.main'
  | 'success.light'
  | 'success.dark'
  | 'success.100'
  | 'success.200'
  | 'success.300'
  | 'success.400'
  | 'success.500'
  | 'success.600'
  | 'success.700'
  | 'success.800'
  | 'success.900'
  | 'success.opacity8'
  | 'success.opacity16'
  | 'success.opacity24'
  | 'success.opacity32'
  | 'success.opacity38'
  | 'success.contrastText'
  | 'success.lighterOpacity'
  | 'success.lightOpacity'
  | 'success.mainOpacity'
  | 'success.darkOpacity'
  | 'success.darkerOpacity'
  | 'iceGray.50'
  | 'iceGray.100'
  | 'iceGray.200'
  | 'iceGray.300'
  | 'iceGray.400'
  | 'iceGray.500'
  | 'iceGray.600'
  | 'iceGray.700'
  | 'iceGray.800'
  | 'iceGray.900'
  | 'iceGray.opacity8'
  | 'iceGray.opacity16'
  | 'iceGray.opacity24'
  | 'iceGray.opacity32'
  | 'iceGray.opacity38'
  | 'primaryGray.20'
  | 'primaryGray.50'
  | 'primaryGray.100'
  | 'primaryGray.200'
  | 'primaryGray.300'
  | 'primaryGray.400'
  | 'primaryGray.500'
  | 'primaryGray.600'
  | 'primaryGray.700'
  | 'primaryGray.800'
  | 'primaryGray.900'
  | 'primaryGray.opacity8'
  | 'primaryGray.opacity16'
  | 'primaryGray.opacity24'
  | 'primaryGray.opacity32'
  | 'primaryGray.opacity38'
  | 'turquoise.500'
  | 'turquoise.600'
  | 'turquoise.opacity16'
  | 'turquoise.opacity10'
  | 'text.primary'
  | 'text.secondary'
  | 'text.disabled'
  | 'text.primaryChannel'
  | 'text.secondaryChannel'
  | 'divider'
  | 'dividerChannel'
  | 'common.black'
  | 'background.default'
  | 'background.paper'
  | 'action.active'
  | 'action.hover'
  | 'action.selected'
  | 'action.disabled'
  | 'action.disabledBackground'
  | 'action.focusOpacity'
  | 'action.activeChannel'
  | 'Alert.errorColor'
  | 'Alert.warningColor'
  | 'Alert.infoColor'
  | 'Alert.successColor'
  | 'Alert.errorStandardBg'
  | 'Alert.warningStandardBg'
  | 'Alert.infoStandardBg'
  | 'Alert.successStandardBg'
  | 'Alert.errorFilledColor'
  | 'Alert.warningFilledColor'
  | 'Alert.infoFilledColor'
  | 'Alert.successFilledColor'
  | 'Alert.errorFilledBg'
  | 'Alert.warningFilledBg'
  | 'Alert.infoFilledBg'
  | 'Alert.successFilledBg'
  | 'Avatar.defaultBg'
  | 'Chip.defaultBorder'
  | 'FilledInput.bg'
  | 'FilledInput.hoverBg'
  | 'FilledInput.disabledBg'
  | 'LinearProgress.primaryBg'
  | 'LinearProgress.secondaryBg'
  | 'LinearProgress.errorBg'
  | 'LinearProgress.warningBg'
  | 'LinearProgress.infoBg'
  | 'LinearProgress.successBg'
  | 'SnackbarContent.bg'
  | 'SnackbarContent.color'
  | 'Switch.defaultColor'
  | 'Switch.defaultDisabledColor'
  | 'Switch.primaryDisabledColor'
  | 'Switch.secondaryDisabledColor'
  | 'Switch.errorDisabledColor'
  | 'Switch.warningDisabledColor'
  | 'Switch.infoDisabledColor'
  | 'Switch.successDisabledColor'
  | 'Tooltip.bg'
  | 'TableCell.border'
  | 'customColors.bodyBg'
  | 'customColors.chatBg'
  | 'customColors.greyLightBg'
  | 'customColors.inputBorder'
  | 'customColors.tableHeaderBg'
  | 'customColors.tooltipText'
  | 'customColors.trackBg';
