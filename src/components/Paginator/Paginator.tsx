import {
  IconArrowLeft,
  IconArrowLeftDouble,
  IconArrowRight,
  IconArrowRightDouble,
  INITIAL_PAGE,
} from '@common/constants.ts';
import clsx from 'clsx';
import { useEffect, useState, type JSX } from 'react';
import styles from './Paginator.module.scss';

const ButtonTitle = {
  Next: 'next',
  Prev: 'prev',
  Last: 'last',
  First: 'first',
} as const;

const PRIM_BTN_ICON_PROPS = {
  size: 32,
  color: 'currentColor',
};
const SEC_BTN_ICON_PROPS = {
  size: 24,
  color: 'currentColor',
};

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
    <div className={clsx(styles.paginator, className)}>
      <div className={styles.btnGroup}>
        <button
          data-btn
          disabled={currentPage === INITIAL_PAGE}
          onClick={handleFirstClick}
          title={ButtonTitle.First}
        >
          <IconArrowLeftDouble {...SEC_BTN_ICON_PROPS} />
        </button>
        <button
          className={styles.btn}
          disabled={currentPage === INITIAL_PAGE}
          onClick={handlePrevClick}
          title={ButtonTitle.Prev}
        >
          <IconArrowLeft {...PRIM_BTN_ICON_PROPS} />
        </button>
      </div>
      <div className={styles.counter}>
        <span data-current>{currentPage}</span>
        <span>/</span>
        <span data-total>{totalPages}</span>
      </div>
      <div className={styles.btnGroup}>
        <button
          className={styles.btn}
          disabled={currentPage === totalPages}
          onClick={handleNextClick}
          title={ButtonTitle.Next}
        >
          <IconArrowRight {...PRIM_BTN_ICON_PROPS} />
        </button>
        <button
          data-btn
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
