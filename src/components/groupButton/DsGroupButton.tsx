import { ButtonGroup, ButtonGroupProps } from '@mui/material';
import { forwardRef } from 'react';
import { DsButton, DsButtonProps } from '../buttons/DsButton';

export interface DsGroupButtonProps extends ButtonGroupProps {
  items: DsButtonProps[];
}

export const DsGroupButton = forwardRef<HTMLDivElement, DsGroupButtonProps>(({ items, ...props }, ref) => {
  return (
    <ButtonGroup ref={ref} {...props}>
      {items.map((item, index) => (
        <DsButton key={index} {...item} />
      ))}
    </ButtonGroup>
  );
});

DsGroupButton.displayName = 'DsGroupButton';
