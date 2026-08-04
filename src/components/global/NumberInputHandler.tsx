import { ChangeEventHandler, Dispatch, FC, SetStateAction } from 'react';
import { DsButton } from '../buttons/DsButton';
import { DsIcon } from '../icons/DsIcon';

interface Props {
  value: string | number | undefined;
  setValue: Dispatch<SetStateAction<string | number>> | undefined;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  disabled: boolean;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  step: number;
}

const NumberInputHandler: FC<Props> = ({ disabled, icon, onChange, setValue, value, step }) => {
  return (
    <DsButton
      onClick={(_e) => {
        if (value === undefined || value === null) {
          if (setValue) {
            setValue(step);
          }
          if (onChange) {
            onChange({
              target: { value: step as unknown as string },
            } as React.ChangeEvent<HTMLInputElement>);
          }
        } else if (setValue) {
          setValue((preState) => {
            if (onChange) {
              onChange({
                target: {
                  value: (Number(preState) + step) as unknown as string,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }
            return Number(preState) + step;
          });
        }
      }}
      disabled={disabled}
      justIcon
    >
      <DsIcon customIcon={icon} />
    </DsButton>
  );
};
export default NumberInputHandler;
