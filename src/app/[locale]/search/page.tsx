import SearchPage from '@/components/pages/SearchPage/SearchPage.tsx';
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { type ReactNode } from 'react';

export default function MainPage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  return <SearchPage searchParams={searchParams} />;
}
