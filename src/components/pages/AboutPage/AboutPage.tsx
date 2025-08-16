import { NavButton } from '@/components/NavButton/NavButton.tsx';
import { Link } from '@/i18n/navigation.ts';
import { AUTHOR_GITHUB_URL, COURSE_PAGE_URL, LINK_PROPS } from '@common/constants';
import type { ReactNode } from 'react';
import styles from './AboutPage.module.scss';

const BTN_TEXT = 'Go Back';

export default function AboutPage(): ReactNode {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span>
          Made by{' '}
          <Link {...LINK_PROPS} href={AUTHOR_GITHUB_URL}>
            dusixx
          </Link>
        </span>
        <span>
          as part of the{' '}
          <Link {...LINK_PROPS} href={COURSE_PAGE_URL}>
            React Course
          </Link>{' '}
          at RSSchool
        </span>
      </div>
      <NavButton action='back' text={BTN_TEXT} className={styles.btn} />
    </div>
  );
}
