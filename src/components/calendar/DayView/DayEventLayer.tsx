/**
 * Renders positioned day-board event blocks (meetings, tasks, reminders, travel).
 * Layout math stays in the parent; this file only maps event type → markup.
 */

import { FC, Fragment } from 'react';
import {
  formatTimeRange,
  variableMinutesToHeight,
  variableMinutesToOffset,
} from '../../../core/time';
import type { CalendarDayEvent } from '../../../types/events-day';
import type { CalendarMeetingDetails } from '../../../types/meeting';
import { meetingDetailsFromDayEvent } from '../../../utils/meeting-mappers';
import { eventDisplayRange } from './day-view.helpers';

export interface DayEventLayerProps {
  events: CalendarDayEvent[];
  currentDate: Date;
  gridStartHour: number;
  hourHeights: number[];
  onMeetingClick?: (meeting: CalendarMeetingDetails) => void;
  onReminderToggle?: (id: string, completed: boolean) => void;
}

export const DayEventLayer: FC<DayEventLayerProps> = ({
  events,
  currentDate,
  gridStartHour,
  hourHeights,
  onMeetingClick,
  onReminderToggle,
}) => (
  <>
    {events.map((event) => {
      const range = eventDisplayRange(event);
      const top = variableMinutesToOffset(range.startMinutes, gridStartHour, hourHeights);
      const height = variableMinutesToHeight(
        range.startMinutes,
        range.endMinutes,
        gridStartHour,
        hourHeights,
      );

      if (event.type === 'in_person_meeting') {
        const travelStart =
          event.travelMinutes != null ? event.startMinutes - event.travelMinutes : null;
        return (
          <Fragment key={event.id}>
            {travelStart != null && event.travelMinutes ? (
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
            ) : null}
            <button
              type="button"
              className="calara-event calara-event--inperson"
              style={{ top, height }}
              onClick={() => onMeetingClick?.(meetingDetailsFromDayEvent(event, currentDate))}
            >
              <span className="calara-event__title">{event.title}</span>
              <span className="calara-event__meta">
                {formatTimeRange(event.startMinutes, event.endMinutes)}
                {event.location ? ` · ${event.location}` : ''}
              </span>
            </button>
          </Fragment>
        );
      }

      if (event.type === 'ice_call') {
        return (
          <button
            key={event.id}
            type="button"
            className="calara-event calara-event--ice"
            style={{ top, height }}
            onClick={() => onMeetingClick?.(meetingDetailsFromDayEvent(event, currentDate))}
          >
            <span className="calara-event__title">{event.title}</span>
            <span className="calara-event__meta">
              {formatTimeRange(event.startMinutes, event.endMinutes)}
            </span>
          </button>
        );
      }

      if (event.type === 'task') {
        return (
          <div key={event.id} className="calara-event calara-event--task" style={{ top, height }}>
            <span className="calara-event__title">{event.title}</span>
            <span className="calara-event__meta">
              {event.status === 'overdue' ? 'Overdue' : event.status === 'done' ? 'Done' : 'Task'}
              {event.priority ? ` · ${event.priority}` : ''}
            </span>
          </div>
        );
      }

      return (
        <div key={event.id} className="calara-event calara-event--reminder" style={{ top, height }}>
          <label>
            <input
              type="checkbox"
              checked={event.completed}
              onChange={(e) => onReminderToggle?.(event.id, e.target.checked)}
            />{' '}
            {event.title}
          </label>
        </div>
      );
    })}
  </>
);
