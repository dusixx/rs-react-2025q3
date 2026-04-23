/* eslint-disable react-refresh/only-export-components */
import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants.ts';
import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './ErrorInfo.module.scss';

export const ERROR_ICON_PROPS = {
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
    <pre data-testid={TestId.ErrorInfo} className={clsx(styles.errorInfo, className)}>
      <IconCloseCircleOutline data-testid={TestId.ErrorInfoIcon} {...ERROR_ICON_PROPS} />
      <b data-testid={TestId.ErrorInfoMessage}>Error: {message}</b>
    </pre>
  );
};
