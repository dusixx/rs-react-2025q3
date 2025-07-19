/* eslint-disable @typescript-eslint/consistent-type-imports */
import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import {
  ErrorBoundary,
  ErrorFallback,
  type ErrorBoundaryState,
} from '@components/ErrorBoundary/index.ts';
import { render } from '@testing-library/react';
import { getErrorInstance } from '@utils/index.ts';
import {
  clickElement,
  componentDidCatchMock,
  ErrorBoundaryMock,
  FAKE_VALUE,
  getNestedChild,
  ProblematicChildMock,
  queryNestedChild,
  resetErrorMock,
  setStateMock,
} from 'src/test-utils/index.ts';
import { vi } from 'vitest';

const STATE_TO_RESET: ErrorBoundaryState = {
  error: undefined,
  errorInfo: undefined,
};
vi.mock('@utils/index.ts', async importOriginal => {
  const actual = await importOriginal<typeof import('@utils/index.ts')>();
  return {
    ...actual,
    getErrorInstance: vi.fn(() => Error(FAKE_VALUE)),
  };
});

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
    const args = componentDidCatchMock.mock.calls[0];
    expect(setStateMock).toHaveBeenCalledWith({
      error: Error(FAKE_VALUE),
      errorInfo: args[1],
    });
    expect(getErrorInstance).toHaveBeenCalled();
    expect(consoleLogMock).toHaveBeenCalledWith(Error(ERR_SOMETHING_WRONG), args[1]);
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
