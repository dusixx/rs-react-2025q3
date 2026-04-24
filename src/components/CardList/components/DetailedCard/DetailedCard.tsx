import { getErrorMessage } from '@/common/utils/index.ts';
import { getCharacterById } from '@/services/server-actions/api/api.ts';
import { ERR_SOMETHING_WRONG } from '@common/constants/index.ts';
import { ErrorInfo } from '@components/ErrorInfo/ErrorInfo.tsx';
import Image from 'next/image';
import { type ReactNode } from 'react';
import { CloseBtn } from './components/CloseBtn.tsx';
import { Description } from './components/Description/Description.tsx';
import styles from './DetailedCard.module.scss';

type DetailedCardProps = {
  id: number | string;
};

export const DetailedCard = async ({ id }: DetailedCardProps): Promise<ReactNode> => {
  if (!id) {
    return;
  }
  let data;
  let fetchError = null;

  try {
    data = await getCharacterById(id);
  } catch (error) {
    fetchError = error;
  }
  return (
    <article className={styles.card}>
      {data && (
        <div className={styles.info}>
          <div className={styles.thumb}>
            <Image
              className={styles.image}
              src={data.image ?? ''}
              alt={data.name ?? ''}
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <Description info={data} />
        </div>
      )}
      {!data && (
        <ErrorInfo
          className={styles['error-info']}
          message={getErrorMessage(fetchError, ERR_SOMETHING_WRONG)}
        />
      )}
      <div className={styles.group}>
        <CloseBtn className={styles.btn} />
      </div>
    </article>
  );
};
