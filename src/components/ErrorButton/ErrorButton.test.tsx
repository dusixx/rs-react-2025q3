import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { render } from '@testing-library/react';
import { clickElement, getNestedChild } from 'src/test-utils/index.ts';
import { ErrorButton } from './ErrorButton.tsx';

describe('ErrorButton', () => {
  it(`Throws error when test button is clicked`, () => {
    render(<ErrorButton />);
    expect(() => {
      clickElement(getNestedChild('ErrorBtn'));
    }).toThrow(Error(ERR_SOMETHING_WRONG));
  });

  it(`Triggers error boundary fallback UI`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ErrorButton />
      </ErrorBoundary>,
    );
    const errorBtn = getNestedChild('ErrorBtn');
    clickElement(errorBtn);
    expect(getNestedChild('ErrorFallback')).toBeInTheDocument();
    expect(errorBtn).not.toBeInTheDocument();
  });
});
