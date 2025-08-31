/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { createRecord, removeDups } from '@/common/utils/index.ts';
import type { AnnualData } from '@/services/types.ts';
import { BasicColumnNames, BasicDataColumnNames } from '@/services/types.ts';
import { useCallback, useMemo } from 'react';
import type { TableProps } from '../Table.tsx';
import { formatColumnName, NA } from '../Table.utils.ts';

type UseTableHelperResult = {
  headerRowData: Record<string, string>;
  getRowDataByCountry: (countryName: string) => Record<string, string> | undefined;
};

export const useTableHelper = ({
  summaryData,
  additionalDataColumns = [],
}: TableProps): UseTableHelperResult => {
  const selectedColumnKeys = useMemo(
    () => removeDups([...BasicColumnNames, ...BasicDataColumnNames, ...additionalDataColumns]),
    [additionalDataColumns],
  );

  const getRowDataByCountry = useCallback(
    (countryName: string): Record<string, string> | undefined => {
      if (!countryName || !summaryData[countryName]) {
        return;
      }
      const { iso_code, data } = summaryData[countryName];
      const annualData = data[0];
      const annualDataValues = selectedColumnKeys
        .slice(2)
        .map(colName => annualData[colName as keyof AnnualData]?.toString() || NA);

      const columnValues = [countryName, iso_code || NA, ...annualDataValues];

      return createRecord({ keys: selectedColumnKeys, values: columnValues, placeholder: NA });
    },
    [selectedColumnKeys, summaryData],
  );

  return {
    headerRowData: createRecord({
      values: selectedColumnKeys.map(v => formatColumnName(v)),
      keys: selectedColumnKeys,
    }),
    getRowDataByCountry,
  };
};
