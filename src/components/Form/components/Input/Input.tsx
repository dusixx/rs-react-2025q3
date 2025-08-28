import type { InputHTMLAttributes, ReactNode, Ref } from 'react';
import styles from './Input.module.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
  label?: string;
  error?: string | string[];
  nameLabel?: string;
  securely?: boolean;
};
export const Input = ({
  label,
  children,
  error,
  securely,
  nameLabel,
  ...rest
}: InputProps): ReactNode => {
  const errorMsg = Array.isArray(error) ? error[0] : error;
  return (
    <label>
      <span>{label ?? nameLabel}</span>
      <input type={securely ? 'password' : 'text'} autoComplete='off' name={nameLabel} {...rest} />
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {children}
    </label>
  );
};
