import clsx from 'clsx';
import { memo, type CSSProperties, type JSX, type PropsWithChildren } from 'react';
import styles from './Loader.module.scss';

const DEFAULT_SIZE = 40;

const SPINNER_PROPS = {
  style: { opacity: 0.5 },
  src: '/spinner.gif',
  alt: 'spinner',
  width: DEFAULT_SIZE,
};

type LoaderProps = PropsWithChildren & {
  size?: number;
  className?: string;
  style?: CSSProperties;
};

const Loader = ({ className, style, children, size = DEFAULT_SIZE }: LoaderProps): JSX.Element => {
  return (
    <div className={clsx(styles.loader, className)} style={style}>
      <img {...SPINNER_PROPS} width={size} height={size} />
      {children}
    </div>
  );
};

export const MemoizedLoader = memo(Loader);
