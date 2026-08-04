import { DsTypography } from '../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, SxProps, Theme } from '@mui/material';
import { FC, MouseEvent, ReactNode } from 'react';

export interface DsCalendarEmptySlotProps {
  /** When false, renders a plain slot (no hover CTA). */
  enabled?: boolean;
  onAddMeeting?: () => void;
  children?: ReactNode;
  sx?: SxProps<Theme>;
  /** Stretch to fill parent (day/week hour cells). */
  fill?: boolean;
}

/**
 * Empty calendar slot hover (Figma `25602:522994`).
 * Pale gray hover fill + centered "Add new meeting" chip → opens schedule drawer.
 */
const DsCalendarEmptySlot: FC<DsCalendarEmptySlotProps> = ({ enabled = true, onAddMeeting, children, sx, fill = true }) => {
  const { t } = useTranslation();
  const showCta = Boolean(enabled && onAddMeeting);

  const handleAdd = (event: MouseEvent) => {
    event.stopPropagation();
    onAddMeeting?.();
  };

  return (
    <Box
      sx={[
        (theme) => ({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: children ? 'flex-start' : 'center',
          ...(fill ? { width: 1, height: 1, minHeight: 0, boxSizing: 'border-box' } : {}),
          ...(showCta
            ? {
                '&:hover': {
                  bgcolor: theme.palette.iceGray['opacity-8'],
                },
                '&:hover .calendar-add-meeting-cta': {
                  opacity: 1,
                },
              }
            : {}),
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}

      {showCta ? (
        <Box
          className="calendar-add-meeting-cta"
          component="button"
          type="button"
          onClick={handleAdd}
          sx={(theme) => ({
            opacity: 0,
            position: children ? 'absolute' : 'relative',
            ...(children
              ? {
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }
              : {
                  alignSelf: 'center',
                }),
            zIndex: 1,
            border: 'none',
            cursor: 'pointer',
            px: 3,
            py: 1,
            borderRadius: '4px',
            bgcolor: theme.palette.iceGray['opacity-16'],
            whiteSpace: 'nowrap',
            transition: theme.transitions.create('opacity', { duration: 120 }),
            '&:hover': {
              bgcolor: theme.palette.iceGray['opacity-24'],
            },
          })}
        >
          <DsTypography variant="subtitle2" color="iceGray.700" component="span">
            {t('ADD_NEW_MEETING')}
          </DsTypography>
        </Box>
      ) : null}
    </Box>
  );
};

export default DsCalendarEmptySlot;
