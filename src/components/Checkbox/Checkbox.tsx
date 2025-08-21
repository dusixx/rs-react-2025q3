import { IconCheckMark } from '@common/constants.ts';
import { useEffect, useState, type JSX } from 'react';
import styles from './Checkbox.module.scss';

const ICON_SIZE = 16;
export const ICON_COLOR = 'var(--color-accent)';

type CheckBoxProps = {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
} & {
  [key: `data-${string}`]: unknown;
};

export const Checkbox = ({ onChange, checked = false, ...rest }: CheckBoxProps): JSX.Element => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  const handleClick = (): void => {
    setValue(!value);
    onChange?.(!value);
  };
  return (
    <button className={styles.btn} onClick={handleClick} {...rest} role='checkbox'>
      <div className={styles.thumb}>
        {value && <IconCheckMark size={ICON_SIZE} color={ICON_COLOR} role='img' />}
      </div>
    </button>
  );
};
