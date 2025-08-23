import { TestId } from '@/test-utils/constants.ts';
import { KeyboardEventKey } from '@common/constants.ts';
import { getOrCreateElementById, isKeyPressed } from '@utils/index.ts';
import type { PropsWithChildren, ReactNode, SyntheticEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';
import { BodyScrollLock } from './components/BodyScrollLock.tsx';

const MODAL_ROOT_ID = 'modal-root';

type ModalProps = PropsWithChildren & {
  open: boolean;
  onClose?: () => void;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnBackdropClick?: boolean;
  scrollLock?: boolean;
};

export const Modal = ({
  children,
  open,
  onClose,
  shouldCloseOnEsc = true,
  shouldCloseOnBackdropClick = true,
  scrollLock = true,
}: ModalProps): ReactNode => {
  const modalRootRef = useRef(getOrCreateElementById(MODAL_ROOT_ID));
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: Event): void => {
      if (shouldCloseOnEsc && isKeyPressed(KeyboardEventKey.Escape, event)) {
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

  const handleBackdropClick = (e: SyntheticEvent): void => {
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
      onClick={handleBackdropClick}
    >
      {scrollLock && <BodyScrollLock />}
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>,
    modalRootRef.current,
  );
};
