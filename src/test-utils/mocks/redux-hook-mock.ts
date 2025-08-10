import type { useAppDispatch } from 'src/redux/store/hooks';
import { useSelectedInfos } from 'src/redux/store/hooks';
import { vi } from 'vitest';

export const mockUseSelectedInfos = useSelectedInfos;
export const appDispatchMock = vi.fn();

vi.mock('src/redux/store/hooks.ts', async () => {
  const actual = await vi.importActual('src/redux/store/hooks.ts');
  return {
    ...actual,
    useSelectedInfos: vi.fn(),
    useAppDispatch: (): ReturnType<typeof useAppDispatch> => appDispatchMock,
  };
});
