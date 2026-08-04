import { InputAdornment, TextField, useAutocomplete } from '@mui/material';
import { FC } from 'react';
import { DsSelectProps } from '../DsSelect';
import StartAdornment from './StartAdornment';

interface Props {
  label?: DsSelectProps['label'];
  color?: DsSelectProps['color'];
  helperText?: DsSelectProps['helperText'];
  error?: DsSelectProps['error'];
  placeholder?: DsSelectProps['placeholder'];
  params?: {
    id: string;
    disabled: boolean;
    fullWidth: boolean;
    size: 'small' | undefined;
    InputLabelProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputLabelProps']>;
    inputProps: ReturnType<ReturnType<typeof useAutocomplete>['getInputProps']>;
  };
  size?: DsSelectProps['size'];
  prefixIcon?: DsSelectProps['prefixIcon'];
  InputProps?: {
    ref: React.Ref<any>;
    className: string;
    startAdornment: React.ReactNode;
    endAdornment: React.ReactNode;
  };
}

const SelectInput: FC<Props> = ({
  label,
  color,
  helperText,
  error,
  placeholder,
  params,
  size,
  prefixIcon,
  InputProps,
}) => {
  return (
    <TextField
      label={label}
      color={color}
      helperText={helperText}
      error={error}
      placeholder={placeholder}
      {...params}
      size={size}
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '14px !important',
          fontWeight: 400,
          color: (theme) => theme.palette.iceGray[700],
          '& .MuiAutocomplete-input': {
            pl: '0 !important',
          },
        },
      }}
      InputProps={{
        ...InputProps,
        onKeyDown: async (e) => {
          const option = document.querySelector('#ds-select-add-option') as HTMLElement;
          if (
            e.key === 'Enter' &&
            option?.classList.contains('Mui-focused') &&
            option.classList.contains('Mui-focusVisible')
          ) {
            e.preventDefault(); // Prevent form submission or default behavior
            e.stopPropagation(); // Prevent Enter from affecting parent elements
            e.nativeEvent.stopImmediatePropagation(); // Stop any other event listeners
            option.click();
          }
        },
        ...((prefixIcon || InputProps?.startAdornment) && {
          startAdornment: (
            <>
              {prefixIcon && (
                <InputAdornment position="start">
                  <StartAdornment prefixIcon={prefixIcon} disabled={params?.disabled || false} />
                </InputAdornment>
              )}
              {InputProps?.startAdornment}
            </>
          ),
        }),
      }}
    />
  );
};

export default SelectInput;
