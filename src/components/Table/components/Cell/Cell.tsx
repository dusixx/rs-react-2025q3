import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { memo, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Cell.module.scss';

const HIGHLIGHT_DURATION = 1000;

type CellProps = {
  value?: string;
  header?: boolean;
  cellKey?: string;
};

const Cell = ({ value = '', cellKey, header }: CellProps): ReactNode => {
  const oldValue = useRef(value);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (oldValue.current !== value) {
      oldValue.current = value;

      setHighlighted(true);
      setTimeout(() => {
        setHighlighted(false);
      }, HIGHLIGHT_DURATION);
    }
  }, [value, cellKey, header, highlighted]);

  const cellStyle: CSSProperties = {
    backgroundColor: highlighted ? 'var(--color-violet-10)' : 'transparent',
  };
  return header ? (
    <th className={clsx(styles.cell, styles.th)} style={cellStyle} title={value}>
      {value}
    </th>
  ) : (
    <td className={clsx(styles.cell, styles.td)} style={cellStyle} title={value}>
      {value}
    </td>
  );
};

export const MemoizedCell = memo(Cell);
