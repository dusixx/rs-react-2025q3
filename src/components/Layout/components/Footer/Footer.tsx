import { LinkProps } from '@common/constants.ts';
import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Footer.module.scss';

export const COPYRIGHT = '© 2025 RS School';
export const RSS_URL = 'https://rs.school/';
export const RSS_LOGO_SRC = '/rss-logo.svg';
const RSS_LOGO_ALT = 'RSS logo';

export const Footer = (): JSX.Element => {
  return (
    <footer data-testid={TestId.Footer} className={styles.footer}>
      <a data-testid={TestId.FooterLink} className={styles.link} href={RSS_URL} {...LinkProps}>
        <img
          className={styles.logo}
          data-testid={TestId.FooterLogo}
          src={RSS_LOGO_SRC}
          alt={RSS_LOGO_ALT}
        />
        <span>{COPYRIGHT}</span>
      </a>
    </footer>
  );
};
