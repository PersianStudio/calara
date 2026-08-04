import { SxProps, Theme, Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';
import { DsTooltip } from '../tooltip/DsTooltip';
import { DsTypographyProps } from './types';

export const DsTypography: FC<DsTypographyProps> = ({
  children,
  variant,
  lineClamp,
  tooltip,
  tooltipPlacement,
  href,
  target,
  rel,
  ref,
  hoverColor,
  color = 'text.primary', // gray-700
  sx,
  ...props
}) => {
  const styles: SxProps<Theme> = {
    ...(lineClamp && {
      WebkitBoxOrient: 'vertical',
      display: '-webkit-box',
      WebkitLineClamp: lineClamp,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
    '&:hover': hoverColor ? { color: hoverColor } : undefined,
    ...sx,
  };

  const isLink = Boolean(href);

  const TypographyItem = (
    <Typography
      component={isLink ? 'a' : undefined}
      variant={variant as TypographyProps['variant']}
      ref={ref}
      {...(isLink ? { href, target, rel } : {})}
      color={color}
      {...props}
      sx={styles}
    >
      {children}
    </Typography>
  );

  if (tooltip) {
    return (
      <DsTooltip title={tooltip} placement={tooltipPlacement} arrow>
        {TypographyItem}
      </DsTooltip>
    );
  }

  return TypographyItem;
};
