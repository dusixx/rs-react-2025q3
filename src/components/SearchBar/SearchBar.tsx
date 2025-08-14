import { IconClose, IconSearch, INITIAL_PAGE } from '@common/constants';
import { useAppCustomSearchParams, usePersistedSearchQuery } from '@hooks/index.ts';
import type { ChangeEvent, ComponentPropsWithRef, JSX } from 'react';
import { useCallback, useEffect, type SyntheticEvent } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './SearchBar.module.scss';

const ICON_SIZE = 20;

type SearchBarProps = Omit<ComponentPropsWithRef<'input'>, 'onSubmit' | 'onChange' | 'value'> & {
  onSubmit?: (value: string) => void;
};

const trimValue = (value: string = ''): string => {
  return value.trim();
};

export const SearchBar = ({
  className,
  placeholder,
  onSubmit,
  ...restProps
}: SearchBarProps): JSX.Element => {
  const { query, setQuery, persistQuery } = usePersistedSearchQuery();
  const { getParams, createParams } = useAppCustomSearchParams();

  const updateQuery = useCallback(
    (value: string): string => {
      const trimmed = trimValue(value);
      setQuery(trimmed);
      persistQuery(trimmed);
      return trimmed;
    },
    [persistQuery, setQuery],
  );

  useEffect(() => {
    const [q = ''] = getParams('q');
    updateQuery(q);
  }, [getParams, updateQuery]);

  const submit = (value: string): void => {
    const trimmed = updateQuery(value);
    createParams({ q: trimmed, page: INITIAL_PAGE });
    onSubmit?.(trimmed);
  };
  const handleSubmit = (event: SyntheticEvent): void => {
    submit(query);
    event.preventDefault();
  };
  const handleClearClick = (): void => {
    submit('');
  };
  const handleChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
    setQuery(value);
    if (!value) {
      submit(value);
    }
  };

  return (
    <div data-testid={TestId.SearchBar} className={className}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          data-testid={TestId.SearchBarInput}
          className={styles.input}
          value={query}
          placeholder={placeholder}
          onChange={handleChange}
          {...restProps}
        />
        {query && (
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
          disabled={!query}
        >
          <IconSearch data-testid={TestId.SearchBarBtnIcon} size={ICON_SIZE} />
        </button>
      </form>
    </div>
  );
};
