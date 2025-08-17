/* eslint-disable react-refresh/only-export-components */
import type { PropsWithAppSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import SearchPage from '@components/pages/SearchPage/SearchPage';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'R&M Character Finder',
  description: 'Rick and Morty Characters Finder',
};

export default function HomePage({ searchParams }: PropsWithAppSearchParams): ReactNode {
  return <SearchPage searchParams={searchParams} />;
}
