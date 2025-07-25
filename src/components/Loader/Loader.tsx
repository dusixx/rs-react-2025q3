import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Loader.module.scss';

const SPINNER_PROPS = {
  style: { opacity: 0.5 },
  src: '/spinner.gif',
  alt: 'spinner',
  width: 40,
};

export const Loader = (): JSX.Element => {
  return (
    <div data-testid={TestId.Loader} className={styles.loader}>
      <img data-testid={TestId.LoaderSpinner} {...SPINNER_PROPS} />
    </div>
  );
};
