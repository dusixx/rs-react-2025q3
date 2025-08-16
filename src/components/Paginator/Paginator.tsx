import { useAppCustomSearchParams } from '@/hooks/useAppCustomSearchParams.ts';
import {
  IconArrowLeft,
  IconArrowLeftDouble,
  IconArrowRight,
  IconArrowRightDouble,
  INITIAL_PAGE,
} from '@common/constants';
import clsx from 'clsx';
import { useEffect, useState, type JSX } from 'react';
import styles from './Paginator.module.scss';

export type PaginatorProps = {
  totalPages?: number;
  initialPage?: number;
  className?: string;
  onClick?: (page: number) => void;
};

const PRIM_BTN_ICON_SIZE = 32;
const SEC_BTN_ICON_SIZE = 24;
export const ButtonTitle = {
  Next: 'next',
  Prev: 'prev',
  Last: 'last',
  First: 'first',
} as const;

export const Paginator = ({
  onClick,
  className,
  totalPages = INITIAL_PAGE,
  initialPage = INITIAL_PAGE,
}: PaginatorProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { setParams } = useAppCustomSearchParams();

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const updatePage = (page: number): void => {
    setCurrentPage(page);
    setParams({ page });
    onClick?.(page);
  };
  const handlePrevClick = (): void => {
    updatePage(Math.max(currentPage - 1, INITIAL_PAGE));
  };
  const handleNextClick = (): void => {
    updatePage(Math.min(currentPage + 1, totalPages));
  };
  const handleFirstClick = (): void => {
    updatePage(INITIAL_PAGE);
  };
  const handleLastClick = (): void => {
    updatePage(totalPages);
  };

  return (
    <div className={clsx(styles.paginator, className)}>
      <div className={styles['btn-group']}>
        <button
          className={styles['btn-sec']}
          disabled={currentPage === INITIAL_PAGE}
          onClick={handleFirstClick}
          title={ButtonTitle.First}
        >
          <IconArrowLeftDouble size={SEC_BTN_ICON_SIZE} />
        </button>
        <button
          className={styles.btn}
          disabled={currentPage === INITIAL_PAGE}
          onClick={handlePrevClick}
          title={ButtonTitle.Prev}
        >
          <IconArrowLeft size={PRIM_BTN_ICON_SIZE} />
        </button>
      </div>
      <div className={styles.counter}>
        <span>{currentPage}</span>
        <span>/</span>
        <span>{totalPages}</span>
      </div>
      <div className={styles['btn-group']}>
        <button
          className={styles.btn}
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          title={ButtonTitle.Next}
        >
          <IconArrowRight size={PRIM_BTN_ICON_SIZE} />
        </button>
        <button
          className={styles['btn-sec']}
          disabled={currentPage === totalPages}
          onClick={handleLastClick}
          title={ButtonTitle.Last}
        >
          <IconArrowRightDouble size={SEC_BTN_ICON_SIZE} />
        </button>
      </div>
    </div>
  );
};
