import { AppLocales } from '@/common/constants/index.ts';
import { PageLoader } from '@/components/Loader/PageLoader.tsx';
import type { ReactNode } from 'react';

export default function Loading(): ReactNode {
  return (
    <html lang={AppLocales.EN}>
      <body>
        <PageLoader />
      </body>
    </html>
  );
}
