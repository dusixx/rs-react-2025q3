import { render } from '@testing-library/react';
import { serializeStyle } from '@utils/index.ts';
import { FAKE_VALUE, getNestedChild } from 'src/test-utils/index.ts';
import { Loader, SPINNER_PROPS } from './Loader.tsx';

const { src, style, alt, width } = SPINNER_PROPS;

describe('Loader', () => {
  it(`Renders loader`, () => {
    render(<Loader className={FAKE_VALUE} />);

    const loader = getNestedChild('Loader');
    const spinner = getNestedChild(loader, 'LoaderSpinner');

    expect(loader).toHaveClass(FAKE_VALUE);
    expect(spinner).toHaveAttribute('src', src);
    expect(spinner).toHaveAttribute('alt', alt);
    expect(spinner).toHaveProperty('width', width);
    expect(spinner).toHaveStyle(serializeStyle(style));
  });
});
