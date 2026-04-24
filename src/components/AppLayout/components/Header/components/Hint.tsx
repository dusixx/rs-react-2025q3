/* eslint-disable max-len */
'use client';

import { LINK_PROPS } from '@/common/constants/index.ts';
import { Link } from '@/i18n/navigation.ts';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

const LINK_HREF =
  'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/nextjs-ssr-ssg.md#application-requirements';

export const Hint = (): ReactNode => {
  const t = useTranslations();
  return (
    <p>
      <Link href={LINK_HREF} {...LINK_PROPS} style={{ color: 'var(--color-accent)' }}>
        {t('Hint.NoNeed')}
      </Link>{' '}
      {t('Hint.Action')}
    </p>
  );
};
