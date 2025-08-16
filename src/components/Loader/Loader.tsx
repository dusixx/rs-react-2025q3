/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx';
import type { JSX } from 'react';
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
    <div className={clsx(styles.loader, className)}>
      <img {...SPINNER_PROPS} width={size} />
    </div>
  );
};
