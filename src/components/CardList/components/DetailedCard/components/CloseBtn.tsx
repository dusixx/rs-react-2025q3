'use client';

import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

type CloseBtnProps = {
  className?: string;
};

export const CloseBtn = ({ className }: CloseBtnProps): ReactNode => {
  const { deleteParams } = useAppCustomSearchParams();
  const t = useTranslations();
  return (
    <button
      className={className}
      type='button'
      onClick={() => {
        deleteParams('details');
      }}
    >
      {t('Button.Close')}
    </button>
  );
};
