import {
  Stack,
  SxProps,
  TextFieldPropsSizeOverrides,
  Theme,
  Tooltip,
  TypographyPropsVariantOverrides,
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { FC, cloneElement } from 'react';
import { ColorsType } from '../../theme/palette.config';
import { DsTooltip } from '../tooltip/DsTooltip';
import { DsTypography } from '../typography/DsTypography';

interface Props {
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
  customVariant?: OverridableStringUnion<'inherit', TypographyPropsVariantOverrides>;
  customHelperVariant?: OverridableStringUnion<'inherit', TypographyPropsVariantOverrides>;
  labelTextColor?: ColorsType;
  labelIconColor?: ColorsType;
  helperTextColor?: ColorsType;
  label: React.ReactNode & string;
  helperText?: React.ReactNode & string;
  required?: boolean;
  labelIcon?: JSX.Element;
  labelIconTooltip?: string;
  topRightElement?: JSX.Element;
  sx?: SxProps<Theme>;
}

export const LabelInput: FC<Props> = ({
  labelTextColor = 'grey.600',
  helperTextColor = 'grey.500',
  size = 'medium',
  customVariant,
  customHelperVariant,
  label,
  labelIcon,
  labelIconColor,
  labelIconTooltip,
  required,
  topRightElement,
  helperText,
  sx,
}) => {
  return (
    <Stack gap={1} direction="row" justifyContent="space-between" sx={sx}>
      <Stack gap={1} direction="row" alignItems="center">
        <Stack direction="column">
          <DsTypography
            variant={
              customVariant ||
              `${
                size === 'small'
                  ? '12px-400'
                  : size === 'medium'
                    ? '14px-400'
                    : size === 'large'
                      ? '16px-400'
                      : '18px-400'
              }`
            }
            mb={size === 'small' ? '4px' : '8px'}
            color={labelTextColor}
            className="label-input-text"
          >
            {/* {`${required ? '*' : ''}`} */}
            {`${label}`}
          </DsTypography>
          {helperText ? (
            <DsTypography className="helperText" variant={customHelperVariant || '12px-400'} color={helperTextColor}>
              {`${helperText}`}
            </DsTypography>
          ) : null}
        </Stack>
        {labelIcon ? (
          <DsTooltip title={labelIconTooltip} placement="right">
            {cloneElement(labelIcon, {
              color: labelIconColor,
              className: 'label-icon',
              size: 'small',
              sx: { lineHeight: '0px' },
            })}
          </DsTooltip>
        ) : null}
      </Stack>
      {topRightElement ? cloneElement(topRightElement, { p: 1 }) : null}
    </Stack>
  );
};

export default LabelInput;
