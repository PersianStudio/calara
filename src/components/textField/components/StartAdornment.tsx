import { Divider, IconButton } from '@mui/material';
import React, { FC } from 'react';
import { DsButton } from '../../buttons/DsButton';
import { DsTextFieldProps } from '../DsTextField';

interface Props extends DsTextFieldProps {
  controlledValue: unknown;
  setControlledValue: React.Dispatch<unknown>;
}

const StartAdornment: FC<Props> = ({ prefixIcon, ...props }) => {
  return (
    <>
      {prefixIcon ? (
        <>
          <DsButton
            onClick={prefixIcon.onClick}
            sx={{
              borderRadius: 1,
              cursor: prefixIcon?.onClick ? 'pointer' : 'default',
              pl: 0,
              pr: '8px',
              py: 3,
              ...(!prefixIcon?.onClick && {
                '&.MuiButtonBase-root:hover': {
                  bgcolor: 'transparent',
                },
              }),
              minWidth: 'unset',
              width: 'unset',
              height: '100%',
            }}
            justIcon
            disabled={prefixIcon.disabled || props.disabled}
          >
            {prefixIcon.icon}
          </DsButton>
          {prefixIcon?.hasDivider && (
            <Divider variant="fullWidth" orientation="vertical" flexItem sx={{ my: -1.25, mr: '10px' }} />
          )}
        </>
      ) : null}
    </>
  );
};

export default StartAdornment;
