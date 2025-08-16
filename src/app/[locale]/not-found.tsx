import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl';
import type { ReactNode } from 'react';
import ErrorPage from './ErrorPage/ErrorPage.tsx';

export default function NotFound(): ReactNode {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorPage />
    </NextIntlClientProvider>
  );
}
