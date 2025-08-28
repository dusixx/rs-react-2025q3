/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { KeyboardEventKey } from '@/common/constants.ts';
import type { RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';

export const FOCUSABLE_ELEMENTS_SELECTOR = [
  'iframe',
  'a[href]:not([disabled])',
  'area[href]:not([disabled])',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[contenteditable]',
  '*[tabindex]:not([tabindex="-1"])',
].join(',');

const INIT_OPTIONS: MutationObserverInit = {
  attributes: true,
  subtree: true,
  attributeFilter: ['disabled'],
};

type UseSimpleModalFocusTrapProps = {
  open: boolean;
  contentRef: RefObject<HTMLElement | null>;
};

export const useSimpleModalFocusTrap = ({
  open,
  contentRef,
}: UseSimpleModalFocusTrapProps): RefObject<NodeListOf<Element> | undefined> => {
  const focusableElementsRef = useRef<NodeListOf<Element>>(undefined);
  const mutationObserverRef = useRef<MutationObserver>(undefined);

  const queryFocusableElements = useCallback((): void => {
    focusableElementsRef.current = contentRef.current?.querySelectorAll(
      FOCUSABLE_ELEMENTS_SELECTOR,
    );
  }, [contentRef]);

  const handleTabDown = useCallback((e: KeyboardEvent): void => {
    const { current: focusable } = focusableElementsRef;

    if (e.key !== KeyboardEventKey.Tab || !focusable) {
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
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      mutationObserverRef.current = new MutationObserver(queryFocusableElements);
      mutationObserverRef.current.observe(contentRef.current, INIT_OPTIONS);
      queryFocusableElements();
      addEventListener('keydown', handleTabDown);
    }
    return (): void => {
      mutationObserverRef.current?.disconnect();
      removeEventListener('keydown', handleTabDown);
    };
  }, [contentRef, queryFocusableElements, open, handleTabDown]);

  return focusableElementsRef;
};
