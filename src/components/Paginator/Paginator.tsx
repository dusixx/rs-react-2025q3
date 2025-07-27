/* eslint-disable max-lines-per-function */
import {
  IconArrowLeft,
  IconArrowLeftDouble,
  IconArrowRight,
  IconArrowRightDouble,
  INITIAL_PAGE,
} from '@common/constants.ts';
import clsx from 'clsx';
import { useEffect, useState, type JSX } from 'react';
import { TestId } from 'src/test-utils/constants.ts';
import { ButtonTitle, PRIM_BTN_ICON_PROPS, SEC_BTN_ICON_PROPS } from './Paginator.constants.ts';
import styles from './Paginator.module.scss';

type PaginatorProps = {
  totalPages?: number;
  initialPage?: number;
  className?: string;
  onClick?: (page: number) => void;
};

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

  const handlePrevClick = (): void => {
    const page = Math.max(currentPage - 1, INITIAL_PAGE);
    setCurrentPage(page);
    onClick?.(page);
  };
  const handleNextClick = (): void => {
    const page = Math.min(currentPage + 1, totalPages);
    setCurrentPage(page);
    onClick?.(page);
  };
  const handleFirstClick = (): void => {
    const page = INITIAL_PAGE;
    setCurrentPage(page);
    onClick?.(page);
  };
  const handleLastClick = (): void => {
    const page = totalPages;
    setCurrentPage(page);
    onClick?.(page);
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
          <IconArrowLeftDouble {...SEC_BTN_ICON_PROPS} />
        </button>
        <button
          data-testid={TestId.PaginatorPrevBtn}
          className={styles.btn}
          disabled={currentPage === INITIAL_PAGE}
          onClick={handlePrevClick}
          title={ButtonTitle.Prev}
        >
          <IconArrowLeft {...PRIM_BTN_ICON_PROPS} />
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
          <IconArrowRight {...PRIM_BTN_ICON_PROPS} />
        </button>
        <button
          data-testid={TestId.PaginatorLastBtn}
          className={styles.btnSec}
          disabled={currentPage === totalPages}
          onClick={handleLastClick}
          title={ButtonTitle.Last}
        >
          <IconArrowRightDouble {...SEC_BTN_ICON_PROPS} />
        </button>
      </div>
    </div>
  );
};
