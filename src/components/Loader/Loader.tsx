/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Loader.module.scss';

const DEFAULT_SIZE = 40;
export const SPINNER_PROPS = {
  style: { opacity: 0.5 },
  src: '/spinner.gif',
  alt: 'spinner',
  width: DEFAULT_SIZE,
};

type LoaderProps = {
  size?: number;
  className?: string;
};

export const Loader = ({ className, size = DEFAULT_SIZE }: LoaderProps): JSX.Element => {
  return (
    <div data-testid={TestId.Loader} className={clsx(styles.loader, className)}>
      <img data-testid={TestId.LoaderSpinner} {...SPINNER_PROPS} width={size} />
    </div>
  );
};
