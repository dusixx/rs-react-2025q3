'use client';

import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import { ErrorFallback } from '@/components/ErrorBoundary/index.ts';
import { store } from '@/redux/store/store.ts';
import { NextIntlClientProvider } from 'next-intl';
import dynamic from 'next/dynamic';
import type { PropsWithChildren, ReactNode } from 'react';
import { Provider } from 'react-redux';

type ProvidersProps = PropsWithChildren & {
  locale: string;
};
const ThemeProvider = dynamic(
  async () => await import('@components/ThemeProvider/ThemeProvider.tsx'),
  {
    ssr: false,
  },
);
export default function Providers({ children, locale }: ProvidersProps): ReactNode {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NextIntlClientProvider locale={locale}>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}
