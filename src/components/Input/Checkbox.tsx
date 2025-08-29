import type { ReactNode } from 'react';
import styles from './Input.module.scss';
import type { InputProps } from './Input.tsx';

type CheckboxProps = InputProps & {
  label?: string;
};

export const Checkbox = ({ label, className, error, ...rest }: CheckboxProps): ReactNode => {
  const errorMsg = Array.isArray(error) ? error[0] : error;
  return (
    <label className={className}>
      <input type='checkbox' {...rest} />
      <span>{label}</span>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
    </label>
  );
};
