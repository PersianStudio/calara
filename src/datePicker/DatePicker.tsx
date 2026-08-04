import { ChangeEvent, ReactElement, forwardRef, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export type DsDatePickerVariant = 'field' | 'inlineText';

export interface DsDatePickerProps {
  selected?: Date | null;
  value?: string | number | Date | null;
  onChange?: (date: Date | null | [Date | null, Date | null]) => void;
  variant?: DsDatePickerVariant;
  inputLabel?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  triggerAriaLabel?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  timeIntervals?: number;
  minDate?: Date;
  selectsRange?: boolean;
  customInput?: ReactElement;
  placeholderText?: string;
  id?: string;
  className?: string;
}

const FieldInput = forwardRef<
  HTMLInputElement,
  {
    value?: string;
    onClick?: () => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear?: () => void;
    inputLabel?: string;
    helperText?: string;
    error?: boolean;
  }
>(({ value, onClick, onChange, onClear, inputLabel, helperText, error, ...rest }, ref) => (
  <div className="calara-field">
    {inputLabel ? <label>{inputLabel}</label> : null}
    <div className="calara-datepicker__field">
      <input
        ref={ref}
        className="calara-input"
        value={value ?? ''}
        onClick={onClick}
        onChange={onChange}
        readOnly
        aria-invalid={error || undefined}
        {...rest}
      />
      {onClear ? (
        <button type="button" className="calara-btn" onClick={onClear} aria-label="Clear date">
          Clear
        </button>
      ) : null}
    </div>
    {helperText ? <span className="calara-event__meta">{helperText}</span> : null}
  </div>
));

FieldInput.displayName = 'DsDatePickerFieldInput';

const InlineTextInput = forwardRef<
  HTMLButtonElement,
  { value?: string; onClick?: () => void; triggerAriaLabel?: string }
>(({ value, onClick, triggerAriaLabel }, ref) => (
  <button
    ref={ref}
    type="button"
    className="calara-btn calara-btn--text"
    onClick={onClick}
    aria-label={triggerAriaLabel || 'Choose date'}
  >
    {value || 'Select date'} ▾
  </button>
));

InlineTextInput.displayName = 'DsDatePickerInlineTextInput';

export const DsDatePicker = (props: DsDatePickerProps) => {
  const {
    customInput,
    variant = 'field',
    inputLabel,
    error,
    helperText,
    triggerAriaLabel,
    dateFormat = 'dd MMM yyyy',
    value,
    selected,
    showTimeSelectOnly,
    selectsRange,
    onChange,
    ...rest
  } = props;

  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = range;

  const resolvedSelected =
    selected ?? (value != null ? new Date(value as string | number | Date) : null);

  const resolvedCustomInput =
    customInput ??
    (variant === 'inlineText' ? (
      <InlineTextInput triggerAriaLabel={triggerAriaLabel} />
    ) : (
      <FieldInput
        inputLabel={inputLabel}
        error={error}
        helperText={helperText}
        onClear={
          showTimeSelectOnly
            ? undefined
            : () => {
                setRange([null, null]);
                onChange?.(null);
              }
        }
      />
    ));

  // react-datepicker's public types are a large discriminant union; keep our wrapper API simple.
  const Picker = ReactDatePicker as unknown as React.ComponentType<Record<string, unknown>>;

  return (
    <div className="calara-datepicker">
      <Picker
        customInput={resolvedCustomInput}
        selected={resolvedSelected}
        dateFormat={dateFormat}
        popperPlacement="bottom-start"
        showTimeSelectOnly={showTimeSelectOnly}
        onChange={
          selectsRange
            ? (dates: [Date | null, Date | null]) => {
                setRange(dates);
                onChange?.(dates);
              }
            : (date: Date | null) => onChange?.(date)
        }
        {...(selectsRange ? { selectsRange: true, startDate, endDate } : {})}
        {...rest}
      />
    </div>
  );
};
