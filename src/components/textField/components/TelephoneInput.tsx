import { useTranslation } from '@ice-web-app/shared-hooks';
import { callApi } from '@ice-web-app/shared-hooks';
import { formatPhoneNumber } from '@ice-web-app/shared-utils';
import { toast } from '@ice-web-app/shared-utils';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { CountryCode } from '../../../types';
import CustomTextField, { CustomTextFieldProps } from './CustomTextField';
import TelephoneInputPrefix from './TelephoneInputPrefix';

interface TelephoneInputProps extends Omit<CustomTextFieldProps, 'endAdornment' | 'startAdornment'> {}

const TelephoneInput: FC<TelephoneInputProps> = ({
  dsTextFieldProps,
  dsTextFieldExtraProps,
  controlledValue,
  setControlledValue,
}) => {
  const { t } = useTranslation();

  const { value, defaultValue, onChange } = dsTextFieldProps;

  const [countriesLoading, setCountriesLoading] = useState(false);
  const [country, setCountry] = useState<CountryCode>({
    abbreviation: 'GB',
    name: 'UNITED_KINGDOM',
    code: '44',
  });
  const [countries, setCountries] = useState<CountryCode[] | undefined>([
    { abbreviation: 'GB', name: 'UNITED_KINGDOM', code: '44' },
  ]);

  const getData = () => {
    setCountriesLoading(true);
    callApi({
      endpoint: '/registration/csv/required-fields',
      method: 'GET',
      query: {
        ecosystem: dsTextFieldExtraProps.ecosystem,
      },
    })
      .then((res) => {
        const items = (res?.countryCodes || []).map((item) => ({
          name: t(item.name),
          code: item.code,
          abbreviation: item.abbreviation,
          ...(item.id ? { id: item.id } : {}),
        }));
        setCountries(items);
        setCountriesLoading(false);
      })
      .catch((err: Error) => {
        setCountriesLoading(false);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // find country with form value phone number
  const handleFindCountry = (phoneNumber: string) =>
    countries?.find(
      (countryVal) =>
        formatPhoneNumber({ code: countryVal?.code }).code === formatPhoneNumber({ formValue: phoneNumber }).code ||
        country,
    );

  // change state of value when props state changes and update country
  useEffect(() => {
    if (value) {
      if (value.toString() !== country.code.toString()) {
        setControlledValue(formatPhoneNumber({ formValue: value as string }).phone);
      }
      const selectedCountry = handleFindCountry(value as string);
      if (selectedCountry) {
        setCountry(selectedCountry);
      }
    }
  }, [value]);

  // format default value and update value and country state
  useEffect(() => {
    if (defaultValue) {
      const phoneNumObj = formatPhoneNumber({ formValue: defaultValue.toString() });
      setControlledValue(phoneNumObj.phone);

      const selectedCountry = handleFindCountry(phoneNumObj.formValue);
      if (selectedCountry) {
        setCountry(selectedCountry);
      }
    }
  }, []);

  // update value state each time that country changes
  useEffect(() => {
    if (controlledValue) {
      const phone = formatPhoneNumber({ formValue: controlledValue as string }).phone;
      setControlledValue(phone);

      if (onChange) {
        onChange({
          target: {
            value: phone ? formatPhoneNumber({ code: country.code, phone }).formValue : '',
          },
        } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
      }
    }
  }, [country]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const inputValue = e.target.value;

    // Only allow valid phone number characters (digits and possibly spaces, hyphens, etc.)
    const isNumeric = /^[0-9\s\-()]*$/.test(inputValue);

    // Proceed if the input is valid (either numeric or phone number format)
    if (isNumeric || inputValue === '') {
      const formattedPhone = formatPhoneNumber({ code: country.code, phone: inputValue }).formValue;
      const phone = formatPhoneNumber({ code: country.code, phone: inputValue }).phone;
      setControlledValue(phone);

      if (onChange) {
        onChange({
          target: {
            value: phone ? formattedPhone : '',
          },
        } as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
      }
    }
  };

  return (
    <CustomTextField
      dsTextFieldProps={{
        ...dsTextFieldProps,
        type: 'tel',
        onChange: handleOnChange,
        // real value of input with country code
        value: controlledValue
          ? formatPhoneNumber({ phone: controlledValue as string, code: country.code }).formValue
          : '',
        InputProps: {
          ...dsTextFieldProps.InputProps,
          // value to be displayed in input without country code
          value: formatPhoneNumber({ phone: controlledValue as string }).phone || '',
        },
      }}
      dsTextFieldExtraProps={dsTextFieldExtraProps}
      controlledValue={controlledValue}
      setControlledValue={setControlledValue}
      startAdornment={
        <TelephoneInputPrefix
          countriesLoading={countriesLoading}
          countries={countries || []}
          setCountry={setCountry}
          size={dsTextFieldProps.size}
          disabled={dsTextFieldProps.disabled}
        />
      }
    />
  );
};

export default TelephoneInput;
