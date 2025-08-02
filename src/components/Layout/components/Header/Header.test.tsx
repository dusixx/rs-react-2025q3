import { RoutePath } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { ProvidersMock } from 'src/test-utils/mocks/provider-mock.tsx';
import { locationMock, navigateMock } from 'src/test-utils/mocks/router-dom-mock.tsx';
import { BTN_ABOUT_TEXT, Header } from './Header.tsx';

describe('Header', () => {
  it(`Renders header`, () => {
    render(<Header />, { wrapper: ProvidersMock });
    const header = getNestedChild('Header');
    const logoImage = getNestedChild(header, 'HeaderLogo', 'HeaderLogoImage');
    expect(logoImage).toBeInTheDocument();
    // expect(logoImage).toHaveAttribute('src', IMAGE_PROPS.src);
  });

  it(`Navigates to about page by clicking on the button`, () => {
    render(<Header />, { wrapper: ProvidersMock });
    clickElement(screen.getByText(BTN_ABOUT_TEXT));
    expect(navigateMock).toHaveBeenCalledWith(RoutePath.About);
  });

  it(`Disables button when location pathname is reached`, () => {
    locationMock.pathname = RoutePath.About;
    render(<Header />, { wrapper: ProvidersMock });
    expect(screen.getByText(BTN_ABOUT_TEXT)).toHaveProperty('disabled', true);
  });
});
