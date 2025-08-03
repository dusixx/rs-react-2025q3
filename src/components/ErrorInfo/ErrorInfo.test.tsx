import { render } from '@testing-library/react';
import { FAKE_VALUE, getNestedChild } from 'src/test-utils/index.ts';
import { ERR_NOT_FOUND } from 'src/test-utils/mocks/api-mock.ts';
import { ErrorInfo, ICON_COLOR } from './ErrorInfo.tsx';

describe('ErrorInfo', () => {
  it(`Renders error info correctly`, () => {
    render(<ErrorInfo message={ERR_NOT_FOUND} className={FAKE_VALUE} />);

    const errorInfo = getNestedChild('ErrorInfo');
    expect(getNestedChild(errorInfo, 'ErrorInfoIcon')).toBeInTheDocument();
    expect(getNestedChild(errorInfo, 'ErrorInfoIcon')).toHaveAttribute('color', ICON_COLOR);
    expect(getNestedChild(errorInfo, 'ErrorInfoMessage')).toHaveTextContent(ERR_NOT_FOUND);
    expect(getNestedChild(errorInfo)).toHaveClass(FAKE_VALUE);
  });
});
