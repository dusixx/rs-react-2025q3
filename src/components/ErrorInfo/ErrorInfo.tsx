import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants';
import clsx from 'clsx';
import type { JSX } from 'react';
import styles from './ErrorInfo.module.scss';

const ICON_SIZE = 16;
export const ICON_COLOR = 'var(--color-accent)';

type ErrorInfoProps = {
  message?: string;
  className?: string;
};

export const ErrorInfo = ({
  message = ERR_SOMETHING_WRONG,
  className,
}: ErrorInfoProps): JSX.Element => {
  return (
    <pre className={clsx(styles['error-info'], className)}>
      <div className={styles.heading}>
        <IconCloseCircleOutline size={ICON_SIZE} color={ICON_COLOR} />
        <span>Error: </span>
      </div>
      <p>{message}</p>
    </pre>
  );
};
