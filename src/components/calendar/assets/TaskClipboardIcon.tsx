import { SvgIcon } from '@mui/material';

// ANCHOR: missing-ds-icon/TASK_CLIPBOARD — Calendar filter Task clipboard icon (25602:477799). Temporary local SVG until IceIconsEnum + DsIcon exist.
export const TaskClipboardIcon = () => (
  <SvgIcon viewBox="0 0 16 20" sx={{ width: 16, height: 20 }}>
    {/* Clipboard body */}
    <path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2.17A3.001 3.001 0 0 0 8 0a3.001 3.001 0 0 0-2.83 2H2Zm6-0.5A1.5 1.5 0 1 1 8 4.5 1.5 1.5 0 0 1 8 1.5ZM6 3h4v2H6V3ZM2 4h2v2h8V4h2v14H2V4Z"
    />
    {/* Line 1 */}
    <rect x="3" y="9" width="10" height="1.5" rx="0.75" fill="currentColor" />
    {/* Line 2 */}
    <rect x="3" y="12" width="7" height="1.5" rx="0.75" fill="currentColor" />
    {/* Line 3 */}
    <rect x="3" y="15" width="8" height="1.5" rx="0.75" fill="currentColor" />
  </SvgIcon>
);
