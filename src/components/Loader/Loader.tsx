/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx';
import type { CSSProperties, JSX, PropsWithChildren } from 'react';
import styles from './Loader.module.scss';

const DEFAULT_SIZE = 40;
export const SPINNER_PROPS = {
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

export const Loader = ({
  className,
  style,
  children,
  size = DEFAULT_SIZE,
}: LoaderProps): JSX.Element => {
  return (
    <div className={clsx(styles.loader, className)} style={style}>
      <img {...SPINNER_PROPS} width={size} height={size} />
      {children}
    </div>
  );
};
