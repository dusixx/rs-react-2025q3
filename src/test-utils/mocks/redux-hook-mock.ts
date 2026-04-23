import { useUserList, type useAppDispatch } from 'src/redux/hooks.ts';
import { vi } from 'vitest';

export const appDispatchMock = vi.fn();
export const mockUseUserList = useUserList;

vi.mock('@/redux/hooks.ts', async () => {
  const actual = await vi.importActual('@/redux/hooks.ts');
  return {
    ...actual,
    useUserList: vi.fn(),
    useAppDispatch: (): ReturnType<typeof useAppDispatch> => appDispatchMock,
  };
});
