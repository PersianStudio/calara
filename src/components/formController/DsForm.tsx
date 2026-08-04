import { FormControl, FormControlProps, SxProps } from '@mui/material';
import React from 'react';

interface DsFormProps extends FormControlProps {
  onSubmit?: VoidFunction;
  component?: React.ElementType<any, keyof React.JSX.IntrinsicElements>;
  children?: React.ReactNode;
  className?: string;
  sx?: SxProps;
}

export const DsForm = ({ children, component = 'form', onSubmit, className, ...props }: DsFormProps) => {
  return (
    <FormControl
      {...props}
      component={component}
      className={className}
      onSubmit={(e: Event) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      {children}
    </FormControl>
  );
};
