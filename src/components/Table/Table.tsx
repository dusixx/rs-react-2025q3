import { type SummaryData } from '@/services/types.ts';
import { memo, type ReactNode } from 'react';
import { MemoizedRow } from './components/Row/Row.tsx';
import { useTableHelper } from './hooks/useTableHelper.ts';
import styles from './Table.module.scss';

const HEADER_ROW_KEY = 'header';

export type TableProps = {
  summaryData: SummaryData;
  additionalDataColumns?: readonly string[];
};

const Table = (props: TableProps): ReactNode => {
  const { headerRowData, getRowDataByCountry } = useTableHelper(props);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <MemoizedRow rowData={headerRowData} rowKey={HEADER_ROW_KEY} header />
        </thead>
        <tbody>
          {Object.keys(props.summaryData).map(countryName => {
            const rowData = getRowDataByCountry(countryName);
            if (rowData) {
              return <MemoizedRow rowData={rowData} key={countryName} rowKey={countryName} />;
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export const MemoizedTable = memo(Table);
