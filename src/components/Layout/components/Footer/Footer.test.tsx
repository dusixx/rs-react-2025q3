import { render, screen } from '@testing-library/react';
import { getNestedChild } from 'src/test-utils/index.ts';
import { COPYRIGHT, Footer, IMAGE_PROPS, LINK_PROPS } from './Footer.tsx';

describe('Footer', () => {
  it(`Renders footer`, () => {
    render(<Footer />);

    const link = getNestedChild('Footer', 'FooterLink');
    const logo = getNestedChild(link, 'FooterLogo');

    expect(link).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
    expect(link).toHaveAttribute('href', LINK_PROPS.href);
    expect(link).toHaveAttribute('rel', LINK_PROPS.rel);
    expect(logo).toHaveAttribute('src', IMAGE_PROPS.src);
    expect(screen.getByText(COPYRIGHT)).toBeInTheDocument();
  });
});
