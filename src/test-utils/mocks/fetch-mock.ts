/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { vi } from 'vitest';

const mocked = vi.spyOn(globalThis, 'fetch');

export const fetchMock = {
  mocked,
  mockResolvedValueOnce<T>(json: T, responseRest?: Partial<Response>): void {
    mocked.mockResolvedValueOnce({
      json(): T {
        return json;
      },
      ...responseRest,
    } as Response);
  },
  mockRejectedValueOnce(errorMessage: string): void {
    mocked.mockRejectedValueOnce(Error(errorMessage));
  },
};
