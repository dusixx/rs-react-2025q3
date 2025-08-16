import { RoutePath } from '@/common/constants/index.ts';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export default function LocaleRootPage(): ReactNode {
  redirect(RoutePath.Search);
}
