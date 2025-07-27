import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.spyOn(console, 'error').mockImplementation(() => {});

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
