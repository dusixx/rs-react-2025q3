'use client';

import { isClosestTo } from '@/common/utils/type-guards.ts';
import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import clsx from 'clsx';
import type { PropsWithChildren, ReactNode, SyntheticEvent } from 'react';
import styles from '../Card.module.scss';
import { ADD_TO_FAV_ID } from '../Card.tsx';

type CardWrapperProps = PropsWithChildren & {
  className?: string;
  cardId?: number | string;
};

export const CardWrapper = ({ children, className, cardId }: CardWrapperProps): ReactNode => {
  const { setParams } = useAppCustomSearchParams();

  const handleClick = ({ target }: SyntheticEvent): void => {
    if (isClosestTo(target, `#${ADD_TO_FAV_ID}`)) {
      console.log(target);
      return;
    }
    setParams({ details: cardId });
  };
  return (
    <article className={clsx(styles.card, className)} onClick={handleClick}>
      {children}
    </article>
  );
};
