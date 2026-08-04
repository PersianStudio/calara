import { IconButton, InputAdornment, TextFieldPropsSizeOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import React, { FC } from 'react';

interface PrefixIconInputProps {
  size: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  onClick?: VoidFunction;
  disabled: boolean;
}

const PrefixIconInput: FC<PrefixIconInputProps> = ({ icon, size, disabled, onClick }) => {
  return (
    <InputAdornment position="start">
      <IconButton
        size="medium"
        disabled={disabled}
        onClick={onClick}
        className={`${size} ${disabled ? 'open-picker-button' : ''} `}
      >
        {icon}
      </IconButton>
    </InputAdornment>
  );
};

export default PrefixIconInput;
