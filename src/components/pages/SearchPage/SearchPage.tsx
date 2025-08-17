import { SearchBar } from '@/components/SearchBar/SearchBar.tsx';
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { FlyoutPanel } from '@components/FlyoutPanel/FlyoutPanel.tsx';
import { SearchResults } from '@components/SearchResults/SearchResults';
import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';
import styles from './SearchPage.module.scss';

export default async function SearchPage({
  searchParams,
}: PropsWithAppSearchParams): Promise<ReactNode> {
  const t = await getTranslations();
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
