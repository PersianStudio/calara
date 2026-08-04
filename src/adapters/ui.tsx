/**
 * Minimal shared-ui stand-ins used by Materio chrome / calendar.
 */
import { Box, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import type { FC, ReactNode } from 'react';
import { FiSearch } from 'react-icons/fi';

export const routes = {
  account: '/account',
  accountProfile: '/account/profile',
  accountSettings: '/account/settings',
  login: '/login',
  home: '/',
};

export const SearchBox: FC<{ placeholder?: string; onChange?: (v: string) => void; value?: string }> = ({
  placeholder = 'Search',
  onChange,
  value,
}) => (
  <TextField
    size="small"
    fullWidth
    placeholder={placeholder}
    value={value ?? ''}
    onChange={(e) => onChange?.(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <FiSearch size={16} />
        </InputAdornment>
      ),
    }}
  />
);

export const CalendarDrawer: FC<{ open?: boolean; onClose?: () => void; children?: ReactNode }> = ({
  open,
  onClose,
  children,
}) =>
  open ? (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'rgba(0,0,0,0.35)',
        zIndex: 1300,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <Box sx={{ width: 360, bgcolor: 'background.paper', height: '100%', p: 2 }} onClick={(e) => e.stopPropagation()}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Calendar
        </Typography>
        {children}
      </Box>
    </Box>
  ) : null;

export const NotificationsDropdown: FC = () => (
  <IconButton size="small" aria-label="Notifications">
    <Box component="span" sx={{ fontSize: 18 }}>
      ●
    </Box>
  </IconButton>
);

export const CircleGoldBorder: FC<{ children?: ReactNode; size?: number }> = ({ children, size = 40 }) => (
  <Box
    sx={{
      width: size,
      height: size,
      borderRadius: '50%',
      border: '2px solid #C9A227',
      display: 'grid',
      placeItems: 'center',
      overflow: 'hidden',
    }}
  >
    {children}
  </Box>
);
