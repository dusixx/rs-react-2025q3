import { ERR_SOMETHING_WRONG, LOADER_VISIBILITY_DURATION } from '@common/constants.ts';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import { Loader } from '@components/Loader/Loader.tsx';
import { useCustomSearchParams } from '@hooks/useCustomSearchParams.ts';
import { getCharacterById } from '@services/api.ts';
import type { CharacterInfo } from '@services/api.types.ts';
import { getErrorInstance, getErrorMessage, isNumericInteger } from '@utils/index.ts';
import { useEffect, useState, type ReactNode } from 'react';
import { Description } from './Description.tsx';
import styles from './DetailedCard.module.scss';

const CLOSE_BTN_TEXT = 'Close';

export const DetailedCard = (): ReactNode => {
  const [info, setInfo] = useState<CharacterInfo | null>(null);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const { getParams, deleteParams } = useCustomSearchParams();

  const [id] = getParams('details');

  useEffect(() => {
    if (!isNumericInteger(id)) {
      return;
    }
    setLoading(true);

    void getCharacterById(id)
      .then(setInfo)
      .catch((error: unknown) => {
        setError(getErrorInstance(error, ERR_SOMETHING_WRONG));
        setInfo(null);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, LOADER_VISIBILITY_DURATION);
      });
  }, [id]);

  const handleCloseClick = (): void => {
    deleteParams('details');
  };

  if (!id) {
    return;
  }
  return (
    <article className={styles.card}>
      {loading && <Loader className={styles.loader} />}
      {!loading && info && (
        <div className={styles.info}>
          <div className={styles.thumb}>
            <img className={styles.image} src={info.image} alt={info.name} />
          </div>
          <Description info={info} />
        </div>
      )}
      {!loading && !info && (
        <ErrorInfo
          className={styles.errorInfo}
          message={getErrorMessage(error, ERR_SOMETHING_WRONG)}
        />
      )}
      {!loading && (
        <button className={styles.btn} type='button' onClick={handleCloseClick}>
          {CLOSE_BTN_TEXT}
        </button>
      )}
    </article>
  );
};
