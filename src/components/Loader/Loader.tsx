import clsx from 'clsx';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Loader.module.scss';

const SPINNER_PROPS = {
  style: { opacity: 0.5 },
  src: '/spinner.gif',
  alt: 'spinner',
  width: 40,
};

type LoaderProps = {
  className?: string;
};

export const Loader = ({ className }: LoaderProps): JSX.Element => {
  return (
    <div data-testid={TestId.Loader} className={clsx(styles.loader, className)}>
      <img data-testid={TestId.LoaderSpinner} {...SPINNER_PROPS} />
    </div>
  );
};
