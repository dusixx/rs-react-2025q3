import { getErrorMessage } from '@/common/utils/index.ts';
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { getCharactersByName } from '@/services/api.ts';
import { ERR_SOMETHING_WRONG, INITIAL_PAGE } from '@common/constants';
import { CardList } from '@components/CardList/CardList.tsx';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { DetailedCard } from '../CardList/components/DetailedCard/DetailedCard.tsx';
import { AppPaginator } from '../Paginator/AppPaginator.tsx';
import styles from './SearchResults.module.scss';

export const SearchResults = async ({
  searchParams,
}: PropsWithAppSearchParams): Promise<ReactNode> => {
  const { page = INITIAL_PAGE, q = '', details } = (await searchParams) ?? {};
  let data;
  let fetchError = null;

  try {
    data = await getCharactersByName(q, page);
  } catch (error) {
    fetchError = error;
  }
  if (fetchError) {
    return <ErrorInfo message={getErrorMessage(fetchError, ERR_SOMETHING_WRONG)} />;
  }
  if (!data?.results.length) {
    return <ErrorInfo message={ERR_SOMETHING_WRONG} />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.group}>
        <AppPaginator totalPages={data.info.pages} />
      </div>
      <div className={styles.results}>
        <CardList className={clsx(details && styles.list)} infos={data.results} />
        {details && <DetailedCard id={details} />}
      </div>
    </div>
  );
};
