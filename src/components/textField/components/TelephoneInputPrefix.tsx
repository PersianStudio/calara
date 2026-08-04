import { useTranslation } from '@ice-web-app/shared-hooks';
import { Box, CircularProgress, MenuItem, Select, Stack, TextFieldPropsSizeOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import React, { FC } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { CountryCode } from '../../../types';
import { DsIcon } from '../../icons/DsIcon';

interface Props {
  countries: CountryCode[];
  countriesLoading: boolean;
  disabled?: boolean;
  setCountry: React.Dispatch<CountryCode>;
  size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

const TelephoneInputPrefix: FC<Props> = ({ countriesLoading, countries, setCountry, size, disabled }) => {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Select
        disabled={disabled}
        MenuProps={{
          style: {
            width: 'fit-content !important',
            top: '12px',
            left: '-45px',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        sx={{
          width: 'max-content',
          backgroundColor: 'transparent',
          p: '0 !important',
          // Remove default outline (display only on focus)
          fieldset: {
            display: 'none',
          },
          '&.MuiInputBase-root': {
            '& .MuiOutlinedInput-input': {
              pr: '0px !important',
            },
            '&.MuiOutlinedInput-root': {
              pr: '0px !important',
              pl: '0px !important',
            },
          },
          '&.Mui-focused:has(div[aria-expanded="false"])': {
            fieldset: {
              display: 'none',
            },
          },
          // Update default spacing
          '.MuiSelect-select': {
            padding: '0px',
          },
        }}
        defaultValue={0}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        IconComponent={() => null}
        onChange={(e) => e.target.value && setCountry(countries[Number(e.target.value)])}
        renderValue={(value) =>
          countriesLoading ? (
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={16} />
            </Box>
          ) : (
            <Stack
              direction={'row'}
              gap={2}
              display={'flex'}
              alignItems={'center'}
              key={countries[Number(value)].abbreviation}
            >
              <ReactCountryFlag
                countryCode={countries[Number(value)].abbreviation}
                svg
                style={{ width: '20px', borderRadius: '3px', fontSize: '12px' }}
                title={countries[Number(value)].name}
              />
              +{countries[Number(value)].code}
              {open ? <DsIcon icon="CHEVRON_UP" size="sm" /> : <DsIcon icon="CHEVRON_DOWN" size="sm" />}
            </Stack>
          )
        }
      >
        {countries?.map((c, index) => {
          return (
            <MenuItem key={index} value={index}>
              <Box component="div" key={c.abbreviation}>
                <ReactCountryFlag
                  countryCode={c.abbreviation}
                  svg
                  style={{ width: '20px', marginRight: '12px', borderRadius: '3px' }}
                  title={c.name}
                />
                {t(c.name)} ({c.abbreviation}) +{c.code}
              </Box>
            </MenuItem>
          );
        })}
      </Select>
      <Box
        sx={{
          borderRight: 1,
          borderColor: 'grey.300',
          pr: '8px',
          mr: '16px',
          height: size === 'small' ? '20px' : '28px',
        }}
      />
    </>
  );
};

export default TelephoneInputPrefix;
