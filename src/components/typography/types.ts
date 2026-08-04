import { TypographyProps } from '@mui/material';
import type { HTMLAttributeAnchorTarget } from 'react';
import { colorSchemesType } from '../../materio/@core/theme/colorSchemes';

export interface DsTypographyProps extends Omit<TypographyProps, 'variant'> {
  color?: colorSchemesType;
  lineClamp?: '1' | '2' | '3' | '4' | '5' | '6';
  href?: string;
  /** Anchor attrs when rendering as a link (`href`). Default Typography props assume `span`. */
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
  tooltip?: string | null;
  tooltipPlacement?:
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'bottom-end'
    | 'bottom-start'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start';
  hoverColor?: colorSchemesType;
  variant?:
    | TypographyProps['variant']
    | 'body1_500'
    | 'body2_500'
    | 'h3_600'
    | 'h4_600'
    | 'body3'
    | 'body3_500'
    | 'xs'
    | 'xs_Medium';
}
