import { ERR_SOMETHING_WRONG, LOADER_VISIBILITY_DURATION } from '@common/constants.ts';
import { getErrorInstance, getErrorMessage, isNumericInteger } from '@common/utils';
import { CardList } from '@components/CardList/CardList.tsx';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import { Loader } from '@components/Loader/Loader';
import { useCustomSearchParams } from '@hooks/useCustomSearchParams.ts';
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import clsx from 'clsx';
import { useEffect, useState, type JSX } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './SearchResults.module.scss';

const INITIAL_PAGE = '1';

type SearchResultsProps = {
  query: string;
  version?: string;
};

export const SearchResults = ({ query, version }: SearchResultsProps): JSX.Element => {
  const [results, setResults] = useState<CharacterInfo[]>([]);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const { setParams, getParams, deleteParams } = useCustomSearchParams();

  const [page] = getParams('page');
  const [detailsId] = getParams('details');

  useEffect(() => {
    if (!isNumericInteger(page)) {
      setParams({ page: INITIAL_PAGE });
    }
    if (!isNumericInteger(detailsId)) {
      deleteParams('details');
    }
  }, [setParams, page, deleteParams, detailsId]);

  useEffect(() => {
    setLoading(true);

    void getCharactersByName(query, page)
      .then(setResults)
      .catch((error: unknown) => {
        setError(getErrorInstance(error, ERR_SOMETHING_WRONG));
        setResults([]);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, LOADER_VISIBILITY_DURATION);
      });
  }, [query, page, version]);

  const handleItemClick = (id: number): void => {
    setParams({ details: id.toString() });
  };

  if (!results.length) {
    return <ErrorInfo message={getErrorMessage(error, ERR_SOMETHING_WRONG)} />;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.results}>
      <CardList
        className={clsx(detailsId && styles.list)}
        infos={results}
        onItemClick={handleItemClick}
      />
      {detailsId && <Outlet />}
    </div>
  );
};
