/**
 * Tiny pattern formatter for calendar labels — no locale packs, English only.
 *
 * Supported tokens (longest match wins):
 * `d` `dd` `M` `MM` `MMM` `MMMM` `yy` `yyyy`
 * `E` `EE` `EEE` `EEEE` `h` `hh` `H` `HH` `m` `mm` `a` `aa`
 *
 * Literal text is written as-is. Escape is not supported; keep patterns simple.
 */

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
const MONTHS_LONG = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const WEEKDAYS_NARROW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const; // Sun…Sat
const WEEKDAYS_SHORT2 = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const WEEKDAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

const pad2 = (n: number): string => String(n).padStart(2, '0');

const TOKEN_RE = /yyyy|yy|MMMM|MMM|MM|M|dd|d|EEEE|EEE|EE|E|HH|H|hh|h|mm|m|aa|a/g;

/**
 * Format a local `Date` with a small date-fns-like pattern subset.
 *
 * @example
 * formatDate(new Date(2024, 5, 3, 9, 5), 'EEEE, MMMM d, yyyy'); // Monday, June 3, 2024
 * formatDate(new Date(2024, 5, 3, 9, 5), 'hh:mm a');            // 09:05 am
 */
export const formatDate = (date: Date, pattern: string): string => {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0–11
  const day = date.getDate();
  const weekday = date.getDay(); // 0=Sun
  const hours24 = date.getHours();
  const minutes = date.getMinutes();
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const meridiem = hours24 < 12 ? 'am' : 'pm';

  return pattern.replace(TOKEN_RE, (token) => {
    switch (token) {
      case 'yyyy':
        return String(year);
      case 'yy':
        return pad2(year % 100);
      case 'MMMM':
        return MONTHS_LONG[month];
      case 'MMM':
        return MONTHS_SHORT[month];
      case 'MM':
        return pad2(month + 1);
      case 'M':
        return String(month + 1);
      case 'dd':
        return pad2(day);
      case 'd':
        return String(day);
      case 'EEEE':
        return WEEKDAYS_LONG[weekday];
      case 'EEE':
        return WEEKDAYS_SHORT[weekday];
      case 'EE':
        return WEEKDAYS_SHORT2[weekday];
      case 'E':
        return WEEKDAYS_NARROW[weekday];
      case 'HH':
        return pad2(hours24);
      case 'H':
        return String(hours24);
      case 'hh':
        return pad2(hours12);
      case 'h':
        return String(hours12);
      case 'mm':
        return pad2(minutes);
      case 'm':
        return String(minutes);
      case 'aa':
        return meridiem.toUpperCase();
      case 'a':
        return meridiem;
      default:
        return token;
    }
  });
};
