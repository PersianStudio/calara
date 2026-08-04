import { ToggleButton, ToggleButtonGroup, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { FC } from 'react';

export interface DsGroupToggleButtonProps extends ToggleButtonGroupProps {
  items: ToggleButtonProps[];
}

export const DsGroupToggleButton: FC<DsGroupToggleButtonProps> = ({ items, ...props }) => {
  return (
    <ToggleButtonGroup {...props}>
      {items.map((item, index) => (
        <ToggleButton key={index} {...item} />
      ))}
    </ToggleButtonGroup>
  );
};
