import type { useAppDispatch } from 'src/redux/hooks.ts';
import { vi } from 'vitest';

export const appDispatchMock = vi.fn();

vi.mock('@/redux/hooks.ts', async () => {
  const actual = await vi.importActual('@/redux/hooks.ts');
  return {
    ...actual,
    useAppDispatch: (): ReturnType<typeof useAppDispatch> => appDispatchMock,
  };
});
