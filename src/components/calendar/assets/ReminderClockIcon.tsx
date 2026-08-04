import { SvgIcon } from '@mui/material';

// ANCHOR: missing-ds-icon/REMINDER_CLOCK — Calendar filter Reminder alarm clock icon (25602:477805). Temporary local SVG until IceIconsEnum + DsIcon exist.
export const ReminderClockIcon = () => (
  <SvgIcon viewBox="0 0 20 20" sx={{ width: 20, height: 20 }}>
    {/* Alarm bell ears */}
    <path fill="currentColor" d="M2.5 4.5 4 6l1.06-1.06L3.56 3.44 2.5 4.5ZM15 6l1.5-1.5-1.06-1.06-1.5 1.5L15 6Z" />
    {/* Clock face */}
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a7 7 0 1 0 0 14A7 7 0 0 0 10 2Zm0 1.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z"
    />
    {/* Clock hands */}
    <path fill="currentColor" d="M10.75 5.5h-1.5V9.69l3.22 1.93.76-1.26-2.48-1.49V5.5Z" />
    {/* Checkmark badge bottom-right */}
    <circle cx="15.5" cy="15.5" r="3.5" fill="currentColor" />
    <path
      d="M14 15.5l1 1 2.5-2.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </SvgIcon>
);
