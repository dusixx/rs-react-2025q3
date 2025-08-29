import { getId } from '@/common/utils/index.ts';
import { memo, type ReactNode } from 'react';
import styles from '../Table.module.scss';
import { MemoizedCell } from './Cell.tsx';

type RowProps = {
  data: readonly string[];
  header?: boolean;
};

const Row = ({ data, header }: RowProps): ReactNode => {
  return (
    <tr className={styles.row}>
      {data.map(value => {
        return <MemoizedCell value={value} key={getId()} header={header} />;
      })}
    </tr>
  );
};

export const MemoizedRow = memo(Row);
