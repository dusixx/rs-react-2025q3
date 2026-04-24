import { Loader } from '@/components/Loader/Loader.tsx';
import { SearchBar } from '@/components/SearchBar/SearchBar.tsx';
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { FlyoutPanel } from '@components/FlyoutPanel/FlyoutPanel.tsx';
import { SearchResults } from '@components/SearchResults/SearchResults';
import { useTranslations } from 'next-intl';
import { Suspense, type ReactNode } from 'react';
import styles from './SearchPage.module.scss';

export default function SearchPage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  const t = useTranslations();
  return (
    <div className={styles.wrapper}>
      <SearchBar className={styles['search-bar']} placeholder={t('SearchPage.InputPlaceholder')} />
      <Suspense fallback={<Loader />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
      <FlyoutPanel />
    </div>
  );
}
