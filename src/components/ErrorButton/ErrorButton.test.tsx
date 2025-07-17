import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { render } from '@testing-library/react';
import { clickButton, getNestedChildByKey } from 'src/test-utils/utils.ts';
import { ErrorButton } from './ErrorButton.tsx';

describe('ErrorButton', () => {
  it(`Throws error when test button is clicked`, () => {
    render(<ErrorButton />);
    expect(() => {
      clickButton(getNestedChildByKey('ErrorBtn'));
    }).toThrow(Error(ERR_SOMETHING_WRONG));
  });

  it(`Triggers error boundary fallback UI`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ErrorButton />
      </ErrorBoundary>,
    );
    const errorBtn = getNestedChildByKey('ErrorBtn');
    clickButton(errorBtn);
    expect(getNestedChildByKey('ErrorFallback')).toBeInTheDocument();
    expect(errorBtn).not.toBeInTheDocument();
  });
});
