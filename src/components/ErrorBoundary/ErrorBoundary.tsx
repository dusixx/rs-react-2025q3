import { isError, isString } from '@utils/index.ts';
import type { ErrorInfo } from 'react';
import { Component, type ReactNode } from 'react';
import type { ErrorFallbackProps } from './components/ErrorFallback/ErrorFallback.tsx';

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
  public static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      error: isError(error) ? error : isString(error) ? Error(error) : undefined,
      hasError: true,
    };
  }
  public componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
    console.debug(error, errorInfo);
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
