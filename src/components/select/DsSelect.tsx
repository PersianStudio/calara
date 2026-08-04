import { translate } from '@ice-web-app/shared-utils-ssr';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompletePropsSizeOverrides,
  CircularProgress,
  SxProps,
  TextFieldPropsColorOverrides,
  Theme,
  UseAutocompleteProps,
} from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { DsAvatarProps } from '../avatar/DsAvatar';
import { DsIcon } from '../icons/DsIcon';
import SelectInput from './components/SelectInput';
import SelectPopperOption from './components/SelectPopperOption';
import Tag from './components/Tag';
import useSelect from './hooks/useSelect';

export interface SelectOption {
  value: string;
  label: string | { title: string; subTitle?: string };
  avatar?: DsAvatarProps;
  hidden?: boolean;
  isExtraAdded?: boolean;
  children?: {
    value: string;
    label: string | { title: string; subTitle?: string };
    avatar?: DsAvatarProps;
  }[];
}

export interface DsSelectProps {
  type?: 'standard' | 'checkbox' | 'multi' | 'multi-outlined';
  children?: ReactNode;
  placeholder?: string;
  options: Omit<SelectOption, 'isExtraAdded'>[];
  searchedOptions?: Omit<SelectOption, 'isExtraAdded'>[];
  id?: string;
  label?: string;
  color?: OverridableStringUnion<
    'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning',
    TextFieldPropsColorOverrides
  >;
  formHelperText?: string;
  limitTags?: number;
  onChange?: (val: string | string[]) => void;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
  value?: string | string[];
  disabled?: boolean;
  size?: OverridableStringUnion<'small' | 'medium', AutocompletePropsSizeOverrides>;
  required?: boolean;
  loading?: boolean;
  disableClearable?: boolean;
  sx?: SxProps<Theme>;
  addOption?: boolean;
  optionAll?: {
    label: string;
    value?: string;
  };
  noArrowDown?: boolean;
  noBorder?: boolean;
  inputValue?: string;
  clearOnBlur?: boolean;
  onInputChange?: UseAutocompleteProps<string | SelectOption, boolean, boolean, boolean>['onInputChange'];
  onChangeOptions?: (options: SelectOption[]) => void;
  onAddOptionClick?: (option: SelectOption) => Promise<void>;
  prefixIcon?: {
    icon: ReactNode;
    onClick?: VoidFunction;
    disabled?: boolean;
  };
  onOpen?: () => void;
  onClose?: () => void;
  ListboxProps?: React.HTMLAttributes<HTMLUListElement>;
  slotProps?: AutocompleteProps<string | SelectOption, boolean, boolean, boolean>['slotProps'];
  disableClientFilter?: boolean; // Disable client-side filtering when server-side filtering is used
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: SelectOption | string,
    state: { selected: boolean },
  ) => ReactNode;
  renderTags?: (
    tagValue: (SelectOption | string)[],
    getTagProps: (params: { index: number }) => Record<string, unknown>,
  ) => ReactNode;
}

export const DsSelect: FC<DsSelectProps> = ({
  type = 'standard',
  placeholder = translate({ key: 'SELECT_OPTION', ns: 'common' }),
  options,
  searchedOptions,
  color,
  id,
  addOption = false,
  optionAll,
  label,
  onChange,
  helperText,
  error = false,
  className,
  fullWidth = true,
  value,
  prefixIcon,
  disabled = false,
  size = 'large',
  required = false,
  loading = false,
  formHelperText = '',
  disableClearable = false,
  noArrowDown = false,
  noBorder = false,
  onChangeOptions,
  onAddOptionClick,
  inputValue,
  onInputChange,
  sx,
  clearOnBlur,
  onOpen: onOpenCallback,
  onClose: onCloseCallback,
  ListboxProps,
  slotProps,
  disableClientFilter = false,
  renderOption: customRenderOption,
  renderTags: customRenderTags,
  ...props
}) => {
  const multiple = type === 'checkbox' || type === 'multi' || type === 'multi-outlined';
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    onOpenCallback?.();
  };

  const handleClose = () => {
    setOpen(false);
    onCloseCallback?.();
  };

  const optionsList = searchedOptions?.length ? searchedOptions : options;

  // Process options into flat array
  const processOptions = (nodes: SelectOption[], hidden?: boolean): Omit<SelectOption, 'isExtraAdded'>[] => {
    const result: Omit<SelectOption, 'isExtraAdded'>[] = [];
    nodes.forEach((node) => {
      result.push({
        label: node.label,
        value: node.value,
        avatar: node?.avatar,
        children: node.children,
        hidden,
        ...((node as any).contact && { contact: (node as any).contact }), // Preserve contact if exists
      });
      if (node.children) {
        result.push(...processOptions(node.children, true));
      }
    });
    return result;
  };

  // Memoize processed options to prevent unnecessary recalculations
  const processedOptions = useMemo(() => {
    return processOptions([
      ...(optionAll
        ? [
            {
              label: optionAll.label,
              value: optionAll.value || '',
            },
          ]
        : []),
      ...optionsList,
    ]);
  }, [optionAll, optionsList, processOptions]);

  const { getOptionLabel, handleFilterOptions, handleOnChange } = useSelect({
    options: optionsList,
    addOption,
    onChange,
    multiple,
    setOpen,
    onChangeOptions,
  });

  return (
    <Autocomplete
      id={id}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      loading={loading}
      ListboxProps={ListboxProps}
      slotProps={slotProps}
      options={processedOptions}
      multiple={multiple}
      disabled={disabled}
      inputValue={inputValue}
      onInputChange={(e, val, reason) => {
        onInputChange?.(e, val, reason);
      }}
      clearOnBlur={clearOnBlur}
      getOptionLabel={getOptionLabel}
      filterOptions={
        disableClientFilter
          ? (options, state) => {
              // When client filter is disabled, still handle addOption if needed
              if (addOption && state.inputValue) {
                const isExisting = options.some((option) => {
                  if (typeof option === 'string') {
                    return state.inputValue === option;
                  }
                  return typeof option.label === 'string'
                    ? state.inputValue === option.label
                    : state.inputValue === option.label.title;
                });
                if (!isExisting) {
                  return [
                    ...options,
                    {
                      value: state.inputValue,
                      label: `${translate({ key: 'ADD', ns: 'common' })} "${state.inputValue}"`,
                      isExtraAdded: true,
                    },
                  ];
                }
              }
              return options;
            }
          : handleFilterOptions
      }
      renderOption={
        customRenderOption
          ? customRenderOption
          : (props, option, { selected }) => {
              const { key, ...otherProps } = props;
              return (
                <SelectPopperOption
                  key={key}
                  option={option}
                  type={type}
                  value={value}
                  selected={selected}
                  onAddOptionClick={onAddOptionClick}
                  {...otherProps}
                />
              );
            }
      }
      disableCloseOnSelect={multiple}
      size={size}
      clearIcon={<DsIcon icon="CLOSE" color="iceGray.700" sx={{ '&:hover': { bgcolor: 'unset !important' } }} />}
      popupIcon={
        loading ? (
          <CircularProgress size={size === 'small' ? 15 : 18} color="primary" />
        ) : noArrowDown ? undefined : (
          <DsIcon size="sm" icon="CHEVRON_DOWN" color="iceGray.700" />
        )
      }
      disableClearable={disableClearable}
      onChange={(_event, val, reason) => {
        handleOnChange(_event, val, reason);
      }}
      value={
        multiple
          ? Array.isArray(value)
            ? processedOptions.filter(({ value: val }) => value?.includes(val as never))
            : []
          : processedOptions.find(({ value: val }) => val === value) || null
      }
      renderInput={({ InputProps, ...params }) => {
        return (
          <SelectInput
            label={label}
            color={color}
            helperText={formHelperText ? formHelperText : helperText}
            error={error}
            placeholder={(Array.isArray(value) && !value?.length) || !value ? placeholder : ''}
            params={params}
            size={size}
            InputProps={InputProps}
            prefixIcon={prefixIcon}
          />
        );
      }}
      renderTags={
        customRenderTags
          ? (tagValue, getTagProps) =>
              customRenderTags(tagValue, getTagProps as (params: { index: number }) => Record<string, unknown>)
          : (tagValue, getTagProps) =>
              tagValue.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Tag option={option} type={type} key={key} tagsProps={tagProps} />;
              })
      }
      sx={{
        ...(noBorder && {
          '& .MuiOutlinedInput-notchedOutline': { border: 'none !important' },
        }),
        ...sx,
      }}
      {...props}
      selectOnFocus={addOption}
      handleHomeEndKeys={addOption}
      freeSolo={addOption}
    />
  );
};
