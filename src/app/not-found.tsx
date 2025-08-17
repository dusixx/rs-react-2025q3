import { AppLocales, ERR_SOMETHING_WRONG, RoutePath } from '@/common/constants/index.ts';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function NotFoundGlobal(): ReactNode {
  return (
    <html lang={AppLocales.EN}>
      <body>
        <div>{ERR_SOMETHING_WRONG}</div>
        <Link href={RoutePath.Home}>Go Home</Link>
      </body>
    </html>
  );
}
