import { Divider, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { formatPhoneNumber } from '@ice-web-app/shared-utils';
import { DsButton } from '../../buttons/DsButton';
import { DsIcon } from '../../icons/DsIcon';
import { DsTextFieldProps } from '../DsTextField';

interface Props extends DsTextFieldProps {
  controlledValue: unknown;
  setControlledValue: React.Dispatch<unknown>;
  onClear?: VoidFunction;
}

const EndAdornment: FC<Props> = ({
  type,
  disabled,
  value,
  onChange,
  suffixIcon,
  textBtn,
  textBtnClick,
  setControlledValue,
  controlledValue,
  onClear,
  clearable = true,
  ...props
}) => {
  const hasValue =
    type === 'tel' ? !!formatPhoneNumber({ phone: controlledValue as string }).phone : !!(controlledValue || value);

  return (
    <>
      {type === 'number' || type === 'password' || props.multiline || clearable === false ? null : hasValue &&
        !disabled ? (
        <DsIcon
          sx={{
            visibility: hasValue && !disabled ? 'visible' : 'hidden',
          }}
          onClick={() => {
            if (onChange) {
              onChange({
                target: { value: '' },
              } as React.ChangeEvent<HTMLInputElement>);
            }
            onClear?.();
            setControlledValue('');
          }}
          icon="CLOSE"
        />
      ) : null}
      {suffixIcon ? (
        <>
          {suffixIcon?.hasDivider && <Divider variant="fullWidth" orientation="vertical" flexItem sx={{ my: -1.75 }} />}
          <DsButton
            onClick={suffixIcon.onClick}
            justIcon
            sx={{
              borderRadius: 1,
              cursor: suffixIcon.onClick ? 'pointer' : 'default',
              // mr: responsiveSuffixMargin().mr,
              // ml: responsiveSuffixMargin().ml,
              ...(!suffixIcon.onClick && {
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }),
              minWidth: 'unset',
              width: 'unset',
              height: 'unset',
            }}
            disabled={suffixIcon.disabled || disabled}
          >
            {suffixIcon.icon}
          </DsButton>
        </>
      ) : null}
      {textBtn ? (
        <DsButton variant="text" onClick={textBtnClick}>
          {textBtn}
        </DsButton>
      ) : null}
    </>
  );
};

export default EndAdornment;
