import { TypographyPropsVariantOverrides } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { OverridableStringUnion } from '@mui/types';
import { FC } from 'react';
import { colorSchemesType } from '../../materio/@core/theme/colorSchemes';
import { DsTypography } from '../typography/DsTypography';

interface Props {
  helperText?: string;
  helperTextColor?: colorSchemesType;
  error?: boolean;
  padding?: number;
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
}

const HelperTextInput: FC<Props> = ({
  helperText,
  helperTextColor = 'text.disabled',
  padding = 1,
  variant = 'caption',
}) => {
  return helperText ? (
    <DsTypography variant={variant} p={padding} pb={0} color={helperTextColor}>
      {helperText}
    </DsTypography>
  ) : null;
};
export default HelperTextInput;
