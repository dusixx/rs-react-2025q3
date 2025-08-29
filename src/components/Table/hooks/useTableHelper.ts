/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { removeDups } from '@/common/utils/index.ts';
import type { AnnualData } from '@/services/types.ts';
import { BasicColumnNames, BasicDataColumnNames } from '@/services/types.ts';
import { useCallback, useMemo } from 'react';
import type { TableProps } from '../Table.tsx';

const NA = 'N/A';

type UseTableHelperResult = {
  allColumns: string[];
  getRowData: (countryName: string) => readonly string[] | undefined;
};

const getAnnualData = (countryDataForAllYears: AnnualData[], targetYear?: number): AnnualData => {
  const existingAnnualData = targetYear
    ? countryDataForAllYears.find(({ year }) => year === targetYear)
    : countryDataForAllYears[countryDataForAllYears.length - 1];

  return existingAnnualData ?? ({ year: targetYear ?? NA } as AnnualData);
};

export const useTableHelper = ({
  data,
  targetYear,
  additionalColumns = [],
}: TableProps): UseTableHelperResult => {
  const allColumns = useMemo(
    () => removeDups([...BasicColumnNames, ...BasicDataColumnNames, ...additionalColumns]),
    [additionalColumns],
  );
  const getRowData = useCallback(
    (countryName: string): readonly string[] | undefined => {
      if (!countryName || !data[countryName]) {
        return;
      }
      const { iso_code, data: countryDataForAllYears } = data[countryName];
      const annualData = getAnnualData(countryDataForAllYears, targetYear);
      const annualDataColumns = allColumns
        .slice(2)
        .map(colName => annualData[colName as keyof AnnualData]?.toString() || NA);

      return [countryName, iso_code || NA, ...annualDataColumns];
    },
    [allColumns, data, targetYear],
  );
  return {
    allColumns,
    getRowData,
  };
};
