/**
 * Red scrubber pill rendered over a timed grid column.
 */

import { FC, PointerEvent as ReactPointerEvent } from 'react';
import { formatScrubberLabel } from '../../../core/time';

export interface DsCalendarTimeIndicatorProps {
  top: number | null;
  minutes: number | null;
  isDragging?: boolean;
  onHeadPointerDown?: (event: ReactPointerEvent<HTMLElement>) => void;
}

export const DsCalendarTimeIndicator: FC<DsCalendarTimeIndicatorProps> = ({
  top,
  minutes,
  onHeadPointerDown,
}) => {
  if (top == null || minutes == null) return null;

  return (
    <div className="calara-scrubber" style={{ top }}>
      <div
        className="calara-scrubber__head"
        onPointerDown={onHeadPointerDown}
        role="slider"
        aria-valuenow={minutes}
        aria-label="Time scrubber"
      >
        {formatScrubberLabel(minutes)}
      </div>
    </div>
  );
};

export default DsCalendarTimeIndicator;
