import { CheckboxProps, FormHelperText, SxProps, Theme, useTheme } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FC } from 'react';
import type { ReactNode } from 'react';

export interface DsCheckboxProps extends CheckboxProps {
  label?: ReactNode;
  error?: boolean;
  helperText?: string;
  value?: boolean;
  formControlLabelSx?: SxProps<Theme> | undefined;
}

export const DsCheckbox: FC<DsCheckboxProps> = ({
  label = '',
  value,
  error = false,
  helperText = '',
  formControlLabelSx,
  ...props
}) => {
  const theme = useTheme();

  return (
    <>
      {label ? (
        <FormControlLabel
          dir={theme.direction}
          label={label}
          sx={formControlLabelSx}
          control={<Checkbox value={value} checked={value} {...props} />}
        />
      ) : (
        <Checkbox value={value} checked={value} {...props} />
      )}

      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  );
};
