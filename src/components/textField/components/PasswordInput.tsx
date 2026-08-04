import { LinearProgress, Stack, useTheme } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { PASSWORD_PATTERN } from '@ice-web-app/shared-constants';
import { DsIcon } from '../../icons/DsIcon';
import { DsTypography } from '../../typography/DsTypography';
import CustomTextField, { CustomTextFieldProps } from './CustomTextField';

interface PasswordInputProps extends Omit<CustomTextFieldProps, 'endAdornment' | 'startAdornment'> {}

const PasswordInput: FC<PasswordInputProps> = ({
  dsTextFieldProps,
  dsTextFieldExtraProps,
  controlledValue,
  setControlledValue,
}) => {
  const theme = useTheme();

  const [show, setShow] = useState(false);
  const [strengthBar, setStrengthBar] = useState(0);

  useEffect(() => {
    if (controlledValue) {
      let count = 0;
      const validArr = PASSWORD_PATTERN.map((pattern) => pattern.test(controlledValue?.toString()));
      validArr.map((val) => !!val && count++);
      setStrengthBar(count - 1);
    } else {
      setStrengthBar(0);
    }
  }, [controlledValue]);

  const strengthBarColor = [
    // theme.palette.grey.main,
    // theme.palette.red.main,
    // theme.palette.gold.main,
    // theme.palette.green.main,
    theme.palette.success.dark,
  ];
  const strengthBarText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <>
      <CustomTextField
        dsTextFieldProps={{ ...dsTextFieldProps, type: show ? 'text' : 'password' }}
        dsTextFieldExtraProps={dsTextFieldExtraProps}
        controlledValue={controlledValue}
        setControlledValue={setControlledValue}
        endAdornment={
          <DsIcon
            sx={{ height: '100%' }}
            onClick={() => setShow((prev) => !prev)}
            icon={show ? 'EYE_CLOSED' : 'EYE_OPENED'}
          />
        }
      />
      {dsTextFieldExtraProps.withStrengthBar && (
        <Stack gap={0.7}>
          <LinearProgress
            sx={{
              marginTop: 0.7,
              height: 4,
              backgroundColor: strengthBarColor[0],
              '& .MuiLinearProgress-bar1Determinate': { backgroundColor: strengthBarColor[strengthBar] },
            }}
            variant="determinate"
            value={(strengthBar / 4) * 100}
          />
          <DsTypography
            textAlign={dsTextFieldExtraProps.strengthBarTextAlign}
            sx={{ color: strengthBarColor[strengthBar] }}
            variant="caption"
          >
            {strengthBarText[strengthBar]}
          </DsTypography>
        </Stack>
      )}
    </>
  );
};

export default PasswordInput;
