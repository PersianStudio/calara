export const DATA_CONTACT_SOURCE_KEYS = ['EVENT', 'MOBILE', 'REFERRAL', 'WEB'] as const;

/** Maps `/data-contact/types` title (e.g. `ICE_CONTACT`, `LEAD`) to API enum (e.g. `ice-contact`, `lead`). */
export const dataContactTypeTitleToApiEnum = (title: string): string => title.toLowerCase().replace(/_/g, '-');

/** Maps API data-contact enum (e.g. `ice-contact`) to `BE_ENUMS` key (e.g. `ICE_CONTACT`). */
export const dataContactApiEnumToBeEnumKey = (apiEnum: string): string => apiEnum.toUpperCase().replace(/-/g, '_');
