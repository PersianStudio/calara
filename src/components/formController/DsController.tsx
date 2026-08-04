import { CHARACTER_PATTERN, EMAIL_PATTERN, NUMBER_PATTERN, URL_PATTERN } from '@ice-web-app/shared-constants';
import { formatPhoneNumber } from '@ice-web-app/shared-utils';
import { translate } from '@ice-web-app/shared-utils-ssr';
import { FC, ReactElement, cloneElement } from 'react';
import { Control, Controller, FieldValues, LiteralUnion, RegisterOptions } from 'react-hook-form';

type Props = {
  children: ReactElement;
  control: Control<FieldValues | any>;
  name: string;
  rules?: RegisterOptions & {
    email?: boolean;
    url?: boolean;
    valueAsCharacter?: boolean;
    lengthMultiSelect?: { min: number; max: number };
    lengthTel?: { min: number; max: number };
  };
};

export const DsController: FC<Props> = ({ children, control, name, rules }) => {
  const errorTxt = (
    errType:
      | LiteralUnion<
          | 'disabled'
          | 'valueAsNumber'
          | 'valueAsDate'
          | 'setValueAs'
          | 'required'
          | 'min'
          | 'max'
          | 'maxLength'
          | 'minLength'
          | 'validate'
          | 'value'
          | 'shouldUnregister'
          | 'onChange'
          | 'onBlur'
          | 'deps'
          | 'pattern',
          string
        >
      | undefined,
  ) => {
    switch (errType) {
      case 'required':
        return translate({ key: 'REQUIRED', ns: 'validation' });
      case 'min':
        return translate({ key: 'MIN', ns: 'validation', label: rules?.min?.toString() });
      case 'max':
        return translate({ key: 'MAX', ns: 'validation', label: rules?.max?.toString() });
      case 'minLength':
        return translate({ key: 'ENTER_AT_LEAST_CHARACTERS', ns: 'validation', label: rules?.minLength?.toString() });
      case 'maxLength':
        return translate({ key: 'ENTER_MAXIMUM_CHARACTERS', ns: 'validation', label: rules?.maxLength?.toString() });
      case 'pattern':
        return translate({ key: 'PATTERN_NOT_MATCH', ns: 'validation' });
      case 'valueAsNumber':
        return translate({ key: 'JUST_NUMBER', ns: 'validation' });
      case 'valueAsDate':
        return translate({ key: 'DATE_NOT_VALID', ns: 'validation' });
      default:
        return undefined;
    }
  };

  return (
    <Controller
      rules={{
        ...(rules?.email && {
          pattern: {
            value: EMAIL_PATTERN,
            message: translate({ key: 'EMAIL_NOT_VALID', ns: 'validation' }),
          },
        }),
        ...(rules?.url && {
          pattern: {
            value: URL_PATTERN,
            message: translate({ key: 'URL_NOT_VALID', ns: 'validation' }),
          },
        }),
        ...(rules?.valueAsNumber && {
          pattern: {
            value: NUMBER_PATTERN,
            message: translate({ key: 'JUST_NUMBER', ns: 'validation' }),
          },
        }),
        ...(rules?.valueAsCharacter && {
          pattern: {
            value: CHARACTER_PATTERN,
            message: translate({ key: 'JUST_CHARACTER', ns: 'validation' }),
          },
        }),
        ...(rules?.lengthTel && {
          validate: (value) => {
            if (rules?.lengthTel) {
              const { phone } = (value && formatPhoneNumber({ formValue: value })) || {};
              const phoneNumberLength = phone ? phone?.trim().length : 0;

              if (phone?.trim() && phoneNumberLength < rules?.lengthTel.min) {
                return translate({
                  key: 'ENTER_AT_LEAST_CHARACTERS',
                  ns: 'validation',
                  label: rules?.lengthTel.min?.toString(),
                });
              }
              if (phone?.trim() && phoneNumberLength > rules?.lengthTel.max) {
                return translate({
                  key: 'ENTER_MAXIMUM_CHARACTERS',
                  ns: 'validation',
                  label: rules?.lengthTel.max?.toString(),
                });
              }
            }

            return true;
          },
        }),
        ...(rules?.lengthMultiSelect && {
          validate: (value) => {
            if (rules?.lengthMultiSelect) {
              if (value && value.length < rules?.lengthMultiSelect.min) {
                return translate({
                  key: 'SELECT_AT_LEAST_ITEMS',
                  ns: 'validation',
                  label: rules?.lengthMultiSelect.min?.toString(),
                });
              }
              if (value && value.length > rules?.lengthMultiSelect.max) {
                return translate({
                  key: 'SELECT_MAXIMUM_ITEMS',
                  ns: 'validation',
                  label: rules?.lengthMultiSelect.max?.toString(),
                });
              }
            }

            return true;
          },
        }),
        ...rules,
      }}
      name={name}
      control={control}
      render={({ field: { onChange, value, ...fieldObj }, fieldState, formState }) => {
        return cloneElement(children, {
          ...fieldObj,
          // When we use 'react-datepicker' and we are in selectsRange mode, there is no need to set value.
          ...(!children.props.selectsRange && { value }),
          onChange: (e: any) => {
            children.props?.onChange?.(e);
            onChange(e);
          },
          ref: null,
          error: !!fieldState.error,
          formHelperText: fieldState?.error?.message || errorTxt(fieldState?.error?.type),
          required: !!rules?.required,
        });
      }}
    />
  );
};
