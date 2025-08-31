import { useSimpleModalFocusTrap } from '@/hooks/useSimpleModalFocusTrap.ts';
import { getOrCreateElementWithId, isKeyPressed } from '@utils/index.ts';
import clsx from 'clsx';
import type { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BodyScrollLock } from './components/BodyScrollLock.tsx';
import styles from './Modal.module.scss';

const MODAL_ROOT_ID = 'modal-root';

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnBackdropClick?: boolean;
  scrollLock?: boolean;
  className?: string;
};

const Modal = ({
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

  useSimpleModalFocusTrap({ open, contentRef });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (shouldCloseOnEsc && isKeyPressed('Escape', e)) {
        onClose?.();
      }
    },
    [onClose, shouldCloseOnEsc],
  );

  useEffect(() => {
    addEventListener('keydown', handleKeyDown);
    return (): void => {
      removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropMouseDown = useCallback(
    (e: MouseEvent): void => {
      if (shouldCloseOnBackdropClick && e.target === e.currentTarget) {
        onClose?.();
      }
    },
    [onClose, shouldCloseOnBackdropClick],
  );

  if (!open) {
    return;
  }
  return createPortal(
    <div className={styles.backdrop} onMouseDown={handleBackdropMouseDown}>
      {scrollLock && <BodyScrollLock />}
      <div className={clsx(styles.content, className)} ref={contentRef}>
        {children}
      </div>
    </div>,
    modalRootRef.current,
  );
};

export const MemoizedModal = memo(Modal);
