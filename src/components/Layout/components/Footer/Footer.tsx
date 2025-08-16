import { LinkProps } from '@common/constants';
import type { JSX } from 'react';
import styles from './Footer.module.scss';

export const COPYRIGHT = '© 2025 RS School';
export const RSS_URL = 'https://rs.school/';
export const RSS_LOGO_SRC = '/rss-logo.svg';
const RSS_LOGO_ALT = 'RSS logo';

export const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <a className={styles.link} href={RSS_URL} {...LinkProps}>
        <img className={styles.logo} src={RSS_LOGO_SRC} alt={RSS_LOGO_ALT} />
        <span>{COPYRIGHT}</span>
      </a>
    </footer>
  );
};
