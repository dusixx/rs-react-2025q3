import { AppLocales, RoutePath } from '@/common/constants/index.ts';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function NotFoundGlobal(): ReactNode {
  return (
    <html lang={AppLocales.EN}>
      <body
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
        }}
      >
        <div
          style={{
            display: 'flex',
            padding: '20px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div>Invalid root path</div>
          <Link href={RoutePath.Home}>Go Home</Link>
        </div>
      </body>
    </html>
  );
}
