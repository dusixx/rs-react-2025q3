import { SearchBar } from '@/components/SearchBar/SearchBar.tsx';
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { FlyoutPanel } from '@components/FlyoutPanel/FlyoutPanel.tsx';
import { SearchResults } from '@components/SearchResults/SearchResults';
import { type ReactNode } from 'react';
import styles from './SearchPage.module.scss';

export const QUERY_PLACEHOLDER = 'Character name...';

export default function SearchPage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  return (
    <div>
      <div className={styles.wrapper}>
        <SearchBar className={styles['search-bar']} placeholder={QUERY_PLACEHOLDER} />
        <SearchResults searchParams={searchParams} />
        <FlyoutPanel />
      </div>
    </div>
  );
}
