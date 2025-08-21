import { NavBtn } from '@/components/NavButton/NavBtn';
import { Link } from '@/i18n/navigation.ts';
import { AUTHOR_GITHUB_URL, COURSE_PAGE_URL, LINK_PROPS } from '@common/constants';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import styles from './AboutPage.module.scss';

export default function AboutPage(): ReactNode {
  const t = useTranslations();
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span>
          {t('AboutPage.MadeBy')}{' '}
          <Link {...LINK_PROPS} href={AUTHOR_GITHUB_URL}>
            dusixx
          </Link>
        </span>
        <span>
          {t('AboutPage.AsPart')}{' '}
          <Link {...LINK_PROPS} href={COURSE_PAGE_URL}>
            {t('AboutPage.ReactCourse')}
          </Link>{' '}
          {t('AboutPage.AtRSSchool')}
        </span>
      </div>
      <NavBtn action='back' text={t('Button.Back')} className={styles.btn} />
    </div>
  );
}
