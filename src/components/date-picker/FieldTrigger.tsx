/**
 * Field-style trigger: labeled readonly input + optional clear button.
 */

import { ChangeEvent, forwardRef } from 'react';

export interface FieldTriggerProps {
  value?: string;
  onClick?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  inputLabel?: string;
  helperText?: string;
  error?: boolean;
  id?: string;
  placeholder?: string;
}

export const FieldTrigger = forwardRef<HTMLInputElement, FieldTriggerProps>(
  ({ value, onClick, onChange, onClear, inputLabel, helperText, error, id, placeholder, ...rest }, ref) => (
    <div className="calara-field">
      {inputLabel ? <label htmlFor={id}>{inputLabel}</label> : null}
      <div className="calara-datepicker__field">
        <input
          ref={ref}
          id={id}
          className="calara-input"
          value={value ?? ''}
          onClick={onClick}
          onChange={onChange}
          readOnly
          placeholder={placeholder}
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
  ),
);

FieldTrigger.displayName = 'DsDatePickerFieldTrigger';
