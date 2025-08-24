/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { TestId } from '@/test-utils/constants.ts';
import { getOrCreateElementWithId, isKeyPressed } from '@utils/index.ts';
import clsx from 'clsx';
import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { BodyScrollLock } from './components/BodyScrollLock.tsx';

const MODAL_ROOT_ID = 'modal-root';
const FOCUSABLE_ELEMENTS_SELECTOR = [
  'a[href]:not([disabled])',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '*[tabindex]:not([tabindex="-1"])',
].join(',');

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnBackdropClick?: boolean;
  scrollLock?: boolean;
  className?: string;
};

export const Modal = ({
  children,
  open,
  onClose,
  shouldCloseOnEsc = true,
  shouldCloseOnBackdropClick = true,
  scrollLock = true,
  className,
}: ModalProps): ReactNode => {
  const modalRootRef = useRef(getOrCreateElementWithId(MODAL_ROOT_ID));
  const contentRef = useRef<HTMLDivElement>(null);
  const focusableElementsRef = useRef<NodeListOf<Element>>(undefined);

  const handleTabKeyDown = (e: KeyboardEvent): void => {
    const { current: focusable } = focusableElementsRef;
    if (!focusable) {
      return;
    }
    const first = focusable[0] as HTMLElement;
    const last = focusable[focusable.length - 1] as HTMLElement;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else if (document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  };
  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (shouldCloseOnEsc && isKeyPressed('Escape', e)) {
        onClose?.();
      }
      if (e.key === 'Tab') {
        handleTabKeyDown(e);
      }
    },
    [onClose, shouldCloseOnEsc],
  );

  useEffect(() => {
    focusableElementsRef.current = contentRef.current?.querySelectorAll(
      FOCUSABLE_ELEMENTS_SELECTOR,
    );
    addEventListener('keydown', handleKeyDown);
    return (): void => {
      removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropMouseDown = (e: MouseEvent): void => {
    if (shouldCloseOnBackdropClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  if (!open) {
    return;
  }
  return createPortal(
    <div
      className={styles.backdrop}
      data-testid={TestId.ModalBackdrop}
      onMouseDown={handleBackdropMouseDown}
    >
      {scrollLock && <BodyScrollLock />}
      <div className={clsx(styles.content, className)} ref={contentRef}>
        {children}
      </div>
    </div>,
    modalRootRef.current,
  );
};
