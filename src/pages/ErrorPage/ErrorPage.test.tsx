import { RoutePath } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { navigateMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { clickElement } from 'src/test-utils/utils.ts';
import ErrorPage, { HEADING_404, TEXT_404 } from './ErrorPage.tsx';

describe('ErrorPage', () => {
  it(`Displays text content`, () => {
    render(<ErrorPage />);
    expect(screen.getByText(HEADING_404)).toBeInTheDocument();
    expect(screen.getByText(TEXT_404)).toBeInTheDocument();
  });

  it(`Navigates home on button click`, () => {
    render(<ErrorPage />);
    const btnBack = screen.getByRole('button');
    clickElement(btnBack);
    expect(navigateMock).toHaveBeenCalledWith(RoutePath.Home, { replace: true });
  });
});
