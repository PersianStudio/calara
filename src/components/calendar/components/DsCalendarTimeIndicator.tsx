import { DsTypography } from '../../typography/DsTypography';
import { Box } from '@mui/material';
import { FC, PointerEventHandler } from 'react';
import { formatScrubberLabel } from '../utils/calendarTime';

/** Round cap on the Figma rule (`25602:479740` renders at ±5.33px around a 0-height line). */
const DOT_SIZE = 10;
/** Figma rule thickness. */
const LINE_THICKNESS = 2;

export interface DsCalendarTimeIndicatorProps {
  /** Minutes from midnight — single source of truth for both the label and `top`. */
  minutes: number;
  /** Pixel Y of the scrubbed time inside the timed grid. */
  top: number;
  /** Hours-column width, so the dot lands on that column's right border. */
  timeColWidth: number;
  onHeadPointerDown?: PointerEventHandler<HTMLElement>;
  headAriaLabel?: string;
}

/**
 * Red time scrubber (Figma week board `25602:479731` + rule `25602:479740`).
 *
 * Pill, connector dot, and rule are one flex row centred on `top`, so they can never
 * drift apart vertically. The row spans the full grid width — the pill is laid out, not
 * absolutely centred inside the narrow hours column, so its left cap is never clipped.
 */
const DsCalendarTimeIndicator: FC<DsCalendarTimeIndicatorProps> = ({
  minutes,
  top,
  timeColWidth,
  onHeadPointerDown,
  headAriaLabel,
}) => {
  const label = formatScrubberLabel(minutes);

  return (
    <Box
      sx={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      <Box
        role={onHeadPointerDown ? 'slider' : undefined}
        aria-label={headAriaLabel}
        aria-valuenow={minutes}
        aria-valuetext={label}
        onPointerDown={onHeadPointerDown}
        sx={{
          flexShrink: 0,
          minWidth: timeColWidth,
          pl: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          pointerEvents: onHeadPointerDown ? 'auto' : 'none',
          cursor: onHeadPointerDown ? 'ns-resize' : 'default',
          touchAction: 'none',
          userSelect: 'none',
        }}
      >
        <Box
          sx={(theme) => ({
            px: 2,
            py: '2px',
            borderRadius: '50px',
            bgcolor: theme.palette.error.main,
            whiteSpace: 'nowrap',
          })}
        >
          <DsTypography variant="body2" color="iceGray.50" component="span">
            {label}
          </DsTypography>
        </Box>

        <Box
          sx={(theme) => ({
            flexShrink: 0,
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: '50%',
            bgcolor: theme.palette.error.main,
            // Straddle the hours-column border so the rule reads as the dot's tail.
            mr: `${-DOT_SIZE / 2}px`,
          })}
        />
      </Box>

      <Box
        sx={(theme) => ({
          flex: 1,
          height: LINE_THICKNESS,
          bgcolor: theme.palette.error.main,
        })}
      />
    </Box>
  );
};

export default DsCalendarTimeIndicator;
