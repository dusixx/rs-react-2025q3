import { ERR_SOMETHING_WRONG } from '@common/constants.ts';
import type { ErrorInfo } from 'react';
import { Component, type ReactNode } from 'react';
import { getErrorInstance, type ErrorFallbackProps } from './index.ts';

type ErrorBoundaryProps = {
  FallbackComponent?: typeof Component<ErrorFallbackProps>;
  children?: ReactNode;
};

type ErrorBoundaryState = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  public state: ErrorBoundaryState = {};

  public componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    this.setState({
      error: getErrorInstance(error) ?? Error(ERR_SOMETHING_WRONG),
      errorInfo,
    });
    console.log(error, errorInfo);
  }

  private resetError = (): void => {
    this.setState({
      error: undefined,
      errorInfo: undefined,
    });
  };

  public render(): ReactNode {
    const { FallbackComponent, children } = this.props;
    const { error, errorInfo } = this.state;

    if (error) {
      return (
        FallbackComponent && (
          <FallbackComponent
            error={error}
            errorInfo={errorInfo}
            resetErrorBoundary={this.resetError}
          />
        )
      );
    }
    return children;
  }
}
