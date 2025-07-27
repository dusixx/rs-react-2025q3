import { RoutePath } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { navigateMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { clickElement } from 'src/test-utils/utils.ts';
import ErrorPage from './ErrorPage.tsx';

describe('ErrorPage', () => {
  it(`Displays text`, () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it(`Navigates home page on button click`, () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>,
    );
    const btnBack = screen.getByRole('button');
    clickElement(btnBack);
    expect(navigateMock).toHaveBeenCalledWith(RoutePath.Home, { replace: true });
  });
});
