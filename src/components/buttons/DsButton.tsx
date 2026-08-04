import { Button, IconButton } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';
import { ReactNode, forwardRef } from 'react';
import { DsIcon } from '../icons/DsIcon';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    xSmall: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    xSmall: true;
  }
}

export interface DsButtonProps extends ButtonProps {
  children?: ReactNode;
  loading?: boolean;
  justIcon?: boolean;
  circle?: boolean;
  shadow?: boolean;
}

const xSmallStyles = {
  padding: '6px',
  minWidth: '32px',
  height: '32px',
  width: '32px',
  fontSize: '1rem',
};

export const DsButton = forwardRef<HTMLButtonElement, DsButtonProps>(
  (
    {
      loading = false,
      justIcon,
      circle = false,
      children,
      startIcon,
      className,
      disabled = false,
      shadow = false,
      size,
      sx,
      ...props
    },
    ref,
  ) => {
    if (justIcon) {
      return (
        <IconButton
          ref={ref}
          className={`${className} ${props.variant} ${circle ? 'circle' : ''}`}
          disabled={disabled || loading}
          size={size}
          sx={{
            ...(shadow === false && { boxShadow: 'none' }),
            ...(size === 'xSmall' && xSmallStyles),
            ...sx,
          }}
          {...props}
        >
          {loading ? <DsIcon icon="LOADING" className="inline-block animate-spin" /> : children}
        </IconButton>
      );
    }
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        startIcon={loading ? <DsIcon icon="LOADING" className="inline-block animate-spin " /> : startIcon}
        size={size}
        {...props}
        sx={{
          ...(shadow === false && { boxShadow: 'none' }),
          ...(size === 'xSmall' && xSmallStyles),
          ...sx,
        }}
        className={className}
      >
        {children}
      </Button>
    );
  },
);
