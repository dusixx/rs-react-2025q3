import {
  ERR_SOMETHING_WRONG,
  INITIAL_PAGE,
  LOADER_VISIBILITY_DURATION,
} from '@common/constants.ts';
import { getErrorInstance, getErrorMessage } from '@common/utils';
import { CardList } from '@components/CardList/CardList.tsx';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import { Loader } from '@components/Loader/Loader';
import { Paginator } from '@components/Paginator/Paginator.tsx';
import { useCustomSearchParams } from '@hooks/useCustomSearchParams.ts';
import { getCharactersByName } from '@services/api.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import clsx from 'clsx';
import { useEffect, useState, type JSX } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './SearchResults.module.scss';

export type SearchResultsProps = {
  query: string;
  page?: number;
  version?: string;
};

export const SearchResults = ({ query, page, version }: SearchResultsProps): JSX.Element => {
  const [results, setResults] = useState<CharacterInfo[] | null>([]);
  const [totalPages, setTotalPages] = useState(INITIAL_PAGE);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const { getParams, setParams, createParams } = useCustomSearchParams();

  const [detailsId] = getParams('details');

  useEffect(() => {
    setLoading(true);

    void getCharactersByName(query, page)
      .then(result => {
        setResults(result.results);
        setTotalPages(result.info.pages);
      })
      .catch((error: unknown) => {
        setError(getErrorInstance(error, ERR_SOMETHING_WRONG));
        setResults(null);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, LOADER_VISIBILITY_DURATION);
      });
  }, [query, page, version]);

  const handlePaginatorClick = (page: number): void => {
    createParams({ page: page.toString(), q: query });
  };
  const handleItemClick = (id: number): void => {
    setParams({ details: id.toString() });
  };

  if (!results) {
    return <ErrorInfo message={getErrorMessage(error, ERR_SOMETHING_WRONG)} />;
  }
  return (
    <div className={styles.wrapper}>
      <Paginator
        className={styles.paginator}
        totalPages={totalPages}
        initialPage={page || INITIAL_PAGE}
        onClick={handlePaginatorClick}
      />
      {loading && <Loader />}
      {!loading && (
        <div className={styles.results}>
          <CardList
            className={clsx(detailsId && styles.list)}
            infos={results}
            onItemClick={handleItemClick}
          />
          {detailsId && <Outlet />}
        </div>
      )}
    </div>
  );
};
