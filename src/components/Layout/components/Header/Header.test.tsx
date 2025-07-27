import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { getNestedChild } from 'src/test-utils/index.ts';
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
});
