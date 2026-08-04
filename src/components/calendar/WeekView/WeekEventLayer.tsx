/**
 * Renders week-column meeting blocks (ICE call / in-person + optional travel).
 */

import { FC, Fragment } from 'react';
import {
  formatTimeRange,
  variableMinutesToHeight,
  variableMinutesToOffset,
} from '../../../core/time';
import type { CalendarMeetingDetails } from '../../../types/meeting';
import type { CalendarWeekEvent } from '../../../types/events-week';
import { meetingDetailsFromWeekEvent } from '../../../utils/meeting-mappers';

export interface WeekEventLayerProps {
  events: CalendarWeekEvent[];
  weekStart: Date;
  gridStartHour: number;
  hourHeights: number[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
}

export const WeekEventLayer: FC<WeekEventLayerProps> = ({
  events,
  weekStart,
  gridStartHour,
  hourHeights,
  onMeetingClick,
}) => (
  <>
    {events.map((event) => {
      const top = variableMinutesToOffset(event.startMinutes, gridStartHour, hourHeights);
      const height = variableMinutesToHeight(
        event.startMinutes,
        event.endMinutes,
        gridStartHour,
        hourHeights,
      );

      if (event.type === 'in_person_meeting' && event.travelMinutes) {
        const travelStart = event.startMinutes - event.travelMinutes;
        return (
          <Fragment key={event.id}>
            <div
              className="calara-travel"
              style={{
                top: variableMinutesToOffset(travelStart, gridStartHour, hourHeights),
                height: variableMinutesToHeight(
                  travelStart,
                  event.startMinutes,
                  gridStartHour,
                  hourHeights,
                ),
              }}
            >
              {event.travelMinutes} minutes travel time
            </div>
            <button
              type="button"
              className="calara-event calara-event--inperson"
              style={{ top, height }}
              onClick={() => onMeetingClick?.(meetingDetailsFromWeekEvent(event, weekStart))}
            >
              <span className="calara-event__title">{event.title}</span>
              <span className="calara-event__meta">
                {formatTimeRange(event.startMinutes, event.endMinutes)}
              </span>
            </button>
          </Fragment>
        );
      }

      return (
        <button
          key={event.id}
          type="button"
          className={[
            'calara-event',
            event.type === 'ice_call' ? 'calara-event--ice' : 'calara-event--inperson',
          ].join(' ')}
          style={{ top, height }}
          onClick={() => onMeetingClick?.(meetingDetailsFromWeekEvent(event, weekStart))}
        >
          <span className="calara-event__title">{event.title}</span>
          <span className="calara-event__meta">
            {formatTimeRange(event.startMinutes, event.endMinutes)}
          </span>
        </button>
      );
    })}
  </>
);
