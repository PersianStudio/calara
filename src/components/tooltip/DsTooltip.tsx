import { IceIconsEnum } from '../../types/iceIconsEnum';
import { Stack, Tooltip, TooltipProps } from '@mui/material';
import { FC } from 'react';
import { DsIcon } from '../icons/DsIcon';
import { DsTypography } from '../typography/DsTypography';

export type DsTooltipProps = Omit<TooltipProps, 'title'> & {
  icon?: keyof typeof IceIconsEnum;
  title: string;
};

export const DsTooltip: FC<DsTooltipProps> = ({ icon, title, ...props }) => {
  return (
    <Tooltip
      title={
        <Stack gap={1} direction="row" alignItems="center">
          {icon && <DsIcon icon={icon} size={16} />}
          <DsTypography color="customColors.tooltipText" variant="tooltip">
            {title}
          </DsTypography>
        </Stack>
      }
      {...props}
    >
      {props.children}
    </Tooltip>
  );
};
