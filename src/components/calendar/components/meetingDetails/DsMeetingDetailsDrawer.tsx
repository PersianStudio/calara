import { DsButton } from '../../../buttons/DsButton';
import { DsController } from '../../../formController/DsController';
import { DsDatePicker } from '../../../datePicker/DsDatePicker';
import { DsDrawer } from '../../../drawer/DsDrawer';
import { DsForm } from '../../../formController/DsForm';
import { DsIcon } from '../../../icons/DsIcon';
import { DsSelect } from '../../../select/DsSelect';
import { DsTextField } from '../../../textField/DsTextField';
import { DsTypography } from '../../../typography/DsTypography';
import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, Divider, Stack } from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { CalendarMeetingDetails } from './meetingDetailsTypes';

export interface MeetingDetailsFormValue {
  meetingTitle: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  travelMinutes: string;
}

export interface DsMeetingDetailsDrawerProps {
  open: boolean;
  meeting: CalendarMeetingDetails | null;
  onClose: () => void;
  /** Persist the edited meeting. Calendar meetings have their own API, separate from ICE Call events. */
  onSave: (values: MeetingDetailsFormValue) => void;
}

const TRAVEL_MINUTE_OPTIONS = [5, 15, 30, 45, 60];

/**
 * Calendar meeting drawer (Figma `25618:480934`).
 *
 * Calendar meetings are edited **in place** here — the fields are live inputs and the
 * footer action saves them. It is not a read-only preview, and it must not hand off to
 * the ICE Call `CreateAndEditEventDrawer`, which targets a different API.
 */
const DsMeetingDetailsDrawer: FC<DsMeetingDetailsDrawerProps> = ({ open, meeting, onClose, onSave }) => {
  const { t } = useTranslation();

  const form = useForm<MeetingDetailsFormValue>();

  useEffect(() => {
    if (!open || !meeting) return;
    form.reset({
      meetingTitle: meeting.title,
      date: meeting.date,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      location: meeting.location ?? '',
      travelMinutes: meeting.travelMinutes != null ? String(meeting.travelMinutes) : '',
    });
  }, [open, meeting]);

  const travelOptions = useMemo(() => {
    const minutes = [...TRAVEL_MINUTE_OPTIONS];
    // Keep the meeting's own value selectable even when it is not one of the presets.
    if (meeting?.travelMinutes != null && !minutes.includes(meeting.travelMinutes)) {
      minutes.push(meeting.travelMinutes);
      minutes.sort((a, b) => a - b);
    }
    return minutes.map((value) => ({
      value: String(value),
      label: t('MINUTES_COUNT', { count: value }),
    }));
  }, [meeting?.travelMinutes, t]);

  const content = (
    <DsForm onSubmit={form.handleSubmit(onSave)} fullWidth>
      <Stack spacing={5}>
        <Box width="100%">
          <DsController name="meetingTitle" rules={{ required: true }} control={form.control}>
            <DsTextField
              size="medium"
              fullWidth
              label={t('ENTER_LABEL', { label: t('MEETING_LABEL', { label: t('TITLE') }) })}
              placeholder={t('ENTER_LABEL', { label: t('MEETING_LABEL', { label: t('TITLE') }) })}
            />
          </DsController>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <Box minWidth={224}>
            <DsController name="date" rules={{ required: true }} control={form.control}>
              <DsDatePicker
                inputSize="medium"
                dateFormat="dd MMM yyyy"
                placeholderText="DD MMM YYYY"
                minDate={new Date()}
              />
            </DsController>
          </Box>
          <Stack direction="row">
            <Box width={{ xs: '100%', md: '50%' }}>
              <DsController name="startTime" rules={{ required: true }} control={form.control}>
                <DsDatePicker
                  inputSize="medium"
                  dateFormat="h:mm a"
                  placeholderText="hh:mm"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                />
              </DsController>
            </Box>

            <Stack minWidth={24} alignItems="center" direction="row" justifyContent="center">
              <Divider
                orientation="horizontal"
                sx={{
                  width: 10,
                  m: 0,
                  borderColor: ({ palette }) => palette.iceGray[700],
                }}
              />
            </Stack>

            <Box width={{ xs: '100%', md: '50%' }}>
              <DsController name="endTime" rules={{ required: true }} control={form.control}>
                <DsDatePicker
                  inputSize="medium"
                  dateFormat="h:mm a"
                  placeholderText="hh:mm"
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                />
              </DsController>
            </Box>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={5} justifyContent="space-between">
          <Box width={{ xs: '100%', md: '50%' }}>
            <DsController name="location" control={form.control}>
              <DsTextField size="medium" fullWidth label={t('LOCATION')} />
            </DsController>
          </Box>
          <Box width={{ xs: '100%', md: '50%' }}>
            <DsController name="travelMinutes" control={form.control}>
              <DsSelect size="medium" fullWidth disableClearable label={t('TRAVEL_TIME')} options={travelOptions} />
            </DsController>
          </Box>
        </Stack>
      </Stack>
    </DsForm>
  );

  return (
    <DsDrawer
      size="md"
      open={open}
      onClose={onClose}
      content={content}
      dialogContentProps={{ sx: { pt: 7 } }}
      header={
        <Stack direction="row" alignItems="center" spacing={4} minWidth={0} flex={1} pr={2}>
          <DsButton size="small" justIcon variant="text" color="secondary" aria-label={t('BACK')} onClick={onClose}>
            <DsIcon icon="ARROW_LEFT" size="lg" color="iceGray.700" />
          </DsButton>
          <DsTypography variant="h5" fontWeight={600} color="iceGray.700" noWrap>
            {meeting?.title ?? t('MEETING')}
          </DsTypography>
        </Stack>
      }
      footer={
        <DsButton variant="contained" color="primary" size="small" fullWidth onClick={form.handleSubmit(onSave)}>
          {t('EDIT')}
        </DsButton>
      }
    />
  );
};

export default DsMeetingDetailsDrawer;
