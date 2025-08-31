import { getFormData } from '@/common/utils/index.ts';
import { MemoizedCheckbox } from '@/components/Input/Checkbox.tsx';
import { MemoizedModal } from '@/components/Modal/Modal.tsx';
import { AdditionalDataColumnNames } from '@/services/types.ts';
import { memo, useCallback, type FormEvent, type ReactNode } from 'react';
import { formatColumnName } from '../../Table.utils.ts';
import styles from './ColumnPicker.module.scss';

const APPLY_BTN_TEXT = 'Apply';

type ColumnPickerProps = {
  open: boolean;
  onClose: (columns?: string[]) => void;
  columns?: string[];
  selectedColumns?: string[];
};

export const ColumnPicker = ({
  columns = [...AdditionalDataColumnNames],
  selectedColumns = [],
  open,
  onClose,
}: ColumnPickerProps): ReactNode => {
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const selected = Object.keys(getFormData(e));
      onClose(selected);
    },
    [onClose],
  );

  const handleModalClose = useCallback((): void => {
    onClose(selectedColumns);
  }, [onClose, selectedColumns]);

  return (
    <MemoizedModal className={styles.modal} open={open} onClose={handleModalClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {columns.map(colName => {
          return (
            <MemoizedCheckbox
              label={formatColumnName(colName)}
              className={styles.checkbox}
              name={colName}
              value={colName}
              key={colName}
              defaultChecked={selectedColumns.includes(colName)}
            />
          );
        })}
        <button className={styles.btn} type='submit'>
          {APPLY_BTN_TEXT}
        </button>
      </form>
    </MemoizedModal>
  );
};

export const MemoizedColumnPicker = memo(ColumnPicker);
