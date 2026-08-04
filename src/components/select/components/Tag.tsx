import { Box, Chip } from '@mui/material';
import { FC } from 'react';
import { DsAvatar } from '../../avatar/DsAvatar';
import { DsIcon } from '../../icons/DsIcon';
import { DsSelectProps, SelectOption } from '../DsSelect';

interface Props {
  type?: DsSelectProps['type'];
  option: SelectOption | string;
  tagsProps?: any;
}

const Tag: FC<Props> = ({ type, option, tagsProps }) => {
  return (
    <Chip
      sx={{
        ...(type === 'multi-outlined' && {
          border: (theme) => `${theme.palette.iceGray[600]} solid 1px`,
          minHeight: 20,
          p: 1,
          bgcolor: 'transparent',
        }),
      }}
      icon={
        typeof option !== 'string' && option.avatar ? (
          <DsAvatar
            alt={typeof option.label === 'string' ? option.label : option.label.title}
            src={option?.avatar?.src}
            textSx={{ fontSize: 8 }}
            size={16}
          />
        ) : undefined
      }
      deleteIcon={
        type === 'multi-outlined' ? (
          <Box
            sx={{
              p: 1,
              height: 16,
              width: 16,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <DsIcon icon="CLOSE_SMALL" color="action.active" size="xs" />
          </Box>
        ) : undefined
      }
      label={typeof option === 'string' ? option : typeof option.label === 'string' ? option.label : option.label.title}
      {...tagsProps}
      size="small"
    />
  );
};

export default Tag;
