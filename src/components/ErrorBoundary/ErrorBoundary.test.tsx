import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { ErrorFallback } from '@components/ErrorBoundary/index.ts';
import { render } from '@testing-library/react';
import {
  componentDidCatchMock,
  ErrorBoundaryMock,
  resetErrorMock,
} from 'src/test-utils/mocks/ErrorBoundaryMock.tsx';
import { ProblematicChildMock } from 'src/test-utils/mocks/ProblematicChildMock';
import { clickButton, getNestedChildByKey, queryNestedChildByKey } from 'src/test-utils/utils.ts';
import { vi } from 'vitest';

const ERRORINFO_PROPERTY = 'componentStack';

describe('ErrorBoundary', () => {
  it(`Renders child if no errors where thrown`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProblematicChildMock />
      </ErrorBoundary>,
    );
    expect(getNestedChildByKey('ProblematicChildMock')).toBeInTheDocument();
    expect(queryNestedChildByKey('ErrorFallback')).toBeNull();
  });

  it(`Displays fallback UI when error occurs`, () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ProblematicChildMock throwError />
      </ErrorBoundary>,
    );
    expect(getNestedChildByKey('ErrorFallback')).toBeInTheDocument();
    expect(queryNestedChildByKey('ProblematicChildMock')).toBeNull();
  });

  it(`Calls componentDidCatch and logs error to console`, () => {
    const consoleLogSpy = vi.spyOn(console, 'log');
    render(
      <ErrorBoundaryMock FallbackComponent={ErrorFallback}>
        <ProblematicChildMock throwError />
      </ErrorBoundaryMock>,
    );
    expect(componentDidCatchMock).toHaveBeenCalled();
    expect(consoleLogSpy.mock.calls[0][0]).toEqual(Error(ERR_SOMETHING_WRONG));
    expect(consoleLogSpy.mock.calls[0][1]).toHaveProperty(ERRORINFO_PROPERTY);
  });

  it(`Resets error on button click`, () => {
    render(
      <ErrorBoundaryMock FallbackComponent={ErrorFallback}>
        <ProblematicChildMock throwError />
      </ErrorBoundaryMock>,
    );
    clickButton(getNestedChildByKey('ErrorFallbackResetBtn'));
    expect(resetErrorMock).toHaveBeenCalled();
  });
});
