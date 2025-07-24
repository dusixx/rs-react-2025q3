/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { vi } from 'vitest';

const mocked = vi.spyOn(globalThis, 'fetch');

export const fetchMock = {
  mocked,
  mockResolvedValueOnce(json?: unknown, responseRest?: Partial<Response>): void {
    mocked.mockResolvedValueOnce({
      json() {
        return json;
      },
      ...responseRest,
    } as Response);
  },
  mockRejectedValueOnce(errorMessage: string): void {
    mocked.mockRejectedValueOnce(Error(errorMessage));
  },
};
