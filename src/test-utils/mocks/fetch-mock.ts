/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
import { vi } from 'vitest';

const mocked = vi.fn();
vi.stubGlobal('fetch', mocked);

export const fetchMock = {
  mocked,
  mockResolvedValueOnce<T extends Record<string, unknown>>(
    json: T,
    props: Partial<Response>,
  ): void {
    mocked.mockResolvedValueOnce({
      ...props,
      clone() {
        return {
          ...props,
          async text(): Promise<string> {
            return Promise.resolve(JSON.stringify(json));
          },
        };
      },
      async text(): Promise<string> {
        return Promise.resolve(JSON.stringify(json));
      },
      json(): Promise<T> {
        return Promise.resolve(json);
      },
    });
  },
  mockRejectedValueOnce(errorMessage: string): void {
    mocked.mockRejectedValueOnce(Error(errorMessage));
  },
};
