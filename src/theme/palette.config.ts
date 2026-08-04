import { ThemeOptions } from '@mui/material';

export const getDesignTokens: (mode: 'light' | 'dark', dir: 'ltr' | 'rtl', bgColor?: string) => ThemeOptions = (
  mode,
  dir,
  bgColor,
) => ({
  direction: dir,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920, // custom breakpoint
      xxxl: 2400, // custom breakpoint
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          white: { main: '#FFF' },
          background: { default: bgColor },
          blue: {
            main: '#0099ff',
            50: '#e6f5ff',
            100: '#b0dfff',
            200: '#8ad0ff',
            300: '#54bbff',
            400: '#33adff',
            500: '#0099ff',
            600: '#008be8',
            700: '#006db5',
            800: '#00548c',
            900: '#00406b',
          },
          red: {
            main: '#ea3b3b',
            50: '#fdebeb',
            100: '#f8c2c2',
            200: '#f5a5a5',
            300: '#f17c7c',
            400: '#ee6262',
            500: '#ea3b3b',
            600: '#d53636',
            700: '#a62a2a',
            800: '#812020',
            900: '#621919',
          },
          violet: {
            main: '#da2fe9',
            50: '#fbeafd',
            100: '#f4bff8',
            200: '#ee9ff5',
            300: '#e674f0',
            400: '#e159ed',
            500: '#da2fe9',
            600: '#c62bd4',
            700: '#9b21a5',
            800: '#781a80',
            900: '#5c1462',
          },
          pink: {
            main: '#f5659c',
            50: '#feecf3',
            100: '#fbc3d9',
            200: '#f9a7c6',
            300: '#f67eac',
            400: '#f5659c',
            500: '#f5659c',
            600: '#dc3977',
            700: '#ac2d5d',
            800: '#852348',
            900: '#661a37',
          },
          orange: {
            main: '#ff7900',
            50: '#fff2e6',
            100: '#ffd5b0',
            200: '#ffc18a',
            300: '#ffa554',
            400: '#ff9433',
            500: '#ff7900',
            600: '#e86e00',
            700: '#b55600',
            800: '#8c4300',
            900: '#6b3300',
          },
          geekBlue: {
            main: '#2d1ceb',
            50: '#eae8fd',
            100: '#beb9f9',
            200: '#9e97f6',
            300: '#7267f2',
            400: '#5749ef',
            500: '#2d1ceb',
            600: '#2919d6',
            700: '#2014a7',
            800: '#190f81',
            900: '#130c63',
          },
          purple: {
            main: '#7f4aef',
            50: '#f2edfd',
            100: '#d7c7fa',
            200: '#c4acf8',
            300: '#a986f4',
            400: '#996ef2',
            500: '#7f4aef',
            600: '#7443d9',
            700: '#5a35aa',
            800: '#462983',
            900: '#351f64',
          },
          black: {
            main: '#19191a',
            50: '#e8e8e8',
            100: '#b8b8b8',
            200: '#959596',
            300: '#656566',
            400: '#474748',
            500: '#19191a',
            600: '#171718',
            700: '#121212',
            800: '#0e0e0e',
            900: '#0b0b0b',
          },
          blackShade: {
            main: 'rgba(25, 25, 26, 0.25)',
            25: 'rgba(25, 25, 26, 0.25)',
            15: 'rgba(25, 25, 26, 0.15)',
            5: 'rgba(25, 25, 26, 0.05)',
          },
          grey: {
            main: '#b9b9b9',
            50: '#f8f8f8',
            100: '#f5f5f5',
            200: '#f2f2f3',
            300: '#f1f1f1',
            400: '#dbdddf',
            500: '#b9b9b9',
            600: '#707070',
            700: '#838383',
            800: '#666666',
            900: '#4e4e4e',
          },
          cyan: {
            main: '#23d2d9',
            50: '#e9fbfb',
            100: '#bbf1f3',
            200: '#9aeaee',
            300: '#6ce1e6',
            400: '#4fdbe1',
            500: '#23d2d9',
            600: '#20bfc5',
            700: '#19959a',
            800: '#137477',
            900: '#0f585b',
          },
          green: {
            main: '#3fd745',
            50: '#ecfbec',
            100: '#c3f3c5',
            200: '#a7eda9',
            300: '#7ee482',
            400: '#65df6a',
            500: '#3fd745',
            600: '#39c43f',
            700: '#2d9931',
            800: '#237626',
            900: '#1a5a1d',
          },
          turquoise: {
            main: '#22d8b5',
            50: '#e9fbf8',
            100: '#baf3e8',
            200: '#99eddd',
            300: '#6be5cd',
            400: '#4ee0c4',
            500: '#22d8b5',
            600: '#1fc5a5',
            700: '#189981',
            800: '#137764',
            900: '#0e5b4c',
          },
          yellow: {
            main: '#ffd600',
            50: '#fffbe6',
            100: '#fff2b0',
            200: '#ffec8a',
            300: '#ffe454',
            400: '#ffde33',
            500: '#ffd600',
            600: '#e8c300',
            700: '#b59800',
            800: '#8c7600',
            900: '#6b5a00',
          },
          gold: {
            main: '#ffb103',
            50: '#fff7e6',
            100: '#ffe7b1',
            200: '#ffdb8b',
            300: '#ffcb56',
            400: '#ffc135',
            500: '#ffb103',
            600: '#e8a103',
            700: '#b57e02',
            800: '#8c6102',
            900: '#6b4a01',
          },
          primary: { light: '#33ADFF', main: '#0099ff', dark: '#008BE8' },
          success: { light: '#65DF6A', main: '#3FD745', dark: '#39C43F' },
          successBg: {
            main: '#ecfbec',
            dark: '#39C43F',
          },
          info: {
            main: '#008BE8',
          },
          infoBg: {
            // main: '#E6F5FF',
            main: '#D9F0FF',
            dark: '#008BE8',
          },
          warning: {
            main: '#e86e00',
          },
          warningBg: {
            main: '#fff2e6',
            dark: '#e86e00',
          },
          error: {
            main: '#d53636',
          },
          errorBg: {
            main: '#fdebeb',
            dark: '#d53636',
          },
        }
      : {}),
  },
});

export type ColorsType =
  | 'primary'
  | 'primary.light'
  | 'primary.dark'
  | 'white'
  | 'success'
  | 'success.light'
  | 'success.dark'
  | 'successBg'
  | 'successBg.dark'
  | 'info'
  | 'infoBg'
  | 'infoBg.dark'
  | 'warning'
  | 'warningBg'
  | 'warningBg.dark'
  | 'error'
  | 'errorBg'
  | 'errorBg.dark'
  | 'grey'
  | 'grey.50'
  | 'grey.100'
  | 'grey.200'
  | 'grey.300'
  | 'grey.400'
  | 'grey.500'
  | 'grey.600'
  | 'grey.700'
  | 'grey.800'
  | 'grey.900'
  | 'blue'
  | 'blue.50'
  | 'blue.100'
  | 'blue.200'
  | 'blue.300'
  | 'blue.400'
  | 'blue.500'
  | 'blue.600'
  | 'blue.700'
  | 'blue.800'
  | 'blue.900'
  | 'red'
  | 'red.50'
  | 'red.100'
  | 'red.200'
  | 'red.300'
  | 'red.400'
  | 'red.500'
  | 'red.600'
  | 'red.700'
  | 'red.800'
  | 'red.900'
  | 'violet'
  | 'violet.50'
  | 'violet.100'
  | 'violet.200'
  | 'violet.300'
  | 'violet.400'
  | 'violet.500'
  | 'violet.600'
  | 'violet.700'
  | 'violet.800'
  | 'violet.900'
  | 'pink'
  | 'pink.50'
  | 'pink.100'
  | 'pink.200'
  | 'pink.300'
  | 'pink.400'
  | 'pink.500'
  | 'pink.600'
  | 'pink.700'
  | 'pink.800'
  | 'pink.900'
  | 'orange'
  | 'orange.50'
  | 'orange.100'
  | 'orange.200'
  | 'orange.300'
  | 'orange.400'
  | 'orange.500'
  | 'orange.600'
  | 'orange.700'
  | 'orange.800'
  | 'orange.900'
  | 'geekBlue'
  | 'geekBlue.50'
  | 'geekBlue.100'
  | 'geekBlue.200'
  | 'geekBlue.300'
  | 'geekBlue.400'
  | 'geekBlue.500'
  | 'geekBlue.600'
  | 'geekBlue.700'
  | 'geekBlue.800'
  | 'geekBlue.900'
  | 'purple'
  | 'purple.50'
  | 'purple.100'
  | 'purple.200'
  | 'purple.300'
  | 'purple.400'
  | 'purple.500'
  | 'purple.600'
  | 'purple.700'
  | 'purple.800'
  | 'purple.900'
  | 'blackShade'
  | 'blackShade.25'
  | 'blackShade.5'
  | 'black'
  | 'black.50'
  | 'black.100'
  | 'black.200'
  | 'black.300'
  | 'black.400'
  | 'black.500'
  | 'black.600'
  | 'black.700'
  | 'black.800'
  | 'black.900'
  | 'cyan'
  | 'cyan.50'
  | 'cyan.100'
  | 'cyan.200'
  | 'cyan.300'
  | 'cyan.400'
  | 'cyan.500'
  | 'cyan.600'
  | 'cyan.700'
  | 'cyan.800'
  | 'cyan.900'
  | 'green'
  | 'green.50'
  | 'green.100'
  | 'green.200'
  | 'green.300'
  | 'green.400'
  | 'green.500'
  | 'green.600'
  | 'green.700'
  | 'green.800'
  | 'green.900'
  | 'turquoise'
  | 'turquoise.50'
  | 'turquoise.100'
  | 'turquoise.200'
  | 'turquoise.300'
  | 'turquoise.400'
  | 'turquoise.500'
  | 'turquoise.600'
  | 'turquoise.700'
  | 'turquoise.800'
  | 'turquoise.900'
  | 'yellow'
  | 'yellow.50'
  | 'yellow.100'
  | 'yellow.200'
  | 'yellow.300'
  | 'yellow.400'
  | 'yellow.500'
  | 'yellow.600'
  | 'yellow.700'
  | 'yellow.800'
  | 'yellow.900'
  | 'gold'
  | 'gold.50'
  | 'gold.100'
  | 'gold.200'
  | 'gold.300'
  | 'gold.400'
  | 'gold.500'
  | 'gold.600'
  | 'gold.700'
  | 'gold.800'
  | 'gold.900';

export type MainColorsType =
  | 'primary'
  | 'white'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'grey'
  | 'blue'
  | 'red'
  | 'violet'
  | 'pink'
  | 'orange'
  | 'geekBlue'
  | 'purple'
  | 'black'
  | 'cyan'
  | 'green'
  | 'turquoise'
  | 'yellow'
  | 'gold';

export const MainColorsArr = [
  'primary',
  'white',
  'success',
  'successBg',
  'info',
  'infoBg',
  'warning',
  'warningBg',
  'error',
  'errorBg',
  'grey',
  'blue',
  'red',
  'violet',
  'pink',
  'orange',
  'geekBlue',
  'purple',
  'blackShade',
  'black',
  'cyan',
  'green',
  'turquoise',
  'yellow',
  'gold',
];
