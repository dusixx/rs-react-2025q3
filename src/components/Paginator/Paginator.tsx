import {
  IconArrowLeft,
  IconArrowLeftDouble,
  IconArrowRight,
  IconArrowRightDouble,
  INITIAL_PAGE,
} from '@common/constants';
import clsx from 'clsx';
import { useEffect, useState, type JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import styles from './Paginator.module.scss';

type PaginatorProps = {
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

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const updatePage = (page: number): void => {
    setCurrentPage(page);
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
    <div data-testid={TestId.Paginator} className={clsx(styles.paginator, className)}>
      <div className={styles.btnGroup}>
        <button
          data-testid={TestId.PaginatorFirstBtn}
          className={styles.btnSec}
          disabled={currentPage === INITIAL_PAGE}
          onClick={handleFirstClick}
          title={ButtonTitle.First}
        >
          <IconArrowLeftDouble size={SEC_BTN_ICON_SIZE} />
        </button>
        <button
          data-testid={TestId.PaginatorPrevBtn}
          className={styles.btn}
          disabled={currentPage === INITIAL_PAGE}
          onClick={handlePrevClick}
          title={ButtonTitle.Prev}
        >
          <IconArrowLeft size={PRIM_BTN_ICON_SIZE} />
        </button>
      </div>
      <div data-testid={TestId.PaginatorCounter} className={styles.counter}>
        <span data-testid={TestId.PaginatorCounterCurrent} data-current>
          {currentPage}
        </span>
        <span>/</span>
        <span data-testid={TestId.PaginatorCounterTotal} data-total>
          {totalPages}
        </span>
      </div>
      <div className={styles.btnGroup}>
        <button
          data-testid={TestId.PaginatorNextBtn}
          className={styles.btn}
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          title={ButtonTitle.Next}
        >
          <IconArrowRight size={PRIM_BTN_ICON_SIZE} />
        </button>
        <button
          data-testid={TestId.PaginatorLastBtn}
          className={styles.btnSec}
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
