import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
// ANCHOR: missing-ds-icon/TRAVEL_CAR — Week travel-time car (25602:479678). Temporary local SVG until IceIconsEnum + DsIcon exist.
import { TravelCarIcon } from '../../assets/TravelCarIcon';

export interface WeekTravelBlockProps {
  travelMinutes: number;
}

/**
 * Travel-time block for an in-person meeting (Figma `25602:479678` dotted strip).
 *
 * Occupies its own time range immediately before the meeting
 * (`startMinutes - travelMinutes` → `startMinutes`) and sits flush against the
 * meeting block, so the meeting itself still begins exactly at its start time.
 */
const WeekTravelBlock: FC<WeekTravelBlockProps> = ({ travelMinutes }) => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      px={1}
      sx={(theme) => ({
        width: 1,
        height: 1,
        minHeight: 0,
        boxSizing: 'border-box',
        borderRadius: '4px 4px 0 0',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        borderBottom: `1px solid ${theme.palette.success['opacity-24']}`,
        bgcolor: theme.palette.success['opacity-8'],
        overflow: 'hidden',
      })}
    >
      <Box
        sx={(theme) => ({
          width: 2,
          alignSelf: 'stretch',
          borderLeft: `2px dotted ${theme.palette.success[400]}`,
          flexShrink: 0,
        })}
      />
      <Box sx={(theme) => ({ color: theme.palette.success.main, display: 'flex', lineHeight: 0, flexShrink: 0 })}>
        <DsIcon type="svg" size="sm" customIcon={<TravelCarIcon />} />
      </Box>
      <DsTypography variant="subtitle2" color="success.500" noWrap>
        {t('TRAVEL_TIME_MINUTES', { count: travelMinutes })}
      </DsTypography>
    </Stack>
  );
};

export default WeekTravelBlock;
