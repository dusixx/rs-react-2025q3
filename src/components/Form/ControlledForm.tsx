import type { FormEvent, ReactNode } from 'react';
import type { FormProps } from './UncontrolledForm.tsx';
import styles from './styles.module.scss';

export const ControlledForm = ({ closeModal }: FormProps): ReactNode => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    closeModal?.();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      form <button type='submit'>Append</button>
    </form>
  );
};
