import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import Search from '@/pages/SearchPage/SearchPage.tsx';
import { type ReactNode } from 'react';

export default function SearchPage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  return <Search searchParams={searchParams} />;
}
