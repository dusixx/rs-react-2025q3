import type { ErrorInfo } from 'react';
import { Component, type ReactNode } from 'react';
import type { ErrorFallbackProps } from './components/ErrorFallback/ErrorFallback.tsx';
import { getErrorInstance } from './ErrorBoundary.utils.tsx';

type ErrorBoundaryProps = {
  FallbackComponent?: typeof Component<ErrorFallbackProps>;
  children?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  public componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    this.setState({
      hasError: true,
      error: getErrorInstance(error),
      errorInfo,
    });
    console.log(error, errorInfo);
  }

  private resetError = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  public render(): ReactNode {
    const { FallbackComponent, children } = this.props;
    const { hasError, error, errorInfo } = this.state;

    if (hasError && error) {
      return FallbackComponent ? (
        <FallbackComponent
          error={error}
          errorInfo={errorInfo}
          resetErrorBoundary={this.resetError}
        />
      ) : null;
    }
    return children;
  }
}
