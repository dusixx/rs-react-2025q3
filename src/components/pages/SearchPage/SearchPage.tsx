import { SearchBar } from '@/components/SearchBar/SearchBar.tsx';
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { FlyoutPanel } from '@components/FlyoutPanel/FlyoutPanel.tsx';
import { SearchResults } from '@components/SearchResults/SearchResults';
import { useTranslations } from 'next-intl';
import { type ReactNode } from 'react';
import styles from './SearchPage.module.scss';

export default function SearchPage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  const t = useTranslations();
  return (
    <div>
      <div className={styles.wrapper}>
        <SearchBar
          className={styles['search-bar']}
          placeholder={t('SearchPage.InputPlaceholder')}
        />
        <SearchResults searchParams={searchParams} />
        <FlyoutPanel />
      </div>
    </div>
  );
}
