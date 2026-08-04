/**
 * Collapsible holiday list shown above the filter checkboxes.
 */

import { FC, useState } from 'react';

export interface Holiday {
  id: string;
  label: string;
}

export const DsCalendarHolidays: FC<{ holidays?: Holiday[] }> = ({ holidays = [] }) => {
  const [expanded, setExpanded] = useState(false);
  if (!holidays.length) return null;
  const shown = expanded ? holidays : holidays.slice(0, 2);
  return (
    <div>
      <h3>Holidays</h3>
      <div className="calara-holiday-list">
        {shown.map((h) => (
          <div key={h.id} className="calara-holiday">
            {h.label}
          </div>
        ))}
      </div>
      {holidays.length > 2 ? (
        <button type="button" className="calara-btn calara-btn--text" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  );
};
