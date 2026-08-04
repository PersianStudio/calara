import { Box, ClickAwayListener, Popper, Stack } from '@mui/material';
import { FC, HTMLAttributes, useState } from 'react';
import { DsIcon } from '../../icons/DsIcon';
import { DsTypography } from '../../typography/DsTypography';
import { SelectOption } from '../DsSelect';

interface Props {
  props: HTMLAttributes<HTMLLIElement>;
  option: SelectOption;
  value: string | string[] | undefined;
  selected: boolean;
}

const GroupOption: FC<Props> = ({ props, option, value, selected }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClose}>
        <li
          {...props}
          id={option.isExtraAdded ? 'ds-select-add-option' : props.id}
          aria-selected={!!option.children?.find((child) => child.value === value)}
          key={typeof option.label === 'string' ? option.label : option.label.title}
          onClick={handleClick}
          onMouseEnter={handleClick}
          onMouseLeave={handleClose}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: 1 }}>
            <DsTypography variant={selected ? 'body1_500' : 'body1'} color={selected ? 'primary.600' : 'iceGray.700'}>
              {typeof option.label === 'string' ? option.label : option.label.title}
            </DsTypography>
            <DsIcon size="md" icon="CHEVRON_RIGHT" />
          </Stack>
          <Popper
            open={open}
            anchorEl={anchorEl}
            placement="right"
            sx={{
              marginLeft: '-2px !important',
              zIndex: 10000,
              bgcolor: ({ palette }) => palette.primary['opacity-16'],
              // boxShadow: 'var(--mui-customShadows-lg)',
              boxShadow: 'none !important',
              borderRadius: '6px',
            }}
          >
            <ul className="MuiAutocomplete-listbox" style={{ padding: '8px 0px' }}>
              {option.children?.map((child) => (
                <Box
                  component="li"
                  {...props}
                  key={typeof child.label === 'string' ? child.label : child.label.title}
                  sx={{
                    padding: '0.5rem 1.25rem',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: ({ palette }) => palette.action.hover,
                    },
                    color: ({ palette }) => palette.iceGray[700],
                    fontSize: '0.875rem',
                    fontWeight: child.value === value ? 500 : 400,
                    ...(child.value === value && {
                      bgcolor: ({ palette }) => palette.primary['opacity-32'],
                      color: ({ palette }) => palette.primary.main,
                    }),
                  }}
                  className="MuiAutocomplete-option"
                  value={child.value}
                >
                  {typeof child.label === 'string' ? child.label : child.label.title}
                </Box>
              ))}
            </ul>
          </Popper>
        </li>
      </ClickAwayListener>
    </>
  );
};
export default GroupOption;
