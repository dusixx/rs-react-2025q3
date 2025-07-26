import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants.ts';
import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ErrorInfo.module.scss';

const ERROR_ICON_PROPS = {
  size: 16,
  color: 'var(--color-accent)',
};

type ErrorInfoProps = {
  message?: string;
  className?: string;
};

export const ErrorInfo = ({
  message = ERR_SOMETHING_WRONG,
  className,
}: ErrorInfoProps): JSX.Element => {
  return (
    <pre data-testid={TestId.SearchError} className={clsx(styles.errorInfo, className)}>
      <IconCloseCircleOutline data-testid={TestId.SearchErrorIcon} {...ERROR_ICON_PROPS} />
      <b data-testid={TestId.SearchErrorMessage}>Error: {message}</b>
    </pre>
  );
};
