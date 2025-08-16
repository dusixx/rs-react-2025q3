import { Footer } from '@/components/Layout/components/Footer/Footer.tsx';
import { Header } from '@/components/Layout/components/Header/Header.tsx';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { Geist } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import Providers from './providers.tsx';

const geist = Geist({
  subsets: ['latin'],
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<ReactNode> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} className={geist.className} data-scroll-behavior='smooth'>
      <body>
        <div id='root'>
          <Providers locale={locale}>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
