/* eslint-disable react-refresh/only-export-components */
import { IconCheckMark } from '@common/constants.ts';
import { useEffect, useState, type JSX } from 'react';
import styles from './Checkbox.module.scss';

export const ICON_PROPS = {
  size: 16,
  color: 'var(--color-accent)',
};
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
    <button className={styles.checkbox} onClick={handleClick} {...rest} role='checkbox'>
      {value && <IconCheckMark {...ICON_PROPS} role='img' />}
    </button>
  );
};
