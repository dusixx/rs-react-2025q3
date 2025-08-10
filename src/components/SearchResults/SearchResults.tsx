import { ERR_SOMETHING_WRONG, IconRefresh, INITIAL_PAGE } from '@common/constants';
import { CardList } from '@components/CardList/CardList.tsx';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import { Loader } from '@components/Loader/Loader';
import { Paginator } from '@components/Paginator/Paginator.tsx';
import { useAppCustomSearchParams, usePersistedSearchQuery } from '@hooks/index.ts';
import clsx from 'clsx';
import { useEffect, type JSX } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetCharactersByNameQuery } from 'src/redux/api/api';
import { getApiErrorMessage } from 'src/redux/api/api.utils';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './SearchResults.module.scss';

const REFETCH_BTN_TEXT = 'Rerfesh';
const ICON_SIZE = 14;

export const SearchResults = (): JSX.Element => {
  const { getQueryVersion } = usePersistedSearchQuery();
  const queryVersion = getQueryVersion();
  const { getParams, setParams, createParams } = useAppCustomSearchParams();
  const [detailsId, page, query] = getParams('details', 'page', 'q');
  const { error, refetch, isError, isLoading, isFetching, data } = useGetCharactersByNameQuery({
    name: query,
    page,
  });
  useEffect(() => {
    void refetch();
  }, [refetch, queryVersion]);

  const handlePaginatorClick = (page: number): void => {
    createParams({ q: query, page });
  };
  const handleItemClick = (id: number): void => {
    setParams({ details: id });
  };

  if (isFetching || isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorInfo message={getApiErrorMessage(error, ERR_SOMETHING_WRONG)} />;
  }
  if (!data?.results.length) {
    return <ErrorInfo message={ERR_SOMETHING_WRONG} />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <button
          data-testid={TestId.RefreshBtn}
          type='button'
          className={styles.btn}
          onClick={() => void refetch()}
        >
          <IconRefresh size={ICON_SIZE} />
          {REFETCH_BTN_TEXT}
        </button>
        <Paginator
          className={styles.paginator}
          totalPages={data.info.pages}
          initialPage={Number(page) || INITIAL_PAGE}
          onClick={handlePaginatorClick}
        />
      </div>
      <div className={styles.results}>
        <CardList
          className={clsx(detailsId && styles.list)}
          infos={data.results}
          onItemClick={handleItemClick}
        />
        {detailsId && <Outlet context={{ detailsId }} />}
      </div>
    </div>
  );
};
