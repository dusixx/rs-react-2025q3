import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

beforeAll(() => {
  // vi.stubGlobal('console', {
  //   log: vi.fn(),
  //   error: vi.fn(),
  //   warn: vi.fn(),
  // });
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
  vi.clearAllMocks();
});

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterAll(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
