import { getId } from '@/common/utils/index.ts';
import { type SummaryData } from '@/services/types.ts';
import { memo, type ReactNode } from 'react';
import { MemoizedRow } from './components/Row.tsx';
import { useTableHelper } from './hooks/useTableHelper.ts';
import styles from './Table.module.scss';

export type TableProps = {
  data: SummaryData;
  additionalColumns?: readonly string[];
  targetYear?: number;
};

const Table = (props: TableProps): ReactNode => {
  const { allColumns, getRowData } = useTableHelper(props);

  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <MemoizedRow data={allColumns} header />
      </thead>
      <tbody>
        {Object.keys(props.data).map(countryName => {
          const rowData = getRowData(countryName);
          if (rowData) {
            return <MemoizedRow data={rowData} key={getId()} />;
          }
        })}
      </tbody>
    </table>
  );
};

export const MemoizedTable = memo(Table);
