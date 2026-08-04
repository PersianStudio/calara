import type { Theme } from '@mui/material/styles';

const MuiTabs: Theme['components'] = {
  MuiTabs: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        '&.centered .MuiTabs-flexContainer': {
          justifyContent: 'center',
        },
        ...(ownerState.orientation === 'horizontal'
          ? {
              borderBlockEnd: '1px solid var(--mui-palette-divider)',
            }
          : {
              borderInlineEnd: '1px solid var(--mui-palette-divider)',
            }),
        // "& .MuiTab-root": {
        '&.flat': {
          // height: 45,
          minBlockSize: 45,
        },
        // },
        '&.filled': {
          borderBlockEnd: 'none !important',
        },
        '&.tonal': {
          borderBlockEnd: 'none !important',
        },
        '& .MuiTab-root:not(.Mui-selected):hover': {
          ...(ownerState.textColor === 'secondary'
            ? {
                color: 'var(--mui-palette-secondary-main)',
              }
            : {
                color: 'var(--mui-palette-primary-main)',
              }),
          '& .MuiTabScrollButton-root': {
            borderRadius: 'var(--mui-shape-borderRadius)',
          },
        },
        '& ~ .MuiTabPanel-root': {
          ...(ownerState.orientation === 'horizontal'
            ? {
                paddingBlockStart: theme.spacing(5),
              }
            : {
                paddingInlineStart: theme.spacing(5),
              }),
        },
      }),
      scrollButtons: {
        '&.Mui-disabled': {
          width: 0,
          padding: 0,
        },
      },
      indicator: {
        '&.filled': {
          display: 'none !important',
        },
        '&.tonal': {
          display: 'none !important',
        },
      },
      vertical: {
        minWidth: 131,
        '& .MuiTab-root': {
          minWidth: 130,
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        lineHeight: 1.4667,
        padding: theme.spacing(2, 5.5),
        minBlockSize: 44,
        color: theme.palette.text.primary,
        '& > .MuiTab-iconWrapper': {
          fontSize: '1.125rem',
          ...(ownerState.iconPosition === 'start' && {
            marginInlineEnd: theme.spacing(1.5),
          }),
          ...(ownerState.iconPosition === 'end' && {
            marginInlineStart: theme.spacing(1.5),
          }),
        },
        '&.filled': {
          border: '1px solid var(--mui-palette-divider)',
          '&:first-of-type': {
            borderRadius: '8px 0px 0px 8px',
            '&.singleItem': {
              borderRadius: '8px',
            },
          },
          '&:last-child': {
            borderRadius: '0px 8px 8px 0px',
            '&.singleItem': {
              borderRadius: '8px',
            },
          },
          '&:not(:last-child)': {
            borderRight: 'none',
          },
          '&.Mui-selected': {
            color: 'var(--mui-palette-primary-contrastText)',
            backgroundColor: 'var(--mui-palette-primary-main)',
          },
          '&.tonal': {
            '&.Mui-selected': {
              color: 'var(--mui-palette-primary-contrastText)',
              backgroundColor: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
            },
          },
        },
        '&.tonal': {
          border: '1px solid rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
          color: 'var(--mui-palette-primary-main)',
          backgroundColor: 'var(--mui-palette-primary-contrastText)',
          borderRight: '0',
          '&:first-of-type': {
            borderRadius: '8px 0px 0px 8px',
            '&.singleItem': {
              borderRadius: '8px',
            },
          },
          '&:last-child': {
            borderRadius: '0px 8px 8px 0px',
            borderRight: '1px solid rgb(var(--mui-palette-secondary-mainChannel) / 0.16)',
            '&.singleItem': {
              borderRadius: '8px',
            },
          },
          '&.Mui-selected': {
            backgroundColor: 'rgb(var(--mui-palette-primary-mainChannel) / 0.08)',
            fontWeight: 600,
          },
        },
        // "&.Mui-selected.flat": {
        //   color: "var(--mui-palette-text-primary)",
        // },
      }),
    },
  },
  MuiTabPanel: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
};

export default MuiTabs;
