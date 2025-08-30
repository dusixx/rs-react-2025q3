/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IconSettings } from '@/common/constants.ts';
import { createRecord } from '@/common/utils/index.ts';
import { MemoizedInput } from '@/components/Input/Input.tsx';
import { MemoizedSelect } from '@/components/Select/Select';
import { MemoizedColumnPicker } from '@/components/Table/components/ColumnPicker/ColumnPicker.tsx';
import { MemoizedTable } from '@/components/Table/Table.tsx';
import {
  filterSummaryData,
  SortSelectLabelValuePairs,
  sortSummaryData,
  type SortByNameAndPopulation,
} from '@/components/Table/Table.utils.ts';
import { summaryDataPromise } from '@/services/index.ts';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { use, useCallback, useDeferredValue, useMemo, useState, type ReactNode } from 'react';
import styles from './MainPage.module.scss';

const SEARCH_PLACEHOLDER = 'Country name...';
const SETTINGS_BTN_TEXT = 'columns';
const ICON_PROPS = { size: 20 };
const FIRST_YEAR = 1750;
const LAST_YEAR = 2023;
const YEAR_VALUES = Array.from({ length: LAST_YEAR - FIRST_YEAR + 1 }).map(
  (_, idx) => FIRST_YEAR + idx,
);
const YEARS_RECORD = createRecord<number>({ keys: YEAR_VALUES });

export default function MainPage(): ReactNode {
  const summaryData = use(summaryDataPromise);
  const [columnsShown, setColumnsShown] = useState<string[]>();
  const [showColumnPicker, setShowColumnPicker] = useState(false);
  const [targetYear, setTargetYear] = useState(LAST_YEAR);
  const [sortBy, setSortBy] = useState<SortByNameAndPopulation>();
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const handleSettingsClick = useCallback((): void => {
    setShowColumnPicker(true);
  }, []);

  const handleClosePicker = useCallback(
    (columns?: string[]): void => {
      setColumnsShown(columns);
      setShowColumnPicker(false);
    },
    [setShowColumnPicker],
  );

  const handleYearChange = useCallback(({ target }: ChangeEvent<HTMLSelectElement>) => {
    setTargetYear(Number(target.value));
  }, []);

  const handleSortByChange = useCallback(({ target }: ChangeEvent<HTMLSelectElement>): void => {
    setSortBy(target.value as SortByNameAndPopulation);
  }, []);

  const handleSearchQueryChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(target.value);
  }, []);

  const filteredData = useMemo(() => {
    let filtered = filterSummaryData({ summaryData, countryName: searchQuery, targetYear });
    if (sortBy) {
      filtered = sortSummaryData({ summaryData: filtered, sortBy, targetYear });
    }
    return filtered;
  }, [sortBy, summaryData, targetYear, searchQuery]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <button className={styles.btn} onClick={handleSettingsClick}>
          <IconSettings {...ICON_PROPS} />
          {SETTINGS_BTN_TEXT}
        </button>
        <div className={styles.group}>
          <MemoizedSelect
            label='Year:'
            className={styles.input}
            labelValuePairs={YEARS_RECORD}
            defaultValue={LAST_YEAR}
            onChange={handleYearChange}
          />
          <MemoizedSelect
            label='Sort by:'
            className={styles.input}
            labelValuePairs={SortSelectLabelValuePairs}
            onChange={handleSortByChange}
          />
          <MemoizedInput
            type='search'
            placeholder={SEARCH_PLACEHOLDER}
            className={clsx(styles.input, styles.search)}
            value={deferredSearchQuery}
            onChange={handleSearchQueryChange}
          />
        </div>
      </div>
      <MemoizedColumnPicker
        open={showColumnPicker}
        onClose={handleClosePicker}
        selectedColumns={columnsShown}
      />
      <MemoizedTable
        summaryData={filteredData}
        additionalDataColumns={columnsShown}
        targetYear={targetYear}
      />
    </div>
  );
}
