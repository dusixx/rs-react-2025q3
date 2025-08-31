/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { IconOptions } from '@/common/constants.ts';
import { MemoizedInput } from '@/components/Input/Input.tsx';
import { MemoizedSelect } from '@/components/Input/Select/Select.tsx';
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
import { memo, use, useCallback, useDeferredValue, useMemo, useState, type ReactNode } from 'react';
import {
  ICON_PROPS,
  LABEL_SORT_BY,
  LABEL_YEAR,
  LAST_YEAR,
  SEARCH_PLACEHOLDER,
  YEARS_RECORD,
} from './MainPage.constants.ts';
import styles from './MainPage.module.scss';

const MainPage = (): ReactNode => {
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
          <IconOptions {...ICON_PROPS} />
        </button>
        <div className={styles.group}>
          <MemoizedSelect
            label={LABEL_YEAR}
            className={styles.input}
            labelValuePairs={YEARS_RECORD}
            defaultValue={LAST_YEAR}
            onChange={handleYearChange}
          />
          <MemoizedSelect
            label={LABEL_SORT_BY}
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
      <MemoizedTable summaryData={filteredData} additionalDataColumns={columnsShown} />
    </div>
  );
};

const MemoizedMainPage = memo(MainPage);
export default MemoizedMainPage;
