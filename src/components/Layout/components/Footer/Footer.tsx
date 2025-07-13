import type { ReactNode } from 'react';
import { Component } from 'react';
import styles from './Footer.module.scss';

const COPYRIGHT = '© 2025 RS School';

const LINK_PROPS = {
  href: 'https://rs.school/courses/reactjs',
  target: '_blank',
  rel: 'noopener noreferrer nofollow',
};
const IMAGE_PROPS = {
  src: '/rss-logo.svg',
  alt: 'rss logo',
  width: 30,
};
export class Footer extends Component {
  public render(): ReactNode {
    return (
      <footer className={styles.footer}>
        <a className={styles.link} {...LINK_PROPS}>
          <img {...IMAGE_PROPS} />
          <span>{COPYRIGHT}</span>
        </a>
      </footer>
    );
  }
}
