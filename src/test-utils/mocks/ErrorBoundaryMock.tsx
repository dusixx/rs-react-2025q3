import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary.tsx';
import type { ErrorInfo } from 'react';
import { vi } from 'vitest';

export const resetErrorMock = vi.fn();
export const componentDidCatchMock = vi.fn();

export class ErrorBoundaryMock extends ErrorBoundary {
  public override componentDidCatch(error: unknown, errorInfo: ErrorInfo): void {
    super.componentDidCatch(error, errorInfo);
    componentDidCatchMock();
  }
  protected override resetError = resetErrorMock;
}
