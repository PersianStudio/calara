import { SvgIcon } from '@mui/material';

// ANCHOR: missing-ds-icon/IN_PERSON_MEETING — Calendar filter In Person Meeting group icon (25602:477793). Temporary local SVG until IceIconsEnum + DsIcon exist.
export const InPersonMeetingIcon = () => (
  <SvgIcon viewBox="0 0 20 16" sx={{ width: 20, height: 16 }}>
    {/* Left person */}
    <circle cx="3.5" cy="3.5" r="2" fill="currentColor" />
    <path fill="currentColor" d="M3.5 7C1.57 7 0 8.12 0 9.5V11h7V9.5C7 8.12 5.43 7 3.5 7Z" />
    {/* Center person (slightly larger) */}
    <circle cx="10" cy="3" r="2.5" fill="currentColor" />
    <path fill="currentColor" d="M10 7C7.79 7 6 8.34 6 10v2h8v-2c0-1.66-1.79-3-4-3Z" />
    {/* Right person */}
    <circle cx="16.5" cy="3.5" r="2" fill="currentColor" />
    <path fill="currentColor" d="M16.5 7c-1.93 0-3.5 1.12-3.5 2.5V11h7V9.5C20 8.12 18.43 7 16.5 7Z" />
    {/* Bottom bar */}
    <rect x="0" y="13" width="20" height="2" rx="1" fill="currentColor" />
  </SvgIcon>
);
