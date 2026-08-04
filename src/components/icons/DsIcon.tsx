import { Box, Breakpoint, SvgIcon, SxProps, Theme, useTheme } from '@mui/material';
import { FC, MouseEventHandler } from 'react';
import { IceIconsEnum } from '../../types/iceIconsEnum';
import { colorSchemesType } from '../../materio/@core/theme/colorSchemes';

export interface DsIconProps {
  type?: 'svg' | 'default';
  color?: colorSchemesType;
  icon?: keyof typeof IceIconsEnum;
  customIcon?: React.ReactNode;
  size?: number | Breakpoint;
  sx?: SxProps<Theme>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export const DsIcon: FC<DsIconProps> = ({
  color,
  icon,
  size = 'md',
  type = 'default',
  sx,
  customIcon,
  onClick,
  className,
}) => {
  const theme = useTheme();
  const splitColor = color?.split('.');
  const getSize = () => {
    switch (size) {
      case 'xs':
        return 14;
      case 'sm':
        return 16;
      case 'md':
        return 20;
      case 'lg':
        return 24;
      case 'xl':
        return 28;
      case 'xxl':
        return 32;
      case 'xxxl':
        return 36;
      default:
        return size;
    }
  };

  const renderIcon = () => {
    switch (type) {
      case 'svg':
        return (
          <SvgIcon
            component="div"
            onClick={onClick}
            className={className}
            sx={{
              ...(color && { color: color }),
              ...(onClick && { cursor: 'pointer' }),
              ...(size && {
                width: getSize(),
                height: getSize(),
                fontSize: 'unset !important',
                '& svg': {
                  width: getSize(),
                  height: getSize(),
                },
              }),
              ...sx,
            }}
          >
            {customIcon}
          </SvgIcon>
        );
      default:
        return (
          <Box
            component="i"
            onClick={onClick}
            className={`${icon && IceIconsEnum[icon]} ${className}`}
            sx={{
              ...(getSize() && { fontSize: `${getSize()}px !important` }),
              ...(color &&
                splitColor && {
                  color: `${splitColor.length > 1 ? theme.palette[splitColor[0]][splitColor[1]] : theme.palette[splitColor[0]]} !important`,
                }),
              ...(onClick && { cursor: 'pointer' }),
              ...sx,
            }}
          >
            {customIcon && customIcon}
          </Box>
        );
    }
  };

  return renderIcon();
};
