import { useTranslation } from '@ice-web-app/shared-hooks';
import { OutlinedTextFieldProps } from '@mui/material';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import CustomTextField from './components/CustomTextField';
import NumberInput from './components/NumberInput';
import PasswordInput from './components/PasswordInput';
import TelephoneInput from './components/TelephoneInput';

// extra props that does not exist in TextFieldProps
export interface DsTextFieldExtraProps {
  strengthBarTextAlign?: 'left' | 'right' | 'center';
  ecosystem?: 'eco_innovation' | 'eco_school';
  withStrengthBar?: boolean;
  textBtn?: string;
  formHelperText?: string;
  textBtnClick?: React.MouseEventHandler<HTMLSpanElement>;
  prefixIcon?: {
    icon: ReactNode;
    onClick?: VoidFunction;
    hasDivider?: boolean;
    disabled?: boolean;
  };
  suffixIcon?: {
    icon: ReactNode;
    onClick?: VoidFunction;
    hasDivider?: boolean;
    disabled?: boolean;
  };
  onClear?: VoidFunction;
  /**
   * When false, hides the built-in clear (X) control. Defaults to true.
   * Use for dropdown-like fields that should show a chevron instead.
   */
  clearable?: boolean;
  topRightElement?: JSX.Element;
}

// we only need OutLined TextField so we dont need variant type
export interface DsTextFieldProps extends Omit<OutlinedTextFieldProps, 'variant'>, DsTextFieldExtraProps {}

export const DsTextField: FC<DsTextFieldProps> = ({
  // extra props
  strengthBarTextAlign,
  ecosystem,
  withStrengthBar,
  textBtn,
  formHelperText,
  textBtnClick,
  prefixIcon,
  suffixIcon,
  topRightElement,
  onClear,
  clearable = true,

  // text field props
  required,
  ...textFieldProps
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<unknown>(textFieldProps.value || textFieldProps.defaultValue);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (textFieldProps.onChange && e) textFieldProps.onChange(e);
  };

  // here we separate MUI TextField Props from Additional props

  // here we set default text field props values
  // text field props
  const textFieldPropsObj: Omit<OutlinedTextFieldProps, 'variant'> = {
    ...textFieldProps,
    onChange: handleOnChange,
    placeholder: textFieldProps.placeholder || t('ENTER_LABEL', { label: textFieldProps.label }),
    helperText: formHelperText ? formHelperText : textFieldProps.helperText,
    type: textFieldProps.type || 'text',
    error: textFieldProps.error || false,
    disabled: textFieldProps.disabled || false,
    // required: textFieldProps.required || undefined,
    fullWidth: textFieldProps.fullWidth || true,
    size: textFieldProps.size || 'medium',
  };

  // here we set default extra props values
  // extra props
  const extraPropsObj: DsTextFieldExtraProps = {
    strengthBarTextAlign: strengthBarTextAlign || 'left',
    ecosystem: ecosystem || 'eco_innovation',
    withStrengthBar,
    textBtn,
    formHelperText,
    textBtnClick,
    prefixIcon,
    suffixIcon,
    topRightElement,
    clearable,
  };

  const renderInput = () => {
    switch (textFieldPropsObj.type) {
      case 'tel':
        return (
          <TelephoneInput
            dsTextFieldProps={{ ...textFieldPropsObj, onChange: textFieldProps.onChange }}
            dsTextFieldExtraProps={extraPropsObj}
            controlledValue={value}
            setControlledValue={setValue}
          />
        );
      case 'number':
        return (
          <NumberInput
            dsTextFieldProps={textFieldPropsObj}
            dsTextFieldExtraProps={extraPropsObj}
            controlledValue={value}
            setControlledValue={setValue}
          />
        );
      case 'password':
        return (
          <PasswordInput
            dsTextFieldProps={textFieldPropsObj}
            dsTextFieldExtraProps={extraPropsObj}
            controlledValue={value}
            setControlledValue={setValue}
          />
        );
      default:
        return (
          <CustomTextField
            dsTextFieldProps={textFieldPropsObj}
            dsTextFieldExtraProps={extraPropsObj}
            controlledValue={value}
            setControlledValue={setValue}
            onClear={onClear}
          />
        );
    }
  };

  return renderInput();
};
