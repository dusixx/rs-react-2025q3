import type { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { vi } from 'vitest';

export const dispatchMock = vi.fn();
export const mockUseSelector = useSelector;

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: (): ReturnType<typeof useDispatch> => dispatchMock,
  };
});
