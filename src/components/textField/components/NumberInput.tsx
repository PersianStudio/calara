import { FC } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';
import NumberInputHandler from '../../global/NumberInputHandler';
import CustomTextField, { CustomTextFieldProps } from './CustomTextField';

interface InputNumberProps extends Omit<CustomTextFieldProps, 'endAdornment' | 'startAdornment'> {}

const InputNumber: FC<InputNumberProps> = ({
  dsTextFieldProps,
  dsTextFieldExtraProps,
  controlledValue,
  setControlledValue,
}) => {
  return (
    <CustomTextField
      dsTextFieldProps={{ ...dsTextFieldProps, type: 'number' }}
      dsTextFieldExtraProps={dsTextFieldExtraProps}
      controlledValue={controlledValue}
      setControlledValue={setControlledValue}
      endAdornment={
        <NumberInputHandler
          disabled={dsTextFieldProps.disabled || false}
          icon={<LuPlus />}
          onChange={dsTextFieldProps.onChange}
          setValue={setControlledValue}
          value={controlledValue as number}
          step={1}
        />
      }
      startAdornment={
        <NumberInputHandler
          disabled={dsTextFieldProps.disabled || false}
          icon={<LuMinus />}
          onChange={dsTextFieldProps.onChange}
          setValue={setControlledValue}
          value={controlledValue as number}
          step={-1}
        />
      }
    />
  );
};

export default InputNumber;
