import { RoutePath } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { locationMock, navigateMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { IMAGE_PROPS } from './Header.constants.ts';
import { Header } from './Header.tsx';

describe('Header', () => {
  it(`Renders header`, () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const header = getNestedChild('Header');
    const logoImage = getNestedChild(header, 'HeaderLogo', 'HeaderLogoImage');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', IMAGE_PROPS.src);
  });

  it(`Navigates to about page by clicking on the button`, () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    clickElement(screen.getByRole('button'));
    expect(navigateMock).toHaveBeenCalledWith(RoutePath.About);
  });

  it(`Disables button when location pathname is reached`, () => {
    locationMock.pathname = RoutePath.About;
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button')).toHaveProperty('disabled', true);
  });
});
