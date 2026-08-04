/**
 * Zero-dependency date / time picker.
 *
 * Modes:
 * - `variant: 'field'` — labeled input trigger (default)
 * - `variant: 'inlineText'` — compact text button
 * - `showTimeSelectOnly` — time list only (sets hours/minutes on selected date)
 * - date mode — month grid popover (optionally with time list when `showTimeSelect`)
 */

import { FC, useEffect, useId, useMemo, useRef, useState } from 'react';
import { cloneDate, formatDate, getHours, getMinutes, setHoursMinutes, startOfDay } from '../../core/date';
import { CalendarPanel } from './CalendarPanel';
import { FieldTrigger } from './FieldTrigger';
import { InlineTrigger } from './InlineTrigger';
import { TimePanel } from './TimePanel';
import type { DsDatePickerProps } from './types';

export type { DsDatePickerVariant, DsDatePickerProps } from './types';

/** Resolve `selected` / `value` into a single Date | null. */
const resolveSelected = (
  selected: Date | null | undefined,
  value: string | number | Date | null | undefined,
): Date | null => {
  if (selected !== undefined) return selected;
  if (value == null) return null;
  const d = new Date(value as string | number | Date);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const DsDatePicker: FC<DsDatePickerProps> = (props) => {
  const {
    variant = 'field',
    inputLabel,
    error,
    helperText,
    triggerAriaLabel,
    dateFormat = 'dd MMM yyyy',
    value,
    selected,
    showTimeSelect,
    showTimeSelectOnly,
    timeIntervals = 15,
    minDate,
    onChange,
    placeholderText,
    id,
    className,
    customInput,
  } = props;

  const resolved = resolveSelected(selected, value);
  const [open, setOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => resolved ?? new Date());
  const rootRef = useRef<HTMLDivElement | null>(null);
  const autoId = useId();
  const inputId = id ?? autoId;

  // Keep the browsed month in sync when the controlled value jumps.
  useEffect(() => {
    if (resolved) setViewMonth(resolved);
  }, [resolved?.getTime()]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const displayValue = useMemo(() => {
    if (!resolved) return '';
    return formatDate(resolved, dateFormat);
  }, [resolved, dateFormat]);

  const emit = (next: Date | null) => {
    onChange?.(next);
  };

  const onSelectDay = (day: Date) => {
    // Preserve existing clock time when picking a new calendar day.
    const withTime =
      resolved != null
        ? setHoursMinutes(day, getHours(resolved), getMinutes(resolved))
        : startOfDay(day);

    if (showTimeSelect && !showTimeSelectOnly) {
      emit(withTime);
      // Keep popover open so the user can also pick a time.
      setViewMonth(withTime);
      return;
    }

    emit(withTime);
    setOpen(false);
  };

  const onSelectTime = (next: Date) => {
    emit(cloneDate(next));
    setOpen(false);
  };

  const toggle = () => setOpen((v) => !v);

  const trigger =
    customInput ??
    (variant === 'inlineText' ? (
      <InlineTrigger value={displayValue} onClick={toggle} triggerAriaLabel={triggerAriaLabel} />
    ) : (
      <FieldTrigger
        id={inputId}
        value={displayValue}
        onClick={toggle}
        inputLabel={inputLabel}
        error={error}
        helperText={helperText}
        placeholder={placeholderText}
        onClear={
          showTimeSelectOnly
            ? undefined
            : () => {
                emit(null);
                setOpen(false);
              }
        }
      />
    ));

  return (
    <div
      className={['calara-datepicker', className].filter(Boolean).join(' ')}
      ref={rootRef}
    >
      {trigger}
      {open ? (
        <div className="calara-datepicker__popover" role="dialog" aria-label="Choose date">
          {showTimeSelectOnly ? (
            <TimePanel
              selected={resolved}
              onSelectTime={onSelectTime}
              timeIntervals={timeIntervals}
              dateFormat={dateFormat}
            />
          ) : (
            <>
              <CalendarPanel
                selected={resolved}
                viewMonth={viewMonth}
                onViewMonthChange={setViewMonth}
                onSelectDay={onSelectDay}
                minDate={minDate}
              />
              {showTimeSelect ? (
                <TimePanel
                  selected={resolved}
                  onSelectTime={onSelectTime}
                  timeIntervals={timeIntervals}
                  dateFormat="h:mm aa"
                />
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
