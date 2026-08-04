/**
 * Inline text trigger — compact button used in the calendar toolbar.
 */

import { forwardRef } from 'react';

export interface InlineTriggerProps {
  value?: string;
  onClick?: () => void;
  triggerAriaLabel?: string;
}

export const InlineTrigger = forwardRef<HTMLButtonElement, InlineTriggerProps>(
  ({ value, onClick, triggerAriaLabel }, ref) => (
    <button
      ref={ref}
      type="button"
      className="calara-btn calara-btn--text"
      onClick={onClick}
      aria-label={triggerAriaLabel || 'Choose date'}
    >
      {value || 'Select date'} ▾
    </button>
  ),
);

InlineTrigger.displayName = 'DsDatePickerInlineTrigger';
