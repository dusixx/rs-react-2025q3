'use client';

import { INITIAL_PAGE } from '@/common/constants/index.ts';
import { isNumericPositiveInteger } from '@/common/utils/index.ts';
import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import type { ReactNode } from 'react';
import type { PaginatorProps } from './Paginator.tsx';
import { Paginator } from './Paginator.tsx';

type AppPaginatorProps = Pick<PaginatorProps, 'totalPages' | 'className'>;

const getPage = (page?: string): number => {
  return isNumericPositiveInteger(page ?? '') ? Number(page) : INITIAL_PAGE;
};

export const AppPaginator = ({ totalPages }: AppPaginatorProps): ReactNode => {
  const { setParams, getParams } = useAppCustomSearchParams();
  const [initialPage] = getParams('page');
  return (
    <Paginator
      totalPages={totalPages}
      initialPage={getPage(initialPage)}
      onClick={page => {
        setParams({ page });
      }}
    />
  );
};
