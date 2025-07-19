import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { ErrorBoundaryState } from '@components/ErrorBoundary/index.ts';
import { ErrorBoundary, ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { render } from '@testing-library/react';
import {
  clickElement,
  componentDidCatchMock,
  ErrorBoundaryMock,
  getNestedChild,
  ProblematicChildMock,
  queryNestedChild,
  resetErrorMock,
  setStateMock,
} from 'src/test-utils/index.ts';
import { vi } from 'vitest';

const ERRORINFO_PROPERTY = 'componentStack';
const ERROR_INSTANCE = Error(ERR_SOMETHING_WRONG);
const STATE_TO_RESET: ErrorBoundaryState = {
  error: undefined,
  errorInfo: undefined,
};

describe('ErrorBoundary', () => {
  it(`Renders child if no errors where thrown`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProblematicChildMock />
      </ErrorBoundary>,
    );
    expect(getNestedChild('ProblematicChildMock')).toBeInTheDocument();
    expect(queryNestedChild('ErrorFallback')).toBeNull();
  });

  it(`Displays fallback UI when error occurs`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProblematicChildMock throwError />
      </ErrorBoundary>,
    );
    expect(getNestedChild('ErrorFallback')).toBeInTheDocument();
    expect(queryNestedChild('ProblematicChildMock')).toBeNull();
  });

  it(`Invokes componentDidCatch and logs error to console`, () => {
    const consoleLogMock = vi.spyOn(console, 'log');
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProblematicChildMock throwError />
      </ErrorBoundary>,
    );
    expect(componentDidCatchMock).toHaveBeenCalled();
    expect(consoleLogMock.mock.calls[0][0]).toEqual(ERROR_INSTANCE);
    expect(consoleLogMock.mock.calls[0][1]).toHaveProperty(ERRORINFO_PROPERTY);
  });

  it(`Resets error on button click`, () => {
    render(
      <ErrorBoundaryMock FallbackComponent={ErrorFallback}>
        <ProblematicChildMock throwError />
      </ErrorBoundaryMock>,
    );
    clickElement(getNestedChild('ErrorFallbackResetBtn'));
    expect(resetErrorMock).toHaveBeenCalled();
    expect(setStateMock.mock.calls[1][0]).toEqual(STATE_TO_RESET);
  });
});
