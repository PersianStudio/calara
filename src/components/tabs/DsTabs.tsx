import { useSearchQuery } from '@ice-web-app/shared-hooks';
import { Tab, TabProps, Tabs, TabsProps } from '@mui/material';
import { FC, SyntheticEvent, useLayoutEffect } from 'react';

export interface DsTabsProps extends TabsProps {
  items: TabProps[];
  iconPosition?: 'bottom' | 'top' | 'end' | 'start';
  paramName?: string;
  clickable?: boolean;
  type: 'filled' | 'flat' | 'tonal';
}

export const DsTabs: FC<DsTabsProps> = ({
  items,
  iconPosition,
  paramName,
  variant = 'scrollable',
  clickable = true,
  type = 'flat',
  ...props
}) => {
  const { searchParams, setSearchParams } = useSearchQuery();
  useLayoutEffect(() => {
    if (paramName && !searchParams[paramName]) {
      setSearchParams({ ...searchParams, [paramName]: items[0].value });
    }
  }, []);
  return (
    <Tabs
      allowScrollButtonsMobile
      variant={variant}
      scrollButtons="auto"
      className={`${type} ${props.centered ? 'centered' : ''}`}
      value={paramName ? searchParams[paramName] || items[0].value : props.value}
      TabIndicatorProps={{ className: type }}
      {...props}
      onChange={(event: SyntheticEvent, value: any) => {
        if (props.onChange) props.onChange(event, value);
        if (paramName) setSearchParams({ ...searchParams, [paramName]: value });
      }}
    >
      {items?.map(({ label, sx, ...tab }) => (
        <Tab
          className={`${type} ${items.length === 1 && 'singleItem'}`}
          key={tab.value}
          value={tab.value}
          sx={{ ...sx, ...(!clickable && { pointerEvents: 'none' }) }}
          label={label}
          iconPosition={iconPosition || 'start'}
          {...tab}
        />
      ))}
    </Tabs>
  );
};
