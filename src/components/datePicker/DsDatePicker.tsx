// React Imports
import { type ComponentProps, forwardRef, useState } from 'react';

// MUI imports
import type { BoxProps } from '@mui/material/Box';
import { DsTextField } from '../textField/DsTextField';

// Third-party Imports
import { default as ReactDatePickerComponent } from 'react-datepicker';
import { AppReactDatepicker } from '../../materio/libs/styles/AppReactDatepicker';
import { DsButton } from '../buttons/DsButton';
import { DsIcon } from '../icons/DsIcon';
import { DsTypography } from '../typography/DsTypography';

export type DsDatePickerVariant = 'field' | 'inlineText';

type FieldInputProps = {
  inputSize?: 'small' | 'medium' | 'large';
  inputLabel?: string;
  error?: boolean;
  formHelperText?: string;
  helperText?: string;
  required?: boolean;
  showTimeSelectOnly?: boolean;
  onClear: () => void;
};

const FieldInput = forwardRef<HTMLInputElement, FieldInputProps & Record<string, unknown>>(
  (
    { inputSize, inputLabel, error, formHelperText, helperText, required, showTimeSelectOnly, onClear, ...inputProps },
    ref,
  ) => {
    return (
      <DsTextField
        fullWidth
        inputRef={ref}
        size={inputSize}
        label={inputLabel}
        error={error}
        formHelperText={formHelperText}
        helperText={helperText}
        required={required}
        onClear={showTimeSelectOnly ? undefined : onClear}
        {...inputProps}
        // Time pickers are dropdown-like — chevron, no clear X (Figma schedule form).
        clearable={!showTimeSelectOnly}
        suffixIcon={
          showTimeSelectOnly ? { icon: <DsIcon icon="CHEVRON_DOWN" size="sm" color="iceGray.700" /> } : undefined
        }
        prefixIcon={{ icon: showTimeSelectOnly ? <DsIcon icon="CLOCK" /> : <DsIcon icon="CALENDAR" /> }}
      />
    );
  },
);

FieldInput.displayName = 'DsDatePickerFieldInput';

type InlineTextInputProps = {
  value?: string;
  onClick?: () => void;
  'aria-label'?: string;
  triggerAriaLabel?: string;
};

const InlineTextInput = forwardRef<HTMLButtonElement, InlineTextInputProps>(
  ({ value, onClick, triggerAriaLabel, ...inputProps }, ref) => {
    return (
      <DsButton
        ref={ref}
        variant="text"
        color="secondary"
        onClick={onClick}
        aria-label={triggerAriaLabel ?? inputProps['aria-label']}
        endIcon={<DsIcon icon="CHEVRON_DOWN" size="sm" color="iceGray.700" />}
        sx={{
          minWidth: 0,
          px: 0,
          py: 0,
          color: 'iceGray.700',
          '&:hover': { backgroundColor: 'transparent' },
        }}
        {...inputProps}
      >
        <DsTypography variant="body1_500" color="iceGray.700" component="span">
          {value}
        </DsTypography>
      </DsButton>
    );
  },
);

InlineTextInput.displayName = 'DsDatePickerInlineTextInput';

type Props = ComponentProps<typeof ReactDatePickerComponent> & {
  boxProps?: BoxProps;
  /**
   * `field` — default text-field trigger with calendar/clock prefix.
   * `inlineText` — compact label + chevron (e.g. calendar toolbar date).
   */
  variant?: DsDatePickerVariant;
  inputSize?: 'small' | 'medium' | 'large';
  inputLabel?: string;
  error?: boolean;
  formHelperText?: string;
  helperText?: string;
  /** Accessible name for `inlineText` trigger when no visible field label. */
  triggerAriaLabel?: string;
  dateFormat?:
    | 'dd MMM yyyy' // 07 Aug 2024 (Day, short month, year)
    | 'yyyy-MM-dd' // 2025-02-28 (ISO standard date)
    | 'h:mm a' // 10:30 AM (12-hour format with AM/PM)
    | 'HH:mm' // 14:30 (24-hour format)
    | 'MM/dd/yyyy h:mm aa' // 02/28/2025 10:30 AM (US date format)
    | 'dd/MM/yyyy h:mm aa' // 28/02/2025 10:30 AM (European date format)
    | 'yyyy-MM-dd HH:mm:ss' // 2025-02-28 14:30:00 (ISO format with time)
    | 'EEEE, MMMM d, yyyy' // Tuesday, February 28, 2025 (Full text format)
    | 'dd MMMM yyyy' // 28 February 2025 (Day, Full month name, Year)
    | 'd MMMM yyyy' // 14 January 2022 (Day without leading zero, Full month, Year)
    | 'MMM d, yyyy' // Feb 28, 2025 (Short text format)
    | 'MM/yyyy' // 02/2025 (Month and year only)
    | 'yyyy'; // 2025 (Year only)
};

export const DsDatePicker = (props: Props) => {
  const {
    customInput,
    variant = 'field',
    inputSize,
    inputLabel,
    error,
    formHelperText,
    helperText,
    required,
    triggerAriaLabel,
    dateFormat = 'dd MMM yyyy',
    value,
    selected,
    ...rest
  } = props;
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const resolvedSelected = selected ?? (value != null ? new Date(value as string | number | Date) : null);

  const resolvedCustomInput =
    customInput ??
    (variant === 'inlineText' ? (
      <InlineTextInput triggerAriaLabel={triggerAriaLabel} />
    ) : (
      <FieldInput
        inputSize={inputSize}
        inputLabel={inputLabel}
        error={error}
        formHelperText={formHelperText}
        helperText={helperText}
        required={required}
        showTimeSelectOnly={props.showTimeSelectOnly}
        onClear={() => {
          setDateRange([null, null]);
          rest.onChange?.(null as never);
        }}
      />
    ));

  return (
    // @ts-ignore
    <AppReactDatepicker
      customInput={resolvedCustomInput}
      selected={resolvedSelected}
      dateFormat={dateFormat}
      {...rest}
      {...(rest.selectsRange && {
        selectsMultiple: true,
        startDate,
        endDate,
        selectedDates: [startDate, endDate],
        onChange: (e) => {
          setDateRange(e as never);
          rest.onChange?.(e as [Date, Date]);
        },
      })}
    />
  );
};
