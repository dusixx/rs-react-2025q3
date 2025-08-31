import { memo, type ReactNode, type SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  labelValuePairs: Record<string, unknown>;
  label?: string;
};

export const Select = ({ labelValuePairs, label, ...rest }: SelectProps): ReactNode => {
  return (
    <label className={styles.label}>
      {label}
      <select {...rest}>
        {Object.entries(labelValuePairs).map(([label, value]) => {
          const valueStr = String(value);
          return <option value={valueStr} label={label} key={valueStr} />;
        })}
      </select>
    </label>
  );
};

export const MemoizedSelect = memo(Select);
