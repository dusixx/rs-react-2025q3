import { type NavigateOptions, type To, Outlet } from 'react-router-dom';
import { vi } from 'vitest';

type NavigateFunctionMock = {
  (to: To, options?: NavigateOptions): void | Promise<void>;
};

export const navigateMock = vi.fn();
export const locationMock: Partial<Location> = {};
export const outletMock = Outlet;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: (): NavigateFunctionMock => navigateMock,
    useLocation: (): Partial<Location> => locationMock,
    Outlet: vi.fn(),
  };
});
