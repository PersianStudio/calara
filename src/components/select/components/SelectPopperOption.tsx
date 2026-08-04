import { Checkbox, CircularProgress, Stack } from '@mui/material';
import { FC, HTMLAttributes, MouseEvent, useState } from 'react';
import { DsAvatar } from '../../avatar/DsAvatar';
import { DsIcon } from '../../icons/DsIcon';
import { DsTypography } from '../../typography/DsTypography';
import { DsSelectProps, SelectOption } from '../DsSelect';
import GroupOption from './GroupOption';

interface Props extends HTMLAttributes<HTMLLIElement> {
  option: string | SelectOption;
  selected: boolean;
  type?: DsSelectProps['type'];
  value: DsSelectProps['value'];
  onAddOptionClick: DsSelectProps['onAddOptionClick'];
}

const SelectPopperOption: FC<Props> = ({ option, selected, type, value, onClick, onAddOptionClick, ...props }) => {
  const [loading, setLoading] = useState(false);

  if (typeof option === 'string') return;

  const handleOnClick = async (e: MouseEvent<HTMLLIElement>) => {
    if (loading) return;

    // Store the currentTarget reference before any async operation
    // since React might clear it before it's accessed later.
    const currentTarget = e.currentTarget;

    // Check if the option has an "extra added" property, which requires special handling.
    if (option.isExtraAdded && onAddOptionClick) {
      // Ensure the async function "onAddOptionClick" exists before calling it.
      setLoading(true);
      try {
        // Await the asynchronous callback function that handles adding an extra option.
        await onAddOptionClick(option);

        // Reassign the currentTarget to prevent it from being null (React nullifies it after async calls).
        e.currentTarget = currentTarget;

        // Call the optional onClick handler if it exists.
        onClick?.(e);
      } catch (error) {
        // Log any errors that occur during the async operation.
        console.error('Error in onAddOptionClick:', error);
      } finally {
        setLoading(false);
      }
    } else {
      // If the option does not require extra handling, directly invoke the onClick handler (if provided).
      onClick?.(e);
    }
  };

  if (type !== 'checkbox' && option?.children?.length) {
    return (
      <GroupOption {...{ props: { onClick: handleOnClick, ...props }, option }} selected={selected} value={value} />
    );
  }

  return !option.hidden ? (
    <li
      {...props}
      id={option.isExtraAdded ? 'ds-select-add-option' : props.id}
      style={{
        ...(loading && {
          cursor: 'not-allowed',
          opacity: 0.5,
          ...props.style,
        }),
      }}
      onClick={handleOnClick}
      key={typeof option.label === 'string' ? option.label : option.label?.title}
    >
      <Stack justifyContent="space-between" direction="row" alignItems="center" width="100%">
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            ...(type === 'multi-outlined' &&
              selected && {
                opacity: 0.5,
              }),
            ...(type === 'checkbox' && {
              '& .MuiCheckbox-root': {
                px: '0 !important',
              },
            }),
          }}
        >
          {type === 'checkbox' && (
            <Checkbox
              key={typeof option.label === 'string' ? option.label : option.label.title}
              checked={selected}
              className="mie-2"
              size="small"
            />
          )}
          {option.avatar && (
            <DsAvatar
              textVariant="body2_500"
              size={36}
              {...option.avatar}
              alt={typeof option.label === 'string' ? option.label : option.label.title || ''}
            />
          )}
          <Stack spacing={1}>
            {typeof option.label === 'string' ? (
              <DsTypography
                variant={selected ? 'body2_500' : 'body2'}
                color={selected ? 'primary.500' : 'iceGray.700'}
                noWrap
              >
                {option.label}
              </DsTypography>
            ) : (
              <>
                <DsTypography variant="body1_500" color={selected ? 'primary.500' : 'iceGray.700'}>
                  {option.label?.title}
                </DsTypography>
                <DsTypography variant="subtitle2" color="iceGray.500">
                  {option.label?.subTitle}
                </DsTypography>
              </>
            )}
          </Stack>
        </Stack>

        {!loading && selected && type !== 'checkbox' && typeof option.label !== 'string' && (
          <DsIcon icon="CHECK" color="iceGray.700" />
        )}

        {loading && <CircularProgress size={20} />}
      </Stack>
    </li>
  ) : undefined;
};

export default SelectPopperOption;
