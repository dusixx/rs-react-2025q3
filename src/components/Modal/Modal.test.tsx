import { TestId } from '@/test-utils/constants.ts';
import { KeyboardEventKey } from '@common/constants.ts';
import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import type { JSX } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal.tsx';

const CONTENT_TEST_ID = 'modal-content-mock';
const SCROLL_LOCK_TEST_ID = 'scroll-lock-mock';

const ContentMock = (): JSX.Element => {
  return <div data-testid={CONTENT_TEST_ID}></div>;
};
vi.mock('./components/BodyScrollLock.tsx', () => ({
  BodyScrollLock: (): JSX.Element => {
    return <div data-testid={SCROLL_LOCK_TEST_ID}></div>;
  },
}));

describe('Modal', () => {
  it('renders modal with content', () => {
    render(
      <Modal open={true} scrollLock={false}>
        <ContentMock />
      </Modal>,
    );
    const content = within(screen.getByTestId(TestId.ModalBackdrop)).getByTestId(CONTENT_TEST_ID);
    expect(content).toBeInTheDocument();
  });

  it('closes modal on Escape key down', async () => {
    const handleClose = vi.fn();
    render(<Modal open={true} scrollLock={false} shouldCloseOnEsc={true} onClose={handleClose} />);

    expect(screen.getByTestId(TestId.ModalBackdrop)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: KeyboardEventKey.Escape });

    await waitFor(() => {
      expect(handleClose).toBeCalled();
    });
  });

  it('does not close modal on Escape', async () => {
    const handleClose = vi.fn();
    render(<Modal open={true} scrollLock={false} shouldCloseOnEsc={false} onClose={handleClose} />);

    expect(screen.getByTestId(TestId.ModalBackdrop)).toBeInTheDocument();
    fireEvent.keyDown(window, { key: KeyboardEventKey.Escape });

    await waitFor(() => {
      expect(handleClose).not.toBeCalled();
    });
  });

  it('locks body scroll', async () => {
    render(<Modal open={true} scrollLock={true} />);
    await waitFor(() => {
      expect(screen.getByTestId(SCROLL_LOCK_TEST_ID)).toBeInTheDocument();
    });
  });

  it('does not lock body scroll', async () => {
    render(<Modal open={true} scrollLock={false} />);
    await waitFor(() => {
      expect(screen.queryByTestId(SCROLL_LOCK_TEST_ID)).toBeNull();
    });
  });
});
