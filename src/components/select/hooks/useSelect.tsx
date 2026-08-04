import { translate } from '@ice-web-app/shared-utils-ssr';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DsSelectProps, SelectOption } from '../DsSelect';

interface Props {
  options: SelectOption[];
  onChangeOptions?: (options: SelectOption[]) => void;
  addOption?: DsSelectProps['addOption'];
  onChange?: DsSelectProps['onChange'];
  multiple?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const useSelect = ({ options, addOption, onChange, multiple, setOpen, onChangeOptions }: Props) => {
  const getOptionLabel = (option: SelectOption | string) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      return option;
    }

    // Add "xxx" option created dynamically
    if (option.isExtraAdded) {
      return option.value;
    }

    // Regular option
    return typeof option.label === 'string' ? option.label : option.label?.title || '';
  };

  const handleFilterOptions = (optns, val) => {
    const filteredOptions = optns.filter((item) => {
      if (typeof item === 'string') {
        return item.toLocaleLowerCase().includes(val.inputValue.toLocaleLowerCase());
      }

      const { label: autocompleteLabel } = item;

      return typeof autocompleteLabel === 'string'
        ? autocompleteLabel.toLocaleLowerCase().includes(val.inputValue.toLocaleLowerCase())
        : autocompleteLabel?.title.toLocaleLowerCase().includes(val.inputValue.toLocaleLowerCase());
    });

    const isExisting = options.some((option) =>
      typeof option.label === 'string' ? val.inputValue === option.label : val.inputValue === option.label.title,
    );

    if (val.inputValue !== '' && !isExisting && addOption) {
      filteredOptions.push({
        value: val.inputValue,
        label: `${translate({ key: 'ADD', ns: 'common' })} "${val.inputValue}"`,
        isExtraAdded: true,
      });
    }

    if (onChangeOptions) {
      onChangeOptions(filteredOptions);
    }

    return val.inputValue ? filteredOptions : optns;
  };

  const handleOnChange = (_event, val, reason) => {
    // Handle the 'clear' action separately
    if (reason === 'clear') {
      setOpen(false); // Close the dropdown
      onChange?.(multiple ? [] : ''); // Reset the selected value(s) based on multiple mode
      return;
    }

    // Ensure onChange exists and val is not null/undefined before proceeding
    if (!onChange || !val) return;

    let newValue: any; // Variable to store the transformed value

    if (typeof val === 'string') {
      // If the value is already a string, use it directly
      newValue = val;
    } else if (multiple && Array.isArray(val)) {
      // If multiple selection is enabled and val is an array, extract the 'value' property from each object
      newValue = val.map((value) => (typeof value === 'string' ? value : value.value));
      val.forEach((item) => {
        if (typeof item !== 'string') {
          if (item.isExtraAdded && !options.some((i) => i.value === item.value)) {
            options.push({
              value: item.value,
              label: item.value,
            });
          }
        }
      });
    } else if (!Array.isArray(val)) {
      if (val.isExtraAdded) {
        options.push({
          value: val.value,
          label: val.value,
        });
      }
      // If val is a single object (not an array)
      if (val?.children?.length) {
        // If the object has children, find the selected child's value
        newValue =
          val.children.find((child) => child.value == (_event.target as any)?.getAttribute('value'))?.value ?? '';
      } else {
        // Otherwise, use the object's direct 'value' property
        newValue = val?.value;
      }
    }

    // Call onChange with the computed value
    onChange(newValue);
  };

  return { handleOnChange, getOptionLabel, handleFilterOptions };
};

export default useSelect;
