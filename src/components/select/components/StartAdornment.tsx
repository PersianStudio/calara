import { IconButton } from '@mui/material';
import { FC, ReactNode } from 'react';
import { DsButton } from '../../buttons/DsButton';

interface Props {
  prefixIcon?: {
    icon: ReactNode;
    onClick?: VoidFunction;
    disabled?: boolean;
  };
  disabled: boolean;
}

const StartAdornment: FC<Props> = ({ prefixIcon, disabled }) => {
  return (
    <>
      {prefixIcon ? (
        <>
          <DsButton
            onClick={prefixIcon.onClick}
            justIcon
            sx={{
              borderRadius: 1,
              cursor: prefixIcon.onClick ? 'pointer' : 'default',
              ...(!prefixIcon.onClick && {
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }),
              minWidth: 'unset',
              width: 'unset',
              height: 'unset',
            }}
            disabled={prefixIcon.disabled || disabled}
          >
            {prefixIcon.icon}
          </DsButton>
        </>
      ) : null}
    </>
  );
};

export default StartAdornment;
