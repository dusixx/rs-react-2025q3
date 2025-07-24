/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { vi } from 'vitest';

vi.stubGlobal('fetch', vi.fn());

export const mockFetchResolvedValueOnce = (
  json?: unknown,
  responseRest?: Partial<Response>,
): void => {
  vi.mocked(global.fetch).mockResolvedValueOnce({
    json() {
      return json;
    },
    ...responseRest,
  } as Response);
};

export const mockFetchRejectedValueOnce = (errorMessage: string): void => {
  vi.mocked(global.fetch).mockRejectedValueOnce(Error(errorMessage));
};
