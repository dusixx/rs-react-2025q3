/* eslint-disable react-refresh/only-export-components */
import '@/styles/global.scss';
import type { Metadata } from 'next';
import type { PropsWithChildren, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'R&M Character Finder',
  description: 'Rick and Morty Characters Finder',
};

export default function RootLayout({ children }: PropsWithChildren): ReactNode {
  return children;
}
