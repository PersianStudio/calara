// MUI Imports
import type { Theme } from '@mui/material/styles';

const MuiTooltip: Theme['components'] = {
  MuiTooltip: {
    styleOverrides: {
      popper: {
        '&[data-popper-placement*="bottom"] .MuiTooltip-tooltip': {
          marginTop: '6px !important',
          '& .MuiTooltip-arrow::before': {
            borderTopLeftRadius: 2,
          },
        },
        '&[data-popper-placement*="top"] .MuiTooltip-tooltip': {
          marginBottom: '6px !important',
          '& .MuiTooltip-arrow::before': {
            borderBottomRightRadius: 2,
          },
        },
        '&[data-popper-placement*="left"] .MuiTooltip-tooltip': {
          marginRight: '6px !important',
          '& .MuiTooltip-arrow::before': {
            borderTopRightRadius: 2,
          },
        },
        '&[data-popper-placement*="right"] .MuiTooltip-tooltip': {
          marginLeft: '6px !important',
          '& .MuiTooltip-arrow::before': {
            borderBottomLeftRadius: 2,
          },
        },
      },
      tooltip: ({ theme }) => ({
        borderRadius: 'var(--mui-shape-customBorderRadius-md)',
        color: 'var(--mui-palette-customColors-tooltipText)',
        paddingInline: theme.spacing(3),
        backgroundColor: theme.palette.iceGray[700],
      }),
      arrow: ({ theme }) => ({
        '&::before': {
          backgroundColor: theme.palette.iceGray[700],
        },
      }),
    },
  },
};

export default MuiTooltip;
