import { ERR_SOMETHING_WRONG, IconRefresh } from '@common/constants/index.ts';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import { Loader } from '@components/Loader/Loader.tsx';
import { useAppCustomSearchParams } from '@hooks/index.ts';
import { type ReactNode } from 'react';
import { useOutletContext } from 'react-router-dom';
import { rickmortyApi, useGetCharacterByIdQuery } from 'src/redux/api/api.ts';
import { getApiErrorMessage } from 'src/redux/api/api.utils.ts';
import { useAppDispatch } from 'src/redux/store/hooks.ts';
import { TestId } from 'src/test-utils/constants.ts';
import { Description } from './components/Description/Description.tsx';
import styles from './DetailedCard.module.scss';

const CLOSE_BTN_TEXT = 'Close';
const REFETCH_BTN_TEXT = 'Refetch';
const INVALIDATE_BTN_TEXT = 'Invalidate';
const ICON_SIZE = 14;

export const DetailedCard = (): ReactNode => {
  const dispatch = useAppDispatch();
  const { deleteParams } = useAppCustomSearchParams();
  const { detailsId } = useOutletContext<{ detailsId: string }>();
  const { data, error, isLoading, isFetching, refetch } = useGetCharacterByIdQuery(detailsId);

  if (!detailsId) {
    return;
  }
  const loading = isFetching || isLoading;

  return (
    <article data-testid={TestId.DetailedCard} className={styles.card}>
      {loading && <Loader className={styles.loader} />}
      {!loading && data && (
        <div className={styles.info}>
          <div className={styles.thumb}>
            <img className={styles.image} src={data.image} alt={data.name} />
          </div>
          <Description info={data} />
        </div>
      )}
      {!loading && !data && (
        <ErrorInfo
          className={styles.errorInfo}
          message={getApiErrorMessage(error, ERR_SOMETHING_WRONG)}
        />
      )}
      {!loading && (
        <div className={styles.group}>
          <button
            data-testid={TestId.RefreshBtn}
            type='button'
            className={styles.btn}
            onClick={() => void refetch()}
            data-refresh
          >
            <IconRefresh size={ICON_SIZE} />
            {REFETCH_BTN_TEXT}
          </button>
          <button
            data-testid={TestId.InvalidateBtn}
            data-invalidate
            type='button'
            className={styles.btn}
            onClick={() => dispatch(rickmortyApi.util.invalidateTags(['id']))}
          >
            {INVALIDATE_BTN_TEXT}
          </button>
          <button
            data-testid={TestId.CloseBtn}
            className={styles.btn}
            type='button'
            onClick={() => {
              deleteParams('details');
            }}
          >
            {CLOSE_BTN_TEXT}
          </button>
        </div>
      )}
    </article>
  );
};
