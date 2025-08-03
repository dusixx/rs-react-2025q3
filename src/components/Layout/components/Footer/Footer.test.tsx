import { LinkProps } from '@common/constants.ts';
import { render, screen } from '@testing-library/react';
import { getNestedChild } from 'src/test-utils/index.ts';
import { COPYRIGHT, Footer, RSS_LOGO_SRC, RSS_URL } from './Footer.tsx';

describe('Footer', () => {
  it(`Renders footer`, () => {
    render(<Footer />);

    const link = getNestedChild('Footer', 'FooterLink');
    const logo = getNestedChild(link, 'FooterLogo');

    expect(link).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(link).toHaveAttribute('href', RSS_URL);
    expect(link).toHaveAttribute('rel', LinkProps.Rel);
    expect(logo).toHaveAttribute('src', RSS_LOGO_SRC);
    expect(screen.getByText(COPYRIGHT)).toBeInTheDocument();
  });
});
