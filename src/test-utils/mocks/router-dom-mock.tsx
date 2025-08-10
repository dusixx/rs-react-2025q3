import type { useNavigate } from 'react-router-dom';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { vi } from 'vitest';

export const navigateMock = vi.fn();
export const locationMock: Partial<Location> = {};
export const outletElementMock = Outlet;
export const navigateElementMock = Navigate;
export const mockUseOutletContext = useOutletContext;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: (): ReturnType<typeof useNavigate> => navigateMock,
    useLocation: (): Partial<Location> => locationMock,
    Outlet: vi.fn(),
    Navigate: vi.fn(),
    useOutletContext: vi.fn(),
  };
});
