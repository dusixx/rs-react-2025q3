import { memo, type ReactNode } from 'react';
import styles from '../Table.module.scss';

type CellProps = {
  value?: string;
  header?: boolean;
};
const Cell = ({ value = '', header }: CellProps): ReactNode => {
  return header ? (
    <th className={styles.cell}>{value}</th>
  ) : (
    <td className={styles.cell}>{value}</td>
  );
};

export const MemoizedCell = memo(Cell);
