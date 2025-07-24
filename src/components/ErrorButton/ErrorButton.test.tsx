import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { clickElement, FAKE_VALUE, getNestedChild, TestId } from 'src/test-utils/index.ts';
import { ErrorButton } from './ErrorButton.tsx';

class ErrorFallbackMock extends ErrorFallback {
  public render(): ReactNode {
    return <div data-testid={TestId.ErrorFallback}>{FAKE_VALUE}</div>;
  }
}

describe('ErrorButton', () => {
  it(`Throws error when test button is clicked`, () => {
    render(<ErrorButton errorMessage={FAKE_VALUE} />);
    expect(() => {
      clickElement(getNestedChild('ErrorBtn'));
    }).toThrow(Error(FAKE_VALUE));
  });

  it(`Triggers error boundary fallback UI`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallbackMock}>
        <ErrorButton />
      </ErrorBoundary>,
    );
    const errorBtn = getNestedChild('ErrorBtn');
    clickElement(errorBtn);
    expect(getNestedChild('ErrorFallback')).toBeInTheDocument();
    expect(screen.getByText(FAKE_VALUE)).toBeInTheDocument();
    expect(errorBtn).not.toBeInTheDocument();
  });
});
