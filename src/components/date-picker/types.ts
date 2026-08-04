/**
 * Public props for the zero-dependency date / time picker.
 */

import type { ReactElement } from 'react';

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
  /** Pattern for {@link formatDate}, e.g. `dd MMM yyyy` or `h:mm aa`. */
  dateFormat?: string;
  showTimeSelect?: boolean;
  showTimeSelectOnly?: boolean;
  /** Minutes between time options (default 15). */
  timeIntervals?: number;
  minDate?: Date;
  selectsRange?: boolean;
  customInput?: ReactElement;
  placeholderText?: string;
  id?: string;
  className?: string;
}
