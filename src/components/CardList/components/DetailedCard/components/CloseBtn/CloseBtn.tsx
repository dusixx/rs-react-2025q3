'use client';

import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import type { ReactNode } from 'react';

const CLOSE_BTN_TEXT = 'Close';

type CloseBtnProps = {
  className?: string;
};

export const CloseBtn = ({ className }: CloseBtnProps): ReactNode => {
  const { deleteParams } = useAppCustomSearchParams();

  return (
    <button
      className={className}
      type='button'
      onClick={() => {
        deleteParams('details');
      }}
    >
      {CLOSE_BTN_TEXT}
    </button>
  );
};
