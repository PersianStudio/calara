import { FC, ReactNode, useEffect, useState } from 'react';
import moment from 'moment';
import { DsDatePicker } from '../datePicker/DatePicker';
import DsCalendarBoard from './CalendarBoard';
import type { DsCalendarBoardProps } from './CalendarBoard';
import {
  DEFAULT_DS_CALENDAR_FILTERS,
  DS_CALENDAR_FILTER_OPTIONS,
  enabledDsCalendarFilters,
  parseDsCalendarBoardTab,
  type DsCalendarBoardTab,
  type DsCalendarFilterKey,
  type DsCalendarFilters,
} from './types';

export interface DsCalendarDrawerCalendarOption {
  id: string;
  label: string;
}

export interface DsCalendarDrawerProps extends Omit<DsCalendarBoardProps, 'view' | 'enabledFilters'> {
  open: boolean;
  onClose: () => void;
  title?: string;
  initialTab?: DsCalendarBoardTab;
  calendars?: DsCalendarDrawerCalendarOption[];
  selectedCalendarId?: string;
  onCalendarChange?: (id: string) => void;
  filters?: DsCalendarFilters;
  onFiltersChange?: (filters: DsCalendarFilters) => void;
  onOpenFullCalendar?: () => void;
  footer?: ReactNode;
}

export const DsCalendarDrawer: FC<DsCalendarDrawerProps> = ({
  open,
  onClose,
  title = 'Calendar',
  initialTab = 'day',
  calendars,
  selectedCalendarId,
  onCalendarChange,
  filters: filtersProp,
  onFiltersChange,
  onOpenFullCalendar,
  footer,
  currentDate,
  onDateChange,
  ...boardProps
}) => {
  const [tab, setTab] = useState<DsCalendarBoardTab>(parseDsCalendarBoardTab(initialTab));
  const [filters, setFilters] = useState<DsCalendarFilters>(filtersProp ?? DEFAULT_DS_CALENDAR_FILTERS);

  useEffect(() => {
    if (filtersProp) setFilters(filtersProp);
  }, [filtersProp]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const setFilter = (id: DsCalendarFilterKey, checked: boolean) => {
    const next = { ...filters, [id]: checked };
    setFilters(next);
    onFiltersChange?.(next);
  };

  return (
    <div className="calara calara-drawer-root" hidden={!open}>
      <button type="button" className="calara-drawer__backdrop" aria-label="Close" onClick={onClose} />
      <div className="calara-drawer__panel" role="dialog" aria-modal="true" aria-label={title}>
        <div className="calara-drawer__header">
          <h2 className="calara-drawer__title">{title}</h2>
          <div className="calara-toolbar__spacer" />
          {onOpenFullCalendar ? (
            <button type="button" className="calara-btn" onClick={onOpenFullCalendar}>
              Open full calendar
            </button>
          ) : null}
          <button type="button" className="calara-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="calara-drawer__body">
          <div className="calara-toolbar__group">
            {(['day', 'week', 'month'] as const).map((v) => (
              <button
                key={v}
                type="button"
                className={['calara-btn', tab === v ? 'calara-btn--active' : ''].filter(Boolean).join(' ')}
                onClick={() => setTab(v)}
              >
                {v === 'day' ? 'Day' : v === 'week' ? 'Week' : 'Month'}
              </button>
            ))}
          </div>

          <DsDatePicker
            selected={currentDate}
            onChange={(d) => {
            if (d instanceof Date) onDateChange?.(d);
          }}
            inputLabel="Date"
          />

          {calendars?.length ? (
            <div className="calara-field">
              <label htmlFor="calara-drawer-calendar">Calendar</label>
              <select
                id="calara-drawer-calendar"
                className="calara-input"
                value={selectedCalendarId ?? calendars[0]?.id}
                onChange={(e) => onCalendarChange?.(e.target.value)}
              >
                {calendars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          <div className="calara-filter-list">
            {DS_CALENDAR_FILTER_OPTIONS.map((opt) => (
              <label key={opt.value}>
                <input
                  type="checkbox"
                  checked={filters[opt.value]}
                  onChange={(e) => setFilter(opt.value, e.target.checked)}
                />
                {opt.label}
              </label>
            ))}
          </div>

          <div style={{ flex: 1, minHeight: 320 }}>
            <DsCalendarBoard
              {...boardProps}
              view={tab}
              currentDate={currentDate}
              onDateChange={onDateChange}
              enabledFilters={enabledDsCalendarFilters(filters)}
              showWeekdayHeader={tab !== 'day'}
            />
          </div>
          <div className="calara-event__meta">{moment(currentDate).format('dddd, MMMM D, YYYY')}</div>
        </div>

        {footer ? <div className="calara-drawer__footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default DsCalendarDrawer;
