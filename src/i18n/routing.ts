import { AppLocales } from '@/common/constants/index.ts';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: Object.values(AppLocales),
  defaultLocale: AppLocales.EN,
});
