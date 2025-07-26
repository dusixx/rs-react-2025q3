import type { JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Footer.module.scss';

export const COPYRIGHT = '© 2025 RS School';
export const LINK_PROPS = {
  href: 'https://rs.school/courses/reactjs',
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
};
export const IMAGE_PROPS = {
  src: '/rss-logo.svg',
  alt: 'rss logo',
  width: 30,
};

export const Footer = (): JSX.Element => {
  return (
    <footer data-testid={TestId.Footer} className={styles.footer}>
      <a data-testid={TestId.FooterLink} className={styles.link} {...LINK_PROPS}>
        <img data-testid={TestId.FooterLogo} {...IMAGE_PROPS} />
        <span>{COPYRIGHT}</span>
      </a>
    </footer>
  );
};
