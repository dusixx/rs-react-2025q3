import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

const store: Record<string, string> = {};

export const localStorageMock = {
  setItem: vi.fn((key: string, value: string): void => {
    store[key] = value;
  }),
  getItem: vi.fn((key: string): string | undefined => {
    return store[key];
  }),
};
vi.stubGlobal('localStorage', localStorageMock);

beforeAll(() => {
  vi.stubGlobal('console', {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  });
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
