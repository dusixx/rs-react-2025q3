import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { type ReactNode } from 'react';
import SearchPage from './SearchPage/SearchPage.tsx';

export default function MainPage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  return <SearchPage searchParams={searchParams} />;
}
