import { DsCheckbox } from '../../checkbox/DsCheckbox';
import { DsIcon } from '../../icons/DsIcon';
import { DsTypography } from '../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack } from '@mui/material';
import type { Theme } from '@mui/material';
import { FC } from 'react';
import { InPersonMeetingIcon } from '../assets/InPersonMeetingIcon';
import { ReminderClockIcon } from '../assets/ReminderClockIcon';
import { TaskClipboardIcon } from '../assets/TaskClipboardIcon';
import type { DsCalendarFilterKey, DsCalendarFilters } from '../types';

type PaletteGetter = (theme: Theme) => string;

interface FilterItem {
  id: DsCalendarFilterKey;
  labelKey: string;
  iconEl: React.ReactNode;
  iconBgColor: PaletteGetter;
  iconColor: PaletteGetter;
  checkColor: PaletteGetter;
}

const FILTER_ITEMS: FilterItem[] = [
  {
    id: 'ICE_CALLS',
    labelKey: 'ICE_CALLS',
    iconEl: <DsIcon icon="CAMERA_ON" size="sm" />,
    iconBgColor: (t) => t.palette.iceGray['opacity-16'],
    iconColor: (t) => t.palette.iceGray[500],
    checkColor: (t) => t.palette.iceGray[500],
  },
  {
    id: 'IN_PERSON_MEETINGS',
    labelKey: 'IN_PERSON_MEETINGS',
    iconEl: <InPersonMeetingIcon />,
    iconBgColor: (t) => t.palette.success.lightOpacity as string,
    iconColor: (t) => t.palette.success.main,
    checkColor: (t) => (t.palette.success[400] as string) ?? t.palette.success.main,
  },
  {
    id: 'TASKS',
    labelKey: 'TASKS',
    iconEl: <TaskClipboardIcon />,
    iconBgColor: (t) => t.palette.primary.lightOpacity as string,
    iconColor: (t) => t.palette.primary.main,
    checkColor: (t) => (t.palette.primary[400] as string) ?? t.palette.primary.main,
  },
  {
    id: 'REMINDERS',
    labelKey: 'REMINDERS',
    iconEl: <ReminderClockIcon />,
    iconBgColor: (t) => t.palette.warning.lightOpacity as string,
    iconColor: (t) => t.palette.warning.main,
    checkColor: (t) => (t.palette.warning[400] as string) ?? t.palette.warning.main,
  },
];

export interface DsCalendarFilterListProps {
  value: DsCalendarFilters;
  onChange: (id: DsCalendarFilterKey, checked: boolean) => void;
}

const DsCalendarFilterList: FC<DsCalendarFilterListProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={4} width={1}>
      <DsTypography variant="body2" color="iceGray.500">
        {t('MY_CALENDAR')}
      </DsTypography>

      <Stack spacing={4} width={1}>
        {FILTER_ITEMS.map((item) => (
          <Stack key={item.id} direction="row" alignItems="center" justifyContent="space-between" width={1}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={(theme) => ({
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  bgcolor: item.iconBgColor(theme),
                  color: item.iconColor(theme),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  flexShrink: 0,
                })}
              >
                {item.iconEl}
              </Box>
              <DsTypography variant="body2" color="iceGray.700" noWrap>
                {t(item.labelKey)}
              </DsTypography>
            </Stack>

            <DsCheckbox
              value={value[item.id] ?? false}
              onChange={(_, val) => onChange(item.id, val)}
              sx={(theme) => ({
                color: item.checkColor(theme),
                '&.Mui-checked': { color: item.checkColor(theme) },
                p: '4px 8px 4px 4px',
              })}
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default DsCalendarFilterList;
