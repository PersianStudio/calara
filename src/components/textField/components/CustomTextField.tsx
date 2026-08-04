import { InputAdornment, OutlinedTextFieldProps, TextField } from '@mui/material';
import React, { FC, ReactNode, useEffect } from 'react';
import { DsTextFieldExtraProps } from '../DsTextField';
import EndAdornment from './EndAdornment';
import StartAdornment from './StartAdornment';

export const AdornmentContainer = ({
  children,
  position,
  ...props
}: {
  children: ReactNode;
  position: 'start' | 'end';
}) => (
  <InputAdornment
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
    position={position}
    {...props}
  >
    {children}
  </InputAdornment>
);

export interface CustomTextFieldProps {
  dsTextFieldProps: Omit<OutlinedTextFieldProps, 'variant'>;
  dsTextFieldExtraProps: DsTextFieldExtraProps;

  // more props
  onClear?: VoidFunction;
  controlledValue: unknown;
  setControlledValue: React.Dispatch<unknown>;
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  controlledValue,
  setControlledValue,
  endAdornment,
  startAdornment,
  dsTextFieldProps,
  dsTextFieldExtraProps,
  onClear,
}) => {
  const hasValue = !!controlledValue || !!dsTextFieldProps.value || !!dsTextFieldProps.defaultValue;
  const hasPrefix = dsTextFieldExtraProps.prefixIcon || dsTextFieldProps.InputProps?.startAdornment || startAdornment;

  const [shrink, setShrink] = React.useState(!hasPrefix ? hasValue : true);

  // for multiple reasons we have to handle input shrink manually
  // if input had prefix icon shrink must be true
  // if input had value shrink must be true
  useEffect(() => {
    setShrink(!hasPrefix ? hasValue : true);
  }, [hasValue, hasPrefix]);

  useEffect(() => {
    // we handle value change of tell inside tell input itself
    if (dsTextFieldProps.type === 'tel') return;
    setControlledValue(dsTextFieldProps.value);
  }, [dsTextFieldProps.value]);

  return (
    <TextField
      {...dsTextFieldProps}
      sx={{
        ...dsTextFieldProps.sx,
        // Keep a small leading inset when a prefix icon is present so the icon sits near the
        // left edge without overlapping the input/placeholder text (Figma password + copy).
        ...(hasPrefix && {
          '& .MuiOutlinedInput-root': {
            paddingLeft: '8px !important',
          },
        }),
      }}
      value={controlledValue || dsTextFieldProps.value || ''}
      onChange={dsTextFieldProps.onChange}
      onFocus={() => setShrink(true)}
      onBlur={() => setShrink(!hasPrefix ? hasValue : true)}
      InputLabelProps={{ shrink }}
      variant="outlined"
      InputProps={{
        ...dsTextFieldProps.InputProps,
        startAdornment: (
          <AdornmentContainer position="start">
            {dsTextFieldProps.InputProps?.startAdornment}
            <StartAdornment
              controlledValue={controlledValue}
              setControlledValue={setControlledValue}
              {...dsTextFieldExtraProps}
              {...dsTextFieldProps}
            />
            {startAdornment}
          </AdornmentContainer>
        ),
        endAdornment: (
          <AdornmentContainer position="end">
            {endAdornment}
            <EndAdornment
              controlledValue={controlledValue}
              setControlledValue={setControlledValue}
              onClear={onClear}
              {...dsTextFieldExtraProps}
              {...dsTextFieldProps}
            />
            {dsTextFieldProps.InputProps?.endAdornment}
          </AdornmentContainer>
        ),
      }}
    />
  );
};

export default CustomTextField;
