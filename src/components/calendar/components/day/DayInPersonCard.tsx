import { DsIcon } from '../../../icons/DsIcon';
import { DsTypography } from '../../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack } from '@mui/material';
import { FC } from 'react';
// ANCHOR: missing-ds-icon/IN_PERSON_MEETING — Day in-person meeting icon (25602:477673 / 25601:476914). Temporary local SVG until IceIconsEnum + DsIcon exist.
import { InPersonMeetingIcon } from '../../assets/InPersonMeetingIcon';
// ANCHOR: missing-ds-icon/TRAVEL_CAR — Day travel-time car (25602:477673 / 25601:476914). Temporary local SVG until IceIconsEnum + DsIcon exist.
import { TravelCarIcon } from '../../assets/TravelCarIcon';
import { formatTimeRange } from '../../utils/calendarTime';
import { DayEventIconWell } from './DayEventIconWell';
import { CalendarDayInPersonEvent } from './dayEventTypes';

export interface DayInPersonCardProps {
  event: CalendarDayInPersonEvent;
  onClick?: () => void;
  /** Fill a timed-grid slot. Travel strip is drawn by the grid when `fillSlot` is set. */
  fillSlot?: boolean;
}

/**
 * In-person meeting card (page `25602:477673` + drawer `25601:476914`).
 * success-8 bg · optional travel strip · title · icon well + schedule time.
 */
const DayInPersonCard: FC<DayInPersonCardProps> = ({ event, onClick, fillSlot }) => {
  const { t } = useTranslation();
  const showInlineTravel = Boolean(event.travelMinutes != null && !fillSlot);

  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={(theme) => ({
        width: 1,
        height: fillSlot ? 1 : undefined,
        minHeight: 0,
        borderRadius: fillSlot && event.travelMinutes ? '0 0 4px 4px' : '4px',
        border: `0.6px solid ${theme.palette.iceGray[200]}`,
        bgcolor: theme.palette.success['opacity-8'],
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        p: 0,
        cursor: onClick ? 'pointer' : 'default',
        font: 'inherit',
        appearance: 'none',
        boxSizing: 'border-box',
      })}
    >
      {showInlineTravel ? (
        <Stack direction="row" spacing={1} alignItems="center" px={2} pt={1} pb={2}>
          <Box
            sx={(theme) => ({
              width: 2,
              alignSelf: 'stretch',
              minHeight: 37,
              borderLeft: `2px dotted ${theme.palette.success[400]}`,
              flexShrink: 0,
            })}
          />
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={(theme) => ({
                color: theme.palette.success.main,
                display: 'flex',
                lineHeight: 0,
              })}
            >
              <DsIcon type="svg" size="sm" customIcon={<TravelCarIcon />} />
            </Box>
            <DsTypography variant="subtitle2" color="iceGray.500">
              {t('TRAVEL_TIME_MINUTES', { count: event.travelMinutes })}
            </DsTypography>
          </Stack>
        </Stack>
      ) : null}

      {showInlineTravel ? (
        <Box
          sx={(theme) => ({
            width: 1,
            borderBottom: `1px solid ${theme.palette.success['opacity-24']}`,
          })}
        />
      ) : null}

      <Stack
        spacing={fillSlot ? 0.5 : 2}
        px={2}
        pt={showInlineTravel ? 2 : fillSlot ? 0.5 : 1}
        pb={fillSlot ? 0.5 : 1}
        minHeight={0}
        flex={fillSlot ? 1 : undefined}
        overflow="hidden"
      >
        <DsTypography variant="body2_500" color="iceGray.700" noWrap>
          {event.title}
        </DsTypography>

        <Stack direction="row" spacing={2} alignItems="center" minWidth={0}>
          <DayEventIconWell>
            <Box
              sx={(theme) => ({
                color: theme.palette.success.main,
                display: 'flex',
                lineHeight: 0,
              })}
            >
              <DsIcon type="svg" size="sm" customIcon={<InPersonMeetingIcon />} />
            </Box>
          </DayEventIconWell>
          <DsTypography variant="subtitle2" color="iceGray.500" noWrap>
            {formatTimeRange(event.startMinutes, event.endMinutes)}
          </DsTypography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DayInPersonCard;
