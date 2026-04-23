import { memo, type ReactNode } from 'react';
import { MemoizedCell } from '../Cell/Cell.tsx';
import styles from './Row.module.scss';

type RowProps = {
  rowData: Record<string, string>;
  rowKey: string;
  header?: boolean;
};

const Row = ({ rowData, header, rowKey }: RowProps): ReactNode => {
  return (
    <tr className={styles.row}>
      {Object.entries(rowData).map(([key, value]) => {
        const cellKey = `${rowKey}_${key}`;
        return <MemoizedCell value={value} key={cellKey} cellKey={cellKey} header={header} />;
      })}
    </tr>
  );
};

export const MemoizedRow = memo(Row);
