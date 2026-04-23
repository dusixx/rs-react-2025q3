import type { useAppDispatch } from 'src/redux/hooks.ts';
import { useSelectedInfos } from 'src/redux/hooks.ts';
import { vi } from 'vitest';

export const mockUseSelectedInfos = useSelectedInfos;
export const appDispatchMock = vi.fn();

vi.mock('src/redux/hooks.ts', async () => {
  const actual = await vi.importActual('src/redux/hooks.ts');
  return {
    ...actual,
    useSelectedInfos: vi.fn(),
    useAppDispatch: (): ReturnType<typeof useAppDispatch> => appDispatchMock,
  };
});
