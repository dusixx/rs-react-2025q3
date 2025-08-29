import { getFormData } from '@/common/utils/index.ts';
import { Checkbox } from '@/components/Input/Checkbox.tsx';
import { Modal } from '@/components/Modal/Modal.tsx';
import { AdditionalDataColumnNames } from '@/services/types.ts';
import type { ChangeEvent } from 'react';
import { useCallback, useState, type FormEvent, type ReactNode } from 'react';
import styles from './ColumnPicker.module.scss';

const APPLY_BTN_TEXT = 'Apply';

type ColumnPickerProps = {
  columns?: string[] | readonly string[];
  onApply?: (columns: string[]) => void;
};

export const ColumnPicker = ({
  columns = AdditionalDataColumnNames,
  onApply,
}: ColumnPickerProps): ReactNode => {
  const [open, setOpen] = useState(true);
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = useCallback(({ target }: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCount(c => (target.checked ? c + 1 : c - 1));
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      const selectedColumns = Object.keys(getFormData(e));
      if (selectedColumns.length !== 0) {
        console.log(selectedColumns);
        onApply?.(selectedColumns);
      }
      e.preventDefault();
      setOpen(false);
    },
    [onApply],
  );

  return (
    <Modal
      className={styles.modal}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {columns.map(colName => {
          return (
            <Checkbox
              className={styles.checkbox}
              name={colName}
              label={colName}
              value={colName}
              key={colName}
              onChange={handleCheckboxChange}
            />
          );
        })}
        <button className={styles.btn} type='submit' disabled={!selectedCount}>
          {APPLY_BTN_TEXT}
        </button>
      </form>
    </Modal>
  );
};
