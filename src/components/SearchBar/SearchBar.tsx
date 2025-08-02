import { IconClose, IconSearch } from '@common/constants.ts';
import type { ChangeEvent, JSX } from 'react';
import { type SyntheticEvent } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './SearchBar.module.scss';

const ICON_SIZE = 20;
const INITIAL_VALUE = '';

type SearchBarProps = {
  value?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const SearchBar = ({
  className,
  placeholder,
  value,
  onChange,
  onSubmit,
}: SearchBarProps): JSX.Element => {
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(value);
  };
  const handleSubmit = (event: SyntheticEvent): void => {
    onSubmit?.(value?.trim() ?? '');
    event.preventDefault();
  };
  const handleClearClick = (): void => {
    onChange?.(INITIAL_VALUE);
  };

  return (
    <div data-testid={TestId.SearchBar} className={className}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          data-testid={TestId.SearchBarInput}
          className={styles.input}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
        {value && (
          <button
            data-testid={TestId.SearchBarClear}
            className={styles.clearBtn}
            type='button'
            onClick={handleClearClick}
          >
            <IconClose data-testid={TestId.SearchBarClearIcon} size={ICON_SIZE} />
          </button>
        )}
        <button
          data-testid={TestId.SearchBarBtn}
          className={styles.btn}
          type='submit'
          disabled={!value}
        >
          <IconSearch data-testid={TestId.SearchBarBtnIcon} size={ICON_SIZE} />
        </button>
      </form>
    </div>
  );
};
