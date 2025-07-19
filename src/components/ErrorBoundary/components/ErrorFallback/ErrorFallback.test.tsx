import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { render } from '@testing-library/react';
import { FAKE_VALUE } from 'src/test-utils/constants.ts';
import { clickElement, getNestedChild, queryNestedChild } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';
import { ErrorFallback, RESET_BTN_TEXT } from './ErrorFallback.tsx';

const FAKE_ERROR = Error(FAKE_VALUE);
const FAKE_ERROR_INFO = { componentStack: FAKE_VALUE };

describe('ErrorFallback', () => {
  it(`Renders error message only`, () => {
    render(<ErrorFallback error={FAKE_ERROR} />);

    const heading = getNestedChild('ErrorFallbackHeading');
    const message = getNestedChild(heading, 'ErrorFallbackMessage');

    expect(message.textContent).toMatch(FAKE_ERROR.message);
    expect(getNestedChild(heading, 'ErrorFallbackIcon')).toBeInTheDocument();
    expect(queryNestedChild('ErrorFallbackStack')).toBeNull();
    expect(queryNestedChild('ErrorFallbackResetBtn')).toBeNull();
  });

  it(`Renders default error message`, () => {
    render(<ErrorFallback />);

    const heading = getNestedChild('ErrorFallbackHeading');
    const message = getNestedChild(heading, 'ErrorFallbackMessage');
    expect(message.textContent).toMatch(ERR_SOMETHING_WRONG);
  });

  it(`Renders error stack`, () => {
    render(<ErrorFallback errorInfo={FAKE_ERROR_INFO} />);

    const errorInfo = getNestedChild('ErrorFallbackStack');
    expect(errorInfo).toBeInTheDocument();
    expect(errorInfo.textContent).toMatch(FAKE_ERROR_INFO.componentStack);
  });

  it(`Renders reset button`, () => {
    render(<ErrorFallback resetErrorBoundary={() => {}} />);

    const errrorBtn = getNestedChild('ErrorFallbackResetBtn');
    expect(errrorBtn).toBeInTheDocument();
    expect(errrorBtn.textContent).toMatch(RESET_BTN_TEXT);
  });

  it(`Resets error on reset button click`, () => {
    const resetMock = vi.fn();
    render(<ErrorFallback resetErrorBoundary={resetMock} />);

    const errrorBtn = getNestedChild('ErrorFallbackResetBtn');
    clickElement(errrorBtn);
    expect(resetMock).toHaveBeenCalled();
  });
});
