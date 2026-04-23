import { LinkProps } from '@/common/constants.ts';
import { createRecord } from '@/common/utils/index.ts';

export const LABEL_YEAR = 'Year:';
export const LABEL_SORT_BY = 'Sort by:';
export const SEARCH_PLACEHOLDER = 'Country name...';
export const SETTINGS_BTN_TEXT = 'add columns';
export const ICON_PROPS = { size: 20 };
export const FIRST_YEAR = 1750;
export const LAST_YEAR = 2023;
export const YEAR_VALUES = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }).map(
  (_, idx) => FIRST_YEAR + idx,
);
export const YEARS_RECORD = createRecord<number>({ keys: YEAR_VALUES });

export const FooterLinks = {
  'Profiling report': {
    ...LinkProps,
    href: 'https://github.com/dusixx/rs-react-2025q3/blob/performance/readme.md',
  },
  'CO2 data': {
    ...LinkProps,
    href: 'https://github.com/owid/co2-data',
  },
  'Full codebook': {
    ...LinkProps,
    href: 'https://github.com/owid/co2-data/blob/master/owid-co2-codebook.csv',
  },
  'World in data': {
    ...LinkProps,
    href: 'https://ourworldindata.org/co2-and-greenhouse-gas-emissions',
  },
  'JSON data (~100Mb)': {
    ...LinkProps,
    href: 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json',
  },
};
