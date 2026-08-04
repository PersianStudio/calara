import { FC, FormEvent, useEffect, useState } from 'react';
import moment from 'moment';
import { DsDatePicker } from '../datePicker/DatePicker';
import type { CalendarMeetingDetails } from './meetingDetails/meetingDetailsTypes';

const TRAVEL_PRESETS = [5, 15, 30, 45, 60];

export interface MeetingDetailsFormValue {
  meetingTitle: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location?: string;
  travelMinutes?: number;
}

export interface DsMeetingDetailsDrawerProps {
  open: boolean;
  meeting?: CalendarMeetingDetails | null;
  onClose: () => void;
  onSave?: (values: MeetingDetailsFormValue) => void;
}

export const DsMeetingDetailsDrawer: FC<DsMeetingDetailsDrawerProps> = ({
  open,
  meeting,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [location, setLocation] = useState('');
  const [travelMinutes, setTravelMinutes] = useState<string>('');

  useEffect(() => {
    if (!open || !meeting) return;
    setTitle(meeting.title);
    setDate(meeting.date);
    setStartTime(meeting.startTime);
    setEndTime(meeting.endTime);
    setLocation(meeting.location ?? '');
    setTravelMinutes(
      meeting.travelMinutes != null ? String(meeting.travelMinutes) : '',
    );
  }, [open, meeting]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave?.({
      meetingTitle: title.trim(),
      date,
      startTime,
      endTime,
      location: location || undefined,
      travelMinutes: travelMinutes ? Number(travelMinutes) : undefined,
    });
  };

  const travelOptions = Array.from(
    new Set([...TRAVEL_PRESETS, ...(meeting?.travelMinutes ? [meeting.travelMinutes] : [])]),
  ).sort((a, b) => a - b);

  return (
    <div className="calara calara-drawer-root" hidden={!open}>
      <button type="button" className="calara-drawer__backdrop" aria-label="Close" onClick={onClose} />
      <div className="calara-drawer__panel" role="dialog" aria-modal="true" aria-label="Meeting details">
        <div className="calara-drawer__header">
          <button type="button" className="calara-btn" onClick={onClose}>
            Back
          </button>
          <h2 className="calara-drawer__title">
            {meeting?.kind === 'in_person_meeting' ? 'Meeting' : 'ICE Call'}
          </h2>
        </div>

        <form className="calara-drawer__body calara-form" onSubmit={handleSubmit}>
          <div className="calara-field">
            <label htmlFor="meeting-title">Title</label>
            <input
              id="meeting-title"
              className="calara-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <DsDatePicker
            selected={date}
            onChange={(d) => {
              if (d instanceof Date) setDate(d);
            }}
            inputLabel="Date"
            minDate={moment().startOf('day').toDate()}
          />

          <div className="calara-form__row">
            <DsDatePicker
              selected={startTime}
              onChange={(d) => {
                if (d instanceof Date) setStartTime(d);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              inputLabel="Start time"
            />
            <DsDatePicker
              selected={endTime}
              onChange={(d) => {
                if (d instanceof Date) setEndTime(d);
              }}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              inputLabel="End time"
            />
          </div>

          {meeting?.kind === 'in_person_meeting' ? (
            <>
              <div className="calara-field">
                <label htmlFor="meeting-location">Location</label>
                <input
                  id="meeting-location"
                  className="calara-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="calara-field">
                <label htmlFor="meeting-travel">Travel time</label>
                <select
                  id="meeting-travel"
                  className="calara-input"
                  value={travelMinutes}
                  onChange={(e) => setTravelMinutes(e.target.value)}
                >
                  <option value="">None</option>
                  {travelOptions.map((m) => (
                    <option key={m} value={m}>
                      {m} minutes
                    </option>
                  ))}
                </select>
              </div>
            </>
          ) : null}

          <div className="calara-drawer__footer" style={{ border: 0, padding: 0 }}>
            <button type="submit" className="calara-btn calara-btn--primary">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DsMeetingDetailsDrawer;
