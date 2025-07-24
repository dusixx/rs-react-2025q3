import { vi } from 'vitest';

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
