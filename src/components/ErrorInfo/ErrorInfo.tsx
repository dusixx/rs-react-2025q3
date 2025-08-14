import { ERR_SOMETHING_WRONG, IconCloseCircleOutline } from '@common/constants';
import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
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
    <pre data-testid={TestId.ErrorInfo} className={clsx(styles.errorInfo, className)}>
      <div data-heading>
        <IconCloseCircleOutline
          data-testid={TestId.ErrorInfoIcon}
          size={ICON_SIZE}
          color={ICON_COLOR}
        />
        <span>Error: </span>
      </div>
      <p data-testid={TestId.ErrorInfoMessage}>{message}</p>
    </pre>
  );
};
