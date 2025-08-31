import { createRecord } from '@/common/utils/index.ts';

export const LABEL_YEAR = 'Year:';
export const LABEL_SORT_BY = 'Sort by:';
export const SEARCH_PLACEHOLDER = 'Country name...';
export const SETTINGS_BTN_TEXT = 'columns';
export const ICON_PROPS = { size: 20 };
export const FIRST_YEAR = 1750;
export const LAST_YEAR = 2023;
export const YEAR_VALUES = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }).map(
  (_, idx) => FIRST_YEAR + idx,
);
export const YEARS_RECORD = createRecord<number>({ keys: YEAR_VALUES });
