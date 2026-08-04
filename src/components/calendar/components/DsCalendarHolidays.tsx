import { DsButton } from '../../buttons/DsButton';
import { DsIcon } from '../../icons/DsIcon';
import { DsTypography } from '../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Stack } from '@mui/material';
import { FC, useState } from 'react';

export interface Holiday {
  id: string;
  label: string;
}

export interface DsCalendarHolidaysProps {
  /** API-sourced holidays only. Empty / omitted → section renders nothing. */
  holidays?: Holiday[];
}

const COLLAPSED_COUNT = 2;

/**
 * Figma `25602:477775` — holiday list. No demo fixtures — pass API data via `holidays`.
 */
const DsCalendarHolidays: FC<DsCalendarHolidaysProps> = ({ holidays = [] }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  if (holidays.length === 0) {
    return null;
  }

  const displayed = expanded ? holidays : holidays.slice(0, COLLAPSED_COUNT);

  return (
    <Stack spacing={1} width={1}>
      {displayed.map((h) => (
        <Box
          key={h.id}
          sx={(theme) => ({
            width: 1,
            borderRadius: '4px',
            bgcolor: theme.palette.iceGray['opacity-8'],
            py: '4px',
          })}
        >
          <Box sx={{ px: '12px', py: '4px' }}>
            <DsTypography variant="body3_500" color="iceGray.700" noWrap sx={{ display: 'block' }}>
              {h.label}
            </DsTypography>
          </Box>
        </Box>
      ))}

      <DsButton
        variant="text"
        color="primary"
        size="small"
        onClick={() => setExpanded((v) => !v)}
        startIcon={<DsIcon icon={expanded ? 'CHEVRON_UP' : 'CHEVRON_DOWN'} size="sm" color="primary.main" />}
        sx={{ alignSelf: 'flex-start', pl: 0, minWidth: 'auto' }}
      >
        <DsTypography variant="caption" color="primary.main">
          {expanded ? t('SHOW_LESS') : t('SHOW_MORE')}
        </DsTypography>
      </DsButton>
    </Stack>
  );
};

export default DsCalendarHolidays;
