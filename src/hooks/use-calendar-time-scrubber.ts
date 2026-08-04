/**
 * Interactive red time scrubber for the day / week timed grids.
 *
 * - Click the hours column to place the line at that Y.
 * - Drag the head to move it.
 *
 * Minutes are the only stored value; `top` and the pill label are both derived from them.
 */

import {
  PointerEvent as ReactPointerEvent,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  clampMinutesToGrid,
  hourOfMinutes,
  minutesToOffset,
  offsetToMinutes,
  variableMinutesToOffset,
  variableOffsetToMinutes,
} from '../core/time';
import { measuredMinutesToY, measuredYToMinutes } from './scrubber-measure';

export interface UseCalendarTimeScrubberOptions {
  /** Inclusive first hour shown in the grid. */
  startHour: number;
  /** Inclusive last hour shown in the grid. */
  endHour: number;
  /**
   * The timed grid element. Its top edge is the coordinate origin for Y↔minutes, and in
   * `measureRows` mode its direct children are the hour rows.
   */
  gridRef: RefObject<HTMLElement | null>;
  /** Fixed px-per-hour scale. Ignored when `measureRows` or `hourHeights` is set. */
  hourHeight?: number;
  /**
   * Per-hour heights for adaptive grids (same array used to place events).
   * Takes precedence over fixed `hourHeight`; ignored when `measureRows` is set.
   */
  hourHeights?: number[];
  /** Measure stacked hour-row heights instead of a fixed scale (day rows grow with events). */
  measureRows?: boolean;
  /** Seed at "now" when the viewed period includes today and now falls inside the grid. */
  initialMinutes?: number | null;
}

export interface CalendarTimeScrubber {
  /** Selected minutes from midnight, or `null` until the user places the scrubber. */
  minutes: number | null;
  /** Pixel Y of the scrubber inside the timed grid, or `null` when not yet measured. */
  top: number | null;
  /** True while the head is being dragged. */
  isDragging: boolean;
  /** Hour whose static label the pill replaces. */
  hiddenHour: number | null;
  /** Pointer-down on the scrubber head — starts a drag. */
  onHeadPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
  /** Pointer-down on the hours column — places the scrubber at that Y. */
  onColumnPointerDown: (event: ReactPointerEvent<HTMLElement>) => void;
}

/** Hook: place / drag a scrubber line on a timed grid. */
export const useCalendarTimeScrubber = ({
  startHour,
  endHour,
  gridRef,
  hourHeight,
  hourHeights,
  measureRows = false,
  initialMinutes = null,
}: UseCalendarTimeScrubberOptions): CalendarTimeScrubber => {
  const [minutes, setMinutes] = useState<number | null>(initialMinutes);
  const [top, setTop] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setMinutes(initialMinutes);
  }, [initialMinutes]);

  const computeTop = useCallback(
    (value: number): number | null => {
      const gridEl = gridRef.current;
      if (measureRows) {
        if (!gridEl) return null;
        return measuredMinutesToY(value, gridEl, startHour);
      }
      if (hourHeights?.length) {
        return variableMinutesToOffset(value, startHour, hourHeights);
      }
      if (hourHeight == null) return null;
      return minutesToOffset(value, startHour, hourHeight);
    },
    [gridRef, hourHeight, hourHeights, measureRows, startHour],
  );

  const clientYToMinutes = useCallback(
    (clientY: number): number | null => {
      const gridEl = gridRef.current;
      if (!gridEl) return null;
      const y = clientY - gridEl.getBoundingClientRect().top;

      if (measureRows) return measuredYToMinutes(y, gridEl, startHour, endHour);
      if (hourHeights?.length) {
        return variableOffsetToMinutes(y, startHour, endHour, hourHeights);
      }
      if (hourHeight == null) return null;
      return clampMinutesToGrid(offsetToMinutes(y, startHour, hourHeight), startHour, endHour);
    },
    [endHour, gridRef, hourHeight, hourHeights, measureRows, startHour],
  );

  // Keep the pixel Y in sync with minutes, and with row heights that change as events render.
  useLayoutEffect(() => {
    if (minutes == null) {
      setTop(null);
      return;
    }
    setTop(computeTop(minutes));

    const gridEl = gridRef.current;
    if (!measureRows || !gridEl || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => setTop(computeTop(minutes)));
    observer.observe(gridEl);
    return () => observer.disconnect();
  }, [computeTop, gridRef, measureRows, minutes]);

  const placeAtClientY = useCallback(
    (clientY: number) => {
      const next = clientYToMinutes(clientY);
      if (next == null) return;
      setMinutes(next);
      setTop(computeTop(next));
    },
    [clientYToMinutes, computeTop],
  );

  const onColumnPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      placeAtClientY(event.clientY);
    },
    [placeAtClientY],
  );

  const onHeadPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsDragging(true);
      event.currentTarget.setPointerCapture?.(event.pointerId);

      const onMove = (moveEvent: PointerEvent) => placeAtClientY(moveEvent.clientY);
      const onUp = () => {
        setIsDragging(false);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
      };

      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    },
    [placeAtClientY],
  );

  return {
    minutes,
    top,
    isDragging,
    hiddenHour: minutes != null ? hourOfMinutes(minutes) : null,
    onHeadPointerDown,
    onColumnPointerDown,
  };
};
