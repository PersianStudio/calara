/**
 * Filter checkbox list for the sidebar / drawer.
 */

import { FC } from 'react';
import {
  DS_CALENDAR_FILTER_OPTIONS,
  type DsCalendarFilterKey,
  type DsCalendarFilters,
} from '../../../types/calendar';

export interface FilterListProps {
  filters: DsCalendarFilters;
  onFilterChange: (id: DsCalendarFilterKey, checked: boolean) => void;
}

export const DsCalendarFilterList: FC<FilterListProps> = ({ filters, onFilterChange }) => (
  <div>
    <h3>Calendar items</h3>
    <div className="calara-filter-list">
      {DS_CALENDAR_FILTER_OPTIONS.map((opt) => (
        <label key={opt.value}>
          <input
            type="checkbox"
            checked={filters[opt.value]}
            onChange={(e) => onFilterChange(opt.value, e.target.checked)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);
