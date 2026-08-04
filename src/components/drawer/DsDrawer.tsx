import {
  Breakpoint,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogTitle,
  Drawer,
  DrawerProps,
  Stack,
} from '@mui/material';
import React, { FC } from 'react';
import { DsButton } from '../buttons/DsButton';
import { DsIcon } from '../icons/DsIcon';
import { DsTypography } from '../typography/DsTypography';

// Define size mappings with responsive adjustments
const SIZE_MAP = {
  xs: { xs: '100%', sm: '300px' },
  sm: { xs: '100%', sm: '385px' },
  xd: { xs: '100%', sm: '500px' },
  md: { xs: '100%', sm: '600px' },
  lg: { xs: '100%', sm: '800px' },
  xl: { xs: '100%', sm: '1000px' },
  xxl: { xs: '100%', sm: '1200px' },
  xxxl: { xs: '100%', sm: '1400px' },
};

interface DsDrawerProps extends Omit<DrawerProps, 'content' | 'onClose'> {
  onClose?: VoidFunction;
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  size?: Breakpoint | 'xd';
  fullHeight?: boolean;
  hideBackdrop?: boolean;
  disableCloseOnOutsideClick?: boolean;
  flexDisplay?: boolean;
  headerBorder?: boolean;
  footerBorder?: boolean;
  dialogContentProps?: DialogContentProps;
}

export const DsDrawer: FC<DsDrawerProps> = ({
  header,
  footer,
  content,
  onClose,
  size = 'md',
  sx,
  fullHeight = false,
  ModalProps,
  hideBackdrop = true, // hide light background opacity
  disableCloseOnOutsideClick = true, // to close the drawer on outside click
  flexDisplay = true,
  headerBorder = true,
  footerBorder,
  dialogContentProps,
  ...props
}) => {
  const styles = {
    width: SIZE_MAP[size],
    maxWidth: SIZE_MAP['xxxl'].sm, // Maximum width for the largest size
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: SIZE_MAP[size],
      top: 'unset !important',
      bottom: '0 !important',
      height: fullHeight ? '100vh' : 'calc(100vh - 94px) !important',
      boxSizing: 'border-box',
      ...(!flexDisplay && {
        display: '-webkit-box; !important',
      }),
    },
    ...sx,
  };

  return (
    <Drawer
      variant="temporary"
      anchor="right"
      onClose={onClose}
      ModalProps={{ ...ModalProps, BackdropProps: { invisible: hideBackdrop } }}
      hideBackdrop={disableCloseOnOutsideClick}
      sx={styles}
      {...props}
    >
      {props.children || (
        <>
          {header && (
            <DialogTitle
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 5,
                py: 4.5,
                height: 68,
                ...(headerBorder && {
                  borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                }),
              }}
            >
              {header && typeof header === 'string' ? (
                <Stack direction="row" alignItems="center">
                  <DsTypography variant="h5" fontWeight={600} color="iceGray.700">
                    {header}
                  </DsTypography>
                </Stack>
              ) : (
                header
              )}
              {onClose && (
                <DsButton aria-label="close" size="xSmall" onClick={onClose} justIcon circle>
                  <DsIcon size="lg" icon="CLOSE" color="iceGray.700" />
                </DsButton>
              )}
            </DialogTitle>
          )}

          {content && (
            <DialogContent dividers {...dialogContentProps} sx={{ p: 5, ...dialogContentProps?.sx }}>
              {content}
            </DialogContent>
          )}

          {footer && (
            <DialogActions
              sx={{
                p: 5,
                pt: '20px !important',
                ...(footerBorder && {
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                }),
              }}
            >
              {footer}
            </DialogActions>
          )}
        </>
      )}
    </Drawer>
  );
};
