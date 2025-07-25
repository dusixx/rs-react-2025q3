import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants.ts';
import { CardList } from '@components/CardList/CardList.tsx';
import { useCustomSearchParams } from '@hooks/useCustomSearchParams.ts';
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import { getErrorInstance, getErrorMessage, isNumericInteger } from '@utils/index.ts';
import { useEffect, useState, type JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { TestId } from 'src/test-utils/constants.ts';

import { Loader } from '@components/Layout/components/Loader/Loader.tsx';
import styles from './SearchResults.module.scss';

const INITIAL_PAGE = '1';
const LOADER_VISIBILITY_DURATION = 500;
const ERROR_ICON_PROPS = {
  size: 16,
  color: 'var(--color-accent)',
};

type SearchResultsProps = {
  query: string;
};

export const SearchResults = ({ query }: SearchResultsProps): JSX.Element => {
  const [results, setResults] = useState<CharacterInfo[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const { setParam, getParam, deleteParam } = useCustomSearchParams();

  const page = getParam('page');
  const detailsId = getParam('details');

  useEffect(() => {
    if (!isNumericInteger(page)) {
      setParam('page', INITIAL_PAGE);
    }
    if (!isNumericInteger(detailsId)) {
      deleteParam('details');
    }
  }, [setParam, page, deleteParam, detailsId]);

  useEffect(() => {
    setLoading(true);

    void getCharactersByName(query, page)
      .then(infos => {
        setResults(infos);
      })
      .catch((error: unknown) => {
        setError(getErrorInstance(error, ERR_SOMETHING_WRONG));
        setResults([]);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, LOADER_VISIBILITY_DURATION);
      });
  }, [query, page]);

  const handleItemClick = (id: number): void => {
    setParam('details', id.toString());
  };

  if (!results.length) {
    const errorMessage = getErrorMessage(error, ERR_SOMETHING_WRONG);
    return (
      <pre data-testid={TestId.SearchError} className={styles.errorInfo}>
        <IconCloseCircleOutline data-testid={TestId.SearchErrorIcon} {...ERROR_ICON_PROPS} />
        <b data-testid={TestId.SearchErrorMessage}>Error: {errorMessage}</b>
      </pre>
    );
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.results}>
      <CardList infos={results} onItemClick={handleItemClick} />
      {detailsId && <Outlet />}
    </div>
  );
};
