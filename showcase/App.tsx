import { useMemo, useState } from 'react';
import {
  DsCalendar,
  DsCalendarBoard,
  DsDatePicker,
  DsMiniCalendar,
  DEFAULT_DS_CALENDAR_FILTERS,
  DEFAULT_DS_CALENDAR_VIEW,
  enabledDsCalendarFilters,
  type CalendarDayEvent,
  type CalendarMonthEvent,
  type CalendarWeekEvent,
  type DsCalendarFilters,
  type DsCalendarView,
} from '@persianstudio/calara';
import { Box, Stack } from '@mui/material';
import { startOfWeek, addDays } from 'date-fns';

function minutes(h: number, m = 0) {
  return h * 60 + m;
}

function buildDemoEvents(anchor: Date) {
  const weekStart = startOfWeek(anchor, { weekStartsOn: 1 });

  const dayEvents: CalendarDayEvent[] = [
    {
      id: 'ice-1',
      type: 'ice_call',
      title: 'Product sync',
      startMinutes: minutes(9, 30),
      endMinutes: minutes(10, 15),
    },
    {
      id: 'inperson-1',
      type: 'in_person_meeting',
      title: 'School visit',
      startMinutes: minutes(11, 0),
      endMinutes: minutes(12, 30),
      travelMinutes: 25,
      location: 'North Campus',
    },
    {
      id: 'task-1',
      type: 'task',
      title: 'Send agenda',
      startMinutes: minutes(14, 0),
      endMinutes: minutes(14, 45),
      status: 'overdue',
      priority: 'high',
    },
    {
      id: 'reminder-1',
      type: 'reminder',
      title: 'Call parent liaison',
      hour: 16,
      completed: false,
    },
  ];

  const weekEvents: CalendarWeekEvent[] = [
    {
      id: 'w-ice-1',
      type: 'ice_call',
      title: 'Weekly standup',
      dayIndex: 0,
      startMinutes: minutes(9, 0),
      endMinutes: minutes(9, 30),
    },
    {
      id: 'w-in-1',
      type: 'in_person_meeting',
      title: 'Board briefing',
      dayIndex: 2,
      startMinutes: minutes(13, 0),
      endMinutes: minutes(14, 30),
      travelMinutes: 20,
      location: 'City Hall',
    },
    {
      id: 'w-ice-2',
      type: 'ice_call',
      title: 'Design critique',
      dayIndex: 4,
      startMinutes: minutes(15, 0),
      endMinutes: minutes(16, 0),
    },
  ];

  const monthEvents: CalendarMonthEvent[] = [0, 2, 5, 9, 14].map((offset, i) => {
    const date = addDays(weekStart, offset);
    return {
      id: `m-${i}`,
      type: i % 2 === 0 ? 'ice_call' : 'in_person_meeting',
      title: i % 2 === 0 ? `ICE call ${i + 1}` : `Visit ${i + 1}`,
      date,
      startMinutes: minutes(10 + i, 0),
      endMinutes: minutes(11 + i, 0),
      location: i % 2 ? 'Campus' : undefined,
      travelMinutes: i % 2 ? 15 : undefined,
    };
  });

  const holidays = [
    { id: 'h-1', label: 'Staff development day' },
    { id: 'h-2', label: 'Public holiday' },
  ];

  return { dayEvents, weekEvents, monthEvents, holidays };
}

export function App() {
  const [view, setView] = useState<DsCalendarView>(DEFAULT_DS_CALENDAR_VIEW);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [filters, setFilters] = useState<DsCalendarFilters>(DEFAULT_DS_CALENDAR_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState<string | undefined>();
  const [fieldDate, setFieldDate] = useState<Date | null>(new Date());
  const [timeOnly, setTimeOnly] = useState<Date | null>(() => {
    const d = new Date();
    d.setHours(14, 30, 0, 0);
    return d;
  });
  const [inlineDate, setInlineDate] = useState<Date | null>(new Date());
  const [miniDate, setMiniDate] = useState(() => new Date());

  const demo = useMemo(() => buildDemoEvents(currentDate), [currentDate]);
  const enabledFilters = useMemo(() => enabledDsCalendarFilters(filters), [filters]);

  return (
    <div className="page">
      <header className="hero">
        <h1 className="brand">Calara</h1>
        <p className="lede">
          Day, week, and month calendar boards plus field and inline date pickers — extracted from the
          ICE design system for Persian Studio.
        </p>
        <nav className="nav" aria-label="On this page">
          <a href="#calendar">Full calendar</a>
          <a href="#datepicker">Date picker</a>
          <a href="#mini">Mini calendar</a>
        </nav>
      </header>

      <section className="section" id="calendar">
        <h2>Full calendar</h2>
        <p>
          Toolbar, filters, sidebar mini-month, and board views with sample ICE calls, in-person
          meetings, tasks, and reminders.
        </p>
        <div className="panel calendar-shell">
          <DsCalendar
            view={view}
            onViewChange={setView}
            currentDate={currentDate}
            onDateChange={setCurrentDate}
            search={search}
            setSearch={setSearch}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((open) => !open)}
            filters={filters}
            onFilterChange={(id, checked) => setFilters((prev) => ({ ...prev, [id]: checked }))}
            holidays={demo.holidays}
          >
            <DsCalendarBoard
              view={view}
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              dayEvents={demo.dayEvents}
              weekEvents={demo.weekEvents}
              monthEvents={demo.monthEvents}
              enabledFilters={enabledFilters}
            />
          </DsCalendar>
        </div>
      </section>

      <section className="section" id="datepicker">
        <h2>Date picker</h2>
        <p>Field, time-only, and inline-text variants powered by react-datepicker.</p>
        <div className="panel picker-grid">
          <div className="picker-card">
            <label htmlFor="field-picker">Field</label>
            <DsDatePicker
              id="field-picker"
              selected={fieldDate}
              onChange={(date) => setFieldDate(date as Date | null)}
              inputLabel="Meeting date"
              inputSize="medium"
            />
          </div>
          <div className="picker-card">
            <label htmlFor="time-picker">Time only</label>
            <DsDatePicker
              id="time-picker"
              selected={timeOnly}
              onChange={(date) => setTimeOnly(date as Date | null)}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="h:mm a"
              inputLabel="Start time"
            />
          </div>
          <div className="picker-card">
            <label>Inline text</label>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box component="span" sx={{ color: 'iceGray.500', fontSize: 14 }}>
                Jump to
              </Box>
              <DsDatePicker
                variant="inlineText"
                selected={inlineDate}
                onChange={(date) => {
                  const next = date as Date | null;
                  setInlineDate(next);
                  if (next) setCurrentDate(next);
                }}
                triggerAriaLabel="Choose calendar date"
              />
            </Stack>
          </div>
        </div>
      </section>

      <section className="section" id="mini">
        <h2>Mini calendar</h2>
        <p>Compact navigator used in the calendar sidebar (MUI X DateCalendar).</p>
        <div className="panel" style={{ maxWidth: 320 }}>
          <DsMiniCalendar value={miniDate} onChange={setMiniDate} />
        </div>
      </section>

      <footer className="meta">
        <div>
          Package <code>@persianstudio/calara</code> ·{' '}
          <a href="https://github.com/PersianStudio/calara">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
